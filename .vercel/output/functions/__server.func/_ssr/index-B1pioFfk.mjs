import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button, I as Input, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-DyxDciJI.mjs";
import { B as Badge } from "./badge-D5IrVEgA.mjs";
import { R as Root$1, V as Viewport, C as Corner, S as ScrollAreaScrollbar, a as ScrollAreaThumb } from "../_libs/radix-ui__react-scroll-area.mjs";
import { c as cn } from "./router-wzZ_sFdb.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, a as Close, O as Overlay, b as Title, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { f as formatINR, C as CATEGORIES, D as DEFAULT_FOOD_IMAGE, t as thumbUrl, g as createBill, i as itemsQuery } from "./db-Dcxwj5Ft.mjs";
import { P as PrintBill, p as printBill } from "./PrintBill-BR0OGHIS.mjs";
import { k as ShoppingCart, T as Trash2, l as Minus, P as Plus, m as Eraser, n as Save, j as Printer, i as Search, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./client-CFQ8MHU4.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
const ScrollArea = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Root$1,
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
ScrollArea.displayName = Root$1.displayName;
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
const Sheet = Root;
const SheetTrigger = Trigger;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
function POSPage() {
  const qc = useQueryClient();
  const {
    data: items = [],
    isLoading
  } = useQuery(itemsQuery);
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("All");
  const [cart, setCart] = reactExports.useState([]);
  const [lastBill, setLastBill] = reactExports.useState(null);
  const [cartOpen, setCartOpen] = reactExports.useState(false);
  const [selectedItemForQty, setSelectedItemForQty] = reactExports.useState(null);
  const [typedQty, setTypedQty] = reactExports.useState(1);
  const filtered = reactExports.useMemo(() => {
    return items.filter((i) => i.status === "active").filter((i) => category === "All" ? true : i.category === category).filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [items, category, search]);
  const total = cart.reduce((s, l) => s + l.price * l.quantity, 0);
  function handleItemClick(it) {
    setSelectedItemForQty(it);
    setTypedQty(1);
  }
  function confirmAddToCart() {
    if (!selectedItemForQty) return;
    if (typedQty <= 0) {
      toast.error("Please enter a valid quantity of 1 or more");
      return;
    }
    setCart((c) => {
      const found = c.find((l) => l.item_id === selectedItemForQty.id);
      if (found) return c.map((l) => l.item_id === selectedItemForQty.id ? {
        ...l,
        quantity: l.quantity + typedQty
      } : l);
      return [...c, {
        item_id: selectedItemForQty.id,
        item_name: selectedItemForQty.name,
        price: Number(selectedItemForQty.price),
        quantity: typedQty
      }];
    });
    setSelectedItemForQty(null);
    toast.success(`${selectedItemForQty.name} x ${typedQty} added to bill`);
  }
  function changeQty(id, d) {
    setCart((c) => c.map((l) => l.item_id === id ? {
      ...l,
      quantity: l.quantity + d
    } : l).filter((l) => l.quantity > 0));
  }
  function setQty(id, qty) {
    setCart((c) => c.map((l) => l.item_id === id ? {
      ...l,
      quantity: qty
    } : l));
  }
  function handleCartQtyBlur(id, qty) {
    if (qty <= 0) {
      removeLine(id);
    }
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
      setCartOpen(false);
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
  const cartCount = cart.reduce((s, l) => s + l.quantity, 0);
  const cartPanel = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full bg-card", children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "0", value: l.quantity === 0 ? "" : l.quantity, onChange: (e) => {
              const val = parseInt(e.target.value);
              setQty(l.item_id, isNaN(val) ? 0 : val);
            }, onBlur: () => handleCartQtyBlur(l.item_id, l.quantity), className: "w-12 h-8 text-center font-medium border rounded-md bg-card focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => changeQty(l.item_id, 1), className: "h-8 w-8 rounded-md border bg-card hover:bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: formatINR(l.price * l.quantity) })
        ] })
      ] }, l.item_id))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t space-y-3 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cartCount })
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
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] lg:h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 min-w-0 flex flex-col p-3 sm:p-4 lg:p-6 gap-3 sm:gap-4 overflow-hidden pb-24 lg:pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-3 items-stretch sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search food...", className: "pl-9 h-11 bg-card", value: search, onChange: (e) => setSearch(e.target.value) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 -mx-1 px-1", children: ["All", ...CATEGORIES].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCategory(c), className: cn("px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all", category === c ? "bg-primary text-primary-foreground shadow" : "bg-card text-foreground hover:bg-muted border"), children: c }, c)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 -mx-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2.5 sm:gap-4", children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-muted-foreground py-12", children: "Loading menu…" }),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-muted-foreground py-12", children: "No items found" }),
        filtered.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleItemClick(it), className: "group bg-card rounded-2xl overflow-hidden text-left border hover:shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 active:scale-[0.98]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbUrl(it.image_url, 320), alt: it.name, loading: "lazy", decoding: "async", className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", onError: (e) => e.currentTarget.src = DEFAULT_FOOD_IMAGE }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 sm:p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] sm:text-xs text-muted-foreground truncate", children: it.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate text-sm sm:text-base", children: it.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 sm:mt-1 font-bold text-primary text-sm sm:text-base", children: formatINR(Number(it.price)) })
          ] })
        ] }, it.id))
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:flex lg:w-[400px] xl:w-[440px] border-l flex-col", children: cartPanel }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: cartOpen, onOpenChange: setCartOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "lg:hidden no-print fixed bottom-4 inset-x-4 z-30 h-14 rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-card)] flex items-center justify-between px-5 active:scale-[0.98] transition-transform", "aria-label": "Open cart", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5" }),
            cartCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center", children: cartCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "View Bill" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-lg", children: formatINR(total) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { side: "bottom", className: "p-0 h-[88vh] rounded-t-2xl flex flex-col", children: cartPanel })
    ] }),
    lastBill && /* @__PURE__ */ jsxRuntimeExports.jsx(PrintBill, { billNumber: lastBill.bill_number, createdAt: lastBill.created_at, lines: lastBill.lines, total: lastBill.total }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedItemForQty, onOpenChange: (open) => !open && setSelectedItemForQty(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md w-[calc(100%-2rem)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Enter Quantity" }) }),
      selectedItemForQty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 bg-muted rounded-xl overflow-hidden border flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbUrl(selectedItemForQty.image_url, 120), alt: selectedItemForQty.name, className: "w-full h-full object-cover", onError: (e) => e.currentTarget.src = DEFAULT_FOOD_IMAGE }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: selectedItemForQty.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg truncate", children: selectedItemForQty.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-primary", children: [
              formatINR(Number(selectedItemForQty.price)),
              " each"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-muted-foreground", children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "h-12 w-12 text-lg font-bold select-none cursor-pointer", onClick: () => setTypedQty((q) => Math.max(1, q - 1)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "1", className: "h-12 text-center text-xl font-bold flex-1", value: typedQty === 0 ? "" : typedQty, onChange: (e) => {
              const val = parseInt(e.target.value);
              setTypedQty(isNaN(val) ? 0 : val);
            }, onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                confirmAddToCart();
              }
            }, autoFocus: true, onFocus: (e) => e.target.select() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "h-12 w-12 text-lg font-bold select-none cursor-pointer", onClick: () => setTypedQty((q) => q + 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-muted/40 p-3.5 rounded-xl border border-dashed font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-primary", children: formatINR(Number(selectedItemForQty.price) * (typedQty || 0)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setSelectedItemForQty(null), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: confirmAddToCart, disabled: !typedQty || typedQty <= 0, children: "Add to Bill" })
      ] })
    ] }) })
  ] });
}
export {
  POSPage as component
};
