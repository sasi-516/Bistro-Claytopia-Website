import { cn } from "@/lib/utils";

type BrandMarkProps = {
  variant?: "hero" | "light" | "footer";
  size?: "nav" | "footer" | "drawer";
  showName?: boolean;
  className?: string;
};

const logoSize = {
  nav: "h-10 w-10 sm:h-11 sm:w-11",
  footer: "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
  drawer: "h-11 w-11",
} as const;

export function BrandMark({
  variant = "light",
  size = "nav",
  showName = true,
  className,
}: BrandMarkProps) {
  const onFooter = variant === "footer";
  const onHero = variant === "hero";

  return (
    <div className={cn("flex items-center gap-2 sm:gap-2.5 min-w-0", className)}>
      <div
        className={cn(
          "shrink-0 rounded-full p-0.5",
          onFooter ? "" : "bg-white shadow-md ring-2 ring-white/80"
        )}
      >
        <img
          src="/logo.png"
          alt={showName ? "" : "Bistro Claytopia"}
          aria-hidden={showName}
          className={cn(logoSize[size], "rounded-full object-contain")}
          width={size === "footer" ? 72 : 44}
          height={size === "footer" ? 72 : 44}
        />
      </div>

      {showName && (
        <div className="min-w-0 leading-none">
          <p
            className={cn(
              "font-serif font-bold tracking-tight",
              size === "nav" && "text-sm sm:text-lg md:text-xl truncate",
              size === "drawer" && "text-lg",
              size === "footer" && "text-xl sm:text-2xl",
              onFooter ? "text-white" : onHero ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" : "text-foreground"
            )}
          >
            Bistro{" "}
            <span className={onFooter || onHero ? "text-primary" : "text-paint-blue"}>Claytopia</span>
          </p>
        </div>
      )}
    </div>
  );
}
