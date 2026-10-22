/**
 * ============================================================================
 * SLIQ VEGAS — Product Catalogue Data
 * Slogan: "Wear The Lifestyle."
 * Location: Dzivaresekwa Extension, Harare, Zimbabwe
 * WhatsApp: +263 78 871 5684
 * ============================================================================
 * 
 * CLIENT INSTRUCTIONS:
 * - To ADD a new product: Copy any object below, paste it into the array, and update the details.
 * - To UPDATE photos: Place your new photo in 'assets/images/' and update the 'image' property.
 * - To UPDATE prices: Change 'price' from 'Price on request' to your actual price (e.g., '$25 USD').
 * - To CHANGE availability: Set 'availability' to 'In Stock', 'Limited Stock', or 'Pre-Order'.
 * 
 * Note: In accordance with the project brief, no fictitious prices, stock counts, 
 * or customer reviews are fabricated. All pricing and availability are verified directly 
 * with the SLIQ VEGAS team via WhatsApp.
 */

const SLIQ_BRAND = {
  name: "SLIQ VEGAS",
  slogan: "Wear The Lifestyle.",
  location: "Dzivaresekwa Extension, Harare, Zimbabwe",
  phone: "+263 78 871 5684",
  phoneRaw: "+263788715684",
  whatsappUrl: "https://wa.me/263788715684",
  socials: {
    instagram: "https://www.instagram.com/sliqvegas?dlrf=b2YyN2h3MHkza2l6",
    tiktok: "https://www.tiktok.com/@sliqvegas_clothing",
    facebook: "https://www.facebook.com/share/19iHVYkdPZ/"
  },
  deliveryScope: "Available across Harare and Zimbabwe"
};

const SLIQ_CATEGORIES = [
  { id: "all", label: "All Collections", icon: "grid" },
  { id: "tees", label: "Graphic Tees / Basic Wear", icon: "tshirt" },
  { id: "hoodies", label: "Hoodies", icon: "hoodie" },
  { id: "bottoms", label: "Tracksuit Bottoms", icon: "pants" },
  { id: "cargos", label: "Cargo Pants", icon: "cargo" },
  { id: "sets", label: "Tracksuits and Drip Sets", icon: "set" },
  { id: "accessories", label: "Accessories / Headwear", icon: "cap" }
];

