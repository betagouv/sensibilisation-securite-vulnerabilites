# Vulnérabilité de la Semaine

Des diapositives interactives pour apprendre et comprendre les vulnérabilités de sécurité web courantes.

Ce projet propose une série de slides éducatifs couvrant les principales vulnérabilités web :

- **IDOR** (Insecure Direct Object References) : comprendre les contrôles d'accès défaillants
- **Open Redirect** : les risques des redirections non validées
- **SQL Injection** : injection de requêtes SQL et prévention
- **XSS** (Cross-Site Scripting) : les attaques par injection de scripts

Chaque module comprend :

- Une fiche d'identité de la vulnérabilité
- Des exemples d'attaque concrets
- Des comparaisons de code vulnérable vs sécurisé dans plusieurs langages (Express, Django, Flask, Rails, JavaScript)
- Des principes de sécurité et bonnes pratiques
- Des modèles de contrôle d'accès

## Comment utiliser ce projet ?

Vous pouvez travailler localement en utilisant votre propre IDE.

La seule exigence est d'avoir Node.js & npm installés - [installer avec nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Suivez ces étapes :

```sh
npm i
npm run dev
```

## Comment puis-je déployer ce projet ?

Vous pouvez déployer ce projet en utilisant n'importe quel service d'hébergement de site statique (par exemple, Vercel, Netlify, GitHub Pages).

1. Construire le projet : `npm run build`
2. Déployer le dossier `dist`.
