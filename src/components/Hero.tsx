
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-secondary/20 z-0"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-foreground/5 bg-[size:30px_30px] z-0 opacity-20"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
                Sécurité incendie certifiée
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Protection incendie <span className="text-primary">professionnelle</span>
            </h1>
            
            <p className="max-w-[600px] text-foreground/80 md:text-xl">
              Des extincteurs de haute qualité pour votre sécurité, conformes aux normes les plus strictes. Protection fiable pour votre domicile et votre entreprise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full font-medium btn-hover">
                <Link to="/products">
                  Découvrir nos produits
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="rounded-full font-medium btn-hover">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative group">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-border shadow-xl animate-float">
              <img
                src="/placeholder.svg"
                alt="Extincteur FireShield"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl z-0"></div>
          </div>
        </div>
        
        {/* Badges/Certifications section */}
        <div className="mt-16 md:mt-24 border-t border-border/60 pt-10">
          <h3 className="text-center text-sm uppercase tracking-wider text-muted-foreground mb-8">
            Certifications et conformités
          </h3>
          
          <div className="flex justify-between items-center flex-wrap gap-8">
            {['NF', 'CE', 'EN3', 'ISO 9001', 'MED'].map((cert) => (
              <div key={cert} className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-xl font-semibold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
