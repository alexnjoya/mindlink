import { Card } from "../shared/Card";

interface MoodCheckInProps {
  userName: string;
  weeklySummary: string;
}

export function MoodCheckIn({ userName, weeklySummary }: MoodCheckInProps) {
  return (
    <Card className="p-3 sm:p-4 h-full flex flex-col">
      <div className="flex gap-3 sm:gap-4 flex-1">
        {/* Image Column */}
        <div className="flex-shrink-0 h-full">
          <img 
            src="/mood.jpg" 
            alt="Mood check-in" 
            className="w-24 sm:w-40 h-full rounded-lg object-cover"
          />
        </div>
        
        {/* Text and Button Column */}
        <div className="flex flex-col flex-1">
          <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
            Let's check in, {userName}. How have you been feeling this week?
          </h3>
          <p className="text-xs sm:text-base text-gray-600 mb-3 sm:mb-4 flex-1">{weeklySummary}</p>
          <button className="bg-purple-600 text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-medium hover:bg-purple-700 transition-colors w-fit text-xs sm:text-base">
            Track mood now
          </button>
        </div>
      </div>
    </Card>
  );
}

