
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { getProductById } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(id ? getProductById(id) : undefined);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulating loading state
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setProduct(getProductById(id));
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  // Get related products (same category but different ID)
  const relatedProducts = products
    .filter(p => product && p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  
  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16 min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-4xl">
          <div className="h-8 bg-secondary rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-secondary rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-secondary rounded w-3/4"></div>
              <div className="h-6 bg-secondary rounded w-1/4"></div>
              <div className="h-32 bg-secondary rounded"></div>
              <div className="h-12 bg-secondary rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="text-muted-foreground mb-8">
          Le produit que vous recherchez n'existe pas ou a été retiré.
        </p>
        <Button asChild>
          <Link to="/products">Voir tous les produits</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 animate-fade-in">
      <Link 
        to="/products" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux produits
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative group overflow-hidden rounded-xl border border-border bg-secondary/20">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-contain aspect-square p-8 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {product.category}
            </span>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating}/5
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-foreground/80">{product.description}</p>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Caractéristiques principales
            </h3>
            <ul className="list-disc list-inside text-foreground/80 space-y-1">
              {product.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{product.price.toFixed(2)} €</span>
              <div className="text-sm text-primary">En stock</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-full overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="flex-1 rounded-full btn-hover"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ajouter au panier
              </Button>
            </div>
            
            <Button
              variant="outline"
              className="w-full rounded-full btn-hover"
              asChild
            >
              <Link to="/checkout">
                Achat immédiat
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tabs for additional information */}
      <div className="mt-16">
        <Tabs defaultValue="specifications">
          <TabsList className="w-full border-b rounded-none justify-start">
            <TabsTrigger value="specifications">Spécifications</TabsTrigger>
            <TabsTrigger value="shipping">Livraison</TabsTrigger>
            <TabsTrigger value="warranty">Garantie</TabsTrigger>
          </TabsList>
          <TabsContent value="specifications" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border/60">
                  <span className="font-medium">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="pt-6">
            <div className="prose max-w-none">
              <h3>Informations de livraison</h3>
              <p>
                Nous proposons plusieurs options de livraison pour répondre à vos besoins:
              </p>
              <ul>
                <li>Livraison standard (2-4 jours ouvrables) - 5,95 €</li>
                <li>Livraison express (1-2 jours ouvrables) - 9,95 €</li>
                <li>Livraison gratuite pour toute commande supérieure à 99€</li>
              </ul>
              <p>
                Tous nos colis sont soigneusement emballés pour assurer la protection des produits pendant le transport.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="warranty" className="pt-6">
            <div className="prose max-w-none">
              <h3>Garantie et retours</h3>
              <p>
                Tous nos extincteurs sont couverts par une garantie de 5 ans contre les défauts de fabrication.
              </p>
              <p>
                En cas de problème avec votre produit, contactez notre service client sous 30 jours pour un remboursement ou un échange.
                Les produits doivent être retournés dans leur emballage d'origine et en parfait état.
              </p>
              <p>
                Pour les extincteurs, nous proposons également un service de maintenance et de recharge après la période de garantie.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
