// ============ SUPABASE CONFIGURATION ============
const SUPABASE_CONFIG = {
  url: 'https://tsofdyaqaruzuxgkfuqr.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzb2ZkeWFxYXJ1enV4Z2tmdXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MzU3OTQsImV4cCI6MjA5NjQxMTc5NH0.Xi4cSXMXfoDajJNC2A03PB5GnZ84ouOxPn-qLvcghx0',
  apiUrl: 'https://tsofdyaqaruzuxgkfuqr.supabase.co/rest/v1/'
};

// ============ SUPABASE API FUNCTIONS ============
async function supabaseRequest(endpoint, options = {}) {
  const url = `${SUPABASE_CONFIG.apiUrl}${endpoint}`;
  const headers = {
    'apikey': SUPABASE_CONFIG.anonKey,
    'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Supabase request error:', error);
    throw error;
  }
}

// ============ AUTH FUNCTIONS ============
async function signIn(email, password) {
  try {
    const response = await fetch(`${SUPABASE_CONFIG.url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

async function signUp(email, password, userData) {
  try {
    // First, sign up with Supabase Auth
    const response = await fetch(`${SUPABASE_CONFIG.url}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    // Then, insert user data into custom users table
    if (userData) {
      await supabaseRequest('users', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password_hash: 'placeholder', // In production, use proper hashing
          name: userData.name,
          role: userData.role,
          avatar: userData.name[0].toUpperCase(),
          school_id: userData.schoolId || null
        })
      });
    }

    return data;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

async function signOut() {
  try {
    // Sign out from Supabase
    const session = getSession();
    if (session && session.access_token) {
      await fetch(`${SUPABASE_CONFIG.url}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${session.access_token}`
        }
      });
    }
  } catch (error) {
    console.error('Sign out error:', error);
  }

  // Remove session from localStorage
  localStorage.removeItem('supabase_session');
  showToast('success', 'Déconnexion réussie');
  window.location.reload();
}

// ============ DATABASE FUNCTIONS ============
async function getStudents() {
  return await supabaseRequest('students');
}

async function addStudent(studentData) {
  return await supabaseRequest('students', {
    method: 'POST',
    body: JSON.stringify(studentData)
  });
}

async function updateStudent(id, studentData) {
  return await supabaseRequest(`students?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify(studentData)
  });
}

async function deleteStudent(id) {
  return await supabaseRequest(`students?id=eq.${id}`, {
    method: 'DELETE'
  });
}

// ============ SESSION MANAGEMENT ============
function saveSession(session) {
  localStorage.setItem('supabase_session', JSON.stringify(session));
}

function getSession() {
  const session = localStorage.getItem('supabase_session');
  return session ? JSON.parse(session) : null;
}

function isAuthenticated() {
  return getSession() !== null;
}
