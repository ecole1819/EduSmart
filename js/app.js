// ============================================================
//  EduSmart — Logique principale de l'application
// ============================================================

let currentRole = 'admin';
let currentSection = 'dashboard';
let darkMode = false;
let sidebarCollapsed = false;

const NAV_MENUS = {
  admin: [
    { section: "PRINCIPAL" },
    { id:"dashboard", label:"Tableau de bord", icon:"fa-th-large" },
    { id:"agenda", label:"Agenda", icon:"fa-calendar-alt" },
    { section: "GESTION" },
    { id:"students", label:"Élèves", icon:"fa-user-graduate", badge: DATA.students.length },
    { id:"teachers", label:"Professeurs", icon:"fa-chalkboard-teacher" },
    { id:"classes", label:"Classes", icon:"fa-door-open" },
    { id:"schedule", label:"Emploi du temps", icon:"fa-clock" },
    { section: "PÉDAGOGIE" },
    { id:"attendance", label:"Présence", icon:"fa-check-circle" },
    { id:"grades", label:"Notes & Évaluations", icon:"fa-star" },
    { id:"bulletins", label:"Bulletins", icon:"fa-file-alt" },
    { section: "COMMUNICATION" },
    { id:"messaging", label:"Messagerie", icon:"fa-envelope", badge:"3" },
    { id:"announcements", label:"Annonces", icon:"fa-bullhorn" },
    { section: "ADMINISTRATION" },
    { id:"admin", label:"Administration", icon:"fa-shield-alt" },
    { id:"reports", label:"Rapports & Stats", icon:"fa-chart-bar" },
    { id:"settings", label:"Paramètres", icon:"fa-cog" }
  ],
  teacher: [
    { section: "PRINCIPAL" },
    { id:"dashboard", label:"Mon tableau de bord", icon:"fa-th-large" },
    { id:"agenda", label:"Agenda", icon:"fa-calendar-alt" },
    { section: "MES CLASSES" },
    { id:"classes", label:"Mes classes", icon:"fa-door-open" },
    { id:"schedule", label:"Mon emploi du temps", icon:"fa-clock" },
    { section: "PÉDAGOGIE" },
    { id:"attendance", label:"Présence", icon:"fa-check-circle" },
    { id:"grades", label:"Notes & Évaluations", icon:"fa-star" },
    { id:"bulletins", label:"Bulletins", icon:"fa-file-alt" },
    { section: "COMMUNICATION" },
    { id:"messaging", label:"Messagerie", icon:"fa-envelope", badge:"2" },
    { id:"announcements", label:"Annonces", icon:"fa-bullhorn" }
  ],
  parent: [
    { section: "MON ESPACE" },
    { id:"parent_dashboard", label:"Suivi de Yasmine", icon:"fa-home" },
    { id:"parent_attendance", label:"Présences", icon:"fa-check-circle" },
    { id:"parent_grades", label:"Notes", icon:"fa-star" },
    { id:"parent_bulletin", label:"Bulletins", icon:"fa-file-alt" },
    { id:"parent_schedule", label:"Emploi du temps", icon:"fa-clock" },
    { section: "COMMUNICATION" },
    { id:"messaging", label:"Messagerie", icon:"fa-envelope", badge:"2" },
    { id:"announcements", label:"Annonces scolaires", icon:"fa-bullhorn" }
  ]
};

// ============ LOGIN ============
function verifySchool() {
  const email = document.getElementById('schoolEmail').value;
  const school = DATA.schools.find(s => s.email === email);

  if (school) {
    DATA.currentSchool = school;
    document.getElementById('schoolNameDisplay').textContent = school.name;
    document.getElementById('schoolLoginBox').classList.add('hidden');
    document.getElementById('userLoginBox').classList.remove('hidden');
    showToast('success', `École trouvée : ${school.name}`);
  } else {
    showToast('error', 'École non trouvée. Vérifiez l\'email ou créez un compte.');
  }
}

function backToSchoolLogin() {
  document.getElementById('userLoginBox').classList.add('hidden');
  document.getElementById('schoolLoginBox').classList.remove('hidden');
  DATA.currentSchool = null;
}

