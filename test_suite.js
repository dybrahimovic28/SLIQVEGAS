const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

async function runTests() {
  console.log('=== STARTING AUTOMATED TEST SUITE FOR SLIQ VEGAS ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. Test products.js in sandboxed VM
  console.log('--- 1. Testing Product Data & WhatsApp Functions ---');
  const productsCode = fs.readFileSync(path.join(__dirname, 'assets/js/products.js'), 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(productsCode, sandbox);

  const brand = sandbox.window.SLIQ_BRAND;
  const categories = sandbox.window.SLIQ_CATEGORIES;
  const products = sandbox.window.SLIQ_PRODUCTS;
  const genOrderUrl = sandbox.window.generateWhatsAppOrderUrl;
  const genEnquiryUrl = sandbox.window.generateWhatsAppGeneralEnquiryUrl;

  assert(brand && brand.name === 'SLIQ VEGAS', 'Brand name is SLIQ VEGAS');
  assert(brand.slogan === 'Wear The Lifestyle.', 'Brand slogan is "Wear The Lifestyle."');
  assert(brand.phoneRaw === '+263788715684', 'Brand phone is +263788715684');
  assert(brand.whatsappUrl === 'https://wa.me/263788715684', 'Brand WhatsApp URL is https://wa.me/263788715684');
  assert(categories.length >= 5, `Found ${categories.length} category tabs (including tees, hoodies, bottoms, cargos, sets)`);
  assert(products.length >= 8, `Found ${products.length} products defined`);

  // Test WhatsApp message generation with Size, Colour, and Quantity
  const testProd = products[0];
  const orderUrl = genOrderUrl(testProd, 'XL', 'Obsidian Black', 2);
  assert(orderUrl.startsWith('https://wa.me/263788715684?text='), 'Order URL starts with correct base and parameter');
  const decodedMsg = decodeURIComponent(orderUrl.split('?text=')[1]);
  assert(decodedMsg.includes(testProd.name), 'WhatsApp message contains product name');
  assert(decodedMsg.includes('Size: XL') || decodedMsg.includes('*Size:* XL'), 'WhatsApp message contains chosen size');
  assert(decodedMsg.includes('Colour: Obsidian Black') || decodedMsg.includes('*Colour:* Obsidian Black'), 'WhatsApp message contains chosen colour');
  assert(decodedMsg.includes('Quantity: 2') || decodedMsg.includes('*Quantity:* 2'), 'WhatsApp message contains chosen quantity');
  assert(decodedMsg.includes('Wear The Lifestyle.'), 'WhatsApp message includes brand slogan');

  // Test backward-compatible signature genOrderUrl(product, size, quantity)
  const legacyOrderUrl = genOrderUrl(testProd, 'L', 3);
  const legacyDecoded = decodeURIComponent(legacyOrderUrl.split('?text=')[1]);
  assert(legacyDecoded.includes('Size: L'), 'Legacy call contains size');
  assert(legacyDecoded.includes('Quantity: 3'), 'Legacy call contains quantity');

  // Test General Enquiry URL
  const enquiryUrl = genEnquiryUrl('Harare collection enquiry');
  assert(enquiryUrl.startsWith('https://wa.me/263788715684?text='), 'Enquiry URL starts correctly');
  assert(decodeURIComponent(enquiryUrl).includes('Harare collection enquiry'), 'Enquiry URL includes custom note');

  // 2. Test File Integrity & HTML
  console.log('\n--- 2. Testing File Existence & HTML Structure ---');
  const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  assert(indexHtml.includes('SLIQ VEGAS | Wear The Lifestyle'), 'index.html contains official title');
  assert(indexHtml.includes('Dzivaresekwa Extension'), 'index.html contains Dzivaresekwa Extension location');
  assert(indexHtml.includes('+263 78 871 5684'), 'index.html contains phone number');
  assert(indexHtml.includes('https://www.instagram.com/sliqvegas'), 'index.html contains Instagram URL');
  assert(indexHtml.includes('https://www.tiktok.com/@sliqvegas_clothing'), 'index.html contains TikTok URL');
  assert(indexHtml.includes('https://www.facebook.com/share/19iHVYkdPZ/'), 'index.html contains Facebook URL');
  assert(indexHtml.includes('assets/css/styles.css'), 'index.html links to styles.css');
  assert(indexHtml.includes('assets/js/products.js'), 'index.html links to products.js');
  assert(indexHtml.includes('assets/js/main.js'), 'index.html links to main.js');
  assert(indexHtml.includes('id="quickViewModal"'), 'index.html has quickViewModal dialog');
  assert(indexHtml.includes('id="modalColourPills"'), 'index.html has modalColourPills container');
  assert(indexHtml.includes('class="floating-whatsapp"'), 'index.html has floating WhatsApp widget');
  assert(indexHtml.includes('class="top-announcement-bar"'), 'index.html has top announcement bar');
  assert(indexHtml.includes('class="brand-marquee-strip"'), 'index.html has brand marquee strip');
  assert(indexHtml.includes('id="featured"'), 'index.html has featured collection section');
  assert(indexHtml.includes('class="section-light"'), 'index.html implements light-neutral visual rhythm section');
  assert(indexHtml.includes('id="social"'), 'index.html has social discovery section');

  // Verify all 5 categories are present in category cards and filter pills
  const categoriesToCheck = ['tees', 'hoodies', 'bottoms', 'cargos', 'sets'];
  for (const cat of categoriesToCheck) {
    assert(indexHtml.includes(`filterByCategory('${cat}')`), `index.html supports category filter '${cat}'`);
    assert(indexHtml.includes(`data-category="${cat}"`), `index.html has filter tab for '${cat}'`);
  }

  assert(!indexHtml.includes('hero-eyebrow'), 'Hero eyebrow "DZIVARESEKWA EXTENSION • HARARE" is completely removed');
  assert(!indexHtml.includes('hero-category-label'), 'Hero category badge "UNISEX STREETWEAR" is completely removed');
  assert(indexHtml.includes('hero-vantage-display') && indexHtml.includes('hero-vantage-statement'), 'Hero headline elements use dedicated Vantage classes');
  assert(indexHtml.includes('WEAR THE') && indexHtml.includes('LIFESTYLE.'), 'index.html contains hero campaign statement');
  assert(indexHtml.includes('SHOP THE COLLECTION →'), 'index.html contains primary CTA text');
  assert(indexHtml.includes('WHATSAPP ORDER'), 'index.html contains secondary CTA text');
  assert(indexHtml.includes('images/SLIQVEGAS-hero.png'), 'index.html references images/SLIQVEGAS-hero.png');
  assert(!indexHtml.includes('hero-artwork-frame'), 'Old hero-artwork-frame card is completely removed');
  assert(!indexHtml.includes('hero-badge-float'), 'Old hero-badge-float card is completely removed');
  assert(!indexHtml.includes('hero-highlights'), 'Old hero-highlights are completely removed from hero');

  const stylesCss = fs.readFileSync(path.join(__dirname, 'assets/css/styles.css'), 'utf8');
  assert(stylesCss.includes("font-family: 'Cianto'") && stylesCss.includes('--font-primary'), 'styles.css defines Cianto font registration & primary font variable');
  assert(stylesCss.includes("font-family: 'Vantage'") && stylesCss.includes('--font-display'), 'styles.css defines Vantage font registration & display font variable');
  assert(!stylesCss.includes('.hero-eyebrow'), 'styles.css has no lingering hero-eyebrow styles');
  assert(stylesCss.includes('.colour-pills'), 'styles.css styles colour pills');
  assert(stylesCss.includes('.section-light'), 'styles.css styles light-neutral section');
  assert(stylesCss.includes('.brand-marquee-strip'), 'styles.css styles marquee strip');
  assert(stylesCss.includes('.social-discovery-section'), 'styles.css styles social discovery section');
  assert(stylesCss.includes('.category-card-media'), 'styles.css styles category-card-media');
  assert(stylesCss.includes('.category-card-overlay'), 'styles.css styles category-card-overlay');

  // Verify Pill-Shaped Button System
  console.log('\n--- 2.5 Testing Pill-Shaped Button System ---');
  assert(stylesCss.includes('--radius-pill: 999px') || stylesCss.includes('--radius-full: 999px'), 'styles.css defines 999px pill radius token');
  assert(stylesCss.includes('.btn') && stylesCss.includes('border-radius: 999px'), '.btn has 999px pill border-radius');
  assert(stylesCss.includes('border: 1.5px solid #ff4d53'), '.btn-primary has 1.5px crisp red outline border');
  assert(stylesCss.includes('border: 1.5px solid #4ade80'), '.btn-whatsapp has 1.5px crisp green outline border');
  assert(stylesCss.includes('.category-link') && stylesCss.includes('rgba(255, 30, 39, 0.7)'), '.category-link is styled as pill button with crisp red border');
  assert(stylesCss.includes('.filter-pill') && stylesCss.includes('border: 1.5px solid var(--color-border)'), '.filter-pill is pill-shaped with 1.5px border');
  assert(stylesCss.includes('.size-pill') && stylesCss.includes('border-radius: 999px'), '.size-pill is styled as pill selector');
  assert(stylesCss.includes('.colour-pill') && stylesCss.includes('border-radius: 999px'), '.colour-pill is styled as pill selector');
  assert(stylesCss.includes('.qty-counter') && stylesCss.includes('border-radius: 999px'), '.qty-counter has pill shape');
  assert(stylesCss.includes('.social-button') && stylesCss.includes('border-radius: 999px'), '.social-button has pill shape');
  assert(stylesCss.includes('.btn:active') && stylesCss.includes('scale(0.98)'), '.btn has active pressed state');
  assert(stylesCss.includes('.btn:focus-visible'), '.btn has accessible focus-visible outline');
  assert(stylesCss.includes('@media (prefers-reduced-motion: reduce)'), 'styles.css respects reduced motion preferences');

  // Verify Premium Graphite & Platinum Color System
  console.log('\n--- 2.6 Testing Premium Graphite & Platinum UI System ---');
  assert(stylesCss.includes('--color-bg-base: #0D0E11') || stylesCss.includes('--color-bg-base: #0d0e11'), 'styles.css sets main page background to #0D0E11 deep charcoal');
  assert(stylesCss.includes('--color-bg-surface: #202329'), 'styles.css sets primary card background to #202329 premium graphite');
  assert(stylesCss.includes('--color-bg-surface-secondary: #272B32'), 'styles.css sets secondary surface to #272B32 lighter graphite');
  assert(stylesCss.includes('--color-bg-surface-elevated: #30353D'), 'styles.css sets elevated surface to #30353D refined steel grey');
  assert(stylesCss.includes('--color-border: #414650'), 'styles.css sets subtle borders to #414650 soft metallic grey');
  assert(stylesCss.includes('--color-text-primary: #F5F5F5'), 'styles.css sets primary text to #F5F5F5 clean off-white');
  assert(stylesCss.includes('--color-text-secondary: #B9BEC7'), 'styles.css sets secondary text to #B9BEC7 cool silver grey');
  assert(stylesCss.includes('--color-text-muted: #939AA5'), 'styles.css sets muted text to #939AA5 restrained grey');
  assert(stylesCss.includes('.catalogue-section') && (stylesCss.includes('background: #121418') || stylesCss.includes('background-color: #121418')), 'Catalogue section has #121418 subtle graphite surface for visual rhythm');
  assert(stylesCss.includes('.product-card') && stylesCss.includes('background: var(--color-bg-surface)'), 'Product cards use --color-bg-surface (#202329)');
  assert(stylesCss.includes('.product-image-box') && stylesCss.includes('background: #15171C'), 'Product image box uses #15171C tonal contrast background');
  assert(stylesCss.includes('.product-card:hover') && stylesCss.includes('translateY(-4px)'), 'Product card features restrained 4px hover lift');
  assert(stylesCss.includes('.filter-pill') && stylesCss.includes('background: var(--color-bg-surface)'), 'Filter pills use graphite background for inactive state');
  assert(stylesCss.includes('.size-pill') && stylesCss.includes('background: var(--color-bg-surface-secondary)'), 'Size pills use secondary graphite background');

  // Verify Real Product Photography Assets
  console.log('\n--- 2.7 Testing Product Photography Integrity ---');
  for (const prod of products) {
    assert(prod.isRealAsset === true, `Product "${prod.name}" uses genuine photoshoot photography (isRealAsset: true)`);
    const resolvedPath = path.join(__dirname, prod.image);
    assert(fs.existsSync(resolvedPath), `Product image exists on disk: ${prod.image}`);
  }

  // Verify all 5 category background images in index.html
  assert(indexHtml.includes('images/SLIQVEGAS graphic tees.jpg'), 'index.html has Graphic Tees background image');
  assert(indexHtml.includes('images/SLIQVEGAS Hoodies &amp; Sweats.webp') || indexHtml.includes('images/SLIQVEGAS Hoodies & Sweats.webp'), 'index.html has Hoodies & Sweats background image');
  assert(indexHtml.includes('images/SLIQVEGAS Tracksuits and bottoms.jpg'), 'index.html has Tracksuit Bottoms background image');
  assert(indexHtml.includes('images/SLIQVEGAS cargo pants.webp'), 'index.html has Cargo Pants background image');
  assert(indexHtml.includes('images/SLIQVEGAS full drip wear.webp'), 'index.html has Full Drip Sets background image');

  // Verify Lookbook 6-Image Gallery
  console.log('\n--- 2.8 Testing Lookbook 6-Image Gallery ---');
  assert(indexHtml.includes('images/SLIQVEGAS full drip wear woman.jpg'), 'index.html includes 6th image: images/SLIQVEGAS full drip wear woman.jpg');
  for (let i = 1; i <= 6; i++) {
    assert(indexHtml.includes(`lookbook-item-${i}`), `index.html has lookbook-item-${i}`);
  }
  const lookbookItemMatches = indexHtml.match(/class="lookbook-item /g) || [];
  assert(lookbookItemMatches.length === 6, `Gallery displays exactly 6 images (found ${lookbookItemMatches.length})`);
  assert(stylesCss.includes('.lookbook-grid') && stylesCss.includes('grid-template-columns: repeat(3, 1fr)'), 'styles.css defines balanced 3-column desktop grid for 6 gallery images');
  assert(stylesCss.includes('.lookbook-item') && stylesCss.includes('aspect-ratio: 4 / 5'), 'styles.css maintains consistent 4:5 aspect ratio across gallery items');
  assert(stylesCss.includes('.lookbook-item-6 img') && stylesCss.includes('object-position: center 30%'), 'styles.css tailors object-position for full drip wear woman image');

  // Verify Ordering Steps (How to Order) Background Images
  console.log('\n--- 2.9 Testing Ordering Steps Background Images ---');
  assert(fs.existsSync(path.join(__dirname, 'images/SLIQVEGAS Select.png')), 'images/SLIQVEGAS Select.png exists on disk');
  assert(fs.existsSync(path.join(__dirname, 'images/SLIQVEGAS connect.jpg')), 'images/SLIQVEGAS connect.jpg exists on disk');
  assert(fs.existsSync(path.join(__dirname, 'images/SLIQVEGAS Confirm & Receive.jpg')), 'images/SLIQVEGAS Confirm & Receive.jpg exists on disk');
  assert(stylesCss.includes('images/SLIQVEGAS Select.png'), 'styles.css links Step 1 background to images/SLIQVEGAS Select.png');
  assert(stylesCss.includes('images/SLIQVEGAS connect.jpg'), 'styles.css links Step 2 background to images/SLIQVEGAS connect.jpg');
  assert(stylesCss.includes('images/SLIQVEGAS Confirm & Receive.jpg'), 'styles.css links Step 3 background to images/SLIQVEGAS Confirm & Receive.jpg');
  assert(stylesCss.includes('.delivery-card') && stylesCss.includes('background-size: cover'), 'styles.css specifies background-size: cover for delivery cards');
  assert(!stylesCss.includes('.delivery-card::after'), 'styles.css has removed the greyish overlay from delivery cards as requested');
  assert(stylesCss.includes('.delivery-card') && stylesCss.includes('background-color: #ffffff'), 'styles.css gives delivery cards clean background for full image visibility');
  assert(indexHtml.includes('delivery-card-1') && indexHtml.includes('delivery-card-2') && indexHtml.includes('delivery-card-3'), 'index.html has delivery-card-1/2/3 modifier classes');
  assert(fs.existsSync(path.join(__dirname, 'images/SLIQVEGAS DELIVERY.png')), 'images/SLIQVEGAS DELIVERY.png exists on disk');
  assert(stylesCss.includes('images/SLIQVEGAS DELIVERY.png'), 'styles.css links delivery tile background to images/SLIQVEGAS DELIVERY.png');
  assert(!stylesCss.includes('.delivery-banner-box::after'), 'styles.css has removed the greyish overlay from delivery banner box as requested');
  assert(stylesCss.includes('.delivery-banner-box') && stylesCss.includes('background-color: #eef7fc'), 'styles.css gives delivery banner box clean background matching delivery artwork');

  // Verify Premium Bright Contact Tiles (#F5F5F2)
  console.log('\n--- 2.10 Testing Premium Bright Contact Tiles ---');
  assert(stylesCss.includes('background: #F5F5F2') && stylesCss.includes('.contact-info-card'), 'styles.css sets warm white #F5F5F2 background on contact cards');
  assert(stylesCss.includes('color: #181818') && stylesCss.includes('.contact-card-title'), 'styles.css styles contact headings with dark charcoal #181818');
  assert(stylesCss.includes('.contact-channel-item') && stylesCss.includes('background: #FFFFFF'), 'styles.css styles contact channels with crisp white cards');
  assert(stylesCss.includes('.form-input') && stylesCss.includes('background: #FFFFFF'), 'styles.css styles form inputs with crisp white background');
  assert(stylesCss.includes('border-color: #FF2028') || stylesCss.includes('box-shadow: 0 0 0 3px rgba(255, 32, 40'), 'styles.css provides clear SLIQ red focus states for inputs');
  assert(indexHtml.includes('contact-card-title') && indexHtml.includes('contact-info-card'), 'index.html contains semantic classes for bright contact card');
  assert(indexHtml.includes('id="enquiryForm"'), 'index.html maintains functional enquiryForm element');


  // Verify Updated Active Products (Plain T-Shirt & Signature Cap)
  console.log('\n--- 2.11 Testing Plain T-Shirt & Signature Cap ---');
  const plainTee = products.find(p => p.id === 'sv-tee-01');
  assert(plainTee && plainTee.name === 'SLIQ VEGAS Essential Plain T-Shirt', 'Product 1 is SLIQ VEGAS Essential Plain T-Shirt');
  assert(plainTee.badge === 'EVERYDAY ESSENTIAL', 'Product 1 badge is EVERYDAY ESSENTIAL');
  assert(plainTee.categoryLabel.includes('Basic Wear'), 'Product 1 category label includes Basic Wear');
  assert(plainTee.image === 'images/SLIQVEGAS PLAIN T-SHIRTS.png', 'Product 1 image links to images/SLIQVEGAS PLAIN T-SHIRTS.png');
  assert(fs.existsSync(path.join(__dirname, plainTee.image)), 'Product 1 image file exists on disk');
  assert(plainTee.availableSizes.includes('S') && plainTee.availableSizes.includes('2XL'), 'Product 1 retains full size selector S-2XL');

  const cap = products.find(p => p.id === 'sv-cap-01');
  assert(cap && cap.name === 'SLIQ VEGAS Signature Baseball Cap', 'Product 2 is SLIQ VEGAS Signature Baseball Cap');
  assert(cap.badge === 'SIGNATURE ACCESSORY', 'Product 2 badge is SIGNATURE ACCESSORY');
  assert(cap.categoryLabel === 'Accessories / Headwear', 'Product 2 category label is Accessories / Headwear');
  assert(cap.image === 'images/SLIQVEGAS caps.png', 'Product 2 image links to images/SLIQVEGAS caps.png');
  assert(fs.existsSync(path.join(__dirname, cap.image)), 'Product 2 image file exists on disk');
  assert(cap.availableSizes.length === 1 && cap.availableSizes[0] === 'One Size', 'Product 2 uses appropriate One Size option');
  assert(cap.availableColours.length === 1 && cap.availableColours[0] === 'Royal Blue', 'Product 2 uses verified cap colour Royal Blue');

  // Verify WhatsApp order link for Cap
  const capOrderUrl = genOrderUrl(cap, 'One Size', 'Royal Blue', 1);
  const capDecoded = decodeURIComponent(capOrderUrl.split('?text=')[1]);
  assert(capDecoded.includes('SLIQ VEGAS Signature Baseball Cap'), 'Cap WhatsApp message includes correct product name');
  assert(capDecoded.includes('Size: One Size'), 'Cap WhatsApp message includes Size: One Size');
  assert(capDecoded.includes('Colour: Royal Blue'), 'Cap WhatsApp message includes Colour: Royal Blue');

  // Verify Responsive Alignment across Desktop, Tablet, and Mobile
  console.log('\n--- 2.12 Testing Responsive Alignment (Desktop Left, Tablet Left, Mobile Centred) ---');
  assert(indexHtml.includes('images/sliqvegas-logo.png'), 'index.html references updated navbar logo: images/sliqvegas-logo.png');
  assert(fs.existsSync(path.join(__dirname, 'images/sliqvegas-logo.png')), 'images/sliqvegas-logo.png exists on disk');
  
  // Desktop assertions: Left-aligned hero & multi-column footer
  assert(stylesCss.includes('max-width: 580px;') && stylesCss.includes('text-align: left;') && stylesCss.includes('justify-content: flex-start;'), 'styles.css defines spacious left-aligned desktop hero and buttons');
  assert(stylesCss.includes('grid-template-columns: 2fr 1fr 1fr 1.5fr;') && stylesCss.includes('justify-items: start;'), 'styles.css restores professional multi-column left-aligned desktop footer');
  
  // Tablet assertions: Left-aligned hero on tablet screens
  assert(stylesCss.includes('@media (max-width: 991px)') && stylesCss.includes('align-items: flex-start;'), 'styles.css preserves left-aligned hero layout on tablet screens');
  assert(stylesCss.includes('@media (max-width: 820px)') && stylesCss.includes('.nav-actions .btn-whatsapp'), 'styles.css maintains compact header WhatsApp CTA on tablet');
  
  // Mobile-only assertions: Centred branding, hero, and stacked footer
  assert(stylesCss.includes('@media (max-width: 680px)'), 'styles.css establishes dedicated mobile breakpoint at <= 680px');
  assert(stylesCss.includes('.brand-link {\n    margin: 0 auto;\n    justify-content: center;'), 'styles.css centres navbar logo and brand text on mobile');
  assert(stylesCss.includes('max-width: 320px;\n    margin: 0 auto;\n    gap: 0.75rem;'), 'styles.css stacks and centres hero CTA buttons on mobile');
  assert(stylesCss.includes('/* 4. Mobile Footer: Centred & Neatly Stacked */'), 'styles.css centres and stacks footer sections on mobile');
  
  // Functional items
  assert(indexHtml.includes('footer-lifestyle-btn') && stylesCss.includes('.footer-lifestyle-btn'), 'footer features interactive "WEAR THE LIFESTYLE." pill button');
  assert(indexHtml.includes('footer-social-section') && stylesCss.includes('.footer-social-pill'), 'footer features dedicated social media badge links');
  assert(indexHtml.includes('footer-back-to-top'), 'footer features "Back To Top" pill link');



  // 3. Test HTTP Server Endpoints
  console.log('\n--- 3. Testing HTTP Server Endpoints on 127.0.0.1:8080 ---');
  const urlsToTest = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/js/products.js',
    '/assets/js/main.js',
    '/images/SLIQVEGAS-hero.png',
    '/assets/images/SLIQVEGAS-hero.png',
    '/assets/images/logo-primary.jpg',
    '/assets/images/artwork-red-crown.jpg',
    '/assets/images/artwork-pink-drip.jpg',
    '/assets/images/product-pink-hoodie-model.jpg',
    '/assets/images/lookbook-gee-door.jpg',
    '/assets/images/lookbook-cutiee-glasses.jpg',
    '/assets/images/lookbook-girl-display.jpg',
    '/assets/images/lookbook-girl-vest.jpg',
    '/images/SLIQVEGAS%20full%20drip%20wear%20woman.jpg',
    '/images/SLIQVEGAS%20Select.png',
    '/images/SLIQVEGAS%20connect.jpg',
    '/images/SLIQVEGAS%20Confirm%20%26%20Receive.jpg',
    '/images/SLIQVEGAS%20DELIVERY.png',
    '/images/SLIQVEGAS%20graphic%20tees.jpg',
    '/images/SLIQVEGAS%20Hoodies%20%26%20Sweats.webp',
    '/images/SLIQVEGAS%20Tracksuits%20and%20bottoms.jpg',
    '/images/SLIQVEGAS%20cargo%20pants.webp',
    '/images/SLIQVEGAS%20full%20drip%20wear.webp',
    '/images/SLIQVEGAS%20PLAIN%20T-SHIRTS.png',
    '/images/SLIQVEGAS%20caps.png',
    '/assets/images/SLIQVEGAS%20PLAIN%20T-SHIRTS.png',
    '/assets/images/SLIQVEGAS%20caps.png',
    '/images/sliqvegas-logo.png',
    '/assets/images/sliqvegas-logo.png',
    '/assets/images/placeholder-hoodie.svg',
    '/assets/images/placeholder-cargo.svg',
    '/assets/images/placeholder-set.svg',
    '/assets/images/placeholder-tee.svg',
    '/assets/images/favicon.svg',
    '/assets/images/favicon-32x32.png',
    '/robots.txt',
    '/sitemap.xml',
    '/assets/fonts/README.md'
  ];

  function fetchUrl(endpoint) {
    return new Promise((resolve) => {
      http.get(`http://127.0.0.1:8080${endpoint}`, (res) => {
        let size = 0;
        res.on('data', chunk => size += chunk.length);
        res.on('end', () => resolve({ status: res.statusCode, size }));
      }).on('error', (err) => resolve({ status: 500, error: err.message }));
    });
  }

  for (const u of urlsToTest) {
    const res = await fetchUrl(u);
    assert(res.status === 200 && res.size > 0, `HTTP GET ${u} -> Status 200 (${res.size} bytes)`);
  }

  console.log(`\n=== TEST SUITE COMPLETE: ${passed} PASSED, ${failed} FAILED ===`);
  if (failed > 0) process.exit(1);
}

runTests();
