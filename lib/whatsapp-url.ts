/**
 * WhatsApp URL utility for JohannesJohn.
 *
 * Builds wa.me links with optional pre-filled messages.
 * Reads the business WhatsApp number from settings when available,
 * falls back to the environment variable or a default.
 */

/**
 * Format WhatsApp phone number for wa.me links.
 * Strips non-digits and removes leading zero.
 */
export function formatWhatsAppPhone(phone: string): string {
  if (!phone) return "";
  const digits = phone.replace(/[^0-9]/g, "");
  if (!digits) return "";
  // If starts with 0, replace it with country code 264 (Namibia default)
  if (digits.startsWith("0") && digits.length > 3) {
    return "264" + digits.replace(/^0+/, "");
  }
  return digits;
}

/**
 * Format WhatsApp number for wa.me links.
 * Removes +, spaces, and ensures it starts with country code.
 */
function sanitizeWhatsAppNumber(phone: string): string {
  if (!phone) return "264000000000";
  const digits = phone.replace(/[^0-9]/g, "");
  if (!digits) return "264000000000";
  // If starts with 0, assume Namibia local format and replace with country code
  if (digits.startsWith("0") && digits.length > 3) {
    return "264" + digits.replace(/^0+/, "");
  }
  return digits;
}

/**
 * Build a WhatsApp URL that opens the chat with a pre-filled message.
 *
 * @param phone - WhatsApp number (with or without + prefix)
 * @param message - Optional pre-filled message (will be URL-encoded)
 * @returns Full wa.me URL
 */
export function buildWhatsAppUrl(
  phone: string,
  message?: string,
): string {
  const sanitized = sanitizeWhatsAppNumber(phone);
  const base = `https://wa.me/${sanitized}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Format WhatsApp number for display
 */
export function formatWhatsAppNumber(phone: string): string {
  const sanitized = sanitizeWhatsAppNumber(phone);
  if (sanitized.length <= 3) return sanitized;
  const cc = sanitized.slice(0, 3);
  const rest = sanitized.slice(3);
  return `+${cc} ${rest.replace(/(\d{3})(?=\d)/g, "$1 ")}`;
}

/**
 * Pre-built WhatsApp message templates.
 */
export const WHATSAPP_MESSAGES = {
  general: `Hi, I need help with an order/product.`,
  product: (name: string) => `Hi, I'm interested in this product: ${name}.`,
  promotion: (title: string) => `Hi, I'm interested in this promotion: ${title}.`,
  receipt: (orderNumber: string, url: string) =>
    `Please see this document for order ${orderNumber}: ${url}`,
  followUp: (customerName: string, orderNumber: string) =>
    `Hi ${customerName}, following up on your order ${orderNumber}.`,
  enquiry: (items: string[]) =>
    `Hi, I'm interested in these products: ${items.join(", ")}.`,
};

/**
 * Get the WhatsApp URL from localStorage settings.
 * Falls back to buildWhatsAppUrl with the settings number when available.
 */
export function getWhatsAppUrl(
  message?: string,
  phone?: string,
): string {
  if (phone) return buildWhatsAppUrl(phone, message);

  try {
    if (typeof window === "undefined") return "https://wa.me/264000000000";
    const settings = localStorage.getItem("johannesjohn-dashboard");
    if (settings) {
      const parsed = JSON.parse(settings);
      const state = parsed?.state;
      const settingsPhone =
        state?.settings?.whatsapp ||
        state?.contactDetails?.find(
          (c: { type: string; value: string }) => c.type === "whatsapp",
        )?.value;
      if (settingsPhone) return buildWhatsAppUrl(settingsPhone, message);
    }
  } catch {
    // Fall through to default
  }

  return buildWhatsAppUrl("264000000000", message);
}
