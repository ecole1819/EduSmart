# 🎓 EduSmart – Gestion Scolaire Intelligente

## Description
Maquette HTML cliquable et interactive d'un logiciel complet de gestion scolaire, adaptée pour une présentation professionnelle. Responsive (ordinateur, tablette, mobile).

## ✅ Fonctionnalités implémentées

### 🔐 Authentification & Rôles
- Écran de connexion avec 3 rôles : **Administrateur**, **Professeur**, **Parent**
- Navigation dynamique selon le rôle connecté
- Déconnexion / reconnexion

### 📊 Tableau de bord
- Statistiques en temps réel (élèves, professeurs, classes, présences)
- Graphiques Chart.js (présences, répartition des notes)
- Liste des élèves récents et des professeurs
- Alertes et actions requises
- Agenda scolaire

### 👨‍🎓 Gestion des Élèves
- Liste complète avec filtres et recherche
- Fiche détaillée par élève
- Ajout, modification, suppression
- Indicateurs de performance visuelle

### 👩‍🏫 Gestion des Professeurs
- Cartes de profil avec statuts (actif / congé)
- Matières, classes, heures
- Modification et suppression

### 🏫 Gestion des Classes
- Vue en grille par classe
- Infos : élèves, salle, professeur principal
- Accès rapide aux présences, notes, emploi du temps

### 🗓️ Emploi du temps
- Grille hebdomadaire interactive (Lun–Ven)
- Code couleur par matière
- Clic pour détail du cours

### ✅ Présences
- Appel interactif par classe
- Changement de statut (présent / absent / retard)
- Notification aux parents
- Statistiques mensuelles

### ⭐ Notes & Évaluations
- Vue d'ensemble avec classement et mentions
- Notes par élève (3 contrôles par matière)
- Analyse par classe
- Graphiques : évolution, distribution des mentions

### 📄 Bulletins Scolaires
- Génération et aperçu des bulletins
- Impression et téléchargement PDF (simulé)
- Envoi aux parents
- Appréciation du conseil de classe

### 💬 Messagerie
- Boîte de réception avec messages non lus
- Chat en temps réel (simulation)
- Réponse directe aux messages

### 📢 Annonces
- Publication d'annonces (urgent / info)
- Ciblage par audience (tous, parents, profs, élèves)

### 🛡️ Administration
- Informations établissement modifiables
- Calendrier scolaire
- Personnel administratif (CRUD)
- Finances avec graphique de répartition
- Gestion documentaire

### 📈 Rapports & Statistiques
- Graphiques Chart.js : inscriptions, présences, répartition niveaux, performances

### 📅 Agenda
- Calendrier mensuel interactif
- Liste des événements avec types colorés

### ⚙️ Paramètres
- Thème clair/sombre
- Palette de couleurs
- Langue et notifications

### 👨‍👩‍👧 Espace Parent (dédié)
- **Dashboard parent** : résumé complet de l'enfant
- **Présences** : calendrier mensuel coloré (présent/absent/retard), détail et justification
- **Notes** : détail par matière, comparaison classe, mention, appréciation
- **Bulletin officiel** : mise en page professionnelle, téléchargement/impression
- **Emploi du temps** de l'enfant

## 🌐 Entrées (pages)
| URL / Section | Description |
|---|---|
| `index.html` | Page principale (login → app) |
| Section `dashboard` | Tableau de bord admin |
| Section `students` | Gestion élèves |
| Section `teachers` | Gestion professeurs |
| Section `classes` | Gestion classes |
| Section `schedule` | Emploi du temps |
| Section `attendance` | Présences |
| Section `grades` | Notes |
| Section `bulletins` | Bulletins |
| Section `messaging` | Messagerie |
| Section `announcements` | Annonces |
| Section `admin` | Administration |
| Section `reports` | Rapports |
| Section `agenda` | Agenda |
| Section `settings` | Paramètres |
| Section `parent_dashboard` | Espace parent – accueil |
| Section `parent_attendance` | Espace parent – présences |
| Section `parent_grades` | Espace parent – notes |
| Section `parent_bulletin` | Espace parent – bulletin |
| Section `parent_schedule` | Espace parent – emploi du temps |

## 🛠️ Technologies utilisées
- HTML5 / CSS3 (variables, grid, flexbox, animations)
- JavaScript ES6 (modules, classes, fetch-like)
- Chart.js 4.4 (graphiques)
- Font Awesome 6.4 (icônes)
- Google Fonts – Inter

## 📁 Structure
```
index.html
css/
  style.css
js/
  data.js      ← données de démo
  app.js       ← logique principale
  sections.js  ← contenu de chaque page
  charts.js    ← graphiques Chart.js
README.md
```

## 🚀 Prochaines étapes recommandées
- [ ] Connexion à une API REST réelle
- [ ] Authentification JWT
- [ ] Export PDF des bulletins
- [ ] Notifications push
- [ ] Module de saisie de notes en masse
- [ ] Gestion des emplois du temps par glisser-déposer
