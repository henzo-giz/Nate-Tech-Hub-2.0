import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sliders, 
  Sun, 
  Play, 
  RefreshCw, 
  Eye, 
  CheckCircle2, 
  Search, 
  ShoppingBag, 
  X, 
  Check, 
  ArrowUpRight, 
  Sparkles,
  ChevronRight,
  Star,
  MessageSquare
} from "lucide-react";

// Types for reviews
interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  timestamp: string;
}

// Types for products
interface SmartSpecs {
  chip: string;
  camera: string;
  display: string;
  battery: string;
  weight: string;
}

interface Product {
  id: string;
  name: string;
  category: "phone" | "laptop";
  brand: "Apple" | "Samsung" | "Google" | "Others";
  price: number;
  badge?: string;
  description: string;
  specs: SmartSpecs;
  colors: string[];
  svgType: "iphone-pro" | "galaxy-ultra" | "pixel" | "aether" | "nothing" | "iphone-base" | "foldable" | "pixel-fold" | "oneplus" | "xiaomi" | "macbook" | "galaxy-book" | "xps" | "bespoke-laptop";
}

// 17 high-end devices in our database (Smartphones + Laptops)
const DATABASE_PRODUCTS: Product[] = [
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    category: "phone",
    price: 270_000,
    badge: "Amazing camera tech",
    description: "The current iPhone 17 generation uses the 3nm A19 Pro. The true 2nm breakthrough is slated for the next generation, which will be the A20 Pro.",
    specs: {
      chip: "A19 Pro (2nm Ultra-Efficient Core)",
      camera: "48MP Fusion + 48MP Periscope Zoom + 48MP Ultra Wide",
      display: "6.9\" ProMotion OLED with Under-screen FaceID",
      battery: "Up to 36 hours video playback",
      weight: "223g"
    },
    colors: ["Space Black", "White Titanium", "Titanium Gold"],
    svgType: "iphone-pro"
  },
  {
    id: "galaxy-s26-ultra",
    name: "Galaxy S26 Ultra",
    brand: "Samsung",
    category: "phone",
    price: 195_000,
    badge: "Impresive AI",
    description: "Samsung's AI powerhouse. Boasts a Snapdragon 8 Elite Gen 6 Pro processor, slimmer bezels with softened curved corners, and high-speed satellite messaging.",
    specs: {
      chip: "Snapdragon 8 Gen 5 (Galaxy Core Version)",
      camera: "200MP Quad-pixel + Dual 50MP Zoom Array",
      display: "6.8\" Anti-Reflexive Dynamic AMOLED 3X (144Hz)",
      battery: "5100 mAh with 65W Hyper Fast Charge",
      weight: "215g"
    },
    colors: ["Deep Forest", "Titanium Gray", "Titanium Black"],
    svgType: "galaxy-ultra"
  },
  {
    id: "pixel-10-pro-xl",
    name: "Pixel 10 Pro XL",
    brand: "Google",
    category: "phone",
    price: 180_000,
    badge: "The Smartest",
    description: "Google's revolutionary next flagship. Houses the bespoke Tensor G5 chip custom-manufactured by TSMC for incredible efficiency and on-device AI agent speed.",
    specs: {
      chip: "Google Tensor G5 (Bespoke TSMC Engine)",
      camera: "50MP Primary + 48MP 5x Zoom + 48MP Ultra-wide Macro",
      display: "6.8\" LTPO Actua Display v3 (3200 nits)",
      battery: "5150 mAh with high-efficiency agent-idle mode",
      weight: "218g"
    },
    colors: ["Mint Alabaster", "Obsidian Gray", "Porcelain Cream"],
    svgType: "pixel"
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    category: "phone",
    price: 175_000,
    badge: "Best Seller",
    description: "The peak of titanium craftsmanship. Features the customizable Camera Control button and the ultra-powerful A18 Pro chip.",
    specs: {
      chip: "A18 Pro with 6-core GPU",
      camera: "48MP Fusion + 48MP Ultra Wide",
      display: "6.9\" Super Retina XDR OLED",
      battery: "Up to 33 hours video playback",
      weight: "227g"
    },
    colors: ["Natural Titanium", "Desert Titanium", "Black Titanium", "White Titanium"],
    svgType: "iphone-pro"
  },
  {
    id: "galaxy-s25-ultra",
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    category: "phone",
    price: 150_000,
    badge: "Peak Tech",
    description: "Precision-molded premium titanium frame. Integrated S Pen, Snapdragon 8 Gen 4, and a mesmerizing 200MP camera.",
    specs: {
      chip: "Snapdragon 8 Gen 4",
      camera: "200MP + 50MP + 12MP + 10MP",
      display: "6.8\" Dynamic AMOLED 2X 120Hz",
      battery: "5000 mAh with 45W Fast Charge",
      weight: "219g"
    },
    colors: ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"],
    svgType: "galaxy-ultra"
  },
  {
    id: "pixel-9-pro-xl",
    name: "Pixel 9 Pro XL",
    brand: "Google",
    category: "phone",
    price: 1099,
    badge: "Gemini Live AI",
    description: "Google's smartest phone yet. Engineered for fully offline AI capability with Gemini Advanced and Tensor G4 core.",
    specs: {
      chip: "Google Tensor G4 Neural",
      camera: "50MP Wide + 48MP Tele + 48MP Ultra",
      display: "6.8\" Super Actua LTPO 120Hz",
      battery: "5060 mAh with wireless charging",
      weight: "221g"
    },
    colors: ["Obsidian Gray", "Porcelain Cream", "Hazel", "Rose Quartz"],
    svgType: "pixel"
  },
  {
    id: "aether-portal-ultra",
    name: "Aether Portal Ultra",
    brand: "Others",
    category: "phone",
    price: 1499,
    badge: "Concept Edition",
    description: "Our custom bespoke cosmic flagship. Features holographic ambient glows, quantum security chip, and stardust matte finishes.",
    specs: {
      chip: "Nova Quantum V2 Core",
      camera: "108MP Cosmic Prism Array",
      display: "6.7\" Nebula 144Hz Hologram Glass",
      battery: "6000 mAh Graphene Cell",
      weight: "198g"
    },
    colors: ["Star Dust Black", "Supernova Gold"],
    svgType: "aether"
  },
  {
    id: "nothing-phone-3",
    name: "Nothing Phone (3)",
    brand: "Others",
    category: "phone",
    price: 699,
    badge: "Unique Design",
    description: "Iconic transparent backing with custom Glyph Interface (11 addressable LED zones). Beautifully symmetric bezel design.",
    specs: {
      chip: "Snapdragon 8 Gen 3 Core",
      camera: "50MP Dual Camera with OIS",
      display: "6.7\" LTPO Flexible AMOLED",
      battery: "4900 mAh with Glyph indicators",
      weight: "194g"
    },
    colors: ["Dark Transparent", "Milk White Transparent"],
    svgType: "nothing"
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    brand: "Apple",
    category: "phone",
    price: 130_000,
    badge: "Best Value",
    description: "Vibrant, eye-catching colorinfused glass back. Houses the state-of-the-art A18 processor and newly added Action Button.",
    specs: {
      chip: "A18 with 5-core GPU",
      camera: "48MP Fusion + 12MP Ultra Wide",
      display: "6.1\" Super Retina XDR",
      battery: "Up to 22 hours video playback",
      weight: "170g"
    },
    colors: ["Ultramarine", "Teal Blue", "Pink Rose", "Black"],
    svgType: "iphone-base"
  },
  {
    id: "galaxy-z-fold-6",
    name: "Galaxy Z Fold 6",
    brand: "Samsung",
    category: "phone",
    price: 1899,
    badge: "Foldable King",
    description: "Opens into a massive 7.6-inch tablet-like display. Sleek armor titanium frame with ultra-slim folding dual screen logic.",
    specs: {
      chip: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "50MP main + 12MP Ultra + 10MP Tele",
      display: "7.6\" Main AMOLED / 6.3\" Cover",
      battery: "4400 mAh dual-cell setup",
      weight: "239g"
    },
    colors: ["Silver Shadow", "Navy Blue", "Pink Horizon"],
    svgType: "foldable"
  },
  {
    id: "pixel-fold-2",
    name: "Google Pixel Fold 2",
    brand: "Google",
    category: "phone",
    price: 1799,
    badge: "Ultra Thin Fold",
    description: "Google's thinnest fold with direct satellite connectivity support, expansive screens, and elite Gemini integration.",
    specs: {
      chip: "Google Tensor G4 Neural",
      camera: "48MP Main + 10.8MP Tele + 10.5MP Ultra",
      display: "8.0\" Super Actua Flex / 6.3\" Cover",
      battery: "4650 mAh battery life",
      weight: "257g"
    },
    colors: ["Obsidian Slate", "Porcelain Shell"],
    svgType: "pixel-fold"
  },
  {
    id: "oneplus-13",
    name: "OnePlus 13",
    brand: "Others",
    category: "phone",
    price: 799,
    badge: "100W Fast Charge",
    description: "Powered by Hasselblad Color Science V4, a blazing 120Hz curved display, and the fastest 100W SUPERVOOC charging.",
    specs: {
      chip: "Snapdragon 8 Gen 4 Extreme",
      camera: "50MP Hasselblad Main + 50MP Wide",
      display: "6.82\" 2K Oriental LTPO OLED",
      battery: "6000 mAh Glacier battery",
      weight: "213g"
    },
    colors: ["Black Obsidian Wood", "Silk Blue"],
    svgType: "oneplus"
  },
  {
    id: "xiaomi-15-pro",
    name: "Xiaomi 15 Pro",
    brand: "Others",
    category: "phone",
    price: 899,
    badge: "Leica Optics",
    description: "Quad-curved gorgeous dynamic glass. Houses high-grade Leica Summilux lenses for unparalleled structural photography.",
    specs: {
      chip: "Snapdragon 8 Gen 4 Extreme",
      camera: "50MP Leica Triple lens setup",
      display: "6.73\" 2K AMOLED 3200nit peak",
      battery: "5400 mAh Silicon-carbon",
      weight: "220g"
    },
    colors: ["Spruce Green", "Slate Gray", "Mercury Silver"],
    svgType: "xiaomi"
  },
  {
    id: "macbook-pro-16-m4",
    name: "MacBook Pro 16\" (M4 Max)",
    brand: "Apple",
    category: "laptop",
    price: 2499,
    badge: "Ultimate Power",
    description: "The supreme workflow champion. Built for specialists, developers, and creators with extreme battery life up to 24 hours.",
    specs: {
      chip: "Apple M4 Max (16-core CPU / 40-core GPU)",
      camera: "12MP Center Stage FaceTime HD Webcam",
      display: "16.2\" Liquid Retina XDR (120Hz, 1600 nits)",
      battery: "Up to 24 hours battery (100Whr)",
      weight: "2.14kg"
    },
    colors: ["Space Black", "Silver"],
    svgType: "macbook"
  },
  {
    id: "galaxy-book5-pro",
    name: "Galaxy Book5 Pro 360",
    brand: "Samsung",
    category: "laptop",
    price: 1699,
    badge: "OLED Touch",
    description: "Ultra-sleek 360-degree convertible laptop featuring an integrated S Pen, stunning display, and Copilot+ PC AI features.",
    specs: {
      chip: "Intel Core Ultra 7 with AI Boost",
      camera: "1080p Full HD IR Webcam with Auto-framing",
      display: "16\" Dynamic AMOLED 2X Touchscreen (120Hz)",
      battery: "Up to 21 hours battery (76Whr)",
      weight: "1.66kg"
    },
    colors: ["Moonstone Gray", "Platinum Silver"],
    svgType: "galaxy-book"
  },
  {
    id: "dell-xps-13",
    name: "Dell XPS 13 Copilot+",
    brand: "Others",
    category: "laptop",
    price: 1299,
    badge: "Featherweight",
    description: "Precision-crafted from CNC aluminum. Designed with an ultra-light bezel-less InfinityEdge display and seamless haptic trackpad.",
    specs: {
      chip: "Snapdragon X Elite (12-core)",
      camera: "1080p FHD IR Dual-sensor Webcam",
      display: "13.4\" Tandem OLED InfinityEdge (60Hz)",
      battery: "Up to 27 hours video streaming",
      weight: "1.24kg"
    },
    colors: ["Graphite Black", "Platinum Silver"],
    svgType: "xps"
  },
  {
    id: "aether-book-quantum",
    name: "Aether Book Quantum",
    brand: "Others",
    category: "laptop",
    price: 2199,
    badge: "Quantum OS",
    description: "Our bespoke enterprise workstation. Liquid-alloy casing, built-in air-cooling turbine, and custom liquid-retina screen.",
    specs: {
      chip: "Aether Nova QX3 CPU + Tensor Cores",
      camera: "4K Laser Retinal Scanner & Webcam",
      display: "15.6\" Holographic Anti-reflection LTPO (165Hz)",
      battery: "Quantum Graphene Cell (32 hours general use)",
      weight: "1.45kg"
    },
    colors: ["Cosmic Carbon", "Supernova Purple"],
    svgType: "bespoke-laptop"
  }
];

