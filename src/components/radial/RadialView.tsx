import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { TreeNode, NodeType } from "@/types/tree";
import {
  relationships,
  RelationshipType,
  courses,
  faculty,
  programs,
} from "@/lib/mock-data";
import { Legend } from "./Legend";
import {
  calculateNodePositions,
  getRelationshipStyle,
  PositionedNode,
} from "./utils";
import { RelationshipPath } from "./RelationshipPath";
import { RelationshipTooltip } from "./RelationshipTooltip";
import { Relationship } from "@/types/relationships";

interface RadialViewProps {
  selectedNodes: Record<string, TreeNode & { panel: "left" | "right" }>;
}

export const RadialView: React.FC<RadialViewProps> = ({ selectedNodes }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredRelationship, setHoveredRelationship] = useState<string | null>(
    null
  );
  const [activeTypes, setActiveTypes] = useState<RelationshipType[]>(
    Object.values(RelationshipType)
  );
  const [selectedRelationship, setSelectedRelationship] =
    useState<Relationship | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showRelated, setShowRelated] = useState(false);

  // Helper function to get node data from ID
  const getNodeDataFromId = (id: string): TreeNode => {
    // Check courses
    const course = courses.find((c) => c.id === id);
    if (course) {
      return {
        id: course.id,
        name: course.title,
        type: NodeType.COURSE,
        description: course.description,
      };
    }

    // Check faculty
    const facultyMember = faculty.find((f) => f.id === id);
    if (facultyMember) {
      return {
        id: facultyMember.id,
        name: facultyMember.name,
        type: NodeType.FACULTY,
        description: `${
          facultyMember.title
        } - ${facultyMember.researchAreas.join(", ")}`,
      };
    }

    // Check programs
    const program = programs.find((p) => p.id === id);
    if (program) {
      return {
        id: program.id,
        name: program.name,
        type: NodeType.PROGRAM,
        description: program.description,
      };
    }

    // If no match found, return a default node with the ID
    return {
      id,
      name: id.replace(/^(course-|fac-|prog-)/, "").replace(/-/g, " "),
      type: NodeType.COURSE, // Default type
      description: "No description available",
    };
  };

  // Helper function to normalize IDs
  const normalizeId = (id: string): string => {
    // If it already has a prefix, return as is
    if (
      id.startsWith("course-") ||
      id.startsWith("fac-") ||
      id.startsWith("prog-")
    ) {
      return id;
    }

    // Try to match with existing course
    const matchingCourse = courses.find(
      (c) =>
        c.title.toLowerCase() === id.toLowerCase() ||
        c.id.replace("course-", "").replace(/-/g, " ").toLowerCase() ===
          id.toLowerCase()
    );
    if (matchingCourse) return matchingCourse.id;

    // Try to match with faculty
    const matchingFaculty = faculty.find(
      (f) =>
        f.name.toLowerCase() === id.toLowerCase() ||
        f.id.replace("fac-", "").replace(/-/g, " ").toLowerCase() ===
          id.toLowerCase()
    );
    if (matchingFaculty) return matchingFaculty.id;

    // Try to match with program
    const matchingProgram = programs.find(
      (p) =>
        p.name.toLowerCase() === id.toLowerCase() ||
        p.id.replace("prog-", "").replace(/-/g, " ").toLowerCase() ===
          id.toLowerCase()
    );
    if (matchingProgram) return matchingProgram.id;

    // If no match found, create a consistent ID format
    return `course-${id.toLowerCase().replace(/\s+/g, "-")}`;
  };

  // Get all related nodes through relationships with normalized IDs
  const getRelatedNodes = () => {
    const selectedNodeIds = Object.values(selectedNodes).map((node) =>
      normalizeId(node.id)
    );
    const relatedNodeIds = new Set<string>();

    relationships.forEach((rel) => {
      const normalizedSource = normalizeId(rel.source);
      const normalizedTarget = normalizeId(rel.target);

      if (selectedNodeIds.includes(normalizedSource)) {
        relatedNodeIds.add(normalizedTarget);
      }
      if (selectedNodeIds.includes(normalizedTarget)) {
        relatedNodeIds.add(normalizedSource);
      }
    });

    // Convert IDs to full node data
    return Array.from(relatedNodeIds)
      .filter((id) => !selectedNodeIds.includes(id)) // Exclude already selected nodes
      .map((id) => ({
        ...getNodeDataFromId(id),
        isRelated: true,
      }));
  };

  // Combine selected and related nodes
  const allNodes = showRelated
    ? [...Object.values(selectedNodes), ...getRelatedNodes()]
    : Object.values(selectedNodes);

  const positionedNodes = calculateNodePositions(
    allNodes,
    dimensions.width,
    dimensions.height
  );

  // Filter relationships with normalized IDs
  const relevantRelationships = relationships.filter((rel) => {
    const normalizedSource = normalizeId(rel.source);
    const normalizedTarget = normalizeId(rel.target);

    const sourceExists = allNodes.some(
      (node) => normalizeId(node.id) === normalizedSource
    );
    const targetExists = allNodes.some(
      (node) => normalizeId(node.id) === normalizedTarget
    );

    return sourceExists && targetExists && activeTypes.includes(rel.type);
  });

  // Modify the getNodeColor function to handle related nodes
  const getNodeColor = (
    node: PositionedNode & { isRelated?: boolean }
  ): string => {
    if (node.isRelated) {
      // Use a lighter shade for related nodes
      switch (node.type) {
        case NodeType.COLLEGE:
          return "#bfdbfe"; // blue-200
        case NodeType.DEPARTMENT:
          return "#bbf7d0"; // green-200
        case NodeType.PROGRAM:
          return "#ddd6fe"; // purple-200
        case NodeType.COURSE:
          return "#fed7aa"; // orange-200
        default:
          return "#f3f4f6"; // gray-100
      }
    }

    // Original colors for selected nodes
    switch (node.type) {
      case NodeType.COLLEGE:
        return "#93c5fd"; // blue-300
      case NodeType.DEPARTMENT:
        return "#86efac"; // green-300
      case NodeType.PROGRAM:
        return "#c4b5fd"; // purple-300
      case NodeType.COURSE:
        return "#fdba74"; // orange-300
      default:
        return "#e5e7eb"; // gray-200
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize zoom behavior
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        setTransform(event.transform);
      });

    svg.call(zoom);

    // Center the view initially
    const initialTransform = d3.zoomIdentity
      .translate(dimensions.width / 2, dimensions.height / 2)
      .scale(1);

    svg.call(zoom.transform, initialTransform);
  }, [dimensions]);

  const handleNodeClick = (node: PositionedNode) => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.5, 2]);

    // Calculate transform to center on clicked node
    const scale = 1.2;
    const x = dimensions.width / 2 - node.x * scale;
    const y = dimensions.height / 2 - node.y * scale;

    const transform = d3.zoomIdentity.translate(x, y).scale(scale);

    svg.transition().duration(750).call(zoom.transform, transform);
  };

  const handleRelationshipHover = (
    relationshipId: string | null,
    event?: React.MouseEvent
  ) => {
    setHoveredRelationship(relationshipId);
    if (event) {
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleRelationshipClick = (relationship: Relationship) => {
    setSelectedRelationship(
      selectedRelationship?.source === relationship.source &&
        selectedRelationship?.target === relationship.target
        ? null
        : relationship
    );
  };

  // Modify relationship rendering to use normalized IDs
  const findNodeWithNormalizedId = (id: string, nodes: PositionedNode[]) => {
    return nodes.find((n) => normalizeId(n.id) === normalizeId(id));
  };

  const renderBackground = () => (
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="rgb(243 244 246)"
          strokeWidth="1"
        />
      </pattern>
    </defs>
  );

  return (
    <div className="w-full h-full relative">
      {/* Add Go Deeper button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => setShowRelated(!showRelated)}
          className={`
            px-4 py-2 rounded-lg shadow-lg font-medium
            ${
              showRelated
                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }
            transition-colors duration-200
          `}
        >
          {showRelated ? "Hide Related" : "Go Deeper"}
        </button>
      </div>

      <svg ref={svgRef} width="100%" height="100%" className="bg-white">
        {renderBackground()}
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          className="opacity-50"
        />
        {/* Define markers once at the SVG level */}
        <defs>
          {relevantRelationships.map((rel) => {
            const style = getRelationshipStyle(rel.type);
            const relationshipId = `${rel.source}-${rel.target}-${rel.type}`;

            return (
              rel.type === RelationshipType.PREREQUISITE && (
                <marker
                  key={relationshipId}
                  id={`arrow-${relationshipId}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={style.color} />
                </marker>
              )
            );
          })}
        </defs>

        <g
          transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}
        >
          {/* Render relationships */}
          {relevantRelationships.map((rel) => {
            const source = findNodeWithNormalizedId(
              rel.source,
              positionedNodes
            );
            const target = findNodeWithNormalizedId(
              rel.target,
              positionedNodes
            );
            if (!source || !target) return null;

            const relationshipId = `${normalizeId(rel.source)}-${normalizeId(
              rel.target
            )}-${rel.type}`;
            const isHighlighted = hoveredNode
              ? hoveredNode === rel.source || hoveredNode === rel.target
              : hoveredRelationship === relationshipId;

            return (
              <RelationshipPath
                key={relationshipId}
                source={source}
                target={target}
                relationship={rel}
                isHighlighted={isHighlighted}
                onHover={(id) => handleRelationshipHover(id)}
                onClick={handleRelationshipClick}
              />
            );
          })}

          {/* Render nodes with modified styling */}
          {positionedNodes.map((node) => {
            const width = node.radius * 2;
            const height = node.radius * 1.5;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const isRelated = (node as any).isRelated;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x},${node.y})`}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={-width / 2}
                  y={-height / 2}
                  width={width}
                  height={height}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  fill={getNodeColor(node as any)}
                  stroke={isRelated ? "#9ca3af" : "#374151"} // Lighter border for related nodes
                  strokeWidth={isRelated ? 1 : 2}
                  rx={4}
                  opacity={
                    hoveredNode
                      ? hoveredNode === node.id
                        ? 1
                        : isRelated
                        ? 0.3
                        : 0.5
                      : isRelated
                      ? 0.7
                      : 1
                  }
                />
                <text
                  textAnchor="middle"
                  dy="-0.1em"
                  className={`text-sm font-medium ${
                    isRelated ? "fill-gray-600" : "fill-gray-900"
                  }`}
                >
                  {node.name}
                </text>
                <text
                  textAnchor="middle"
                  dy="1.2em"
                  className={`text-xs ${
                    isRelated ? "fill-gray-500" : "fill-gray-600"
                  }`}
                >
                  {node.type}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Relationship Legend */}
      <Legend
        activeTypes={activeTypes}
        onToggleType={(type) => {
          setActiveTypes((prev) =>
            prev.includes(type)
              ? prev.filter((t) => t !== type)
              : [...prev, type]
          );
        }}
      />

      {/* Relationship tooltip */}
      {hoveredRelationship && (
        <RelationshipTooltip
          relationship={
            relationships.find(
              (r) => `${r.source}-${r.target}-${r.type}` === hoveredRelationship
            )!
          }
          position={tooltipPosition}
        />
      )}

      {/* Selected relationship details */}
      {selectedRelationship && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-md">
          <h3 className="font-medium text-gray-900 mb-2">
            Relationship Details
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {selectedRelationship.metadata?.description}
            </p>
            <div className="flex gap-2 text-xs">
              {selectedRelationship.metadata?.year && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Year: {selectedRelationship.metadata.year}
                </span>
              )}
              {selectedRelationship.metadata?.strength && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Strength:{" "}
                  {(selectedRelationship.metadata.strength * 100).toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
