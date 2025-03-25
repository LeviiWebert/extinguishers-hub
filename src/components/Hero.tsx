
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-secondary/20 z-0"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-foreground/5 bg-[size:30px_30px] z-0 opacity-20"></div>
      
      {/* Animated shapes */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary/5 mix-blend-multiply filter blur-xl animate-float opacity-70"></div>
      <div className="absolute bottom-10 left-[5%] w-72 h-72 rounded-full bg-blue-500/5 mix-blend-multiply filter blur-xl animate-float opacity-70" style={{ animationDelay: '2s' }}></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col space-y-6 fade-in-section">
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full pulse-badge">
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
              <Button asChild size="lg" className="rounded-full font-medium btn-hover shine-effect">
                <Link to="/products">
                  Découvrir nos produits
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
              
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl z-0"></div>
            
            {/* Floating badges */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg z-20 animate-float" style={{ animationDelay: '1s' }}>
              <p className="text-xs font-medium text-foreground">Conforme aux normes</p>
              <p className="text-sm font-bold text-primary">EN3 & NF</p>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg z-20 animate-float" style={{ animationDelay: '1.5s' }}>
              <p className="text-xs font-medium text-foreground">Garantie</p>
              <p className="text-sm font-bold text-primary">5 ans</p>
            </div>
          </div>
        </div>
        
        {/* Badges/Certifications section */}
        <div className="mt-16 md:mt-24 border-t border-border/60 pt-10 fade-in-section" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-center text-sm uppercase tracking-wider text-muted-foreground mb-8">
            Certifications et conformités
          </h3>
          
          <div className="flex justify-between items-center flex-wrap gap-8">
            {['NF', 'CE', 'EN3', 'ISO 9001', 'MED'].map((cert, index) => (
              <div 
                key={cert} 
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity scale-in-animation"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <span className="text-xl font-semibold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
