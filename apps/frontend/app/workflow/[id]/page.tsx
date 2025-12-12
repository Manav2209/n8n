"use client";

import { BACKEND_URL, useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import "@xyflow/react/dist/style.css";

import { ReactFlow, ReactFlowProvider } from "@xyflow/react";
import { PriceTrigger } from "@/components/trigger/PriceTrigger";
import { Timer } from "@/components/trigger/Timer";
import HyperLiquid from "@/components/actions/hyperLiquid";
import Lighter from "@/components/actions/lighter";
import { Backpack } from "lucide-react";

const nodeTypes = {
    "price-trigger": PriceTrigger,
    "timer": Timer,
    "lighter": Lighter,
    "backpack": Backpack,
    "hyperliquid": HyperLiquid,
  };
  

export default function WorkflowPage() {


    const { token } = useAuthStore();
    const params = useParams();
    const workflowId = params.id as string;
    console.log(workflowId)

    const [nodes, setNodes] = useState<any[]>([]);
    const [edges, setEdges] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!workflowId || !token) return;

        const fetchWorkflow = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get(
                    `${BACKEND_URL}/workflow/${workflowId}`,
                    {
                        headers: { Authorization: token },
                    }
                );

                const data = res.data.workflow;
                console.log("Workflow Data:", data);

                setNodes(data.nodes || []);
                setEdges(data.edges || []);
            } catch (err: any) {
                console.error(err);
                setError(
                    err?.response?.data?.message ||
                        "Failed to fetch workflow"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchWorkflow();
    }, [workflowId, token]);

    if (loading) return <div className="p-6">Loading workflow...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <div className="h-[85vh] p-6">
         
            <ReactFlowProvider>
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    fitView
                />
            </ReactFlowProvider>
        </div>
    );
}
