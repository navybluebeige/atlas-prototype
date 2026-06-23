export interface PickupPoint {
  id: string
  name: string
  address: string
  neighborhood: string
  hours: string
  distance: string
  wilayaId: number
}

export const pickupPoints: PickupPoint[] = [
  { id: "pp1", name: "Épicerie Kheireddine", address: "12 rue des Frères Bouadou", neighborhood: "Bab Ezzouar", hours: "9h–21h (7j/7)", distance: "1.2 km", wilayaId: 16 },
  { id: "pp2", name: "Cyber Café El Manar", address: "5 avenue Souidani Boudjemaa", neighborhood: "Hydra", hours: "8h–22h (7j/7)", distance: "2.4 km", wilayaId: 16 },
  { id: "pp3", name: "Salon Beauté Yasmine", address: "38 rue Larbi Ben M'Hidi", neighborhood: "Kouba", hours: "9h–19h (Dim–Jeu)", distance: "3.1 km", wilayaId: 16 },
  { id: "pp4", name: "Librairie El Maarifa", address: "17 boulevard Krim Belkacem", neighborhood: "Bir Mourad Raïs", hours: "8h–20h (Dim–Jeu)", distance: "4.0 km", wilayaId: 16 },
  { id: "pp5", name: "Pressing Le Net", address: "9 rue Didouche Mourad", neighborhood: "El Biar", hours: "8h–20h (Dim–Ven)", distance: "5.2 km", wilayaId: 16 },
  { id: "pp6", name: "Tabac Presse Central", address: "2 place du 1er Novembre", neighborhood: "Chéraga", hours: "7h–22h (7j/7)", distance: "6.8 km", wilayaId: 16 },
  { id: "pp7", name: "Boulangerie Aïcha", address: "55 cité des 1000 logts", neighborhood: "Birkhadem", hours: "6h–21h (7j/7)", distance: "7.5 km", wilayaId: 16 },
  { id: "pp8", name: "Photocopies Plus", address: "28 avenue Belouizdad", neighborhood: "Hussein Dey", hours: "9h–19h (Dim–Jeu)", distance: "8.3 km", wilayaId: 16 },
]
