import { 
  Sofa, 
  Bed, 
  Lamp, 
  Table, 
  Monitor, 
  Armchair, 
  Briefcase, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Clock, 
  RotateCcw,
  Waves,
  Coffee,
  Tv
} from 'lucide-react';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  images: string[];
  category: string;
  subcategory: string;
  badge?: string;
  discountLabel?: string;
  description: string;
  features: string[];
  dimensions?: string;
  material?: string;
  color?: string;
}

export interface Category {
  id: string;
  title: string;
  icon: any;
  imageUrl: string;
  description: string;
  subcategories: string[];
}

/**
 * Navbar mega-menu preview images (files in `public/`), keyed by category id then subcategory label.
 */
export const NAV_SUBCATEGORY_IMAGES: Record<string, Record<string, string>> = {
  "living-room": {
    "Homelux Sofa Sets": encodeURI("/homelux sofaset.jpg"),
    Stationary: encodeURI("/stationary.jpg"),
    Sectional: encodeURI("/sectional.jpg"),
    Recliners: encodeURI("/recliners.jpg"),
    "Homelux Coffee Tables": encodeURI("/coffee tables.jpg"),
    "TV Stand": encodeURI("/tv stand.jpg"),
    "Homelux Accessories": encodeURI("/accessories.jpg"),
    "Accent Chairs": encodeURI("/accent chairs.jpg"),
    "Console Tables": encodeURI("/console tables.jpg"),
    "Homelux Dining Sets": encodeURI("/homelux dining set.jpg"),
  },
  bedroom: {
    "Homelux Mattresses": encodeURI("/homelux mattress.jpg"),
    "Homelux Bedroom Sets": encodeURI("/bedroom sets.jpg"),
    "Homelux Bedroom Suites": encodeURI("/bedroom suites.jpg"),
    "Homelux Pillows": encodeURI("/homelux pillows.jpg"),
  },
  outdoor: {
    "Outdoor Beds": encodeURI("/outdoor beds.jpg"),
    "Outdoor Dining": encodeURI("/outdoor dining.jpg"),
    "Outdoor Seating": encodeURI("/outdoor seating.jpg"),
  },
  office: {
    Workstations: encodeURI("/workstation.jpg"),
    "Office Desks": encodeURI("/office desk.jpg"),
    "Conference Tables": encodeURI("/conference.jpg"),
    "Reception Desks": encodeURI("/reception desks.jpg"),
    "High Back Chairs": encodeURI("/high back chairs.jpg"),
    "Mesh Chairs": encodeURI("/mesh chairs.jpg"),
    "Filing Cabinets": encodeURI("/filing cabinets.jpg"),
  },
};

