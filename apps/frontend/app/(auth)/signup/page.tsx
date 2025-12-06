"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

import { Eye, EyeOff, Lock, User, Mail } from "lucide-react";

const formSchema = z.object({
    username: z.string().min(6, "Username must be at least 6 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

type FormSchema = z.infer<typeof formSchema>;

const SignUpPage = () => {
    const [show, setShow] = useState(false);
    const router = useRouter();
    const { signup, loading } = useAuthStore();

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        username: "",
        password: "",
        },
    });

    const onSubmit = async (values: FormSchema) => {
        try {
        await signup(values);
        toast.success("Account created!");
        router.push("/signin");
        } catch {
        toast.error("Signup failed!");
        }
    };

return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4 py-8">
        <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">

          {/* Title */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-gray-900">
                Create Account
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                Sign up to continue
                </p>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Username */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 text-sm flex items-center gap-2">
                        <User size={16} />
                        Username
                        </FormLabel>
                        <FormControl>
                        <Input
                            type="text"
                            placeholder="Choose a username"
                            className="bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg h-11 px-4 focus:ring-2 focus:ring-gray-300"
                            {...field}
                            disabled={loading}
                        />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 text-sm flex items-center gap-2">
                        <Lock size={16} />
                        Password
                        </FormLabel>
                        <FormControl>
                        <div className="relative">
                            <Input
                            type={show ? "text" : "password"}
                            placeholder="Create a password"
                            className="bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg h-11 px-4 pr-10 focus:ring-2 focus:ring-gray-300"
                            {...field}
                            disabled={loading}
                            />
                            <button
                            type="button"
                            onClick={() => setShow(!show)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                            {show ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                    )}
                />

                {/* Signup Button */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition"
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </Button>
                </form>
            </Form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-gray-400 text-xs">OR</span>
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Footer */}
            <p className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <a
                href="/signin"
                className="text-gray-900 font-medium hover:underline"
                >
                Sign In
                </a>
            </p>

            </div>
        </div>
        </div>
    );
};

export default SignUpPage;
