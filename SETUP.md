# Guide de configuration - Amarea

## 📋 Étapes de configuration complète

### 1. Installer les dépendances

```bash
npm install
```

### 2. Créer la base de données PostgreSQL

**Option A : Via psql (ligne de commande)**
```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE amarea;

# Créer un utilisateur (optionnel mais recommandé)
CREATE USER amarea_user WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE amarea TO amarea_user;

# Quitter psql
\q
```

**Option B : Via pgAdmin (interface graphique)**
1. Ouvrir pgAdmin
2. Clic droit sur "Databases" → "Create" → "Database"
3. Nom : `amarea`
4. Cliquer sur "Save"

**Option C : Via la ligne de commande (Windows)**
```bash
# Si PostgreSQL est dans le PATH
createdb -U postgres amarea
```

### 3. Configurer le fichier .env

Le fichier `.env` devrait déjà contenir :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/amarea?schema=public"
JWT_SECRET="votre-clé-jwt-secrète"
```

**Important** : Remplacez dans `DATABASE_URL` :
- `user` par votre nom d'utilisateur PostgreSQL (ex: `postgres` ou `amarea_user`)
- `password` par votre mot de passe PostgreSQL
- `localhost:5432` si votre PostgreSQL est sur un autre serveur/port

**Exemple de DATABASE_URL correct :**
```env
DATABASE_URL="postgresql://postgres:monMotDePasse123@localhost:5432/amarea?schema=public"
```

### 4. Générer le client Prisma

```bash
npm run prisma:generate
```

Cette commande génère le client Prisma basé sur votre schéma.

### 5. Créer les tables dans la base de données (migrations)

```bash
npm run prisma:migrate
```

Cette commande va :
- Créer un dossier `prisma/migrations/` avec les migrations
- Appliquer les migrations à votre base de données
- Créer toutes les tables définies dans `schema.prisma`

**Note** : Si c'est la première fois, Prisma vous demandera un nom pour la migration. Vous pouvez utiliser : `init`

### 6. Remplir la base de données avec des données de base (optionnel mais recommandé)

```bash
npm run prisma:seed
```

Cette commande crée :
- Un utilisateur admin par défaut :
  - Email : `admin@amarea.com`
  - Mot de passe : `admin123`
- Des services, statistiques, valeurs, témoignages et informations de contact de base

⚠️ **Important** : Changez le mot de passe admin après la première connexion !

### 7. Vérifier que tout fonctionne

**Option A : Prisma Studio (interface graphique pour voir la base de données)**
```bash
npm run prisma:studio
```

Cela ouvre une interface web sur `http://localhost:5555` où vous pouvez voir et modifier vos données.

**Option B : Démarrer l'application**
```bash
npm run dev
```

Puis ouvrez `http://localhost:3000/admin/login` et connectez-vous avec :
- Email : `admin@amarea.com`
- Mot de passe : `admin123`

## 🔧 Commandes Prisma utiles

```bash
# Générer le client Prisma (après modification du schema)
npm run prisma:generate

# Créer une nouvelle migration
npm run prisma:migrate

# Appliquer les migrations en production
npx prisma migrate deploy

# Réinitialiser la base de données (⚠️ supprime toutes les données)
npx prisma migrate reset

# Ouvrir Prisma Studio (interface graphique)
npm run prisma:studio

# Remplir la base avec des données de base
npm run prisma:seed

# Formater le fichier schema.prisma
npx prisma format

# Valider le schéma Prisma
npx prisma validate
```

## 🐛 Résolution de problèmes

### Erreur : "Can't reach database server"
- Vérifiez que PostgreSQL est démarré
- Vérifiez que le port dans `DATABASE_URL` est correct (par défaut : 5432)
- Vérifiez vos identifiants dans `.env`

### Erreur : "Database does not exist"
- Créez la base de données avec les commandes de l'étape 2

### Erreur : "Authentication failed"
- Vérifiez le nom d'utilisateur et le mot de passe dans `DATABASE_URL`
- Sur Windows, essayez d'utiliser `postgres` comme utilisateur par défaut

### Erreur lors de la migration
- Vérifiez que la base de données est vide ou utilisez `npx prisma migrate reset` pour réinitialiser

## 📝 Résumé rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Créer la base de données PostgreSQL (via psql ou pgAdmin)
createdb amarea

# 3. Configurer .env avec la bonne DATABASE_URL

# 4. Générer Prisma
npm run prisma:generate

# 5. Créer les tables
npm run prisma:migrate

# 6. Remplir avec des données de base
npm run prisma:seed

# 7. Démarrer l'application
npm run dev
```



