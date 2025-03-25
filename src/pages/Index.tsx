
import { Hero } from "@/components/Hero";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const Index = () => {
  // Get featured products (first 3)
  const featuredProducts = products.slice(0, 3);
  
  // Get all categories
  const categories = [...new Set(products.map(product => product.category))];
  
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
                Notre sélection
              </span>
              <h2 className="text-3xl font-bold">Produits populaires</h2>
            </div>
            
            <Link 
              to="/products" 
              className="mt-4 md:mt-0 group inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              Voir tous les produits
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Catégories
            </span>
            <h2 className="text-3xl font-bold">Trouvez l'extincteur adapté</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Nous proposons une large gamme d'extincteurs pour répondre à tous vos besoins de sécurité incendie.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link 
                key={category}
                to={`/products?category=${category}`}
                className="group relative overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-300 hover:shadow-md bg-background animate-scale-in"
              >
                <div className="aspect-video bg-secondary/50 overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt={`Catégorie ${category}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{category}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{category}</h3>
                  <Button 
                    variant="outline" 
                    className="mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Découvrir
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Safety Info Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-fade-in">
              <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
                Sécurité incendie
              </span>
              <h2 className="text-3xl font-bold mb-6">Pourquoi choisir FireShield ?</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Qualité certifiée</h3>
                    <p className="text-muted-foreground mt-1">Tous nos extincteurs sont certifiés conformes aux normes européennes les plus strictes.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 7h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v3H4c-1.103 0-2 .897-2 2v5c0 1.103.897 2 2 2h3v4c0 1.103.897 2 2 2h6c1.103 0 2-.897 2-2v-4h3c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2z" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Assistance technique</h3>
                    <p className="text-muted-foreground mt-1">Notre équipe d'experts vous conseille pour choisir l'équipement le plus adapté à votre situation.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Livraison rapide</h3>
                    <p className="text-muted-foreground mt-1">Livraison sous 48h pour tous les produits en stock sur toute la France métropolitaine.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Satisfaction garantie</h3>
                    <p className="text-muted-foreground mt-1">Nous vous offrons une garantie de 30 jours satisfait ou remboursé sur tous nos produits.</p>
                  </div>
                </div>
              </div>
              
              <Button asChild className="mt-8 rounded-full btn-hover">
                <Link to="/about">
                  En savoir plus
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl animate-float">
                <img
                  src="/placeholder.svg"
                  alt="Sécurité incendie"
                  className="h-full w-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/10 rounded-full blur-xl z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground clip-path-slant">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à sécuriser votre espace ?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ne laissez pas le hasard décider de votre sécurité. Équipez-vous dès maintenant avec nos solutions de protection incendie professionnelles.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild 
              variant="secondary" 
              size="lg" 
              className="rounded-full font-medium bg-white text-primary hover:bg-white/90 btn-hover"
            >
              <Link to="/products">
                Voir nos produits
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="rounded-full font-medium border-white text-white hover:bg-white/10 btn-hover"
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
