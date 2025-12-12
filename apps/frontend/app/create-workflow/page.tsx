"use client";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TriggerSheet } from "@/components/sheets/TriggerSheet";
import { PriceTrigger } from "@/components/trigger/PriceTrigger";
import { Timer } from "@/components/trigger/Timer";
import Lighter  from "@/components/actions/lighter";
import { ActionSheet } from "@/components/sheets/ActionSheet";
import Backpack from "@/components/actions/backpack";
import HyperLiquid from "@/components/actions/hyperLiquid";
import { TradingMetaData, PriceMetaData, TimerMetaData, TradingCredentialSchema, ActionCredentialSchema } from "common/types";
import { Button } from "@/components/ui/button";
import { BACKEND_URL, useAuthStore } from "@/store/authStore";
import axios from "axios";
import { metadata } from "../layout";
import { cleanNodes } from "@/lib/helper";

export type NodeKind =
  | "price-trigger"
  | "timer"
  | "lighter"
  | "backpack"
  | "hyperliquid";

export type NodeMetadata = TradingMetaData | PriceMetaData | TimerMetaData;

export type NodeCredentials = TradingCredentialSchema | ActionCredentialSchema

const nodeTypes = {
  "price-trigger": PriceTrigger,
  "timer": Timer,
  "lighter": Lighter,
  "backpack": Backpack,
  "hyperliquid": HyperLiquid,
};

interface NodeType {
  type: NodeKind;
  data: {
    kind: "ACTION" | "TRIGGER";
    metaData: NodeMetadata;
  };
  id: string;
  position: {
    x: number;
    y: number;
  };
  credentials:NodeCredentials
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

export default function () {
  const {token} = useAuthStore()
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectAction , setSelectAction] = useState<{
    position:{
      x:number,
      y:number
    },
    startingNodeId:string
  }|null>(null);

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback( 
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );
  
  const onConnectEnd = useCallback((params : any, connectionInfo : any) => {

    if(!connectionInfo.isValid){
    
      setSelectAction({
        startingNodeId: connectionInfo.fromNode.id,
        position:{
          x: connectionInfo.from.x +40,
          y: connectionInfo.from.y +40
        }
      })
      
    }
  }, []);

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div>
          <Button onClick= { async () => {

            const res = await axios.post("http://localhost:5000/upload-workflow", {
              nodes: nodes,
              edges:edges
            } , {
              headers: {
                Authorization: token,
              },
            })
            console.log(res)
          }}>
            Publish
          </Button>
        </div>
      
    <div className="w-full max-w-6xl h-[80vh] border-2 border-gray-300 rounded-lg bg-white overflow-hidden">

      {!nodes.length &&(
        <TriggerSheet
          onSelect={(type, metaData , cred) => {
            setNodes([
              ...nodes,
              {
                id: Math.random().toString(),
                type,
                position: { x: 0, y: 0 },
                data: {
                  kind: "TRIGGER",
                   metaData,
                  
                },
                credentials: cred
              },
            ]);
          }}
        />
      )}
      {selectAction && <ActionSheet  onSelect={(type, metaData , cred) => {
          const nodeId = Math.random().toString();
            setNodes([
              ...nodes,
              {
                id: nodeId,
                type,
                position: selectAction.position,
                data: {
                  kind: "ACTION",
                  metaData,
                },
                credentials:cred
              }]);
              setEdges ([...edges,{
                id: `${selectAction.startingNodeId}-${nodeId}`,
                source: selectAction.startingNodeId,
                target: nodeId
              }])
          setSelectAction (null);
          }}/>}

        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          fitView
        >
    
        <Controls />
        </ReactFlow>
      </div>

    </div>
  );
}


