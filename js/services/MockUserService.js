// ============================================================
//  EduSmart - Service de gestion des utilisateurs (Implémentation Mock)
// ============================================================

import UserService from './UserService.js';

/**
 * Implémentation mockée du service de gestion des utilisateurs
 * Utilise des données en mémoire pour le développement
 */
class MockUserService extends UserService {
  constructor() {
    super();
    this.users = {
      admin: { name: "Cheikh Ndiaye", role: "Directeur", avatar: "C", menu: "admin" },
      surveillant: { name: "M. Ibrahima Fall", role: "Surveillant", avatar: "I", menu: "admin" },
      teacher: { name: "Mme Aminata Sall", role: "Professeure de Maths", avatar: "A", menu: "teacher" },
      student: { name: "Aminata Faye", role: "Élève", avatar: "A", menu: "parent", childId: "e1" },
      parent: { name: "M. Babacar Faye", role: "Parent d'élève", avatar: "B", menu: "parent", childId: "e1" }
    };

    this.students = [
      { id:"e1", name:"Aminata Faye", class:"3ème A", dob:"2011-04-15", avg:14.8, abs:2, gender:"F", photo:"A", parent:"M. Babacar Faye" },
      { id:"e2", name:"Ousmane Sall", class:"3ème A", dob:"2011-07-22", avg:11.2, abs:5, gender:"M", photo:"O", parent:"Mme Fatou Sall" },
      { id:"e3", name:"Mariam Diallo", class:"2nde B", dob:"2010-02-10", avg:16.5, abs:0, gender:"F", photo:"M", parent:"M. Moussa Diallo" },
      { id:"e4", name:"Ibrahim Ba", class:"1ère C", dob:"2009-11-03", avg:9.4, abs:8, gender:"M", photo:"I", parent:"M. Modou Ba" },
      { id:"e5", name:"Fatoumata Ndiaye", class:"Terminale D", dob:"2008-06-18", avg:17.2, abs:1, gender:"F", photo:"F", parent:"Mme Awa Ndiaye" },
      { id:"e6", name:"Mamadou Camara", class:"3ème A", dob:"2011-09-05", avg:13.0, abs:3, gender:"M", photo:"M", parent:"M. Idrissa Camara" },
      { id:"e7", name:"Khadija Fall", class:"2nde B", dob:"2010-05-27", avg:15.6, abs:1, gender:"F", photo:"K", parent:"M. Abdou Fall" },
      { id:"e8", name:"Aliou Sall", class:"1ère C", dob:"2009-01-14", avg:12.3, abs:4, gender:"M", photo:"A", parent:"M. Ibrahima Sall" }
    ];

    this.teachers = [
      { id:"p1", name:"Mme Aminata Sall", subject:"Mathématiques", classes:["3ème A","2nde B"], hours:18, status:"active", email:"a.sall@edusmart.sn", phone:"77 123 45 67" },
      { id:"p2", name:"M. Cheikh Tine", subject:"Physique-Chimie", classes:["1ère C","Terminale D"], hours:20, status:"active", email:"c.tine@edusmart.sn", phone:"77 234 56 78" },
      { id:"p3", name:"Mme Fatou Ndiaye", subject:"Français", classes:["3ème A","3ème B"], hours:16, status:"active", email:"f.ndiaye@edusmart.sn", phone:"77 345 67 89" },
      { id:"p4", name:"M. Moussa Ly", subject:"Histoire-Géo", classes:["2nde B","1ère C"], hours:18, status:"leave", email:"m.ly@edusmart.sn", phone:"77 456 78 90" },
      { id:"p5", name:"Mme Aïssa Bâ", subject:"Anglais", classes:["Terminale D","3ème A"], hours:20, status:"active", email:"a.ba@edusmart.sn", phone:"77 567 89 01" },
      { id:"p6", name:"M. Omar Traoré", subject:"SVT", classes:["2nde B","Terminale D"], hours:18, status:"active", email:"o.traore@edusmart.sn", phone:"77 678 90 12" }
    ];
  }

  async getAllUsers(schoolId) {
    console.log('MockUserService: getAllUsers', schoolId);
    return Object.values(this.users);
  }

  async getUsersByRole(schoolId, role) {
    console.log('MockUserService: getUsersByRole', schoolId, role);
    const user = this.users[role];
    return user ? [user] : [];
  }

  async getUserById(userId) {
    console.log('MockUserService: getUserById', userId);
    return this.students.find(s => s.id === userId) || 
           this.teachers.find(t => t.id === userId) || 
           null;
  }

  async getUserByEmail(email) {
    console.log('MockUserService: getUserByEmail', email);
    return this.teachers.find(t => t.email === email) || null;
  }

  async createUser(userData) {
    console.log('MockUserService: createUser', userData);
    const newUser = {
      name: userData.name,
      role: userData.role,
      avatar: userData.name.charAt(0).toUpperCase(),
      menu: this.getMenuForRole(userData.role)
    };
    this.users[userData.role] = newUser;
    return newUser;
  }

  async updateUser(userId, userData) {
    console.log('MockUserService: updateUser', userId, userData);
    const studentIndex = this.students.findIndex(s => s.id === userId);
    if (studentIndex !== -1) {
      this.students[studentIndex] = { ...this.students[studentIndex], ...userData };
      return this.students[studentIndex];
    }
    const teacherIndex = this.teachers.findIndex(t => t.id === userId);
    if (teacherIndex !== -1) {
      this.teachers[teacherIndex] = { ...this.teachers[teacherIndex], ...userData };
      return this.teachers[teacherIndex];
    }
    throw new Error('User not found');
  }

  async deleteUser(userId) {
    console.log('MockUserService: deleteUser', userId);
    const studentIndex = this.students.findIndex(s => s.id === userId);
    if (studentIndex !== -1) {
      this.students.splice(studentIndex, 1);
      return true;
    }
    const teacherIndex = this.teachers.findIndex(t => t.id === userId);
    if (teacherIndex !== -1) {
      this.teachers.splice(teacherIndex, 1);
      return true;
    }
    return false;
  }

  async getStudents(schoolId) {
    console.log('MockUserService: getStudents', schoolId);
    return this.students;
  }

  async getTeachers(schoolId) {
    console.log('MockUserService: getTeachers', schoolId);
    return this.teachers;
  }

  async getParents(schoolId) {
    console.log('MockUserService: getParents', schoolId);
    const parents = this.students.map(s => ({
      id: s.parent,
      name: s.parent,
      children: [s.name]
    }));
    return parents;
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

export default new MockUserService();
