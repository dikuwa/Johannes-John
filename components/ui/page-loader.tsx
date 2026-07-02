/**
 * A branded page loading indicator that matches the JohannesJohn design language.
 * Two variants:
 *   - "full"  : centered vertically in the viewport (for root / non-dashboard pages)
 *   - "inline": smaller, for content areas within an already-rendered layout (dashboard pages)
 *
 * Keyframes are defined in app/globals.css (pageLoaderSlide, pageLoaderFadeIn).
 */
import { JJLogo } from "@/components/ui/jj-logo";

interface PageLoaderProps {
  variant?: "full" | "inline";
}

export function PageLoader({ variant = "full" }: PageLoaderProps) {
  const isFull = variant === "full";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 ${
        isFull ? "min-h-screen" : "min-h-[50vh]"
      }`}
      style={{
        animation: "pageLoaderFadeIn 0.4s ease-out",
      }}
    >
      <div className="flex items-center gap-3 select-none">
        <span
          style={{
            animation: "jjMarkFloat 2s ease-in-out infinite",
          }}
        >
          <JJLogo className={`${isFull ? "h-10 w-11" : "h-8 w-9"}`} />
        </span>
        <span className={`font-bold tracking-tight text-foreground ${isFull ? "text-2xl" : "text-xl"}`}>
          JohannesJohn
        </span>
      </div>

      {/* Animated loading bar */}
      <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full w-full rounded-full bg-primary"
          style={{
            animation: "pageLoaderSlide 1.4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Screen-reader only */}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