export const CATEGORIES: Category[] = [
  {
    id: "living-room",
    title: "Living Room",
    icon: Sofa,
    imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop",
    description: "Transform your living space with our elegant and functional living room furniture. From plush sofas and cozy recliners to stylish coffee tables and entertainment units.",
    subcategories: [
      "Homelux Sofa Sets",
      "Stationary",
      "Sectional",
      "Recliners",
      "Homelux Coffee Tables",
      "TV Stand",
      "Homelux Accessories",
      "Accent Chairs",
      "Console Tables",
      "Homelux Dining Sets"
    ]
  },
  {
    id: "bedroom",
    title: "Bedroom",
    icon: Bed,
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=2070&auto=format&fit=crop",
    description: "Elevate your bedroom with our exquisite collection of beds, mattresses, and dressers. Find the perfect blend of comfort and elegance.",
    subcategories: [
      "Homelux Mattresses",
      "Homelux Bedroom Sets",
      "Homelux Bedroom Suites",
      "Homelux Pillows"
    ]
  },
  {
    id: "outdoor",
    title: "Outdoor",
    icon: Waves,
    imageUrl: "https://images.unsplash.com/photo-1621350612844-3236e75bd29e?q=80&w=2070&auto=format&fit=crop",
    description: "Whether you're lounging on a balcony or under a palm tree, our Premium Outdoor collections are your ticket to an instant retreat.",
    subcategories: [
      "Outdoor Beds",
      "Outdoor Dining",
      "Outdoor Seating"
    ]
  },
  {
    id: "office",
    title: "Office",
    icon: Briefcase,
    imageUrl: "https://images.unsplash.com/photo-1544413647-b5104439950aa?q=80&w=1974&auto=format&fit=crop",
    description: "Boost your productivity with our stylish and ergonomic office desks. Whether setting up a home office or upgrading your corporate workspace.",
    subcategories: [
      "Workstations",
      "Office Desks",
      "Conference Tables",
      "Reception Desks",
      "High Back Chairs",
      "Mesh Chairs",
      "Filing Cabinets"
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "hollyann-sofa",
    title: "Hollyann Contemporary Sofa",
    price: 147543.50,
    originalPrice: 226990.00,
    rating: 4.9,
    reviewCount: 322,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "living-room",
    subcategory: "Homelux Sofa Sets",
    badge: "Most Loved",
    discountLabel: "35% OFF",
    description: "A perfect blend of contemporary design and cozy sophistication. Featuring plush upholstery and sleek tapered legs, the Hollyann sofa is designed to anchor your living room with style.",
    features: [
      "High-density foam cushions",
      "Premium fabric upholstery",
      "Kiln-dried hardwood frame",
      "Corner-blocked joinery"
    ],
    dimensions: "90\"W x 38\"D x 37\"H",
    material: "Velvet",
    color: "Emerald Green"
  },
  {
    id: "cabalynn-bed",
    title: "Cabalynn Queen Panel Bed",
    price: 84995.00,
    originalPrice: 169980.00,
    rating: 4.8,
    reviewCount: 156,
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop"
    ],
    category: "bedroom",
    subcategory: "Homelux Bedroom Sets",
    badge: "Hot Deal",
    discountLabel: "50% OFF",
    description: "The Cabalynn Queen panel bed features a clean, platform design with a sophisticated headboard. Perfect for modern living spaces.",
    features: [
      "Platform base (no box spring required)",
      "Matte black finish",
      "Headboard peekaboo cutout",
      "Subtle wood grain detailing"
    ],
    dimensions: "65\"W x 85\"D x 52\"H",
    material: "Mahogany Wood",
    color: "Dark Walnut"
  },
  {
    id: "executive-desk",
    title: "Manager Executive Office Desk",
    price: 125000.00,
    originalPrice: 180000.00,
    rating: 4.7,
    reviewCount: 45,
    imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "office",
    subcategory: "Office Desks",
    badge: "Premium",
    description: "Boost your productivity with our ergonomic executive desk. Designed for maximum comfort and storage.",
    features: [
      "Cable management system",
      "Scratch-resistant surface",
      "built-in drawers",
      "Modern minimalist design"
    ],
    dimensions: "72\"W x 36\"D x 30\"H",
    material: "Oak Wood",
    color: "Natural Oak"
  },
  {
    id: "leather-armchair",
    title: "Vintage Tan Leather Armchair",
    price: 45000.00,
    originalPrice: 65000.00,
    rating: 4.9,
    reviewCount: 88,
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1965&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1965&auto=format&fit=crop"
    ],
    category: "living-room",
    subcategory: "Accent Chairs",
    material: "Top Grain Leather",
    color: "Cognac",
    description: "Add a touch of vintage elegance to your home with this meticulously crafted leather armchair. Features top-grain leather and solid wood legs.",
    features: ["Distressed leather", "Solid oak legs", "Tapered backrest"]
  },
  {
    id: "marble-dining",
    title: "Italian Marble Dining Table",
    price: 210000.00,
    originalPrice: 280000.00,
    rating: 5.0,
    reviewCount: 24,
    imageUrl: "https://images.unsplash.com/photo-1617806118233-f8e137453f9c?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617806118233-f8e137453f9c?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "living-room",
    subcategory: "Homelux Dining Sets",
    material: "Marble & Steel",
    color: "Carrara White",
    description: "A statement piece for your dining room. Genuine Italian marble top paired with a geometric gold-finished steel base.",
    features: ["Heat resistant surface", "Hand-polished marble", "Anti-slip base"]
  }
];

export const USP_ITEMS = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Across all major cities in Kenya"
  },
  {
    icon: ShieldCheck,
    title: "Quality Materials",
    description: "Sourced directly for fair pricing"
  },
  {
    icon: MapPin,
    title: "10 Showrooms",
    description: "Experience luxury nationwide"
  },
  {
    icon: Clock,
    title: "FPM Model",
    description: "Fair Pricing Model for transparency"
  }
];

export const SHOWROOMS = [
  {
    id: "two-rivers",
    name: "Two Rivers Mall, Nairobi",
    address: "First Floor, Opposite Nike Store",
    hours: {
      weekday: "10:30am – 7:00pm",
      weekend: "10:30am – 6:00pm"
    },
    description: "Our flagship Nairobi location featuring the largest Homelux selection."
  },
  {
    id: "city-mall",
    name: "City Mall, Mombasa",
    address: "Nyali, Ground Floor",
    hours: {
      weekday: "10:00am – 8:00pm",
      weekend: "10:00am – 7:00pm"
    },
    description: "Strategically designed to maximize customer experience with intuitive room sections."
  },
  {
    id: "westlands",
    name: "Sarit Centre, Westlands",
    address: "Second Floor, New Wing",
    hours: {
      weekday: "10:00am – 7:00pm",
      weekend: "11:00am – 6:00pm"
    },
    description: "Premium boutique showroom focused on executive office and luxury living."
  }
];