const SLIQ_PRODUCTS = [
  {
    id: "sv-tee-01",
    name: "SLIQ VEGAS Essential Plain T-Shirt",
    category: "tees",
    categoryLabel: "Graphic Tees / Basic Wear",
    badge: "EVERYDAY ESSENTIAL",
    gender: "Unisex Streetwear",
    image: "images/SLIQVEGAS PLAIN T-SHIRTS.png",
    isRealAsset: true,
    price: "Price on request",
    availability: "Available • Confirm on WhatsApp",
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    availableColours: ["Pitch Black", "Crisp White"],
    description: "Clean, versatile everyday T-shirt with a minimalist look, perfect for casual wear and custom styling.",
    details: [
      "100% Premium Heavyweight Combed Cotton",
      "Minimalist SLIQ VEGAS chest print with red crown signature crest",
      "Relaxed unisex everyday streetwear drape",
      "Reinforced ribbed collar and durable twin-needle stitching"
    ]
  },
  {
    id: "sv-cap-01",
    name: "SLIQ VEGAS Signature Baseball Cap",
    category: "accessories",
    categoryLabel: "Accessories / Headwear",
    badge: "SIGNATURE ACCESSORY",
    gender: "Unisex Streetwear",
    image: "images/SLIQVEGAS caps.png",
    isRealAsset: true,
    price: "Price on request",
    availability: "Available • Confirm on WhatsApp",
    availableSizes: ["One Size"],
    availableColours: ["Royal Blue"],
    description: "A stylish SLIQ VEGAS branded cap designed to complete your streetwear look.",
    details: [
      "Premium structured cotton twill crown",
      "High-definition 3D embroidered SLIQ VEGAS crest & crown",
      "Classic pre-curved visor with tone-on-tone stitch lines",
      "Adjustable snapback strap closure for custom unisex fit"
    ]
  },
  {
    id: "sv-hoodie-01",
    name: "SLIQ VEGAS Pink Drip Signature Hoodie",
    category: "hoodies",
    categoryLabel: "Hoodies",
    badge: "Campaign Highlight",
    gender: "Unisex Streetwear",
    image: "assets/images/product-pink-hoodie-model.jpg",
    isRealAsset: true,
    price: "Price on request",
    availability: "Available • Confirm on WhatsApp",
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    availableColours: ["Washed Black", "Heather Grey"],
    description: "High-fashion streetwear hoodie as captured in the official Harare campaign photoshoot. Heavyweight fleece draped with distinctive SLIQ VEGAS pink drip iconography for standout street presence.",
    details: [
      "400+ GSM brushed back premium cotton fleece",
      "Official high-gloss pink liquid drip chest artwork",
      "Double-layered structured hood with heavy-gauge drawcords",
      "Ribbed cuffs and waistband with bar-tacked kangaroo pocket"
    ]
  },
  {
    id: "sv-hoodie-02",
    name: "SLIQ VEGAS SV Monogram Heavyweight Hoodie",
    category: "hoodies",
    categoryLabel: "Hoodies",
    badge: "Core Classic",
    gender: "Unisex Streetwear",
    image: "assets/images/product-pink-hoodie-top.jpg",
    isRealAsset: true,
    price: "Price on request",
    availability: "Available • Confirm on WhatsApp",
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    availableColours: ["Jet Black", "Deep Charcoal"],
    description: "The core SLIQ VEGAS identity piece featuring the iconic interlocking SV monogram in crisp white and crimson on pure pitch-black fleece. Ultimate comfort meets unapologetic street presence.",
    details: [
      "Ultra-dense 400+ GSM brushed fleece interior",
      "Signature SV Monogram chest statement emblem",
      "Double-lined hood with structured drape",
      "Kangaroo pouch pocket with reinforced bar-tacks"
    ]
  },
  {
    id: "sv-bottoms-01",
    name: "SLIQ VEGAS Heavyweight Tracksuit Bottoms",
    category: "bottoms",
    categoryLabel: "Tracksuit Bottoms",
    badge: "Street Essential",
    gender: "Unisex Streetwear",
    image: "images/SLIQVEGAS Tracksuits and bottoms.jpg",
    isRealAsset: true,
    price: "Price on request",
    availability: "Available • Confirm on WhatsApp",
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    availableColours: ["Pitch Black", "Heather Grey"],
    description: "Premium fleece sweatpants tailored with a tapered leg and stacked ankle cuff. Built for everyday mobility and effortless streetwear pairings.",
    details: [
      "Heavyweight cotton fleece with soft brushed interior",
      "Elasticated waistband with metal-tipped drawcords",
      "Deep concealed side pockets and rear welt pocket",
      "Tapered streetwear fit designed to highlight footwear"
    ]
  },
  {
    id: "sv-cargo-01",
    name: "SLIQ VEGAS Relaxed Wide-Leg Cargo Pants",
    category: "cargos",
    categoryLabel: "Cargo Pants",
    badge: "Trending Fit",
    gender: "Unisex Streetwear",
    image: "images/SLIGVEGAS Relaxed Wide-Leg Cargo Pants.png",
    isRealAsset: true,
    price: "Price on request",
    availability: "Available • Confirm on WhatsApp",
    availableSizes: ["30", "32", "34", "36", "38"],
    availableColours: ["Cream / Off-White", "Dark Obsidian"],
    description: "Contemporary relaxed wide-leg silhouette utility trousers inspired by modern urban fashion. Clean lines, deep pocket storage, and comfortable all-day mobility.",
    details: [
      "Durable breathable cotton twill blend",
      "Signature deep accordion cargo utility pocket",
      "Relaxed wide-leg streetwear drape",
      "Comfort waistband with tailored unisex fit"
    ]
  },
  {
    id: "sv-set-01",
    name: "SLIQ VEGAS All-White Signature Tracksuit Set",
    category: "sets",
    categoryLabel: "Tracksuits and Drip Sets",
    badge: "Official Campaign Set",
    gender: "Unisex Streetwear",
    image: "images/SLIQVEGAS-hero.png",
    isRealAsset: true,
    price: "Price on request",
    availability: "Available • Confirm on WhatsApp",
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    availableColours: ["Pure White", "Midnight Black"],
    description: "The official SLIQ VEGAS campaign showcase tracksuit worn in our brand editorial. Features an immaculate heavyweight pullover top and matching bottoms with subtle embossed brand identity marks.",
    details: [
      "Complete two-piece matching tracksuit ensemble",
      "Heavyweight luxury fleece in striking pure white",
      "Custom SLIQ VEGAS monogram emblem detailing",
      "Uncompromising comfort engineered for unisex presence"
    ]
  },
  {
    id: "sv-set-02",
    name: "SLIQ VEGAS Monogram Track Club Drip Set",
    category: "sets",
    categoryLabel: "Tracksuits and Drip Sets",
    badge: "Exclusive Drop",
    gender: "Unisex Streetwear",
    image: "images/SLIQVEGAS full drip wear.webp",
    isRealAsset: true,
    price: "Price on request",
    availability: "Available • Confirm on WhatsApp",
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    availableColours: ["Black / Crimson Red", "Charcoal / White"],
    description: "Limited-edition street set uniting comfort, culture, and precision aesthetics. Engineered for the discerning streetwear connoisseur in Harare and beyond.",
    details: [
      "Matching zip/pullover top and tapered bottoms",
      "Refined crimson racing accents & monogram branding",
      "Deep secure zippered pockets",
      "Supreme comfort and shape retention"
    ]
  }
];

