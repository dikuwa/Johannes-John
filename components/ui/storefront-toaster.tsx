"use client";

import { Toaster } from "sonner";

export function StorefrontToaster() {
  return (
    <Toaster
      position="bottom-center"
      visibleToasts={3}
      expand={false}
      toastOptions={{
        className: "text-sm font-medium",
        style: {
          background: "var(--color-card)",
          color: "var(--color-foreground)",
          border: "1px solid var(--color-border)",
        },
        classNames: {
          success:
            "!bg-success-soft !text-success !border-success/30",
          error:
            "!bg-accent !text-primary !border-primary/30",
        },
      }}
    />
  );
}
