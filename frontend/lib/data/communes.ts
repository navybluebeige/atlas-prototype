const communesMap: Record<number, string[]> = {
  16: ["Alger Centre", "Bab Ezzouar", "Hydra", "Kouba", "Bir Mourad Raïs", "El Biar", "Chéraga", "Birkhadem", "Hussein Dey", "Bab El Oued"],
  31: ["Oran", "Es Sénia", "Bir El Djir", "Sidi Bel Hassan", "Aïn El Turck", "Oued Tlélat", "Arzew", "Bethioua"],
  25: ["Constantine", "El Khroub", "Hamma Bouziane", "Ain Smara", "Zighoud Youcef", "Ibn Ziad", "Didouche Mourad", "Ouled Rahmoun"],
  23: ["Annaba", "El Bouni", "Sidi Amar", "Berrahal", "El Hadjar", "Chorfa", "Aïn El Berda", "Chetaïbi"],
  9:  ["Blida", "Boufarik", "Meftah", "Larbaa", "Chiffa", "Bouinan", "Soumaa", "Beni Tamou"],
  19: ["Sétif", "El Eulma", "Aïn Oulmene", "Bougaa", "Aïn El Kebira", "Salah Bey", "Guidjel", "Ain Arnat"],
  5:  ["Batna", "Ain Touta", "Barika", "Merouana", "Timgad", "Oued El Ma", "Seriana", "Chemora"],
  15: ["Tizi Ouzou", "Azazga", "Boghni", "Draa Ben Khedda", "Ouacifs", "Tigzirt", "Larbaa Nath Irathen", "Maatkas"],
  13: ["Tlemcen", "Mansourah", "Chetouane", "Aïn Tallout", "Remchi", "Ghazaouet", "Maghnia", "Hennaya"],
  6:  ["Béjaïa", "Akbou", "Sidi Aïch", "Kherrata", "El Kseur", "Amizour", "Tichy", "Souk El Tenine"],
}

const DEFAULT_COMMUNES = ["Centre-ville", "Autre"]

export function getCommunesByWilaya(wilayaId: number): string[] {
  return communesMap[wilayaId] ?? DEFAULT_COMMUNES
}
