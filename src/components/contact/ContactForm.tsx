"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Section } from "@/components/ui/Section";
import { FloatingInput, FloatingTextarea, Checkbox } from "@/components/contact/FormField";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1400);
  }

  return (
    <Section id="contact" tone="light">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow tone="light">Contact</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Let&apos;s build your next chapter.
            </h2>
            <p className="mt-5 max-w-md text-lg text-charcoal/65">
              Tell us about your brand and where you want it to go. We&apos;ll
              follow up within one business day with next steps.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="relative"
          >
            <div
              className={cn(
                "grid grid-cols-1 gap-5 transition-opacity duration-300 sm:grid-cols-2",
                status === "success" && "pointer-events-none opacity-30"
              )}
            >
              <FloatingInput label="Name" name="name" required />
              <FloatingInput label="Email" name="email" type="email" required />
              <div className="sm:col-span-2">
                <FloatingInput label="Website" name="website" type="url" />
              </div>
              <div className="sm:col-span-2">
                <FloatingTextarea label="Project details" name="details" required />
              </div>
              <div className="flex flex-col gap-3 sm:col-span-2">
                <Checkbox
                  name="terms"
                  required
                  label={
                    <>
                      I agree to the terms of service and privacy policy.
                    </>
                  }
                />
                <Checkbox
                  name="marketing"
                  label="Keep me posted on growth tips and studio news."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className={cn(
                "group relative mt-8 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-4 text-sm font-semibold tracking-tight transition-colors duration-300 sm:w-auto",
                status === "success"
                  ? "bg-olive text-cream"
                  : "bg-charcoal text-cream hover:bg-terracotta"
              )}
            >
              {status === "idle" && "Send message"}
              {status === "loading" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              )}
              {status === "success" && (
                <>
                  <Check className="h-4 w-4" />
                  Message sent
                </>
              )}
            </button>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-charcoal/55"
              >
                Thanks — we&apos;ll be in touch within one business day.
              </motion.p>
            )}
          </motion.form>
        </div>
      </Container>
    </Section>
  );
}
