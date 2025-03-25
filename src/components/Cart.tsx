
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  X, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { Separator } from "./ui/separator";

export function Cart() {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    isCartOpen, 
    setIsCartOpen,
    totalItems,
    subtotal
  } = useCart();

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Close cart when ESC key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setIsCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart panel */}
      <div 
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full sm:w-96 bg-background shadow-xl flex flex-col transition-transform duration-500 ease-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Panier ({totalItems})
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCartOpen(false)}
            className="rounded-full hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="bg-secondary rounded-full p-6 mb-4">
                <ShoppingCart className="h-10 w-10 text-primary/60" />
              </div>
              <h3 className="text-lg font-medium">Votre panier est vide</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Découvrez nos produits et ajoutez-les à votre panier
              </p>
              <Button 
                onClick={() => setIsCartOpen(false)} 
                className="rounded-full"
                asChild
              >
                <Link to="/products">Voir les produits</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 py-3 animate-fade-in">
                  <div className="h-20 w-20 flex-shrink-0 rounded-md border overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm truncate">
                        {item.product.name}
                      </h4>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 rounded-full -mr-1 -mt-1 hover:bg-secondary"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    
                    <span className="text-sm text-muted-foreground">
                      {item.product.price.toFixed(2)} €
                    </span>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <span className="font-medium">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Livraison</span>
                <span>Calculé à la caisse</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
            </div>
            
            <Button 
              className="w-full rounded-full font-medium btn-hover"
              asChild
            >
              <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                Commander
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
