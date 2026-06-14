"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
} from "recharts";

const generateSparkline = (base: number, trend: "up" | "down") => {
  const data = [];
  let val = base;
  for (let i = 0; i < 12; i++) {
    const delta = (Math.random() - (trend === "up" ? 0.3 : 0.7)) * base * 0.05;
    val = Math.max(val + delta, base * 0.7);
    data.push({ v: Math.round(val * 100) / 100 });
  }
  return data;
};

const markets = [
  {
    rank: 1,
    symbol: "BTC",
    name: "Bitcoin",
    icon: "₿",
    color: "#f7931a",
    price: 67234.5,
    change: 2.34,
    marketCap: "$1.32T",
    volume: "$28.4B",
    sparklineBase: 65000,
    trend: "up" as const,
  },
  {
    rank: 2,
    symbol: "ETH",
    name: "Ethereum",
    icon: "Ξ",
    color: "#627eea",
    price: 3891.2,
    change: 1.87,
    marketCap: "$468B",
    volume: "$12.1B",
    sparklineBase: 3700,
    trend: "up" as const,
  },
  {
    rank: 3,
    symbol: "BNB",
    name: "BNB",
    icon: "◆",
    color: "#f0b90b",
    price: 612.0,
    change: -0.42,
    marketCap: "$91.2B",
    volume: "$2.4B",
    sparklineBase: 620,
    trend: "down" as const,
  },
  {
    rank: 4,
    symbol: "SOL",
    name: "Solana",
    icon: "◎",
    color: "#9945ff",
    price: 178.34,
    change: 5.21,
    marketCap: "$82.4B",
    volume: "$4.8B",
    sparklineBase: 160,
    trend: "up" as const,
  },
  {
    rank: 5,
    symbol: "XRP",
    name: "XRP",
    icon: "✕",
    color: "#00aae4",
    price: 0.743,
    change: 3.15,
    marketCap: "$42.1B",
    volume: "$1.9B",
    sparklineBase: 0.68,
    trend: "up" as const,
  },
];

function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 1500;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(value * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  const formatted =
    value < 1
      ? displayed.toFixed(3)
      : value > 1000
      ? displayed.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : displayed.toFixed(2);

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
    </span>
  );
}

export default function MarketOverview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const sparklineData = markets.map((m) => ({
    ...m,
    data: generateSparkline(m.sparklineBase, m.trend),
  }));

  return (
    <section id="markets" className="py-24 relative" style={{ background: "#0a0a0f" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #2563eb, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium mb-6">
            Live Markets
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Market{" "}
            <span className="gradient-text">Overview</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real-time prices and performance metrics for the top cryptocurrencies by market cap.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glassmorphism rounded-2xl overflow-hidden"
        >
          {/* Table header */}
          <div className="hidden md:grid grid-cols-7 gap-4 px-6 py-4 border-b border-white/10 text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-2">Asset</div>
            <div className="col-span-1 text-right">Price</div>
            <div className="col-span-1 text-right">24h Change</div>
            <div className="col-span-1 text-right">Market Cap</div>
            <div className="col-span-1 text-right">7D Chart</div>
          </div>

          {/* Table rows */}
          {sparklineData.map((coin, i) => (
            <motion.div
              key={coin.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ backgroundColor: "rgba(124,58,237,0.05)" }}
              className="grid grid-cols-2 md:grid-cols-7 gap-4 px-4 sm:px-6 py-4 border-b border-white/5 cursor-pointer transition-colors duration-200"
            >
              {/* Rank */}
              <div className="hidden md:flex col-span-1 items-center">
                <span className="text-slate-500 font-mono text-sm">{coin.rank}</span>
              </div>

              {/* Asset */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
                  style={{
                    background: `${coin.color}20`,
                    border: `1px solid ${coin.color}40`,
                    color: coin.color,
                  }}
                >
                  {coin.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{coin.symbol}</div>
                  <div className="text-slate-500 text-xs">{coin.name}</div>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-1 flex items-center justify-end md:justify-end">
                <span className="text-white font-semibold font-mono">
                  $<AnimatedNumber value={coin.price} />
                </span>
              </div>

              {/* Change */}
              <div className="hidden md:flex col-span-1 items-center justify-end">
                <span
                  className={`flex items-center gap-1 font-semibold text-sm px-2 py-1 rounded-lg ${
                    coin.change >= 0
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-red-400 bg-red-500/10"
                  }`}
                >
                  {coin.change >= 0 ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {Math.abs(coin.change)}%
                </span>
              </div>

              {/* Market cap */}
              <div className="hidden md:flex col-span-1 items-center justify-end">
                <span className="text-slate-300 font-mono text-sm">{coin.marketCap}</span>
              </div>

              {/* Sparkline */}
              <div className="hidden md:flex col-span-1 items-center justify-end">
                <div className="w-24 h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={coin.data}>
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke={coin.change >= 0 ? "#10b981" : "#ef4444"}
                        strokeWidth={1.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Footer */}
          <div className="px-6 py-4 flex items-center justify-between">
            <span className="text-slate-500 text-sm">Showing top 5 by market cap</span>
            <motion.a
              href="#"
              whileHover={{ x: 3 }}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              View all 500+ markets
              <TrendingUp size={14} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