// Helper to construct WhatsApp order URL matching prompt format:
// "Hello SLIQ VEGAS! I would like to order the [Product Name]. Size: [Selected Size]. Colour: [Selected Colour]. Quantity: [Quantity]. Please confirm the price and availability."
function generateWhatsAppOrderUrl(product, size, colourOrQty, quantity) {
  let chosenSize = size || (product.availableSizes && product.availableSizes[0]) || "Standard";
  let chosenColour = (product.availableColours && product.availableColours[0]) || "Standard";
  let qty = 1;

  if (typeof colourOrQty === "number" || (!isNaN(colourOrQty) && !quantity)) {
    qty = parseInt(colourOrQty, 10) || 1;
  } else {
    if (colourOrQty) chosenColour = colourOrQty;
    if (quantity) qty = parseInt(quantity, 10) || 1;
  }

  const message = `Hello SLIQ VEGAS! I would like to order the ${product.name}. Size: ${chosenSize}. Colour: ${chosenColour}. Quantity: ${qty}. Please confirm the price and availability. Wear The Lifestyle.`;
  return `${SLIQ_BRAND.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

// Helper for general WhatsApp enquiry
function generateWhatsAppGeneralEnquiryUrl(customNote) {
  const note = customNote ? ` Note: "${customNote}"` : "";
  const lines = [
    `*Hello SLIQ VEGAS,*`,
    ``,
    `I'm reaching out from your website (*Wear The Lifestyle*).${note}`,
    ``,
    `I would like to enquire about your streetwear collections, sizing guidance, and delivery across Harare and Zimbabwe.`,
    ``,
    `Thank you!`
  ];
  return `${SLIQ_BRAND.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
}

// Expose globally
if (typeof window !== "undefined") {
  window.SLIQ_BRAND = SLIQ_BRAND;
  window.SLIQ_CATEGORIES = SLIQ_CATEGORIES;
  window.SLIQ_PRODUCTS = SLIQ_PRODUCTS;
  window.generateWhatsAppOrderUrl = generateWhatsAppOrderUrl;
  window.generateWhatsAppGeneralEnquiryUrl = generateWhatsAppGeneralEnquiryUrl;
}
