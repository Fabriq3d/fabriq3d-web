# Fabriq3D Solutions - Application Web de Personnalisation de Porte-clés

Application web permettant aux clients de personnaliser et commander des porte-clés en 3D.

## Fonctionnalités

- Personnalisation de porte-clés en temps réel
- Visualisation 3D interactive
- Formulaire de commande intégré
- Stockage des commandes dans MongoDB

## Technologies Utilisées

- **Frontend:**
  - Next.js 14
  - React
  - Three.js avec React Three Fiber
  - Tailwind CSS

- **Backend:**
  - API Routes Next.js
  - MongoDB

## Configuration Locale

1. Clonez le repository :
```bash
git clone https://github.com/Fabriq3d/fabriq3d-web.git
cd fabriq3d-web
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env.local` avec les variables suivantes :
```
MONGODB_URI=votre_url_mongodb
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000)

## Déploiement

L'application est déployée sur Vercel avec une base de données MongoDB Atlas.

## Structure du Projet

```
src/
  ├── app/
  │   ├── api/
  │   │   └── orders/
  │   ├── layout.tsx
  │   └── page.tsx
  ├── components/
  │   ├── KeychainCustomizer.tsx
  │   ├── KeychainModel.tsx
  │   └── OrderForm.tsx
  └── lib/
      └── mongodb.ts