// Color mapping for screen gradients / dots in the UI
const COLOR_HEX: Record<string, string> = {
  // Apple
  "Natural Titanium": "#A8A29A",
  "Desert Titanium": "#C0B2A0",
  "Black Titanium": "#232426",
  "White Titanium": "#F2F1ED",
  "Titanium Gold": "#D2AF84",
  "Ultramarine": "#3B5272",
  "Teal Blue": "#8BAAA7",
  "Pink Rose": "#DEB4B8",
  "Black": "#1C1D21",
  "Space Black": "#1A1B1D",
  "Silver": "#E3E4E5",
  // Samsung
  "Titanium Black": "#252627",
  "Titanium Gray": "#76797D",
  "Titanium Violet": "#4E4E5A",
  "Titanium Yellow": "#E2DBBE",
  "Deep Forest": "#3A4F41",
  "Silver Shadow": "#A1A5A9",
  "Navy Blue": "#222D3D",
  "Pink Horizon": "#ECCDCB",
  "Moonstone Gray": "#4A4D50",
  "Platinum Silver": "#D1D5DB",
  // Google
  "Obsidian Gray": "#2C2D30",
  "Porcelain Cream": "#EAE5DC",
  "Mint Alabaster": "#CBE3DB",
  "Hazel": "#6B6E68",
  "Rose Quartz": "#E8D5D6",
  "Obsidian Slate": "#292B2E",
  "Porcelain Shell": "#ECEAE3",
  // Others
  "Star Dust Black": "#121316",
  "Supernova Gold": "#D1B280",
  "Dark Transparent": "#242528",
  "Milk White Transparent": "#D3D7D9",
  "Black Obsidian Wood": "#1A1A1D",
  "Silk Blue": "#4E7085",
  "Spruce Green": "#435249",
  "Slate Gray": "#53565A",
  "Mercury Silver": "#CFD2D2",
  "Graphite Black": "#2C2D30",
  "Cosmic Carbon": "#111215",
  "Supernova Purple": "#4F46E5",
};

