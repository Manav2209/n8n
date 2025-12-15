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
import Lighter from "@/components/actions/lighter";
import { ActionSheet } from "@/components/sheets/ActionSheet";
import Backpack from "@/components/actions/backpack";
import HyperLiquid from "@/components/actions/hyperLiquid";
import {
  TradingMetaData,
  PriceMetaData,
  TimerMetaData,
  TradingCredentialSchema,
  ActionCredentialSchema,
} from "common/types";
import { Button } from "@/components/ui/button";
import { BACKEND_URL, useAuthStore } from "@/store/authStore";
import axios from "axios";
import { metadata } from "../layout";
import { cleanNodes } from "@/lib/helper";
import { Check, AlertCircle, Loader2 } from "lucide-react";

export type NodeKind =
  | "price-trigger"
  | "timer"
  | "lighter"
  | "backpack"
  | "hyperliquid";

export type NodeMetadata = TradingMetaData | PriceMetaData | TimerMetaData;

export type NodeCredentials =
  | TradingCredentialSchema
  | ActionCredentialSchema;

const nodeTypes = {
  "price-trigger": PriceTrigger,
  timer: Timer,
  lighter: Lighter,
  backpack: Backpack,
  hyperliquid: HyperLiquid,
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
  credentials: NodeCredentials;
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

export default function WorkflowEditor() {
  const { token } = useAuthStore();
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectAction, setSelectAction] = useState<{
    position: {
      x: number;
      y: number;
    };
    startingNodeId: string;
  } | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: "success" | "error", message: string) => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

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

  const onConnectEnd = useCallback((params: any, connectionInfo: any) => {
    if (!connectionInfo.isValid) {
      setSelectAction({
        startingNodeId: connectionInfo.fromNode.id,
        position: {
          x: connectionInfo.from.x + 40,
          y: connectionInfo.from.y + 40,
        },
      });
    }
  }, []);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/upload-workflow",
        {
          nodes: nodes,
          edges: edges,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      addToast("success", "Workflow published successfully!");
      console.log(res);
    } catch (error) {
      addToast("error", "Failed to publish workflow. Please try again.");
      console.error(error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Toast Container */}
      <div className="fixed top-6 right-6 z-50 space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 fade-in ${
              toast.type === "success"
                ? "bg-emerald-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <Check className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Workflow Builder
            </h1>
            <p className="text-gray-600">
              Create and manage your automated workflows
            </p>
          </div>
          <Button
            onClick={handlePublish}
            disabled={isPublishing || nodes.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish Workflow"
            )}
          </Button>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="max-w-6xl mx-auto">
        <div className="h-[75vh] rounded-lg border-2 border-gray-300 bg-white overflow-hidden shadow-md">
          {!nodes.length && (
            <TriggerSheet
              onSelect={(type, metaData, cred) => {
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
                    credentials: cred,
                  },
                ]);
              }}
            />
          )}
          {selectAction && (
            <ActionSheet
              onSelect={(type, metaData, cred) => {
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
                    credentials: cred,
                  },
                ]);
                setEdges([
                  ...edges,
                  {
                    id: `${selectAction.startingNodeId}-${nodeId}`,
                    source: selectAction.startingNodeId,
                    target: nodeId,
                  },
                ]);
                setSelectAction(null);
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
            onConnectEnd={onConnectEnd}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}