"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { TrendingUp, ArrowRight, Play } from "lucide-react";

const cryptoSymbols = [
  { symbol: "₿", label: "BTC", color: "#f7931a", delay: 0, x: "10%", y: "20%", size: "text-2xl" },
  { symbol: "Ξ", label: "ETH", color: "#627eea", delay: 1, x: "85%", y: "15%", size: "text-3xl" },
  { symbol: "◎", label: "SOL", color: "#9945ff", delay: 2, x: "75%", y: "70%", size: "text-xl" },
  { symbol: "◆", label: "BNB", color: "#f0b90b", delay: 0.5, x: "15%", y: "75%", size: "text-2xl" },
  { symbol: "✕", label: "XRP", color: "#00aae4", delay: 1.5, x: "90%", y: "45%", size: "text-lg" },
  { symbol: "◉", label: "ADA", color: "#0033ad", delay: 2.5, x: "5%", y: "50%", size: "text-xl" },
  { symbol: "Ł", label: "LTC", color: "#bfbbbb", delay: 0.8, x: "50%", y: "10%", size: "text-lg" },
  { symbol: "Ð", label: "DOGE", color: "#c2a633", delay: 1.8, x: "40%", y: "85%", size: "text-xl" },
];

const stats = [
  { label: "Total Volume", value: "$2.4T", icon: "📊" },
  { label: "Active Traders", value: "2.1M", icon: "👥" },
  { label: "Cryptocurrencies", value: "500+", icon: "🪙" },
  { label: "Uptime", value: "99.99%", icon: "⚡" },
];

// SVG animated chart data
const chartPoints = [
  [0, 200], [50, 180], [100, 220], [150, 190], [200, 160],
  [250, 140], [300, 170], [350, 130], [400, 110], [450, 140],
  [500, 100], [550, 80], [600, 60], [650, 90], [700, 50],
];

function pointsToPath(points: number[][]): string {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #2563eb, transparent)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #10b981, transparent)" }}
        />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7c3aed" strokeWidth="0.5" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating crypto symbols */}
      {mounted && cryptoSymbols.map((crypto, i) => (
        <motion.div
          key={crypto.label}
          className={`absolute font-bold ${crypto.size} select-none pointer-events-none`}
          style={{
            left: crypto.x,
            top: crypto.y,
            color: crypto.color,
            filter: `drop-shadow(0 0 8px ${crypto.color}80)`,
          }}
          animate={{
            y: [0, -20, 0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
            opacity: [0.5, 0.9, 0.6, 0.8, 0.5],
          }}
          transition={{
            duration: 6 + i,
            delay: crypto.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {crypto.symbol}
          <span className="block text-xs font-normal mt-0.5 text-center opacity-60">{crypto.label}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Trading Platform — 24/7 Markets Open
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
            >
              Trade the{" "}
              <span className="gradient-text">Future</span>
              <br />
              of Finance
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Access 500+ cryptocurrencies with institutional-grade tools. Sub-millisecond execution,
              AI-powered insights, and military-grade security — all in one platform.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
              >
                Start Trading
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#markets"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-white/5 transition-all duration-300"
              >
                <Play size={16} />
                View Markets
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start">
              {["SOC2 Certified", "256-bit SSL", "FDIC Insured"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-slate-400 text-sm">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Animated Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative glassmorphism rounded-2xl p-6 pulse-glow">
              {/* Chart header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg">BTC/USDT</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                      +4.27%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mt-1">$67,234.50</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-xs">24h Volume</div>
                  <div className="text-white font-semibold">$28.4B</div>
                </div>
              </div>

              {/* SVG chart */}
              <div className="relative h-48 w-full">
                <svg viewBox="0 0 700 250" className="w-full h-full" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[50, 100, 150, 200].map((y) => (
                    <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  ))}

                  {/* Gradient fill */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Area fill */}
                  <motion.path
                    d={`${pointsToPath(chartPoints)} L 700 250 L 0 250 Z`}
                    fill="url(#chartGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />

                  {/* Main line */}
                  <motion.path
                    d={pointsToPath(chartPoints)}
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-draw"
                  />
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>

                  {/* Dot at end */}
                  <motion.circle
                    cx="700" cy="50" r="4"
                    fill="#10b981"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5 }}
                  />
                </svg>

                {/* Price labels */}
                <div className="absolute top-0 right-0 flex flex-col gap-8 text-xs text-slate-500">
                  <span>$70k</span>
                  <span>$67k</span>
                  <span>$64k</span>
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
                {[
                  { label: "24h High", value: "$69,120", color: "text-emerald-400" },
                  { label: "24h Low", value: "$65,890", color: "text-red-400" },
                  { label: "Market Cap", value: "$1.32T", color: "text-blue-400" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-slate-400 text-xs mb-1">{stat.label}</div>
                    <div className={`text-sm font-semibold ${stat.color}`}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating order card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-6 -left-6 glassmorphism rounded-xl p-3 text-sm"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <TrendingUp size={14} />
                <span>Buy Order Filled</span>
              </div>
              <div className="text-slate-300 text-xs mt-1">0.5 BTC @ $67,234</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              className="glassmorphism rounded-xl p-5 text-center border border-white/5 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
