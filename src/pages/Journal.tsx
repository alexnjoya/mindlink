import { useState, useEffect, useMemo } from "react";
import { Card } from "../components/shared/Card";
import { MoodCheckInModal } from "../components/dashboard/MoodCheckInModal";
import type { MoodEntry, MoodType } from "../types";

type TimeRange = "week" | "month" | "all";

const moodConfig: Record<MoodType, { label: string; emoji: string; color: string; bgColor: string }> = {
  happy: { label: "Happy", emoji: "😊", color: "text-yellow-600", bgColor: "bg-yellow-50" },
  stressed: { label: "Stressed", emoji: "😰", color: "text-red-600", bgColor: "bg-red-50" },
  lonely: { label: "Lonely", emoji: "😔", color: "text-blue-600", bgColor: "bg-blue-50" },
  anxious: { label: "Anxious", emoji: "😟", color: "text-orange-600", bgColor: "bg-orange-50" },
  tired: { label: "Tired", emoji: "😴", color: "text-gray-600", bgColor: "bg-gray-50" },
};

export function Journal() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load mood history from localStorage
  useEffect(() => {
    const loadHistory = () => {
      const stored = localStorage.getItem("moodHistory");
      if (stored) {
        const history = JSON.parse(stored) as MoodEntry[];
        // Sort by date (newest first)
        history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setMoodHistory(history);
      }
    };
    loadHistory();
    
    // Listen for storage changes (in case mood is recorded from another tab/component)
    window.addEventListener("storage", loadHistory);
    // Also check periodically for changes within the same tab
    const interval = setInterval(loadHistory, 1000);
    
    return () => {
      window.removeEventListener("storage", loadHistory);
      clearInterval(interval);
    };
  }, []);

  // Filter mood history by time range
  const filteredHistory = useMemo(() => {
    if (timeRange === "all") return moodHistory;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    if (timeRange === "week") {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (timeRange === "month") {
      cutoffDate.setMonth(now.getMonth() - 1);
    }
    
    return moodHistory.filter(entry => new Date(entry.timestamp) >= cutoffDate);
  }, [moodHistory, timeRange]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (filteredHistory.length === 0) {
      return {
        total: 0,
        mostCommon: null as MoodType | null,
        moodCounts: {} as Record<MoodType, number>,
        averagePerWeek: 0,
      };
    }

    const moodCounts = filteredHistory.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<MoodType, number>);

    const mostCommon = Object.entries(moodCounts).reduce((a, b) => 
      moodCounts[a[0] as MoodType] > moodCounts[b[0] as MoodType] ? a : b
    )[0] as MoodType;

    const daysInRange = timeRange === "week" ? 7 : timeRange === "month" ? 30 : filteredHistory.length;
    const averagePerWeek = (filteredHistory.length / daysInRange) * 7;

    return {
      total: filteredHistory.length,
      mostCommon,
      moodCounts,
      averagePerWeek: Math.round(averagePerWeek * 10) / 10,
    };
  }, [filteredHistory, timeRange]);

  // Group history by date for display
  const groupedHistory = useMemo(() => {
    const groups: Record<string, MoodEntry[]> = {};
    filteredHistory.forEach(entry => {
      const dateKey = entry.date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(entry);
    });
    return groups;
  }, [filteredHistory]);

  const handleMoodRecorded = (_mood: MoodType) => {
    // Reload history after recording
    const stored = localStorage.getItem("moodHistory");
    if (stored) {
      const history = JSON.parse(stored) as MoodEntry[];
      history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setMoodHistory(history);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      });
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", { 
      hour: "numeric", 
      minute: "2-digit" 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mood Journal</h1>
          <p className="text-gray-600">Track your emotions and see trends over time</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <span className="text-xl">📝</span>
          <span>Record Mood</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Total Entries</div>
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500 mt-1">
            {timeRange === "week" ? "Last 7 days" : timeRange === "month" ? "Last 30 days" : "All time"}
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Most Common Mood</div>
          {stats.mostCommon ? (
            <>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl">{moodConfig[stats.mostCommon].emoji}</span>
                <span className="text-lg font-semibold text-gray-900">
                  {moodConfig[stats.mostCommon].label}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {stats.moodCounts[stats.mostCommon]} {stats.moodCounts[stats.mostCommon] === 1 ? "time" : "times"}
              </div>
            </>
          ) : (
            <div className="text-lg font-semibold text-gray-400 mt-1">No data</div>
          )}
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Average per Week</div>
          <div className="text-3xl font-bold text-gray-900">{stats.averagePerWeek}</div>
          <div className="text-xs text-gray-500 mt-1">Mood entries</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Mood Distribution</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(stats.moodCounts).map(([mood, count]) => (
              <div
                key={mood}
                className={`${moodConfig[mood as MoodType].bgColor} ${moodConfig[mood as MoodType].color} px-2 py-1 rounded text-xs font-medium`}
              >
                {moodConfig[mood as MoodType].emoji} {count}
              </div>
            ))}
            {Object.keys(stats.moodCounts).length === 0 && (
              <div className="text-sm text-gray-400">No entries yet</div>
            )}
          </div>
        </Card>
      </div>

      {/* Time Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
        <span className="text-sm font-medium text-gray-700">Time Range:</span>
        <div className="flex gap-2 flex-wrap">
          {(["week", "month", "all"] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                timeRange === range
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {range === "week" ? "Last Week" : range === "month" ? "Last Month" : "All Time"}
            </button>
          ))}
        </div>
      </div>

      {/* Mood History Timeline */}
      {filteredHistory.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">📔</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No mood entries yet</h3>
          <p className="text-gray-600 mb-6">
            Start tracking your emotions to see patterns and trends over time.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
          >
            <span>Record Your First Mood</span>
          </button>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedHistory)
            .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
            .map(([date, entries]) => (
              <Card key={date} className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{formatDate(date)}</h3>
                  <span className="text-sm text-gray-500">{entries.length} {entries.length === 1 ? "entry" : "entries"}</span>
                </div>
                <div className="space-y-3">
                  {entries.map((entry, index) => (
                    <div
                      key={`${entry.date}-${index}`}
                      className={`flex items-center gap-4 p-3 rounded-lg ${moodConfig[entry.mood].bgColor} border border-gray-200`}
                    >
                      <div className="text-3xl">{moodConfig[entry.mood].emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-semibold ${moodConfig[entry.mood].color}`}>
                            {moodConfig[entry.mood].label}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Recorded at {formatTime(entry.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
        </div>
      )}

      {/* Mood Check-In Modal */}
      <MoodCheckInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMoodRecorded={handleMoodRecorded}
      />
    </div>
  );
}
