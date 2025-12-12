"use client"
import { BACKEND_URL, useAuthStore } from "@/store/authStore";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function () {

    const router = useRouter()
    const { token , logout} = useAuthStore();
    const params = useParams();
    const workflowId = params.id as string;

    const [execution, setExecution] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
        logout();
        router.push("/signin");
        return;
        }

        const fetchExecutions = async () => {
        try {
            setLoading(true);
            setError("");
            console.log(token)

            const response = await axios.get(`${BACKEND_URL}/workflow/executions/{workflowId}`, {
            headers: {
                Authorization: token,
            },
            });
            console.log(response.data)

            setExecution(response.data);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to fetch workflow");
        } finally {
            setLoading(false);
        }
        };

        fetchExecutions();
    }, [token]);



    return(
        <div>
            Execution

        </div>
    )
}