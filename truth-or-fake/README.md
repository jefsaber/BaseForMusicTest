# 🎯 Truth or Fake

Mini-jeu interactif développé avec **React**, **TypeScript** et **Mantine**, dans le cadre d’un test technique pour Base for Music.

L’objectif : deviner si un conseil de vie est réel (issu d’une API) ou inventé (issu d’un fichier local).

---

## 🚀 Installation & lancement

```bash
# Cloner le projet
git clone https://github.com/jefsaber/truth-or-fake.git
cd truth-or-fake

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

src/

- App.tsx : composant principal du jeu, contient la logique et l'affichage.
- data/fakeAdvices.json : fichier contenant les conseils inventés.
- main.tsx : point d’entrée de l’application, contient MantineProvider et Notifications.

Stack utilisée

- React 19 + TypeScript
- Mantine UI : composants, animations, notifications
- Advice Slip API : https://api.adviceslip.com/advice
- Fichier local JSON pour les faux conseils

Fonctionnement du jeu

- Le joueur commence avec 10 points
- À chaque tour, un conseil s’affiche :
- Il peut venir de l’API (réel) ou du fichier JSON (faux)
- Le joueur clique sur Vrai ou Faux
  Bonne réponse : +1 point
  Mauvaise réponse : -1 point
- Victoire à 20 points, défaite à 0 points
- Affichage d’un message de fin et d’un bouton "Rejouer"

Avec plus de temps, voici ce que j’ajouterais :

- Timer de réponse par tour
- Historique des réponses avec icône (vrai / faux)
- Responsive plus poussé pour mobiles
- Animations plus poussées (ex : transition d’écran, effets sonores)
- Dark mode avec toggle
- Ajout d’une progressive web app (PWA) pour y jouer hors-ligne
