/**
 * Demo data seeder — populates the database with sample products,
 * categories, brands, promotions, and services.
 *
 * Run: tsx scripts/seed-demo-data.ts
 * Requires: DATABASE_URL to be set in .env or .env.local
 */

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Product data ─────────────────────────────────────────────

interface ProductSeed {
  name: string;
  categoryName: string;
  brandName: string;
  description: string;
  priceCents: number;
  compareAtCents: number | null;
  stock: number;
  condition: string;
  warranty: string;
  isFeatured: boolean;
  imageUrl: string;
}

const U = (id: string) => `https://images.unsplash.com/${id}?w=600&h=600&fit=crop&q=80`;

const CATEGORIES = [
  { name: "Laptops & Computers", sortOrder: 1 },
  { name: "Phones & Tablets", sortOrder: 2 },
  { name: "Audio", sortOrder: 3 },
  { name: "Accessories", sortOrder: 4 },
  { name: "TVs & Displays", sortOrder: 5 },
  { name: "Networking", sortOrder: 6 },
  { name: "Gaming", sortOrder: 7 },
  { name: "CCTV & Security", sortOrder: 8 },
  { name: "Printers & Scanners", sortOrder: 9 },
  { name: "Components", sortOrder: 10 },
];

const BRANDS = [
  { name: "Apple", isFeatured: true, sortOrder: 1 },
  { name: "Samsung", isFeatured: true, sortOrder: 2 },
  { name: "Sony", isFeatured: true, sortOrder: 3 },
  { name: "Dell", isFeatured: true, sortOrder: 4 },
  { name: "HP", isFeatured: true, sortOrder: 5 },
  { name: "Lenovo", isFeatured: false, sortOrder: 6 },
  { name: "Logitech", isFeatured: false, sortOrder: 7 },
  { name: "JBL", isFeatured: false, sortOrder: 8 },
  { name: "TP-Link", isFeatured: false, sortOrder: 9 },
  { name: "Canon", isFeatured: false, sortOrder: 10 },
  { name: "Microsoft", isFeatured: false, sortOrder: 11 },
  { name: "Bose", isFeatured: false, sortOrder: 12 },
];

