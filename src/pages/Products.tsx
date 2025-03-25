
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, Filter, SlidersHorizontal } from "lucide-react";
import { products, getAllCategories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "");
  const [sortOrder, setSortOrder] = useState<string>("featured");
  const categories = getAllCategories();
  
  // Effect to filter products when category or sort changes
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Apply sorting
    switch (sortOrder) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured - no special sort, use default
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortOrder]);
  
  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory) {
      searchParams.set("category", selectedCategory);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  }, [selectedCategory, searchParams, setSearchParams]);
  
  // Read category from URL on mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };
  
  const clearFilters = () => {
    setSelectedCategory("");
    setSortOrder("featured");
  };
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos extincteurs</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Découvrez notre gamme complète d'extincteurs de haute qualité, conçus pour assurer votre sécurité face aux risques d'incendie.
          </p>
        </div>
      </section>
      
      {/* Products section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filters and sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center">
              <div className="sm:hidden mr-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-4 w-4" />
                      Filtres
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filtres</SheetTitle>
                      <SheetDescription>
                        Affinez votre recherche d'extincteurs
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="py-6">
                      <h3 className="font-medium mb-3">Catégories</h3>
                      <div className="space-y-3">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-category-${category}`} 
                              checked={selectedCategory === category}
                              onCheckedChange={() => handleCategoryChange(category)}
                            />
                            <Label htmlFor={`mobile-category-${category}`}>{category}</Label>
                          </div>
                        ))}
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={clearFilters}
                      >
                        Réinitialiser les filtres
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="hidden sm:flex items-center space-x-2">
                <p className="text-sm font-medium">Filtrer par:</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      Catégorie
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem 
                      className={!selectedCategory ? "bg-secondary/50" : ""}
                      onClick={() => setSelectedCategory("")}
                    >
                      Toutes les catégories
                    </DropdownMenuItem>
                    {categories.map((category) => (
                      <DropdownMenuItem 
                        key={category}
                        className={selectedCategory === category ? "bg-secondary/50" : ""}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {selectedCategory && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Effacer les filtres
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Trier par:</p>
              <Select
                value={sortOrder}
                onValueChange={setSortOrder}
              >
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">En vedette</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="rating-desc">Mieux notés</SelectItem>
                  <SelectItem value="name-asc">Alphabétique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length > 1 ? "produits" : "produit"} {selectedCategory && `dans la catégorie "${selectedCategory}"`}
            </p>
          </div>
          
          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <h3 className="text-lg font-medium mb-2">Aucun produit trouvé</h3>
                <p className="text-muted-foreground mb-6">
                  Aucun produit ne correspond à vos critères de recherche.
                </p>
                <Button onClick={clearFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
