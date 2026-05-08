# Coup Fatal

Simulation du **Coup Fatal**, l'épreuve de demi-finale du jeu télévisé *Les 12 coups de midi*.

---

## Déroulement

### 1. Écran de configuration

Avant le duel, l'hôte saisit le nom des deux joueurs et choisit la durée initiale de chaque chronomètre : un préréglage (30, 60 ou 90 secondes) ou une durée **personnalisée** (de 5 s à 1 h, avec décimales — ex. `45,25` s).

![Menu](src/assets/menu.png)

### 2. Le duel

L'hôte pose les questions à voix haute. Il contrôle le déroulement via les boutons :

- **Lancer le chrono** — démarre le chrono du joueur actif une fois la question posée
- **Bonne réponse** — met le chrono en pause et passe la main à l'adversaire
- **Mauvaise réponse** — le chrono continue, l'hôte enchaîne avec une nouvelle question
- **Changer de joueur** — correction manuelle en cas d'erreur de l'hôte

Un **flash vert** ou **rouge** clignote autour du chronomètre du joueur concerné selon la nature de la réponse. Les deux chronos sont affichés en temps réel au format `SS:CC` (secondes:centisecondes). Le joueur actif est mis en valeur, l'autre est estompé.

![En jeu](src/assets/in-game.png)

### 3. Écran vainqueur

Dès qu'un chrono atteint zéro, le duel s'arrête et le vainqueur est annoncé. L'hôte peut alors relancer un duel avec les mêmes joueurs ou revenir au menu.

![Vainqueur](src/assets/winner.png)

---

## Raccourcis clavier (en jeu)

| Touche   | Action                            | Disponibilité    |
| -------- | --------------------------------- | ---------------- |
| `Espace` | Lancer le chrono / Bonne réponse  | toujours         |
| `X`      | Mauvaise réponse                  | chrono en cours  |
| `S`      | Changer de joueur                 | chrono à l'arrêt |
| `Échap`  | Retour au menu                    | chrono à l'arrêt |

Les raccourcis sont désactivés lorsqu'un champ de saisie a le focus.

---

## Règles

- Le chrono ne tourne que pour le joueur actif
- Il s'arrête uniquement sur une bonne réponse
- Une mauvaise réponse laisse le chrono tourner
- Le premier joueur dont le chrono atteint zéro est éliminé

---

## Stack technique

- **React 19** + **TypeScript**
- **Vite**
- **Zustand** — gestion d'état global
- **Tailwind CSS v4**

---

## Structure

```
src/
├── App.tsx                          # Routeur d'écrans (setup / game / result)
├── App.css                          # Styles spécifiques à App
├── main.tsx                         # Point d'entrée React
├── index.css                        # Styles globaux + keyframes
│
├── assets/                          # Captures d'écran et logos
│   ├── hero.png
│   ├── in-game.png
│   ├── menu.png
│   ├── winner.png
│   ├── react.svg
│   └── vite.svg
│
├── components/
│   ├── game/                        # Plateau de jeu
│   │   ├── GameBoard.tsx            # Layout principal du duel
│   │   ├── PlayerTimer.tsx          # Chrono d'un joueur (avec flash de feedback)
│   │   └── AnswerControls.tsx      # Boutons d'action de l'hôte
│   │
│   ├── result/
│   │   └── GameResult.tsx           # Écran vainqueur
│   │
│   ├── setup/                       # Écran de configuration
│   │   ├── GameSetup.tsx            # Orchestrateur du formulaire
│   │   ├── PlayerNameInput.tsx      # Champ nom de joueur
│   │   ├── DurationSelector.tsx     # Sélecteur de durée (presets + perso)
│   │   └── useDurationField.ts      # Hook : état et validation de la durée
│   │
│   └── ui/                          # Composants génériques
│       ├── Button.tsx
│       └── KeyHint.tsx              # Affiche une touche clavier (<kbd>)
│
├── hooks/
│   ├── useGameTimer.ts              # Tick du chronomètre actif
│   └── useGameShortcuts.ts          # Raccourcis clavier en jeu
│
├── store/
│   └── gameStore.ts                 # Store Zustand (état + actions)
│
└── types/
    └── game.ts                      # Types métier (Player, GameState, AnswerFeedback…)
```
