// ============================================================
//  EduSmart — Données de démonstration
// ============================================================

const DATA = {
  schools: [
    { id: "s1", email: "lycee@edusmart.sn", name: "Lycée International EduSmart", city: "Dakar", year: "2025-2026" },
    { id: "s2", email: "college@edusmart.sn", name: "Collège Saint-Exupéry", city: "Dakar", year: "2025-2026" },
    { id: "s3", email: "primaire@edusmart.sn", name: "École Primaire Lumière", city: "Dakar", year: "2025-2026" }
  ],

  currentSchool: null,

  school: {
    name: "Lycée International EduSmart",
    year: "2025-2026",
    city: "Dakar",
    director: "M. Cheikh Ndiaye",
    email: "contact@edusmart.sn",
    phone: "+221 33 123 45 67",
    students: 847,
    teachers: 64,
    classes: 28,
    staff: 18
  },

  currentUser: null,

  users: {
    admin: { name: "Cheikh Ndiaye", role: "Directeur", avatar: "C", menu: "admin" },
    surveillant: { name: "M. Ibrahima Fall", role: "Surveillant", avatar: "I", menu: "admin" },
    teacher: { name: "Mme Aminata Sall", role: "Professeure de Maths", avatar: "A", menu: "teacher" },
    student: { name: "Aminata Faye", role: "Élève", avatar: "A", menu: "parent", childId: "e1" },
    parent: { name: "M. Babacar Faye", role: "Parent d'élève", avatar: "B", menu: "parent", childId: "e1" }
  },

  students: [
    { id:"e1", name:"Aminata Faye", class:"3ème A", dob:"2011-04-15", avg:14.8, abs:2, late:1, gender:"F", photo:"A", parent:"M. Babacar Faye", parentPhone:"77 123 45 67", parentEmail:"babacar.faye@email.com", grades:{ S1:{ avg:14.5 }, S2:{ avg:15.1 } } },
    { id:"e2", name:"Ousmane Sall", class:"3ème A", dob:"2011-07-22", avg:11.2, abs:5, late:3, gender:"M", photo:"O", parent:"Mme Fatou Sall", parentPhone:"77 234 56 78", parentEmail:"fatou.sall@email.com", grades:{ S1:{ avg:10.8 }, S2:{ avg:11.6 } } },
    { id:"e3", name:"Mariam Diallo", class:"2nde B", dob:"2010-02-10", avg:16.5, abs:0, late:0, gender:"F", photo:"M", parent:"M. Moussa Diallo", parentPhone:"77 345 67 89", parentEmail:"moussa.diallo@email.com", grades:{ S1:{ avg:16.2 }, S2:{ avg:16.8 } } },
    { id:"e4", name:"Ibrahim Ba", class:"1ère C", dob:"2009-11-03", avg:9.4, abs:8, late:4, gender:"M", photo:"I", parent:"M. Modou Ba", parentPhone:"77 456 78 90", parentEmail:"modou.ba@email.com", grades:{ S1:{ avg:9.0 }, S2:{ avg:9.8 } } },
    { id:"e5", name:"Fatoumata Ndiaye", class:"Terminale D", dob:"2008-06-18", avg:17.2, abs:1, late:0, gender:"F", photo:"F", parent:"Mme Awa Ndiaye", parentPhone:"77 567 89 01", parentEmail:"awa.ndiaye@email.com", grades:{ S1:{ avg:17.0 }, S2:{ avg:17.4 } } },
    { id:"e6", name:"Mamadou Camara", class:"3ème A", dob:"2011-09-05", avg:13.0, abs:3, late:2, gender:"M", photo:"M", parent:"M. Idrissa Camara", parentPhone:"77 678 90 12", parentEmail:"idrissa.camara@email.com", grades:{ S1:{ avg:12.5 }, S2:{ avg:13.5 } } },
    { id:"e7", name:"Khadija Fall", class:"2nde B", dob:"2010-05-27", avg:15.6, abs:1, late:1, gender:"F", photo:"K", parent:"M. Abdou Fall", parentPhone:"77 789 01 23", parentEmail:"abdou.fall@email.com", grades:{ S1:{ avg:15.3 }, S2:{ avg:15.9 } } },
    { id:"e8", name:"Aliou Sall", class:"1ère C", dob:"2009-01-14", avg:12.3, abs:4, late:2, gender:"M", photo:"A", parent:"M. Ibrahima Sall", parentPhone:"77 890 12 34", parentEmail:"ibrahima.sall@email.com", grades:{ S1:{ avg:12.0 }, S2:{ avg:12.6 } } }
  ],

  teachers: [
    { id:"p1", name:"Mme Aminata Sall", subject:"Mathématiques", classes:["3ème A","2nde B"], hours:18, status:"active", email:"a.sall@edusmart.sn", phone:"77 123 45 67" },
    { id:"p2", name:"M. Cheikh Tine", subject:"Physique-Chimie", classes:["1ère C","Terminale D"], hours:20, status:"active", email:"c.tine@edusmart.sn", phone:"77 234 56 78" },
    { id:"p3", name:"Mme Fatou Ndiaye", subject:"Français", classes:["3ème A","3ème B"], hours:16, status:"active", email:"f.ndiaye@edusmart.sn", phone:"77 345 67 89" },
    { id:"p4", name:"M. Moussa Ly", subject:"Histoire-Géo", classes:["2nde B","1ère C"], hours:18, status:"leave", email:"m.ly@edusmart.sn", phone:"77 456 78 90" },
    { id:"p5", name:"Mme Aïssa Bâ", subject:"Anglais", classes:["Terminale D","3ème A"], hours:20, status:"active", email:"a.ba@edusmart.sn", phone:"77 567 89 01" },
    { id:"p6", name:"M. Omar Traoré", subject:"SVT", classes:["2nde B","Terminale D"], hours:18, status:"active", email:"o.traore@edusmart.sn", phone:"77 678 90 12" }
  ],

  classes: [
    { id:"c1", name:"3ème A", level:"3ème", students:28, teacher:"Mme Aminata Sall", room:"Salle 12", schedule:"Lun-Sam" },
    { id:"c2", name:"2nde B", level:"2nde", students:32, teacher:"M. Cheikh Tine", room:"Salle 7", schedule:"Lun-Sam" },
    { id:"c3", name:"1ère C", level:"1ère", students:30, teacher:"M. Moussa Ly", room:"Salle 4", schedule:"Lun-Sam" },
    { id:"c4", name:"Terminale D", level:"Terminale", students:27, teacher:"Mme Aïssa Bâ", room:"Salle 18", schedule:"Lun-Sam" },
    { id:"c5", name:"3ème B", level:"3ème", students:29, teacher:"Mme Fatou Ndiaye", room:"Salle 11", schedule:"Lun-Sam" },
    { id:"c6", name:"6ème A", level:"6ème", students:26, teacher:"M. Omar Traoré", room:"Salle 2", schedule:"Lun-Sam" }
  ],

  grades: {
    e1: [
      { subject:"Mathématiques", coeff:4, t1:14, t2:15, t3:16, avg:15.0, teacher:"Mme Sall" },
      { subject:"Français", coeff:4, t1:13, t2:14, t3:13, avg:13.3, teacher:"Mme Ndiaye" },
      { subject:"Physique-Chimie", coeff:3, t1:15, t2:16, t3:15, avg:15.3, teacher:"M. Tine" },
      { subject:"Histoire-Géo", coeff:3, t1:16, t2:15, t3:17, avg:16.0, teacher:"M. Ly" },
      { subject:"Anglais", coeff:3, t1:18, t2:17, t3:18, avg:17.7, teacher:"Mme Bâ" },
      { subject:"SVT", coeff:2, t1:13, t2:14, t3:14, avg:13.7, teacher:"M. Traoré" },
      { subject:"EPS", coeff:2, t1:16, t2:16, t3:17, avg:16.3, teacher:"M. Diop" }
    ]
  },

  attendance: {
    e1: {
      "2025-11-03": "present", "2025-11-04": "present", "2025-11-05": "absent",
      "2025-11-06": "present", "2025-11-07": "late", "2025-11-10": "present",
      "2025-11-12": "present", "2025-11-13": "present", "2025-11-14": "present",
      "2025-11-17": "present", "2025-11-18": "absent", "2025-11-19": "present",
      "2025-11-20": "present", "2025-11-21": "present"
    }
  },

  events: [
    { date:"2025-11-25", title:"Réunion parents-professeurs", type:"meeting" },
    { date:"2025-11-28", title:"Contrôle de Mathématiques – 3ème A", type:"exam" },
    { date:"2025-12-01", title:"Remise des bulletins T1", type:"bulletin" },
    { date:"2025-12-05", title:"Sortie scolaire – Musée d'Orsay", type:"trip" },
    { date:"2025-12-10", title:"Conseil de classe – Terminale D", type:"meeting" },
    { date:"2025-12-15", title:"Fête de fin d'année", type:"event" }
  ],

  messages: [
    { from:"Mme Aminata Sall", subject:"Résultats contrôle Maths", time:"Il y a 2h", read:false, preview:"Aminata a obtenu 16/20 au dernier contrôle..." },
    { from:"Administration", subject:"Réunion parents-professeurs", time:"Hier", read:false, preview:"Nous vous informons que la réunion aura lieu le..." },
    { from:"M. Tine", subject:"Absence justifiée", time:"Il y a 2 jours", read:true, preview:"Suite à votre message, l'absence du 18 nov. est..." },
    { from:"Infirmerie", subject:"Visite médicale obligatoire", time:"Il y a 3 jours", read:true, preview:"Votre enfant est convoqué à la visite médicale..." },
    { from:"Administration", subject:"Sortie scolaire – autorisation", time:"Il y a 5 jours", read:true, preview:"Merci de renvoyer le coupon d'autorisation avant..." }
  ],

  notifications: [
    { icon:"fa-graduation-cap", color:"bg-indigo", text:"Bulletins du T1 disponibles", time:"Il y a 5 min" },
    { icon:"fa-user-clock", color:"bg-amber", text:"2 absences non justifiées en 3ème A", time:"Il y a 30 min" },
    { icon:"fa-calendar-check", color:"bg-emerald", text:"Réunion parents-profs confirmée", time:"Il y a 1h" },
    { icon:"fa-file-alt", color:"bg-cyan", text:"Nouveaux bulletins téléchargés", time:"Il y a 2h" },
    { icon:"fa-exclamation-triangle", color:"bg-rose", text:"Ibrahim Ba – 8 absences", time:"Il y a 3h" }
  ],

  schedule: {
    "3ème A": [
      ["", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
      ["08h00-10h00", { s:"Mathématiques", t:"Mme Sall", r:"S.12", c:"bg-indigo" }, { s:"Français", t:"Mme Ndiaye", r:"S.8", c:"bg-pink" }, { s:"SVT", t:"M. Traoré", r:"S.5", c:"bg-emerald" }, { s:"Maths", t:"Mme Sall", r:"S.12", c:"bg-indigo" }, { s:"Histoire-Géo", t:"M. Ly", r:"S.9", c:"bg-amber" }],
      ["10h00-12h00", { s:"Physique", t:"M. Tine", r:"S.3", c:"bg-cyan" }, { s:"Anglais", t:"Mme Bâ", r:"S.15", c:"bg-purple" }, { s:"Mathématiques", t:"Mme Sall", r:"S.12", c:"bg-indigo" }, { s:"Français", t:"Mme Ndiaye", r:"S.8", c:"bg-pink" }, { s:"Anglais", t:"Mme Bâ", r:"S.15", c:"bg-purple" }],
      ["14h00-16h00", { s:"Histoire-Géo", t:"M. Ly", r:"S.9", c:"bg-amber" }, { s:"EPS", t:"M. Diop", r:"Gym", c:"bg-orange" }, { s:"Anglais", t:"Mme Bâ", r:"S.15", c:"bg-purple" }, { s:"SVT", t:"M. Traoré", r:"S.5", c:"bg-emerald" }, { s:"Physique", t:"M. Tine", r:"S.3", c:"bg-cyan" }],
      ["16h00-18h00", { s:"EPS", t:"M. Diop", r:"Gym", c:"bg-orange" }, "", "", { s:"Français", t:"Mme Ndiaye", r:"S.8", c:"bg-pink" }, ""],
      ["18h00-19h00", "", "", "", "", ""]
    ]
  },

  stats: {
    monthlyAttendance: [94, 96, 91, 97, 95, 93, 98, 96, 94, 97, 95, 92],
    gradeDistribution: [12, 28, 45, 35, 22, 10],
    enrollmentTrend: [820, 831, 838, 844, 847],
    subjectAvgs: [13.4, 14.2, 12.8, 15.1, 11.9, 13.7, 14.8]
  }
};

// Calculer les statistiques dynamiquement
function calculateStats() {
  // Distribution des notes basée sur les moyennes des élèves
  const gradeDist = [0, 0, 0, 0, 0, 0]; // <8, 8-10, 10-12, 12-14, 14-16, >16
  DATA.students.forEach(s => {
    if (s.avg < 8) gradeDist[0]++;
    else if (s.avg < 10) gradeDist[1]++;
    else if (s.avg < 12) gradeDist[2]++;
    else if (s.avg < 14) gradeDist[3]++;
    else if (s.avg < 16) gradeDist[4]++;
    else gradeDist[5]++;
  });
  DATA.stats.gradeDistribution = gradeDist;

  // Moyennes par matière basées sur les notes disponibles
  const subjects = ['Mathématiques', 'Français', 'Physique-Chimie', 'Histoire-Géo', 'Anglais', 'SVT', 'EPS'];
  const subjectAvgs = subjects.map(subject => {
    let sum = 0, count = 0;
    Object.values(DATA.grades).forEach(studentGrades => {
      const grade = studentGrades.find(g => g.subject === subject);
      if (grade) {
        sum += grade.avg;
        count++;
      }
    });
    return count > 0 ? (sum / count).toFixed(1) : 0;
  });
  DATA.stats.subjectAvgs = subjectAvgs;

  // Tendance d'inscription basée sur le nombre actuel d'élèves
  const currentStudents = DATA.students.length;
  DATA.stats.enrollmentTrend = [
    Math.floor(currentStudents * 0.97),
    Math.floor(currentStudents * 0.98),
    Math.floor(currentStudents * 0.99),
    Math.floor(currentStudents * 0.995),
    currentStudents
  ];
}

// Calculer les stats au chargement
calculateStats();
