
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "grid" | "horizontal";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
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
        "group relative flex overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md",
        variant === "horizontal" ? "flex-row" : "flex-col",
        variant === "grid" ? "h-full" : "",
        "animate-scale-in"
      )}
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
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {product.category}
          </span>
        </div>
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
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
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
            variant="outline"
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors btn-hover"
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
