"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCart } from "@/contexts/cart-context";
import { CartModal } from "./cart-modal";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="h-8 w-8 rounded-full bg-cyan-600 flex justify-center items-center font-black">Y</span>
          <span className="text-xl font-bold">YupStore</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <Popover open={isCartOpen} onOpenChange={setIsCartOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {state.itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {state.itemCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <CartModal onClose={() => setIsCartOpen(false)} />
            </PopoverContent>
          </Popover>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
