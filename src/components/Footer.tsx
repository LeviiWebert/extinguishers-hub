
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold mb-4 inline-block">
              FireShield
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs">
              Protection incendie professionnelle pour particuliers et entreprises. Tous nos produits sont certifiés et conformes aux normes en vigueur.
            </p>
            <div className="mt-4 flex space-x-4">
              <a 
                href="#" 
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=ABC" className="text-muted-foreground hover:text-primary transition-colors">
                  Extincteurs ABC
                </Link>
              </li>
              <li>
                <Link to="/products?category=CO2" className="text-muted-foreground hover:text-primary transition-colors">
                  Extincteurs CO2
                </Link>
              </li>
              <li>
                <Link to="/products?category=Eau" className="text-muted-foreground hover:text-primary transition-colors">
                  Extincteurs à eau
                </Link>
              </li>
              <li>
                <Link to="/products?category=Mousse" className="text-muted-foreground hover:text-primary transition-colors">
                  Extincteurs à mousse
                </Link>
              </li>
              <li>
                <Link to="/products?category=Spécialisé" className="text-muted-foreground hover:text-primary transition-colors">
                  Extincteurs spécialisés
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  Retours
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} FireShield. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <img 
              src="/placeholder.svg" 
              alt="Payment methods" 
              className="h-6 opacity-70" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
