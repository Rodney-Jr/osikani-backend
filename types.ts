
export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
  metadata?: {
    tierUsed?: InferenceTier;
    latencyMs?: number;
  };
}

export enum InferenceTier {
  CACHE = 'Tier 1: Global Semantic Cache',
  RAG = 'Tier 2: Ghana Financial Content (RAG)',
  GEMINI = 'Tier 3: Gemini Tuned Model'
}

export interface IngestionFile {
  id: string;
  name: string;
  serverFilename?: string; // Actual filename on server
  type: 'PDF' | 'JSON' | 'CSV' | 'TXT';
  size: string;
  status: 'uploading' | 'processing' | 'embedded' | 'error';
  progress: number;
  currentStep?: string;
  uploadDate: string;
}

export interface ProcessingLog {
  id: string;
  step: string;
  status: 'pending' | 'success' | 'warning' | 'error';
  details: string;
  timestamp: number;
}

// Access Management Types
export type UserRole = 'superuser' | 'admin' | 'auditor';

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'pending' | 'suspended';
  lastLogin: string;
  mfaEnabled: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
}

// Gamification Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserProfile {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  rankTitle: string;
  streakDays: number;
  badges: Badge[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizModule {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  questions: QuizQuestion[];
  completed: boolean;
}

// White-Labeling Types
export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  botDisplayName: string;
  partnerName: string;
  logoUrl?: string;
  welcomeMessage: string;
}

export interface WhiteLabelPartner {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'suspended';
  users: number;
  branding: BrandingConfig;
  apiRequests: number;
}
