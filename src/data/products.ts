
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  rating: number;
  image: string;
  specifications: {
    [key: string]: string;
  };
}

export const products: Product[] = [
  {
    id: "ext-1",
    name: "ProTech X1",
    category: "ABC",
    price: 59.99,
    description: "Le ProTech X1 est notre extincteur polyvalent de qualité supérieure, conçu pour les maisons et les petites entreprises. Cet extincteur à poudre ABC combat efficacement les feux de classe A (matériaux solides), B (liquides inflammables) et C (équipements électriques sous tension).",
    features: [
      "Capacité de 2kg",
      "Certifié pour les feux de classe A, B et C",
      "Indicateur de pression intégré",
      "Design compact pour un stockage facile",
      "Durée de vie de 5 ans"
    ],
    rating: 4.8,
    image: "/placeholder.svg",
    specifications: {
      "Dimensions": "35 x 15 cm",
      "Poids": "3.5 kg",
      "Portée": "3-4 mètres",
      "Temps de décharge": "12 secondes",
      "Certification": "NF EN3-7"
    }
  },
  {
    id: "ext-2",
    name: "FireStop CO2",
    category: "CO2",
    price: 79.99,
    description: "Le FireStop CO2 est spécialement conçu pour les environnements technologiques et les laboratoires. Cet extincteur à dioxyde de carbone est idéal pour les feux d'équipements électriques et électroniques sensibles où l'utilisation d'eau ou de poudre pourrait causer des dommages supplémentaires.",
    features: [
      "Capacité de 2kg de CO2",
      "Parfait pour les équipements électroniques",
      "Ne laisse aucun résidu",
      "Diffuseur anti-statique",
      "Poignée ergonomique isolée"
    ],
    rating: 4.7,
    image: "/placeholder.svg",
    specifications: {
      "Dimensions": "40 x 12 cm",
      "Poids": "4.2 kg",
      "Portée": "2-3 mètres",
      "Temps de décharge": "8 secondes",
      "Certification": "NF EN3-7, NF EN3-8"
    }
  },
  {
    id: "ext-3",
    name: "AquaShield",
    category: "Eau",
    price: 49.99,
    description: "L'AquaShield est notre extincteur à eau pulvérisée avec additif, spécialement formulé pour les feux de classe A (matériaux solides comme le bois, le papier, les textiles). Sa technologie avancée permet une extinction rapide avec un minimum de dégâts d'eau.",
    features: [
      "Capacité de 6 litres",
      "Additif écologique",
      "Idéal pour les matériaux solides",
      "Léger et facile à manipuler",
      "Durée de vie de 5 ans"
    ],
    rating: 4.6,
    image: "/placeholder.svg",
    specifications: {
      "Dimensions": "50 x 18 cm",
      "Poids": "9.5 kg",
      "Portée": "4-5 mètres",
      "Temps de décharge": "25 secondes",
      "Certification": "NF EN3-7"
    }
  },
  {
    id: "ext-4",
    name: "FoamMaster",
    category: "Mousse",
    price: 89.99,
    description: "Le FoamMaster est un extincteur à mousse haute performance conçu pour les feux de classe A et B. Sa mousse spéciale forme une couverture étouffante sur les liquides inflammables et empêche le réallumage, tout en refroidissant efficacement les matériaux solides.",
    features: [
      "Capacité de 3 litres",
      "Idéal pour les feux de liquides",
      "Prévient le réallumage",
      "Faible impact environnemental",
      "Certifié pour usage maritime"
    ],
    rating: 4.9,
    image: "/placeholder.svg",
    specifications: {
      "Dimensions": "45 x 17 cm",
      "Poids": "6.8 kg",
      "Portée": "3-4 mètres",
      "Temps de décharge": "20 secondes",
      "Certification": "NF EN3-7, MED"
    }
  },
  {
    id: "ext-5",
    name: "AutoGuard",
    category: "Spécialisé",
    price: 34.99,
    description: "L'AutoGuard est un extincteur compact spécialement conçu pour les véhicules. Sa formule poudre ABC est efficace contre tous les types de feux susceptibles de se déclarer dans un véhicule, du moteur aux garnitures intérieures.",
    features: [
      "Capacité de 1kg",
      "Format compact pour véhicules",
      "Support de fixation inclus",
      "Certification automobile",
      "Utilisable sur tous types de feux de véhicules"
    ],
    rating: 4.5,
    image: "/placeholder.svg",
    specifications: {
      "Dimensions": "25 x 10 cm",
      "Poids": "1.8 kg",
      "Portée": "2-3 mètres",
      "Temps de décharge": "8 secondes",
      "Certification": "NF EN3-7, CE"
    }
  },
  {
    id: "ext-6",
    name: "KitchenPro K",
    category: "Cuisine",
    price: 69.99,
    description: "Le KitchenPro K est spécialement formulé pour les feux de cuisine et de graisses (classe F). Son agent extincteur forme une pellicule savonneuse qui étouffe le feu et refroidit les huiles et graisses en ébullition, empêchant tout réallumage.",
    features: [
      "Solution spéciale pour feux de classe F",
      "Design élégant adapté aux cuisines",
      "Simple à utiliser en situation d'urgence",
      "Nettoyage facile après utilisation",
      "Support mural inclus"
    ],
    rating: 4.9,
    image: "/placeholder.svg",
    specifications: {
      "Dimensions": "38 x 15 cm",
      "Poids": "4.0 kg",
      "Portée": "2-3 mètres",
      "Temps de décharge": "12 secondes",
      "Certification": "NF EN3-7, EN3-10"
    }
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};
