import { useCallback, useEffect, useState } from "react";
import { ReactFlow, useNodesState, useEdgesState, addEdge, type Node, type Edge, type Connection, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';



const initialNodes: Node[] = [
    {id: "1", data: { label: 'Node 1' }, position: { x: 0, y: 0 }},
    {id: "2", data: { label: 'Node 2' }, position: { x: 100, y: 100 }},
    {id: "3", data: { label: 'Node 3' }, position: { x: 200, y: 200 }}
]

const initialEdges: Edge[] = [
    {id:'1-2', source: "1", target: "2"}
]

export default function Dashboard() {
    const [selectNode, setSelectNode] = useState(false);
    const [nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges , onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((connection: Connection) => {
        const edge: Edge = { ...connection, id: `${connection.source}-${connection.target}}`, deletable: true };
        setEdges((prevEdges) => addEdge(edge, prevEdges));
    }, [setEdges]);
    return (
        <div className="w-screen h-screen">
            <ReactFlow nodes={nodes} edges={edges} nodesDraggable
                onConnect={onConnect} onNodesChange={onNodesChange} 
                onEdgesChange={onEdgesChange} fitView>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