function selectRole(role) {
  currentRole = role;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-role="${role}"]`).classList.add('active');
  const hints = {
    admin: "admin@edusmart.sn",
    surveillant: "surveillant@edusmart.sn",
    teacher: "a.sall@edusmart.sn",
    student: "aminata.faye@edusmart.sn",
    parent: "b.faye@edusmart.sn"
  };
  document.getElementById('loginUser').value = hints[role] || "";
}

async function doLogin() {
  const email = document.getElementById('loginUser').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showToast('error', 'Veuillez remplir tous les champs');
    return;
  }

  try {
    // Try Supabase authentication
    const session = await signIn(email, password);
    if (session) {
      saveSession(session);
      showToast('success', 'Connexion réussie avec Supabase');
      
      // Get user data from session
      const user = session.user;
      DATA.currentUser = {
        name: user.email.split('@')[0],
        email: user.email,
        role: currentRole,
        avatar: user.email[0].toUpperCase(),
        menu: currentRole === 'admin' ? 'admin' : currentRole
      };

      // Update UI
      document.getElementById('sidebarAvatar').textContent = DATA.currentUser.avatar;
      document.getElementById('topAvatar').textContent = DATA.currentUser.avatar;
      document.getElementById('sidebarName').textContent = DATA.currentUser.name;
      document.getElementById('sidebarRole').textContent = DATA.currentUser.role;
      document.getElementById('topName').textContent = DATA.currentUser.name;

      // Build nav
      buildNav(NAV_MENUS[DATA.currentUser.menu]);

      // Show app
      document.getElementById('loginScreen').classList.add('hidden');
      document.getElementById('app').classList.remove('hidden');

      // Load initial section
      const firstSection = currentRole === 'parent' || currentRole === 'student' ? 'parent_dashboard' : 'dashboard';
      showSection(firstSection);

      // Load notifications
      renderNotifications();
      showToast('success', `Bienvenue, ${DATA.currentUser.name} ! 👋`);
    }
  } catch (error) {
    // Fallback to local data if Supabase fails
    console.log('Supabase auth failed, using local data:', error);
    const user = DATA.users[currentRole];
    if (!user) {
      showToast('error', 'Rôle non reconnu');
      return;
    }

    DATA.currentUser = { ...user, role_key: currentRole, school: DATA.currentSchool };

    // Update UI
    document.getElementById('sidebarAvatar').textContent = user.avatar;
    document.getElementById('topAvatar').textContent = user.avatar;
    document.getElementById('sidebarName').textContent = user.name;
    document.getElementById('sidebarRole').textContent = user.role;
    document.getElementById('topName').textContent = user.name.split(' ')[1] || user.name;

    // Build nav
    buildNav(NAV_MENUS[user.menu]);

    // Show app
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');

    // Load initial section
    const firstSection = currentRole === 'parent' || currentRole === 'student' ? 'parent_dashboard' : 'dashboard';
    showSection(firstSection);

    // Load notifications
    renderNotifications();
    showToast('success', `Bienvenue, ${user.name} ! 👋`);
  }
}

function doLogout() {
  signOut();
  document.getElementById('app').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('userLoginBox').classList.add('hidden');
  document.getElementById('schoolLoginBox').classList.remove('hidden');
  DATA.currentUser = null;
  DATA.currentSchool = null;
}

window.showCreateSchoolModal = function() {
  console.log('showCreateSchoolModal called');
  try {
    openModal(`
      <div class="modal-header">
        <h3><i class="fas fa-school"></i> Créer un compte pour votre école</h3>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <i class="fas fa-envelope"></i>
          <input type="email" id="newSchoolEmail" placeholder="Email de l'école" />
        </div>
        <div class="input-group">
          <i class="fas fa-lock"></i>
          <input type="password" id="newSchoolPassword" placeholder="Mot de passe" />
        </div>
        <div class="input-group">
          <i class="fas fa-lock"></i>
          <input type="password" id="newSchoolPasswordConfirm" placeholder="Confirmer le mot de passe" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
        <button class="btn btn-primary" onclick="createSchoolAccount()">
          <i class="fas fa-plus"></i> Créer le compte
        </button>
      </div>
    `);
  } catch (e) {
    console.error('Error in showCreateSchoolModal:', e);
  }
}

window.createSchoolAccount = function() {
  console.log('createSchoolAccount called');
  try {
    const email = document.getElementById('newSchoolEmail').value;
    const password = document.getElementById('newSchoolPassword').value;
    const passwordConfirm = document.getElementById('newSchoolPasswordConfirm').value;

    if (!email || !password || !passwordConfirm) {
      showToast('error', 'Veuillez remplir tous les champs');
      return;
    }

    if (password !== passwordConfirm) {
      showToast('error', 'Les mots de passe ne correspondent pas');
      return;
    }

    // Create school
    const newSchool = {
      id: `s${DATA.schools.length + 1}`,
      email: email,
      name: email.split('@')[0],
      city: "Dakar",
      year: "2025-2026"
    };
    DATA.schools.push(newSchool);

    closeModal();
    showToast('success', `École créée avec succès !`);
    document.getElementById('schoolEmail').value = email;
  } catch (e) {
    console.error('Error in createSchoolAccount:', e);
    showToast('error', 'Erreur lors de la création de l\'école');
  }
}

window.showCreateUserModal = function() {
  console.log('showCreateUserModal called');
  try {
    openModal(`
      <div class="modal-header">
        <h3><i class="fas fa-user-plus"></i> Créer un compte utilisateur</h3>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <i class="fas fa-user-tag"></i>
          <select id="newUserRole" class="form-select">
            <option value="teacher">Professeur</option>
            <option value="student">Élève</option>
            <option value="parent">Parent</option>
            <option value="surveillant">Surveillant</option>
          </select>
        </div>
        <div class="input-group">
          <i class="fas fa-user"></i>
          <input type="text" id="newUserName" placeholder="Nom complet" />
        </div>
        <div class="input-group">
          <i class="fas fa-envelope"></i>
          <input type="email" id="newUserEmail" placeholder="Email" />
        </div>
        <div class="input-group">
          <i class="fas fa-lock"></i>
          <input type="password" id="newUserPassword" placeholder="Mot de passe" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
        <button class="btn btn-primary" onclick="createUserAccount()">
          <i class="fas fa-plus"></i> Créer le compte
        </button>
      </div>
    `);
  } catch (e) {
    console.error('Error in showCreateUserModal:', e);
  }
}

window.createUserAccount = function() {
  console.log('createUserAccount called');
  try {
    const role = document.getElementById('newUserRole').value;
    const name = document.getElementById('newUserName').value;
    const email = document.getElementById('newUserEmail').value;
    const password = document.getElementById('newUserPassword').value;

    if (!name || !email || !password) {
      showToast('error', 'Veuillez remplir tous les champs');
      return;
    }

    // Create user
    const newUser = {
      name: name,
      role: role,
      avatar: name.charAt(0).toUpperCase(),
      menu: role === 'teacher' ? 'teacher' : (role === 'student' || role === 'parent' ? 'parent' : 'admin')
    };
    DATA.users[role] = newUser;

    closeModal();
    showToast('success', `Compte ${role} créé avec succès !`);
  } catch (e) {
    console.error('Error in createUserAccount:', e);
    showToast('error', 'Erreur lors de la création du compte');
  }
}

// ============ NAV ============
function buildNav(menu) {
  const nav = document.getElementById('sidebarNav');
  nav.innerHTML = '';
  menu.forEach(item => {
    if (item.section) {
      nav.innerHTML += `<div class="nav-section-label">${item.section}</div>`;
    } else {
      nav.innerHTML += `
        <div class="nav-item" id="nav_${item.id}" onclick="showSection('${item.id}')">
          <i class="fas ${item.icon}"></i>
          <span class="nav-label">${item.label}</span>
          ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
        </div>`;
    }
  });
}

function setActiveNav(id) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById(`nav_${id}`);
  if (el) el.classList.add('active');
}

// ============ SECTIONS ============
function showSection(id) {
  currentSection = id;
  setActiveNav(id);
  const breadcrumbs = {
    dashboard: "Tableau de bord",
    agenda: "Agenda",
    students: "Gestion des Élèves",
    teachers: "Gestion des Professeurs",
    classes: "Gestion des Classes",
    schedule: "Emploi du temps",
    attendance: "Gestion des Présences",
    grades: "Notes & Évaluations",
    bulletins: "Bulletins Scolaires",
    messaging: "Messagerie",
    announcements: "Annonces",
    admin: "Administration",
    reports: "Rapports & Statistiques",
    settings: "Paramètres",
    parent_dashboard: "Espace Parent – Suivi",
    parent_attendance: "Espace Parent – Présences",
    parent_grades: "Espace Parent – Notes",
    parent_bulletin: "Espace Parent – Bulletins",
    parent_schedule: "Espace Parent – Emploi du temps",
    profil: "Mon Profil"
  };
  document.getElementById('breadcrumb').innerHTML = `<i class="fas fa-home"></i> &nbsp;${breadcrumbs[id] || id}`;

  const main = document.getElementById('mainContent');
  const renderer = SECTIONS[id];
  if (renderer) {
    main.innerHTML = renderer();
    if (typeof initCharts === 'function' && (id === 'dashboard' || id === 'reports')) {
      setTimeout(() => initCharts(id), 100);
    }
  } else {
    main.innerHTML = `<div class="empty-state"><i class="fas fa-tools"></i><p>Section en développement</p></div>`;
  }

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('mobile-open');
}

// ============ SIDEBAR ============
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainWrapper = document.querySelector('.main-wrapper');
  if (window.innerWidth <= 900) {
    sidebar.classList.toggle('mobile-open');
  } else {
    sidebarCollapsed = !sidebarCollapsed;
    sidebar.classList.toggle('collapsed', sidebarCollapsed);
    mainWrapper.classList.toggle('expanded', sidebarCollapsed);
  }
}

// ============ DARK MODE ============
function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode', darkMode);
  document.getElementById('darkIcon').className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// ============ NOTIFICATIONS ============
function renderNotifications() {
  const list = document.getElementById('notifList');
  list.innerHTML = DATA.notifications.map(n => `
    <div class="notif-item" onclick="closeNotifPanel()">
      <div class="notif-icon ${n.color}"><i class="fas ${n.icon}"></i></div>
      <div>
        <div class="notif-text">${n.text}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

