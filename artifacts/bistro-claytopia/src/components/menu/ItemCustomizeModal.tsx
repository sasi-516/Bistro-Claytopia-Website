import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { formatMenuPrice } from "@/data/menu";
import {
  buildCartKey,
  computeUnitPrice,
  formatRupee,
  type CartSelections,
} from "@/lib/menu-cart";

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (selections: CartSelections, unitPrice: number, cartKey: string) => void;
}

export function ItemCustomizeModal({ item, open, onClose, onConfirm }: ItemCustomizeModalProps) {
  const [variantId, setVariantId] = useState<string>("");
  const [addonIds, setAddonIds] = useState<string[]>([]);

  useEffect(() => {
    if (!item) return;
    setVariantId(item.variants?.[0]?.id ?? "");
    setAddonIds([]);
  }, [item]);

  const selections = useMemo<CartSelections>(() => {
    if (!item) return { addons: [] };
    return {
      variant: item.variants?.find((v) => v.id === variantId),
      addons: (item.addons ?? []).filter((a) => addonIds.includes(a.id)),
    };
  }, [item, variantId, addonIds]);

  const unitPrice = item ? computeUnitPrice(item, selections) : 0;

  const toggleAddon = (id: string) => {
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleConfirm = () => {
    if (!item) return;
    if (item.variants?.length && !selections.variant) return;
    const cartKey = buildCartKey(
      item.id,
      selections.variant?.id,
      selections.addons.map((a) => a.id)
    );
    onConfirm(selections, unitPrice, cartKey);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md z-[70]"
            role="dialog"
            aria-modal="true"
            aria-label={`Customize ${item.name}`}
          >
            <div className="bg-background rounded-3xl shadow-2xl border border-border/60 overflow-hidden max-h-[85vh] flex flex-col">
              <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-border/60">
                <div>
                  <h3 className="font-serif font-bold text-xl text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted shrink-0"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 py-5 space-y-6 overflow-y-auto">
                {item.variants && item.variants.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      {item.id.startsWith("pz")
                        ? "Choose size"
                        : item.id.startsWith("bg")
                          ? "Choose portion"
                          : "Choose style"}
                    </p>
                    <div className="space-y-2">
                      {item.variants.map((variant) => (
                        <label
                          key={variant.id}
                          className={`flex items-center justify-between gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                            variantId === variant.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={`variant-${item.id}`}
                              checked={variantId === variant.id}
                              onChange={() => setVariantId(variant.id)}
                              className="accent-primary"
                            />
                            <span className="text-sm font-medium text-foreground">{variant.name}</span>
                          </span>
                          <span className="text-sm font-bold text-foreground">₹{variant.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {item.addons && item.addons.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Add toppings (optional)
                    </p>
                    <div className="space-y-2">
                      {item.addons.map((addon) => (
                        <label
                          key={addon.id}
                          className={`flex items-center justify-between gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                            addonIds.includes(addon.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={addonIds.includes(addon.id)}
                              onChange={() => toggleAddon(addon.id)}
                              className="accent-primary"
                            />
                            <span className="text-sm font-medium text-foreground">{addon.name}</span>
                          </span>
                          <span className="text-sm font-bold text-foreground">+₹{addon.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-5 border-t border-border/60 bg-muted/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Item total</span>
                  <span className="text-lg font-bold text-foreground">₹{formatRupee(unitPrice)}</span>
                </div>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
                  data-testid={`button-confirm-customize-${item.id}`}
                >
                  Add to Order · ₹{formatRupee(unitPrice)}
                </button>
                {!item.variants?.length && (
                  <p className="text-[11px] text-center text-muted-foreground mt-2">
                    Base price {formatMenuPrice(item)}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
