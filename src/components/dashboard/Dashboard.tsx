import { StreakTracker } from "./StreakTracker";
import { MoodCheckIn } from "./MoodCheckIn";
import { CognitiveGames } from "./CognitiveGames";
import { CommunityPreview } from "./CommunityPreview";
import { UpcomingSessions } from "./UpcomingSessions";
import { Recommendations } from "./Recommendations";
import type { Session, Recommendation, CommunityPost, StreakData } from "../../types";

// Mock data - in real app, this would come from API/context
const mockStreaks: StreakData = {
  dailyCheckIn: 12,
  cognitiveGame: 8,
  support: 5,
  lastUpdated: new Date(),
  protectionActive: true,
};

const mockSessions: Session[] = [
  {
    id: "1",
    title: "Managing Anxiety in Daily Life",
    type: "individual",
    professional: {
      id: "1",
      name: "Dr. Mette Andersen",
      role: "counselor",
    },
    dateTime: new Date("2024-10-08T08:45:00+02:00"),
    timezone: "GMT +2",
    status: "confirmed",
    meetLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    title: "Finding Balance Through Shared Experience",
    type: "group",
    professional: {
      id: "2",
      name: "Sarah Johnson",
      role: "volunteer",
    },
    dateTime: new Date("2024-10-10T18:00:00+02:00"),
    timezone: "GMT +2",
    status: "confirmed",
    meetLink: "https://meet.google.com/xyz-uvwx-rst",
  },
];

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    type: "game",
    title: "Try this memory game",
    image: "/7d4eb3d88bb7e6e686901130232f482a.webp",
    category: "Cognitive Game",
    description: "Challenge your attention skills",
    actionUrl: "/games/memory",
  },
  {
    id: "2",
    type: "ai_prompt",
    title: "Daily wellbeing prompt",
    image: "/11d0e6f19fe16a9cfcb84ebd6e603270.webp",
    category: "Agent AI Prompt",
    description: "Personalized suggestions for today",
    actionUrl: "/chat",
  },
  {
    id: "3",
    type: "wellness",
    title: "5-minute breathing exercise",
    image: "/8ed82c264871d8abfa95658438daa2aa.webp",
    category: "Wellness Activity",
    description: "A short exercise to help you relax",
    actionUrl: "/wellness/breathing",
  },
  {
    id: "4",
    type: "game",
    title: "Focus Builder Challenge",
    image: "/7d4eb3d88bb7e6e686901130232f482a.webp",
    category: "Cognitive Game",
    description: "Improve your concentration with timed puzzles",
    actionUrl: "/games/focus",
  },
  {
    id: "5",
    type: "community",
    title: "Join the mindfulness group",
    image: "/11d0e6f19fe16a9cfcb84ebd6e603270.webp",
    category: "Community Discussion",
    description: "Share experiences and learn from others",
    actionUrl: "/community/mindfulness",
  },
  {
    id: "6",
    type: "wellness",
    title: "Morning meditation guide",
    image: "/8ed82c264871d8abfa95658438daa2aa.webp",
    category: "Wellness Activity",
    description: "Start your day with calm and clarity",
    actionUrl: "/wellness/meditation",
  },
  {
    id: "7",
    type: "ai_prompt",
    title: "Weekly reflection questions",
    image: "/11d0e6f19fe16a9cfcb84ebd6e603270.webp",
    category: "Agent AI Prompt",
    description: "Thoughtful prompts for self-discovery",
    actionUrl: "/chat/reflection",
  },
  {
    id: "8",
    type: "game",
    title: "Pattern Recognition Test",
    image: "/7d4eb3d88bb7e6e686901130232f482a.webp",
    category: "Cognitive Game",
    description: "Test and improve your pattern recognition",
    actionUrl: "/games/pattern",
  },
];

const mockCommunityPosts: CommunityPost[] = [
  {
    id: "1",
    author: "Alex",
    title: "Coping with stress",
    comments: 5,
    timeAgo: "2 hours ago",
  },
  {
    id: "2",
    author: "Bella",
    title: "Daily mindfulness tips",
    comments: 12,
    timeAgo: "4 hours ago",
  },
];

export function Dashboard() {
  const userName = "Marie"; // This would come from user context/API
  const weeklySummary = "You logged 4 emotions this week - mostly calm and focused.";

  return (
    <>
      {/* Streak Tracker & Mood Check */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StreakTracker streaks={mockStreaks} />
        <div className="md:col-span-2">
          <MoodCheckIn userName={userName} weeklySummary={weeklySummary} />
        </div>
      </div>

      {/* Cognitive Games & Community Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CognitiveGames />
        <CommunityPreview posts={mockCommunityPosts} />
      </div>

      {/* Upcoming Sessions */}
      <UpcomingSessions sessions={mockSessions} />

      {/* Recommendations */}
      <Recommendations recommendations={mockRecommendations} />
    </>
  );
}

