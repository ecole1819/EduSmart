// ============================================================
//  EduSmart — Graphiques avec Chart.js
// ============================================================

// Charger Chart.js dynamiquement
(function loadChartJS() {
  if (window.Chart) return;
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
  s.onload = () => console.log('Chart.js loaded');
  document.head.appendChild(s);
})();

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { font: { family: 'Inter', size: 12 }, color: '#64748B' } }
  }
};

function getThemeColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1E293B';
}

function waitForChartJS(cb, retries = 20) {
  if (window.Chart) return cb();
  if (retries <= 0) return;
  setTimeout(() => waitForChartJS(cb, retries - 1), 200);
}

function initCharts(section) {
  waitForChartJS(() => {
    if (section === 'dashboard') initDashboardCharts();
    if (section === 'reports') initReportCharts();
  });
}

function initDashboardCharts() {
  // Attendance Line Chart
  const attCtx = document.getElementById('attendanceChart');
  if (attCtx) {
    destroyChart('attendanceChart');
    new Chart(attCtx, {
      type: 'line',
      data: {
        labels: ['Sep','Oct','Nov','Déc','Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû'],
        datasets: [{
          label: 'Taux de présence (%)',
          data: DATA.stats.monthlyAttendance,
          borderColor: '#4F46E5',
          backgroundColor: 'rgba(79,70,229,0.08)',
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#4F46E5',
          pointRadius: 4
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        scales: {
          y: {
            min: 85, max: 100,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8' }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8' }
          }
        }
      }
    });
  }

  // Grades Doughnut
  const grCtx = document.getElementById('gradesChart');
  if (grCtx) {
    destroyChart('gradesChart');
    new Chart(grCtx, {
      type: 'doughnut',
      data: {
        labels: ['< 8', '8-10', '10-12', '12-14', '14-16', '> 16'],
        datasets: [{
          data: DATA.stats.gradeDistribution,
          backgroundColor: ['#EF4444','#F97316','#F59E0B','#3B82F6','#8B5CF6','#10B981'],
          borderWidth: 3,
          borderColor: 'white'
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'right',
            labels: { font: { family: 'Inter', size: 11 }, color: '#64748B', padding: 10 }
          }
        }
      }
    });
  }
}

function initReportCharts() {
  // Enrollment Trend
  const enCtx = document.getElementById('enrollmentChart');
  if (enCtx) {
    destroyChart('enrollmentChart');
    new Chart(enCtx, {
      type: 'bar',
      data: {
        labels: ['2021-22', '2022-23', '2023-24', '2024-25', '2025-26'],
        datasets: [{
          label: 'Élèves inscrits',
          data: DATA.stats.enrollmentTrend,
          backgroundColor: 'rgba(79,70,229,0.7)',
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        scales: {
          y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } },
          x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } }
        }
      }
    });
  }

  // Monthly Attendance
  const maCtx = document.getElementById('monthlyChart');
  if (maCtx) {
    destroyChart('monthlyChart');
    new Chart(maCtx, {
      type: 'line',
      data: {
        labels: ['Sep','Oct','Nov','Déc','Jan','Fév','Mar','Avr','Mai','Jun'],
        datasets: [{
          label: 'Présence (%)',
          data: [94, 96, 91, 97, 95, 93, 98, 96, 94, 97],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16,185,129,0.08)',
          fill: true,
          tension: 0.4,
          borderWidth: 2.5,
          pointBackgroundColor: '#10B981',
          pointRadius: 4
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        scales: {
          y: { min: 85, max: 100, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } },
          x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } }
        }
      }
    });
  }

  // Level pie
  const lvCtx = document.getElementById('levelChart');
  if (lvCtx) {
    destroyChart('levelChart');
    new Chart(lvCtx, {
      type: 'pie',
      data: {
        labels: ['6ème','5ème','4ème','3ème','2nde','1ère','Terminale'],
        datasets: [{
          data: [142, 138, 135, 140, 136, 78, 78],
          backgroundColor: ['#4F46E5','#06B6D4','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899'],
          borderWidth: 3,
          borderColor: 'white'
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        plugins: {
          legend: { position: 'right', labels: { font: { family: 'Inter', size: 11 }, color: '#64748B' } }
        }
      }
    });
  }

  // Subject Performance
  const spCtx = document.getElementById('perfChart');
  if (spCtx) {
    destroyChart('perfChart');
    new Chart(spCtx, {
      type: 'bar',
      data: {
        labels: ['Maths', 'Français', 'Phys-Chim', 'Hist-Géo', 'Anglais', 'SVT', 'EPS'],
        datasets: [{
          label: 'Moyenne de l\'établissement',
          data: DATA.stats.subjectAvgs,
          backgroundColor: ['#4F46E5','#EC4899','#06B6D4','#F59E0B','#8B5CF6','#10B981','#F97316'],
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        indexAxis: 'y',
        scales: {
          x: { min: 0, max: 20, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } },
          y: { grid: { display: false }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } }
        }
      }
    });
  }
}

// Called when specific charts are needed on other pages
function initPageChart(canvasId, type, config) {
  waitForChartJS(() => {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    destroyChart(canvasId);
    new Chart(ctx, { type, ...config });
  });
}

// Store chart instances for destruction
const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
  // Also check Chart.getChart
  if (window.Chart) {
    const existing = Chart.getChart(id);
    if (existing) existing.destroy();
  }
}

// ============ DYNAMIC CHART INIT ON SECTION LOAD ============
const originalShowSection = window.showSection;

