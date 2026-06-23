export interface Artisan {
  id: string
  name: string
  specialty: string
  city: string
  wilaya: string
  rating: number
  salesCount: number
  bio: string
  gradient: string
  productIds: string[]
  since: string
  verified: boolean
  responseTime: string
}

export const artisans: Artisan[] = [
  {
    id: "a1",
    name: "Atelier Yasmine",
    specialty: "Couturière",
    city: "Alger Centre",
    wilaya: "Alger",
    rating: 4.9,
    salesCount: 124,
    bio: "Couturière passionnée avec 15 ans d'expérience dans la confection traditionnelle algérienne. Spécialisée dans les kaftans, robes de soirée et djellabas brodées. Chaque pièce est réalisée avec soin, dans le respect des traditions.",
    gradient: "from-[#D97757] to-[#8B4513]",
    productIds: ["p1", "p26", "p30", "p6"],
    since: "2019",
    verified: true,
    responseTime: "< 2h",
  },
  {
    id: "a2",
    name: "Maison Karim",
    specialty: "Tailleur",
    city: "Oran",
    wilaya: "Oran",
    rating: 4.8,
    salesCount: 87,
    bio: "Tailleur de père en fils depuis 3 générations, Karim perpétue l'art du costume sur-mesure masculin. Tissu sélectionnés à Milan et Paris, façonnage 100% algérien. Référence pour les mariages et cérémonies.",
    gradient: "from-[#1F3A5F] to-[#0F1F33]",
    productIds: ["p12", "p9", "p25", "p21"],
    since: "2017",
    verified: true,
    responseTime: "< 4h",
  },
  {
    id: "a3",
    name: "Cuir & Co",
    specialty: "Maroquinerie",
    city: "Constantine",
    wilaya: "Constantine",
    rating: 4.7,
    salesCount: 215,
    bio: "Atelier de maroquinerie artisanale fondé à Constantine. Tous nos produits sont fabriqués avec du cuir végétal tanné naturellement. Sacs, portefeuilles, ceintures et accessoires — chaque pièce est unique.",
    gradient: "from-[#7C5C3E] to-[#3D2B1F]",
    productIds: ["p3", "p10", "p19", "p27"],
    since: "2016",
    verified: true,
    responseTime: "< 3h",
  },
  {
    id: "a4",
    name: "Lina Créations",
    specialty: "Créatrice de mode",
    city: "Annaba",
    wilaya: "Annaba",
    rating: 4.9,
    salesCount: 56,
    bio: "Diplômée en stylisme de l'ESAA d'Alger, Lina crée des pièces qui marient l'esthétique contemporaine et l'âme algérienne. Robes de soirée, tenues de cérémonie et prêt-à-porter haut de gamme.",
    gradient: "from-[#4A2F5A] to-[#1F3A5F]",
    productIds: ["p6", "p23", "p20", "p11"],
    since: "2021",
    verified: true,
    responseTime: "< 6h",
  },
  {
    id: "a5",
    name: "Tlemcen Brodé",
    specialty: "Broderie traditionnelle",
    city: "Tlemcen",
    wilaya: "Tlemcen",
    rating: 5.0,
    salesCount: 38,
    bio: "Gardiens du patrimoine brodé tlemcénien, notre atelier emploie 8 artisanes qui perpétuent des techniques transmises depuis le XVe siècle. Burnous, caftans et robes de mariée ornés de broderies en fil d'or.",
    gradient: "from-[#F5DCC4] to-[#C4A882]",
    productIds: ["p5", "p22", "p24", "p16"],
    since: "2015",
    verified: true,
    responseTime: "< 8h",
  },
  {
    id: "a6",
    name: "Sahara Fashion",
    specialty: "Prêt-à-porter",
    city: "Ghardaïa",
    wilaya: "Ghardaïa",
    rating: 4.6,
    salesCount: 142,
    bio: "Née de la rencontre entre le désert et la modernité, Sahara Fashion réinterprète le style berbère pour un usage quotidien. Écharpes, vêtements et accessoires aux motifs géométriques traditionnels.",
    gradient: "from-[#C4863A] to-[#7C4A1E]",
    productIds: ["p18", "p28", "p17", "p13"],
    since: "2020",
    verified: true,
    responseTime: "< 12h",
  },
]
