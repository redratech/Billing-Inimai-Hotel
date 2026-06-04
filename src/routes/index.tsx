import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, Plus, Minus, Trash2, Printer, Save, Eraser, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  DEFAULT_FOOD_IMAGE,
  itemsQuery,
  formatINR,
  createBill,
  thumbUrl,
  type CartLine,
  type MenuItem,
} from "@/lib/db";
import { PrintBill, printBill } from "@/components/PrintBill";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "POS — Smart Hotel Billing" }] }),
  component: POSPage,
});

function POSPage() {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery(itemsQuery);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [lastBill, setLastBill] = useState<{ bill_number: string; created_at: string; lines: CartLine[]; total: number } | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Modal dialog states for specifying item quantity
  const [selectedItemForQty, setSelectedItemForQty] = useState<MenuItem | null>(null);
  const [typedQty, setTypedQty] = useState<number>(1);

  const filtered = useMemo(() => {
    return items
      .filter((i) => i.status === "active")
      .filter((i) => (category === "All" ? true : i.category === category))
      .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [items, category, search]);

  const total = cart.reduce((s, l) => s + l.price * l.quantity, 0);

  function handleItemClick(it: MenuItem) {
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
      if (found) return c.map((l) => (l.item_id === selectedItemForQty.id ? { ...l, quantity: l.quantity + typedQty } : l));
      return [...c, { item_id: selectedItemForQty.id, item_name: selectedItemForQty.name, price: Number(selectedItemForQty.price), quantity: typedQty }];
    });
    setSelectedItemForQty(null);
    toast.success(`${selectedItemForQty.name} x ${typedQty} added to bill`);
  }

  function changeQty(id: string, d: number) {
    setCart((c) =>
      c
        .map((l) => (l.item_id === id ? { ...l, quantity: l.quantity + d } : l))
        .filter((l) => l.quantity > 0)
    );
  }
  function setQty(id: string, qty: number) {
    setCart((c) =>
      c.map((l) => (l.item_id === id ? { ...l, quantity: qty } : l))
    );
  }
  function handleCartQtyBlur(id: string, qty: number) {
    if (qty <= 0) {
      removeLine(id);
    }
  }
  function removeLine(id: string) {
    setCart((c) => c.filter((l) => l.item_id !== id));
  }

  const saveMut = useMutation({
    mutationFn: () => createBill(cart),
    onSuccess: (b) => {
      toast.success(`Bill ${b.bill_number} saved`);
      setLastBill({ bill_number: b.bill_number, created_at: b.created_at, lines: cart, total });
      setCart([]);
      setCartOpen(false);
      qc.invalidateQueries({ queryKey: ["bills"] });
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to save bill"),
  });

  async function handleSave() {
    if (!cart.length) return toast.error("Cart is empty");
    await saveMut.mutateAsync();
  }

  async function handlePrint() {
    if (!cart.length && !lastBill) return toast.error("Nothing to print");
    if (cart.length) {
      const b = await saveMut.mutateAsync();
      setTimeout(() => printBill(), 200);
      void b;
    } else {
      printBill();
    }
  }

  const cartCount = cart.reduce((s, l) => s + l.quantity, 0);

  const cartPanel = (
    <div className="flex flex-col h-full bg-card">
      <div className="px-5 py-4 border-b flex items-center gap-2">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <div className="font-bold text-lg">Current Bill</div>
        <Badge variant="secondary" className="ml-auto">{cart.length} items</Badge>
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
                    min="0"
                    value={l.quantity === 0 ? "" : l.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setQty(l.item_id, isNaN(val) ? 0 : val);
                    }}
                    onBlur={() => handleCartQtyBlur(l.item_id, l.quantity)}
                    className="w-12 h-8 text-center font-medium border rounded-md bg-card focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
      <div className="p-4 border-t space-y-3 bg-card">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Items</span>
          <span>{cartCount}</span>
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
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] lg:h-screen">
      {/* Left: Menu grid */}
      <section className="flex-1 min-w-0 flex flex-col p-3 sm:p-4 lg:p-6 gap-3 sm:gap-4 overflow-hidden pb-24 lg:pb-6">
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
          <div className="px-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2.5 sm:gap-4">
            {isLoading && (
              <div className="col-span-full text-center text-muted-foreground py-12">Loading menu…</div>
            )}
            {!isLoading && filtered.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">No items found</div>
            )}
            {filtered.map((it) => (
              <button
                key={it.id}
                onClick={() => handleItemClick(it)}
                className="group bg-card rounded-2xl overflow-hidden text-left border hover:shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <div className="aspect-square bg-muted overflow-hidden">
                  <img
                    src={thumbUrl(it.image_url, 320)}
                    alt={it.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).src = DEFAULT_FOOD_IMAGE)}
                  />
                </div>
                <div className="p-2.5 sm:p-3">
                  <div className="text-[10px] sm:text-xs text-muted-foreground truncate">{it.category}</div>
                  <div className="font-semibold truncate text-sm sm:text-base">{it.name}</div>
                  <div className="mt-0.5 sm:mt-1 font-bold text-primary text-sm sm:text-base">{formatINR(Number(it.price))}</div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </section>

      {/* Desktop cart */}
      <aside className="hidden lg:flex lg:w-[400px] xl:w-[440px] border-l flex-col">
        {cartPanel}
      </aside>

      {/* Mobile floating cart button + drawer */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetTrigger asChild>
          <button
            className="lg:hidden no-print fixed bottom-4 inset-x-4 z-30 h-14 rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-card)] flex items-center justify-between px-5 active:scale-[0.98] transition-transform"
            aria-label="Open cart"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-semibold">View Bill</span>
            </div>
            <span className="font-bold text-lg">{formatINR(total)}</span>
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="p-0 h-[88vh] rounded-t-2xl flex flex-col">
          {cartPanel}
        </SheetContent>
      </Sheet>

      {lastBill && (
        <PrintBill
          billNumber={lastBill.bill_number}
          createdAt={lastBill.created_at}
          lines={lastBill.lines}
          total={lastBill.total}
        />
      )}

      {/* Choose Quantity Dialog */}
      <Dialog open={!!selectedItemForQty} onOpenChange={(open) => !open && setSelectedItemForQty(null)}>
        <DialogContent className="max-w-md w-[calc(100%-2rem)]">
          <DialogHeader>
            <DialogTitle>Enter Quantity</DialogTitle>
          </DialogHeader>
          {selectedItemForQty && (
            <div className="space-y-4 py-2">
              <div className="flex gap-4 items-center">
                <div className="h-16 w-16 bg-muted rounded-xl overflow-hidden border flex-shrink-0">
                  <img
                    src={thumbUrl(selectedItemForQty.image_url, 120)}
                    alt={selectedItemForQty.name}
                    className="w-full h-full object-cover"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).src = DEFAULT_FOOD_IMAGE)}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-muted-foreground">{selectedItemForQty.category}</div>
                  <div className="font-bold text-lg truncate">{selectedItemForQty.name}</div>
                  <div className="font-semibold text-primary">{formatINR(Number(selectedItemForQty.price))} each</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-12 text-lg font-bold select-none cursor-pointer"
                    onClick={() => setTypedQty(q => Math.max(1, q - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    className="h-12 text-center text-xl font-bold flex-1"
                    value={typedQty === 0 ? "" : typedQty}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setTypedQty(isNaN(val) ? 0 : val);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        confirmAddToCart();
                      }
                    }}
                    autoFocus
                    onFocus={(e) => e.target.select()}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-12 text-lg font-bold select-none cursor-pointer"
                    onClick={() => setTypedQty(q => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center bg-muted/40 p-3.5 rounded-xl border border-dashed font-semibold">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold text-primary">
                  {formatINR(Number(selectedItemForQty.price) * (typedQty || 0))}
                </span>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setSelectedItemForQty(null)}>
              Cancel
            </Button>
            <Button onClick={confirmAddToCart} disabled={!typedQty || typedQty <= 0}>
              Add to Bill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
