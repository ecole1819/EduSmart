// ============================================================
//  EduSmart - Service de gestion des écoles (Implémentation Mock)
// ============================================================

import SchoolService from './SchoolService.js';

/**
 * Implémentation mockée du service de gestion des écoles
 * Utilise des données en mémoire pour le développement
 */
class MockSchoolService extends SchoolService {
  constructor() {
    super();
    this.schools = [
      { id: "s1", email: "lycee@edusmart.sn", name: "Lycée International EduSmart", city: "Dakar", year: "2025-2026" },
      { id: "s2", email: "college@edusmart.sn", name: "Collège Saint-Exupéry", city: "Dakar", year: "2025-2026" },
      { id: "s3", email: "primaire@edusmart.sn", name: "École Primaire Lumière", city: "Dakar", year: "2025-2026" }
    ];

    this.schoolStats = {
      s1: { students: 847, teachers: 64, classes: 28, staff: 18 },
      s2: { students: 520, teachers: 42, classes: 18, staff: 12 },
      s3: { students: 320, teachers: 28, classes: 12, staff: 8 }
    };
  }

  async getAllSchools() {
    console.log('MockSchoolService: getAllSchools');
    return this.schools;
  }

  async getSchoolById(schoolId) {
    console.log('MockSchoolService: getSchoolById', schoolId);
    return this.schools.find(s => s.id === schoolId) || null;
  }

  async getSchoolByEmail(email) {
    console.log('MockSchoolService: getSchoolByEmail', email);
    return this.schools.find(s => s.email === email) || null;
  }

  async createSchool(schoolData) {
    console.log('MockSchoolService: createSchool', schoolData);
    const newSchool = {
      id: `s${this.schools.length + 1}`,
      email: schoolData.email,
      name: schoolData.name || schoolData.email.split('@')[0],
      city: schoolData.city || "Dakar",
      year: "2025-2026"
    };
    this.schools.push(newSchool);
    this.schoolStats[newSchool.id] = { students: 0, teachers: 0, classes: 0, staff: 0 };
    return newSchool;
  }

  async updateSchool(schoolId, schoolData) {
    console.log('MockSchoolService: updateSchool', schoolId, schoolData);
    const index = this.schools.findIndex(s => s.id === schoolId);
    if (index !== -1) {
      this.schools[index] = { ...this.schools[index], ...schoolData };
      return this.schools[index];
    }
    throw new Error('School not found');
  }

  async deleteSchool(schoolId) {
    console.log('MockSchoolService: deleteSchool', schoolId);
    const index = this.schools.findIndex(s => s.id === schoolId);
    if (index !== -1) {
      this.schools.splice(index, 1);
      delete this.schoolStats[schoolId];
      return true;
    }
    return false;
  }

  async getSchoolStats(schoolId) {
    console.log('MockSchoolService: getSchoolStats', schoolId);
    return this.schoolStats[schoolId] || { students: 0, teachers: 0, classes: 0, staff: 0 };
  }
}

export default new MockSchoolService();
