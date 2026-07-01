"use client";

/**
 * Route-level error boundary for the public document share page (/d/[code]).
 *
 * Catches any server or client errors during rendering and displays
 * a branded error message so customers never see the generic
 * "Something went wrong" page.
 */

export default function DocumentShareError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 100 100" fill="none" className="h-10 w-10 shrink-0" aria-hidden="true">
              <path d="M10 15 L10 54 C10 72 22 80 36 80 L44 80 L44 68 L36 68 C28 68 24 64 24 56 L24 15 Z" fill="#0d41e2"/>
              <path d="M48 15 L48 54 C48 72 60 80 74 80 L82 80 L82 68 L74 68 C66 68 62 64 62 56 L62 15 Z" fill="#1a1a1a"/>
            </svg>
            <span className="text-lg font-bold text-foreground">
              JohannesJohn
            </span>
          </div>
        </div>

        {/* Error icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Unable to Load Document
          </h1>
          <p className="text-sm text-muted-foreground">
            This document link could not be loaded. It may have expired or been
            revoked. Please contact JohannesJohn for assistance.
          </p>
        </div>

        {/* Try Again */}
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>

        {/* Contact */}
        <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Need help?</p>
          <p>Contact JohannesJohn for assistance.</p>
          <p className="mt-2 text-xs">
            JohannesJohn &mdash; Windhoek, Namibia
          </p>
        </div>
      </div>
    </div>
  );
}
