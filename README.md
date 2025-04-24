# Choisir son environnement de dev : vite ou Next:
![Choisir entre vite et next](/src/assets/image.png)
![Choisir entre vite et next suite](/src/assets/image-1.png)

On va choisir vite + React ici.

# React + Vite

## Création d'un projet React avec vite.js 
```
npm create vite@latest mon-projet -- --template react
cd mon-projet
npm install 
```

## Démarrer le serveur
```
npm run dev
```

## Installation du router
1. Installer le router via npm
```
npm install react-router-dom
```

2. Ajouter dans main.js : 
```
import { BrowserRouter, Routes, Route } from 'react-router-dom';
```

3. Importer les pages et les intégrés au render avec Route dans app.js
```
import App from './App.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';

return (
    <>
        <div>
            <nav>
                <Link to="/">Accueil</Link> | <Link to="/about">À propos</Link>
            </nav>
            
            <hr />
            <Outlet /> 
        </div>
    </>
)
```

## Installation des dépendances

### Tailwind
```
npm install tailwindcss @tailwindcss/vite
```
dans vite.config.js:
```
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

## Création des dossiers (Vite ne le fait pas automatiquement)
Dans src créer les dossiers Pages et Composants puis créer les pages à intégrées dans les link de la route.


## Ligne de commande pour contourner ce problème en forçant l'installation de circle-packing
npm install @nivo/circle-packing @nivo/core d3 --legacy-peer-deps

## Ajouter ou modifier du css
npx @tailwindcss/cli -i ./src/index.css -o ./src/output.css --watch