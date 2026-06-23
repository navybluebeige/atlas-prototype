# ATLAS — La mode algérienne, en confiance.

> La première plateforme algérienne d'e-commerce textile multi-acteurs avec paiement sécurisé **Atlas Escrow**.

---

## Description

ATLAS est un prototype front-end complet d'une plateforme verticale dédiée à la mode et au textile en Algérie. Elle connecte acheteurs, vendeurs particuliers, boutiques, artisans, livreurs et points relais. Toutes les données sont mockées côté client — aucun backend, aucune API externe.

---

## Stack technique

| Technologie | Rôle |
|---|---|
| Next.js 16 (App Router) | Framework React SSR/SSG |
| TypeScript (strict) | Typage statique |
| Tailwind CSS v4 | Styling utility-first |
| shadcn/ui | Composants UI accessibles |
| Zustand + persist | State global (panier, favoris) |
| react-hook-form + zod | Validation des formulaires |
| sonner | Toasts/notifications |
| lucide-react | Icônes |
| next/font (Inter) | Typographie optimisée |

---

## Installation locale

```bash
cd frontend
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Déploiement Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/votre-repo/atlas-prototype)

1. Pusher le repo sur GitHub
2. Importer sur [vercel.com](https://vercel.com) — détection automatique Next.js
3. Aucune variable d'environnement requise

---

## Structure du projet

```
frontend/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── boutique/                   # Catalogue avec filtres
│   ├── produit/[id]/               # Fiche produit
│   ├── idees/                      # Section inspiration (Pinterest)
│   ├── artisans/                   # Liste + profils artisans
│   ├── panier/                     # Étape 1 checkout
│   ├── checkout/
│   │   ├── livraison/              # Étape 2 — 4 modes
│   │   ├── paiement/               # Étape 3 — 4 méthodes
│   │   └── confirmation/           # Confirmation + timeline
│   ├── connexion/ & inscription/   # Auth (mockée)
│   ├── compte/                     # Dashboard, commandes, favoris
│   ├── vendre/                     # Landing vendeurs
│   ├── comment-ca-marche/          # Page éducative Escrow
│   └── a-propos/                   # À propos + CGU
├── components/
│   ├── layout/                     # Header, Footer, CheckoutHeader, AccountSidebar
│   ├── home/                       # Sections homepage
│   ├── product/                    # ProductCard, ProductClient
│   ├── checkout/                   # EscrowBadge, OrderSummary, CheckoutStepper
│   └── artisan/                    # ArtisanCard
├── lib/
│   ├── store/                      # Zustand (cart, favorites)
│   ├── data/                       # Données mockées
│   ├── validations/                # Schémas Zod
│   └── utils/                      # formatPrice, cn
```

---

## Fonctionnalités implémentées

### Catalogue & Navigation
- [x] Homepage complète (Hero, Trust Strip, Catégories, Tendances, Idées, Artisans, CTA Vendeurs)
- [x] Header sticky avec recherche rotative, compteurs panier/favoris
- [x] Navigation mobile (Sheet shadcn)
- [x] Footer complet (5 colonnes, logos CIB/EDAHABIA)

### Boutique
- [x] Catalogue avec filtres (catégorie, taille, état, wilaya, prix)
- [x] Tri (pertinence, prix, nouveautés, note)
- [x] Pagination "Afficher plus"
- [x] Recherche par `?q=` depuis le header

### Produit
- [x] Fiche produit avec galerie (4 miniatures)
- [x] Sélecteur taille + quantité
- [x] EscrowBadge (compact)
- [x] Onglets : Description / Détails / Avis / Livraison
- [x] Articles similaires
- [x] Ajout panier avec toast + action "Voir le panier"

### Checkout (flux complet)
- [x] Stepper 3 étapes avec progression visuelle
- [x] **Panier** : liste articles, taille, quantité, suppression avec annulation
- [x] **Livraison** : 4 modes (point relais, domicile, Yalidine, Click & Collect)
- [x] Formulaire adresse avec 58 wilayas + communes dynamiques
- [x] Sélection point relais avec 8 points mockés
- [x] **Paiement** : 4 méthodes (CIB, EDAHABIA, Espèces, Virement)
- [x] Formulaire carte avec masque + validation Luhn
- [x] **Confirmation** : OrderID généré, timeline, clearCart()
- [x] Atlas Escrow affiché à 4 endroits distincts

### Section Idées
- [x] Mur masonry 12 moodboards
- [x] Filtres par thème
- [x] Modale interactive avec produits liés cliquables
- [x] Pages détail idée

### Artisans
- [x] Grille 6 artisans avec mini-produits
- [x] Profil détaillé (bannière, stats, bio, produits, avis)

### Compte
- [x] Dashboard avec 4 KPIs
- [x] Liste commandes avec statuts colorés
- [x] Favoris (persistés via Zustand)
- [x] Paramètres profil

### Auth
- [x] Connexion + Inscription avec validation Zod
- [x] Boutons sociaux (factices)

### Pages statiques
- [x] Devenir vendeur (3 étapes, avantages, témoignages, 3 plans tarifaires)
- [x] Comment ça marche (Escrow, livraison, FAQ accordion)
- [x] À propos (mission, stats, contact, CGU)

### Données mockées
- [x] 30 produits (7 catégories, 6 villes, 3 conditions)
- [x] 6 artisans certifiés
- [x] 12 moodboards Idées
- [x] 58 wilayas algériennes complètes
- [x] Communes par wilaya (10 grandes wilayas)
- [x] 8 points relais à Alger
- [x] Panier pré-rempli pour démo

---

## Pages disponibles

| URL | Description |
|---|---|
| `/` | Homepage |
| `/boutique` | Catalogue avec filtres |
| `/produit/p1` | Fiche produit (p1 à p30) |
| `/idees` | Section inspiration |
| `/idees/i1` | Détail moodboard |
| `/artisans` | Liste artisans |
| `/artisans/a1` | Profil artisan |
| `/panier` | Étape 1 checkout |
| `/checkout/livraison` | Étape 2 |
| `/checkout/paiement` | Étape 3 |
| `/checkout/confirmation` | Confirmation |
| `/connexion` | Page connexion |
| `/inscription` | Page inscription |
| `/compte` | Dashboard compte |
| `/compte/commandes` | Mes commandes |
| `/compte/favoris` | Mes favoris |
| `/compte/parametres` | Paramètres |
| `/vendre` | Landing vendeurs |
| `/comment-ca-marche` | Guide Atlas Escrow |
| `/a-propos` | À propos |

---

## Roadmap V2

- [ ] Backend NestJS + PostgreSQL
- [ ] Authentification JWT (NextAuth.js)
- [ ] Intégration paiement SATIM (CIB/EDAHABIA)
- [ ] Système de messagerie vendeur/acheteur temps réel (WebSocket)
- [ ] Panel vendeur (gestion commandes, analytics)
- [ ] Application mobile React Native
- [ ] Notifications push
- [ ] Recherche full-text (Elasticsearch / Meilisearch)
- [ ] CDN images (Cloudinary)
- [ ] Multi-langue arabe (i18n)
- [ ] Programme fidélité

---

## Licence

MIT — © 2026 Atlas DZ

## Auteur

Prototype réalisé pour le label startup algérien.
