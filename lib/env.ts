/**
 * Runtime environment variable validation.
 *
 * Server-side only. This module validates that all required environment
 * variables are present and logs helpful errors when they are missing.
 *
 * In production (NODE_ENV=production), missing required variables throw
 * an error to prevent the app from starting in a broken state.
 * In development, missing variables log warnings so developers can see
 * what still needs configuration without crashing the dev server.
 */

import "server-only";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Required server-side environment variables that must be set for the
 * application to function correctly.
 */
const REQUIRED_VARS = [
  "DATABASE_URL",
  "BETTER_AUTH_SECRET",
] as const;

/**
 * Required in production only.
 */
const PRODUCTION_REQUIRED_VARS = [
  "RESEND_API_KEY",
  "CLOUDFLARE_R2_ENDPOINT",
  "CLOUDFLARE_R2_ACCESS_KEY_ID",
  "CLOUDFLARE_R2_SECRET_ACCESS_KEY",
  "CLOUDFLARE_R2_BUCKET_NAME",
] as const;

/**
 * Optional but recommended variables.
 */
const RECOMMENDED_VARS = [
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "DOCUMENT_SHARE_SECRET",
  "RESEND_FROM_EMAIL",
  "BUSINESS_EMAIL",
] as const;

/**
 * Validate environment variables at startup. Call this once on app init.
 *
 * In production, missing required variables will throw.
 * In development, everything is a warning.
 */
export function validateEnvironment(): void {
  // Skip validation in test environments
  if (process.env.NODE_ENV === "test") return;

  // Skip if no DATABASE_URL — mock/dev mode
  // DATABASE_URL is required — throw in production, warn in development
  if (!process.env.DATABASE_URL) {
    if (isProduction) {
      throw new Error(
        "[env] DATABASE_URL is not set. The application cannot run in production without a database.",
      );
    }
    console.warn(
      "[env] DATABASE_URL is not configured. Running in mock/dev mode without persistence.",
    );
    return;
  }

  // Check required vars — always throw in production
  for (const name of REQUIRED_VARS) {
    if (!process.env[name]) {
      const msg = `[env] Missing required environment variable: ${name}`;
      if (isProduction) {
        throw new Error(msg);
      }
      console.warn(msg);
    }
  }

  // Check production-required vars — throw in production
  for (const name of PRODUCTION_REQUIRED_VARS) {
    if (!process.env[name]) {
      const msg = `[env] Missing production environment variable: ${name}`;
      if (isProduction) {
        throw new Error(msg);
      }
      console.warn(msg);
    }
  }

  // Check recommended vars
  for (const name of RECOMMENDED_VARS) {
    if (!process.env[name]) {
      console.warn(`[env] Recommended environment variable not set: ${name}`);
    }
  }

  // Validate DATABASE_URL format
  try {
    const url = new URL(process.env.DATABASE_URL!);
    const dbName = decodeURIComponent(url.pathname.replace(/^\//, ""));
    const expectedDbName = process.env.EXPECTED_DATABASE_NAME || "johannesjohn";

    if (dbName !== expectedDbName) {
      console.warn(
        `[env] DATABASE_URL database name "${dbName}" does not match ` +
        `EXPECTED_DATABASE_NAME="${expectedDbName}". ` +
        `The assert-safe-database.ts script will refuse operations.`,
      );
    }

    if (!/sslmode=require/.test(url.search)) {
      console.warn(
        "[env] DATABASE_URL does not include sslmode=require. " +
        "The assert-safe-database.ts script will refuse database operations.",
      );
    }
  } catch {
    console.warn("[env] DATABASE_URL is not a valid URL. Check your connection string.");
  }
}

/**
 * Check if a single required variable is set.
 * Useful for one-off checks in API routes.
 */
export function requireEnv(name: string, context?: string): string {
  const value = process.env[name];
  if (!value) {
    const hint = context ? ` (${context})` : "";
    throw new Error(
      `[env] ${name} is required${hint}. Set it in .env.local or the deployment environment.`,
    );
  }
  return value;
}

/**
 * Get an optional environment variable with a fallback.
 */
export function getEnv(name: string, fallback?: string): string | undefined {
  return process.env[name] || fallback;
}
