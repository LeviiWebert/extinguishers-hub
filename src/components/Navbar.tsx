
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold text-foreground transition-opacity hover:opacity-80"
          >
            FireShield
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Accueil
            </Link>
            <Link 
              to="/products" 
              className="font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Produits
            </Link>
            <Link 
              to="/about" 
              className="font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              À propos
            </Link>
            <Link 
              to="/contact" 
              className="font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              onClick={openCart}
              variant="ghost" 
              size="icon"
              className="relative btn-hover"
              aria-label="Voir le panier"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-primary text-white text-xs rounded-full animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>

            <button 
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center" 
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 px-6 flex flex-col transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="flex flex-col space-y-6 py-8">
          <Link 
            to="/" 
            className="font-medium text-lg text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link 
            to="/products" 
            className="font-medium text-lg text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Produits
          </Link>
          <Link 
            to="/about" 
            className="font-medium text-lg text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            À propos
          </Link>
          <Link 
            to="/contact" 
            className="font-medium text-lg text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