const PRODUCTS: ProductSeed[] = [
  // ── Laptops & Computers ──
  {
    name: "MacBook Pro 16\" M3 Pro",
    categoryName: "Laptops & Computers", brandName: "Apple",
    description: "Apple M3 Pro chip, 18GB Unified Memory, 512GB SSD, 16.2-inch Liquid Retina XDR display, 22-hour battery life. Space Black.",
    priceCents: 5499900, compareAtCents: 5999900, stock: 8, condition: "New", warranty: "12 Months",
    isFeatured: true, imageUrl: U("photo-1517336714731-489689fd1ca8?auto=format"),
  },
  {
    name: "Dell XPS 15",
    categoryName: "Laptops & Computers", brandName: "Dell",
    description: "Intel Core i7-13700H, 16GB DDR5 RAM, 512GB SSD, 15.6-inch FHD+ InfinityEdge display, Intel Iris Xe Graphics.",
    priceCents: 2999900, compareAtCents: 3499900, stock: 12, condition: "New", warranty: "24 Months",
    isFeatured: true, imageUrl: U("photo-1593642632823-8f785ba67e45?auto=format"),
  },
  {
    name: "HP Spectre x360",
    categoryName: "Laptops & Computers", brandName: "HP",
    description: "Intel Core i7-1355U, 16GB RAM, 1TB SSD, 13.5-inch 3:2 OLED touchscreen, Intel Iris Xe, convertible design.",
    priceCents: 2599900, compareAtCents: 2999900, stock: 5, condition: "New", warranty: "24 Months",
    isFeatured: false, imageUrl: U("photo-1587614382344-4ecb093aee03?auto=format"),
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    categoryName: "Laptops & Computers", brandName: "Lenovo",
    description: "Intel Core i7-1365U, 16GB RAM, 512GB SSD, 14-inch WUXGA IPS, Windows 11 Pro, ultra-light 1.12kg.",
    priceCents: 3299900, compareAtCents: 3799900, stock: 3, condition: "New", warranty: "36 Months",
    isFeatured: false, imageUrl: U("photo-1525547719571-a2d4ac8945e2?auto=format"),
  },
  {
    name: "MacBook Air 15\" M2",
    categoryName: "Laptops & Computers", brandName: "Apple",
    description: "Apple M2 chip, 16GB Unified Memory, 256GB SSD, 15.3-inch Liquid Retina display, 18-hour battery. Midnight.",
    priceCents: 3999900, compareAtCents: null, stock: 15, condition: "New", warranty: "12 Months",
    isFeatured: false, imageUrl: U("photo-1611186871348-b1ce696e52c9?auto=format"),
  },
  // ── Phones & Tablets ──
  {
    name: "iPhone 15 Pro Max 256GB",
    categoryName: "Phones & Tablets", brandName: "Apple",
    description: "A17 Pro chip, 256GB storage, 48MP camera system, 6.7-inch Super Retina XDR display, Titanium design. Natural Titanium.",
    priceCents: 2799900, compareAtCents: 2999900, stock: 20, condition: "New", warranty: "12 Months",
    isFeatured: true, imageUrl: U("photo-1695048133142-1a73584c2a20?auto=format"),
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    categoryName: "Phones & Tablets", brandName: "Samsung",
    description: "Snapdragon 8 Gen 3, 256GB, 200MP camera, 6.8-inch Dynamic AMOLED 2X, S Pen, Galaxy AI features. Titanium Gray.",
    priceCents: 2599900, compareAtCents: 2799900, stock: 14, condition: "New", warranty: "24 Months",
    isFeatured: true, imageUrl: U("photo-1610945264803-c22b62d2a7b3?auto=format"),
  },
  {
    name: "iPad Pro 12.9\" M2",
    categoryName: "Phones & Tablets", brandName: "Apple",
    description: "Apple M2 chip, 256GB, 12.9-inch Liquid Retina XDR display, Thunderbolt / USB 4, Apple Pencil hover. Space Gray.",
    priceCents: 3499900, compareAtCents: 3799900, stock: 7, condition: "New", warranty: "12 Months",
    isFeatured: false, imageUrl: U("photo-1544244015-0df4b3ffc6b0?auto=format"),
  },
  // ── Audio ──
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    categoryName: "Audio", brandName: "Sony",
    description: "Industry-leading noise cancellation, 30-hour battery, Adaptive Sound Control, crystal-clear hands-free calling. Midnight Blue.",
    priceCents: 549900, compareAtCents: 599900, stock: 25, condition: "New", warranty: "12 Months",
    isFeatured: true, imageUrl: U("photo-1590658268037-6bf12f032f55?auto=format"),
  },
  {
    name: "JBL Flip 6 Bluetooth Speaker",
    categoryName: "Audio", brandName: "JBL",
    description: "Portable waterproof speaker, 12-hour playtime, rich JBL Original Pro Sound, IP67 waterproof. Blue.",
    priceCents: 179900, compareAtCents: 199900, stock: 40, condition: "New", warranty: "12 Months",
    isFeatured: false, imageUrl: U("photo-1608043152269-423dbba4e7e1?auto=format"),
  },
  {
    name: "AirPods Pro 2nd Gen USB-C",
    categoryName: "Audio", brandName: "Apple",
    description: "Active Noise Cancellation, Adaptive Audio, Personalized Spatial Audio, USB-C MagSafe charging case.",
    priceCents: 399900, compareAtCents: 449900, stock: 30, condition: "New", warranty: "12 Months",
    isFeatured: true, imageUrl: U("photo-1600294037681-c80b4cb5b2b1?auto=format"),
  },
  {
    name: "Bose QuietComfort Ultra Earbuds",
    categoryName: "Audio", brandName: "Bose",
    description: "World-class noise cancellation, Immersive Audio, CustomTune technology, 6-hour battery, IPX4. Black.",
    priceCents: 449900, compareAtCents: 499900, stock: 10, condition: "New", warranty: "12 Months",
    isFeatured: false, imageUrl: U("photo-1606220588913-b3aacb4d2f46?auto=format"),
  },
  // ── Accessories ──
  {
    name: "Logitech MX Master 3S Mouse",
    categoryName: "Accessories", brandName: "Logitech",
    description: "8K DPI optical sensor, quiet clicks, MagSpeed electromagnetic scroll wheel, USB-C, 70-day battery. Space Gray.",
    priceCents: 149900, compareAtCents: 169900, stock: 35, condition: "New", warranty: "24 Months",
    isFeatured: false, imageUrl: U("photo-1633356122102-3fe601e05bd2?auto=format"),
  },
  {
    name: "Apple Magic Keyboard with Touch ID",
    categoryName: "Accessories", brandName: "Apple",
    description: "Full-size keyboard with Touch ID, numeric keypad, wireless, rechargeable, USB-C. Silver.",
    priceCents: 299900, compareAtCents: 329900, stock: 18, condition: "New", warranty: "12 Months",
    isFeatured: false, imageUrl: U("photo-1587829741301-dc798b83add3?auto=format"),
  },
  {
    name: "Samsung Galaxy Watch 6 Classic",
    categoryName: "Accessories", brandName: "Samsung",
    description: "47mm, rotating bezel, BioActive sensor, sapphire crystal, Wear OS, 2-day battery. Black.",
    priceCents: 599900, compareAtCents: 649900, stock: 12, condition: "New", warranty: "24 Months",
    isFeatured: false, imageUrl: U("photo-1546868871-af0de0ae72fc?auto=format"),
  },
  // ── TVs & Displays ──
  {
    name: "Samsung 65\" Neo QLED 4K QN90C",
    categoryName: "TVs & Displays", brandName: "Samsung",
    description: "Neo Quantum HDR+, Neural Quantum Processor 4K, Dolby Atmos, Anti-glare, Smart Hub. 65-inch.",
    priceCents: 2999900, compareAtCents: 3499900, stock: 6, condition: "New", warranty: "24 Months",
    isFeatured: true, imageUrl: U("photo-1461151304267-38535e780c79?auto=format"),
  },
  {
    name: "Sony 55\" Bravia XR A80L OLED",
    categoryName: "TVs & Displays", brandName: "Sony",
    description: "XR OLED Contrast Pro, Cognitive Processor XR, Dolby Vision, Acoustic Surface Audio+. 55-inch.",
    priceCents: 3499900, compareAtCents: 3999900, stock: 4, condition: "New", warranty: "24 Months",
    isFeatured: false, imageUrl: U("photo-1593359677879-a4bb92f829d1?auto=format"),
  },
  // ── Networking ──
  {
    name: "TP-Link Deco XE75 AXE5400 Mesh",
    categoryName: "Networking", brandName: "TP-Link",
    description: "Tri-band WiFi 6E mesh system, 5400 Mbps, covers 6500 sq ft, AI-driven mesh, 3-pack. White.",
    priceCents: 599900, compareAtCents: 699900, stock: 22, condition: "New", warranty: "24 Months",
    isFeatured: false, imageUrl: U("photo-1611532736597-de2d4265fba3?auto=format"),
  },
  // ── Gaming ──
  {
    name: "PlayStation 5 Slim Digital Edition",
    categoryName: "Gaming", brandName: "Sony",
    description: "Custom SSD 1TB, 4K Blu-ray, Ray Tracing, DualSense controller, WiFi 6. Included: God of War Ragnarök.",
    priceCents: 1299900, compareAtCents: 1499900, stock: 10, condition: "New", warranty: "12 Months",
    isFeatured: true, imageUrl: U("photo-1606813907291-d86efa9b94db?auto=format"),
  },
  // ── CCTV & Security ──
  {
    name: "TP-Link Tapo 2K QHD Pan/Tilt Camera",
    categoryName: "CCTV & Security", brandName: "TP-Link",
    description: "2K QHD resolution, 360° pan/tilt, night vision, two-way audio, microSD up to 256GB. Indoor.",
    priceCents: 79900, compareAtCents: 99900, stock: 50, condition: "New", warranty: "12 Months",
    isFeatured: false, imageUrl: U("photo-1558002038-1055907df827?auto=format"),
  },
  // ── Printers & Scanners ──
  {
    name: "Canon PIXMA G3270 MegaTank",
    categoryName: "Printers & Scanners", brandName: "Canon",
    description: "Refillable ink tank, 6000 pages black / 7700 colour, wireless, print/scan/copy. Black.",
    priceCents: 349900, compareAtCents: 399900, stock: 16, condition: "New", warranty: "24 Months",
    isFeatured: false, imageUrl: U("photo-1612815154858-60aa4c59eaa7?auto=format"),
  },
  // ── Components ──
  {
    name: "Samsung 870 EVO 1TB SSD",
    categoryName: "Components", brandName: "Samsung",
    description: "SATA III 2.5-inch, 560 MB/s read, 530 MB/s write, Samsung V-NAND, 5-year warranty.",
    priceCents: 179900, compareAtCents: 219900, stock: 28, condition: "New", warranty: "60 Months",
    isFeatured: false, imageUrl: U("photo-1563770551531-41c418a75dec?auto=format"),
  },
];

