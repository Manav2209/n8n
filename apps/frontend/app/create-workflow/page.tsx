"use client"
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, NodeChange, type  NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from '@/components/TriggerSheet';
import { PriceTrigger } from '@/components/trigger/PriceTrigger';
import { Timer } from '@/components/trigger/Timer';

export type NodeKind =  'price-trigger' | 'timer' | 'lighter' | 'backpack' | 'hyperliquid'

export type NodeMetadata = any;

const nodeTypes = {
    'price-trigger': PriceTrigger,
    'timer': Timer,
}

interface NodeType {
    type: NodeKind ; 
    data: {
        kind :'action' | 'trigger';
        metadata: NodeMetadata;

    }
    id: string,
    position: { 
        x: number,
        y: number
    },
}

interface Edge {
    id: string,
    source: string,
    target: string,
}

export  default function () {
        const [nodes, setNodes] = useState<NodeType[]>([]);
        const [edges, setEdges] = useState<Edge[]>([]);
    
        const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
        );
        const onEdgesChange = useCallback(
        (changes : any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
        );
        const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
        );
    
        return (
        <div style={{ width: '100vw', height: '100vh' }}>
        {!nodes.length && (
            <TriggerSheet
                onSelect={(type, metadata) => {
                setNodes([
                    ...nodes,
                    {
                    id: Math.random().toString(),
                    type,
                    position: { x: 0, y: 0 },
                    data: { 
                        kind: 'trigger',
                        
                        metadata,
                        
                    },
                    },
                ]);
                }}
            />
            )}
            <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            />
        </div>
    );
}