// Beautiful Interactive iPhone, Smartphone and Laptop Mockup Graphic
function PhoneMockup({ brand, color, svgType }: { brand: string; color: string; svgType: string }) {
  const hexColor = COLOR_HEX[color] || "#FFFFFF";
  const isLaptop = ["macbook", "galaxy-book", "xps", "bespoke-laptop"].includes(svgType);

  if (isLaptop) {
    return (
      <div className="relative w-full aspect-[4/5] flex flex-col items-center justify-center p-3 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0)_80%)] pointer-events-none" />
        
        {/* Laptop Screen (Lid) */}
        <div 
          className="w-[140px] sm:w-[155px] h-[85px] sm:h-[95px] relative rounded-t-xl border-[3.5px] bg-[#070708] p-1 shadow-2xl transition-all duration-350 flex flex-col justify-between"
          style={{ borderColor: hexColor }}
        >
          {/* Webcam */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full z-30 flex items-center justify-center">
            <div className="w-0.5 h-0.5 bg-indigo-900/40 rounded-full" />
          </div>

          {/* Display screen */}
          <div className="w-full h-full rounded-t-lg overflow-hidden bg-[#030303] relative flex flex-col justify-between p-1.5 border border-white/5 z-10">
            
            {/* Fluid glass screen glow */}
            <div 
              className="absolute inset-x-0 -top-12 h-20 opacity-35 mix-blend-screen transition-all duration-500 rounded-full blur-xl"
              style={{
                background: `radial-gradient(circle, ${hexColor} 0%, transparent 80%)`
              }}
            />

            {/* Glowing special effects */}
            {svgType === "bespoke-laptop" && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1)_0%,transparent_70%)] animate-pulse" />
            )}

            {/* Top Status inside Screen */}
            <div className="flex justify-between items-center text-[5px] font-mono text-white/40 mb-1 relative z-20">
              <span>9:41 AM</span>
              <div className="flex items-center gap-0.5 scale-90">
                <span className="text-[4.5px] text-emerald-400">● MATRIX CONNECTED</span>
              </div>
            </div>

            {/* Laptop model graphics inside screen */}
            <div className="flex-1 flex flex-col justify-center items-center text-center relative z-20">
              <span className="text-[5px] tracking-[0.2em] uppercase font-mono text-white/30 block mb-0.5 font-bold">NET MATRIX</span>
              <span className="text-[7.5px] sm:text-[8px] font-heading italic text-white/90 max-w-[100px] truncate leading-none mb-1 block">
                {brand}
              </span>
              <div 
                className="w-6 h-[1.5px] rounded-full mx-auto" 
                style={{ backgroundColor: hexColor }}
              />
            </div>

            {/* Bottom Status inside Screen */}
            <div className="flex justify-between items-center text-[4.5px] font-mono text-white/20 relative z-20 uppercase tracking-wider">
              <span>AETHER OS V5</span>
              <div className="w-1 h-1 rounded-full bg-emerald-500/70" />
            </div>
          </div>
        </div>

        {/* Laptop Base Keyboard Frame */}
        <div className="w-[170px] sm:w-[190px] h-[9px] bg-[#141517] rounded-b-md relative border-t-2 select-none shadow-lg -mt-0.5" style={{ borderColor: hexColor }}>
          {/* Subtle keyboard simulation lines */}
          <div className="absolute top-[2px] left-[15px] right-[15px] h-[2px] flex justify-between gap-1 opacity-20">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div key={idx} className="flex-1 h-full bg-white rounded-xs" />
            ))}
          </div>
          {/* Trackpad */}
          <div className="absolute bottom-[0.5px] left-1/2 -translate-x-1/2 w-12 h-[3px] border-t border-x border-white/15 rounded-t-xs" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[4/5] flex items-center justify-center p-3 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0)_80%)] pointer-events-none" />
      
      {/* Phone Frame */}
      <div 
        className="w-[110px] sm:w-[130px] h-[200px] sm:h-[230px] relative rounded-[2rem] border-[3.5px] bg-[#070708] p-1 shadow-2xl transition-all duration-350 flex flex-col justify-between"
        style={{ borderColor: hexColor }}
      >
        {/* Dynamic Island / Notch / Camera Hole elements */}
        {svgType.includes("iphone-pro") ? (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black rounded-full z-30 flex items-center justify-between px-1.5">
            <div className="w-1 h-1 bg-neutral-900 rounded-full" />
            <div className="w-1.5 h-1 bg-indigo-900/30 rounded-full" />
          </div>
        ) : svgType.includes("foldable") || svgType.includes("pixel-fold") ? (
          <div className="absolute top-1.5 left-1/4 w-1 h-1 bg-black rounded-full z-30" />
        ) : (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full z-30" />
        )}

        {/* Display screen */}
        <div className="w-full h-full rounded-[1.75rem] overflow-hidden bg-[#030303] relative flex flex-col justify-between p-2.5 border border-white/5 z-10">
          
          {/* Fluid glass screen glow */}
          <div 
            className="absolute inset-x-0 -top-12 h-36 opacity-30 mix-blend-screen transition-all duration-500 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${hexColor} 0%, transparent 80%)`
            }}
          />

          {/* Holographic matrix glow for special Aether Edition */}
          {svgType === "aether" && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,100,0.1)_0%,transparent_70%)] animate-pulse" />
          )}

          {/* Glyph pattern backing simulation for Nothing Phone */}
          {svgType === "nothing" && (
            <div className="absolute inset-2 border border-white/5 bg-white/[0.01] rounded-[1.25rem] opacity-70 p-1 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[4px] text-white/20 select-none">
                <span>[01]</span>
                <span className="w-2 h-0.5 bg-red-500/80 rounded-full" />
              </div>
              <div className="flex justify-center">
                <div className="w-7 h-7 rounded-full border border-dashed border-white/10 flex items-center justify-center relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="text-[4px] text-center font-mono tracking-widest text-white/20 uppercase">GLYPH</div>
            </div>
          )}

          {/* Phone Top Header Status */}
          <div className="flex justify-between items-center text-[6px] font-mono text-white/40 mb-1 relative z-20">
            <span>9:41</span>
            <div className="flex items-center gap-0.5 scale-90">
              <span>5G</span>
              <div className="w-1.5 h-1 border border-white/20 flex items-start p-0.5 bg-white/20 rounded-xs" />
            </div>
          </div>

          {/* Foldable Seam visual line */}
          {(svgType === "foldable" || svgType === "pixel-fold") && (
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/10 z-20 shadow-md pointer-events-none" />
          )}

          {/* Model graphics center */}
          <div className="flex-1 flex flex-col justify-center items-center text-center relative z-20 py-2">
            <span className="text-[5px] tracking-[0.2em] uppercase font-mono text-white/30 block mb-0.5">NET MATRIX</span>
            <span className="text-[8px] sm:text-[9px] font-heading italic text-white/90 max-w-[70px] truncate leading-none mb-1 block">
              {brand}
            </span>
            <div 
              className="w-5 h-[2px] rounded-full mx-auto" 
              style={{ backgroundColor: hexColor }}
            />
          </div>

          {/* Bottom Lock screen indicator */}
          <div className="flex justify-between items-center text-[5px] font-mono text-white/30 relative z-20">
            <span className="tracking-widest">AETHER OS</span>
            <div className="w-1 h-1 rounded-full bg-emerald-500/70" />
          </div>
        </div>

        {/* Outer bottom camera bump outline on back (for design richness) */}
        <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full border border-white/5 pointer-events-none" />
      </div>
    </div>
  );
}

