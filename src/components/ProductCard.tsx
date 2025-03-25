
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "grid" | "horizontal";
  delay?: number;
}

export function ProductCard({ product, variant = "default", delay = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className={cn(
        "group product-card rounded-lg border border-border bg-card text-card-foreground",
        variant === "horizontal" ? "flex-row" : "flex-col",
        variant === "grid" ? "h-full" : "",
        "scale-in-animation shine-effect",
      )}
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div 
        className={cn(
          "relative overflow-hidden bg-secondary/50",
          variant === "horizontal" ? "w-1/3" : "aspect-square w-full"
        )}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary pulse-badge">
            {product.category}
          </span>
        </div>
        
        {product.rating >= 4.5 && (
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-1 text-xs font-medium text-white">
              <Flame className="h-3 w-3" /> Populaire
            </span>
          </div>
        )}
      </div>
      
      <div 
        className={cn(
          "flex flex-col p-4",
          variant === "horizontal" ? "w-2/3" : "w-full"
        )}
      >
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-base md:text-lg">{product.name}</h3>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
        </div>
        
        <p className="line-clamp-2 text-sm text-muted-foreground mb-auto">
          {product.description.substring(0, 100)}...
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="font-medium text-lg">
            {product.price.toFixed(2)} €
          </span>
          
          <Button 
            size="sm"
            className="rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors btn-hover"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            <span className="sr-only md:not-sr-only md:inline-block">Ajouter</span>
          </Button>
        </div>
      </div>
    </Link>
  );
}
