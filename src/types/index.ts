export interface StreakData {
  dailyCheckIn: number;
  cognitiveGame: number;
  support: number;
  lastUpdated?: Date;
  protectionActive?: boolean;
}

export interface Session {
  id: string;
  title: string;
  type: 'individual' | 'group';
  professional: {
    id: string;
    name: string;
    role: 'counselor' | 'volunteer' | 'nurse';
    avatar?: string;
  };
  dateTime: Date;
  timezone: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  meetLink?: string;
}

export interface Recommendation {
  id: string;
  type: 'game' | 'community' | 'wellness' | 'ai_prompt';
  title: string;
  description: string;
  image?: string;
  category: string;
  actionUrl: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  title: string;
  comments: number;
  timeAgo: string;
}

