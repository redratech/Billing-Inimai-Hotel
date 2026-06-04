import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchBills, fetchAllBillItems, fetchItems, formatINR, formatDateTime } from "@/lib/db";
import { IndianRupee, Receipt, Utensils, TrendingUp, Crown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Hotel Inimai" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { data: bills = [] } = useQuery({ queryKey: ["bills"], queryFn: fetchBills });
  const { data: items = [] } = useQuery({ queryKey: ["items"], queryFn: fetchItems });
  const { data: billItems = [] } = useQuery({ queryKey: ["bill_items"], queryFn: fetchAllBillItems });

  const todayStr = new Date().toDateString();
  const monthKey = new Date().toISOString().slice(0, 7);

  const todayBills = bills.filter((b) => new Date(b.created_at).toDateString() === todayStr);
  const todaySales = todayBills.reduce((s, b) => s + Number(b.total_amount), 0);
  const monthlyRevenue = bills
    .filter((b) => b.created_at.startsWith(monthKey))
    .reduce((s, b) => s + Number(b.total_amount), 0);

  const itemTotals = new Map<string, { name: string; qty: number; revenue: number }>();
  for (const bi of billItems) {
    const cur = itemTotals.get(bi.item_name) ?? { name: bi.item_name, qty: 0, revenue: 0 };
    cur.qty += bi.quantity;
    cur.revenue += Number(bi.subtotal);
    itemTotals.set(bi.item_name, cur);
  }
  const top = [...itemTotals.values()].sort((a, b) => b.qty - a.qty);
  const topItem = top[0]?.name ?? "—";

  // last 7 days
  const days: { day: string; revenue: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toDateString();
    const rev = bills.filter((b) => new Date(b.created_at).toDateString() === key).reduce((s, b) => s + Number(b.total_amount), 0);
    days.push({ day: d.toLocaleDateString("en-IN", { weekday: "short" }), revenue: rev });
  }

  const recent = bills.slice(0, 6);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <header>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's what's happening at your hotel today.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
        <StatCard icon={<IndianRupee className="h-5 w-5" />} label="Today's Sales" value={formatINR(todaySales)} gradient />
        <StatCard icon={<Receipt className="h-5 w-5" />} label="Bills Today" value={String(todayBills.length)} />
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Monthly Revenue" value={formatINR(monthlyRevenue)} />
        <StatCard icon={<Utensils className="h-5 w-5" />} label="Menu Items" value={String(items.length)} />
        <StatCard icon={<Crown className="h-5 w-5" />} label="Top Seller" value={topItem} small />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl p-5 border shadow-[var(--shadow-soft)]">
          <h2 className="font-bold mb-4">Sales — Last 7 Days</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={days}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(v: number) => formatINR(Number(v))} />
                <Bar dataKey="revenue" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card rounded-2xl p-5 border shadow-[var(--shadow-soft)]">
          <h2 className="font-bold mb-4">Top Selling Items</h2>
          {top.length === 0 ? (
            <div className="text-sm text-muted-foreground py-8 text-center">No sales yet</div>
          ) : (
            <ul className="space-y-3">
              {top.slice(0, 6).map((t, i) => (
                <li key={t.name} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center font-bold text-sm">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.qty} sold · {formatINR(t.revenue)}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-card rounded-2xl border shadow-[var(--shadow-soft)] overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="font-bold">Recent Bills</h2>
          <Link to="/bills" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        {recent.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No bills yet. Start billing from the POS!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3">Bill #</th>
                  <th className="text-left px-5 py-3">Date & Time</th>
                  <th className="text-right px-5 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((b) => (
                  <tr key={b.id} className="border-t hover:bg-muted/30">
                    <td className="px-5 py-3 font-semibold">{b.bill_number}</td>
                    <td className="px-5 py-3 text-muted-foreground">{formatDateTime(b.created_at)}</td>
                    <td className="px-5 py-3 text-right font-bold">{formatINR(Number(b.total_amount))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, gradient, small }: { icon: React.ReactNode; label: string; value: string; gradient?: boolean; small?: boolean }) {
  return (
    <div
      className="rounded-2xl p-4 lg:p-5 border shadow-[var(--shadow-soft)]"
      style={gradient ? { background: "var(--gradient-primary)", color: "var(--primary-foreground)", border: "none" } : { background: "var(--card)" }}
    >
      <div className="flex items-center gap-2 opacity-80">{icon}<span className="text-xs uppercase tracking-wide font-medium">{label}</span></div>
      <div className={`mt-2 font-bold ${small ? "text-lg" : "text-2xl lg:text-3xl"}`}>{value}</div>
    </div>
  );
}