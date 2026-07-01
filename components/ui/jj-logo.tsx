/**
 * JJ Monogram — A bold, interlocking letter mark for JohannesJohn.
 *
 * Two J's designed as a clean geometric monogram:
 *   - Left J in primary blue (#0d41e2)
 *   - Right J in dark foreground (#1a1a1a or white)
 *   - No gradients, flat colors only
 *
 * Usage:
 *   <JJLogo variant="icon" />           → Square 100×100 mark
 *   <JJLogo variant="logo" />            → Horizontal lockup with "JohannesJohn" text
 *   <JJLogo variant="icon" className="h-10 w-10" />
 */

import { cn } from "@/lib/utils";

interface JJLogoProps {
  variant?: "icon" | "logo" | "inline";
  className?: string;
  /** For dark/colored backgrounds — makes both J's white */
  inverted?: boolean;
  /** For single-color scenarios (favicon, small icons) */
  mono?: boolean;
}

export function JJLogo({
  variant = "icon",
  className,
  inverted = false,
  mono = false,
}: JJLogoProps) {
  if (variant === "logo") {
    return (
      <div className={cn("flex items-center gap-2.5 select-none", className)}>
        <JJMark mono={mono} inverted={inverted} className="h-9 w-9 shrink-0" />
        <span className="flex flex-col leading-tight">
          <span className={`text-lg font-bold ${inverted ? "text-white" : "text-foreground"}`}>
            JohannesJohn
          </span>
          <span className={`hidden text-[11px] font-semibold sm:block ${inverted ? "text-white/70" : "text-primary"}`}>
            Electronics retail
          </span>
        </span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span className={cn("inline-flex items-center gap-1.5 select-none", className)}>
        <JJMark mono={mono} inverted={inverted} className="h-5 w-5 shrink-0" />
        <span className={`text-sm font-bold ${inverted ? "text-white" : "text-foreground"}`}>
          JohannesJohn
        </span>
      </span>
    );
  }

  // Icon variant — just the mark
  return <JJMark mono={mono} inverted={inverted} className={className} />;
}

// ── Core SVG mark ──

interface JJMarkProps {
  className?: string;
  inverted?: boolean;
  mono?: boolean;
}

function JJMark({ className, inverted = false, mono = false }: JJMarkProps) {
  // When inverted (on dark/colored backgrounds), both J's become white.
  // When mono, both J's use the foreground color.
  const leftColor = inverted ? "#ffffff" : mono ? "#1a1a1a" : "#0d41e2";
  const rightColor = inverted ? "#ffffff" : mono ? "#1a1a1a" : "#1a1a1a";

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10", className)}
      aria-label="JohannesJohn"
      role="img"
    >
      {/* Left J */}
      <path
        d="M10 15 L10 54 C10 72 22 80 36 80 L44 80 L44 68 L36 68 C28 68 24 64 24 56 L24 15 Z"
        fill={leftColor}
      />

      {/* Right J */}
      <path
        d="M48 15 L48 54 C48 72 60 80 74 80 L82 80 L82 68 L74 68 C66 68 62 64 62 56 L62 15 Z"
        fill={rightColor}
      />
    </svg>
  );
}
