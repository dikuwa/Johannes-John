/**
 * ThemeToggle — a minimal Sun / Moon toggle that switches between
 * light and dark themes using next-themes.
 *
 * Two variants:
 *   - "default": theme-aware colors (works on light/dark backgrounds)
 *   - "topbar": white-on-blue colors (for the storefront header top bar)
 *
 * Usage:
 *   <ThemeToggle />                     → Dashboard sidebar, etc.
 *   <ThemeToggle variant="topbar" />    → Storefront blue top bar
 */
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "default" | "topbar";
  className?: string;
}

export function ThemeToggle({ variant = "default", className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render icons after mount
  useEffect(() => setMounted(true), []);

  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current === "dark";

  const baseClasses =
    variant === "topbar"
      ? "text-white/80 hover:text-white hover:bg-white/10"
      : "text-muted-foreground hover:text-foreground hover:bg-muted";

  if (!mounted) {
    // Render a placeholder of the same size to prevent layout shift
    return (
      <button
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
          baseClasses,
          className,
        )}
        aria-label="Toggle theme"
        tabIndex={-1}
        disabled
      >
        <span className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
        baseClasses,
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        /* Sun icon */
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        /* Moon icon */
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
