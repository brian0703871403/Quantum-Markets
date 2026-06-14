"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const orderBook = {
  asks: [
    { price: "67,412.00", amount: "0.4821", total: "32,498" },
    { price: "67,398.50", amount: "1.2340", total: "83,170" },
    { price: "67,380.00", amount: "0.8901", total: "59,975" },
    { price: "67,365.25", amount: "2.1056", total: "141,876" },
    { price: "67,345.00", amount: "0.5500", total: "37,040" },
  ],
  bids: [
    { price: "67,310.00", amount: "1.8920", total: "127,258" },
    { price: "67,295.50", amount: "0.7340", total: "49,395" },
    { price: "67,278.00", amount: "3.1200", total: "209,907" },
    { price: "67,260.25", amount: "0.9500", total: "63,897" },
    { price: "67,234.50", amount: "1.5600", total: "104,886" },
  ],
};

const recentTrades = [
  { price: "67,412.00", amount: "0.2341", time: "14:32:11", side: "buy" },
  { price: "67,398.50", amount: "0.8920", time: "14:32:09", side: "sell" },
  { price: "67,405.00", amount: "1.1200", time: "14:32:07", side: "buy" },
  { price: "67,380.00", amount: "0.4560", time: "14:32:05", side: "buy" },
  { price: "67,360.25", amount: "2.0010", time: "14:32:03", side: "sell" },
  { price: "67,342.00", amount: "0.7890", time: "14:32:01", side: "buy" },
];

const chartPath = "M 0 120 C 50 100, 100 140, 150 110 S 250 70, 300 80 S 400 50, 450 60 S 550 30, 600 20 S 680 10, 700 5";

