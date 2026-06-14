"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const tickerData = [
  { symbol: "BTC", name: "Bitcoin", price: "$67,234", change: "+2.34%", up: true },
  { symbol: "ETH", name: "Ethereum", price: "$3,891", change: "+1.87%", up: true },
  { symbol: "BNB", name: "BNB", price: "$612", change: "-0.42%", up: false },
  { symbol: "SOL", name: "Solana", price: "$178", change: "+5.21%", up: true },
  { symbol: "XRP", name: "XRP", price: "$0.743", change: "+3.15%", up: true },
  { symbol: "ADA", name: "Cardano", price: "$0.612", change: "-1.23%", up: false },
  { symbol: "AVAX", name: "Avalanche", price: "$42.18", change: "+4.67%", up: true },
  { symbol: "DOT", name: "Polkadot", price: "$9.82", change: "-0.89%", up: false },
  { symbol: "DOGE", name: "Dogecoin", price: "$0.1842", change: "+7.23%", up: true },
  { symbol: "MATIC", name: "Polygon", price: "$1.24", change: "+2.11%", up: true },
  { symbol: "LINK", name: "Chainlink", price: "$18.67", change: "+3.45%", up: true },
  { symbol: "UNI", name: "Uniswap", price: "$11.23", change: "-2.34%", up: false },
];

function TickerItem({ item }: { item: typeof tickerData[0] }) {
  return (
    <div className="flex items-center gap-3 px-6 py-0 border-r border-white/10 whitespace-nowrap shrink-0">
      <div className="flex flex-col">
        <span className="text-white font-bold text-sm">{item.symbol}</span>
        <span className="text-slate-500 text-xs">{item.name}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-white font-semibold text-sm">{item.price}</span>
        <span
          className={`text-xs font-medium flex items-center gap-0.5 ${
            item.up ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {item.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {item.change}
        </span>
      </div>
    </div>
  );
}

export default function MarketTicker() {
  const doubled = [...tickerData, ...tickerData, ...tickerData];

  return (
    <div className="relative py-4 border-y border-white/10 overflow-hidden" style={{ background: "rgba(124,58,237,0.05)" }}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0a0a0f, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0a0a0f, transparent)" }} />

      <motion.div
        className="flex"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <TickerItem key={`${item.symbol}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
