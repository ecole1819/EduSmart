// ============================================================
//  EduSmart - Service de gestion des utilisateurs (Interface)
// ============================================================

/**
 * Interface pour le service de gestion des utilisateurs
 * Ce service gère les opérations CRUD sur les utilisateurs
 */
class UserService {
  /**
   * Récupère tous les utilisateurs d'une école
   * @param {string} schoolId - ID de l'école
   * @returns {Promise<Array>} - Liste des utilisateurs
   */
  async getAllUsers(schoolId) {
    throw new Error('Method not implemented');
  }

  /**
   * Récupère les utilisateurs par rôle
   * @param {string} schoolId - ID de l'école
   * @param {string} role - Rôle des utilisateurs
   * @returns {Promise<Array>} - Liste des utilisateurs
   */
  async getUsersByRole(schoolId, role) {
    throw new Error('Method not implemented');
  }

  /**
   * Récupère un utilisateur par son ID
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<Object|null>} - Utilisateur ou null
   */
  async getUserById(userId) {
    throw new Error('Method not implemented');
  }

  /**
   * Récupère un utilisateur par son email
   * @param {string} email - Email de l'utilisateur
   * @returns {Promise<Object|null>} - Utilisateur ou null
   */
  async getUserByEmail(email) {
    throw new Error('Method not implemented');
  }

  /**
   * Crée un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} - Utilisateur créé
   */
  async createUser(userData) {
    throw new Error('Method not implemented');
  }

  /**
   * Met à jour un utilisateur
   * @param {string} userId - ID de l'utilisateur
   * @param {Object} userData - Nouvelles données
   * @returns {Promise<Object>} - Utilisateur mis à jour
   */
  async updateUser(userId, userData) {
    throw new Error('Method not implemented');
  }

  /**
   * Supprime un utilisateur
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<boolean>} - True si supprimé
   */
  async deleteUser(userId) {
    throw new Error('Method not implemented');
  }

  /**
   * Récupère les élèves d'une école
   * @param {string} schoolId - ID de l'école
   * @returns {Promise<Array>} - Liste des élèves
   */
  async getStudents(schoolId) {
    throw new Error('Method not implemented');
  }

  /**
   * Récupère les professeurs d'une école
   * @param {string} schoolId - ID de l'école
   * @returns {Promise<Array>} - Liste des professeurs
   */
  async getTeachers(schoolId) {
    throw new Error('Method not implemented');
  }

  /**
   * Récupère les parents d'une école
   * @param {string} schoolId - ID de l'école
   * @returns {Promise<Array>} - Liste des parents
   */
  async getParents(schoolId) {
    throw new Error('Method not implemented');
  }
}

export default UserService;
