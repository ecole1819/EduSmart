// ============================================================
//  EduSmart - Service d'authentification (Interface)
// ============================================================

/**
 * Interface pour le service d'authentification
 * Ce service gère la connexion, déconnexion et gestion des sessions
 */
class AuthService {
  /**
   * Vérifie si une école existe avec l'email donné
   * @param {string} email - Email de l'école
   * @returns {Promise<Object|null>} - Informations de l'école ou null
   */
  async verifySchool(email) {
    throw new Error('Method not implemented');
  }

  /**
   * Crée un nouveau compte pour une école
   * @param {Object} schoolData - Données de l'école
   * @returns {Promise<Object>} - École créée
   */
  async createSchool(schoolData) {
    throw new Error('Method not implemented');
  }

  /**
   * Connecte un utilisateur
   * @param {string} schoolId - ID de l'école
   * @param {string} role - Rôle de l'utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise<Object>} - Utilisateur connecté
   */
  async login(schoolId, role, email, password) {
    throw new Error('Method not implemented');
  }

  /**
   * Déconnecte l'utilisateur actuel
   * @returns {Promise<void>}
   */
  async logout() {
    throw new Error('Method not implemented');
  }

  /**
   * Crée un compte utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} - Utilisateur créé
   */
  async createUser(userData) {
    throw new Error('Method not implemented');
  }

  /**
   * Vérifie si l'utilisateur est connecté
   * @returns {Promise<boolean>}
   */
  async isAuthenticated() {
    throw new Error('Method not implemented');
  }

  /**
   * Récupère l'utilisateur actuel
   * @returns {Promise<Object|null>}
   */
  async getCurrentUser() {
    throw new Error('Method not implemented');
  }
}

export default AuthService;
