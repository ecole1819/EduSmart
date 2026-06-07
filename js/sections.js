// ============================================================
//  EduSmart — Sections / Pages
// ============================================================

const SECTIONS = {

  // ========== DASHBOARD ADMIN ==========
  dashboard: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Tableau de bord</h1>
          <p class="page-subtitle">${DATA.school.name} — Année scolaire ${DATA.school.year}</p>
        </div>
        <div class="flex gap-8">
          <button class="btn btn-secondary btn-sm" onclick="showSection('reports')"><i class="fas fa-chart-bar"></i> Rapports</button>
          <button class="btn btn-primary btn-sm" onclick="openAddStudentModal()"><i class="fas fa-plus"></i> Nouvel élève</button>
        </div>
      </div>

      <!-- STATS -->
      <div class="stats-grid">
        <div class="stat-card" onclick="showSection('students')">
          <div class="stat-icon bg-indigo"><i class="fas fa-user-graduate"></i></div>
          <div class="stat-info">
            <div class="stat-value">${DATA.students.length}</div>
            <div class="stat-label">Élèves inscrits</div>
            <div class="stat-trend trend-up"><i class="fas fa-arrow-up"></i> +${Math.floor(DATA.students.length * 0.015)} ce trimestre</div>
          </div>
        </div>
        <div class="stat-card" onclick="showSection('teachers')">
          <div class="stat-icon bg-cyan"><i class="fas fa-chalkboard-teacher"></i></div>
          <div class="stat-info">
            <div class="stat-value">${DATA.teachers.length}</div>
            <div class="stat-label">Professeurs</div>
            <div class="stat-trend trend-up"><i class="fas fa-arrow-up"></i> ${Math.floor(DATA.teachers.length * 0.05)} nouveaux</div>
          </div>
        </div>
        <div class="stat-card" onclick="showSection('classes')">
          <div class="stat-icon bg-emerald"><i class="fas fa-door-open"></i></div>
          <div class="stat-info">
            <div class="stat-value">${DATA.classes.length}</div>
            <div class="stat-label">Classes actives</div>
            <div class="stat-trend trend-up"><i class="fas fa-check"></i> Toutes opérationnelles</div>
          </div>
        </div>
        <div class="stat-card" onclick="showSection('attendance')">
          <div class="stat-icon bg-amber"><i class="fas fa-calendar-check"></i></div>
          <div class="stat-info">
            <div class="stat-value">${(DATA.students.reduce((acc, s) => acc + (20 - s.abs), 0) / DATA.students.length / 20 * 100).toFixed(1)}%</div>
            <div class="stat-label">Taux de présence</div>
            <div class="stat-trend trend-down"><i class="fas fa-arrow-down"></i> -0.3% vs mois dernier</div>
          </div>
        </div>
      </div>

      <!-- ROW 2 -->
      <div class="grid-2 mb-24">
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-chart-line text-primary"></i> Évolution des présences</div>
            <select class="btn btn-secondary btn-sm" style="border:none;cursor:pointer">
              <option>Cette année</option>
              <option>Trimestre 1</option>
            </select>
          </div>
          <div class="card-body">
            <div class="chart-box" style="height:220px">
              <canvas id="attendanceChart"></canvas>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-chart-pie text-purple"></i> Répartition des notes</div>
          </div>
          <div class="card-body">
            <div class="chart-box" style="height:220px">
              <canvas id="gradesChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- ROW 3 -->
      <div class="grid-2 mb-24">
        <!-- RECENT STUDENTS -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-user-graduate text-indigo-500"></i> Élèves récents</div>
            <button class="btn btn-secondary btn-sm" onclick="showSection('students')">Voir tout</button>
          </div>
          <div class="card-body" style="padding:0">
            <div class="table-wrap">
              <table>
                <thead><tr><th>Élève</th><th>Classe</th><th>Moy.</th><th>Statut</th></tr></thead>
                <tbody>
                  ${DATA.students.slice(0,5).map(s => `
                    <tr style="cursor:pointer" onclick="showStudentDetail('${s.id}')">
                      <td><div class="flex-center gap-8">
                        <div class="avatar sm" style="background:${avatarColor(s.name)}">${s.photo}</div>
                        <span class="font-semibold">${s.name}</span>
                      </div></td>
                      <td><span class="chip chip-secondary">${s.class}</span></td>
                      <td><span class="font-bold ${s.avg>=10?'text-success':'text-danger'}">${s.avg}/20</span></td>
                      <td>${s.abs>5?'<span class="chip chip-danger">⚠ Absences</span>':'<span class="chip chip-success">✓ Régulier</span>'}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- EVENTS + CALENDAR -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-calendar-alt text-warning"></i> Agenda scolaire</div>
            <button class="btn btn-primary btn-sm" onclick="showSection('agenda')"><i class="fas fa-plus"></i></button>
          </div>
          <div class="card-body">
            ${DATA.events.map(e => `
              <div class="flex-center gap-12 mb-12" style="padding:10px;background:var(--bg);border-radius:var(--radius-sm)">
                <div class="stat-icon ${eventColor(e.type)}" style="width:36px;height:36px;font-size:0.85rem">
                  <i class="fas ${eventIcon(e.type)}"></i>
                </div>
                <div>
                  <div class="font-semibold text-sm">${e.title}</div>
                  <div class="text-xs text-muted">${formatDate(e.date)}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- ROW 4 -->
      <div class="grid-2">
        <!-- TEACHERS STATUS -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-chalkboard-teacher text-cyan"></i> Professeurs du jour</div>
            <button class="btn btn-secondary btn-sm" onclick="showSection('teachers')">Voir tout</button>
          </div>
          <div class="card-body" style="padding:0">
            <div class="table-wrap">
              <table>
                <thead><tr><th>Professeur</th><th>Matière</th><th>Statut</th></tr></thead>
                <tbody>
                  ${DATA.teachers.map(t => `
                    <tr>
                      <td><div class="flex-center gap-8">
                        <div class="avatar sm" style="background:${avatarColor(t.name)}">${t.name[4]}</div>
                        <span class="font-semibold">${t.name}</span>
                      </div></td>
                      <td class="text-muted text-sm">${t.subject}</td>
                      <td>${t.status==='active'?'<span class="chip chip-success">✓ Présent</span>':'<span class="chip chip-warning">⚠ Congé</span>'}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ALERTS -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-bell text-danger"></i> Alertes & Actions requises</div>
          </div>
          <div class="card-body">
            <div style="padding:12px;background:rgba(239,68,68,0.08);border-left:4px solid var(--danger);border-radius:var(--radius-sm);margin-bottom:12px">
              <div class="font-semibold text-sm"><i class="fas fa-exclamation-triangle text-danger"></i> Thomas Dupont – 8 absences non justifiées</div>
              <div class="text-xs text-muted mt-8">Classe : 1ère C • Parent à contacter</div>
              <button class="btn btn-xs btn-danger mt-8" onclick="showToast('info','Message envoyé aux parents')">Contacter parent</button>
            </div>
            <div style="padding:12px;background:rgba(245,158,11,0.08);border-left:4px solid var(--warning);border-radius:var(--radius-sm);margin-bottom:12px">
              <div class="font-semibold text-sm"><i class="fas fa-clock text-warning"></i> Bulletins T1 — En attente de validation</div>
              <div class="text-xs text-muted mt-8">14 bulletins non signés par les professeurs</div>
              <button class="btn btn-xs btn-warning mt-8" onclick="showSection('bulletins')">Gérer les bulletins</button>
            </div>
            <div style="padding:12px;background:rgba(59,130,246,0.08);border-left:4px solid var(--info);border-radius:var(--radius-sm)">
              <div class="font-semibold text-sm"><i class="fas fa-info-circle" style="color:var(--info)"></i> Réunion parents-profs – dans 3 jours</div>
              <div class="text-xs text-muted mt-8">Salle polyvalente — 18h00 à 20h00</div>
              <button class="btn btn-xs btn-secondary mt-8" onclick="showSection('agenda')">Voir l'agenda</button>
            </div>
          </div>
        </div>
      </div>
    </div>`,

  // ========== STUDENTS ==========
  students: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Gestion des Élèves</h1>
          <p class="page-subtitle">${DATA.students.length} élèves inscrits • Année ${DATA.school.year}</p>
        </div>
        <button class="btn btn-primary" onclick="openAddStudentModal()"><i class="fas fa-user-plus"></i> Ajouter un élève</button>
      </div>

      <!-- FILTERS -->
      <div class="card mb-24">
        <div class="card-body" style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
          <div class="input-group" style="margin:0;flex:1;min-width:200px">
            <i class="fas fa-search"></i>
            <input type="text" id="studentSearch" placeholder="Rechercher un élève..." oninput="filterStudents()" />
          </div>
          <select id="classFilter" class="btn btn-secondary" style="padding:10px 14px" onchange="filterStudents()">
            <option value="">Toutes les classes</option>
            ${DATA.classes.map(c=>`<option value="${c.name}">${c.name}</option>`).join('')}
          </select>
          <select id="statusFilter" class="btn btn-secondary" style="padding:10px 14px" onchange="filterStudents()">
            <option value="">Tous les statuts</option>
            <option value="regular">Régulier</option>
            <option value="absences">Absences</option>
            <option value="late">Retardataires</option>
          </select>
          <select id="semesterFilter" class="btn btn-secondary" style="padding:10px 14px" onchange="filterStudents()">
            <option value="">Tous les semestres</option>
            <option value="S1">Semestre 1</option>
            <option value="S2">Semestre 2</option>
          </select>
        </div>
      </div>

      <!-- TABLE -->
      <div class="card">
        <div class="card-header">
          <div class="card-title"><i class="fas fa-list"></i> Liste des élèves</div>
          <div class="text-muted text-sm" id="studentsCount">Affichage de ${DATA.students.length} élèves</div>
        </div>
        <div class="table-wrap">
          <table id="studentsTable">
            <thead>
              <tr>
                <th><input type="checkbox" onchange="selectAll(this)" /></th>
                <th>Élève</th>
                <th>Classe</th>
                <th>Naissance</th>
                <th>Moy. générale</th>
                <th>Absences/Retards</th>
                <th>Parent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="studentsTableBody">
              ${renderStudentsTable(DATA.students)}
            </tbody>
          </table>
        </div>
        <div style="padding:16px 20px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
          <span class="text-sm text-muted" id="paginationInfo">Affichage 1-${Math.min(DATA.students.length, 8)} sur ${DATA.students.length} élèves</span>
          <div class="flex gap-8">
            <button class="btn btn-secondary btn-sm">← Précédent</button>
            <button class="btn btn-primary btn-sm active">1</button>
            <button class="btn btn-secondary btn-sm">2</button>
            <button class="btn btn-secondary btn-sm">3</button>
            <button class="btn btn-secondary btn-sm">Suivant →</button>
          </div>
        </div>
      </div>
    </div>`,

  // ========== TEACHERS ==========
  teachers: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Gestion des Professeurs</h1>
          <p class="page-subtitle">64 professeurs • ${DATA.teachers.filter(t=>t.status==='active').length} présents aujourd'hui</p>
        </div>
        <button class="btn btn-primary" onclick="openAddTeacherModal()"><i class="fas fa-user-plus"></i> Ajouter un prof.</button>
      </div>

      <div class="stats-grid mb-24">
        <div class="stat-card">
          <div class="stat-icon bg-cyan"><i class="fas fa-users"></i></div>
          <div class="stat-info"><div class="stat-value">64</div><div class="stat-label">Total professeurs</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-emerald"><i class="fas fa-check-circle"></i></div>
          <div class="stat-info"><div class="stat-value">60</div><div class="stat-label">Présents</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-amber"><i class="fas fa-user-clock"></i></div>
          <div class="stat-info"><div class="stat-value">4</div><div class="stat-label">En congé</div></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-purple"><i class="fas fa-clock"></i></div>
          <div class="stat-info"><div class="stat-value">1184h</div><div class="stat-label">Heures/semaine total</div></div>
        </div>
      </div>

      <div class="grid-2 mb-24">
        ${DATA.teachers.map(t => `
          <div class="card" style="cursor:pointer" onclick="showTeacherDetail('${t.id}')">
            <div class="card-body">
              <div class="flex-between mb-12">
                <div class="flex-center gap-12">
                  <div class="avatar" style="background:${avatarColor(t.name)}">${t.name[4]}</div>
                  <div>
                    <div class="font-bold">${t.name}</div>
                    <div class="text-sm text-muted">${t.subject}</div>
                  </div>
                </div>
                <span class="${t.status==='active'?'chip chip-success':'chip chip-warning'}">${t.status==='active'?'✓ Actif':'⚠ Congé'}</span>
              </div>
              <div class="flex gap-8 flex-wrap">
                ${t.classes.map(c=>`<span class="chip chip-secondary">${c}</span>`).join('')}
              </div>
              <div class="flex-between mt-12" style="padding-top:12px;border-top:1px solid var(--border)">
                <span class="text-xs text-muted"><i class="fas fa-clock"></i> ${t.hours}h/semaine</span>
                <span class="text-xs text-muted"><i class="fas fa-envelope"></i> ${t.email}</span>
              </div>
              <div class="flex gap-8 mt-12">
                <button class="btn btn-xs btn-secondary" onclick="event.stopPropagation();openEditTeacherModal('${t.id}')"><i class="fas fa-edit"></i> Modifier</button>
                <button class="btn btn-xs btn-primary" onclick="event.stopPropagation();showSection('schedule')"><i class="fas fa-clock"></i> Planning</button>
                <button class="btn btn-xs btn-danger" onclick="event.stopPropagation();deleteItem('professeur','${t.name}')"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>`,

  // ========== CLASSES ==========
  classes: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Gestion des Classes</h1>
          <p class="page-subtitle">28 classes • Année scolaire ${DATA.school.year}</p>
        </div>
        <button class="btn btn-primary" onclick="openAddClassModal()"><i class="fas fa-plus"></i> Nouvelle classe</button>
      </div>

      <div class="grid-3">
        ${DATA.classes.map(c => `
          <div class="card" style="cursor:pointer" onclick="showClassDetail('${c.id}')">
            <div style="height:6px;background:linear-gradient(90deg,var(--primary),var(--secondary))"></div>
            <div class="card-body">
              <div class="flex-between mb-16">
                <div>
                  <div class="font-bold" style="font-size:1.2rem">${c.name}</div>
                  <div class="text-sm text-muted">${c.level}</div>
                </div>
                <div class="stat-icon bg-indigo" style="width:44px;height:44px;font-size:0.9rem">
                  <i class="fas fa-door-open"></i>
                </div>
              </div>
              <div class="grid-2 mb-12" style="gap:8px">
                <div class="info-block">
                  <div class="info-block-label">Élèves</div>
                  <div class="info-block-value">${c.students}</div>
                </div>
                <div class="info-block">
                  <div class="info-block-label">Salle</div>
                  <div class="info-block-value">${c.room}</div>
                </div>
              </div>
              <div class="flex-center gap-8 mb-12">
                <div class="avatar sm" style="background:${avatarColor(c.teacher)}">${c.teacher[4]}</div>
                <div>
                  <div class="text-xs text-muted">Professeur principal</div>
                  <div class="font-semibold text-sm">${c.teacher}</div>
                </div>
              </div>
              <div class="flex gap-8">
                <button class="btn btn-xs btn-secondary" onclick="event.stopPropagation();showSection('attendance')"><i class="fas fa-check"></i> Présences</button>
                <button class="btn btn-xs btn-primary" onclick="event.stopPropagation();showSection('grades')"><i class="fas fa-star"></i> Notes</button>
                <button class="btn btn-xs btn-outline" onclick="event.stopPropagation();showSection('schedule')"><i class="fas fa-clock"></i></button>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>`,

  // ========== SCHEDULE ==========
  schedule: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Emploi du temps</h1>
          <p class="page-subtitle">Semaine du 24 au 28 Novembre 2025</p>
        </div>
        <div class="flex gap-8">
          <select id="scheduleClassFilter" class="btn btn-secondary" style="padding:10px 14px" onchange="changeScheduleClass()">
            ${DATA.classes.map(c=>`<option value="${c.name}">${c.name}</option>`).join('')}
          </select>
          <button class="btn btn-primary btn-sm" onclick="openAddScheduleModal()"><i class="fas fa-plus"></i> Ajouter</button>
          <button class="btn btn-secondary btn-sm"><i class="fas fa-print"></i> Imprimer</button>
        </div>
      </div>
      <div class="card">
        <div class="card-body" style="overflow-x:auto">
          <div class="schedule-grid" id="scheduleGrid">
            ${renderScheduleGrid("3ème A")}
          </div>
        </div>
      </div>
    </div>`,

  // ========== ATTENDANCE ==========
  attendance: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Gestion des Présences</h1>
          <p class="page-subtitle">Aujourd'hui – Lundi 24 Novembre 2025</p>
        </div>
        <div class="flex gap-8">
          <select class="btn btn-secondary" style="padding:10px 14px">
            ${DATA.classes.map(c=>`<option>${c.name}</option>`).join('')}
          </select>
          <button class="btn btn-primary" onclick="showToast('success','Présences enregistrées !')"><i class="fas fa-save"></i> Enregistrer</button>
        </div>
      </div>

      <div class="stats-grid mb-24">
        <div class="stat-card"><div class="stat-icon bg-emerald"><i class="fas fa-check"></i></div><div class="stat-info"><div class="stat-value">24</div><div class="stat-label">Présents</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-rose"><i class="fas fa-times"></i></div><div class="stat-info"><div class="stat-value">2</div><div class="stat-label">Absents</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-amber"><i class="fas fa-clock"></i></div><div class="stat-info"><div class="stat-value">2</div><div class="stat-label">En retard</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-indigo"><i class="fas fa-percentage"></i></div><div class="stat-info"><div class="stat-value">92.8%</div><div class="stat-label">Taux du jour</div></div></div>
      </div>

      <div class="grid-2 mb-24">
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-clipboard-check"></i> Appel – 3ème A</div>
            <span class="chip chip-info">Cours du matin</span>
          </div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>#</th><th>Élève</th><th>Statut</th><th>Justification</th><th>Actions</th></tr></thead>
              <tbody>
                ${DATA.students.slice(0,6).map((s,i) => {
                  const statuses = ['present','present','absent','present','late','present'];
                  const st = statuses[i];
                  return `<tr>
                    <td class="text-muted">${i+1}</td>
                    <td><div class="flex-center gap-8"><div class="avatar sm" style="background:${avatarColor(s.name)}">${s.photo}</div><span class="font-semibold">${s.name}</span></div></td>
                    <td>
                      <select style="border:none;background:none;font-family:inherit;font-size:0.8rem;cursor:pointer;color:${st==='present'?'var(--success)':st==='absent'?'var(--danger)':'var(--warning)'}" onchange="markAttendance('${s.id}',this.value)">
                        <option value="present" ${st==='present'?'selected':''}>✓ Présent</option>
                        <option value="absent" ${st==='absent'?'selected':''}>✗ Absent</option>
                        <option value="late" ${st==='late'?'selected':''}>⏰ Retard</option>
                      </select>
                    </td>
                    <td>${st==='absent'?'<span class="chip chip-warning text-xs">En attente</span>':'<span class="text-muted text-xs">—</span>'}</td>
                    <td><button class="btn btn-xs btn-secondary" onclick="showToast('info','Notification envoyée au parent')"><i class="fas fa-bell"></i></button></td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-chart-bar"></i> Statistiques du mois</div>
          </div>
          <div class="card-body">
            <div class="chart-box" style="height:200px"><canvas id="monthAttendanceChart"></canvas></div>
            <div class="mt-16">
              ${DATA.students.slice(0,4).map(s => `
                <div class="flex-between mb-8">
                  <span class="text-sm font-semibold">${s.name}</span>
                  <div class="flex-center gap-8">
                    <div class="progress-bar" style="width:100px">
                      <div class="progress-fill" style="width:${Math.max(0,100-s.abs*5)}%;background:var(--success)"></div>
                    </div>
                    <span class="text-xs text-muted">${Math.max(0,100-s.abs*5)}%</span>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`,

  // ========== GRADES ==========
  grades: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Notes & Évaluations</h1>
          <p class="page-subtitle">Trimestre 1 – Année scolaire ${DATA.school.year}</p>
        </div>
        <div class="flex gap-8">
          <button class="btn btn-secondary btn-sm" onclick="showSection('bulletins')"><i class="fas fa-file-alt"></i> Bulletins</button>
          <button class="btn btn-primary" onclick="openAddGradeModal()"><i class="fas fa-plus"></i> Saisir des notes</button>
        </div>
      </div>

      <div class="tabs">
        <button class="tab-btn active" data-group="grades" data-tab="overview" onclick="switchTab('grades','overview')">Vue d'ensemble</button>
        <button class="tab-btn" data-group="grades" data-tab="byclass" onclick="switchTab('grades','byclass')">Par classe</button>
        <button class="tab-btn" data-group="grades" data-tab="bystudent" onclick="switchTab('grades','bystudent')">Par élève</button>
        <button class="tab-btn" data-group="grades" data-tab="analytics" onclick="switchTab('grades','analytics')">Analytique</button>
      </div>

      <div id="tab_overview" class="tab-content active" data-group="grades">
        <div class="stats-grid mb-24">
          <div class="stat-card"><div class="stat-icon bg-emerald"><i class="fas fa-star"></i></div><div class="stat-info"><div class="stat-value">13.8</div><div class="stat-label">Moyenne générale</div></div></div>
          <div class="stat-card"><div class="stat-icon bg-indigo"><i class="fas fa-trophy"></i></div><div class="stat-info"><div class="stat-value">17.2</div><div class="stat-label">Meilleure note</div></div></div>
          <div class="stat-card"><div class="stat-icon bg-rose"><i class="fas fa-arrow-down"></i></div><div class="stat-info"><div class="stat-value">9.4</div><div class="stat-label">Note la plus basse</div></div></div>
          <div class="stat-card"><div class="stat-icon bg-amber"><i class="fas fa-chart-line"></i></div><div class="stat-info"><div class="stat-value">78%</div><div class="stat-label">Taux de réussite</div></div></div>
        </div>
        <div class="grid-2">
          <div class="card">
            <div class="card-header"><div class="card-title"><i class="fas fa-chart-bar"></i> Moyennes par matière</div></div>
            <div class="card-body"><div class="chart-box" style="height:250px"><canvas id="subjectChart"></canvas></div></div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-title"><i class="fas fa-list"></i> Classement – 3ème A</div></div>
            <div class="card-body" style="padding:0">
              <table>
                <thead><tr><th>Rang</th><th>Élève</th><th>Moy.</th><th>Mention</th></tr></thead>
                <tbody>
                  ${DATA.students.sort((a,b)=>b.avg-a.avg).map((s,i)=>`
                    <tr>
                      <td><span class="font-bold" style="color:${i<3?'var(--warning)':'var(--text-muted)'}">
                        ${i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${i+1}`}
                      </span></td>
                      <td><div class="flex-center gap-8"><div class="avatar sm" style="background:${avatarColor(s.name)}">${s.photo}</div>${s.name}</div></td>
                      <td><span class="font-bold ${gradeColor(s.avg)}">${s.avg}</span></td>
                      <td><span class="chip ${mentionClass(s.avg)}">${mention(s.avg)}</span></td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div id="tab_bystudent" class="tab-content" data-group="grades">
        <div class="card">
          <div class="card-header">
            <div class="card-title">Notes de Yasmine Benali – 3ème A</div>
            <select class="btn btn-secondary btn-sm" style="border:none">
              ${DATA.students.map(s=>`<option>${s.name}</option>`).join('')}
            </select>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Matière</th><th>Coeff.</th><th>Contrôle 1</th><th>Contrôle 2</th><th>Contrôle 3</th><th>Moyenne</th><th>Appréciation</th></tr></thead>
              <tbody>
                ${DATA.grades.e1.map(g=>`
                  <tr>
                    <td class="font-semibold">${g.subject}</td>
                    <td class="text-center">${g.coeff}</td>
                    <td class="text-center"><span class="font-bold ${gradeColor(g.t1)}">${g.t1}</span></td>
                    <td class="text-center"><span class="font-bold ${gradeColor(g.t2)}">${g.t2}</span></td>
                    <td class="text-center"><span class="font-bold ${gradeColor(g.t3)}">${g.t3}</span></td>
                    <td class="text-center">
                      <div class="grade-circle" style="margin:0 auto;background:${gradeHex(g.avg)+'22'};color:${gradeHex(g.avg)}">
                        ${g.avg.toFixed(1)}
                      </div>
                    </td>
                    <td class="text-muted text-sm">${appreciationText(g.avg)}</td>
                  </tr>`).join('')}
                <tr style="background:var(--surface2)">
                  <td colspan="5" class="font-bold">Moyenne Générale</td>
                  <td class="text-center"><div class="grade-circle" style="margin:0 auto;background:rgba(79,70,229,0.1);color:var(--primary);font-size:1rem">14.8</div></td>
                  <td><span class="chip chip-success">Très Bien</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="tab_byclass" class="tab-content" data-group="grades">
        <div class="card">
          <div class="card-header"><div class="card-title">Résultats – Toutes classes</div></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Classe</th><th>Effectif</th><th>Moy. classe</th><th>Meilleure</th><th>Plus basse</th><th>% Réussite</th><th>Tendance</th></tr></thead>
              <tbody>
                ${DATA.classes.map(c => `
                  <tr>
                    <td class="font-semibold">${c.name}</td>
                    <td>${c.students}</td>
                    <td><span class="font-bold text-success">13.5</span></td>
                    <td class="text-success">18.0</td>
                    <td class="text-danger">6.5</td>
                    <td><div class="progress-bar" style="width:80px;display:inline-block"><div class="progress-fill" style="width:76%;background:var(--success)"></div></div> <span class="text-sm">76%</span></td>
                    <td><span class="trend-up"><i class="fas fa-arrow-up"></i> +0.5</span></td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="tab_analytics" class="tab-content" data-group="grades">
        <div class="grid-2">
          <div class="card"><div class="card-header"><div class="card-title"><i class="fas fa-chart-line"></i> Évolution trimestrielle</div></div>
          <div class="card-body"><div class="chart-box" style="height:250px"><canvas id="evolutionChart"></canvas></div></div></div>
          <div class="card"><div class="card-header"><div class="card-title"><i class="fas fa-chart-pie"></i> Distribution des mentions</div></div>
          <div class="card-body"><div class="chart-box" style="height:250px"><canvas id="mentionsChart"></canvas></div></div></div>
        </div>
      </div>
    </div>`,

  // ========== BULLETINS ==========
  bulletins: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Bulletins Scolaires</h1>
          <p class="page-subtitle">Trimestre 1 – Publication le 1er Décembre 2025</p>
        </div>
        <div class="flex gap-8">
          <button class="btn btn-secondary btn-sm" onclick="openBulletinTemplateModal()"><i class="fas fa-file-import"></i> Importer format</button>
          <button class="btn btn-secondary btn-sm"><i class="fas fa-filter"></i> Filtrer</button>
          <button class="btn btn-primary" onclick="showToast('success','Tous les bulletins générés !')"><i class="fas fa-magic"></i> Générer tous</button>
        </div>
      </div>

      <div class="stats-grid mb-24">
        <div class="stat-card"><div class="stat-icon bg-emerald"><i class="fas fa-check-circle"></i></div><div class="stat-info"><div class="stat-value">815</div><div class="stat-label">Bulletins validés</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-amber"><i class="fas fa-clock"></i></div><div class="stat-info"><div class="stat-value">32</div><div class="stat-label">En attente</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-rose"><i class="fas fa-times"></i></div><div class="stat-info"><div class="stat-value">0</div><div class="stat-label">Non générés</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-indigo"><i class="fas fa-paper-plane"></i></div><div class="stat-info"><div class="stat-value">800</div><div class="stat-label">Envoyés aux parents</div></div></div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-list"></i> Liste des bulletins</div>
            <select class="btn btn-secondary btn-sm" style="border:none">
              ${DATA.classes.map(c=>`<option>${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>Élève</th><th>Classe</th><th>Moy.</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                ${DATA.students.map((s,i)=>{
                  const statuses = ['Validé','Validé','En attente','Validé','Validé','En attente','Validé','Validé'];
                  return `<tr>
                    <td><div class="flex-center gap-8"><div class="avatar sm" style="background:${avatarColor(s.name)}">${s.photo}</div>${s.name}</div></td>
                    <td><span class="chip chip-secondary">${s.class}</span></td>
                    <td><span class="font-bold ${gradeColor(s.avg)}">${s.avg}</span></td>
                    <td><span class="chip ${statuses[i]==='Validé'?'chip-success':'chip-warning'}">${statuses[i]}</span></td>
                    <td>
                      <div class="flex gap-8">
                        <button class="btn btn-xs btn-primary" onclick="showBulletinDetail('${s.id}')"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-xs btn-secondary" onclick="printBulletin('${s.name}')"><i class="fas fa-print"></i></button>
                        <button class="btn btn-xs btn-success" onclick="showToast('success','Bulletin envoyé aux parents')"><i class="fas fa-paper-plane"></i></button>
                      </div>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- BULLETIN PREVIEW -->
        <div>
          <div class="bulletin-card">
            <div class="bulletin-header">
              <div class="bulletin-school">${DATA.school.name}</div>
              <div class="bulletin-period">Bulletin Scolaire – Trimestre 1 (2025-2026)</div>
              <div class="bulletin-student">
                Élève : <strong>Yasmine Benali</strong> | Classe : <strong>3ème A</strong>
                <div style="margin-top:4px;font-size:0.8rem;opacity:0.8">Rang : 1er/28 • Absences : 2j • Retards : 1</div>
              </div>
            </div>
            <div style="padding:0">
              <div style="padding:10px 16px;background:var(--surface2);font-weight:700;font-size:0.8rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between">
                <span>MATIÈRE</span><span>MOY. ÉLÈVE</span>
              </div>
              ${DATA.grades.e1.map(g=>`
                <div class="subject-row">
                  <div>
                    <div class="subject-name">${g.subject}</div>
                    <div class="text-xs text-muted">${g.teacher} • Coeff. ${g.coeff}</div>
                  </div>
                  <div class="text-right">
                    <div class="subject-grade" style="color:${gradeHex(g.avg)}">${g.avg.toFixed(1)}/20</div>
                    <div class="text-xs text-muted">${appreciationText(g.avg)}</div>
                  </div>
                </div>`).join('')}
            </div>
            <div class="bulletin-summary">
              <div class="flex-between mb-8">
                <span class="font-bold">Moyenne générale :</span>
                <span class="font-bold" style="font-size:1.2rem;color:var(--primary)">14.8 / 20</span>
              </div>
              <div class="flex-between mb-8">
                <span class="text-sm text-muted">Mention :</span>
                <span class="chip chip-success">Très Bien</span>
              </div>
              <div style="padding:10px;background:rgba(79,70,229,0.08);border-radius:var(--radius-sm);font-size:0.82rem;font-style:italic;color:var(--text)">
                "Élève très sérieuse, résultats excellents. Continuez ainsi !" — Le Conseil de Classe
              </div>
            </div>
          </div>
          <div class="flex gap-8 mt-12">
            <button class="btn btn-primary w-full" onclick="printBulletin('Yasmine Benali')"><i class="fas fa-print"></i> Imprimer</button>
            <button class="btn btn-secondary w-full" onclick="downloadBulletin('Yasmine Benali')"><i class="fas fa-download"></i> Télécharger PDF</button>
          </div>
        </div>
      </div>
    </div>`,

  // ========== MESSAGING ==========
  messaging: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Messagerie Interne</h1>
          <p class="page-subtitle">Communication école — parents — professeurs</p>
        </div>
        <button class="btn btn-primary" onclick="openNewMessageModal()"><i class="fas fa-pen"></i> Nouveau message</button>
      </div>

      <div class="grid-2">
        <!-- INBOX -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-inbox"></i> Boîte de réception</div>
            <span class="chip chip-danger">3 non lus</span>
          </div>
          <div style="border-top:1px solid var(--border)">
            ${DATA.messages.map(m=>`
              <div style="padding:14px 18px;border-bottom:1px solid var(--border);cursor:pointer;background:${!m.read?'rgba(79,70,229,0.04)':'none'};transition:var(--transition)" onclick="openMessageModal('${m.from}')" class="message-row">
                <div class="flex-between mb-4">
                  <div class="flex-center gap-8">
                    ${!m.read?'<div style="width:8px;height:8px;border-radius:50%;background:var(--primary);flex-shrink:0"></div>':'<div style="width:8px"></div>'}
                    <span class="font-semibold ${!m.read?'':'text-muted'}" style="font-size:0.875rem">${m.from}</span>
                  </div>
                  <span class="text-xs text-muted">${m.time}</span>
                </div>
                <div class="font-semibold text-sm" style="padding-left:16px">${m.subject}</div>
                <div class="text-xs text-muted" style="padding-left:16px;margin-top:2px">${m.preview}</div>
              </div>`).join('')}
          </div>
        </div>

        <!-- CHAT -->
        <div class="card" style="display:flex;flex-direction:column">
          <div class="card-header">
            <div class="flex-center gap-12">
              <div class="avatar sm" style="background:var(--primary)">S</div>
              <div>
                <div class="card-title">Mme Sophie Martin</div>
                <div class="text-xs text-success">● En ligne</div>
              </div>
            </div>
            <button class="btn btn-xs btn-secondary"><i class="fas fa-phone"></i></button>
          </div>
          <div class="msg-list">
            <div class="msg-bubble recv">Bonjour, je voulais vous informer que Yasmine a obtenu 16/20 à son dernier contrôle de mathématiques. 🎉</div>
            <div class="msg-bubble sent">Bonjour Mme Martin ! Merci pour l'information, c'est une excellente nouvelle !</div>
            <div class="msg-bubble recv">Effectivement, elle travaille très bien. Je l'encourage à continuer ainsi.</div>
            <div class="msg-bubble sent">Nous en sommes très contents. Y a-t-il des points à améliorer ?</div>
            <div class="msg-bubble recv">Elle pourrait développer davantage ses commentaires en géométrie, mais globalement c'est très satisfaisant.</div>
          </div>
          <div class="msg-input">
            <input type="text" placeholder="Écrire un message..." onkeydown="if(event.key==='Enter') sendMessage()" />
            <button onclick="sendMessage()"><i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    </div>`,

  // ========== ANNOUNCEMENTS ==========
  announcements: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Annonces & Informations</h1>
          <p class="page-subtitle">Communication vers les élèves, parents et professeurs</p>
        </div>
        <button class="btn btn-primary" onclick="openAddAnnouncementModal()"><i class="fas fa-bullhorn"></i> Nouvelle annonce</button>
      </div>
      <div class="grid-2">
        ${[
          { icon:"fa-graduation-cap", color:"bg-indigo", title:"Réunion Parents-Professeurs", date:"25 Nov 2025", text:"La réunion parents-professeurs aura lieu le jeudi 25 novembre à partir de 18h00 en salle polyvalente. La présence de tous les parents est vivement souhaitée.", audience:"Tous les parents", urgent: true },
          { icon:"fa-file-alt", color:"bg-emerald", title:"Distribution des bulletins T1", date:"1 Déc 2025", text:"Les bulletins du premier trimestre seront disponibles à partir du 1er décembre. Les parents pourront les consulter directement sur l'espace numérique.", audience:"Tous", urgent: false },
          { icon:"fa-bus", color:"bg-amber", title:"Sortie scolaire – Musée d'Orsay", date:"5 Déc 2025", text:"Une sortie pédagogique est organisée pour les classes de 3ème. Merci de retourner l'autorisation signée avant le 30 novembre.", audience:"Classes 3ème", urgent: false },
          { icon:"fa-exclamation", color:"bg-rose", title:"Fermeture exceptionnelle", date:"11 Nov 2025", text:"L'établissement sera fermé le 11 novembre à l'occasion du jour férié. Les cours reprendront normalement le 12 novembre.", audience:"Tous", urgent: true }
        ].map(a=>`
          <div class="card">
            <div style="height:4px;background:${a.urgent?'var(--danger)':'var(--success)'}"></div>
            <div class="card-body">
              <div class="flex-between mb-12">
                <div class="flex-center gap-10">
                  <div class="stat-icon ${a.color}" style="width:38px;height:38px;font-size:0.85rem"><i class="fas ${a.icon}"></i></div>
                  <div>
                    <div class="font-bold">${a.title}</div>
                    <div class="text-xs text-muted">${a.date}</div>
                  </div>
                </div>
                ${a.urgent?'<span class="chip chip-danger">Urgent</span>':'<span class="chip chip-success">Info</span>'}
              </div>
              <p class="text-sm text-muted mb-12">${a.text}</p>
              <div class="flex-between">
                <span class="chip chip-secondary text-xs"><i class="fas fa-users"></i> ${a.audience}</span>
                <div class="flex gap-8">
                  <button class="btn btn-xs btn-secondary"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-xs btn-danger" onclick="deleteItem('annonce','${a.title}')"><i class="fas fa-trash"></i></button>
                </div>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>`,

  // ========== ADMIN ==========
  admin: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Administration</h1>
          <p class="page-subtitle">Gestion complète de l'établissement</p>
        </div>
      </div>
      <div class="tabs">
        <button class="tab-btn active" data-group="admin" data-tab="general" onclick="switchTab('admin','general')">Établissement</button>
        <button class="tab-btn" data-group="admin" data-tab="staff" onclick="switchTab('admin','staff')">Personnel admin.</button>
        <button class="tab-btn" data-group="admin" data-tab="finance" onclick="switchTab('admin','finance')">Finances</button>
        <button class="tab-btn" data-group="admin" data-tab="docs" onclick="switchTab('admin','docs')">Documents</button>
      </div>

      <div id="tab_general" class="tab-content active" data-group="admin">
        <div class="grid-2 mb-24">
          <div class="card">
            <div class="card-header"><div class="card-title"><i class="fas fa-school"></i> Informations établissement</div>
              <button class="btn btn-xs btn-primary" onclick="saveSchoolInfo()"><i class="fas fa-save"></i></button>
            </div>
            <div class="card-body">
              ${[
                ["Nom de l'établissement", DATA.school.name, "schoolName"],
                ["Directeur", DATA.school.director, "schoolDirector"],
                ["Année scolaire", DATA.school.year, "schoolYear"],
                ["Ville", DATA.school.city, "schoolCity"],
                ["Email", DATA.school.email, "schoolEmail"],
                ["Téléphone", DATA.school.phone, "schoolPhone"]
              ].map(([l,v,id])=>`
                <div class="form-group">
                  <label>${l}</label>
                  <input type="text" id="${id}" value="${v}" />
                </div>`).join('')}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-title"><i class="fas fa-calendar"></i> Calendrier scolaire</div></div>
            <div class="card-body">
              ${[
                ["Rentrée scolaire","2 Septembre 2025"],
                ["Vacances Toussaint","18 Oct – 3 Nov 2025"],
                ["Fin T1 / Bulletins","5 Déc 2025"],
                ["Vacances Noël","20 Déc 2025 – 5 Jan 2026"],
                ["Vacances Hiver","14 Fév – 2 Mar 2026"],
                ["Fin T2 / Bulletins","16 Mar 2026"],
                ["Vacances Printemps","11 Avr – 27 Avr 2026"],
                ["Fin d'année scolaire","3 Juillet 2026"]
              ].map(([e,d])=>`
                <div class="flex-between" style="padding:8px 0;border-bottom:1px solid var(--border)">
                  <span class="text-sm font-semibold">${e}</span>
                  <span class="text-sm text-muted">${d}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>
        <div class="grid-4">
          ${[
            { label:"Capacité max", value:"1000 élèves", icon:"fa-users", color:"bg-indigo" },
            { label:"Salles de classe", value:"32 salles", icon:"fa-door-open", color:"bg-emerald" },
            { label:"Laboratories", value:"4 labos", icon:"fa-flask", color:"bg-cyan" },
            { label:"Bibliothèque", value:"1 (15000 ouvrages)", icon:"fa-book", color:"bg-purple" }
          ].map(s=>`
            <div class="stat-card">
              <div class="stat-icon ${s.color}"><i class="fas ${s.icon}"></i></div>
              <div class="stat-info"><div class="stat-value" style="font-size:1.1rem">${s.value}</div><div class="stat-label">${s.label}</div></div>
            </div>`).join('')}
        </div>
      </div>

      <div id="tab_staff" class="tab-content" data-group="admin">
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-users-cog"></i> Personnel administratif</div>
            <button class="btn btn-primary btn-sm" onclick="openAddAdminStaffModal()"><i class="fas fa-plus"></i> Ajouter</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Nom</th><th>Poste</th><th>Email</th><th>Téléphone</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                ${[
                  { name:"Bernard Leclerc", post:"Directeur", email:"b.leclerc@edusmart.fr", phone:"06 11 22 33 44", active:true },
                  { name:"Marie Dubois", post:"Secrétaire principale", email:"m.dubois@edusmart.fr", phone:"06 22 33 44 55", active:true },
                  { name:"Robert Klein", post:"Gestionnaire financier", email:"r.klein@edusmart.fr", phone:"06 33 44 55 66", active:true },
                  { name:"Isabelle Morin", post:"CPE", email:"i.morin@edusmart.fr", phone:"06 44 55 66 77", active:true },
                  { name:"Patrick Garnier", post:"Agent de maintenance", email:"p.garnier@edusmart.fr", phone:"06 55 66 77 88", active:false }
                ].map(s=>`<tr>
                  <td class="font-semibold">${s.name}</td>
                  <td>${s.post}</td>
                  <td class="text-muted text-sm">${s.email}</td>
                  <td class="text-muted text-sm">${s.phone}</td>
                  <td><span class="chip ${s.active?'chip-success':'chip-warning'}">${s.active?'Actif':'Inactif'}</span></td>
                  <td><div class="flex gap-8">
                    <button class="btn btn-xs btn-secondary" onclick="editAdminStaff('${s.name}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-xs btn-danger" onclick="deleteAdminStaff('${s.name}')"><i class="fas fa-trash"></i></button>
                  </div></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="tab_finance" class="tab-content" data-group="admin">
        <div class="stats-grid mb-24">
          <div class="stat-card"><div class="stat-icon bg-emerald"><i class="fas fa-coins"></i></div><div class="stat-info"><div class="stat-value">489 500 000 FCFA</div><div class="stat-label">Budget annuel</div></div></div>
          <div class="stat-card"><div class="stat-icon bg-indigo"><i class="fas fa-arrow-down"></i></div><div class="stat-info"><div class="stat-value">185 200 000 FCFA</div><div class="stat-label">Dépenses YTD</div></div></div>
          <div class="stat-card"><div class="stat-icon bg-amber"><i class="fas fa-arrow-up"></i></div><div class="stat-info"><div class="stat-value">112 100 000 FCFA</div><div class="stat-label">Recettes YTD</div></div></div>
          <div class="stat-card"><div class="stat-icon bg-cyan"><i class="fas fa-piggy-bank"></i></div><div class="stat-info"><div class="stat-value">304 300 000 FCFA</div><div class="stat-label">Solde disponible</div></div></div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-chart-bar"></i> Répartition du budget</div></div>
          <div class="card-body"><div class="chart-box" style="height:250px"><canvas id="budgetChart"></canvas></div></div>
        </div>
      </div>

      <div id="tab_docs" class="tab-content" data-group="admin">
        <div class="card mb-24">
          <div class="card-header"><div class="card-title"><i class="fas fa-folder-open"></i> Documents de l'école</div></div>
        </div>
        <div class="grid-3">
          ${[
            { icon:"fa-file-pdf", name:"Règlement intérieur", date:"Sept 2025", color:"bg-rose" },
            { icon:"fa-file-pdf", name:"PV Conseil de classe", date:"Nov 2025", color:"bg-rose" },
            { icon:"fa-file-alt", name:"Planning annuel", date:"Sept 2025", color:"bg-amber" }
          ].map(d=>`
            <div class="card" style="cursor:pointer">
              <div class="card-body text-center">
                <div class="stat-icon ${d.color}" style="width:54px;height:54px;font-size:1.5rem;margin:0 auto 12px"><i class="fas ${d.icon}"></i></div>
                <div class="font-semibold">${d.name}</div>
                <div class="text-xs text-muted mt-8">${d.date}</div>
                <div class="flex gap-8 mt-12 justify-center">
                  <button class="btn btn-xs btn-secondary" onclick="printDocument('${d.name}')"><i class="fas fa-print"></i> Imprimer</button>
                  <button class="btn btn-xs btn-primary" onclick="openImportDocumentModal()"><i class="fas fa-upload"></i> Importer</button>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>`,

  // ========== REPORTS ==========
  reports: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Rapports & Statistiques</h1>
          <p class="page-subtitle">Tableau analytique – Année scolaire ${DATA.school.year}</p>
        </div>
        <div class="flex gap-8">
          <select class="btn btn-secondary" style="padding:10px 14px">
            <option>Toute l'année</option>
            <option>Trimestre 1</option>
            <option>Trimestre 2</option>
          </select>
          <button class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Exporter rapport</button>
        </div>
      </div>

      <div class="stats-grid mb-24">
        <div class="stat-card"><div class="stat-icon bg-indigo"><i class="fas fa-user-graduate"></i></div><div class="stat-info"><div class="stat-value">847</div><div class="stat-label">Total élèves</div><div class="stat-trend trend-up"><i class="fas fa-arrow-up"></i> +1.5%</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-emerald"><i class="fas fa-check"></i></div><div class="stat-info"><div class="stat-value">78%</div><div class="stat-label">Taux de réussite</div><div class="stat-trend trend-up"><i class="fas fa-arrow-up"></i> +3%</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-amber"><i class="fas fa-calendar-check"></i></div><div class="stat-info"><div class="stat-value">95.2%</div><div class="stat-label">Présence moy.</div><div class="stat-trend trend-down"><i class="fas fa-arrow-down"></i> -0.3%</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-cyan"><i class="fas fa-star"></i></div><div class="stat-info"><div class="stat-value">13.8</div><div class="stat-label">Moyenne générale</div><div class="stat-trend trend-up"><i class="fas fa-arrow-up"></i> +0.4</div></div></div>
      </div>

      <div class="grid-2 mb-24">
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-chart-line"></i> Évolution des inscriptions</div></div>
          <div class="card-body"><div class="chart-box" style="height:220px"><canvas id="enrollmentChart"></canvas></div></div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-chart-bar"></i> Présences mensuelles</div></div>
          <div class="card-body"><div class="chart-box" style="height:220px"><canvas id="monthlyChart"></canvas></div></div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-chart-pie"></i> Répartition par niveau</div></div>
          <div class="card-body"><div class="chart-box" style="height:220px"><canvas id="levelChart"></canvas></div></div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-chart-bar"></i> Performances par matière</div></div>
          <div class="card-body"><div class="chart-box" style="height:220px"><canvas id="perfChart"></canvas></div></div>
        </div>
      </div>
    </div>`,

  // ========== AGENDA ==========
  agenda: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Agenda Scolaire</h1>
          <p class="page-subtitle">Novembre 2025</p>
        </div>
        <button class="btn btn-primary" onclick="openAddEventModal()"><i class="fas fa-plus"></i> Ajouter événement</button>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-calendar"></i> Calendrier</div></div>
          <div class="card-body" style="padding:0">
            <div class="mini-calendar">
              <div class="cal-header">
                <button onclick="showToast('info','Mois précédent')"><i class="fas fa-chevron-left"></i></button>
                <span style="font-weight:700">Novembre 2025</span>
                <button onclick="showToast('info','Mois suivant')"><i class="fas fa-chevron-right"></i></button>
              </div>
              <div class="cal-grid">
                ${['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map(d=>`<div class="sch-header" style="font-size:0.72rem">${d}</div>`).join('')}
                ${[...Array(4)].map(()=>`<div class="cal-day other-month"></div>`).join('')}
                ${[...Array(30)].map((_,i)=>{
                  const day = i+1;
                  const isToday = day === 24;
                  const hasEvent = [25,28].includes(day);
                  return `<div class="cal-day ${isToday?'today':''} ${hasEvent?'has-event':''}" onclick="showToast('info','${day} Novembre 2025')">${day}</div>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-list"></i> Événements à venir</div></div>
          <div class="card-body">
            ${DATA.events.map(e=>`
              <div style="display:flex;gap:14px;padding:12px;background:var(--bg);border-radius:var(--radius-sm);margin-bottom:10px">
                <div class="stat-icon ${eventColor(e.type)}" style="width:42px;height:42px;flex-shrink:0">
                  <i class="fas ${eventIcon(e.type)}"></i>
                </div>
                <div style="flex:1">
                  <div class="font-semibold text-sm">${e.title}</div>
                  <div class="text-xs text-muted">${formatDate(e.date)}</div>
                </div>
                <button class="btn btn-xs btn-danger" onclick="deleteItem('événement','${e.title}')"><i class="fas fa-times"></i></button>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`,

  // ========== SETTINGS ==========
  settings: () => `
    <div class="section-page">
      <div class="page-header">
        <h1 class="page-title">Paramètres</h1>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-paint-brush"></i> Apparence</div></div>
          <div class="card-body">
            <div class="form-group"><label>Thème</label>
              <select id="themeSelect" onchange="changeTheme(this.value)">
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
              </select>
            </div>
            <div class="form-group"><label>Couleur principale</label>
              <div class="flex gap-8">
                ${['#4F46E5','#06B6D4','#10B981','#F59E0B','#EF4444','#8B5CF6'].map(c=>`<div style="width:32px;height:32px;border-radius:50%;background:${c};cursor:pointer;transition:var(--transition);border:2px solid transparent" onclick="changePrimaryColor('${c}')" title="${c}"></div>`).join('')}
              </div>
            </div>
            <div class="form-group"><label>Langue</label>
              <select id="languageSelect" onchange="changeLanguage(this.value)">
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-bell"></i> Notifications</div></div>
          <div class="card-body">
            ${[
              {id: "absences", label: "Nouvelles absences"},
              {id: "bulletins", label: "Nouveaux bulletins"},
              {id: "messages", label: "Messages reçus"},
              {id: "events", label: "Réunions et événements"},
              {id: "results", label: "Alertes de résultats"},
              {id: "inscriptions", label: "Inscriptions"}
            ].map(n=>`
              <div class="flex-between mb-12">
                <span class="text-sm font-semibold">${n.label}</span>
                <label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer">
                  <input type="checkbox" id="notif-${n.id}" checked style="opacity:0;width:0;height:0" onchange="toggleNotification('${n.id}', this.checked)" />
                  <span class="toggle-slider">
                    <span class="toggle-knob"></span>
                  </span>
                </label>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`,

  // ========== PARENT DASHBOARD ==========
  parent_dashboard: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Espace Parent</h1>
          <p class="page-subtitle">Suivi de votre enfant en temps réel</p>
        </div>
        <button class="btn btn-primary" onclick="showSection('messaging')"><i class="fas fa-envelope"></i> Contacter l'école</button>
      </div>

      <!-- CHILD CARD -->
      <div class="child-card">
        <div class="flex-between flex-wrap" style="gap:16px">
          <div class="flex-center gap-16">
            <div class="avatar" style="width:60px;height:60px;font-size:1.5rem;background:rgba(255,255,255,0.2)">Y</div>
            <div>
              <div class="child-name">Yasmine Benali</div>
              <div class="child-class">3ème A • Lycée International EduSmart</div>
              <div style="margin-top:6px;font-size:0.8rem;opacity:0.8">Professeur principal : Mme Sophie Martin</div>
            </div>
          </div>
          <div class="child-stats">
            <div class="child-stat"><div class="val">14.8</div><div class="lbl">Moyenne</div></div>
            <div class="child-stat"><div class="val">1er</div><div class="lbl">Rang</div></div>
            <div class="child-stat"><div class="val">2</div><div class="lbl">Absences</div></div>
            <div class="child-stat"><div class="val">92%</div><div class="lbl">Présence</div></div>
          </div>
        </div>
      </div>

      <!-- QUICK STATS -->
      <div class="stats-grid mb-24">
        <div class="stat-card" onclick="showSection('parent_grades')">
          <div class="stat-icon bg-indigo"><i class="fas fa-star"></i></div>
          <div class="stat-info"><div class="stat-value">14.8</div><div class="stat-label">Moyenne générale T1</div>
            <div class="stat-trend trend-up"><i class="fas fa-arrow-up"></i> +0.8 vs T0</div>
          </div>
        </div>
        <div class="stat-card" onclick="showSection('parent_attendance')">
          <div class="stat-icon bg-emerald"><i class="fas fa-calendar-check"></i></div>
          <div class="stat-info"><div class="stat-value">92%</div><div class="stat-label">Taux de présence</div>
            <div class="stat-trend trend-up"><i class="fas fa-check"></i> Régulière</div>
          </div>
        </div>
        <div class="stat-card" onclick="showSection('parent_bulletin')">
          <div class="stat-icon bg-amber"><i class="fas fa-file-alt"></i></div>
          <div class="stat-info"><div class="stat-value">Disponible</div><div class="stat-label">Bulletin T1</div>
            <div class="stat-trend" style="color:var(--primary)"><i class="fas fa-download"></i> Télécharger</div>
          </div>
        </div>
        <div class="stat-card" onclick="showSection('messaging')">
          <div class="stat-icon bg-rose"><i class="fas fa-envelope"></i></div>
          <div class="stat-info"><div class="stat-value">2</div><div class="stat-label">Messages non lus</div>
            <div class="stat-trend trend-down"><i class="fas fa-bell"></i> Nouveau</div>
          </div>
        </div>
      </div>

      <!-- DETAILS ROW -->
      <div class="grid-2 mb-24">
        <!-- RECENT GRADES -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-star text-warning"></i> Dernières notes</div>
            <button class="btn btn-secondary btn-sm" onclick="showSection('parent_grades')">Toutes les notes</button>
          </div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>Matière</th><th>Note</th><th>Classe</th><th>Appréciation</th></tr></thead>
              <tbody>
                ${DATA.grades.e1.map(g=>`
                  <tr>
                    <td class="font-semibold">${g.subject}</td>
                    <td><div class="grade-circle" style="background:${gradeHex(g.avg)+'22'};color:${gradeHex(g.avg)};font-size:0.9rem">${g.avg.toFixed(1)}</div></td>
                    <td class="text-muted text-sm">13.8</td>
                    <td><span class="chip ${mentionClass(g.avg)}">${mention(g.avg)}</span></td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- ATTENDANCE TIMELINE -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="fas fa-calendar-check text-success"></i> Présences – Novembre</div>
            <button class="btn btn-secondary btn-sm" onclick="showSection('parent_attendance')">Détail</button>
          </div>
          <div class="card-body">
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">
              ${Object.entries(DATA.attendance.e1).map(([d,s])=>`
                <div class="att-dot att-${s}" title="${d} : ${s}" onclick="showToast('info','${d} : ${s==='present'?'Présente':s==='absent'?'Absente':'En retard'}')">${d.slice(-2)}</div>
              `).join('')}
            </div>
            <div class="flex gap-12">
              <div class="flex-center gap-6"><div class="att-dot att-present" style="width:18px;height:18px">P</div><span class="text-xs text-muted">Présent</span></div>
              <div class="flex-center gap-6"><div class="att-dot att-absent" style="width:18px;height:18px">A</div><span class="text-xs text-muted">Absent</span></div>
              <div class="flex-center gap-6"><div class="att-dot att-late" style="width:18px;height:18px">R</div><span class="text-xs text-muted">Retard</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- MESSAGES & EVENTS -->
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-envelope text-primary"></i> Messages récents</div>
            <button class="btn btn-secondary btn-sm" onclick="showSection('messaging')">Voir tout</button>
          </div>
          <div style="border-top:1px solid var(--border)">
            ${DATA.messages.slice(0,3).map(m=>`
              <div style="padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer" onclick="showSection('messaging')">
                <div class="flex-between mb-4">
                  <span class="font-semibold text-sm ${!m.read?'':'text-muted'}">${m.from}</span>
                  <span class="text-xs text-muted">${m.time}</span>
                </div>
                <div class="text-xs text-muted">${m.preview.slice(0,60)}...</div>
              </div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-calendar text-warning"></i> Prochains événements</div></div>
          <div class="card-body">
            ${DATA.events.slice(0,4).map(e=>`
              <div class="flex-center gap-10 mb-10">
                <div class="stat-icon ${eventColor(e.type)}" style="width:34px;height:34px;font-size:0.8rem;flex-shrink:0"><i class="fas ${eventIcon(e.type)}"></i></div>
                <div>
                  <div class="font-semibold text-sm">${e.title}</div>
                  <div class="text-xs text-muted">${formatDate(e.date)}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`,

  // ========== PARENT ATTENDANCE ==========
  parent_attendance: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Présences – Yasmine Benali</h1>
          <p class="page-subtitle">Suivi détaillé des présences • 3ème A</p>
        </div>
        <button class="btn btn-primary" onclick="showSection('messaging')"><i class="fas fa-envelope"></i> Justifier une absence</button>
      </div>

      <div class="stats-grid mb-24">
        <div class="stat-card"><div class="stat-icon bg-emerald"><i class="fas fa-check-circle"></i></div><div class="stat-info"><div class="stat-value">12</div><div class="stat-label">Jours présente</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-rose"><i class="fas fa-times-circle"></i></div><div class="stat-info"><div class="stat-value">2</div><div class="stat-label">Absences</div><div class="stat-trend trend-down">1 non justifiée</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-amber"><i class="fas fa-clock"></i></div><div class="stat-info"><div class="stat-value">1</div><div class="stat-label">Retard</div></div></div>
        <div class="stat-card"><div class="stat-icon bg-indigo"><i class="fas fa-percentage"></i></div><div class="stat-info"><div class="stat-value">92.3%</div><div class="stat-label">Taux présence</div></div></div>
      </div>

      <div class="grid-2 mb-24">
        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-calendar"></i> Novembre 2025</div></div>
          <div class="card-body">
            <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:16px">
              ${['L','M','M','J','V','S','D'].map(d=>`<div class="text-center text-xs font-bold text-muted">${d}</div>`).join('')}
              ${[...Array(2)].map(()=>`<div></div>`).join('')}
              ${[...Array(30)].map((_,i)=>{
                const day = String(i+1).padStart(2,'0');
                const key = `2025-11-${day}`;
                const st = DATA.attendance.e1[key];
                return `<div class="att-dot ${st?'att-'+st:'att-empty'}" style="width:100%;border-radius:6px;aspect-ratio:1" onclick="showToast('info','${key}: ${st||'Pas école'}')">${day}</div>`;
              }).join('')}
            </div>
            <div class="flex gap-16 flex-wrap">
              <div class="flex-center gap-6"><div class="att-dot att-present" style="width:24px;height:24px">P</div><span class="text-sm text-muted">Présente (12)</span></div>
              <div class="flex-center gap-6"><div class="att-dot att-absent" style="width:24px;height:24px">A</div><span class="text-sm text-muted">Absente (2)</span></div>
              <div class="flex-center gap-6"><div class="att-dot att-late" style="width:24px;height:24px">R</div><span class="text-sm text-muted">Retard (1)</span></div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><div class="card-title"><i class="fas fa-list"></i> Détail des absences</div></div>
          <div class="card-body" style="padding:0">
            <table>
              <thead><tr><th>Date</th><th>Type</th><th>Statut</th><th>Action</th></tr></thead>
              <tbody>
                <tr>
                  <td>Mer. 5 Nov 2025</td>
                  <td><span class="chip chip-danger">Absence</span></td>
                  <td><span class="chip chip-success">Justifiée</span></td>
                  <td class="text-xs text-muted">Maladie</td>
                </tr>
                <tr>
                  <td>Lun. 18 Nov 2025</td>
                  <td><span class="chip chip-danger">Absence</span></td>
                  <td><span class="chip chip-warning">Non justifiée</span></td>
                  <td><button class="btn btn-xs btn-primary" onclick="showToast('success','Formulaire de justification envoyé')">Justifier</button></td>
                </tr>
                <tr>
                  <td>Ven. 7 Nov 2025</td>
                  <td><span class="chip chip-warning">Retard</span></td>
                  <td><span class="chip chip-success">Noté</span></td>
                  <td class="text-xs text-muted">Trajet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`,

  // ========== PARENT GRADES ==========
  parent_grades: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Notes – Yasmine Benali</h1>
          <p class="page-subtitle">Trimestre 1 • 3ème A • Année ${DATA.school.year}</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="showSection('parent_bulletin')"><i class="fas fa-file-alt"></i> Voir le bulletin</button>
      </div>

      <div class="child-card" style="background:linear-gradient(135deg,#059669,#10B981)">
        <div class="flex-center gap-16">
          <div style="text-align:center">
            <div style="font-size:3rem;font-weight:900;line-height:1">14.8</div>
            <div style="font-size:0.9rem;opacity:0.85">/20 – Moyenne générale</div>
          </div>
          <div style="flex:1;padding-left:24px;border-left:1px solid rgba(255,255,255,0.3)">
            <div style="font-size:1.1rem;font-weight:700;margin-bottom:8px">🏆 Rang : 1er/28 élèves</div>
            <div style="font-size:0.9rem;opacity:0.85;margin-bottom:4px">✅ Mention Très Bien</div>
            <div style="font-size:0.85rem;opacity:0.75">Progression : <strong>+0.8 pts</strong> depuis le trimestre précédent</div>
          </div>
        </div>
      </div>

      <div class="card mt-24">
        <div class="card-header">
          <div class="card-title"><i class="fas fa-table"></i> Détail des notes par matière</div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Matière</th><th>Professeur</th><th>Coeff.</th><th>Contrôle 1</th><th>Contrôle 2</th><th>Contrôle 3</th><th>Moyenne</th><th>Appréciation</th></tr></thead>
            <tbody>
              ${DATA.grades.e1.map(g=>`
                <tr>
                  <td class="font-bold">${g.subject}</td>
                  <td class="text-sm text-muted">${g.teacher}</td>
                  <td class="text-center text-muted">${g.coeff}</td>
                  <td class="text-center"><span class="${gradeColor(g.t1)} font-bold">${g.t1}/20</span></td>
                  <td class="text-center"><span class="${gradeColor(g.t2)} font-bold">${g.t2}/20</span></td>
                  <td class="text-center"><span class="${gradeColor(g.t3)} font-bold">${g.t3}/20</span></td>
                  <td class="text-center">
                    <div class="grade-circle" style="margin:0 auto;background:${gradeHex(g.avg)+'20'};color:${gradeHex(g.avg)}">${g.avg.toFixed(1)}</div>
                  </td>
                  <td><span class="chip ${mentionClass(g.avg)}">${mention(g.avg)}</span></td>
                </tr>`).join('')}
              <tr style="background:var(--surface2);font-weight:700">
                <td colspan="6" class="font-bold">MOYENNE GÉNÉRALE</td>
                <td class="text-center"><div class="grade-circle" style="margin:0 auto;background:rgba(79,70,229,0.15);color:var(--primary);font-size:1rem;font-weight:900">14.8</div></td>
                <td><span class="chip chip-success">Très Bien ✨</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card mt-24">
        <div class="card-header"><div class="card-title"><i class="fas fa-chart-radar"></i> Évolution par trimestre</div></div>
        <div class="card-body"><div class="chart-box" style="height:250px"><canvas id="parentGradesChart"></canvas></div></div>
      </div>
    </div>`,

  // ========== PARENT BULLETIN ==========
  parent_bulletin: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Bulletin – Yasmine Benali</h1>
          <p class="page-subtitle">Trimestre 1 • 3ème A</p>
        </div>
        <div class="flex gap-8">
          <button class="btn btn-secondary" onclick="printBulletin('Yasmine Benali')"><i class="fas fa-print"></i> Imprimer</button>
          <button class="btn btn-primary" onclick="downloadBulletin('Yasmine Benali')"><i class="fas fa-download"></i> Télécharger PDF</button>
        </div>
      </div>

      <div style="max-width:700px;margin:0 auto">
        <div class="bulletin-card">
          <div class="bulletin-header" style="padding:28px">
            <div style="font-size:0.9rem;opacity:0.8;margin-bottom:8px">BULLETIN OFFICIEL</div>
            <div class="bulletin-school" style="font-size:1.4rem">🎓 ${DATA.school.name}</div>
            <div class="bulletin-period" style="font-size:1rem;margin-top:6px">Bulletin Scolaire – Trimestre 1 | Année ${DATA.school.year}</div>
            <div style="margin-top:16px;padding:14px;background:rgba(255,255,255,0.15);border-radius:10px">
              <div class="flex-between flex-wrap" style="gap:12px">
                <div><div style="font-size:0.8rem;opacity:0.75">ÉLÈVE</div><div style="font-size:1.1rem;font-weight:800">Yasmine Benali</div></div>
                <div><div style="font-size:0.8rem;opacity:0.75">CLASSE</div><div style="font-size:1.1rem;font-weight:800">3ème A</div></div>
                <div><div style="font-size:0.8rem;opacity:0.75">RANG</div><div style="font-size:1.1rem;font-weight:800">1er / 28</div></div>
                <div><div style="font-size:0.8rem;opacity:0.75">ABSENCES</div><div style="font-size:1.1rem;font-weight:800">2 jours</div></div>
              </div>
            </div>
          </div>

          <div style="padding:0 20px">
            <div style="padding:10px 0;display:flex;justify-content:space-between;font-weight:700;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);border-bottom:2px solid var(--border)">
              <span>Matière</span>
              <div class="flex gap-16">
                <span>Moy. élève</span>
                <span>Moy. classe</span>
                <span>Mention</span>
              </div>
            </div>
            ${DATA.grades.e1.map(g=>`
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)">
                <div>
                  <div class="font-bold text-sm">${g.subject}</div>
                  <div class="text-xs text-muted">${g.teacher} • Coeff. ${g.coeff}</div>
                </div>
                <div class="flex gap-16 flex-center">
                  <div style="width:48px;text-align:center;font-size:1.1rem;font-weight:800;color:${gradeHex(g.avg)}">${g.avg.toFixed(1)}</div>
                  <div style="width:70px;text-align:center;color:var(--text-muted);font-size:0.875rem">13.8</div>
                  <span class="chip ${mentionClass(g.avg)}" style="min-width:80px;justify-content:center">${mention(g.avg)}</span>
                </div>
              </div>`).join('')}
          </div>

          <div style="padding:20px;background:var(--surface2);border-top:2px solid var(--border)">
            <div class="flex-between mb-12">
              <span class="font-bold" style="font-size:1rem">Moyenne générale :</span>
              <span style="font-size:1.6rem;font-weight:900;color:var(--primary)">14.8 / 20</span>
            </div>
            <div class="flex gap-12 mb-16 flex-wrap">
              <span class="chip chip-success" style="font-size:0.9rem;padding:6px 14px">🏆 Mention Très Bien</span>
              <span class="chip chip-info" style="font-size:0.9rem;padding:6px 14px">📈 Rang : 1er/28</span>
              <span class="chip chip-purple" style="font-size:0.9rem;padding:6px 14px">⭐ Félicitations</span>
            </div>
            <div style="padding:14px;background:rgba(79,70,229,0.06);border-left:4px solid var(--primary);border-radius:var(--radius-sm);font-size:0.875rem;font-style:italic;color:var(--text)">
              "Yasmine est une élève exemplaire, très sérieuse et investie dans ses études. Ses résultats sont excellents dans l'ensemble des matières. Le conseil de classe lui adresse ses félicitations et l'encourage à persévérer dans cette voie."
              <div style="margin-top:6px;font-weight:600;font-style:normal;color:var(--text-muted)">— Le Conseil de Classe, 3ème A</div>
            </div>
            <div class="flex-between mt-16" style="padding-top:16px;border-top:1px dashed var(--border)">
              <div class="text-sm text-muted">
                <div>Fait à Paris, le 1er Décembre 2025</div>
                <div style="margin-top:4px">Le Directeur : <strong>${DATA.school.director}</strong></div>
              </div>
              <div class="text-right text-sm text-muted">
                <div>Visa des parents :</div>
                <div style="margin-top:20px;width:120px;border-bottom:1px solid var(--border)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`,

  // ========== PARENT SCHEDULE ==========
  parent_schedule: () => `
    <div class="section-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Emploi du temps – Yasmine</h1>
          <p class="page-subtitle">3ème A • Semaine du 24 au 28 Novembre 2025</p>
        </div>
      </div>
      <div class="card">
        <div class="card-body" style="overflow-x:auto">
          <div class="schedule-grid">
            ${DATA.schedule["3ème A"].map((row, ri) =>
              row.map((cell, ci) => {
                if (ri === 0) return `<div class="sch-header">${cell}</div>`;
                if (ci === 0) return `<div class="sch-time">${cell}</div>`;
                if (!cell) return `<div class="sch-slot" style="background:var(--bg)"></div>`;
                return `<div class="sch-slot ${cell.c}" onclick="showToast('info','${cell.s} avec ${cell.t} en ${cell.r}')">
                  <div class="sch-subject">${cell.s}</div>
                  <div class="sch-room">${cell.t}</div>
                  <div class="sch-room">${cell.r}</div>
                </div>`;
              }).join('')
            ).join('')}
          </div>
        </div>
      </div>
    </div>`,

  // ========== PROFIL ==========
  profil: () => {
    const u = DATA.currentUser;
    return `
    <div class="section-page">
      <div class="page-header"><h1 class="page-title">Mon Profil</h1></div>
      <div class="grid-2">
        <div class="card">
          <div class="card-body text-center" style="padding:32px">
            <div class="avatar" style="width:80px;height:80px;font-size:2rem;margin:0 auto 16px;background:linear-gradient(135deg,var(--primary),var(--secondary))">${u?.avatar||'U'}</div>
            <div style="font-size:1.2rem;font-weight:800">${u?.name||'Utilisateur'}</div>
            <div class="text-muted">${u?.role||''}</div>
            <div class="chip chip-success mt-12">✓ Connecté</div>
            <button class="btn btn-secondary btn-sm mt-16" onclick="showToast('info','Photo modifiée')"><i class="fas fa-camera"></i> Changer photo</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Informations personnelles</div></div>
          <div class="card-body">
            <div class="form-group"><label>Nom complet</label><input type="text" value="${u?.name||''}" /></div>
            <div class="form-group"><label>Email</label><input type="email" value="${u?.role_key==='admin'?'admin@edusmart.fr':u?.role_key==='teacher'?'s.martin@edusmart.fr':'k.benali@edusmart.fr'}" /></div>
            <div class="form-group"><label>Téléphone</label><input type="tel" value="+33 6 12 34 56 78" /></div>
            <div class="form-group"><label>Mot de passe</label><input type="password" value="••••••••" /></div>
            <button class="btn btn-primary" onclick="showToast('success','Profil mis à jour !')"><i class="fas fa-save"></i> Enregistrer</button>
          </div>
        </div>
      </div>
    </div>`;
  }
};

// ============ HELPERS ============
function avatarColor(name) {
  const colors = ['#4F46E5','#06B6D4','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899','#F97316'];
  let hash = 0;
  for (let c of name) hash = (hash + c.charCodeAt(0)) % colors.length;
  return colors[hash];
}

function gradeColor(g) {
  if (g >= 16) return 'text-success';
  if (g >= 12) return 'text-primary';
  if (g >= 10) return 'text-warning';
  return 'text-danger';
}

function gradeHex(g) {
  if (g >= 16) return '#10B981';
  if (g >= 12) return '#4F46E5';
  if (g >= 10) return '#F59E0B';
  return '#EF4444';
}

function mention(g) {
  if (g >= 16) return 'Très Bien';
  if (g >= 14) return 'Bien';
  if (g >= 12) return 'Assez Bien';
  if (g >= 10) return 'Passable';
  return 'Insuffisant';
}

function mentionClass(g) {
  if (g >= 16) return 'chip-success';
  if (g >= 14) return 'chip-info';
  if (g >= 12) return 'chip-purple';
  if (g >= 10) return 'chip-warning';
  return 'chip-danger';
}

function appreciationText(g) {
  if (g >= 16) return 'Excellent travail';
  if (g >= 14) return 'Très satisfaisant';
  if (g >= 12) return 'Satisfaisant';
  if (g >= 10) return 'Peut mieux faire';
  return 'Travail insuffisant';
}

function eventColor(type) {
  const map = { meeting:'bg-indigo', exam:'bg-rose', bulletin:'bg-emerald', trip:'bg-amber', event:'bg-purple' };
  return map[type] || 'bg-secondary';
}

function eventIcon(type) {
  const map = { meeting:'fa-users', exam:'fa-pen', bulletin:'fa-file-alt', trip:'fa-bus', event:'fa-star' };
  return map[type] || 'fa-calendar';
}

function formatDate(d) {
  const opts = { day:'numeric', month:'long', year:'numeric' };
  return new Date(d).toLocaleDateString('fr-FR', opts);
}

function selectAll(cb) {
  document.querySelectorAll('#studentsTable tbody input[type=checkbox]').forEach(c => c.checked = cb.checked);
}

// ============ ADMINISTRATION FUNCTIONS ============
window.saveSchoolInfo = function() {
  DATA.school.name = document.getElementById('schoolName').value;
  DATA.school.director = document.getElementById('schoolDirector').value;
  DATA.school.year = document.getElementById('schoolYear').value;
  DATA.school.city = document.getElementById('schoolCity').value;
  DATA.school.email = document.getElementById('schoolEmail').value;
  DATA.school.phone = document.getElementById('schoolPhone').value;
  showToast('success', 'Informations de l\'établissement mises à jour');
}

window.openAddAdminStaffModal = function() {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-user-plus text-primary"></i> Ajouter un membre du personnel</h3></div>
    <div class="modal-body">
      <div class="form-group"><label>Nom</label><input type="text" id="adminStaffName" placeholder="Nom complet" /></div>
      <div class="form-group"><label>Poste</label><input type="text" id="adminStaffPost" placeholder="Ex: Secrétaire" /></div>
      <div class="form-group"><label>Email</label><input type="email" id="adminStaffEmail" placeholder="email@edusmart.fr" /></div>
      <div class="form-group"><label>Téléphone</label><input type="tel" id="adminStaffPhone" placeholder="06 XX XX XX XX" /></div>
      <div class="form-group"><label>Statut</label>
        <select id="adminStaffStatus">
          <option value="true">Actif</option>
          <option value="false">Inactif</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="saveAdminStaff()"><i class="fas fa-save"></i> Enregistrer</button>
    </div>`);
}

window.saveAdminStaff = function() {
  const name = document.getElementById('adminStaffName').value;
  const post = document.getElementById('adminStaffPost').value;
  const email = document.getElementById('adminStaffEmail').value;
  const phone = document.getElementById('adminStaffPhone').value;
  const active = document.getElementById('adminStaffStatus').value === 'true';

  if (!name || !post || !email || !phone) {
    showToast('error', 'Veuillez remplir tous les champs');
    return;
  }

  // Ajouter le nouveau membre (simulation - en production, ce serait ajouté à DATA.adminStaff)
  showToast('success', 'Membre du personnel ajouté avec succès');
  closeModal();
  showSection('administration');
}

window.editAdminStaff = function(name) {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-edit text-primary"></i> Modifier ${name}</h3></div>
    <div class="modal-body">
      <div class="form-group"><label>Nom</label><input type="text" id="editAdminStaffName" value="${name}" /></div>
      <div class="form-group"><label>Poste</label><input type="text" id="editAdminStaffPost" placeholder="Poste actuel" /></div>
      <div class="form-group"><label>Email</label><input type="email" id="editAdminStaffEmail" placeholder="Email actuel" /></div>
      <div class="form-group"><label>Téléphone</label><input type="tel" id="editAdminStaffPhone" placeholder="Téléphone actuel" /></div>
      <div class="form-group"><label>Statut</label>
        <select id="editAdminStaffStatus">
          <option value="true">Actif</option>
          <option value="false">Inactif</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="updateAdminStaff('${name}')"><i class="fas fa-save"></i> Enregistrer</button>
    </div>`);
}

window.updateAdminStaff = function(originalName) {
  showToast('success', 'Informations du personnel mises à jour');
  closeModal();
  showSection('administration');
}

window.deleteAdminStaff = function(name) {
  openModal(`
    <div class="modal-header">
      <h3><i class="fas fa-trash text-danger"></i> Confirmer la suppression</h3>
    </div>
    <div class="modal-body">
      <p>Êtes-vous sûr de vouloir supprimer <strong>${name}</strong> du personnel administratif ?</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-danger" onclick="confirmDeleteAdminStaff('${name}')"><i class="fas fa-trash"></i> Supprimer</button>
    </div>`);
}

window.confirmDeleteAdminStaff = function(name) {
  showToast('success', `${name} a été supprimé du personnel`);
  closeModal();
  showSection('administration');
}

window.openImportDocumentModal = function() {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-upload text-primary"></i> Importer un document</h3></div>
    <div class="modal-body">
      <div class="form-group"><label>Nom du document</label><input type="text" id="docName" placeholder="Ex: Règlement intérieur" /></div>
      <div class="form-group"><label>Type de fichier</label>
        <select id="docType">
          <option value="fa-file-pdf">PDF</option>
          <option value="fa-file-word">Word</option>
          <option value="fa-file-excel">Excel</option>
          <option value="fa-file-alt">Autre</option>
        </select>
      </div>
      <div class="form-group"><label>Fichier</label><input type="file" id="docFile" /></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="importDocument()"><i class="fas fa-upload"></i> Importer</button>
    </div>`);
}

window.importDocument = function() {
  const name = document.getElementById('docName').value;
  const file = document.getElementById('docFile').value;

  if (!name || !file) {
    showToast('error', 'Veuillez remplir tous les champs');
    return;
  }

  showToast('success', 'Document importé avec succès');
  closeModal();
  showSection('administration');
}

window.printDocument = function(name) {
  showToast('info', `Impression de ${name}...`);
  setTimeout(() => showToast('success', `${name} imprimé !`), 1500);
}

// ============ SCHEDULE FUNCTIONS ============
function renderScheduleGrid(className) {
  const schedule = DATA.schedule[className] || DATA.schedule["3ème A"];
  return schedule.map((row, ri) =>
    row.map((cell, ci) => {
      if (ri === 0) return `<div class="sch-header">${cell}</div>`;
      if (ci === 0) return `<div class="sch-time">${cell}</div>`;
      if (!cell) return `<div class="sch-slot" style="background:var(--bg)"></div>`;
      return `<div class="sch-slot ${cell.c}" onclick="showToast('info','${cell.s} – ${cell.t} – ${cell.r}')">
        <div class="sch-subject">${cell.s}</div>
        <div class="sch-room">${cell.t}</div>
        <div class="sch-room">${cell.r}</div>
      </div>`;
    }).join('')
  ).join('');
}

window.changeScheduleClass = function() {
  const className = document.getElementById('scheduleClassFilter').value;
  const grid = document.getElementById('scheduleGrid');
  if (grid) {
    grid.innerHTML = renderScheduleGrid(className);
  }
  showToast('info', `Emploi du temps de ${className}`);
}

window.openAddScheduleModal = function() {
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
      <div class="form-row">
        <div class="form-group"><label>Heure début</label>
          <select id="scheduleTimeStart">
            <option value="08h00">08h00</option>
            <option value="09h00">09h00</option>
            <option value="10h00">10h00</option>
            <option value="11h00">11h00</option>
            <option value="12h00">12h00</option>
            <option value="13h00">13h00</option>
            <option value="14h00">14h00</option>
            <option value="15h00">15h00</option>
            <option value="16h00">16h00</option>
            <option value="17h00">17h00</option>
            <option value="18h00">18h00</option>
          </select>
        </div>
        <div class="form-group"><label>Heure fin</label>
          <select id="scheduleTimeEnd">
            <option value="09h00">09h00</option>
            <option value="10h00">10h00</option>
            <option value="11h00">11h00</option>
            <option value="12h00">12h00</option>
            <option value="13h00">13h00</option>
            <option value="14h00">14h00</option>
            <option value="15h00">15h00</option>
            <option value="16h00">16h00</option>
            <option value="17h00">17h00</option>
            <option value="18h00">18h00</option>
            <option value="19h00">19h00</option>
          </select>
        </div>
      </div>
      <div class="form-group"><label>Matière</label><input type="text" id="scheduleSubject" placeholder="Ex: Mathématiques" /></div>
      <div class="form-group"><label>Professeur</label><input type="text" id="scheduleTeacher" placeholder="Ex: Mme Sall" /></div>
      <div class="form-group"><label>Salle</label><input type="text" id="scheduleRoom" placeholder="Ex: Salle 12" /></div>
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
  const timeStart = document.getElementById('scheduleTimeStart').value;
  const timeEnd = document.getElementById('scheduleTimeEnd').value;
  const subject = document.getElementById('scheduleSubject').value;
  const teacher = document.getElementById('scheduleTeacher').value;
  const room = document.getElementById('scheduleRoom').value;
  const color = document.getElementById('scheduleColor').value;

  if (!subject || !teacher || !room) {
    showToast('error', 'Veuillez remplir tous les champs');
    return;
  }

  if (timeStart >= timeEnd) {
    showToast('error', 'L\'heure de fin doit être après l\'heure de début');
    return;
  }

  const timeInterval = `${timeStart}-${timeEnd}`;
  const schedule = DATA.schedule[className] || DATA.schedule["3ème A"];
  const dayIndex = schedule[0].indexOf(day);

  // Chercher si l'intervalle existe déjà, sinon créer une nouvelle ligne
  let timeIndex = schedule.findIndex(row => row[0] === timeInterval);
  if (timeIndex === -1) {
    // Ajouter une nouvelle ligne pour cet intervalle
    const newRow = [timeInterval];
    for (let i = 1; i < schedule[0].length; i++) {
      newRow.push("");
    }
    schedule.push(newRow);
    timeIndex = schedule.length - 1;
  }

  if (dayIndex > 0) {
    schedule[timeIndex][dayIndex] = {
      s: subject,
      t: teacher,
      r: room,
      c: color
    };
    
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

// ============ MODAL FORMS ============
function openAddStudentModal() {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-user-plus text-primary"></i> Ajouter un élève</h3></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label>Prénom</label><input type="text" id="studentFirstName" placeholder="Prénom" /></div>
        <div class="form-group"><label>Nom</label><input type="text" id="studentLastName" placeholder="Nom" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Date de naissance</label><input type="date" id="studentDob" /></div>
        <div class="form-group"><label>Genre</label><select id="studentGender"><option>Féminin</option><option>Masculin</option></select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Classe</label><select id="studentClass">${DATA.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div>
        <div class="form-group"><label>Nom du parent</label><input type="text" id="studentParentName" placeholder="Nom du responsable" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Numéro parent</label><input type="tel" id="studentParentPhone" placeholder="77 123 45 67" /></div>
        <div class="form-group"><label>Email parent</label><input type="email" id="studentParentEmail" placeholder="email@exemple.fr" /></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="saveStudent()"><i class="fas fa-save"></i> Enregistrer</button>
    </div>`);
}

function openAddTeacherModal() {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-chalkboard-teacher text-primary"></i> Ajouter un professeur</h3></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label>Prénom</label><input type="text" placeholder="Prénom" /></div>
        <div class="form-group"><label>Nom</label><input type="text" placeholder="Nom" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Matière</label><input type="text" placeholder="Ex : Mathématiques" /></div>
        <div class="form-group"><label>Heures/semaine</label><input type="number" value="18" /></div>
      </div>
      <div class="form-group"><label>Email professionnel</label><input type="email" placeholder="email@edusmart.fr" /></div>
      <div class="form-group"><label>Téléphone</label><input type="tel" placeholder="06 XX XX XX XX" /></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="saveForm('teacher')"><i class="fas fa-save"></i> Enregistrer</button>
    </div>`);
}

function openAddClassModal() {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-door-open text-primary"></i> Créer une classe</h3></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label>Nom de la classe</label><input type="text" placeholder="Ex : 3ème C" /></div>
        <div class="form-group"><label>Niveau</label><select>${['6ème','5ème','4ème','3ème','2nde','1ère','Terminale'].map(l=>`<option>${l}</option>`).join('')}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Professeur principal</label><select><option value="">Aucun</option>${DATA.teachers.map(t=>`<option>${t.name}</option>`).join('')}</select></div>
        <div class="form-group"><label>Salle</label><input type="text" placeholder="Ex : Salle 14" /></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="saveForm('class')"><i class="fas fa-save"></i> Créer</button>
    </div>`);
}

function openAddGradeModal() {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-pen text-primary"></i> Saisir des notes</h3></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label>Classe</label><select id="gradeClass">${DATA.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div>
        <div class="form-group"><label>Matière</label><select id="gradeSubject">${['Mathématiques','Français','Physique-Chimie','Histoire-Géo','Anglais','SVT','EPS'].map(m=>`<option>${m}</option>`).join('')}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Type d'évaluation</label><select id="gradeType"><option>Devoir</option><option>Composition</option></select></div>
        <div class="form-group"><label>Date</label><input type="date" id="gradeDate" /></div>
      </div>
      <div class="form-group">
        <label>Importer un fichier (Excel, Word, PDF)</label>
        <input type="file" id="gradeFile" accept=".xlsx,.xls,.docx,.doc,.pdf" onchange="handleGradeFileImport(this)" />
        <p class="text-sm text-muted mt-4">Le fichier sera analysé pour extraire automatiquement les notes des élèves.</p>
      </div>
      <div class="form-group"><label>Notes (élève : note, séparés par virgule)</label><textarea id="gradeNotes" placeholder="Ex: Yasmine Benali: 16, Lucas Martin: 12, ..."></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="saveForm('grade')"><i class="fas fa-save"></i> Enregistrer</button>
    </div>`);
}

function openAddAnnouncementModal() {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-bullhorn text-primary"></i> Nouvelle annonce</h3></div>
    <div class="modal-body">
      <div class="form-group"><label>Titre</label><input type="text" placeholder="Titre de l'annonce" /></div>
      <div class="form-row">
        <div class="form-group"><label>Destinataires</label><select><option>Tous</option><option>Parents</option><option>Professeurs</option><option>Élèves</option></select></div>
        <div class="form-group"><label>Priorité</label><select><option>Normal</option><option>Urgent</option></select></div>
      </div>
      <div class="form-group"><label>Message</label><textarea placeholder="Contenu de l'annonce..."></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="saveForm('announcement')"><i class="fas fa-paper-plane"></i> Publier</button>
    </div>`);
}

function openBulletinTemplateModal() {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-file-import text-primary"></i> Importer format de bulletin</h3></div>
    <div class="modal-body">
      <div class="form-group">
        <label>Fichier de format (Word, Excel, PDF)</label>
        <input type="file" id="bulletinTemplateFile" accept=".docx,.doc,.xlsx,.xls,.pdf" onchange="handleBulletinTemplateImport(this)" />
        <p class="text-sm text-muted mt-4">Importez le format vide de bulletin de votre école avec le logo, les informations et la mise en page personnalisée.</p>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="closeModal(); showToast('success', 'Format de bulletin importé avec succès')"><i class="fas fa-save"></i> Enregistrer</button>
    </div>`);
}

function openAddEventModal() {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-calendar-plus text-primary"></i> Ajouter un événement</h3></div>
    <div class="modal-body">
      <div class="form-group"><label>Titre de l'événement</label><input type="text" id="eventTitle" placeholder="Ex: Réunion parents-professeurs" /></div>
      <div class="form-row">
        <div class="form-group"><label>Date</label><input type="date" id="eventDate" /></div>
        <div class="form-group"><label>Type</label><select id="eventType">
          <option value="meeting">Réunion</option>
          <option value="exam">Examen/Contrôle</option>
          <option value="bulletin">Bulletin</option>
          <option value="trip">Sortie scolaire</option>
          <option value="event">Événement</option>
        </select></div>
      </div>
      <div class="form-group"><label>Description (optionnel)</label><textarea id="eventDescription" rows="3" placeholder="Détails de l'événement..."></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="saveEvent()"><i class="fas fa-save"></i> Enregistrer</button>
    </div>`);
}

function openNewMessageModal() {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-pen text-primary"></i> Nouveau message</h3></div>
    <div class="modal-body">
      <div class="form-group"><label>Destinataire</label>
        <select><option>Mme Sophie Martin</option><option>M. Fontaine</option><option>Administration</option><option>M. Karim Benali (parent)</option></select>
      </div>
      <div class="form-group"><label>Objet</label><input type="text" placeholder="Objet du message" /></div>
      <div class="form-group"><label>Message</label><textarea placeholder="Votre message..."></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="closeModal();showToast('success','Message envoyé !')"><i class="fas fa-paper-plane"></i> Envoyer</button>
    </div>`);
}

function openMessageModal(from) {
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-envelope text-primary"></i> Message de ${from}</h3></div>
    <div class="modal-body">
      <div style="background:var(--bg);border-radius:var(--radius);padding:16px;margin-bottom:16px">
        <div class="flex-between mb-8"><strong>${from}</strong><span class="text-muted text-sm">Il y a 2h</span></div>
        <p class="text-sm">Bonjour, je voulais vous informer des derniers résultats scolaires de votre enfant. Les résultats sont globalement très satisfaisants, avec une progression notable en mathématiques et en langues. Nous serons ravis de vous rencontrer lors de la prochaine réunion parents-professeurs.</p>
      </div>
      <div class="form-group"><label>Répondre</label><textarea placeholder="Votre réponse..."></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Fermer</button>
      <button class="btn btn-primary" onclick="closeModal();showToast('success','Réponse envoyée !')"><i class="fas fa-paper-plane"></i> Répondre</button>
    </div>`);
}

function showStudentDetail(id) {
  const s = DATA.students.find(x=>x.id===id);
  if(!s) return;
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-user-graduate text-primary"></i> Fiche élève</h3></div>
    <div class="modal-body">
      <div class="flex-center gap-16 mb-20">
        <div class="avatar" style="width:64px;height:64px;font-size:1.6rem;background:${avatarColor(s.name)}">${s.photo}</div>
        <div>
          <div style="font-size:1.2rem;font-weight:800">${s.name}</div>
          <div class="text-muted">${s.class} • ${s.gender==='F'?'Féminin':'Masculin'} • ${s.dob}</div>
          <span class="chip ${s.avg>=10?'chip-success':'chip-danger'} mt-8">${mention(s.avg)}</span>
        </div>
      </div>
      <div class="grid-2">
        <div class="info-block"><div class="info-block-label">Moyenne générale</div><div class="info-block-value" style="color:${gradeHex(s.avg)}">${s.avg} / 20</div></div>
        <div class="info-block"><div class="info-block-label">Absences</div><div class="info-block-value">${s.abs} jours</div></div>
        <div class="info-block"><div class="info-block-label">Parent/Tuteur</div><div class="info-block-value">${s.parent}</div></div>
        <div class="info-block"><div class="info-block-label">Classe</div><div class="info-block-value">${s.class}</div></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Fermer</button>
      <button class="btn btn-primary" onclick="closeModal();showSection('grades')">Voir les notes</button>
    </div>`);
}

function showTeacherDetail(id) {
  const t = DATA.teachers.find(x=>x.id===id);
  if(!t) return;
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-chalkboard-teacher text-cyan"></i> Fiche professeur</h3></div>
    <div class="modal-body">
      <div class="flex-center gap-16 mb-20">
        <div class="avatar" style="width:64px;height:64px;font-size:1.6rem;background:${avatarColor(t.name)}">${t.name[4]}</div>
        <div>
          <div style="font-size:1.2rem;font-weight:800">${t.name}</div>
          <div class="text-muted">${t.subject}</div>
          <span class="chip ${t.status==='active'?'chip-success':'chip-warning'} mt-8">${t.status==='active'?'Actif':'Congé'}</span>
        </div>
      </div>
      <div class="grid-2 mb-16">
        <div class="info-block"><div class="info-block-label">Email</div><div class="info-block-value text-sm">${t.email}</div></div>
        <div class="info-block"><div class="info-block-label">Téléphone</div><div class="info-block-value">${t.phone}</div></div>
        <div class="info-block"><div class="info-block-label">Heures/semaine</div><div class="info-block-value">${t.hours}h</div></div>
        <div class="info-block"><div class="info-block-label">Classes</div><div class="info-block-value">${t.classes.join(', ')}</div></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Fermer</button>
      <button class="btn btn-primary" onclick="closeModal();openEditTeacherModal('${id}')"><i class="fas fa-edit"></i> Modifier</button>
    </div>`);
}

function showClassDetail(id) {
  const c = DATA.classes.find(x=>x.id===id);
  if(!c) return;
  showToast('info', `Classe ${c.name} – ${c.students} élèves`);
}

function showBulletinDetail(id) {
  showSection('bulletins');
}

function openEditStudentModal(id) {
  const s = DATA.students.find(x=>x.id===id);
  if(!s) return;
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-edit text-primary"></i> Modifier – ${s.name}</h3></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label>Nom complet</label><input type="text" value="${s.name}" /></div>
        <div class="form-group"><label>Classe</label><select>${DATA.classes.map(c=>`<option ${c.name===s.class?'selected':''}>${c.name}</option>`).join('')}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Date de naissance</label><input type="date" value="${s.dob}" /></div>
        <div class="form-group"><label>Parent/Tuteur</label><input type="text" value="${s.parent}" /></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="closeModal();showToast('success','${s.name} mis à jour !')"><i class="fas fa-save"></i> Enregistrer</button>
    </div>`);
}

function openEditTeacherModal(id) {
  const t = DATA.teachers.find(x=>x.id===id);
  if(!t) return;
  openModal(`
    <div class="modal-header"><h3><i class="fas fa-edit text-primary"></i> Modifier – ${t.name}</h3></div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group"><label>Nom complet</label><input type="text" value="${t.name}" /></div>
        <div class="form-group"><label>Matière</label><input type="text" value="${t.subject}" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Email</label><input type="email" value="${t.email}" /></div>
        <div class="form-group"><label>Heures/semaine</label><input type="number" value="${t.hours}" /></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="closeModal();showToast('success','${t.name} mis à jour !')"><i class="fas fa-save"></i> Enregistrer</button>
    </div>`);
}
