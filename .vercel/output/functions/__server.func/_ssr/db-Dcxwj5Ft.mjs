import { s as supabase } from "./client-CFQ8MHU4.mjs";
import { q as queryOptions } from "../_libs/tanstack__react-query.mjs";
const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Beverages", "Snacks"];
const DEFAULT_FOOD_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800";
async function fetchItems() {
  const { data, error } = await supabase.from("items").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
const itemsQuery = queryOptions({
  queryKey: ["items"],
  queryFn: fetchItems,
  staleTime: 5 * 60 * 1e3,
  gcTime: 30 * 60 * 1e3
});
function thumbUrl(url, w = 320) {
  const src = url || DEFAULT_FOOD_IMAGE;
  if (!/images\.unsplash\.com/.test(src)) return src;
  src.includes("?") ? "&" : "?";
  const cleaned = src.replace(/([?&])w=\d+/g, "$1").replace(/&&+/g, "&").replace(/\?&/, "?");
  return `${cleaned}${cleaned.includes("?") ? "&" : "?"}w=${w}&q=70&auto=format&fit=crop`;
}
async function fetchBills() {
  const { data, error } = await supabase.from("bills").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
async function fetchBillItems(billId) {
  const { data, error } = await supabase.from("bill_items").select("*").eq("bill_id", billId);
  if (error) throw error;
  return data ?? [];
}
async function fetchAllBillItems() {
  const { data, error } = await supabase.from("bill_items").select("*");
  if (error) throw error;
  return data ?? [];
}
async function createBill(lines) {
  const total = lines.reduce((s, l) => s + l.price * l.quantity, 0);
  const { data: bill, error } = await supabase.from("bills").insert({ total_amount: total }).select().single();
  if (error) throw error;
  const rows = lines.map((l) => ({
    bill_id: bill.id,
    item_id: l.item_id,
    item_name: l.item_name,
    quantity: l.quantity,
    price: l.price,
    subtotal: l.price * l.quantity
  }));
  const { error: e2 } = await supabase.from("bill_items").insert(rows);
  if (e2) throw e2;
  return bill;
}
const HOTEL_INFO = {
  name: "Inimai Hotel",
  address: "Main Road, M.Reddiapatti",
  phone: "+91 9626868774"
};
function formatINR(n) {
  return "₹" + Number(n).toFixed(2);
}
function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}
export {
  CATEGORIES as C,
  DEFAULT_FOOD_IMAGE as D,
  HOTEL_INFO as H,
  fetchBills as a,
  fetchAllBillItems as b,
  formatDateTime as c,
  fetchItems as d,
  fetchBillItems as e,
  formatINR as f,
  createBill as g,
  itemsQuery as i,
  thumbUrl as t
};
