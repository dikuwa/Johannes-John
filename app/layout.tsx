import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { PageTransitionProvider } from "@/components/ui/page-transition-provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "JohannesJohn",
    template: "%s | JohannesJohn",
  },
  description:
    "New, pre-owned and refurbished technology products in Namibia. Apple, Windows, Gaming, CCTV, Networking, POS and more.",
  keywords: [
    "technology",
    "Namibia",
    "laptops",
    "desktops",
    "CCTV",
    "networking",
    "POS",
    "Apple",
    "gaming",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {/* ── CSS-only initial loader — shows before React hydration ── */}
        <style
          id="fz-initial-loader-css"
          dangerouslySetInnerHTML={{
            __html: `
#dt-initial-loader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: var(--color-background, #faf9f6);
}

#dt-initial-loader .dt-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  user-select: none;
}

#dt-initial-loader .dt-brand-mark {
  width: 2.5rem;
  height: 2.5rem;
}

#dt-initial-loader .dt-brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-foreground, #1a1a1a);
  font-family: ${spaceGrotesk.style.fontFamily};
}

#dt-initial-loader .dt-bar-track {
  width: 8rem;
  height: 0.25rem;
  overflow: hidden;
  border-radius: 999px;
  background: var(--color-muted, #e8e6e1);
}

#dt-initial-loader .dt-bar {
  height: 100%;
  width: 100%;
  border-radius: 999px;
  background: var(--color-primary, #0d41e2);
  animation: dt-loader-slide 1.4s ease-in-out infinite;
}

@keyframes dt-loader-slide {
  0%   { transform: translateX(-100%); width: 30%; }
  50%  { transform: translateX(200%); width: 50%; }
  100% { transform: translateX(450%); width: 30%; }
}
`,
          }}
        />
        <div id="dt-initial-loader">
          <div className="dt-brand">
            <svg viewBox="0 0 100 100" fill="none" className="dt-brand-mark" aria-hidden="true" style={{ animation: "jjMarkFloat 2s ease-in-out infinite" }}>
              <path d="M10 15 L10 54 C10 72 22 80 36 80 L44 80 L44 68 L36 68 C28 68 24 64 24 56 L24 15 Z" fill="#0d41e2"/>
              <path d="M48 15 L48 54 C48 72 60 80 74 80 L82 80 L82 68 L74 68 C66 68 62 64 62 56 L62 15 Z" fill="#1a1a1a"/>
            </svg>
            <span className="dt-brand-name">JohannesJohn</span>
          </div>
          <div className="dt-bar-track">
            <div className="dt-bar" />
          </div>
        </div>
        <Providers>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </Providers>
      </body>
    </html>
  );
}
