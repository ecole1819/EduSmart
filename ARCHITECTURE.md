# Architecture d'EduSmart

## Vue d'ensemble

EduSmart utilise une architecture en couches avec séparation des responsabilités pour faciliter la maintenance et la connexion à une vraie base de données.

## Structure du projet

```
EduSmart/
├── config/              # Configuration de l'application
├── css/                 # Styles
├── js/
│   ├── api/            # Appels API (à implémenter pour la production)
│   ├── services/       # Services métier
│   │   ├── AuthService.js          # Interface d'authentification
│   │   ├── SchoolService.js        # Interface de gestion des écoles
│   │   ├── UserService.js          # Interface de gestion des utilisateurs
│   │   ├── MockAuthService.js      # Implémentation mockée (dev)
│   │   ├── MockSchoolService.js    # Implémentation mockée (dev)
│   │   └── MockUserService.js      # Implémentation mockée (dev)
│   ├── app.js          # Logique principale
│   ├── data.js         # Données de démonstration (legacy)
│   ├── sections.js     # Contenu des sections
│   └── charts.js       # Graphiques
├── .env.example        # Exemple de configuration
└── index.html          # Page principale
```

## Services

### AuthService
Gère l'authentification et les sessions utilisateurs.

**Méthodes :**
- `verifySchool(email)` - Vérifie si une école existe
- `createSchool(schoolData)` - Crée un compte école
- `login(schoolId, role, email, password)` - Connecte un utilisateur
- `logout()` - Déconnecte l'utilisateur
- `createUser(userData)` - Crée un compte utilisateur
- `isAuthenticated()` - Vérifie si l'utilisateur est connecté
- `getCurrentUser()` - Récupère l'utilisateur actuel

### SchoolService
Gère les opérations CRUD sur les écoles.

**Méthodes :**
- `getAllSchools()` - Récupère toutes les écoles
- `getSchoolById(schoolId)` - Récupère une école par ID
- `getSchoolByEmail(email)` - Récupère une école par email
- `createSchool(schoolData)` - Crée une nouvelle école
- `updateSchool(schoolId, schoolData)` - Met à jour une école
- `deleteSchool(schoolId)` - Supprime une école
- `getSchoolStats(schoolId)` - Récupère les statistiques d'une école

### UserService
Gère les opérations CRUD sur les utilisateurs.

**Méthodes :**
- `getAllUsers(schoolId)` - Récupère tous les utilisateurs
- `getUsersByRole(schoolId, role)` - Récupère les utilisateurs par rôle
- `getUserById(userId)` - Récupère un utilisateur par ID
- `getUserByEmail(email)` - Récupère un utilisateur par email
- `createUser(userData)` - Crée un nouvel utilisateur
- `updateUser(userId, userData)` - Met à jour un utilisateur
- `deleteUser(userId)` - Supprime un utilisateur
- `getStudents(schoolId)` - Récupère les élèves
- `getTeachers(schoolId)` - Récupère les professeurs
- `getParents(schoolId)` - Récupère les parents

## Configuration

### Variables d'environnement

Copiez `.env.example` en `.env` et configurez les variables :

```env
# Configuration de l'API
API_BASE_URL=https://api.edusmart.com
API_VERSION=v1

# Configuration de l'authentification
AUTH_TOKEN_EXPIRY=3600
AUTH_REFRESH_TOKEN_EXPIRY=86400

# Configuration de la base de données
DATABASE_URL=
DATABASE_TYPE=postgresql

# Configuration de l'environnement
NODE_ENV=development
DEBUG=true

# Configuration des services
USE_MOCK_DATA=true
```

## Migration vers une vraie base de données

### Étape 1 : Créer les implémentations API

Dans le dossier `js/api/`, créez les fichiers suivants :

- `ApiAuthService.js` - Implémentation utilisant l'API REST
- `ApiSchoolService.js` - Implémentation utilisant l'API REST
- `ApiUserService.js` - Implémentation utilisant l'API REST

### Étape 2 : Implémenter les méthodes

Chaque service API doit implémenter toutes les méthodes de l'interface correspondante en utilisant `fetch()` ou une librairie HTTP comme Axios.

**Exemple :**

```javascript
import AuthService from '../services/AuthService.js';

class ApiAuthService extends AuthService {
  async verifySchool(email) {
    const response = await fetch(`${API_BASE_URL}/schools/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return response.json();
  }

  // ... autres méthodes
}

export default new ApiAuthService();
```

### Étape 3 : Choisir l'implémentation

Dans `app.js`, modifiez l'import des services :

```javascript
// Pour le développement (mock)
const authService = window.MockAuthService || mockAuthService;

// Pour la production (API)
const authService = window.ApiAuthService || apiAuthService;
```

Ou utilisez une variable d'environnement :

```javascript
const useMockData = process.env.USE_MOCK_DATA === 'true';
const authService = useMockData ? mockAuthService : apiAuthService;
```

## Avantages de cette architecture

1. **Séparation des responsabilités** : Chaque service a une responsabilité claire
2. **Testabilité** : Facile de tester avec des implémentations mockées
3. **Flexibilité** : Facile de changer d'implémentation (mock → API)
4. **Maintenabilité** : Code organisé et modulaire
5. **Scalabilité** : Prêt pour l'intégration avec une vraie base de données

## Développement local

Pour le développement local, les services mockés sont utilisés par défaut. Les données sont stockées en mémoire dans les fichiers `Mock*Service.js`.

Pour tester avec l'API :
1. Configurez `.env` avec `USE_MOCK_DATA=false`
2. Implémentez les services API dans `js/api/`
3. Modifiez les imports dans `app.js`
