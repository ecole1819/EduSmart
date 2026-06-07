-- ============ SUPABASE SCHEMA FOR EDUSMART ============

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============ SCHOOLS TABLE ============
CREATE TABLE IF NOT EXISTS schools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  director VARCHAR(255),
  city VARCHAR(100),
  year VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============ USERS TABLE ============
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'surveillant', 'teacher', 'student', 'parent')),
  avatar VARCHAR(10) DEFAULT 'U',
  school_id UUID REFERENCES schools(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============ STUDENTS TABLE ============
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  class VARCHAR(50),
  dob DATE,
  gender VARCHAR(20),
  parent_name VARCHAR(255),
  parent_phone VARCHAR(20),
  parent_email VARCHAR(255),
  grades JSONB,
  absences INTEGER DEFAULT 0,
  late INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============ CLASSES TABLE ============
CREATE TABLE IF NOT EXISTS classes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  level VARCHAR(50),
  capacity INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============ TEACHERS TABLE ============
CREATE TABLE IF NOT EXISTS teachers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============ SCHEDULE TABLE ============
CREATE TABLE IF NOT EXISTS schedules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  class_name VARCHAR(50) NOT NULL,
  day VARCHAR(20) NOT NULL,
  time_start VARCHAR(10) NOT NULL,
  time_end VARCHAR(10) NOT NULL,
  subject VARCHAR(100),
  teacher VARCHAR(255),
  room VARCHAR(50),
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============ ADMIN STAFF TABLE ============
CREATE TABLE IF NOT EXISTS admin_staff (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  post VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(20),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============ DOCUMENTS TABLE ============
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  file_url TEXT,
  date DATE,
  school_id UUID REFERENCES schools(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============ ROW LEVEL SECURITY (RLS) ============
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- ============ RLS POLICIES ============
-- Users can read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Public read access for schools (for school selection)
CREATE POLICY "Schools are publicly readable" ON schools
  FOR SELECT USING (true);

-- Admins can do everything
CREATE POLICY "Admins can do everything" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text AND role = 'admin'
    )
  );

-- ============ INDEXES ============
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_students_class ON students(class);
CREATE INDEX IF NOT EXISTS idx_schedules_class ON schedules(class_name);
CREATE INDEX IF NOT EXISTS idx_schedules_day ON schedules(day);

-- ============ INSERT DEFAULT SCHOOL ============
INSERT INTO schools (name, email, director, city, year)
VALUES ('EduSmart School', 'contact@edusmart.sn', 'M. Bernard Leclerc', 'Dakar', '2025-2026')
ON CONFLICT (email) DO NOTHING;

-- ============ INSERT DEFAULT ADMIN USER ============
-- Note: Password should be hashed in production. This is a placeholder.
INSERT INTO users (email, password_hash, name, role, avatar, school_id)
SELECT 'admin@edusmart.sn', 'placeholder_hash', 'Admin Principal', 'admin', 'A', id
FROM schools WHERE email = 'contact@edusmart.sn'
ON CONFLICT (email) DO NOTHING;
