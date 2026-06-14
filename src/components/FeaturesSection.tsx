"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Zap,
  Shield,
  BarChart3,
  Globe,
  HeadphonesIcon,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Execution",
    description:
      "Sub-millisecond order execution with co-located servers across 12 global data centers. Never miss a trade.",
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-yellow-500/10",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    icon: Shield,
    title: "Military-Grade Security",
    description:
      "256-bit AES encryption, multi-sig cold storage, and biometric authentication protect your assets 24/7.",
    color: "#10b981",
    gradient: "from-emerald-500/20 to-teal-500/10",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "AI-powered market insights, predictive analytics, and 100+ technical indicators for smarter trading decisions.",
    color: "#7c3aed",
    gradient: "from-purple-500/20 to-violet-500/10",
    glow: "rgba(124,58,237,0.3)",
  },
  {
    icon: Globe,
    title: "500+ Trading Pairs",
    description:
      "Access global crypto markets with spot, futures, and options trading across hundreds of digital assets.",
    color: "#2563eb",
    gradient: "from-blue-500/20 to-cyan-500/10",
    glow: "rgba(37,99,235,0.3)",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Expert Support",
    description:
      "Round-the-clock support from certified trading specialists. Live chat, phone, and dedicated account managers.",
    color: "#ec4899",
    gradient: "from-pink-500/20 to-rose-500/10",
    glow: "rgba(236,72,153,0.3)",
  },
  {
    icon: Wallet,
    title: "DeFi Integration",
    description:
      "Connect MetaMask, WalletConnect, and 20+ Web3 wallets. Trade DeFi directly from your portfolio.",
    color: "#f97316",
    gradient: "from-orange-500/20 to-amber-500/10",
    glow: "rgba(249,115,22,0.3)",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-16 sm:py-24 overflow-hidden" style={{ background: "#0a0a0f" }}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
          ref={ref}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6">
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Why Choose{" "}
            <span className="gradient-text">Quantum Markets</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Built for professional traders and crypto enthusiasts alike.
            Experience the next generation of digital asset trading.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: `0 0 40px ${feature.glow}, 0 20px 60px rgba(0,0,0,0.4)`,
                  borderColor: `${feature.color}40`,
                }}
                className="relative group glassmorphism rounded-2xl p-7 card-hover cursor-pointer"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div className="relative z-10 mb-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: `${feature.color}20`, border: `1px solid ${feature.color}30` }}
                  >
                    <Icon size={26} style={{ color: feature.color }} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-lg mb-3 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                  style={{ color: feature.color }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
