import { FireIcon } from "../icons";
import { Card } from "../shared/Card";
import type { StreakData } from "../../types";

interface StreakTrackerProps {
  streaks: StreakData;
}

export function StreakTracker({ streaks }: StreakTrackerProps) {
  return (
    <Card className="p-4 h-full">
      <div className="flex items-center gap-2 mb-3">
        <FireIcon className="w-5 h-5 text-orange-500" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Your Streaks</h3>
      </div>
      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Daily Check-In</span>
          <span className="text-sm font-semibold text-purple-600">{streaks.dailyCheckIn} days</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Cognitive Games</span>
          <span className="text-sm font-semibold text-purple-600">{streaks.cognitiveGame} days</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Support (Community)</span>
          <span className="text-sm font-semibold text-purple-600">{streaks.support} days</span>
        </div>
      </div>
      {streaks.protectionActive && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-xs text-green-600 font-medium">🛡️ Protection Active</span>
            <span className="text-xs text-gray-500">Gradual reduction enabled</span>
          </div>
        </div>
      )}
    </Card>
  );
}

