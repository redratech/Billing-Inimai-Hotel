import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { f as formatINR, a as fetchBills, b as fetchAllBillItems } from "./db-qnB_sV2M.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Line, B as BarChart, b as Bar } from "../_libs/recharts.mjs";
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
function Reports() {
  const {
    data: bills = []
  } = useQuery({
    queryKey: ["bills"],
    queryFn: fetchBills
  });
  const {
    data: billItems = []
  } = useQuery({
    queryKey: ["bill_items"],
    queryFn: fetchAllBillItems
  });
  const [range, setRange] = reactExports.useState("week");
  const since = reactExports.useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    if (range === "day") d.setHours(0, 0, 0, 0);
    if (range === "week") d.setDate(d.getDate() - 6);
    if (range === "month") d.setDate(d.getDate() - 29);
    if (range !== "day") d.setHours(0, 0, 0, 0);
    return d;
  }, [range]);
  const inRange = bills.filter((b) => new Date(b.created_at) >= since);
  const billIds = new Set(inRange.map((b) => b.id));
  const itemsInRange = billItems.filter((bi) => billIds.has(bi.bill_id));
  const revenue = inRange.reduce((s, b) => s + Number(b.total_amount), 0);
  const days = range === "day" ? 1 : range === "week" ? 7 : 30;
  const series = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - i);
    const key = d.toDateString();
    const rev = bills.filter((b) => new Date(b.created_at).toDateString() === key).reduce((s, b) => s + Number(b.total_amount), 0);
    series.push({
      label: d.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric"
      }),
      revenue: rev
    });
  }
  const itemTotals = /* @__PURE__ */ new Map();
  for (const bi of itemsInRange) {
    const c = itemTotals.get(bi.item_name) ?? {
      name: bi.item_name,
      qty: 0,
      revenue: 0
    };
    c.qty += bi.quantity;
    c.revenue += Number(bi.subtotal);
    itemTotals.set(bi.item_name, c);
  }
  const top = [...itemTotals.values()].sort((a, b) => b.qty - a.qty);
  const totalQty = itemsInRange.reduce((s, i) => s + i.quantity, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl lg:text-3xl font-bold tracking-tight", children: "Reports & Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sales performance over time." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-card border rounded-full p-1", children: ["day", "week", "month"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRange(r), className: `px-4 py-1.5 text-sm font-medium rounded-full capitalize ${range === r ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`, children: r === "day" ? "Today" : r === "week" ? "7 days" : "30 days" }, r)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Revenue", value: formatINR(revenue), accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Bills Count", value: String(inRange.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total Quantity Sold", value: String(totalQty) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Most Sold", value: top[0]?.name ?? "—", small: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Least Sold", value: top[top.length - 1]?.name ?? "—", small: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-4 lg:gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-5 border shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold mb-4", children: "Revenue Trend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: series, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => formatINR(Number(v)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "revenue", stroke: "var(--primary)", strokeWidth: 3, dot: {
            r: 4
          } })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-5 border shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold mb-4", children: "Top Item Sales" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: top.slice(0, 8), layout: "vertical", margin: {
          left: 30
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { dataKey: "name", type: "category", width: 100 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "qty", fill: "var(--accent)", radius: [0, 8, 8, 0] })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border overflow-hidden shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b font-bold", children: "Item Performance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3", children: "Item" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3", children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3", children: "Revenue" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          top.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: t.qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right font-semibold", children: formatINR(t.revenue) })
          ] }, t.name)),
          top.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "text-center px-5 py-8 text-muted-foreground", children: "No data in this range." }) })
        ] })
      ] }) })
    ] })
  ] });
}
function Stat({
  label,
  value,
  accent,
  small
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-4 lg:p-5 border shadow-[var(--shadow-soft)]", style: accent ? {
    background: "var(--gradient-primary)",
    color: "var(--primary-foreground)",
    border: "none"
  } : {
    background: "var(--card)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide opacity-80 font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 font-bold ${small ? "text-base" : "text-2xl lg:text-3xl"}`, children: value })
  ] });
}
export {
  Reports as component
};