function toggleNotifPanel() {
  document.getElementById('notifPanel').classList.toggle('hidden');
}
function closeNotifPanel() {
  document.getElementById('notifPanel').classList.add('hidden');
}
function clearNotifs() {
  document.getElementById('notifBadge').textContent = '0';
  document.getElementById('notifBadge').style.display = 'none';
  document.getElementById('notifList').innerHTML = '<div class="empty-state" style="padding:24px"><i class="fas fa-check-circle" style="color:var(--success)"></i><p>Tout est lu !</p></div>';
  showToast('success', 'Toutes les notifications ont été lues');
}

// ============ MODAL ============
window.openModal = function(html) {
  console.log('openModal called');
  try {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    console.log('modalOverlay:', modalOverlay);
    console.log('modalContent:', modalContent);
    if (modalOverlay && modalContent) {
      modalContent.innerHTML = html;
      modalOverlay.classList.remove('hidden');
      console.log('Modal should be visible now');
    } else {
      console.error('Modal elements not found');
    }
  } catch (e) {
    console.error('Error in openModal:', e);
  }
}
window.closeModal = function() {
  console.log('closeModal called');
  try {
    document.getElementById('modalOverlay').classList.add('hidden');
  } catch (e) {
    console.error('Error in closeModal:', e);
  }
}

