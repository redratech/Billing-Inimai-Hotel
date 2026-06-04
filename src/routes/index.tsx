import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, Plus, Minus, Trash2, Printer, Save, Eraser, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  DEFAULT_FOOD_IMAGE,
  fetchItems,
  formatINR,
  createBill,
  type CartLine,
  type MenuItem,
} from "@/lib/db";
import { PrintBill, printBill } from "@/components/PrintBill";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "POS — Hotel Inimai Billing" }] }),
  component: POSPage,
});

function POSPage() {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery({ queryKey: ["items"], queryFn: fetchItems });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [lastBill, setLastBill] = useState<{ bill_number: string; created_at: string; lines: CartLine[]; total: number } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    return items
      .filter((i) => i.status === "active")
      .filter((i) => (category === "All" ? true : i.category === category))
      .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [items, category, search]);

  const total = cart.reduce((s, l) => s + l.price * l.quantity, 0);

  function addToCart(it: MenuItem) {
    setCart((c) => {
      const found = c.find((l) => l.item_id === it.id);
      if (found) return c.map((l) => (l.item_id === it.id ? { ...l, quantity: l.quantity + 1 } : l));
      return [...c, { item_id: it.id, item_name: it.name, price: Number(it.price), quantity: 1 }];
    });
  }
  function changeQty(id: string, d: number) {
    setCart((c) =>
      c
        .map((l) => (l.item_id === id ? { ...l, quantity: l.quantity + d } : l))
        .filter((l) => l.quantity > 0)
    );
  }
  function removeLine(id: string) {
    setCart((c) => c.filter((l) => l.item_id !== id));
  }

  function updateQty(id: string, qty: number) {
    setCart((c) =>
      c.map((l) => (l.item_id === id ? { ...l, quantity: qty } : l))
    );
  }

  function cleanupCart() {
    setCart((c) => c.filter((l) => l.quantity > 0));
  }

  const saveMut = useMutation({
    mutationFn: (lines?: CartLine[]) => createBill(lines || cart),
    onSuccess: (b, variables) => {
      toast.success(`Bill ${b.bill_number} saved`);
      const savedLines = variables || cart;
      const savedTotal = savedLines.reduce((s, l) => s + l.price * l.quantity, 0);
      setLastBill({ bill_number: b.bill_number, created_at: b.created_at, lines: savedLines, total: savedTotal });
      setCart([]);
      setDrawerOpen(false);
      qc.invalidateQueries({ queryKey: ["bills"] });
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to save bill"),
  });

  async function handleSave() {
    const activeCart = cart.filter((l) => l.quantity > 0);
    if (!activeCart.length) return toast.error("Cart is empty");
    await saveMut.mutateAsync(activeCart);
  }

  async function handlePrint() {
    const activeCart = cart.filter((l) => l.quantity > 0);
    if (!activeCart.length && !lastBill) return toast.error("Nothing to print");
    if (activeCart.length) {
      const b = await saveMut.mutateAsync(activeCart);
      setTimeout(() => printBill(), 200);
      void b;
    } else {
      printBill();
    }
  }

  const renderCartContent = (isDrawer = false) => (
    <div className="flex flex-col h-full overflow-hidden bg-card">
      <div className="px-5 py-4 border-b flex items-center gap-2">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <div className="font-bold text-lg">Current Bill</div>
        <Badge variant="secondary" className="ml-auto">{cart.length} items</Badge>
        {isDrawer && (
          <DrawerClose asChild>
            <Button variant="ghost" size="sm" className="ml-auto">
              Close
            </Button>
          </DrawerClose>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {cart.length === 0 && (
            <div className="text-center py-16 text-muted-foreground text-sm">
              <ShoppingCart className="h-10 w-10 mx-auto mb-2 opacity-30" />
              Tap food items to start a bill
            </div>
          )}
          {cart.map((l) => (
            <div key={l.item_id} className="bg-background rounded-xl p-3 border">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{l.item_name}</div>
                  <div className="text-xs text-muted-foreground">{formatINR(l.price)} × {l.quantity}</div>
                </div>
                <button onClick={() => removeLine(l.item_id)} className="text-muted-foreground hover:text-destructive p-1">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button onClick={() => changeQty(l.item_id, -1)} className="h-8 w-8 rounded-md border bg-card hover:bg-muted flex items-center justify-center">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <input
                    type="number"
                    value={l.quantity || ""}
                    onChange={(e) => {
                      const val = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
                      if (!isNaN(val)) {
                        updateQty(l.item_id, val);
                      }
                    }}
                    onBlur={() => cleanupCart()}
                    className="w-12 h-8 text-center border rounded-md bg-background [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-medium"
                    min="0"
                  />
                  <button onClick={() => changeQty(l.item_id, 1)} className="h-8 w-8 rounded-md border bg-card hover:bg-muted flex items-center justify-center">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="font-bold">{formatINR(l.price * l.quantity)}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t space-y-3 bg-card mt-auto">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Items</span>
          <span>{cart.reduce((s, l) => s + l.quantity, 0)}</span>
        </div>
        <div className="flex items-center justify-between text-2xl font-bold">
          <span>Total</span>
          <span className="text-primary">{formatINR(total)}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" onClick={() => setCart([])} disabled={!cart.length}>
            <Eraser className="h-4 w-4 mr-1" /> Clear
          </Button>
          <Button variant="secondary" onClick={handleSave} disabled={!cart.length || saveMut.isPending}>
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
          <Button onClick={handlePrint} disabled={!cart.length && !lastBill}>
            <Printer className="h-4 w-4 mr-1" /> Print
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] lg:h-screen relative">
      {/* Left: Menu grid */}
      <section className="flex-1 min-w-0 flex flex-col p-4 lg:p-6 gap-4 overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search food..."
              className="pl-9 h-11 bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                category === c
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-card text-foreground hover:bg-muted border"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <ScrollArea className="flex-1 -mx-1">
          <div className="px-1 pb-28 lg:pb-0 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
            {isLoading && (
              <div className="col-span-full text-center text-muted-foreground py-12">Loading menu…</div>
            )}
            {!isLoading && filtered.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">No items found</div>
            )}
            {filtered.map((it) => (
              <button
                key={it.id}
                onClick={() => addToCart(it)}
                className="group bg-card rounded-2xl overflow-hidden text-left border hover:shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <div className="aspect-square bg-muted overflow-hidden">
                  <img
                    src={it.image_url || DEFAULT_FOOD_IMAGE}
                    alt={it.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).src = DEFAULT_FOOD_IMAGE)}
                  />
                </div>
                <div className="p-3">
                  <div className="text-xs text-muted-foreground">{it.category}</div>
                  <div className="font-semibold truncate">{it.name}</div>
                  <div className="mt-1 font-bold text-primary">{formatINR(Number(it.price))}</div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </section>

      {/* Right: Cart (Desktop only) */}
      <aside className="hidden lg:flex lg:w-[400px] xl:w-[440px] border-t lg:border-t-0 lg:border-l bg-card flex flex-col">
        {renderCartContent()}
      </aside>

      {/* Mobile Cart Floating Action Bar */}
      {(cart.length > 0 || lastBill) && (
        <div className="lg:hidden fixed bottom-4 inset-x-4 z-40 bg-sidebar text-sidebar-foreground p-3 rounded-2xl flex items-center justify-between shadow-lg border border-sidebar-border animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="text-xs opacity-75">
                {cart.length > 0
                  ? `${cart.reduce((s, l) => s + l.quantity, 0)} items`
                  : "Last bill saved"}
              </div>
              <div className="font-bold text-sm">
                {cart.length > 0 ? formatINR(total) : lastBill?.bill_number}
              </div>
            </div>
          </div>
          {cart.length > 0 ? (
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button size="sm" className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/95">
                  View Bill
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[85vh] h-[85vh] flex flex-col bg-card border-none">
                <div className="flex-1 overflow-hidden flex flex-col">
                  {renderCartContent(true)}
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="border-sidebar-primary text-sidebar-primary hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-1" /> Reprint
            </Button>
          )}
        </div>
      )}

      {lastBill && (
        <PrintBill
          billNumber={lastBill.bill_number}
          createdAt={lastBill.created_at}
          lines={lastBill.lines}
          total={lastBill.total}
        />
      )}
    </div>
  );
}
