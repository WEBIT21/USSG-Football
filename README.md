# USSG Football — Site Web

Site statique · GitHub Pages · Zéro backend

## Structure

```
ussg/
├── index.html              ← Accueil (hero + carrousel + catégories)
├── css/style.css           ← Styles
├── js/
│   ├── carousel.js         ← Carrousel automatique
│   └── gallery.js          ← Upload photos/vidéos + lightbox
├── assets/
│   ├── hero.jpg            ← Photo de fond hero (à remplacer)
│   └── photos/             ← Vos photos par catégorie
└── categories/
    ├── u6u7.html
    ├── u8u9.html
    ├── u10u11.html
    ├── u12u13.html
    ├── u14u15.html
    ├── u16u17.html
    ├── u18u19.html
    ├── seniors.html
    └── veterans.html
```

## Mise en ligne GitHub Pages

```bash
# 1. Créer le repo sur github.com puis :
git init
git remote add origin https://github.com/TON_COMPTE/ussg-football.git
git add .
git commit -m "🚀 Lancement site USSG"
git push -u origin main

# 2. GitHub → Settings → Pages → main → / (root) → Save
# Site dispo : https://TON_COMPTE.github.io/ussg-football/
```

## Ajouter des photos au carrousel (index.html)

Remplacer les blocs placeholder par de vraies images :

```html
<!-- Avant (placeholder) -->
<div class="slide">
  <div class="slide-placeholder">⚽</div>
  <div class="slide-over"><span>Match U12</span></div>
</div>

<!-- Après (vraie photo) -->
<div class="slide">
  <img src="assets/photos/match-u12-mars2026.jpg" alt="Match U12">
  <div class="slide-over"><span>Match U12 · Mars 2026</span></div>
</div>
```

## Workflow ajout de contenu

```bash
cp ~/Photos/match_u12/*.jpg assets/photos/
git add .
git commit -m "📸 Match U12-U13 — 15 mars 2026"
git push
# → Site mis à jour en 1-2 min
```

## Photo hero accueil

Mettre une photo de terrain dans `assets/hero.jpg`.
Elle s'affiche en fond de la section hero.

## Domaine personnalisé (optionnel)

Créer un fichier `CNAME` contenant votre domaine :
```
ussg-football.fr
```
Puis configurer le DNS chez votre registrar.
