import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TreeNode, NodeType } from '@/types/tree';
import { relationships, RelationshipType } from '@/lib/mock-data';
import { Legend } from './Legend';
import {
  calculateNodePositions,
  getNodeRadius,
  getRelationshipStyle,
  calculateCurvedPath,
  PositionedNode,
} from './utils';
import { RelationshipPath } from './RelationshipPath';
import { RelationshipTooltip } from './RelationshipTooltip';
import { Relationship } from '@/types/relationships';

interface RadialViewProps {
  selectedNodes: Record<string, TreeNode & { panel: 'left' | 'right' }>;
}

export const RadialView: React.FC<RadialViewProps> = ({ selectedNodes }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredRelationship, setHoveredRelationship] = useState<string | null>(null);
  const [activeTypes, setActiveTypes] = useState<RelationshipType[]>(
    Object.values(RelationshipType)
  );
  const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize zoom behavior
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        setTransform(event.transform);
      });

    svg.call(zoom);

    // Center the view initially
    const initialTransform = d3.zoomIdentity
      .translate(dimensions.width / 2, dimensions.height / 2)
      .scale(1);
    
    svg.call(zoom.transform, initialTransform);
  }, [dimensions]);

  const nodes = Object.values(selectedNodes);
  const positionedNodes = calculateNodePositions(nodes, dimensions.width, dimensions.height);

  // Filter relationships for selected nodes
  const relevantRelationships = relationships.filter(rel => {
    const sourceNode = selectedNodes[`left-${rel.source}`] || selectedNodes[`right-${rel.source}`];
    const targetNode = selectedNodes[`left-${rel.target}`] || selectedNodes[`right-${rel.target}`];
    return sourceNode && targetNode && activeTypes.includes(rel.type);
  });

  const handleNodeClick = (node: PositionedNode) => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.5, 2]);

    // Calculate transform to center on clicked node
    const scale = 1.2;
    const x = dimensions.width / 2 - node.x * scale;
    const y = dimensions.height / 2 - node.y * scale;

    const transform = d3.zoomIdentity.translate(x, y).scale(scale);
    
    svg.transition()
      .duration(750)
      .call(zoom.transform, transform);
  };

  const handleRelationshipHover = (relationshipId: string | null, event?: React.MouseEvent) => {
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

  return (
    <div className="w-full h-full relative">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="bg-white"
      >
        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
          {/* Render relationships */}
          {relevantRelationships.map(rel => {
            const source = positionedNodes.find(n => n.id === rel.source);
            const target = positionedNodes.find(n => n.id === rel.target);
            if (!source || !target) return null;

            const relationshipId = `${rel.source}-${rel.target}-${rel.type}`;
            const isHighlighted = hoveredNode 
              ? (hoveredNode === rel.source || hoveredNode === rel.target)
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

          {/* Render nodes */}
          {positionedNodes.map(node => (
            <g
              key={node.id}
              transform={`translate(${node.x},${node.y})`}
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                r={node.radius}
                fill={getNodeColor(node.type)}
                stroke="#374151"
                strokeWidth={2}
                opacity={hoveredNode ? (hoveredNode === node.id ? 1 : 0.5) : 1}
              />
              <text
                textAnchor="middle"
                dy="-0.5em"
                className="text-sm font-medium fill-gray-900"
              >
                {node.name}
              </text>
              <text
                textAnchor="middle"
                dy="1.5em"
                className="text-xs fill-gray-600"
              >
                {node.type}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* Relationship Legend */}
      <Legend
        activeTypes={activeTypes}
        onToggleType={(type) => {
          setActiveTypes(prev =>
            prev.includes(type)
              ? prev.filter(t => t !== type)
              : [...prev, type]
          );
        }}
      />

      {/* Relationship tooltip */}
      {hoveredRelationship && (
        <RelationshipTooltip
          relationship={relationships.find(r => 
            `${r.source}-${r.target}-${r.type}` === hoveredRelationship
          )!}
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
                  Strength: {(selectedRelationship.metadata.strength * 100).toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getNodeColor = (type: NodeType): string => {
  switch (type) {
    case NodeType.COLLEGE:
      return '#93c5fd'; // blue-300
    case NodeType.DEPARTMENT:
      return '#86efac'; // green-300
    case NodeType.PROGRAM:
      return '#c4b5fd'; // purple-300
    case NodeType.COURSE:
      return '#fdba74'; // orange-300
    default:
      return '#e5e7eb'; // gray-200
  }
}; 