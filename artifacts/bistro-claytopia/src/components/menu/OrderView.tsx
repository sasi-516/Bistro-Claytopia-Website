import { useState, useReducer, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Minus, ShoppingCart, X, CheckCircle2, Store,
  Trash2, Loader2, Construction,
} from "lucide-react";
import {
  menuCategories,
  MenuItem,
  itemNeedsCustomization,
  formatMenuPrice,
  getMenuSections,
} from "@/data/menu";
import { useToast } from "@/hooks/use-toast";
import { ItemCustomizeModal } from "@/components/menu/ItemCustomizeModal";
import { MenuSectionNav } from "@/components/menu/MenuSectionNav";
import {
  buildCartKey,
  cartLineLabel,
  computeUnitPrice,
  formatRupee,
  type CartLine,
  type CartSelections,
} from "@/lib/menu-cart";
import { submitOrder } from "@/lib/submissions";

type CartAction =
  | {
      type: "ADD";
      item: MenuItem;
      categoryName: string;
      selections: CartSelections;
      unitPrice: number;
      cartKey: string;
    }
  | { type: "REMOVE"; cartKey: string }
  | { type: "SET_QTY"; cartKey: string; qty: number }
  | { type: "CLEAR" };

function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "ADD": {
      const exists = state.find((i) => i.cartKey === action.cartKey);
      if (exists) {
        return state.map((i) =>
          i.cartKey === action.cartKey ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...state,
        {
          ...action.item,
          cartKey: action.cartKey,
          quantity: 1,
          categoryName: action.categoryName,
          selections: action.selections,
          unitPrice: action.unitPrice,
        },
      ];
    }
    case "REMOVE":
      return state.filter((i) => i.cartKey !== action.cartKey);
    case "SET_QTY":
      if (action.qty <= 0) return state.filter((i) => i.cartKey !== action.cartKey);
      return state.map((i) =>
        i.cartKey === action.cartKey ? { ...i, quantity: action.qty } : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

type PaymentModal = null | "counter" | "maintenance";

/** Set to false when online ordering is ready for customers. */
const ORDERING_UNDER_MAINTENANCE = true;

function generateOrderRef() {
  return "BC" + Math.floor(Math.random() * 9000 + 1000);
}

export function OrderView() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [activeSection, setActiveSection] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [payModal, setPayModal] = useState<PaymentModal>(null);
  const [customizeItem, setCustomizeItem] = useState<MenuItem | null>(null);
  const [orderRef, setOrderRef] = useState(generateOrderRef);
  const [ordered, setOrdered] = useState(false);
  const [placedSubtotal, setPlacedSubtotal] = useState<number | null>(null);
  const [placedOrderRef, setPlacedOrderRef] = useState<string | null>(null);
  const { toast } = useToast();

  const menuSections = useMemo(() => getMenuSections(), []);

  const visibleSections = useMemo(
    () =>
      activeSection === "all"
        ? menuSections
        : menuSections.filter((s) => s.name === activeSection),
    [menuSections, activeSection]
  );

  const subcategoryOptions = useMemo(
    () => visibleSections.flatMap((s) => s.categories),
    [visibleSections]
  );

  const handleSectionSelect = useCallback((sectionName: string) => {
    setActiveSection(sectionName);
    setActiveSubcategory("all");
  }, []);

  const subtotal = cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const pushToCart = useCallback(
    (
      item: MenuItem,
      categoryName: string,
      selections: CartSelections,
      unitPrice: number,
      cartKey: string
    ) => {
      dispatch({ type: "ADD", item, categoryName, selections, unitPrice, cartKey });
      toast({ title: "Added to order", description: item.name, duration: 1500 });
    },
    [toast]
  );

  const addItem = useCallback(
    (item: MenuItem, categoryName: string) => {
      if (itemNeedsCustomization(item)) {
        setCustomizeItem(item);
        return;
      }
      const selections: CartSelections = { addons: [] };
      const unitPrice = computeUnitPrice(item, selections);
      const cartKey = buildCartKey(item.id);
      pushToCart(item, categoryName, selections, unitPrice, cartKey);
    },
    [pushToCart]
  );

  const handleCustomizeConfirm = useCallback(
    (selections: CartSelections, unitPrice: number, cartKey: string) => {
      if (!customizeItem) return;
      const categoryName =
        menuCategories.find((c) => c.items.some((i) => i.id === customizeItem.id))?.name ?? "";
      pushToCart(customizeItem, categoryName, selections, unitPrice, cartKey);
      setCustomizeItem(null);
    },
    [customizeItem, pushToCart]
  );

  const handlePay = () => {
    setPayModal(ORDERING_UNDER_MAINTENANCE ? "maintenance" : "counter");
  };

  const confirmOrder = async (
    customerName: string,
    customerPhone: string,
    customerEmail: string
  ) => {
    const snapshot = [...cart];
    const snapshotSubtotal = subtotal;
    const ref = orderRef;

    await submitOrder({
      orderRef: ref,
      cart: snapshot,
      subtotal: snapshotSubtotal,
      customerName,
      customerPhone,
      customerEmail,
    });

    setPlacedSubtotal(snapshotSubtotal);
    setPlacedOrderRef(ref);
    setOrdered(true);
    dispatch({ type: "CLEAR" });
    setCartOpen(false);
    setPayModal(null);
    setOrderRef(generateOrderRef());
    toast({
      title: "Order placed",
      description: `Reference ${ref} — pay at the counter.`,
      duration: 4000,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {ORDERING_UNDER_MAINTENANCE && (
        <div
          className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3.5 flex gap-3 items-start"
          role="status"
          data-testid="banner-order-testing"
        >
          <Construction className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Place Order is in meta testing
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              You can browse the menu and build a cart — online ordering is not ready yet
              and is currently under development.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-6 lg:gap-8 relative">
        {/* Main ordering panel */}
        <div className="flex-1 min-w-0">
          {/* Main section picker */}
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold mb-3">
              Browse by menu section
            </p>
            <MenuSectionNav
              sections={menuSections}
              activeSection={activeSection}
              onSelect={handleSectionSelect}
              showAll
            />
          </div>

          {/* Subcategory filter */}
          {subcategoryOptions.length > 1 && (
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-2">
                Filter by part {activeSection !== "all" ? `· ${activeSection}` : ""}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <button
                  type="button"
                  onClick={() => setActiveSubcategory("all")}
                  data-testid="filter-subcategory-all"
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeSubcategory === "all"
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  All parts
                </button>
                {subcategoryOptions.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveSubcategory(cat.id)}
                    data-testid={`filter-subcategory-${cat.id}`}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      activeSubcategory === cat.id
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat.emoji} {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Grouped menu list */}
          <div className="space-y-10">
            {visibleSections.map((section) => {
              const sectionCats =
                activeSubcategory === "all"
                  ? section.categories
                  : section.categories.filter((c) => c.id === activeSubcategory);

              if (sectionCats.length === 0) return null;

              return (
                <section key={section.name}>
                  {activeSection === "all" && (
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-px flex-1 bg-border/60" />
                      <h2 className="text-sm font-serif font-bold text-foreground uppercase tracking-wider shrink-0">
                        {section.name}
                      </h2>
                      <div className="h-px flex-1 bg-border/60" />
                    </div>
                  )}

                  <div className="space-y-8">
                    {sectionCats.map((cat) => (
                      <div key={cat.id} id={`order-${cat.id}`}>
                        <div
                          className={`rounded-xl px-4 py-3 mb-4 bg-gradient-to-r ${cat.gradient} text-white`}
                        >
                          <h3 className="font-serif font-bold text-base">
                            {cat.emoji} {cat.name}
                          </h3>
                          <p className="text-white/75 text-xs italic mt-0.5">{cat.subtitle}</p>
                        </div>

                        <div className="space-y-3">
                          {cat.items.map((item) => (
                            <OrderItemRow
                              key={item.id}
                              item={item}
                              categoryName={cat.name}
                              cart={cart}
                              dispatch={dispatch}
                              addItem={addItem}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* Cart — desktop sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-24">
            <CartPanel
              cart={cart}
              subtotal={subtotal}
              dispatch={dispatch}
              onPay={handlePay}
              ordered={ordered}
              orderRef={placedOrderRef ?? orderRef}
              placedSubtotal={placedSubtotal}
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
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">₹{formatRupee(subtotal)}</span>
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
                  subtotal={subtotal}
                  dispatch={dispatch}
                  onPay={() => { setCartOpen(false); handlePay(); }}
                  ordered={ordered}
                  orderRef={placedOrderRef ?? orderRef}
                  placedSubtotal={placedSubtotal}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout / maintenance modal */}
      <AnimatePresence>
        {(payModal === "counter" || payModal === "maintenance") && (
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
              {payModal === "maintenance" ? (
                <OrderMaintenanceModal onClose={() => setPayModal(null)} />
              ) : (
                <PayAtCounterModal
                  cart={cart}
                  subtotal={subtotal}
                  orderRef={orderRef}
                  onConfirm={confirmOrder}
                  onClose={() => setPayModal(null)}
                />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ItemCustomizeModal
        item={customizeItem}
        open={Boolean(customizeItem)}
        onClose={() => setCustomizeItem(null)}
        onConfirm={handleCustomizeConfirm}
      />
    </div>
  );
}

function OrderItemRow({
  item,
  categoryName,
  cart,
  dispatch,
  addItem,
}: {
  item: MenuItem;
  categoryName: string;
  cart: CartLine[];
  dispatch: React.Dispatch<CartAction>;
  addItem: (item: MenuItem, categoryName: string) => void;
}) {
  const customizable = itemNeedsCustomization(item);
  const qtyInCart = cart.filter((c) => c.id === item.id).reduce((sum, c) => sum + c.quantity, 0);
  const simpleLine = !customizable ? cart.find((c) => c.cartKey === buildCartKey(item.id)) : undefined;

  return (
    <div
      data-testid={`card-order-item-${item.id}`}
      className="bg-card rounded-xl border border-border/60 px-4 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3 hover:shadow-sm transition-shadow"
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <span
          className={`mt-1 shrink-0 w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center ${
            item.isVeg ? "border-green-600" : "border-red-600"
          }`}
          title={item.isVeg ? "Vegetarian" : "Non-vegetarian"}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-foreground text-sm">{item.name}</h4>
            {item.isPopular && (
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-primary/15 text-primary rounded-full">
                Popular
              </span>
            )}
            {item.isNew && (
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                New
              </span>
            )}
            {customizable && qtyInCart > 0 && (
              <span className="text-[9px] font-bold text-primary">{qtyInCart} in cart</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">{item.description}</p>
        </div>
        <p className="font-bold text-foreground text-sm shrink-0 sm:hidden">{formatMenuPrice(item)}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0 sm:pl-0 pl-6">
        <p className="font-bold text-foreground text-sm hidden sm:block w-20 text-right">
          {formatMenuPrice(item)}
        </p>
        {simpleLine ? (
          <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-xl px-2 py-1">
            <button
              onClick={() => dispatch({ type: "SET_QTY", cartKey: simpleLine.cartKey, qty: simpleLine.quantity - 1 })}
              data-testid={`button-dec-${item.id}`}
              className="w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
            >
              <Minus size={13} />
            </button>
            <span className="font-bold text-primary text-sm w-5 text-center">{simpleLine.quantity}</span>
            <button
              onClick={() => addItem(item, categoryName)}
              data-testid={`button-inc-${item.id}`}
              className="w-7 h-7 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-colors"
            >
              <Plus size={13} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addItem(item, categoryName)}
            data-testid={`button-add-${item.id}`}
            className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus size={14} /> {customizable ? "Customize" : "Add"}
          </button>
        )}
      </div>
    </div>
  );
}

function OrderCartSummary({ subtotal }: { subtotal: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-bold">
        <span className="text-foreground">Subtotal</span>
        <span className="text-foreground">₹{formatRupee(subtotal)}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        GST will be added when you pay the bill at the counter.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cart panel (shared between sidebar + bottom sheet)
// ---------------------------------------------------------------------------
function CartPanel({
  cart, subtotal, dispatch, onPay, ordered, orderRef, placedSubtotal,
}: {
  cart: CartLine[];
  subtotal: number;
  dispatch: React.Dispatch<CartAction>;
  onPay: () => void;
  ordered: boolean;
  orderRef: string;
  placedSubtotal: number | null;
}) {
  if (ordered && placedSubtotal !== null) {
    return (
      <div className="text-center py-10 px-4">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="font-serif font-bold text-xl mb-2">Order Placed!</h3>
        <p className="text-muted-foreground text-sm mb-1">Your order reference</p>
        <p className="text-3xl font-mono font-bold text-primary tracking-widest mb-4">{orderRef}</p>
        <p className="text-sm font-semibold text-foreground mb-1">
          Subtotal: ₹{formatRupee(placedSubtotal)}
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          GST will be added when you pay at the counter.
        </p>
        <ul className="text-xs text-muted-foreground space-y-1.5 mb-4 max-w-xs mx-auto text-left">
          <li>✔ Order sent to the kitchen</li>
          <li>✔ Pay at the counter when ready</li>
          <li>✔ Show this reference to your server</li>
        </ul>
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
          <div key={item.cartKey} className="flex items-center gap-3 px-5 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-snug">{cartLineLabel(item)}</p>
              <p className="text-xs text-muted-foreground">₹{formatRupee(item.unitPrice)} each</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => dispatch({ type: "SET_QTY", cartKey: item.cartKey, qty: item.quantity - 1 })}
                data-testid={`button-cart-dec-${item.cartKey}`}
                className="w-6 h-6 rounded-full bg-muted hover:bg-border flex items-center justify-center transition-colors"
              >
                <Minus size={11} />
              </button>
              <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
              <button
                onClick={() => dispatch({ type: "SET_QTY", cartKey: item.cartKey, qty: item.quantity + 1 })}
                data-testid={`button-cart-inc-${item.cartKey}`}
                className="w-6 h-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Plus size={11} />
              </button>
            </div>
            <p className="text-sm font-bold w-14 text-right">₹{formatRupee(item.unitPrice * item.quantity)}</p>
            <button
              onClick={() => dispatch({ type: "REMOVE", cartKey: item.cartKey })}
              data-testid={`button-cart-remove-${item.cartKey}`}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 border-t border-border/60 bg-muted/30 space-y-3">
        <OrderCartSummary subtotal={subtotal} />
        <p className="text-xs text-muted-foreground">
          {ORDERING_UNDER_MAINTENANCE
            ? "Online ordering is under development · Meta testing only"
            : "Pay at counter only · Online payment coming soon"}
        </p>
        <button
          onClick={onPay}
          data-testid="button-place-order"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold shadow-md"
        >
          <Store size={18} />
          Place Order · Pay at Counter
        </button>
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
// Maintenance modal (ordering not live yet)
// ---------------------------------------------------------------------------
function OrderMaintenanceModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="bg-background rounded-3xl shadow-2xl w-full max-w-md p-7 text-center"
      onClick={(e) => e.stopPropagation()}
      data-testid="modal-order-maintenance"
    >
      <div className="w-14 h-14 rounded-full bg-amber-500/15 flex items-center justify-center mx-auto mb-4">
        <Construction size={26} className="text-amber-700" aria-hidden="true" />
      </div>
      <h2 className="font-serif font-bold text-2xl mb-2">Under Maintenance</h2>
      <p className="text-muted-foreground text-sm leading-relaxed mb-2">
        Online ordering is currently under development and not ready to use.
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-6">
        This Place Order experience is in meta testing only. Please place your
        order with our team at the café, or call us to order.
      </p>
      <button
        type="button"
        onClick={onClose}
        data-testid="button-maintenance-ok"
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors shadow-md"
      >
        Got it
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pay at Counter modal
// ---------------------------------------------------------------------------
function PayAtCounterModal({ cart, subtotal, orderRef, onConfirm, onClose }: {
  cart: CartLine[];
  subtotal: number;
  orderRef: string;
  onConfirm: (name: string, phone: string, email: string) => Promise<void>;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!trimmedPhone || trimmedPhone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await onConfirm(trimmedName, trimmedPhone, trimmedEmail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background rounded-3xl shadow-2xl w-full max-w-md p-7 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-3">
          <Store size={26} className="text-primary" />
        </div>
        <h2 className="font-serif font-bold text-2xl mb-1">Place Order</h2>
        <p className="text-muted-foreground text-sm">Enter your details, then pay at the counter.</p>
      </div>

      <div className="bg-primary/10 border border-primary/25 rounded-2xl p-5 mb-5 text-center">
        <p className="text-xs text-primary uppercase tracking-widest mb-1 font-medium">Order Reference</p>
        <p className="text-4xl font-mono font-bold text-foreground tracking-widest">{orderRef}</p>
      </div>

      <div className="space-y-3 mb-5">
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Full Name *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-muted/30 text-sm"
            data-testid="input-order-name"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Phone Number *</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-muted/30 text-sm"
            data-testid="input-order-phone"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Email *</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-muted/30 text-sm"
            data-testid="input-order-email"
          />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      <div className="space-y-2 mb-5 max-h-40 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.cartKey} className="flex justify-between text-sm gap-4">
            <span className="text-muted-foreground">{cartLineLabel(item)} × {item.quantity}</span>
            <span className="font-medium shrink-0">₹{formatRupee(item.unitPrice * item.quantity)}</span>
          </div>
        ))}
        <div className="pt-2 border-t border-border/60">
          <OrderCartSummary subtotal={subtotal} />
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground mb-4">
        Online payment is disabled. GST will be added when you pay at the counter.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={onClose} disabled={submitting} data-testid="button-counter-cancel" className="py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50">
          Edit Order
        </button>
        <button onClick={handleConfirm} disabled={submitting} data-testid="button-counter-confirm" className="py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-70">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Confirm Order
        </button>
      </div>
    </div>
  );
}
