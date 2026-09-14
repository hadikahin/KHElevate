"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Calendar, AlertCircle } from "lucide-react";
import { LEAD_CAPTURE } from "@content/leadCapture";
import { Logo } from "@/components/Logo";

type Stage = "closed" | "open" | "sending" | "success" | "error";

const SESSION_KEY = "kh-lead-widget-autoshown";

export function LeadCaptureWidget() {
  const [stage, setStage] = useState<Stage>("closed");
  const [showBubble, setShowBubble] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deckAvailable, setDeckAvailable] = useState(true);
  const dismissedRef = useRef(false);

  useEffect(() => {
    const bubbleTimer = window.setTimeout(() => setShowBubble(true), 2500);
    const pulseTimer = window.setTimeout(() => setShowPulse(false), 7000);

    let alreadyAutoShown = false;
    try {
      alreadyAutoShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // ignore storage errors (private browsing, etc.)
    }

    let delayTimer: number | undefined;
    function markAutoShown() {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
    }

    function triggerAutoOpen() {
      if (dismissedRef.current) return;
      setStage((s) => (s === "closed" ? "open" : s));
      setShowBubble(false);
      markAutoShown();
      cleanup();
    }

    function onScroll() {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      const depth = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (depth >= LEAD_CAPTURE.triggerScrollDepth) triggerAutoOpen();
    }

    function cleanup() {
      if (delayTimer) window.clearTimeout(delayTimer);
      window.removeEventListener("scroll", onScroll);
    }

    if (!alreadyAutoShown) {
      delayTimer = window.setTimeout(triggerAutoOpen, LEAD_CAPTURE.triggerDelayMs);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      window.clearTimeout(bubbleTimer);
      window.clearTimeout(pulseTimer);
      cleanup();
    };
  }, []);

  function open() {
    dismissedRef.current = false;
    setShowBubble(false);
    setStage((s) => (s === "closed" || s === "error" ? "open" : s));
  }

  function close() {
    dismissedRef.current = true;
    setShowBubble(false);
    setStage("closed");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = { name: data.get("name"), email: data.get("email") };

    setStage("sending");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/send-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.ok) {
        throw new Error(result?.error || "Something went wrong. Please try again.");
      }

      setDeckAvailable(result.deckAvailable !== false);
      setStage("success");
    } catch (err) {
      setStage("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const isOpenish = stage !== "closed";

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {isOpenish && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-3xl border border-charcoal/10 bg-cream text-charcoal shadow-[0_30px_70px_-20px_rgba(43,36,30,0.45)]"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
              <Logo compact size="sm" variant="light" />
              <button
                aria-label="Close"
                onClick={close}
                className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/50 transition-colors hover:bg-charcoal/5 hover:text-charcoal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              {(stage === "open" || stage === "sending") && (
                <>
                  <p className="text-sm leading-relaxed text-charcoal/75">
                    {LEAD_CAPTURE.openMessage}
                  </p>
                  <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
                    <input
                      name="name"
                      required
                      placeholder={LEAD_CAPTURE.namePlaceholder}
                      disabled={stage === "sending"}
                      className="w-full rounded-xl border border-charcoal/15 bg-white/60 px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta disabled:opacity-60"
                    />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={LEAD_CAPTURE.emailPlaceholder}
                      disabled={stage === "sending"}
                      className="w-full rounded-xl border border-charcoal/15 bg-white/60 px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={stage === "sending"}
                      className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta disabled:opacity-70"
                    >
                      {stage === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {LEAD_CAPTURE.submitLabel}
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

              {stage === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4"
                >
                  <p className="text-sm leading-relaxed text-charcoal/75">
                    {deckAvailable
                      ? LEAD_CAPTURE.successMessage
                      : LEAD_CAPTURE.successMessageDeckPending}
                  </p>
                  {LEAD_CAPTURE.bookingUrl ? (
                    <a
                      href={LEAD_CAPTURE.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-charcoal"
                    >
                      <Calendar className="h-4 w-4" />
                      {LEAD_CAPTURE.bookingCtaLabel}
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title="Booking link coming soon"
                      className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-charcoal/10 px-5 py-3 text-sm font-semibold text-charcoal/40"
                    >
                      <Calendar className="h-4 w-4" />
                      {LEAD_CAPTURE.bookingCtaLabel} — coming soon
                    </button>
                  )}
                </motion.div>
              )}

              {stage === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  <p className="flex items-start gap-1.5 text-sm text-terracotta">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {errorMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStage("open")}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta"
                  >
                    Try again
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBubble && !isOpenish && (
          <motion.button
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={open}
            className="rounded-2xl rounded-br-sm bg-charcoal px-4 py-2.5 text-left text-sm font-medium text-cream shadow-lg"
          >
            {LEAD_CAPTURE.bubbleLabel}
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => (isOpenish ? close() : open())}
        aria-label={isOpenish ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-cream shadow-[0_18px_40px_-15px_rgba(168,92,50,0.7)]"
      >
        {showPulse && !isOpenish && (
          <motion.span
            className="absolute inset-0 rounded-full bg-terracotta"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.7 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="relative">
          {isOpenish ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </span>
      </motion.button>
    </div>
  );
}
