"use client";

import { Button } from "@/components/ui/button";
import { BACKEND_URL, useAuthStore } from "@/store/authStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter()
  const { token , logout} = useAuthStore();

  const [workflows, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      logout();
      router.push("/signin");
      return;
    }

    const fetchWorkflow = async () => {
      try {
        setLoading(true);
        setError("");
        console.log(token)

        const response = await axios.get(`${BACKEND_URL}/workflows`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data)

        setWorkflow(response.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch workflow");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, [token]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold mb-4 items-center ">Your Workflows</h1>

      <Button  className="text-2xl font-bold" onClick={()=>{
        router.push("/create-workflow")
      }} variant={"link"}> Create new</Button>
      </div>
      

      {loading && <p>Loading workflows...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading  && (

      <div className="space-y-3">
        {workflows?.map((workflow) => (
          <div
            key={workflow._id}
            className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-between"
          >
            <div>
              <h2 className="font-semibold">{workflow._id}</h2>
              <p className="text-sm text-gray-500">
                Nodes: {workflow.nodes.length} • Edges: {workflow.edges.length}
              </p>
            </div>

            <div className=" cursor-pointer">

            <Button onClick={() => router.push(`/workflow/${workflow._id}`)}>
              Open
            </Button> 


              <Button onClick={()=>{router.push(`/execution/${workflow._id}`)}} className=" mx-2">
                  Execution
              </Button>
            </div>
          </div>
    ))}
  </div>
)}

    </div>
  );
}
