"use client";

import { ChangeEvent } from "react";

export function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  label: string;
  value: number | string;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value);
    if (!Number.isNaN(n)) onChange(n);
  };

  return (
    <label className="block">
      <span className="block text-sm text-text-secondary-light mb-2">{label}</span>
      <div className="relative">
        <input
          type="number"
          className="w-full rounded-xl bg-surface-elevated-light dark:bg-surface-elevated-dark border border-secondary/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/30"
          value={value}
          onChange={handle}
          min={min}
          max={max}
          step={step}
        />
        {suffix ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light text-sm">{suffix}</span>
        ) : null}
      </div>
    </label>
  );
}

export function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl">
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <div className="text-text-secondary-light">{children}</div>
    </div>
  );
}


