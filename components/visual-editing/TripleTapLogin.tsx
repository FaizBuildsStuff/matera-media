"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Loader2, CheckCircle2, XCircle } from "lucide-react";

interface TripleTapLoginProps {
  children: React.ReactNode;
  className?: string;
}

export function TripleTapLogin({ children, className }: TripleTapLoginProps) {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Triple-tap detection
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTap = useCallback(() => {
    tapCount.current += 1;

    if (tapTimer.current) clearTimeout(tapTimer.current);

    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 500); // Reset counter if taps are more than 500ms apart

    if (tapCount.current >= 3) {
      tapCount.current = 0;
      if (tapTimer.current) clearTimeout(tapTimer.current);
      setShowModal(true);
      setPassword("");
      setStatus("idle");
      setErrorMsg("");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: password }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          setShowModal(false);
          // Full reload so Next.js re-reads the cookie server-side
          window.location.reload();
        }, 1200);
      } else {
        setStatus("error");
        setErrorMsg("Wrong password. Try again.");
        setTimeout(() => setStatus("idle"), 2000);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Connection error. Try again.");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <>
      {/* Wrapper captures taps invisibly */}
      <div
        className={className}
        onClick={handleTap}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleTap();
        }}
      >
        {children}
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99998] bg-black/70 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[99999] max-w-sm mx-auto"
            >
              <div className="bg-[#06200E] border border-white/10 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Header */}
                <div className="px-8 pt-8 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Admin Access</span>
                  </div>
                  <h2 className="text-white font-bold text-xl tracking-tight">Enter password</h2>
                  <p className="text-white/30 text-xs mt-1">Your device will be remembered for 30 days.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      autoFocus
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success" || !password}
                    className="w-full h-12 rounded-xl font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-50
                      bg-emerald-500 text-black hover:bg-emerald-400 active:scale-95 flex items-center justify-center gap-2"
                  >
                    {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                    {status === "success" && <CheckCircle2 className="w-4 h-4" />}
                    {status === "error" && <XCircle className="w-4 h-4" />}
                    {status === "idle" && "Unlock Edit Mode"}
                    {status === "loading" && "Verifying..."}
                    {status === "success" && "Access Granted!"}
                    {status === "error" && errorMsg}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full text-white/30 text-xs hover:text-white/60 transition-colors py-1"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