export default function TradingDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [price, setPrice] = useState(67234.50);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setPrice(prev => {
        const change = (Math.random() - 0.5) * 100;
        return Math.round((prev + change) * 100) / 100;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="trading" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #0d0816 50%, #0a0a0f 100%)" }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 opacity-20 blur-3xl"
          style={{ background: "linear-gradient(to top, #7c3aed, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-6">
            Platform Preview
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Professional{" "}
            <span className="gradient-text">Trading Interface</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to trade like a pro — real-time charts, advanced order book,
            and instant execution at your fingertips.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glassmorphism rounded-2xl overflow-hidden border border-white/10"
          style={{ boxShadow: "0 0 80px rgba(124,58,237,0.15), 0 40px 80px rgba(0,0,0,0.4)" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-white/3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="hidden sm:inline text-slate-400 text-xs font-medium">Quantum Markets — Trading Terminal</span>
              <span className="sm:hidden text-slate-400 text-xs font-medium">QM Terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs">BTC/USDT</span>
              <motion.span
                key={price}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white font-bold text-sm"
              >
                ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </motion.span>
              <span className="text-emerald-400 text-xs">+4.27%</span>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {/* Chart area */}
            <div className="lg:col-span-7 p-3 sm:p-4">
              <div className="flex items-center gap-4 mb-4">
                {["1H", "4H", "1D", "1W"].map((tf, i) => (
                  <button
                    key={tf}
                    className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                      i === 2
                        ? "gradient-bg text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Chart */}
              <div className="relative h-48 lg:h-56 w-full">
                <svg viewBox="0 0 700 130" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="dashLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>

                  {[30, 60, 90, 120].map(y => (
                    <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}
                  {[0, 100, 200, 300, 400, 500, 600, 700].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="130" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}

                  <motion.path
                    d={`${chartPath} L 700 130 L 0 130 Z`}
                    fill="url(#dashGrad)"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <motion.path
                    d={chartPath}
                    fill="none"
                    stroke="url(#dashLine)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-draw"
                  />

                  {/* Candles overlay */}
                  {[50, 120, 190, 260, 330, 400, 470, 540, 610, 680].map((x, i) => {
                    const open = 40 + Math.random() * 60;
                    const close = 40 + Math.random() * 60;
                    const high = Math.min(open, close) - 15;
                    const low = Math.max(open, close) + 15;
                    const isGreen = close < open;
                    return (
                      <g key={x} className={`candle-${(i % 8) + 1}`}>
                        <line x1={x} y1={high} x2={x} y2={low} stroke={isGreen ? "#10b981" : "#ef4444"} strokeWidth="1" />
                        <rect
                          x={x - 6}
                          y={Math.min(open, close)}
                          width={12}
                          height={Math.abs(open - close) || 4}
                          fill={isGreen ? "#10b981" : "#ef4444"}
                          opacity="0.8"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Volume bars */}
              <div className="flex items-end gap-1 h-10 mt-2 px-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm opacity-40"
                    style={{
                      height: `${20 + Math.random() * 80}%`,
                      background: i % 3 === 0 ? "#ef4444" : "#10b981",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Order book */}
            <div className="hidden lg:block lg:col-span-3 p-4 border-t lg:border-t-0 border-white/5">
              <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-3 flex items-center justify-between">
                Order Book
                <span className="text-slate-500 font-normal normal-case">BTC/USDT</span>
              </h3>

              {/* Headers */}
              <div className="grid grid-cols-3 text-xs text-slate-500 mb-2 px-1">
                <span>Price</span>
                <span className="text-center">Amount</span>
                <span className="text-right">Total</span>
              </div>

              {/* Asks */}
              <div className="space-y-1 mb-2">
                {orderBook.asks.slice().reverse().map((order, i) => (
                  <div key={i} className="grid grid-cols-3 text-xs py-0.5 px-1 rounded relative overflow-hidden group hover:bg-red-500/5">
                    <div className="absolute inset-y-0 right-0 bg-red-500/10" style={{ width: `${20 + i * 15}%` }} />
                    <span className="text-red-400 font-mono relative z-10">{order.price}</span>
                    <span className="text-slate-300 text-center font-mono relative z-10">{order.amount}</span>
                    <span className="text-slate-400 text-right font-mono relative z-10">{order.total}</span>
                  </div>
                ))}
              </div>

              {/* Spread */}
              <div className="text-center py-2 border-y border-white/5 mb-2">
                <motion.span
                  key={price}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-white font-bold text-sm"
                >
                  ${price.toFixed(2)}
                </motion.span>
                <span className="text-emerald-400 text-xs ml-2">↑</span>
              </div>

              {/* Bids */}
              <div className="space-y-1">
                {orderBook.bids.map((order, i) => (
                  <div key={i} className="grid grid-cols-3 text-xs py-0.5 px-1 rounded relative overflow-hidden hover:bg-emerald-500/5">
                    <div className="absolute inset-y-0 right-0 bg-emerald-500/10" style={{ width: `${60 - i * 10}%` }} />
                    <span className="text-emerald-400 font-mono relative z-10">{order.price}</span>
                    <span className="text-slate-300 text-center font-mono relative z-10">{order.amount}</span>
                    <span className="text-slate-400 text-right font-mono relative z-10">{order.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent trades */}
            <div className="hidden lg:block lg:col-span-2 p-4 border-t lg:border-t-0 border-white/5">
              <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
                Recent Trades
              </h3>
              <div className="grid grid-cols-3 text-xs text-slate-500 mb-2 px-1">
                <span>Price</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Time</span>
              </div>
              <div className="space-y-1.5">
                {recentTrades.map((trade, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="grid grid-cols-3 text-xs py-0.5 px-1"
                  >
                    <span className={trade.side === "buy" ? "text-emerald-400 font-mono" : "text-red-400 font-mono"}>
                      {trade.price.slice(-6)}
                    </span>
                    <span className="text-slate-400 text-center font-mono">{trade.amount}</span>
                    <span className="text-slate-500 text-right font-mono text-xs">{trade.time.slice(-8)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom buy/sell bar */}
          <div className="px-4 sm:px-6 py-4 border-t border-white/10 bg-white/2 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Amount (BTC)"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
              />
              <input
                type="text"
                placeholder="Price (USDT)"
                defaultValue="67,234.50"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition-colors"
              >
                Buy BTC
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-red-500 text-white font-bold text-sm hover:bg-red-400 transition-colors"
              >
                Sell BTC
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 gradient-bg text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg shadow-purple-500/30"
          >
            Start Trading Now
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
