import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { H as HOTEL_INFO, c as formatDateTime, f as formatINR } from "./db-qnB_sV2M.mjs";
function printBill() {
  window.print();
}
function PrintBill({
  billNumber,
  createdAt,
  lines,
  total
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print-area hidden print:block", style: { fontFamily: "monospace", color: "#000", padding: 12, width: "80mm" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 800, fontSize: 18 }, children: HOTEL_INFO.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11 }, children: HOTEL_INFO.address }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11 }, children: [
        "Ph: ",
        HOTEL_INFO.phone
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderTop: "1px dashed #000", borderBottom: "1px dashed #000", padding: "4px 0", fontSize: 12 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Bill: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: billNumber })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Date: ",
        formatDateTime(createdAt)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", fontSize: 12, marginTop: 6 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { borderBottom: "1px dashed #000" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "left" }, children: "Item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "center" }, children: "Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "right" }, children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "right" }, children: "Total" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: lines.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: l.item_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "center" }, children: l.quantity }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "right" }, children: Number(l.price).toFixed(2) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "right" }, children: (l.quantity * Number(l.price)).toFixed(2) })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderTop: "1px dashed #000", marginTop: 6, paddingTop: 6, display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 14 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GRAND TOTAL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(total) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", marginTop: 10, fontSize: 12 }, children: "— Thank You. Visit Again —" })
  ] });
}
export {
  PrintBill as P,
  printBill as p
};