// Patch showSection to init page-specific charts
document.addEventListener('DOMContentLoaded', () => {
  // We'll hook into section rendering via MutationObserver
  const observer = new MutationObserver(() => {
    waitForChartJS(() => {
      // Attendance section chart
      const monthChart = document.getElementById('monthAttendanceChart');
      if (monthChart && !Chart.getChart('monthAttendanceChart')) {
        new Chart(monthChart, {
          type: 'bar',
          data: {
            labels: ['Sep','Oct','Nov','Déc','Jan','Fév'],
            datasets: [{
              label: 'Présence %',
              data: [94, 96, 91, 97, 95, 93],
              backgroundColor: 'rgba(16,185,129,0.7)',
              borderRadius: 6,
              borderSkipped: false
            }]
          },
          options: {
            ...CHART_DEFAULTS,
            scales: {
              y: { min: 80, max: 100, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } },
              x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } }
            }
          }
        });
      }

      // Subject chart (grades section)
      const subChart = document.getElementById('subjectChart');
      if (subChart && !Chart.getChart('subjectChart')) {
        new Chart(subChart, {
          type: 'bar',
          data: {
            labels: ['Maths','Français','Phys-Chim','Hist-Géo','Anglais','SVT','EPS'],
            datasets: [{
              label: 'Moyenne 3ème A',
              data: [14.2, 13.5, 15.1, 15.8, 17.2, 13.8, 15.6],
              backgroundColor: ['#4F46E5','#EC4899','#06B6D4','#F59E0B','#8B5CF6','#10B981','#F97316'],
              borderRadius: 6
            }]
          },
          options: {
            ...CHART_DEFAULTS,
            scales: {
              y: { min: 0, max: 20, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } },
              x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } }
            }
          }
        });
      }

      // Evolution chart (grades analytics)
      const evChart = document.getElementById('evolutionChart');
      if (evChart && !Chart.getChart('evolutionChart')) {
        new Chart(evChart, {
          type: 'line',
          data: {
            labels: ['T0','T1 (actuel)','T2 (prévu)'],
            datasets: [
              { label:'3ème A', data:[14.0, 14.8, null], borderColor:'#4F46E5', backgroundColor:'rgba(79,70,229,0.08)', tension:0.4, fill:true, pointRadius:5 },
              { label:'2nde B', data:[13.2, 13.5, null], borderColor:'#06B6D4', backgroundColor:'rgba(6,182,212,0.08)', tension:0.4, fill:true, pointRadius:5 }
            ]
          },
          options: {
            ...CHART_DEFAULTS,
            scales: {
              y: { min: 10, max: 18, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } },
              x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } }
            }
          }
        });
      }

      // Mentions pie (grades analytics)
      const menChart = document.getElementById('mentionsChart');
      if (menChart && !Chart.getChart('mentionsChart')) {
        new Chart(menChart, {
          type: 'doughnut',
          data: {
            labels: ['Très Bien','Bien','Assez Bien','Passable','Insuffisant'],
            datasets: [{
              data: [15, 22, 28, 18, 17],
              backgroundColor: ['#10B981','#3B82F6','#8B5CF6','#F59E0B','#EF4444'],
              borderWidth: 3,
              borderColor: 'white'
            }]
          },
          options: {
            ...CHART_DEFAULTS,
            cutout: '60%',
            plugins: {
              legend: { position: 'right', labels: { font: { family: 'Inter', size: 11 }, color: '#64748B' } }
            }
          }
        });
      }

      // Budget chart (admin)
      const budChart = document.getElementById('budgetChart');
      if (budChart && !Chart.getChart('budgetChart')) {
        new Chart(budChart, {
          type: 'doughnut',
          data: {
            labels: ['Personnel','Équipement','Infrastructure','Ressources pédag.','Fonctionnement'],
            datasets: [{
              data: [55, 15, 12, 10, 8],
              backgroundColor: ['#4F46E5','#06B6D4','#10B981','#F59E0B','#8B5CF6'],
              borderWidth: 3,
              borderColor: 'white'
            }]
          },
          options: {
            ...CHART_DEFAULTS,
            cutout: '55%',
            plugins: {
              legend: { position: 'right', labels: { font: { family: 'Inter', size: 11 }, color: '#64748B' } }
            }
          }
        });
      }

      // Parent grades evolution chart
      const pgChart = document.getElementById('parentGradesChart');
      if (pgChart && !Chart.getChart('parentGradesChart')) {
        new Chart(pgChart, {
          type: 'line',
          data: {
            labels: ['T0 (référence)','T1 (actuel)'],
            datasets: [
              { label:'Mathématiques', data:[14.0, 15.0], borderColor:'#4F46E5', pointRadius:5, tension:0.3 },
              { label:'Français', data:[12.5, 13.3], borderColor:'#EC4899', pointRadius:5, tension:0.3 },
              { label:'Anglais', data:[16.5, 17.7], borderColor:'#8B5CF6', pointRadius:5, tension:0.3 },
              { label:'Sciences', data:[14.8, 15.3], borderColor:'#06B6D4', pointRadius:5, tension:0.3 }
            ]
          },
          options: {
            ...CHART_DEFAULTS,
            scales: {
              y: { min: 8, max: 20, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } },
              x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { family: 'Inter' } } }
            }
          }
        });
      }
    });
  });

  observer.observe(document.getElementById('mainContent') || document.body, {
    childList: true,
    subtree: false
  });
});
