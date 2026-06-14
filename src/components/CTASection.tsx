"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 8,
  size: 2 + Math.random() * 4,
  opacity: 0.1 + Math.random() * 0.4,
}));

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.15) 50%, rgba(16,185,129,0.05) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "#0a0a0f" }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(37,99,235,0.2) 100%)",
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="ctaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7c3aed" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaGrid)" />
        </svg>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: "-10px",
              width: p.size,
              height: p.size,
              background: "rgba(124,58,237,0.6)",
            }}
            animate={{
              y: [0, -(400 + Math.random() * 400)],
              opacity: [0, p.opacity, p.opacity, 0],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            }}
          />
        ))}
        {/* Blue particles */}
        {particles.slice(0, 15).map((p) => (
          <motion.div
            key={`b-${p.id}`}
            className="absolute rounded-full"
            style={{
              left: `${(p.x + 30) % 100}%`,
              bottom: "-10px",
              width: p.size * 0.8,
              height: p.size * 0.8,
              background: "rgba(37,99,235,0.6)",
            }}
            animate={{
              y: [0, -(300 + Math.random() * 500)],
              opacity: [0, p.opacity * 0.7, p.opacity * 0.7, 0],
              x: [0, (Math.random() - 0.5) * 80],
            }}
            transition={{
              duration: p.duration * 1.2,
              delay: p.delay + 2,
              repeat: Infinity,
              ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            }}
          />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #2563eb, transparent)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center" ref={ref}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/40 bg-purple-500/15 text-purple-300 text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          No credit card required — Start free today
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
        >
          Ready to Start
          <br />
          <span className="gradient-text">Trading?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto mb-12"
        >
          Join 2.1 million traders already using Quantum Markets.
          Create your free account in under 60 seconds.
        </motion.p>

        {/* Email form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-12"
        >
          {!submitted ? (
            <>
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/60 focus:bg-white/15 transition-all text-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(124,58,237,0.6)" }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="gradient-bg text-white px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 whitespace-nowrap"
              >
                Create Free Account
                <ArrowRight size={16} />
              </motion.button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex items-center justify-center gap-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl py-4 text-emerald-400 font-semibold"
            >
              <CheckCircle size={20} />
              You're on the list! We'll reach out soon.
            </motion.div>
          )}
        </motion.form>

        {/* Feature bullets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-slate-400"
        >
          {[
            "Free to join",
            "No hidden fees",
            "Cancel anytime",
            "Instant setup",
            "24/7 support",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-400" />
              {item}
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/5 transition-all duration-300"
          >
            View Platform Demo
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
