import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { f as formatINR, c as formatDateTime, a as fetchBills, d as fetchItems, b as fetchAllBillItems } from "./db-Dcxwj5Ft.mjs";
import { I as IndianRupee, R as Receipt, f as TrendingUp, g as Utensils, h as Crown } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, b as Bar } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./client-CFQ8MHU4.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function Dashboard() {
  const {
    data: bills = []
  } = useQuery({
    queryKey: ["bills"],
    queryFn: fetchBills
  });
  const {
    data: items = []
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems
  });
  const {
    data: billItems = []
  } = useQuery({
    queryKey: ["bill_items"],
    queryFn: fetchAllBillItems
  });
  const todayKey = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  const monthKey = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
    timeZone: "Asia/Kolkata",
    month: "2-digit",
    year: "numeric"
  });
  const billDateKey = (createdAt) => new Date(createdAt).toLocaleDateString("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  const billMonthKey = (createdAt) => new Date(createdAt).toLocaleDateString("en-GB", {
    timeZone: "Asia/Kolkata",
    month: "2-digit",
    year: "numeric"
  });
  const todayBills = bills.filter((b) => billDateKey(b.created_at) === todayKey);
  const todaySales = todayBills.reduce((s, b) => s + Number(b.total_amount), 0);
  const monthlyRevenue = bills.filter((b) => billMonthKey(b.created_at) === monthKey).reduce((s, b) => s + Number(b.total_amount), 0);
  const itemTotals = /* @__PURE__ */ new Map();
  for (const bi of billItems) {
    const cur = itemTotals.get(bi.item_name) ?? {
      name: bi.item_name,
      qty: 0,
      revenue: 0
    };
    cur.qty += bi.quantity;
    cur.revenue += Number(bi.subtotal);
    itemTotals.set(bi.item_name, cur);
  }
  const top = [...itemTotals.values()].sort((a, b) => b.qty - a.qty);
  const topItem = top[0]?.name ?? "—";
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString("en-GB", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    const rev = bills.filter((b) => billDateKey(b.created_at) === key).reduce((s, b) => s + Number(b.total_amount), 0);
    days.push({
      day: d.toLocaleDateString("en-IN", {
        weekday: "short",
        timeZone: "Asia/Kolkata"
      }),
      revenue: rev
    });
  }
  const recent = bills.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl lg:text-3xl font-bold tracking-tight", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Welcome back. Here's what's happening at your hotel today." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-5 w-5" }), label: "Today's Sales", value: formatINR(todaySales), gradient: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-5 w-5" }), label: "Bills Today", value: String(todayBills.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }), label: "Monthly Revenue", value: formatINR(monthlyRevenue) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { className: "h-5 w-5" }), label: "Menu Items", value: String(items.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5" }), label: "Top Seller", value: topItem, small: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4 lg:gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-card rounded-2xl p-5 border shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold mb-4", children: "Sales — Last 7 Days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: days, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => formatINR(Number(v)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "revenue", fill: "var(--primary)", radius: [8, 8, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-5 border shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold mb-4", children: "Top Selling Items" }),
        top.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground py-8 text-center", children: "No sales yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: top.slice(0, 6).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg bg-muted flex items-center justify-center font-bold text-sm", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium truncate", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              t.qty,
              " sold · ",
              formatINR(t.revenue)
            ] })
          ] })
        ] }, t.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border shadow-[var(--shadow-soft)] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", children: "Recent Bills" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bills", className: "text-sm text-primary hover:underline", children: "View all" })
      ] }),
      recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-muted-foreground", children: "No bills yet. Start billing from the POS!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3", children: "Bill #" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3", children: "Date & Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3", children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recent.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t hover:bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-semibold", children: b.bill_number }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground", children: formatDateTime(b.created_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right font-bold", children: formatINR(Number(b.total_amount)) })
        ] }, b.id)) })
      ] }) })
    ] })
  ] });
}
function StatCard({
  icon,
  label,
  value,
  gradient,
  small
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-4 lg:p-5 border shadow-[var(--shadow-soft)]", style: gradient ? {
    background: "var(--gradient-primary)",
    color: "var(--primary-foreground)",
    border: "none"
  } : {
    background: "var(--card)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 opacity-80", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wide font-medium", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 font-bold ${small ? "text-lg" : "text-2xl lg:text-3xl"}`, children: value })
  ] });
}
export {
  Dashboard as component
};
