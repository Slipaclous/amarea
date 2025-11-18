# 🔧 Résolution du problème d'authentification PostgreSQL

## Problème
L'erreur `Authentication failed` signifie que les identifiants dans votre `.env` ne correspondent pas à votre installation PostgreSQL.

## Solutions

### Solution 1 : Utiliser l'utilisateur `postgres` (le plus courant)

Sur Windows, PostgreSQL est souvent installé avec un utilisateur `postgres`. 

**Étape 1 : Trouver le mot de passe**
- Si vous avez installé PostgreSQL vous-même, vous avez défini un mot de passe lors de l'installation
- Si vous ne vous en souvenez pas, vous pouvez le réinitialiser

**Étape 2 : Modifier le .env**

Remplacez dans votre `.env` :
```env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/amarea?schema=public"
```

### Solution 2 : Tester la connexion manuellement

```bash
# Tester avec psql
psql -U postgres -d amarea

# Si ça demande un mot de passe, entrez-le
# Si ça fonctionne, vous avez les bons identifiants
```

### Solution 3 : Réinitialiser le mot de passe PostgreSQL (si oublié)

**Sur Windows :**

1. Arrêter le service PostgreSQL :
```powershell
Stop-Service postgresql-x64-XX  # Remplacez XX par votre version
```

2. Modifier le fichier `pg_hba.conf` (généralement dans `C:\Program Files\PostgreSQL\XX\data\`)
   - Changer toutes les lignes `md5` ou `scram-sha-256` en `trust` pour `localhost`

3. Redémarrer PostgreSQL :
```powershell
Start-Service postgresql-x64-XX
```

4. Se connecter sans mot de passe :
```bash
psql -U postgres
```

5. Changer le mot de passe :
```sql
ALTER USER postgres WITH PASSWORD 'nouveau_mot_de_passe';
```

6. Remettre `md5` dans `pg_hba.conf` et redémarrer

### Solution 4 : Créer un nouvel utilisateur PostgreSQL

```bash
# Se connecter en tant que postgres
psql -U postgres

# Créer un nouvel utilisateur
CREATE USER amarea_user WITH PASSWORD 'mon_mot_de_passe_securise';

# Donner les permissions
GRANT ALL PRIVILEGES ON DATABASE amarea TO amarea_user;

# Quitter
\q
```

Puis dans `.env` :
```env
DATABASE_URL="postgresql://amarea_user:mon_mot_de_passe_securise@localhost:5432/amarea?schema=public"
```

## Format de DATABASE_URL

```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?schema=public
```

Exemple :
```
postgresql://postgres:monMotDePasse123@localhost:5432/amarea?schema=public
```

## Vérification rapide

Une fois le `.env` corrigé, testez :
```bash
npm run prisma:migrate
```



