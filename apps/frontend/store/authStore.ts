"use client";

import { create } from "zustand";
import axios from "axios";

interface User {
    id?: string;
}
export const BACKEND_URL= process.env.BACKEND_URL! || "http://localhost:5000"

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;

    signup: (values: { username: string; password: string }) => Promise<void>;
    signin: (values: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    setToken: (token: string | null) => void;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    loading: false ,
    error: null,

    signup: async (values) => {
        try {
        set({ loading: true, error: null });
        const res = await axios.post(`${BACKEND_URL}/signup`, values);
        } catch (err: any) {
        set({ error: err.response?.data?.message || "Signup failed" });
        throw err;
        } finally {
        set({ loading: false });
        }
    },

    signin: async (values) => {
        try {
        set({ loading: true, error: null });
        const res = await axios.post(`${BACKEND_URL}/signin`, values);
        const token = res.data.token;
        localStorage.setItem("token", token);
        set({ token });
        await get().fetchUser();
        } catch (err: any) {
        set({ error: err.response?.data?.message || "Signin failed" });
        throw err;
        } finally {
        set({ loading: false });
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    },

    setToken: (token) => {
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
        set({ token });
    },

    fetchUser: async () => {
        const token = get().token;
        if (!token) return;

        try {
        const res = await axios.get(`${BACKEND_URL}/me`, {
            headers: { Authorization: `${token}` },
        });
        set({ user: res.data.user });
        } catch {
        set({ user: null, token: null });
        localStorage.removeItem("token");
        }
    },
}));