// ============ TOAST ============
window.showToast = function(type, message, duration = 3500) {
  console.log('showToast called:', type, message);
  try {
    const icons = { success:'fa-check-circle', error:'fa-times-circle', info:'fa-info-circle', warning:'fa-exclamation-triangle' };
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.style.opacity = '0', duration - 400);
    setTimeout(() => toast.remove(), duration);
  } catch (e) {
    console.error('Error in showToast:', e);
  }
}

// ============ TABS ============
function switchTab(groupId, tabId) {
  document.querySelectorAll(`[data-group="${groupId}"].tab-btn`).forEach(b => b.classList.remove('active'));
  document.querySelectorAll(`[data-group="${groupId}"].tab-content`).forEach(c => c.classList.remove('active'));
  document.querySelector(`[data-group="${groupId}"][data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(`tab_${tabId}`).classList.add('active');
}

// ============ SEARCH ============
function globalSearch(query) {
  if (!query || query.length < 2) return;
  const results = DATA.students.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
  if (results.length) {
    showToast('info', `${results.length} élève(s) trouvé(s) pour "${query}"`);
  }
}

// ============ FORM ACTIONS ============
function saveForm(type) {
  const inputs = document.querySelectorAll('.modal-body input, .modal-body select');
  const data = {};
  inputs.forEach(input => {
    const label = input.previousElementSibling?.textContent || input.name;
    data[label] = input.value;
  });

  if (type === 'student') {
    const newStudent = {
      id: `e${DATA.students.length + 1}`,
      name: `${data['Prénom']} ${data['Nom']}`,
      class: data['Classe'],
      dob: data['Date de naissance'],
      avg: 0,
      abs: 0,
      gender: data['Genre'] === 'Féminin' ? 'F' : 'M',
      photo: data['Prénom']?.charAt(0) || 'X',
      parent: data['Nom du parent'] || 'Non renseigné'
    };
    DATA.students.push(newStudent);
    // Recalculer les stats après ajout
    if (typeof calculateStats === 'function') calculateStats();
  } else if (type === 'teacher') {
    const newTeacher = {
      id: `p${DATA.teachers.length + 1}`,
      name: `${data['Prénom']} ${data['Nom']}`,
      subject: data['Matière'],
      classes: [],
      hours: 0,
      status: 'active',
      email: data['Email'] || '',
      phone: data['Téléphone'] || ''
    };
    DATA.teachers.push(newTeacher);
  } else if (type === 'class') {
    const newClass = {
      id: `c${DATA.classes.length + 1}`,
      name: data['Nom de la classe'],
      level: data['Niveau'],
      teacher: data['Professeur principal'],
      room: data['Salle'] || '',
      students: 0
    };
    DATA.classes.push(newClass);
  }

  closeModal();
  const messages = {
    student: "Élève ajouté avec succès !",
    teacher: "Professeur enregistré !",
    class: "Classe créée !",
    grade: "Note enregistrée !",
    announcement: "Annonce publiée !"
  };
  showToast('success', messages[type] || "Enregistré avec succès !");
}

// ============ SETTINGS ============
function changeTheme(theme) {
  if (theme === 'dark' && !darkMode) {
    toggleDarkMode();
  } else if (theme === 'light' && darkMode) {
    toggleDarkMode();
  }
  localStorage.setItem('theme', theme);
  showToast('success', `Thème ${theme === 'dark' ? 'sombre' : 'clair'} appliqué`);
}

function changePrimaryColor(color) {
  document.documentElement.style.setProperty('--primary', color);
  localStorage.setItem('primaryColor', color);
  
  // Update color selection borders
  document.querySelectorAll('[onclick^="changePrimaryColor"]').forEach(el => {
    el.style.border = '2px solid transparent';
  });
  event.target.style.border = '2px solid white';
  
  showToast('success', 'Couleur principale changée');
}

function changeLanguage(lang) {
  localStorage.setItem('language', lang);
  const langNames = { fr: 'Français', en: 'English', ar: 'العربية' };
  showToast('success', `Langue changée en ${langNames[lang]}`);
}

function toggleNotification(id, checked) {
  const notifications = JSON.parse(localStorage.getItem('notifications') || '{}');
  notifications[id] = checked;
  localStorage.setItem('notifications', JSON.stringify(notifications));
  showToast('info', `Notification ${checked ? 'activée' : 'désactivée'}`);
}

// ============ FILE IMPORT ============
function handleGradeFileImport(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  
  reader.onload = function(e) {
    const content = e.target.result;
    const fileName = file.name.toLowerCase();
    
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      // Pour Excel, on simule l'extraction
      parseExcelFile(content);
    } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      // Pour Word, on simule l'extraction
      parseWordFile(content);
    } else if (fileName.endsWith('.pdf')) {
      // Pour PDF, on simule l'extraction
      parsePdfFile(content);
    } else {
      showToast('error', 'Format de fichier non supporté');
    }
  };
  
  reader.readAsArrayBuffer(file);
}

function parseExcelFile(content) {
  // Simulation de parsing Excel
  // Dans une vraie implémentation, utiliser une librairie comme SheetJS (xlsx)
  const simulatedData = [
    { name: 'Yasmine Benali', grade: 16 },
    { name: 'Lucas Martin', grade: 12 },
    { name: 'Emma Dubois', grade: 14 }
  ];
  
  const notesText = simulatedData.map(d => `${d.name}: ${d.grade}`).join(', ');
  document.getElementById('gradeNotes').value = notesText;
  showToast('success', 'Fichier Excel importé avec succès');
}

function parseWordFile(content) {
  // Simulation de parsing Word
  // Dans une vraie implémentation, utiliser une librairie comme mammoth.js
  const simulatedData = [
    { name: 'Yasmine Benali', grade: 16 },
    { name: 'Lucas Martin', grade: 12 }
  ];
  
  const notesText = simulatedData.map(d => `${d.name}: ${d.grade}`).join(', ');
  document.getElementById('gradeNotes').value = notesText;
  showToast('success', 'Fichier Word importé avec succès');
}

function parsePdfFile(content) {
  // Simulation de parsing PDF
  // Dans une vraie implémentation, utiliser une librairie comme pdf.js
  const simulatedData = [
    { name: 'Yasmine Benali', grade: 16 },
    { name: 'Lucas Martin', grade: 12 },
    { name: 'Emma Dubois', grade: 14 },
    { name: 'Thomas Bernard', grade: 15 }
  ];
  
  const notesText = simulatedData.map(d => `${d.name}: ${d.grade}`).join(', ');
  document.getElementById('gradeNotes').value = notesText;
  showToast('success', 'Fichier PDF importé avec succès');
}

// ============ BULLETIN TEMPLATE IMPORT ============
function handleBulletinTemplateImport(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  
  reader.onload = function(e) {
    const content = e.target.result;
    const fileName = file.name.toLowerCase();
    
    if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      parseBulletinTemplate(content, 'word');
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      parseBulletinTemplate(content, 'excel');
    } else if (fileName.endsWith('.pdf')) {
      parseBulletinTemplate(content, 'pdf');
    } else {
      showToast('error', 'Format de fichier non supporté');
    }
  };
  
  reader.readAsArrayBuffer(file);
}

function parseBulletinTemplate(content, type) {
  // Simulation de parsing de template
  // Dans une vraie implémentation, extraire la structure du document
  localStorage.setItem('bulletinTemplate', JSON.stringify({ type, content }));
  showToast('success', `Format de bulletin (${type}) importé avec succès`);
}

// ============ EVENT MANAGEMENT ============
function saveEvent() {
  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;
  const type = document.getElementById('eventType').value;
  const description = document.getElementById('eventDescription').value;

  if (!title || !date) {
    showToast('error', 'Veuillez remplir le titre et la date');
    return;
  }

  const newEvent = {
    date: date,
    title: title,
    type: type,
    description: description || ''
  };

  DATA.events.push(newEvent);
  
  // Trier les événements par date
  DATA.events.sort((a, b) => new Date(a.date) - new Date(b.date));

  closeModal();
  showSection('agenda');
  showToast('success', 'Événement ajouté avec succès');
}

// ============ STUDENT MANAGEMENT ============
function renderStudentsTable(students, semester = '') {
  return students.map(s => {
    // Déterminer la moyenne selon le semestre
    let avg = s.avg;
    if (semester === 'S1' && s.grades && s.grades.S1) {
      avg = s.grades.S1.avg;
    } else if (semester === 'S2' && s.grades && s.grades.S2) {
      avg = s.grades.S2.avg;
    } else if (semester && (!s.grades || !s.grades[semester])) {
      avg = null; // Pas de moyenne disponible pour ce semestre
    }

    const avgDisplay = avg !== null ? 
      `<div class="flex-center gap-8">
        <span class="font-bold ${gradeColor(avg)}">${avg}/20</span>
        <div class="progress-bar" style="width:60px">
          <div class="progress-fill" style="width:${avg*5}%;background:${gradeHex(avg)}"></div>
        </div>
      </div>` : '<span class="text-muted text-sm">-</span>';

    return `
      <tr>
        <td><input type="checkbox" /></td>
        <td>
          <div class="flex-center gap-8">
            <div class="avatar sm" style="background:${avatarColor(s.name)}">${s.photo}</div>
            <div>
              <div class="font-semibold">${s.name}</div>
              <div class="text-xs text-muted">${s.gender === 'F' ? '♀ Féminin' : '♂ Masculin'}</div>
            </div>
          </div>
        </td>
        <td><span class="chip chip-secondary">${s.class}</span></td>
        <td class="text-muted text-sm">${s.dob}</td>
        <td>${avgDisplay}</td>
        <td><span class="${s.abs>5?'chip chip-danger':s.abs>2?'chip chip-warning':'chip chip-success'}">${s.abs}abs/${s.late || 0}ret</span></td>
        <td class="text-sm text-muted">${s.parent}</td>
        <td>
          <div class="flex gap-8">
            <button class="btn btn-xs btn-secondary" onclick="showStudentDetail('${s.id}')"><i class="fas fa-eye"></i></button>
            <button class="btn btn-xs btn-primary" onclick="openEditStudentModal('${s.id}')"><i class="fas fa-edit"></i></button>
            <button class="btn btn-xs btn-danger" onclick="deleteStudent('${s.id}', '${s.name}')"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function filterStudents() {
  const search = document.getElementById('studentSearch').value.toLowerCase();
  const classFilter = document.getElementById('classFilter').value;
  const statusFilter = document.getElementById('statusFilter').value;
  const semesterFilter = document.getElementById('semesterFilter').value;

  let filtered = DATA.students.filter(s => {
    // Filtre par recherche
    if (search && !s.name.toLowerCase().includes(search)) return false;
    
    // Filtre par classe
    if (classFilter && s.class !== classFilter) return false;
    
    // Filtre par statut
    if (statusFilter === 'regular' && s.abs > 2) return false;
    if (statusFilter === 'absences' && s.abs <= 2) return false;
    if (statusFilter === 'late' && (!s.late || s.late === 0)) return false;
    
    return true;
  });

  // Mettre à jour le tableau
  const tbody = document.getElementById('studentsTableBody');
  tbody.innerHTML = renderStudentsTable(filtered, semesterFilter);
  
  // Mettre à jour le compteur
  document.getElementById('studentsCount').textContent = `Affichage de ${filtered.length} élèves`;
  document.getElementById('paginationInfo').textContent = `Affichage 1-${Math.min(filtered.length, 8)} sur ${filtered.length} élèves`;
}

function saveStudent() {
  const firstName = document.getElementById('studentFirstName').value;
  const lastName = document.getElementById('studentLastName').value;
  const dob = document.getElementById('studentDob').value;
  const gender = document.getElementById('studentGender').value;
  const studentClass = document.getElementById('studentClass').value;
  const parentName = document.getElementById('studentParentName').value;
  const parentPhone = document.getElementById('studentParentPhone').value;
  const parentEmail = document.getElementById('studentParentEmail').value;

  if (!firstName || !lastName || !dob || !studentClass) {
    showToast('error', 'Veuillez remplir les champs obligatoires');
    return;
  }

  const newStudent = {
    id: `e${DATA.students.length + 1}`,
    name: `${firstName} ${lastName}`,
    class: studentClass,
    dob: dob,
    avg: 0,
    abs: 0,
    late: 0,
    gender: gender === 'Féminin' ? 'F' : 'M',
    photo: firstName.charAt(0).toUpperCase(),
    parent: parentName || 'Non renseigné',
    parentPhone: parentPhone || '',
    parentEmail: parentEmail || '',
    grades: { S1: { avg: null }, S2: { avg: null } }
  };

  DATA.students.push(newStudent);
  
  if (typeof calculateStats === 'function') calculateStats();
  
  closeModal();
  showSection('students');
  showToast('success', 'Élève ajouté avec succès');
}

function showStudentDetail(studentId) {
  const student = DATA.students.find(s => s.id === studentId);
  if (!student) return;

  openModal(`
    <div class="modal-header"><h3><i class="fas fa-user text-primary"></i> Détails de l'élève</h3></div>
    <div class="modal-body">
      <div class="flex-center gap-16 mb-16">
        <div class="avatar lg" style="background:${avatarColor(student.name)};font-size:32px">${student.photo}</div>
        <div>
          <h2 class="font-bold text-lg">${student.name}</h2>
          <p class="text-muted">${student.class} • ${student.gender === 'F' ? 'Féminin' : 'Masculin'}</p>
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group"><label>Date de naissance</label><div class="text-sm font-semibold">${student.dob}</div></div>
        <div class="form-group"><label>Moyenne générale</label><div class="text-sm font-semibold ${gradeColor(student.avg)}">${student.avg}/20</div></div>
        <div class="form-group"><label>Absences</label><div class="text-sm font-semibold">${student.abs}</div></div>
        <div class="form-group"><label>Retards</label><div class="text-sm font-semibold">${student.late || 0}</div></div>
        <div class="form-group"><label>Nom du parent</label><div class="text-sm font-semibold">${student.parent}</div></div>
        <div class="form-group"><label>Numéro parent</label><div class="text-sm font-semibold">${student.parentPhone || 'Non renseigné'}</div></div>
        <div class="form-group"><label>Email parent</label><div class="text-sm font-semibold">${student.parentEmail || 'Non renseigné'}</div></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Fermer</button>
    </div>`);
}

function openEditStudentModal(studentId) {
  const student = DATA.students.find(s => s.id === studentId);
  if (!student) return;

  const firstName = student.name.split(' ')[0];
  const lastName = student.name.split(' ').slice(1).join(' ');

  openModal(`
    <div class="modal-header"><h3><i class="fas fa-edit text-primary"></i> Modifier l'élève</h3></div>
    <div class="modal-body">
      <input type="hidden" id="editStudentId" value="${student.id}" />
      <div class="form-row">
        <div class="form-group"><label>Prénom</label><input type="text" id="editStudentFirstName" value="${firstName}" /></div>
        <div class="form-group"><label>Nom</label><input type="text" id="editStudentLastName" value="${lastName}" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Date de naissance</label><input type="date" id="editStudentDob" value="${student.dob}" /></div>
        <div class="form-group"><label>Genre</label><select id="editStudentGender"><option ${student.gender === 'F' ? 'selected' : ''}>Féminin</option><option ${student.gender === 'M' ? 'selected' : ''}>Masculin</option></select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Classe</label><select id="editStudentClass">${DATA.classes.map(c=>`<option ${c.name === student.class ? 'selected' : ''}>${c.name}</option>`).join('')}</select></div>
        <div class="form-group"><label>Nom du parent</label><input type="text" id="editStudentParentName" value="${student.parent}" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Numéro parent</label><input type="tel" id="editStudentParentPhone" value="${student.parentPhone || ''}" /></div>
        <div class="form-group"><label>Email parent</label><input type="email" id="editStudentParentEmail" value="${student.parentEmail || ''}" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Absences</label><input type="number" id="editStudentAbs" value="${student.abs}" min="0" /></div>
        <div class="form-group"><label>Retards</label><input type="number" id="editStudentLate" value="${student.late || 0}" min="0" /></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="updateStudent()"><i class="fas fa-save"></i> Enregistrer</button>
    </div>`);
}

function updateStudent() {
  const studentId = document.getElementById('editStudentId').value;
  const student = DATA.students.find(s => s.id === studentId);
  if (!student) return;

  student.name = `${document.getElementById('editStudentFirstName').value} ${document.getElementById('editStudentLastName').value}`;
  student.dob = document.getElementById('editStudentDob').value;
  student.gender = document.getElementById('editStudentGender').value === 'Féminin' ? 'F' : 'M';
  student.class = document.getElementById('editStudentClass').value;
  student.parent = document.getElementById('editStudentParentName').value;
  student.parentPhone = document.getElementById('editStudentParentPhone').value;
  student.parentEmail = document.getElementById('editStudentParentEmail').value;
  student.abs = parseInt(document.getElementById('editStudentAbs').value) || 0;
  student.late = parseInt(document.getElementById('editStudentLate').value) || 0;
  student.photo = student.name.charAt(0).toUpperCase();

  if (typeof calculateStats === 'function') calculateStats();

  closeModal();
  showSection('students');
  showToast('success', 'Élève modifié avec succès');
}

function deleteStudent(studentId, studentName) {
  openModal(`
    <div class="modal-header">
      <h3><i class="fas fa-trash text-danger"></i> Confirmer la suppression</h3>
    </div>
    <div class="modal-body">
      <p>Êtes-vous sûr de vouloir supprimer <strong>${studentName}</strong> ?</p>
      <p class="text-muted text-sm mt-8">Cette action est irréversible.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-danger" onclick="confirmDeleteStudent('${studentId}')"><i class="fas fa-trash"></i> Supprimer</button>
    </div>
  `);
}

function confirmDeleteStudent(studentId) {
  DATA.students = DATA.students.filter(s => s.id !== studentId);
  
  if (typeof calculateStats === 'function') calculateStats();
  
  closeModal();
  showSection('students');
  showToast('success', 'Élève supprimé avec succès');
}

function deleteItem(type, name) {
  openModal(`
    <div class="modal-header">
      <h3><i class="fas fa-trash text-danger"></i> Confirmer la suppression</h3>
    </div>
    <div class="modal-body">
      <p>Êtes-vous sûr de vouloir supprimer <strong>${name}</strong> ?</p>
      <p class="text-muted text-sm mt-8">Cette action est irréversible.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-danger" onclick="confirmDelete('${type}','${name}')"><i class="fas fa-trash"></i> Supprimer</button>
    </div>
  `);
}

function confirmDelete(type, name) {
  closeModal();
  
  // Suppression réelle des données
  if (type === 'événement') {
    DATA.events = DATA.events.filter(e => e.title !== name);
    showSection('agenda');
  } else if (type === 'student') {
    DATA.students = DATA.students.filter(s => s.name !== name);
    showSection('students');
    if (typeof calculateStats === 'function') calculateStats();
  } else if (type === 'teacher') {
    DATA.teachers = DATA.teachers.filter(t => t.name !== name);
    showSection('teachers');
  } else if (type === 'class') {
    DATA.classes = DATA.classes.filter(c => c.name !== name);
    showSection('classes');
  }
  
  showToast('success', `${name} supprimé(e) avec succès`);
}

function sendMessage() {
  const input = document.querySelector('.msg-input input');
  if (!input || !input.value.trim()) return;
  const list = document.querySelector('.msg-list');
  const div = document.createElement('div');
  div.className = 'msg-bubble sent';
  div.textContent = input.value.trim();
  list.appendChild(div);
  list.scrollTop = list.scrollHeight;
  input.value = '';
  // Simulate reply
  setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'msg-bubble recv';
    reply.textContent = "Message bien reçu, je vous réponds dès que possible.";
    list.appendChild(reply);
    list.scrollTop = list.scrollHeight;
  }, 1500);
}

