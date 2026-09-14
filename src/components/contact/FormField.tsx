"use client";

import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
};

export function FloatingInput({
  label,
  name,
  type = "text",
  required,
}: BaseProps & { type?: string }) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder=" "
        className="peer w-full rounded-xl border border-charcoal/15 bg-cream/60 px-4 pb-2.5 pt-6 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-terracotta"
      />
      <label
        htmlFor={name}
        className={cn(
          "pointer-events-none absolute left-4 top-4 text-sm text-charcoal/45 transition-all duration-200",
          "peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-terracotta",
          "peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]"
        )}
      >
        {label}
        {required && <span className="text-terracotta"> *</span>}
      </label>
    </div>
  );
}

export function FloatingTextarea({ label, name, required }: BaseProps) {
  return (
    <div className="relative">
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder=" "
        rows={5}
        className="peer w-full resize-none rounded-xl border border-charcoal/15 bg-cream/60 px-4 pb-2.5 pt-6 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-terracotta"
      />
      <label
        htmlFor={name}
        className={cn(
          "pointer-events-none absolute left-4 top-4 text-sm text-charcoal/45 transition-all duration-200",
          "peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-terracotta",
          "peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]"
        )}
      >
        {label}
        {required && <span className="text-terracotta"> *</span>}
      </label>
    </div>
  );
}

export function Checkbox({
  label,
  name,
  required,
}: {
  label: React.ReactNode;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-charcoal/70">
      <input
        type="checkbox"
        name={name}
        required={required}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-charcoal/25 text-terracotta accent-[#A85C32] focus-visible:outline-terracotta"
      />
      <span>{label}</span>
    </label>
  );
}
