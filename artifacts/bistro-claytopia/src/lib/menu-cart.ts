import type { MenuAddon, MenuItem, MenuVariant } from "@/data/menu";

export interface CartSelections {
  variant?: MenuVariant;
  addons: MenuAddon[];
}

export interface CartLine extends MenuItem {
  cartKey: string;
  quantity: number;
  categoryName: string;
  selections: CartSelections;
  unitPrice: number;
}

export interface BillSummary {
  subtotal: number;
  cgst: number;
  sgst: number;
  gst: number;
  grandTotal: number;
}

const CGST_RATE = 0.025;
const SGST_RATE = 0.025;

export function buildCartKey(itemId: string, variantId?: string, addonIds: string[] = []): string {
  return `${itemId}|${variantId ?? ""}|${[...addonIds].sort().join(",")}`;
}

export function computeUnitPrice(item: MenuItem, selections: CartSelections): number {
  const base = selections.variant?.price ?? item.price;
  return base + selections.addons.reduce((sum, addon) => sum + addon.price, 0);
}

export function cartLineLabel(line: CartLine): string {
  const parts = [line.name];
  if (line.selections.variant) parts.push(line.selections.variant.name);
  if (line.selections.addons.length) {
    parts.push(`+ ${line.selections.addons.map((a) => a.name).join(", ")}`);
  }
  return parts.join(" · ");
}

export function roundMoney(amount: number) {
  return Math.round(amount * 100) / 100;
}

export function formatRupee(amount: number) {
  return amount % 1 === 0 ? String(amount) : amount.toFixed(2);
}

export function calculateBill(subtotal: number): BillSummary {
  const cgst = roundMoney(subtotal * CGST_RATE);
  const sgst = roundMoney(subtotal * SGST_RATE);
  const gst = roundMoney(cgst + sgst);
  const grandTotal = roundMoney(subtotal + gst);
  return { subtotal, cgst, sgst, gst, grandTotal };
}
