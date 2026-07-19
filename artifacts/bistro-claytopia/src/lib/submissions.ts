import type { CartLine } from "@/lib/menu-cart";
import { cartLineLabel, formatRupee } from "@/lib/menu-cart";

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined;

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  experience?: string;
  notes?: string;
}

export interface BookingResult {
  success: boolean;
  bookingId: string;
  message?: string;
}

export interface OrderPayload {
  orderRef: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  cart: CartLine[];
  subtotal: number;
}

export interface OrderResult {
  success: boolean;
  orderRef: string;
  message?: string;
}

function fallbackBookingId() {
  return "BC" + String(Math.floor(Math.random() * 9000) + 1000);
}

function fallbackOrderRef() {
  return "OR" + String(Math.floor(Math.random() * 9000) + 1000);
}

async function postToScript<T>(payload: Record<string, unknown>): Promise<T | null> {
  if (!SCRIPT_URL?.trim()) return null;

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function submitBooking(data: BookingPayload): Promise<BookingResult> {
  const result = await postToScript<{ success: boolean; bookingId: string; message?: string }>({
    type: "booking",
    ...data,
  });

  if (result?.bookingId) {
    return { success: true, bookingId: result.bookingId, message: result.message };
  }

  const bookingId = fallbackBookingId();
  return {
    success: false,
    bookingId,
    message: SCRIPT_URL
      ? "Could not reach the booking server. Save your booking ID and call us to confirm."
      : "Booking saved locally. Connect Google Sheets (see google-apps-script/SETUP.md) for email notifications.",
  };
}

export async function submitOrder(data: OrderPayload): Promise<OrderResult> {
  const items = data.cart.map((line) => ({
    name: cartLineLabel(line),
    quantity: line.quantity,
    unitPrice: line.unitPrice,
    lineTotal: line.unitPrice * line.quantity,
  }));

  const result = await postToScript<{ success: boolean; orderRef: string; message?: string }>({
    type: "order",
    orderRef: data.orderRef,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    customerEmail: data.customerEmail,
    items,
    subtotal: data.subtotal,
    itemsSummary: items
      .map((i) => `${i.name} × ${i.quantity} — ₹${formatRupee(i.lineTotal)}`)
      .join("\n"),
  });

  if (result?.orderRef) {
    return { success: true, orderRef: result.orderRef, message: result.message };
  }

  return {
    success: false,
    orderRef: data.orderRef || fallbackOrderRef(),
    message: SCRIPT_URL
      ? "Order placed locally. Show your reference at the counter."
      : "Order reference generated. Pay at the counter when ready.",
  };
}

export function isSubmissionsConfigured() {
  return Boolean(SCRIPT_URL?.trim());
}
