"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rodriguez",
    role: "Professional Crypto Trader",
    initials: "AR",
    color: "#7c3aed",
    stars: 5,
    text: "Quantum Markets completely transformed my trading strategy. The sub-millisecond execution and real-time order book give me an edge I've never had before. Made 340% returns in 2024 alone.",
    volume: "$2.4M",
    trades: "1,240 trades",
    since: "2022",
  },
  {
    name: "Sarah Chen",
    role: "DeFi Strategist & Portfolio Manager",
    initials: "SC",
    color: "#2563eb",
    stars: 5,
    text: "The DeFi integration is seamless. I can manage my on-chain and off-chain positions in one dashboard. The AI-powered analytics helped me identify trends before the market moved. Absolutely incredible platform.",
    volume: "$890K",
    trades: "3,580 trades",
    since: "2021",
  },
  {
    name: "Marcus Thompson",
    role: "Institutional Trading Desk Lead",
    initials: "MT",
    color: "#10b981",
    stars: 5,
    text: "We migrated our entire institutional trading operations to Quantum Markets. The API reliability is unmatched — 99.99% uptime, and the order execution speed makes our arbitrage strategies more profitable than ever.",
    volume: "$45M",
    trades: "18,200 trades",
    since: "2020",
  },
  {
    name: "Priya Patel",
    role: "Quantitative Analyst",
    initials: "PP",
    color: "#f59e0b",
    stars: 5,
    text: "The advanced analytics suite is on another level. Custom indicators, backtesting with historical data, and the AI signals have been remarkably accurate. My algorithmic strategies perform 2x better here.",
    volume: "$1.8M",
    trades: "5,890 trades",
    since: "2023",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #0d0818 50%, #0a0a0f 100%)" }}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #2563eb, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm font-medium mb-6">
            Trusted by Traders
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            What Our{" "}
            <span className="gradient-text">Traders Say</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Join over 2.1 million traders who trust Quantum Markets for their crypto trading needs.
          </p>

          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-white font-bold text-xl">4.9/5</span>
            <span className="text-slate-400 text-sm">from 50,000+ reviews</span>
          </div>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 0 40px ${t.color}20, 0 20px 60px rgba(0,0,0,0.3)` }}
              className="glassmorphism rounded-2xl p-7 transition-all duration-300 cursor-default relative"
            >
              {/* Quote mark */}
              <div
                className="absolute top-6 right-7 text-6xl leading-none opacity-10 font-serif"
                style={{ color: t.color }}
              >
                "
              </div>

              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Text */}
              <p className="text-slate-300 mt-4 mb-6 text-sm leading-relaxed relative z-10">
                "{t.text}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: `${t.color}30`, border: `2px solid ${t.color}50`, color: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-0.5">Volume</div>
                  <div className="text-xs font-semibold" style={{ color: t.color }}>{t.volume}</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-xs text-slate-500 mb-0.5">Trades</div>
                  <div className="text-xs font-semibold text-white">{t.trades}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-0.5">Since</div>
                  <div className="text-xs font-semibold text-white">{t.since}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glassmorphism rounded-2xl p-6 relative"
            >
              <div
                className="absolute top-6 right-6 text-5xl leading-none opacity-10 font-serif"
                style={{ color: testimonials[current].color }}
              >
                "
              </div>
              <StarRating count={testimonials[current].stars} />
              <p className="text-slate-300 mt-4 mb-5 text-sm leading-relaxed">
                "{testimonials[current].text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    background: `${testimonials[current].color}30`,
                    border: `2px solid ${testimonials[current].color}50`,
                    color: testimonials[current].color,
                  }}
                >
                  {testimonials[current].initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{testimonials[current].name}</div>
                  <div className="text-slate-500 text-xs">{testimonials[current].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "w-6 gradient-bg" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
