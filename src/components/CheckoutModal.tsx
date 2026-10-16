import { useState } from "react";
import { cn } from "../utils/vehicleLookup";
import { SITE } from "../config/site";
import { CloseIcon, ArrowIcon } from "./ui";

export interface CheckoutModalProps {
  pkgName?: string;
  pkgPrice?: number | string;
  pkgCode?: string;
  checkoutType?: "sticker" | "vhr";
  onClose: () => void;
  onSuccess?: (vin: string) => void;
}

export function CheckoutModal({
  pkgName = "Documentation Package",
  pkgPrice,
  pkgCode,
  checkoutType = "sticker",
  onClose,
  onSuccess,
}: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = /^\S+@\S+\.\S+$/.test(email.trim());

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) {
      setError("Please enter a valid email address for delivery.");
      return;
    }

    setIsRedirecting(true);
    setError("");

    // Build payload matching ZIP's checkout flow
    const planCode = pkgCode || (pkgName.toLowerCase().includes("unlimited") ? "BUILDSHEETSTICKERSTUN" : "BUILDSHEETSTICKERST1");
    const fields = [
      { name: "email", value: email.trim() },
      { name: "cart_plan", value: planCode },
      { name: "vin", value: "CREDIT" },
      { name: "phone", value: phone.trim() },
      { name: "user_type", value: "user" },
      { name: "payment_gateway", value: "default" },
    ];

    try {
      const bytes = new TextEncoder().encode(JSON.stringify(fields));
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
      const newData = btoa(binString);
      const wpPage = window.location.pathname.replace(/^\/+|\/+$/g, "").replace(/\.html$/, "") || "pricing";
      const params = new URLSearchParams({
        "new-data": newData,
        wpPage,
        type: checkoutType,
      });

      // Redirect to actual checkout
      window.location.href = `${SITE.url}/members/checkout?${params.toString()}`;
    } catch {
      // Fallback
      if (onSuccess) {
        onSuccess("WDDGF5EB3BR183192");
      }
      setIsRedirecting(false);
    }
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[95] bg-black/85 backdrop-blur-[4px] overflow-y-auto p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="modal-panel relative w-full max-w-md border border-line-2 bg-surface text-fg shadow-panel hud-corners corners-on overflow-hidden"
      >
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center border border-line-2 bg-surface-2 text-mut hover:text-lime hover:border-lime/60 transition-colors cursor-pointer"
        >
          <CloseIcon />
        </button>

        {/* Form Body - Only Email, Phone, CTA, and Terms/Privacy disclaimer */}
        <div className="p-6 sm:p-8 pt-10 space-y-5">
          {error && (
            <div className="border border-warn/50 bg-warn/10 p-3 font-mono text-[11px] text-warn">
              {error}
            </div>
          )}

          <form onSubmit={handleProceed} className="space-y-4">
            <div>
              <label htmlFor="chk-email" className="block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-mut mb-1.5">
                Email Address <span className="text-lime">*</span>
              </label>
              <input
                id="chk-email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="name@example.com"
                className="w-full bg-surface-2 border border-line-2 px-4 py-3 text-[14px] font-body text-fg placeholder:text-mut/50 outline-none focus:border-lime/70 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="chk-phone" className="block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-mut mb-1.5">
                Phone Number
              </label>
              <input
                id="chk-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-surface-2 border border-line-2 px-4 py-3 text-[14px] font-body text-fg placeholder:text-mut/50 outline-none focus:border-lime/70 transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isRedirecting || !isValidEmail}
                className={cn(
                  "btn-hud w-full inline-flex items-center justify-center gap-2.5 border border-lime bg-lime text-bg px-6 py-4 font-display text-[12.5px] font-semibold uppercase tracking-[0.16em] rounded-[4px] cursor-pointer hover:shadow-glow transition-all",
                  (!isValidEmail || isRedirecting) && "opacity-60 cursor-not-allowed"
                )}
              >
                {isRedirecting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg border-t-transparent" />
                    <span>Redirecting...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowIcon />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-[11px] leading-relaxed text-mut/80 text-center pt-1">
            By selecting "Proceed to Checkout" you are confirming that you have read and agree to{" "}
            {SITE.name}'s{" "}
            <a href="/terms" className="text-lime underline hover:text-fg">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-lime underline hover:text-fg">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
