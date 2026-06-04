import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { I as Input, B as Button } from "./input-DqYl-goF.mjs";
import { B as Badge } from "./badge-B45yaSQX.mjs";
import { R as Root, V as Viewport, C as Corner, S as ScrollAreaScrollbar, a as ScrollAreaThumb } from "../_libs/radix-ui__react-scroll-area.mjs";
import { c as cn } from "./router-CN9fCdbZ.mjs";
import { C as CATEGORIES, D as DEFAULT_FOOD_IMAGE, f as formatINR, g as createBill, c as fetchItems } from "./db-CuxukelV.mjs";
import { P as PrintBill, p as printBill } from "./PrintBill-DvUu3rJS.mjs";
import { i as Search, k as ShoppingCart, T as Trash2, l as Minus, P as Plus, m as Eraser, n as Save, j as Printer } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tailwind-merge.mjs";
import "./client-BWDrW2J8.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const ScrollArea = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
    ]
  }
));
ScrollArea.displayName = Root.displayName;
const ScrollBar = reactExports.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
function POSPage() {
  const qc = useQueryClient();
  const {
    data: items = [],
    isLoading
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems
  });
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("All");
  const [cart, setCart] = reactExports.useState([]);
  const [lastBill, setLastBill] = reactExports.useState(null);
  const filtered = reactExports.useMemo(() => {
    return items.filter((i) => i.status === "active").filter((i) => category === "All" ? true : i.category === category).filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [items, category, search]);
  const total = cart.reduce((s, l) => s + l.price * l.quantity, 0);
  function addToCart(it) {
    setCart((c) => {
      const found = c.find((l) => l.item_id === it.id);
      if (found) return c.map((l) => l.item_id === it.id ? {
        ...l,
        quantity: l.quantity + 1
      } : l);
      return [...c, {
        item_id: it.id,
        item_name: it.name,
        price: Number(it.price),
        quantity: 1
      }];
    });
  }
  function changeQty(id, d) {
    setCart((c) => c.map((l) => l.item_id === id ? {
      ...l,
      quantity: l.quantity + d
    } : l).filter((l) => l.quantity > 0));
  }
  function removeLine(id) {
    setCart((c) => c.filter((l) => l.item_id !== id));
  }
  const saveMut = useMutation({
    mutationFn: () => createBill(cart),
    onSuccess: (b) => {
      toast.success(`Bill ${b.bill_number} saved`);
      setLastBill({
        bill_number: b.bill_number,
        created_at: b.created_at,
        lines: cart,
        total
      });
      setCart([]);
      qc.invalidateQueries({
        queryKey: ["bills"]
      });
    },
    onError: (e) => toast.error(e.message ?? "Failed to save bill")
  });
  async function handleSave() {
    if (!cart.length) return toast.error("Cart is empty");
    await saveMut.mutateAsync();
  }
  async function handlePrint() {
    if (!cart.length && !lastBill) return toast.error("Nothing to print");
    if (cart.length) {
      await saveMut.mutateAsync();
      setTimeout(() => printBill(), 200);
    } else {
      printBill();
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] lg:h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 min-w-0 flex flex-col p-4 lg:p-6 gap-4 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-3 items-stretch sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search food...", className: "pl-9 h-11 bg-card", value: search, onChange: (e) => setSearch(e.target.value) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 -mx-1 px-1", children: ["All", ...CATEGORIES].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCategory(c), className: cn("px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all", category === c ? "bg-primary text-primary-foreground shadow" : "bg-card text-foreground hover:bg-muted border"), children: c }, c)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 -mx-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4", children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-muted-foreground py-12", children: "Loading menu…" }),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-muted-foreground py-12", children: "No items found" }),
        filtered.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => addToCart(it), className: "group bg-card rounded-2xl overflow-hidden text-left border hover:shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 active:scale-[0.98]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.image_url || DEFAULT_FOOD_IMAGE, alt: it.name, loading: "lazy", className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", onError: (e) => e.currentTarget.src = DEFAULT_FOOD_IMAGE }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: it.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: it.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-bold text-primary", children: formatINR(Number(it.price)) })
          ] })
        ] }, it.id))
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:w-[400px] xl:w-[440px] border-t lg:border-t-0 lg:border-l bg-card flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg", children: "Current Bill" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-auto", children: [
          cart.length,
          " items"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
        cart.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-10 w-10 mx-auto mb-2 opacity-30" }),
          "Tap food items to start a bill"
        ] }),
        cart.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-xl p-3 border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: l.item_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                formatINR(l.price),
                " × ",
                l.quantity
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeLine(l.item_id), className: "text-muted-foreground hover:text-destructive p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => changeQty(l.item_id, -1), className: "h-8 w-8 rounded-md border bg-card hover:bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 text-center font-medium", children: l.quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => changeQty(l.item_id, 1), className: "h-8 w-8 rounded-md border bg-card hover:bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: formatINR(l.price * l.quantity) })
          ] })
        ] }, l.item_id))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t space-y-3 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cart.reduce((s, l) => s + l.quantity, 0) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-2xl font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatINR(total) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setCart([]), disabled: !cart.length, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { className: "h-4 w-4 mr-1" }),
            " Clear"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", onClick: handleSave, disabled: !cart.length || saveMut.isPending, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-1" }),
            " Save"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handlePrint, disabled: !cart.length && !lastBill, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4 mr-1" }),
            " Print"
          ] })
        ] })
      ] })
    ] }),
    lastBill && /* @__PURE__ */ jsxRuntimeExports.jsx(PrintBill, { billNumber: lastBill.bill_number, createdAt: lastBill.created_at, lines: lastBill.lines, total: lastBill.total })
  ] });
}
export {
  POSPage as component
};
