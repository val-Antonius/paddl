import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { supabaseServer } from '../supabase/server';

// Validasi JWT_SECRET
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  memberId: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  } as SignOptions); // ← Type assertion pada object
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

// ... rest of code tetap sama

// Generate member ID
function generateMemberId(): string {
  const random = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, '0');
  return `MB-${random}`;
}

// Register user
export async function register(data: RegisterData) {
  const { email, password, name, phone } = data;

  // Check if email exists
  const { data: existingUser } = await supabaseServer
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Generate member ID
  let memberId = generateMemberId();
  let memberIdExists = true;

  // Ensure unique member ID
  while (memberIdExists) {
    const { data: existing } = await supabaseServer
      .from('users')
      .select('id')
      .eq('member_id', memberId)
      .single();

    if (!existing) {
      memberIdExists = false;
    } else {
      memberId = generateMemberId();
    }
  }

  // Insert user
  const { data: user, error } = await supabaseServer
    .from('users')
    .insert({
      email,
      password_hash: passwordHash,
      member_id: memberId,
      name,
      phone: phone || null
    })
    .select()
    .single();

  if (error) {
    console.error('Register error:', error);
    throw new Error('Failed to register user');
  }

  // Generate token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    memberId: user.member_id
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      memberId: user.member_id
    },
    token
  };
}

// Login user
export async function login(data: LoginData) {
  const { email, password } = data;

  // Get user
  const { data: user, error } = await supabaseServer
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new Error('Invalid email or password');
  }

  if (!user.is_active) {
    throw new Error('Account is inactive');
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    memberId: user.member_id
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      memberId: user.member_id,
      phone: user.phone
    },
    token
  };
}

// Get user from token
export async function getUserFromToken(token: string) {
  const payload = verifyToken(token);

  if (!payload) {
    return null;
  }

  const { data: user } = await supabaseServer
    .from('users')
    .select('id, email, name, member_id, phone')
    .eq('id', payload.userId)
    .eq('is_active', true)
    .single();

  return user;
}