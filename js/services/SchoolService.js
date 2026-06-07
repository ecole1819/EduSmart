// ============================================================
//  EduSmart - Service de gestion des écoles (Interface)
// ============================================================

/**
 * Interface pour le service de gestion des écoles
 * Ce service gère les opérations CRUD sur les écoles
 */
class SchoolService {
  /**
   * Récupère toutes les écoles
   * @returns {Promise<Array>} - Liste des écoles
   */
  async getAllSchools() {
    throw new Error('Method not implemented');
  }

  /**
   * Récupère une école par son ID
   * @param {string} schoolId - ID de l'école
   * @returns {Promise<Object|null>} - École ou null
   */
  async getSchoolById(schoolId) {
    throw new Error('Method not implemented');
  }

  /**
   * Récupère une école par son email
   * @param {string} email - Email de l'école
   * @returns {Promise<Object|null>} - École ou null
   */
  async getSchoolByEmail(email) {
    throw new Error('Method not implemented');
  }

  /**
   * Crée une nouvelle école
   * @param {Object} schoolData - Données de l'école
   * @returns {Promise<Object>} - École créée
   */
  async createSchool(schoolData) {
    throw new Error('Method not implemented');
  }

  /**
   * Met à jour une école
   * @param {string} schoolId - ID de l'école
   * @param {Object} schoolData - Nouvelles données
   * @returns {Promise<Object>} - École mise à jour
   */
  async updateSchool(schoolId, schoolData) {
    throw new Error('Method not implemented');
  }

  /**
   * Supprime une école
   * @param {string} schoolId - ID de l'école
   * @returns {Promise<boolean>} - True si supprimé
   */
  async deleteSchool(schoolId) {
    throw new Error('Method not implemented');
  }

  /**
   * Récupère les statistiques d'une école
   * @param {string} schoolId - ID de l'école
   * @returns {Promise<Object>} - Statistiques
   */
  async getSchoolStats(schoolId) {
    throw new Error('Method not implemented');
  }
}

export default SchoolService;
