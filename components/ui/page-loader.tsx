/**
 * A branded page loading indicator that matches the JohannesJohn design language.
 * Two variants:
 *   - "full"  : centered vertically in the viewport (for root / non-dashboard pages)
 *   - "inline": smaller, for content areas within an already-rendered layout (dashboard pages)
 *
 * Keyframes are defined in app/globals.css (pageLoaderSlide, pageLoaderFadeIn).
 */

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
      {/* JJ monogram */}
      <div className="flex items-center gap-3 select-none">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          className={`${isFull ? "h-10 w-10" : "h-8 w-8"}`}
          aria-hidden="true"
          style={{
            animation: "jjMarkFloat 2s ease-in-out infinite",
          }}
        >
          <path
            d="M10 15 L10 54 C10 72 22 80 36 80 L44 80 L44 68 L36 68 C28 68 24 64 24 56 L24 15 Z"
            fill="#0d41e2"
          />
          <path
            d="M48 15 L48 54 C48 72 60 80 74 80 L82 80 L82 68 L74 68 C66 68 62 64 62 56 L62 15 Z"
            fill="#1a1a1a"
          />
        </svg>
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