const INITIAL_REVIEWS: Record<string, Review[]> = {
  "iphone-17-pro-max": [
    { id: "rev-1", author: "Naod Abera", rating: 5, comment: "The titanium gold look is mesmerizing. The camera zoom speed is phenomenal with no lag at all with the A19 Pro.", timestamp: "2 days ago" },
    { id: "rev-2", author: "Makeda Kassa", rating: 5, comment: "Under-screen Face ID is completely invisible! Perfect engineering and great thermal control.", timestamp: "1 week ago" }
  ],
  "galaxy-s26-ultra": [
    { id: "rev-3", author: "Elias Tesfaye", rating: 5, comment: "I love the softened curved corners. The Snapdragon 8 Elite Gen 6 handles multitasking in ETB conversions effortlessly.", timestamp: "3 days ago" },
    { id: "rev-4", author: "Helen Berhe", rating: 4, comment: "Excellent AI integration. Live audio recording summary and on-board translation work flawlessly.", timestamp: "5 days ago" }
  ],
  "pixel-10-pro-xl": [
    { id: "rev-5", author: "Yonas Alemu", rating: 5, comment: "Google Tensor G5 by TSMC has finally cured the thermal throttling! Runs cool under intense mobile compiling.", timestamp: "Yesterday" },
    { id: "rev-6", author: "Sara Demeke", rating: 5, comment: "The smartest device. AI schedules my workflow and drafts email briefs perfectly on-device.", timestamp: "4 days ago" }
  ],
  "iphone-16-pro-max": [
    { id: "rev-7", author: "Dawit Girma", rating: 5, comment: "The custom titanium frame is light yet robust. Camera Control is a real game-changer for quick shots.", timestamp: "2 weeks ago" }
  ],
  "macbook-pro-m4-max": [
    { id: "rev-8", author: "Abebe Bekele", rating: 5, comment: "The ultimate developer machine. Battery life easily extends to 22 hours on local docker tests.", timestamp: "3 days ago" }
  ]
};