// ============ ATTENDANCE MARK ============
function markAttendance(studentId, status) {
  showToast('success', `Présence marquée : ${status}`);
}

// ============ PRINT BULLETIN ============
function printBulletin(studentName) {
  showToast('info', `Impression du bulletin de ${studentName}...`);
  setTimeout(() => showToast('success', 'Bulletin prêt à l\'impression !'), 1500);
}

function downloadBulletin(studentName) {
  showToast('info', `Téléchargement du bulletin de ${studentName}...`);
  setTimeout(() => showToast('success', 'Bulletin téléchargé !'), 1500);
}

// ============ SCHEDULE MANAGEMENT ============
window.openAddScheduleModal = function() {
  console.log('openAddScheduleModal called');
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-calendar-plus text-primary"></i> Ajouter un emploi du temps</h3></div>
    <div class="modal-body">
      <div class="form-group"><label>Classe</label>
        <select id="scheduleClass">${DATA.classes.map(c=>`<option value="${c.name}">${c.name}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label>Jour</label>
        <select id="scheduleDay">
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
        </select>
      </div>
      <div class="form-group"><label>Heure</label>
        <select id="scheduleTime">
          <option value="08h00">08h00</option>
          <option value="10h00">10h00</option>
          <option value="14h00">14h00</option>
          <option value="16h00">16h00</option>
          <option value="18h00">18h00</option>
        </select>
      </div>
      <div class="form-group"><label>Matière</label>
        <input type="text" id="scheduleSubject" placeholder="Ex: Mathématiques" /></div>
      <div class="form-group"><label>Professeur</label>
        <input type="text" id="scheduleTeacher" placeholder="Ex: Mme Sall" /></div>
      <div class="form-group"><label>Salle</label>
        <input type="text" id="scheduleRoom" placeholder="Ex: Salle 12" /></div>
      <div class="form-group"><label>Couleur</label>
        <select id="scheduleColor">
          <option value="bg-indigo">Bleu</option>
          <option value="bg-pink">Rose</option>
          <option value="bg-cyan">Cyan</option>
          <option value="bg-emerald">Vert</option>
          <option value="bg-amber">Orange</option>
          <option value="bg-purple">Violet</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="saveSchedule()"><i class="fas fa-save"></i> Enregistrer</button>
    </div>`);
}

window.saveSchedule = function() {
  const className = document.getElementById('scheduleClass').value;
  const day = document.getElementById('scheduleDay').value;
  const time = document.getElementById('scheduleTime').value;
  const subject = document.getElementById('scheduleSubject').value;
  const teacher = document.getElementById('scheduleTeacher').value;
  const room = document.getElementById('scheduleRoom').value;
  const color = document.getElementById('scheduleColor').value;

  if (!subject || !teacher || !room) {
    showToast('error', 'Veuillez remplir tous les champs');
    return;
  }

  // Trouver l'index du jour et de l'heure dans la grille
  const schedule = DATA.schedule[className] || DATA.schedule["3ème A"];
  const dayIndex = schedule[0].indexOf(day);
  const timeIndex = schedule.findIndex(row => row[0] === time);

  if (dayIndex > 0 && timeIndex > 0) {
    schedule[timeIndex][dayIndex] = {
      s: subject,
      t: teacher,
      r: room,
      c: color
    };
    
    // Si la classe n'existait pas dans DATA.schedule, l'ajouter
    if (!DATA.schedule[className]) {
      DATA.schedule[className] = schedule;
    }

    closeModal();
    showSection('schedule');
    showToast('success', 'Cours ajouté à l\'emploi du temps');
  } else {
    showToast('error', 'Erreur lors de l\'ajout du cours');
  }
}

// ============ CLICK OUTSIDE ============
document.addEventListener('click', function(e) {
  const panel = document.getElementById('notifPanel');
  const btn = document.querySelector('.notif-btn');
  if (panel && !panel.classList.contains('hidden')) {
    if (!panel.contains(e.target) && btn && !btn.contains(e.target)) {
      closeNotifPanel();
    }
  }
});

// ============ MOBILE OVERLAY ============
document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth <= 900 && sidebar.classList.contains('mobile-open')) {
      if (!sidebar.contains(e.target) && !e.target.closest('.mobile-menu-btn')) {
        sidebar.classList.remove('mobile-open');
      }
    }
  });
});
