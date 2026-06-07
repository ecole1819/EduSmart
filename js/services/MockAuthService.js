// ============================================================
//  EduSmart - Service d'authentification (Implémentation Mock)
// ============================================================

import AuthService from './AuthService.js';

/**
 * Implémentation mockée du service d'authentification
 * Utilise des données en mémoire pour le développement
 */
class MockAuthService extends AuthService {
  constructor() {
    super();
    this.currentUser = null;
    this.currentSchool = null;
    
    // Données mockées
    this.schools = [
      { id: "s1", email: "lycee@edusmart.sn", name: "Lycée International EduSmart", city: "Dakar", year: "2025-2026" },
      { id: "s2", email: "college@edusmart.sn", name: "Collège Saint-Exupéry", city: "Dakar", year: "2025-2026" },
      { id: "s3", email: "primaire@edusmart.sn", name: "École Primaire Lumière", city: "Dakar", year: "2025-2026" }
    ];

    this.users = {
      admin: { name: "Cheikh Ndiaye", role: "Directeur", avatar: "C", menu: "admin" },
      surveillant: { name: "M. Ibrahima Fall", role: "Surveillant", avatar: "I", menu: "admin" },
      teacher: { name: "Mme Aminata Sall", role: "Professeure de Maths", avatar: "A", menu: "teacher" },
      student: { name: "Aminata Faye", role: "Élève", avatar: "A", menu: "parent", childId: "e1" },
      parent: { name: "M. Babacar Faye", role: "Parent d'élève", avatar: "B", menu: "parent", childId: "e1" }
    };
  }

  async verifySchool(email) {
    console.log('MockAuthService: verifySchool', email);
    const school = this.schools.find(s => s.email === email);
    return school || null;
  }

  async createSchool(schoolData) {
    console.log('MockAuthService: createSchool', schoolData);
    const newSchool = {
      id: `s${this.schools.length + 1}`,
      email: schoolData.email,
      name: schoolData.name || schoolData.email.split('@')[0],
      city: schoolData.city || "Dakar",
      year: "2025-2026"
    };
    this.schools.push(newSchool);
    return newSchool;
  }

  async login(schoolId, role, email, password) {
    console.log('MockAuthService: login', { schoolId, role, email });
    const user = this.users[role];
    if (user) {
      this.currentUser = { ...user, role_key: role, school: this.currentSchool };
      return this.currentUser;
    }
    throw new Error('User not found');
  }

  async logout() {
    console.log('MockAuthService: logout');
    this.currentUser = null;
    this.currentSchool = null;
  }

  async createUser(userData) {
    console.log('MockAuthService: createUser', userData);
    const newUser = {
      name: userData.name,
      role: userData.role,
      avatar: userData.name.charAt(0).toUpperCase(),
      menu: this.getMenuForRole(userData.role)
    };
    this.users[userData.role] = newUser;
    return newUser;
  }

  async isAuthenticated() {
    return this.currentUser !== null;
  }

  async getCurrentUser() {
    return this.currentUser;
  }

  setCurrentSchool(school) {
    this.currentSchool = school;
  }

  getMenuForRole(role) {
    const menus = {
      admin: "admin",
      surveillant: "admin",
      teacher: "teacher",
      student: "parent",
      parent: "parent"
    };
    return menus[role] || "admin";
  }
}

export default new MockAuthService();