const PROMOTIONS = [
  {
    title: "Back to School Sale",
    slug: "back-to-school-sale",
    description: "Get ready for the new semester with exclusive deals on laptops, tablets, and accessories.",
    discountLabel: "Up to 30% off",
    isFeatured: true,
    placement: "HeroBanner",
    type: "general",
    ctaLabel: "Shop Now",
  },
  {
    title: "Audio Fest 2025",
    slug: "audio-fest-2025",
    description: "Immerse yourself in sound. Save big on headphones, earbuds, and speakers from top brands.",
    discountLabel: "Up to 25% off",
    isFeatured: true,
    placement: "FeaturedSection",
    type: "general",
    ctaLabel: "Explore Audio",
  },
  {
    title: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest tech has landed. Be the first to own the newest smartphones, laptops, and more.",
    discountLabel: "Just Landed",
    isFeatured: true,
    placement: "FeaturedSection",
    type: "general",
    ctaLabel: "View New Arrivals",
  },
];

const SERVICES = [
  {
    title: "Repairs & Diagnostics",
    description: "Expert diagnostics and repair for laptops, phones, and tablets. Most repairs completed within 48 hours.",
    icon: "Wrench",
    features: ["Screen replacement", "Battery replacement", "Water damage repair", "Software troubleshooting", "Data recovery"],
  },
  {
    title: "Network Installation",
    description: "Professional WiFi and network setup for homes and businesses. Full coverage, no dead zones.",
    icon: "Wifi",
    features: ["Site survey & planning", "Access point installation", "Cable management", "Network optimisation", "Security configuration"],
  },
  {
    title: "CCTV Installation",
    description: "Complete security camera solutions for peace of mind. Indoor, outdoor, and PTZ cameras.",
    icon: "Camera",
    features: ["System design & consultation", "Camera installation", "DVR/NVR setup", "Remote viewing configuration", "24/7 support"],
  },
  {
    title: "POS System Setup",
    description: "End-to-end point-of-sale setup including hardware, software, and staff training.",
    icon: "Receipt",
    features: ["Hardware provisioning", "Software configuration", "Inventory syncing", "Staff training", "Ongoing support"],
  },
];

