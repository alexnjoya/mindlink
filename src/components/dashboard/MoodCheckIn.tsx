import { Card } from "../shared/Card";

interface MoodCheckInProps {
  userName: string;
  weeklySummary: string;
}

export function MoodCheckIn({ userName, weeklySummary }: MoodCheckInProps) {
  return (
    <Card className="p-4 h-full flex flex-col">
      <div className="flex gap-4 flex-1">
        {/* Image Column */}
        <div className="flex-shrink-0">
          <img 
            src="/mood.jpg" 
            alt="Mood check-in" 
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg object-cover"
          />
        </div>
        
        {/* Text and Button Column */}
        <div className="flex flex-col flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Let's check in, {userName}. How have you been feeling this week?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 flex-1">{weeklySummary}</p>
          <button className="bg-purple-600 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors w-fit text-sm sm:text-base">
            Track mood now
          </button>
        </div>
      </div>
    </Card>
  );
}

