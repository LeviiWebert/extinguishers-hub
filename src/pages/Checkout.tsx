
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, ShoppingCart, Truck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  address: z.string().min(5, "Adresse invalide"),
  city: z.string().min(2, "Ville invalide"),
  postalCode: z.string().min(5, "Code postal invalide"),
  country: z.string().min(2, "Pays invalide"),
  paymentMethod: z.enum(["card", "paypal", "bank"])
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<"information" | "shipping" | "payment">("information");
  
  const shipping = 5.95;
  const total = subtotal + shipping;
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "France",
      paymentMethod: "card"
    }
  });
  
  const onSubmit = (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Order submitted:', data);
      toast({
        title: "Commande confirmée",
        description: "Merci pour votre achat! Un email de confirmation vous a été envoyé.",
      });
      clearCart();
      setIsSubmitting(false);
      
      // Redirect to confirmation page (would be implemented in a real app)
      window.location.href = "/";
    }, 2000);
  };
  
  // If cart is empty, redirect to products
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-8">
            Ajoutez des produits à votre panier avant de procéder au paiement.
          </p>
          <Button asChild>
            <Link to="/products">Voir les produits</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 animate-fade-in">
      <Link 
        to="/" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continuer les achats
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Paiement sécurisé</h1>
          
          <div className="space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Information Section */}
                <div className={`space-y-6 ${currentStep !== "information" ? "hidden" : ""}`}>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                      1
                    </div>
                    <h2 className="text-xl font-semibold">Informations personnelles</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input placeholder="Dupont" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="06 12 34 56 78" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button 
                      type="button" 
                      className="w-full md:w-auto rounded-full btn-hover"
                      onClick={() => setCurrentStep("shipping")}
                    >
                      Continuer vers la livraison
                    </Button>
                  </div>
                </div>
                
                {/* Shipping Section */}
                <div className={`space-y-6 ${currentStep !== "shipping" ? "hidden" : ""}`}>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                      2
                    </div>
                    <h2 className="text-xl font-semibold">Adresse de livraison</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <Input placeholder="123 rue de la République" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl>
                              <Input placeholder="Paris" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code postal</FormLabel>
                            <FormControl>
                              <Input placeholder="75000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pays</FormLabel>
                            <FormControl>
                              <Input placeholder="France" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-sm font-medium">Options de livraison</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-border rounded-lg p-4 cursor-pointer bg-secondary/20">
                          <div className="flex items-start">
                            <div className="mr-2">
                              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary">
                                <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Standard</p>
                              <p className="text-sm text-muted-foreground">2-4 jours ouvrables</p>
                              <p className="text-sm font-medium mt-1">5,95 €</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-border rounded-lg p-4 cursor-pointer">
                          <div className="flex items-start">
                            <div className="mr-2">
                              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-muted">
                                <div className="h-2.5 w-2.5 rounded-full bg-transparent"></div>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Express</p>
                              <p className="text-sm text-muted-foreground">1-2 jours ouvrables</p>
                              <p className="text-sm font-medium mt-1">9,95 €</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-4 pt-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="rounded-full btn-hover"
                        onClick={() => setCurrentStep("information")}
                      >
                        Retour
                      </Button>
                      
                      <Button 
                        type="button" 
                        className="rounded-full btn-hover"
                        onClick={() => setCurrentStep("payment")}
                      >
                        Continuer vers le paiement
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Payment Section */}
                <div className={`space-y-6 ${currentStep !== "payment" ? "hidden" : ""}`}>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                      3
                    </div>
                    <h2 className="text-xl font-semibold">Méthode de paiement</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-2 border border-border rounded-lg p-4 cursor-pointer bg-secondary/20">
                                <RadioGroupItem value="card" id="card" className="sr-only" />
                                <label htmlFor="card" className="flex items-center justify-between w-full cursor-pointer">
                                  <div className="flex items-center">
                                    <CreditCard className="mr-3 h-5 w-5 text-primary" />
                                    <div>
                                      <p className="font-medium">Carte bancaire</p>
                                      <p className="text-sm text-muted-foreground">Visa, Mastercard, etc.</p>
                                    </div>
                                  </div>
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary">
                                    <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                                  </div>
                                </label>
                              </div>
                              
                              <div className="flex items-center space-x-2 border border-border rounded-lg p-4 cursor-pointer">
                                <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                                <label htmlFor="paypal" className="flex items-center justify-between w-full cursor-pointer">
                                  <div className="flex items-center">
                                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M7.4 4H16.7C17.9 4 18.8 4.8 19 5.9C19.2 7.1 19.2 8.3 19 9.4C18.8 10.2 18.3 10.9 17.8 11.4C16.8 12.2 15.6 12.6 14.4 12.6H11.4C10.9 12.6 10.5 13 10.4 13.5L9.5 19.4C9.4 19.8 9.1 20 8.7 20H5.8C5.4 20 5.1 19.6 5.2 19.2L7.2 4.8C7.3 4.3 7.8 4 7.4 4Z" fill="#002C8A" />
                                      <path d="M9 13H17.1C17.8 13 18.4 13.4 18.5 14.1L19.2 19.2C19.3 19.6 19 20 18.6 20H16C15.7 20 15.5 19.8 15.4 19.5L15.2 18C15.1 17.7 14.9 17.5 14.6 17.5H13.6C13.2 17.5 12.9 17.8 13 18.2L13.2 19.5C13.3 19.8 13 20 12.7 20H10.9C10.6 20 10.3 19.7 10.4 19.4L11.5 13.6C11.6 13.3 11.8 13 12.1 13H9Z" fill="#009BE1" />
                                      <path d="M15.8 5.9C16 5.1 15.7 4.3 15 4H7.9C7.3 4 6.8 4.5 6.7 5.1L5 17.2C4.9 17.7 5.3 18.1 5.8 18.1H7.4C7.9 18.1 8.3 17.7 8.4 17.2L9.1 12.7C9.2 12.3 9.6 12 10 12H14.6C15.9 12 17 11.3 17.5 10.3C17.8 9.5 17.9 8.6 17.6 7.8C17.3 7 16.6 6.4 15.8 5.9Z" fill="#001F6B" />
                                    </svg>
                                    <p className="font-medium">PayPal</p>
                                  </div>
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-muted">
                                    <div className="h-2.5 w-2.5 rounded-full bg-transparent"></div>
                                  </div>
                                </label>
                              </div>
                              
                              <div className="flex items-center space-x-2 border border-border rounded-lg p-4 cursor-pointer">
                                <RadioGroupItem value="bank" id="bank" className="sr-only" />
                                <label htmlFor="bank" className="flex items-center justify-between w-full cursor-pointer">
                                  <div className="flex items-center">
                                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M19 18V19C19 20.1 18.1 21 17 21H3C1.9 21 1 20.1 1 19V5C1 3.9 1.9 3 3 3H17C18.1 3 19 3.9 19 5V6H17V5H3V19H17V18H19Z" fill="currentColor" />
                                      <path d="M23 8H20V6H18V8H15V10H18V12H20V10H23V8Z" fill="currentColor" />
                                      <path d="M10 10.5V7.5C10 6.7 9.3 6 8.5 6H4.5C3.7 6 3 6.7 3 7.5V10.5C3 11.3 3.7 12 4.5 12H8.5C9.3 12 10 11.3 10 10.5ZM8.5 10.5H4.5V7.5H8.5V10.5Z" fill="currentColor" />
                                    </svg>
                                    <p className="font-medium">Virement bancaire</p>
                                  </div>
                                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-muted">
                                    <div className="h-2.5 w-2.5 rounded-full bg-transparent"></div>
                                  </div>
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 gap-4">
                        <FormItem>
                          <FormLabel>Numéro de carte</FormLabel>
                          <FormControl>
                            <Input placeholder="1234 5678 9012 3456" />
                          </FormControl>
                        </FormItem>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormItem>
                            <FormLabel>Date d'expiration</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/AA" />
                            </FormControl>
                          </FormItem>
                          
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input placeholder="123" />
                            </FormControl>
                          </FormItem>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-4 pt-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="rounded-full btn-hover"
                        onClick={() => setCurrentStep("shipping")}
                      >
                        Retour
                      </Button>
                      
                      <Button 
                        type="submit" 
                        className="rounded-full btn-hover"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Traitement en cours..." : "Confirmer la commande"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Récapitulatif de commande</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="h-16 w-16 flex-shrink-0 rounded-md border overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm truncate">
                        {item.product.name}
                      </p>
                      <span className="text-sm font-medium">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{item.quantity} x {item.product.price.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Livraison</span>
                <span>{shipping.toFixed(2)} €</span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Livraison estimée: 2-4 jours ouvrables</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>Paiement sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
