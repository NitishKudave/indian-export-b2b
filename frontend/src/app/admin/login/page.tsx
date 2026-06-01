"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";
import { Lock, User, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // If token exists, check if already logged in and redirect
    const token = localStorage.getItem("orbinex_token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const data = await apiFetch("/token/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      
      if (data && data.access) {
        localStorage.setItem("orbinex_token", data.access);
        localStorage.setItem("orbinex_username", data.username);
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Invalid username or password.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-24">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Admin Secure Login</h2>
          <p className="text-slate-500 text-xs">Access Orbinexglobal trade inquiry board.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-slate-700 dark:text-slate-300">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter admin username"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full saffron-gradient hover:shadow-orange-500/10 active:scale-95 transition-all text-white font-bold py-3 rounded-lg text-xs tracking-wider"
          >
            {status === "submitting" ? "VERIFYING..." : "LOGIN TO DASHBOARD"}
          </button>

          {status === "error" && (
            <div className="flex gap-2 p-3 bg-red-500/5 border border-red-500/20 text-red-500 text-xs rounded-lg items-center">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
