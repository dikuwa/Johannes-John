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
  const markSrc = inverted ? "/brand/logo-white.svg" : "/brand/logo-full.svg";

  if (variant === "logo") {
    return (
      <div className={cn("flex items-center gap-2.5 select-none", className)}>
        <JJMark src={markSrc} mono={mono} inverted={inverted} className="h-9 w-10 shrink-0" />
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
        <JJMark src={markSrc} mono={mono} inverted={inverted} className="h-5 w-6 shrink-0" />
        <span className={`text-sm font-bold ${inverted ? "text-white" : "text-foreground"}`}>
          JohannesJohn
        </span>
      </span>
    );
  }

  // Icon variant — just the mark
  return <JJMark src={markSrc} mono={mono} inverted={inverted} className={className} />;
}

interface JJMarkProps {
  className?: string;
  src: string;
  inverted?: boolean;
  mono?: boolean;
}

function JJMark({ className, src, inverted = false, mono = false }: JJMarkProps) {
  const filter = mono && !inverted ? "grayscale(1) contrast(1.15)" : undefined;

  return (
    <img
      src={src}
      alt="JohannesJohn"
      className={cn("block h-10 w-11 object-contain", className)}
      style={{ filter }}
      draggable={false}
    />
  );
}