export default function Capabilities() {
  // Catalog State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "phone" | "laptop">("all");
  const [activeBrand, setActiveBrand] = useState<"All" | "Apple" | "Samsung" | "Google" | "Others">("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Custom interactive product state per card
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    "iphone-17-pro-max": "Titanium Gold",
    "galaxy-s26-ultra": "Deep Forest",
    "pixel-10-pro-xl": "Mint Alabaster",
    "iphone-16-pro-max": "Natural Titanium",
    "galaxy-s25-ultra": "Titanium Black",
    "pixel-9-pro-xl": "Obsidian Gray",
    "aether-portal-ultra": "Star Dust Black",
    "nothing-phone-3": "Dark Transparent",
    "iphone-16": "Ultramarine",
    "galaxy-z-fold-6": "Silver Shadow",
    "pixel-fold-2": "Obsidian Slate",
    "oneplus-13": "Black Obsidian Wood",
    "xiaomi-15-pro": "Spruce Green",
    "macbook-pro-16-m4": "Space Black",
    "galaxy-book5-pro": "Moonstone Gray",
    "dell-xps-13": "Graphite Black",
    "aether-book-quantum": "Cosmic Carbon",
  });

  // Specs quick-expand view states
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({});

  // Comparison State
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Secure Checkout State
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [checkoutColor, setCheckoutColor] = useState("");
  const [checkoutStorage, setCheckoutStorage] = useState<"128GB" | "256GB" | "512GB" | "1TB">("256GB");
  const [isTradeIn, setIsTradeIn] = useState(false);
  const [tradeInDevice, setTradeInDevice] = useState("");
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutInvoice, setCheckoutInvoice] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Virtual Specs Lab State (Worlds section)
  const [labProduct, setLabProduct] = useState<Product>(DATABASE_PRODUCTS[0]);
  const [labActiveTab, setLabActiveTab] = useState<"specifications" | "reviews" | "valuation">("specifications");
  const [lightAngle, setLightAngle] = useState(135); // 45 to 315
  const [lightIntensity, setLightIntensity] = useState(80); // 10% to 100%
  const [tradeInEstimatedValue, setTradeInEstimatedValue] = useState<number | null>(null);
  const [userCurrentDevice, setUserCurrentDevice] = useState("iPhone 13 Pro (128GB)");

  // Interactive Reviews Data & Form states
  const [reviewsData, setReviewsData] = useState<Record<string, Review[]>>(INITIAL_REVIEWS);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `user-rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      timestamp: "Just now"
    };

    setReviewsData(prev => {
      const existing = prev[labProduct.id] || [];
      return {
        ...prev,
        [labProduct.id]: [newRev, ...existing]
      };
    });

    setNewReviewAuthor("");
    setNewReviewRating(5);
    setNewReviewComment("");
  };

  // Toggle Comparison product selection
  const handleToggleCompare = (product: Product) => {
    const isAlreadyAdded = comparisonList.some(item => item.id === product.id);
    if (isAlreadyAdded) {
      setComparisonList(prev => prev.filter(item => item.id !== product.id));
    } else {
      if (comparisonList.length >= 3) {
        alert("You can compare up to 3 devices at the same time.");
        return;
      }
      setComparisonList(prev => [...prev, product]);
    }
  };

  // Remove comparison item
  const handleRemoveCompareItem = (id: string) => {
    setComparisonList(prev => prev.filter(item => item.id !== id));
  };

  // Open Checkout Modal
  const handleTriggerCheckout = (product: Product) => {
    setCheckoutProduct(product);
    setCheckoutColor(selectedColors[product.id] || product.colors[0]);
    setCheckoutStorage("256GB");
    setIsTradeIn(false);
    setTradeInDevice("iPhone 13 Pro");
    setCheckoutName("");
    setCheckoutEmail("");
    setCheckoutSuccess(false);
  };

  // Submit Checkout Process
  const handleExecuteCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail || !checkoutProduct) return;

    // Generate cool cryptographic/invoice ID
    const randomHex = Math.random().toString(36).substring(2, 9).toUpperCase();
    const cleanBrand = checkoutProduct.brand.substring(0, 3).toUpperCase();
    const stamp = new Date().toISOString().substring(2, 10).replace(/-/g, "");
    setCheckoutInvoice(`ATH-SALE-${cleanBrand}-${randomHex}-${stamp}`);
    setCheckoutSuccess(true);
  };

  // Toggle expandable specs panel
  const handleToggleSpecs = (id: string) => {
    setExpandedSpecs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate customized final price based on options
  const getSelectedPrice = (basePrice: number, storage: string, withTradeIn: boolean) => {
    let finalPrice = basePrice;
    if (storage === "128GB") finalPrice -= 80;
    if (storage === "512GB") finalPrice += 150;
    if (storage === "1TB") finalPrice += 320;
    if (withTradeIn) finalPrice -= 280; // Standard nominal value
    return finalPrice;
  };

  // Process filters and sorting
  const filteredProducts = DATABASE_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = activeBrand === "All" ? true : product.brand === activeBrand;
    const matchesCategory = activeCategory === "all" ? true : product.category === activeCategory;
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0; // featured/relevance default
  });

  const displayProducts = sortedProducts.slice(0, visibleCount);

  // Reflectance/Lighting calculations for Try-On Sandbox
  const getReflectanceStyle = () => {
    const angleRad = (lightAngle * Math.PI) / 180;
    const offsetX = Math.round(Math.cos(angleRad) * 15);
    const offsetY = Math.round(Math.sin(angleRad) * 15);
    const opacity = (lightIntensity / 100) * 0.5;
    return {
      filter: `drop-shadow(${offsetX}px ${offsetY}px 20px rgba(255, 255, 255, ${opacity}))`,
    };
  };

  // Run Valuation calculation
  const handleRunValuation = () => {
    // Generate simulated premium value
    let estimated = 250;
    const deviceStr = userCurrentDevice.toLowerCase();
    if (deviceStr.includes("iphone 15 pro") || deviceStr.includes("s24 ultra") || deviceStr.includes("pixel 9") || deviceStr.includes("macbook")) {
      estimated = 580;
    } else if (deviceStr.includes("iphone 14") || deviceStr.includes("pro max") || deviceStr.includes("z fold") || deviceStr.includes("dell")) {
      estimated = 440;
    } else if (deviceStr.includes("iphone 13") || deviceStr.includes("s23") || deviceStr.includes("pixel 8")) {
      estimated = 320;
    } else {
      estimated = 180;
    }
    setTradeInEstimatedValue(estimated);
  };

  return (
    <section id="voyages" className="relative min-h-screen py-24 px-8 md:px-16 lg:px-20 bg-black/45 backdrop-blur-sm text-white flex flex-col justify-start">
      {/* Dynamic Star Ambient glow in background */}
      <div className="absolute top-[30%] left-[20%] w-[450px] h-[450px] bg-white/[0.012] rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-white/[0.015] rounded-full filter blur-[160px] pointer-events-none" />

      {/* Header Typography */}
      <div className="text-left w-full select-none">
        <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-mono block mb-5">
          // Digital Catalog
        </span>
        <h2 className="font-heading italic text-white text-5xl md:text-7xl lg:text-[6rem] leading-[0.85] tracking-[-3px] max-w-4xl">
          Premium <span className="block mt-1">Ecosystem</span>
        </h2>
      </div>

      {/* SEARCH, CATEGORY, BRAND FILTER & SORT BAR */}
      <div className="mt-16 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 pb-6 border-b border-white/5">
        
        {/* Category Selector Buttons & Brand Selector Pills */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider font-mono text-white/40 mr-2">Category:</span>
            {(["all", "phone", "laptop"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(6); // reset view visibility count
                }}
                className={`px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase rounded-full border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-white text-black border-white font-extrabold"
                    : "bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat === "all" ? "All Devices" : cat === "phone" ? "Smartphones" : "Laptops"}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5 items-center">
            {(["All", "Apple", "Samsung", "Google", "Others"] as const).map((brand) => {
              const count = brand === "All" 
                ? DATABASE_PRODUCTS.filter(p => activeCategory === "all" ? true : p.category === activeCategory).length
                : DATABASE_PRODUCTS.filter(p => p.brand === brand && (activeCategory === "all" ? true : p.category === activeCategory)).length;

              return (
                <button
                  key={brand}
                  onClick={() => {
                    setActiveBrand(brand);
                    setVisibleCount(6); // reset view visibility count
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded-full font-body transition-all cursor-pointer flex items-center gap-2 border ${
                    activeBrand === brand
                      ? "bg-white/10 text-white border-white/40 font-bold"
                      : "bg-white/5 border-white/5 text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{brand}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${activeBrand === brand ? "bg-white text-black font-extrabold" : "bg-white/10 text-white/50"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input and Sort bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          
          {/* Search box overlay */}
          <div className="relative flex items-center bg-white/5 border border-white/5 rounded-full px-4 py-2 group focus-within:border-white/20 transition-all">
            <Search className="w-3.5 h-3.5 text-white/40 mr-2.5 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search specifications, models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-white placeholder-white/30 focus:outline-none w-full sm:w-[180px] md:w-[240px]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="hover:text-white text-white/40 ml-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-full px-4 py-2">
            <Sliders className="w-3.5 h-3.5 text-white/40" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none text-xs text-white focus:outline-none cursor-pointer pr-2"
            >
              <option value="featured" className="bg-black text-white">Sort: Featured</option>
              <option value="price-asc" className="bg-black text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-black text-white">Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* CORE PRODUCT CATALOG GRID */}
      {sortedProducts.length === 0 ? (
        <div className="py-24 text-center rounded-[1.25rem] border border-white/5 bg-white/[0.01] mt-8">
          <p className="text-white/50 text-sm font-body font-light">
            No devices found matching current filters or search terms.
          </p>
          <button 
            onClick={() => { setSearchQuery(""); setActiveBrand("All"); }}
            className="text-white mt-4 text-xs font-mono font-bold hover:underline"
          >
            Clear current choices
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-stretch w-full">
          {displayProducts.map((product) => {
            const activeColor = selectedColors[product.id] || product.colors[0];
            const isComparing = comparisonList.some(item => item.id === product.id);
            const isExpanded = expandedSpecs[product.id] || false;

            return (
              <motion.div
                key={product.id}
                layoutId={`card-container-${product.id}`}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-[1.25rem] liquid-glass p-5 md:p-6 flex flex-col justify-between group border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div>
                  {/* Top utility row */}
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-white/40">
                      {product.brand}
                    </span>
                    {product.badge && (
                      <span className="text-[8px] sm:text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/5 select-none">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* SVG Phone Graphic Component representation */}
                  <div className="my-1 cursor-pointer" onClick={() => handleToggleSpecs(product.id)}>
                    <PhoneMockup 
                      brand={product.name} 
                      color={activeColor} 
                      svgType={product.svgType} 
                    />
                  </div>

                  {/* Core product information */}
                  <div className="mt-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-heading italic font-semibold text-white text-2xl tracking-tight leading-none">
                        {product.name}
                      </h3>
                      <span className="font-mono text-base font-bold text-white/95">
                        ETB {product.price}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 font-body font-light leading-relaxed mt-2.5 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Color Selection circle indicators */}
                  <div className="mt-4 flex flex-col gap-1.5">
                    <div className="flex gap-1.5 items-center mb-1">
                      {product.colors.map((color) => {
                        const styleColor = COLOR_HEX[color] || "#FFFFFF";
                        const isSelected = activeColor === color;
                        return (
                          <button
                            key={color}
                            onClick={() => setSelectedColors(prev => ({ ...prev, [product.id]: color }))}
                            className={`w-3.5 h-3.5 rounded-full cursor-pointer relative transition-transform ${
                              isSelected ? "scale-110 border border-white/90" : "opacity-80 hover:opacity-100"
                            }`}
                            style={{ backgroundColor: styleColor }}
                            title={color}
                          >
                            {isSelected && (
                              <div className="absolute inset-0.5 rounded-full border border-black" />
                            )}
                          </button>
                        );
                      })}
                      <span className="text-[10px] font-mono text-white/40 ml-2">
                        {activeColor}
                      </span>
                    </div>
                  </div>

                  {/* Micro specs bullet grid */}
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    <button
                      onClick={() => handleToggleSpecs(product.id)}
                      className="text-[10px] font-mono uppercase tracking-wider text-white/50 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? "Collapse Specs" : "Expand Full Specs"}</span>
                      <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5 pt-2 text-[11px] font-body text-white/70 overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-2 bg-white/3 p-3 rounded-lg border border-white/5">
                            <div>
                              <span className="text-[9px] font-mono uppercase text-white/30 block">Chipset</span>
                              <span className="font-medium text-white/80">{product.specs.chip}</span>
                            </div>
                            <div>
                              <span className="text-[9px] font-mono uppercase text-white/30 block">Optics</span>
                              <span className="font-medium text-white/80">{product.specs.camera}</span>
                            </div>
                            <div className="col-span-2 pt-1.5 border-t border-white/5">
                              <span className="text-[9px] font-mono uppercase text-white/30 block">Display Screen</span>
                              <span className="font-medium text-white/80">{product.specs.display}</span>
                            </div>
                            <div className="pt-1.5 border-t border-white/5">
                              <span className="text-[9px] font-mono uppercase text-white/30 block">Energy Range</span>
                              <span className="font-medium text-white/80">{product.specs.battery}</span>
                            </div>
                            <div className="pt-1.5 border-t border-white/5">
                              <span className="text-[9px] font-mono uppercase text-white/30 block">Weight</span>
                              <span className="font-medium text-white/80">{product.specs.weight}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom control CTAs block */}
                <div className="mt-6 flex gap-3 h-[38px] items-center">
                  
                  {/* Compare toggle button */}
                  <button
                    onClick={() => handleToggleCompare(product)}
                    className={`h-full px-3.5 rounded-full text-xs font-mono font-semibold relative transition-colors cursor-pointer flex items-center justify-center gap-1.5 border ${
                      isComparing 
                        ? "bg-white/10 border-white text-white" 
                        : "bg-transparent border-white/10 text-white/60 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {isComparing ? <Check className="w-3.5 h-3.5" /> : null}
                    <span>{isComparing ? "Compare [✔]" : "Compare"}</span>
                  </button>

                  {/* Check Availability direct button */}
                  <button
                    onClick={() => handleTriggerCheckout(product)}
                    className="flex-1 h-full bg-white text-black font-extrabold text-xs rounded-full hover:bg-neutral-150 transition-colors flex items-center justify-center gap-1 shadow-md cursor-pointer active:scale-95"
                  >
                    <span>Check Availability</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* VIEW MORE / LESS TRIGGER BUTTONS */}
      {sortedProducts.length > visibleCount && (
        <div className="mt-12 flex justify-center h-12">
          <button
            onClick={() => setVisibleCount(prev => prev + 4)}
            className="px-8 h-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-full cursor-pointer transition-colors border border-white/10 select-none font-mono tracking-widest uppercase flex items-center justify-center"
          >
            📊 View More Catalog Products
          </button>
        </div>
      )}

      {visibleCount > 6 && sortedProducts.length <= visibleCount && (
        <div className="mt-12 flex justify-center h-12">
          <button
            onClick={() => setVisibleCount(6)}
            className="px-8 h-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-full cursor-pointer transition-colors border border-white/10 select-none font-mono tracking-widest uppercase flex items-center justify-center"
          >
            ⬆ Collapse Product View
          </button>
        </div>
      )}


      {/* INTERACTIVE COMPARISON DRAPERY / PANEL */}
      {comparisonList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl bg-black/90 border border-white/10 rounded-[1.25rem] shadow-xl backdrop-blur-md p-4 flex flex-col items-stretch select-none">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-white/80">Device Comparison Deck ({comparisonList.length}/3)</span>
            </div>
            <button 
              onClick={() => { setComparisonList([]); setIsCompareOpen(false); }}
              className="p-1 hover:bg-white/10 rounded-full text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4 items-center justify-between py-2 border-b border-white/5">
            <div className="flex gap-3 overflow-x-auto py-1">
              {comparisonList.map((item) => (
                <div key={item.id} className="flex items-center bg-white/5 px-3 py-1.5 rounded-full border border-white/5 text-[11px] gap-2 whitespace-nowrap">
                  <span className="font-heading italic text-white">{item.name}</span>
                  <span className="font-mono text-white/50">ETB {item.price}</span>
                  <button onClick={() => handleRemoveCompareItem(item.id)} className="text-white/40 hover:text-white cursor-pointer font-bold">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {comparisonList.length >= 2 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                className="bg-white text-black px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest font-mono hover:bg-neutral-100 transition-colors uppercase cursor-pointer"
              >
                Compare Side-by-Side
              </button>
            )}
          </div>
        </div>
      )}


      {/* FULL COMPARISON GRID MODAL */}
      <AnimatePresence>
        {isCompareOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl rounded-[1.25rem] border border-white/10 bg-black p-6 md:p-8 text-white max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsCompareOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-white/50" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">Side By Side Specs</span>
                <h3 className="text-3xl font-heading italic text-white mt-1">Smart Specs Compared</h3>
              </div>

              {/* Grid with 1 header-labels column + comparative columns */}
              <div className="grid grid-cols-12 gap-4 mt-6 items-stretch border border-white/5 p-4 rounded-xl bg-white/[0.01]">
                
                {/* Labels Column */}
                <div className="col-span-3 flex flex-col gap-4 font-mono text-[10px] uppercase text-white/40 select-none pr-2 text-right">
                  <div className="h-28 flex items-center justify-end">Model</div>
                  <div className="h-10 flex items-center justify-end border-t border-white/5">Price</div>
                  <div className="h-14 flex items-center justify-end border-t border-white/5">Chipset</div>
                  <div className="h-14 flex items-center justify-end border-t border-white/5">Optics Specs</div>
                  <div className="h-14 flex items-center justify-end border-t border-white/5">Display Glass</div>
                  <div className="h-12 flex items-center justify-end border-t border-white/5">Power Range</div>
                  <div className="h-10 flex items-center justify-end border-t border-white/5">Net Weight</div>
                </div>

                {/* Compared Products Column */}
                {comparisonList.map((product) => {
                  return (
                    <div key={product.id} className="col-span-3 flex flex-col gap-4 text-xs font-body">
                      {/* Name Card */}
                      <div className="h-28 flex flex-col justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                        <span className="font-heading italic font-bold text-white text-sm line-clamp-1">{product.name}</span>
                        <span className="text-[9px] uppercase font-mono text-emerald-400 font-bold">{product.brand}</span>
                      </div>

                      {/* Price */}
                      <div className="h-10 flex items-center border-t border-white/10 text-white font-mono font-bold text-sm text-nowrap">
                        ETB {product.price}
                      </div>

                      {/* Processor */}
                      <div className="h-14 flex items-center border-t border-white/10 text-white/80 leading-snug">
                        {product.specs.chip}
                      </div>

                      {/* Camera */}
                      <div className="h-14 flex items-center border-t border-white/10 text-white/80 leading-snug">
                        {product.specs.camera}
                      </div>

                      {/* Display Screen */}
                      <div className="h-14 flex items-center border-t border-white/10 text-white/80 leading-snug">
                        {product.specs.display}
                      </div>

                      {/* Battery */}
                      <div className="h-12 flex items-center border-t border-white/10 text-white/80 leading-snug">
                        {product.specs.battery}
                      </div>

                      {/* Weight */}
                      <div className="h-10 flex items-center border-t border-white/10 text-white/80 font-mono">
                        {product.specs.weight}
                      </div>
                    </div>
                  );
                })}

                {/* Empty columns if comparison has less than 3 */}
                {Array.from({ length: 3 - comparisonList.length }).map((_, i) => (
                  <div key={i} className="col-span-3 flex items-center justify-center border border-dashed border-white/10 rounded-lg p-6 bg-white/[0.005]">
                    <span className="text-[10px] font-mono text-white/20 uppercase">Empty slot</span>
                  </div>
                ))}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* SECURE CHECKOUT / PRE-ORDER MODAL DRAWER */}
      <AnimatePresence>
        {checkoutProduct && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCheckoutProduct(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl rounded-[1.25rem] bg-black border border-white/10 text-white p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setCheckoutProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>

              {!checkoutSuccess ? (
                <div>
                  <div className="mb-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-mono">
                      AETHER COMMERCE · ORDER SECURE
                    </span>
                    <h2 className="text-3xl md:text-4xl font-heading italic text-white mt-1">
                      Check Availability
                    </h2>
                    <p className="text-xs font-body font-light text-white/70 mt-2">
                      Check real-time stock and verify availability instantly. Secure reservation priority for select devices.
                    </p>
                  </div>

                  <form onSubmit={handleExecuteCheckout} className="space-y-5">
                    
                    {/* Selected Product Summary Card */}
                    <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/5 border border-white/5 flex items-center justify-center rounded-lg">
                        <ShoppingBag className="w-6 h-6 text-white/80" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-mono uppercase text-white/40">{checkoutProduct.brand}</span>
                        <h4 className="font-heading italic text-lg leading-tight text-white mb-0.5">{checkoutProduct.name}</h4>
                        <p className="text-[10px] text-white/50">{checkoutColor} / {checkoutStorage}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-white/40 line-through block whitespace-nowrap">
                          ETB {checkoutProduct.price + 80}
                        </span>
                        <span className="text-base font-mono font-extrabold text-white whitespace-nowrap">
                          ETB {getSelectedPrice(checkoutProduct.price, checkoutStorage, isTradeIn)}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Selection Toggles */}
                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* Storage selector block */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase text-white/40 tracking-wider block">Storage capacity</label>
                        <select
                          value={checkoutStorage}
                          onChange={(e) => setCheckoutStorage(e.target.value as any)}
                          className="w-full bg-white/5 border border-white/5 hover:border-white/10 p-3 rounded-lg text-xs leading-none text-white focus:outline-none transition-colors"
                        >
                          <option value="128GB" className="bg-black text-white">128GB (-ETB 80)</option>
                          <option value="256GB" className="bg-black text-white">256GB (Base)</option>
                          <option value="512GB" className="bg-black text-white font-semibold">512GB (+ETB 150)</option>
                          <option value="1TB" className="bg-black text-white font-bold">1TB (+ETB 320)</option>
                        </select>
                      </div>

                      {/* Device Color selection preview display */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase text-white/40 tracking-wider block">Active Finish</label>
                        <select
                          value={checkoutColor}
                          onChange={(e) => setCheckoutColor(e.target.value)}
                          className="w-full bg-white/5 border border-white/5 hover:border-white/10 p-3 rounded-lg text-xs leading-none text-white focus:outline-none transition-colors"
                        >
                          {checkoutProduct.colors.map(col => (
                            <option key={col} value={col} className="bg-black text-white">{col}</option>
                          ))}
                        </select>
                      </div>

                    </div>

                    {/* Active Trade-In Value Generator Frame */}
                    <div className="border border-white/5 p-4 rounded-xl bg-white/[0.01] space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="trade-in-check"
                            checked={isTradeIn}
                            onChange={(e) => setIsTradeIn(e.target.checked)}
                            className="accent-white h-4.5 w-4.5 bg-white/5 rounded-xs"
                          />
                          <label htmlFor="trade-in-check" className="text-xs font-semibold text-white/80 cursor-pointer select-none">
                            Trade-in old device for value
                          </label>
                        </div>
                        <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          Save ETB 280 instantly
                        </span>
                      </div>

                      {isTradeIn && (
                        <div className="pt-2 border-t border-white/5 flex gap-3">
                          <input
                            type="text"
                            placeholder="Current device (e.g., iPhone 13 Pro 128GB)"
                            value={tradeInDevice}
                            onChange={(e) => setTradeInDevice(e.target.value)}
                            className="bg-white/5 border border-white/5 rounded-lg text-xs p-2.5 flex-1 text-white focus:outline-none placeholder-white/20"
                          />
                        </div>
                      )}
                    </div>

                    {/* Customer Info Form */}
                    <div className="space-y-4 pt-1">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase text-white/40 tracking-wider block">Buyer full name</label>
                        <input
                          type="text"
                          required
                          placeholder="Henock Gizachew"
                          value={checkoutName}
                          onChange={(e) => setCheckoutName(e.target.value)}
                          className="w-full p-3 bg-white/5 border border-white/5 hover:border-white/10 rounded-lg text-xs focus:outline-none transition-colors text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase text-white/40 tracking-wider block">Email notification address</label>
                        <input
                          type="email"
                          required
                          placeholder="henock@aether.com"
                          value={checkoutEmail}
                          onChange={(e) => setCheckoutEmail(e.target.value)}
                          className="w-full p-3 bg-white/5 border border-white/5 hover:border-white/10 rounded-lg text-xs focus:outline-none transition-colors text-white"
                        />
                      </div>
                    </div>

                    {/* Submitting button */}
                    <button
                      type="submit"
                      className="w-full py-4 text-xs font-mono uppercase tracking-widest font-bold bg-white text-black hover:bg-neutral-100 transition-colors rounded-full text-center cursor-pointer active:scale-98 flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Check Availability & Secure Priority Booking
                    </button>

                  </form>
                </div>
              ) : (
                // Checkout Digital Receipt Boarding Pass
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-heading italic text-white leading-tight">Availability Verified & Booked</h3>
                  <p className="text-xs text-white/60 font-body font-light max-w-sm mx-auto mt-2">
                    Thank you, {checkoutName}. Device availability has been confirmed and priority reservation is logged in our cargo database pipelines.
                  </p>

                  {/* Aesthetic Printable Ticket Core */}
                  <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 text-left space-y-4 my-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 flex flex-col items-end opacity-20 hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="text-[8px] font-mono text-white/50 tracking-widest block uppercase">EST. PRIORITY CARGO</span>
                      <span className="text-[10px] font-mono text-white tracking-widest">AETHER SHIP</span>
                    </div>

                    <div className="flex justify-between pb-3 border-b border-white/5">
                      <div>
                        <span className="text-[8px] font-mono text-white/40 block uppercase">Transaction Ticket</span>
                        <span className="text-xs text-white font-mono font-bold leading-none">{checkoutInvoice}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] font-mono text-white/40 block uppercase">Order Total</span>
                        <span className="text-xs text-emerald-400 font-mono font-bold leading-none">
                          ETB {getSelectedPrice(checkoutProduct.price, checkoutStorage, isTradeIn)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-body">
                      <div>
                        <span className="text-[8px] font-mono text-white/40 block uppercase">Product Model</span>
                        <span className="text-white font-heading italic font-bold">{checkoutProduct.name}</span>
                        <span className="text-[10px] text-white/50 block font-mono">{checkoutColor} / {checkoutStorage}</span>
                      </div>

                      <div>
                        <span className="text-[8px] font-mono text-white/40 block uppercase">Registered Buyer</span>
                        <span className="text-white font-medium">{checkoutName}</span>
                        <span className="text-[10px] text-white/50 block max-w-[120px] truncate">{checkoutEmail}</span>
                      </div>

                      {isTradeIn && (
                        <div className="col-span-2 pt-2 border-t border-white/5">
                          <span className="text-[8px] font-mono text-white/40 block uppercase">Applied Trade-In Model</span>
                          <span className="text-emerald-400 font-mono font-medium">{tradeInDevice}</span>
                        </div>
                      )}
                    </div>

                    {/* Barcode Mockups styling */}
                    <div className="pt-3 border-t border-white/5 select-none opacity-40 hover:opacity-100 transition-opacity">
                      <div className="flex gap-1 h-8 items-center justify-center bg-black/40 rounded p-1">
                        {Array.from({ length: 28 }).map((_, idx) => {
                          const wClass = idx % 3 === 0 ? "w-[1px]" : idx % 5 === 0 ? "w-[3px]" : "w-[2px]";
                          const hClass = idx % 2 === 0 ? "h-full" : "h-4/5";
                          const bgClass = idx % 7 === 0 ? "bg-transparent" : "bg-white/80";
                          return (
                            <div key={idx} className={`${wClass} ${hClass} ${bgClass}`} />
                          );
                        })}
                      </div>
                      <div className="text-[7px] text-center font-mono uppercase text-white/30 tracking-widest mt-1.5">
                        * SECURE DIGITALLY ENCRYPTED MATRIX BLOCK *
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setCheckoutProduct(null)}
                      className="w-full py-3 text-xs font-mono uppercase tracking-wider font-bold bg-white text-black hover:bg-neutral-150 transition-colors rounded-full text-center cursor-pointer"
                    >
                      Close Confirmation ticket
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* INTERACTIVE SIMULATION DECK (Worlds Section - adapted perfectly for try-on Spec Sandbox) */}
      <div id="worlds" className="mt-16 w-full rounded-[1.25rem] border border-white/10 overflow-hidden bg-white/[0.015] p-6 lg:p-8">
        
        {/* Toggle Headings */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6">
          <div className="select-none">
            <span className="text-[10px] uppercase tracking-wider font-mono text-white/50 block">Aether Engine Laboratory</span>
            <h3 className="text-2xl font-heading italic text-white mt-1">Virtual Spec Try-on & Comparison Laboratory</h3>
          </div>

          {/* Tab controllers */}
          <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
            {[
              { id: "specifications", label: "Spec Inspector" },
              { id: "valuation", label: "Trade-In Estimator" },
              { id: "reviews", label: "Testimonies" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLabActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-full font-body transition-all cursor-pointer ${
                  labActiveTab === tab.id
                    ? "bg-white text-black font-extrabold shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Try-on interactive settings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Settings Left Column */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-white/40 block uppercase tracking-wider">Select Device to Load</span>
              <select
                value={labProduct.id}
                onChange={(e) => {
                  const item = DATABASE_PRODUCTS.find(p => p.id === e.target.value);
                  if (item) setLabProduct(item);
                }}
                className="w-full bg-white/5 border border-white/5 hover:border-white/10 p-3 rounded-lg text-xs leading-none text-white focus:outline-none transition-colors"
              >
                {DATABASE_PRODUCTS.map(p => (
                  <option key={p.id} value={p.id} className="bg-black text-white">{p.name}</option>
                ))}
              </select>

              <AnimatePresence mode="wait">
                {labActiveTab === "specifications" && (
                  <motion.div
                    key="lab-specifications"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <span className="text-xs font-mono text-white/40 block uppercase tracking-wider">Physical Coordinates</span>
                    <div className="bg-white/3 border border-white/5 p-4 rounded-xl space-y-2.5 text-xs text-white/80 leading-snug">
                      <p><strong>Brand Category:</strong> {labProduct.brand}</p>
                      <p><strong>Estimated Price:</strong> ETB {labProduct.price}</p>
                      <p><strong>Central CPU Engine:</strong> {labProduct.specs.chip}</p>
                      <p><strong>Optics Specs:</strong> {labProduct.specs.camera}</p>
                      <p><strong>Dimension Weight:</strong> {labProduct.specs.weight}</p>
                    </div>
                  </motion.div>
                )}

                {labActiveTab === "reviews" && (
                  <motion.div
                    key="lab-reviews"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <span className="text-xs font-mono text-white/40 block uppercase tracking-wider">Share your experience</span>
                    <form onSubmit={handleAddReview} className="space-y-3 bg-white/3 border border-white/5 p-4 rounded-xl">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="w-full bg-white/5 border border-white/5 hover:border-white/10 p-2.5 rounded-lg text-xs text-white focus:outline-none placeholder-white/20 transition-colors"
                        />
                      </div>
                      
                      {/* Rating selection stars */}
                      <div className="flex items-center gap-1.5 py-0.5">
                        <span className="text-xs text-white/50 font-body mr-1">Rating:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="text-amber-400 hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                          >
                            <Star className={`w-4 h-4 ${star <= newReviewRating ? "fill-amber-400 text-amber-400" : "text-white/20"}`} />
                          </button>
                        ))}
                      </div>

                      <div>
                        <textarea
                          placeholder="Write comments or rating review..."
                          required
                          rows={2}
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          className="w-full bg-white/5 border border-white/5 hover:border-white/10 p-2.5 rounded-lg text-xs text-white focus:outline-none placeholder-white/20 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-white text-black font-semibold rounded-full text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-neutral-100 transition-colors active:scale-95 text-nowrap"
                      >
                        Submit Review
                      </button>
                    </form>
                  </motion.div>
                )}

                {labActiveTab === "valuation" && (
                  <motion.div
                    key="lab-valuation"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <span className="text-xs font-mono text-white/40 block uppercase tracking-wider">Trade-In Price Appraisal</span>
                    <p className="text-xs text-white/75 font-body leading-relaxed">
                      Determine the market valuation of your old phone or laptop to instantly trade in against: <strong>{labProduct.name}</strong>.
                    </p>

                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={userCurrentDevice}
                        onChange={(e) => {
                          setUserCurrentDevice(e.target.value);
                          setTradeInEstimatedValue(null);
                        }}
                        placeholder="Current Smartphone (e.g., iPhone 13 Pro)"
                        className="w-full bg-white/5 border border-white/5 hover:border-white/10 p-3 rounded-lg text-xs leading-none text-white focus:outline-none placeholder-white/20 transition-colors"
                      />

                      <button
                        onClick={handleRunValuation}
                        className="w-full py-3 bg-white text-black font-semibold rounded-full text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-neutral-100 transition-colors active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        Appraise Current Device Value
                      </button>

                      <AnimatePresence>
                        {tradeInEstimatedValue !== null && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-emerald-500/10 border border-emerald-500/10 text-emerald-400 p-3.5 rounded-xl text-center"
                          >
                            <span className="text-[10px] uppercase font-mono tracking-widest block text-emerald-400/50 mb-0.5">Appraisal Completed</span>
                            <span className="text-2xl font-mono font-bold block">ETB {tradeInEstimatedValue}</span>
                            <span className="text-[10px] tracking-wide block leading-snug text-white/70 mt-1">
                              Final trade-in price for {labProduct.name}: <strong>ETB {labProduct.price - tradeInEstimatedValue}</strong>
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Settings Visual Right Column */}
          <div className="lg:col-span-8 bg-[#030303] rounded-[1.25rem] border border-white/5 flex items-center justify-center p-6 min-h-[300px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_0%,rgba(0,0,0,0)_75%)] pointer-events-none" />

            {(() => {
              const productReviews = reviewsData[labProduct.id] || [];
              const averageRating = productReviews.length 
                ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
                : "5.0";

              return (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${labProduct.id}-${labActiveTab}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className={`w-full ${labActiveTab === "reviews" ? "max-w-2xl" : "max-w-sm aspect-video"} rounded-[1rem] bg-white/[0.015] border border-white/10 flex flex-col items-center justify-center relative p-6 transition-all duration-500`}
                  >
                    {labActiveTab === "reviews" ? (
                      <div className="w-full h-full flex flex-col md:grid md:grid-cols-12 gap-6 text-left">
                        {/* Rating aggregate statistics Left col */}
                        <div className="md:col-span-4 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Average Star Rating</span>
                          <div className="flex items-baseline gap-1.5 justify-center md:justify-start">
                            <span className="text-4xl font-heading font-extrabold text-white">{averageRating}</span>
                            <span className="text-xs font-mono text-white/40">/ 5.0</span>
                          </div>
                          
                          {/* Rating score stars */}
                          <div className="flex gap-0.5 mt-2">
                            {Array.from({ length: 5 }).map((_, idx) => {
                              const starVal = idx + 1;
                              const fill = starVal <= Math.round(Number(averageRating));
                              return (
                                <Star key={idx} className={`w-3.5 h-3.5 ${fill ? "fill-amber-400 text-amber-400" : "text-white/25"}`} />
                              );
                            })}
                          </div>

                          <span className="text-[10px] font-mono text-white/40 block mt-4 uppercase">
                            {productReviews.length} Verified {productReviews.length === 1 ? "Comment" : "Comments"}
                          </span>
                        </div>

                        {/* Ratings scrolling lists */}
                        <div className="md:col-span-8 space-y-3 max-h-[240px] overflow-y-auto pr-1">
                          {productReviews.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center py-10 border border-dashed border-white/10 rounded-2xl text-white/30 text-xs">
                              <MessageSquare className="w-8 h-8 opacity-25 mb-2 animate-pulse" />
                              <p>No verified comments yet for {labProduct.name}.</p>
                              <p className="mt-1">Be the very first to leave an appraisal review!</p>
                            </div>
                          ) : (
                            productReviews.map((rev) => (
                              <motion.div
                                key={rev.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/[0.03] border border-white/5 p-4 rounded-xl space-y-1.5 hover:border-white/10 transition-colors"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-heading italic font-bold text-white/90">{rev.author}</span>
                                  <span className="text-[10px] font-mono text-white/30">{rev.timestamp}</span>
                                </div>

                                {/* Stars */}
                                <div className="flex gap-0.5">
                                  {Array.from({ length: 5 }).map((_, idx) => (
                                    <Star
                                      key={idx}
                                      className={`w-3 h-3 ${idx < rev.rating ? "fill-amber-400 text-amber-400" : "text-white/10"}`}
                                    />
                                  ))}
                                </div>

                                <p className="text-xs font-body font-light text-white/70 leading-relaxed pr-2">
                                  {rev.comment}
                                </p>
                              </motion.div>
                            ))
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Simulated Device Spec mockup representation */}
                        <div className="scale-110">
                          <PhoneMockup 
                            brand={labProduct.name} 
                            color={labProduct.colors[0]} 
                            svgType={labProduct.svgType} 
                          />
                        </div>

                        <div className="absolute bottom-4 right-4 flex items-center gap-1 text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none">
                          <Sparkles className="w-3.5 h-3.5 text-white/50 animate-pulse mr-1" />
                          <span>Interactive Engine Load Complete</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              );
            })()}
          </div>

        </div>

      </div>

    </section>
  );
}
