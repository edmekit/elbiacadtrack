import { useCallback, useEffect, useState } from "react";
import { ReactFlow, useNodesState, useEdgesState, addEdge, type Node, type Edge, type Connection, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import comsci from '../programs/comsci.json';

type Course = {
    id: string;
    title: string;
    prereq: string[];
};

function isAvailableNode(course: Course) {
        const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '[]');
        return course.prereq.every(prerequisite => completedCourses.includes(prerequisite));
    }

export default function Dashboard() {
    const initialNodes: Node[] =  comsci.map((course, index) => ({
        id: course.id,
        data: { label: course.title },
        position: { x: index * 100, y: index * 100 },
        selectable: isAvailableNode(course),
        style:  isAvailableNode(course) ? { border: '1px solid red', backgroundColor: 'green' } : 
        { border: 'none', backgroundColor: 'red' } 
        }));

    const initialEdges: Edge[] = comsci.flatMap(course =>
        course.prereq.map(prerequisite => ({
            id: `${prerequisite}-${course.id}`,
            source: prerequisite,
            target: course.id
        }))
    );

    localStorage.setItem('completedCourses', JSON.stringify([]));
    
    const [nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges , onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div className="w-screen h-screen">
            <ReactFlow nodes={nodes} edges={edges} nodesDraggable
                onNodesChange={onNodesChange} 
                onEdgesChange={onEdgesChange} fitView>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
