import { useState, useReducer, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Minus, ShoppingCart, X, Leaf, CheckCircle2, QrCode, Store,
  CreditCard, ChevronDown, ChevronUp, Trash2
} from "lucide-react";
import { menuCategories, MenuItem } from "@/data/menu";
import { useToast } from "@/hooks/use-toast";

interface CartItem extends MenuItem {
  quantity: number;
  categoryName: string;
}

type CartAction =
  | { type: "ADD"; item: MenuItem; categoryName: string }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const exists = state.find((i) => i.id === action.item.id);
      if (exists) return state.map((i) => i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...state, { ...action.item, quantity: 1, categoryName: action.categoryName }];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "SET_QTY":
      if (action.qty <= 0) return state.filter((i) => i.id !== action.id);
      return state.map((i) => i.id === action.id ? { ...i, quantity: action.qty } : i);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

type PaymentModal = null | "counter" | "online";

function generateOrderRef() {
  return "BC" + Math.floor(Math.random() * 9000 + 1000);
}

export function OrderView() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [cartOpen, setCartOpen] = useState(false);
  const [payModal, setPayModal] = useState<PaymentModal>(null);
  const [orderRef] = useState(generateOrderRef);
  const [ordered, setOrdered] = useState(false);
  const { toast } = useToast();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const addItem = useCallback((item: MenuItem, categoryName: string) => {
    dispatch({ type: "ADD", item, categoryName });
    toast({ title: `Added to order`, description: item.name, duration: 1500 });
  }, [toast]);

  const currentCategory = menuCategories.find((c) => c.id === activeCategory)!;

  const handlePay = (method: "counter" | "online") => {
    setPayModal(method);
  };

  const confirmOrder = () => {
    setOrdered(true);
    dispatch({ type: "CLEAR" });
    setCartOpen(false);
    setPayModal(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex gap-6 lg:gap-8 relative">
        {/* Main ordering panel */}
        <div className="flex-1 min-w-0">
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                data-testid={`tab-order-${cat.id}`}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border/60 text-muted-foreground hover:bg-muted"
                }`}
              >
                <span>{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Category header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className={`bg-gradient-to-r ${currentCategory.gradient} rounded-2xl px-6 py-5 mb-6 text-white`}>
                <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-1">Now browsing</p>
                <h3 className="text-xl font-serif font-bold">
                  {currentCategory.emoji} {currentCategory.name}
                </h3>
                <p className="text-white/70 text-sm italic mt-0.5">{currentCategory.subtitle}</p>
              </div>

              {/* Items grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {currentCategory.items.map((item) => {
                  const inCart = cart.find((c) => c.id === item.id);
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      data-testid={`card-order-item-${item.id}`}
                      className="bg-card rounded-2xl border border-border/60 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            <span
                              className={`mt-0.5 shrink-0 w-4 h-4 border-2 rounded-sm flex items-center justify-center ${item.isVeg ? "border-green-600" : "border-red-600"}`}
                              title={item.isVeg ? "Vegetarian" : "Non-vegetarian"}
                            >
                              <span className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
                            </span>
                            <div>
                              <h4 className="font-semibold text-foreground text-sm leading-snug">{item.name}</h4>
                              <div className="flex gap-1.5 mt-0.5 flex-wrap">
                                {item.isPopular && <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-full">Popular</span>}
                                {item.isNew && <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">New</span>}
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
                        </div>
                        <p className="font-bold text-foreground text-sm shrink-0">₹{item.price}</p>
                      </div>

                      {/* Add / Qty control */}
                      {inCart ? (
                        <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-3 py-1.5">
                          <button
                            onClick={() => dispatch({ type: "SET_QTY", id: item.id, qty: inCart.quantity - 1 })}
                            data-testid={`button-dec-${item.id}`}
                            className="w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="font-bold text-primary text-sm">{inCart.quantity}</span>
                          <button
                            onClick={() => dispatch({ type: "SET_QTY", id: item.id, qty: inCart.quantity + 1 })}
                            data-testid={`button-inc-${item.id}`}
                            className="w-7 h-7 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addItem(item, currentCategory.name)}
                          data-testid={`button-add-${item.id}`}
                          className="w-full py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Plus size={14} /> Add to Order
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cart — desktop sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-24">
            <CartPanel
              cart={cart}
              total={total}
              dispatch={dispatch}
              onPay={handlePay}
              ordered={ordered}
              orderRef={orderRef}
            />
          </div>
        </div>
      </div>

      {/* Mobile cart FAB */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setCartOpen(true)}
            data-testid="button-open-cart-mobile"
            className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3.5 rounded-2xl shadow-2xl font-semibold"
          >
            <ShoppingCart size={18} />
            <span>{cartCount} item{cartCount > 1 ? "s" : ""}</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">₹{total}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile cart sheet */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-background rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-border/60">
                <h3 className="font-serif font-bold text-lg">Your Order</h3>
                <button onClick={() => setCartOpen(false)} className="p-2 rounded-full hover:bg-muted" data-testid="button-close-cart">
                  <X size={20} />
                </button>
              </div>
              <div className="p-5">
                <CartPanel
                  cart={cart}
                  total={total}
                  dispatch={dispatch}
                  onPay={(m) => { setCartOpen(false); setPayModal(m); }}
                  ordered={ordered}
                  orderRef={orderRef}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Payment modals */}
      <AnimatePresence>
        {payModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setPayModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              {payModal === "counter" ? (
                <PayAtCounterModal
                  cart={cart}
                  total={total}
                  orderRef={orderRef}
                  onConfirm={confirmOrder}
                  onClose={() => setPayModal(null)}
                />
              ) : (
                <PayOnlineModal
                  total={total}
                  orderRef={orderRef}
                  onConfirm={confirmOrder}
                  onClose={() => setPayModal(null)}
                />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cart panel (shared between sidebar + bottom sheet)
// ---------------------------------------------------------------------------
function CartPanel({
  cart, total, dispatch, onPay, ordered, orderRef,
}: {
  cart: CartItem[];
  total: number;
  dispatch: React.Dispatch<CartAction>;
  onPay: (method: "counter" | "online") => void;
  ordered: boolean;
  orderRef: string;
}) {
  if (ordered) {
    return (
      <div className="text-center py-10 px-4">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="font-serif font-bold text-xl mb-2">Order Placed!</h3>
        <p className="text-muted-foreground text-sm mb-3">Your reference number is</p>
        <p className="text-3xl font-mono font-bold text-primary tracking-widest">{orderRef}</p>
        <p className="text-xs text-muted-foreground mt-3">Show this to your server or at the counter.</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border/60 p-6 text-center">
        <ShoppingCart className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
        <p className="font-semibold text-foreground mb-1">Your order is empty</p>
        <p className="text-sm text-muted-foreground">Add items from the menu to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-border/60">
        <h3 className="font-serif font-bold text-lg flex items-center gap-2">
          <ShoppingCart size={18} className="text-primary" /> Your Order
        </h3>
      </div>
      <div className="divide-y divide-border/60 max-h-72 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-5 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">₹{item.price} each</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => dispatch({ type: "SET_QTY", id: item.id, qty: item.quantity - 1 })}
                data-testid={`button-cart-dec-${item.id}`}
                className="w-6 h-6 rounded-full bg-muted hover:bg-border flex items-center justify-center transition-colors"
              >
                <Minus size={11} />
              </button>
              <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
              <button
                onClick={() => dispatch({ type: "SET_QTY", id: item.id, qty: item.quantity + 1 })}
                data-testid={`button-cart-inc-${item.id}`}
                className="w-6 h-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Plus size={11} />
              </button>
            </div>
            <p className="text-sm font-bold w-14 text-right">₹{item.price * item.quantity}</p>
            <button
              onClick={() => dispatch({ type: "REMOVE", id: item.id })}
              data-testid={`button-cart-remove-${item.id}`}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 border-t border-border/60 bg-muted/30 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="font-bold text-foreground">₹{total}</span>
        </div>
        <p className="text-xs text-muted-foreground">Taxes included · No delivery charges</p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onPay("counter")}
            data-testid="button-pay-counter"
            className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-center"
          >
            <Store size={18} className="text-primary" />
            <span className="text-xs font-semibold text-foreground leading-tight">Pay at<br />Counter</span>
          </button>
          <button
            onClick={() => onPay("online")}
            data-testid="button-pay-online"
            className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-center shadow-md"
          >
            <CreditCard size={18} />
            <span className="text-xs font-semibold leading-tight">Pay<br />Online</span>
          </button>
        </div>
        <button
          onClick={() => dispatch({ type: "CLEAR" })}
          data-testid="button-cart-clear"
          className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors text-center py-1"
        >
          Clear order
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pay at Counter modal
// ---------------------------------------------------------------------------
function PayAtCounterModal({ cart, total, orderRef, onConfirm, onClose }: {
  cart: CartItem[]; total: number; orderRef: string;
  onConfirm: () => void; onClose: () => void;
}) {
  return (
    <div className="bg-background rounded-3xl shadow-2xl w-full max-w-md p-7" onClick={(e) => e.stopPropagation()}>
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
          <Store size={26} className="text-amber-700" />
        </div>
        <h2 className="font-serif font-bold text-2xl mb-1">Pay at Counter</h2>
        <p className="text-muted-foreground text-sm">Show your order reference to any of our team members and pay when you're ready.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-center">
        <p className="text-xs text-amber-700 uppercase tracking-widest mb-1 font-medium">Order Reference</p>
        <p className="text-4xl font-mono font-bold text-amber-900 tracking-widest">{orderRef}</p>
      </div>

      <div className="space-y-2 mb-5 max-h-40 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
            <span className="font-medium">₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold pt-2 border-t border-border/60">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={onClose} data-testid="button-counter-cancel" className="py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
          Edit Order
        </button>
        <button onClick={onConfirm} data-testid="button-counter-confirm" className="py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors shadow-md">
          Confirm Order
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pay Online modal
// ---------------------------------------------------------------------------
function PayOnlineModal({ total, orderRef, onConfirm, onClose }: {
  total: number; orderRef: string;
  onConfirm: () => void; onClose: () => void;
}) {
  const [step, setStep] = useState<"choose" | "upi" | "card">("choose");

  return (
    <div className="bg-background rounded-3xl shadow-2xl w-full max-w-md p-7" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif font-bold text-2xl">Pay Online</h2>
          <p className="text-muted-foreground text-sm">Order {orderRef} · ₹{total}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-muted" data-testid="button-online-close">
          <X size={20} />
        </button>
      </div>

      {step === "choose" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">Choose your payment method</p>
          <button
            onClick={() => setStep("upi")}
            data-testid="button-choose-upi"
            className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <QrCode size={20} className="text-violet-700" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">UPI / QR Code</p>
              <p className="text-xs text-muted-foreground">PhonePe, GPay, Paytm, or scan QR</p>
            </div>
          </button>
          <button
            onClick={() => setStep("card")}
            data-testid="button-choose-card"
            className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <CreditCard size={20} className="text-blue-700" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Card / Net Banking</p>
              <p className="text-xs text-muted-foreground">Debit, credit, or net banking</p>
            </div>
          </button>
        </div>
      )}

      {step === "upi" && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">Scan with any UPI app to pay ₹{total}</p>
          {/* QR code placeholder */}
          <div className="w-48 h-48 mx-auto bg-muted rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border mb-4">
            <QrCode size={64} className="text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">QR Code</p>
          </div>
          <p className="text-xs text-muted-foreground mb-1 font-mono">UPI ID: bistroclaytopia@upi</p>
          <p className="text-xs text-muted-foreground mb-6">Or ask your server to bring the payment device.</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setStep("choose")} className="py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors" data-testid="button-upi-back">Back</button>
            <button onClick={onConfirm} className="py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors" data-testid="button-upi-confirm">
              I've Paid ✓
            </button>
          </div>
        </div>
      )}

      {step === "card" && (
        <div>
          <p className="text-sm text-muted-foreground mb-5">Enter your card details</p>
          <div className="space-y-3 mb-5">
            <input
              placeholder="Card number"
              maxLength={19}
              data-testid="input-card-number"
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono"
            />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="MM / YY" maxLength={5} data-testid="input-card-expiry" className="px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono" />
              <input placeholder="CVV" maxLength={4} data-testid="input-card-cvv" type="password" className="px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono" />
            </div>
            <input placeholder="Name on card" data-testid="input-card-name" className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setStep("choose")} className="py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors" data-testid="button-card-back">Back</button>
            <button onClick={onConfirm} className="py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors shadow-md" data-testid="button-card-pay">
              Pay ₹{total}
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
            🔒 Secured by industry-standard encryption
          </p>
        </div>
      )}
    </div>
  );
}