async function main() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString: DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  console.log("Seeding demo data...\n");

  // ── Categories ──
  console.log("Creating categories...");
  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES) {
    const slug = slugify(cat.name);
    const record = await prisma.category.upsert({
      where: { slug },
      update: { name: cat.name, sortOrder: cat.sortOrder, isActive: true },
      create: { name: cat.name, slug, sortOrder: cat.sortOrder, isActive: true },
    });
    categoryMap.set(cat.name, record.id);
  }
  console.log(`  ✓ ${CATEGORIES.length} categories`);

  // ── Brands ──
  console.log("Creating brands...");
  const brandMap = new Map<string, string>();
  for (const brand of BRANDS) {
    const slug = slugify(brand.name);
    const record = await prisma.brand.upsert({
      where: { slug },
      update: { name: brand.name, isFeatured: brand.isFeatured, sortOrder: brand.sortOrder, isActive: true },
      create: { name: brand.name, slug, isFeatured: brand.isFeatured, sortOrder: brand.sortOrder, isActive: true },
    });
    brandMap.set(brand.name, record.id);
  }
  console.log(`  ✓ ${BRANDS.length} brands`);

  // ── Products ──
  console.log("Creating products...");
  let productCount = 0;
  for (const p of PRODUCTS) {
    const categoryId = categoryMap.get(p.categoryName);
    if (!categoryId) {
      console.warn(`  ⚠ Category "${p.categoryName}" not found, skipping "${p.name}"`);
      continue;
    }

    const slug = slugify(p.name);
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      console.log(`  ~ "${p.name}" already exists, skipping`);
      continue;
    }

    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug,
        brand: p.brandName,
        categoryId,
        condition: p.condition,
        description: p.description,
        priceCents: p.priceCents,
        compareAtPriceCents: p.compareAtCents,
        stockQuantity: p.stock,
        availability: p.stock > 5 ? "InStock" : p.stock > 0 ? "LowStock" : "OutOfStock",
        lowStockThreshold: 5,
        warranty: p.warranty,
        isFeatured: p.isFeatured,
        isPublished: true,
      },
    });

    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: p.imageUrl,
        altText: p.name,
        sortOrder: 0,
      },
    });

    productCount++;
  }
  console.log(`  ✓ ${productCount} products created`);

  // ── Promotions ──
  console.log("Creating promotions...");
  const now = new Date();
  for (const promo of PROMOTIONS) {
    const existing = await prisma.promotion.findUnique({ where: { slug: promo.slug } });
    if (existing) {
      console.log(`  ~ "${promo.title}" already exists, skipping`);
      continue;
    }

    const startsAt = new Date(now);
    startsAt.setDate(startsAt.getDate() - 7);
    const endsAt = new Date(now);
    endsAt.setDate(endsAt.getDate() + 30);

    await prisma.promotion.create({
      data: {
        title: promo.title,
        slug: promo.slug,
        description: promo.description,
        discountLabel: promo.discountLabel,
        startsAt,
        endsAt,
        isActive: true,
        isFeatured: promo.isFeatured,
        placement: promo.placement,
        type: promo.type,
        ctaLabel: promo.ctaLabel,
        bannerImageUrl: pick([
          U("photo-1531297484001-80022131f5a1?auto=format"),
          U("photo-1526374965328-7f61d4dc18c5?auto=format"),
          U("photo-1518770660439-4636190af475?auto=format"),
        ]),
      },
    });
  }
  console.log(`  ✓ ${PROMOTIONS.length} promotions`);

  // ── Services ──
  console.log("Creating services...");
  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    const slug = slugify(s.title);
    const existing = await prisma.service.findFirst({
      where: { title: s.title },
    });
    if (existing) {
      console.log(`  ~ "${s.title}" already exists, skipping`);
      continue;
    }

    await prisma.service.create({
      data: {
        title: s.title,
        description: s.description,
        icon: s.icon,
        imageUrl: pick([
          U("photo-1486312338219-ce68d2c6f44d?auto=format"),
          U("photo-1581091226825-a6a2a5aee158?auto=format"),
          U("photo-1530893609608-32a9af3aa95c?auto=format"),
          U("photo-1558494949-ef010cbdcc31?auto=format"),
        ]),
        sortOrder: (i + 1) * 10,
        isEnabled: true,
        features: JSON.stringify(s.features),
      },
    });
  }
  console.log(`  ✓ ${SERVICES.length} services`);

  // ── Store Settings ──
  console.log("Creating store settings...");
  await prisma.storeSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      data: JSON.stringify({
        storeName: "JohanessJohn",
        tagline: "Namibia's Premier Tech Destination",
        currency: "NAD",
        currencySymbol: "N$",
        businessPhone: "+264 81 581 1676",
        whatsappNumber: "264815811676",
        businessEmail: "sales@johannesjohn.com",
        address: "Shop 1, Maerua Mall, Windhoek, Namibia",
        socialLinks: {
          facebook: "",
          instagram: "",
          twitter: "",
        },
        shippingPolicy: "Free collection in-store. Nationwide delivery available — rates calculated at checkout.",
        returnPolicy: "14-day return policy for unused items in original packaging. Warranty applies as per manufacturer terms.",
        privacyPolicy: "",
        termsOfService: "",
      }),
    },
  });
  console.log("  ✓ Store settings");

  console.log(`\n✅ Demo data seeded successfully!`);
  console.log(`   ${productCount} products · ${CATEGORIES.length} categories · ${BRANDS.length} brands · ${PROMOTIONS.length} promotions · ${SERVICES.length} services`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
