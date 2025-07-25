import type { Product } from '@/server/api/routers/product';

export const features = [
  {
    title: "Premium Quality",
    description:
      "We source only the highest quality products from trusted manufacturers and artisans worldwide.",
    icon: "✨",
  },
  {
    title: "Fast Shipping",
    description:
      "Free shipping on orders over $50 with delivery in 2-3 business days across the country.",
    icon: "🚚",
  },
  {
    title: "Customer Support",
    description:
      "Our dedicated support team is available 24/7 to help with any questions or concerns.",
    icon: "🎧",
  },
  {
    title: "Secure Shopping",
    description:
      "Shop with confidence using our secure payment system and buyer protection guarantee.",
    icon: "🛡️",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 299.99,
    description: "Advanced fitness tracking with heart rate monitor, GPS, and sleep tracking.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
    category: "Wearables"
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "Comfortable and sustainable organic cotton t-shirt in various colors.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
    category: "Clothing"
  },
  {
    id: 4,
    name: "Professional Camera Lens",
    price: 599.99,
    description: "High-performance 50mm f/1.4 lens for professional photography.",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&crop=center",
    category: "Photography"
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    price: 89.99,
    description: "Modern LED desk lamp with adjustable brightness and USB charging port.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
    category: "Home"
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 79.99,
    description: "Portable waterproof Bluetooth speaker with rich sound and 12-hour battery.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    category: "Electronics"
  },
  {
    id: 7,
    name: "Yoga Mat Premium",
    price: 49.99,
    description: "Eco-friendly yoga mat with superior grip and cushioning for all yoga styles.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center",
    category: "Fitness"
  },
  {
    id: 8,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
    category: "Lifestyle"
  },
  {
    id: 9,
    name: "Mechanical Gaming Keyboard",
    price: 149.99,
    description: "RGB backlit mechanical keyboard with blue switches for ultimate gaming experience.",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center",
    category: "Electronics"
  },
  {
    id: 10,
    name: "Leather Messenger Bag",
    price: 89.99,
    description: "Handcrafted genuine leather messenger bag perfect for work and travel.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    category: "Fashion"
  },
  {
    id: 11,
    name: "Wireless Mouse",
    price: 39.99,
    description: "Ergonomic wireless mouse with precision tracking and long battery life.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center",
    category: "Electronics"
  },
  {
    id: 12,
    name: "Coffee Grinder",
    price: 79.99,
    description: "Burr coffee grinder for perfectly ground coffee beans every time.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center",
    category: "Kitchen"
  },
  {
    id: 13,
    name: "Running Shoes",
    price: 119.99,
    description: "Lightweight running shoes with responsive cushioning and breathable mesh.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    category: "Sports"
  },
  {
    id: 14,
    name: "Smartphone Stand",
    price: 19.99,
    description: "Adjustable aluminum smartphone stand for desk and nightstand use.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center",
    category: "Accessories"
  },
  {
    id: 15,
    name: "Bamboo Cutting Board",
    price: 34.99,
    description: "Sustainable bamboo cutting board with juice groove and non-slip feet.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    category: "Kitchen"
  },
  {
    id: 16,
    name: "Wireless Earbuds",
    price: 99.99,
    description: "True wireless earbuds with active noise cancellation and 24-hour battery.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center",
    category: "Electronics"
  },
  {
    id: 17,
    name: "Indoor Plant Pot",
    price: 24.99,
    description: "Modern ceramic plant pot with drainage tray for indoor gardening.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&crop=center",
    category: "Home"
  },
  {
    id: 18,
    name: "Resistance Bands Set",
    price: 29.99,
    description: "Complete resistance bands set with door anchor and workout guide.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    category: "Fitness"
  },
  {
    id: 19,
    name: "Stainless Steel Cookware Set",
    price: 199.99,
    description: "Professional-grade stainless steel cookware set with non-stick coating.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    category: "Kitchen"
  },
  {
    id: 20,
    name: "Travel Backpack",
    price: 69.99,
    description: "Durable travel backpack with multiple compartments and laptop sleeve.",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop&crop=center",
    category: "Travel"
  },
  {
    id: 21,
    name: "Digital Photo Frame",
    price: 149.99,
    description: "WiFi-enabled digital photo frame with HD display and cloud storage.",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop&crop=center",
    category: "Electronics"
  },
  {
    id: 22,
    name: "Skincare Set",
    price: 59.99,
    description: "Complete skincare routine set with cleanser, serum, and moisturizer.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center",
    category: "Beauty"
  },
  {
    id: 23,
    name: "Wall Art Canvas",
    price: 79.99,
    description: "Modern abstract wall art canvas print for contemporary home decor.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
    category: "Home"
  },
  {
    id: 24,
    name: "Bluetooth Headset",
    price: 89.99,
    description: "Professional Bluetooth headset with noise-canceling microphone for calls.",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&crop=center",
    category: "Electronics"
  }
];