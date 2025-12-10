import { useState } from "react";
import type { MoodType } from "../../types";

interface MoodCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMoodRecorded: (mood: MoodType) => void;
}

const moodOptions: { type: MoodType; label: string; emoji: string; isPositive: boolean }[] = [
  { type: "happy", label: "Happy", emoji: "😊", isPositive: true },
  { type: "stressed", label: "Stressed", emoji: "😰", isPositive: false },
  { type: "lonely", label: "Lonely", emoji: "😔", isPositive: false },
  { type: "anxious", label: "Anxious", emoji: "😟", isPositive: false },
  { type: "tired", label: "Tired", emoji: "😴", isPositive: false },
];

const wellbeingTips = [
  "Remember to take breaks throughout your day. Even 5 minutes can make a difference!",
  "Practice gratitude by writing down three things you're thankful for today.",
  "Stay hydrated and get some fresh air - your body and mind will thank you!",
  "Connect with nature, even if it's just looking out a window or walking around the block.",
  "Take time for activities you enjoy - hobbies are important for mental wellbeing.",
];

const getRandomWellbeingTip = () => {
  return wellbeingTips[Math.floor(Math.random() * wellbeingTips.length)];
};

export function MoodCheckInModal({ isOpen, onClose, onMoodRecorded }: MoodCheckInModalProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [showPositiveResponse, setShowPositiveResponse] = useState(false);
  const [showNegativeResponse, setShowNegativeResponse] = useState(false);
  const [wellbeingTip, setWellbeingTip] = useState("");

  if (!isOpen) return null;

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    const moodOption = moodOptions.find((m) => m.type === mood);
    
    if (moodOption?.isPositive) {
      // Positive mood: Record and show SMS confirmation with wellbeing tip
      const tip = getRandomWellbeingTip();
      setWellbeingTip(tip);
      onMoodRecorded(mood);
      setShowPositiveResponse(true);
      
      // Simulate SMS sending (in real app, this would call an API)
      console.log(`SMS sent with wellbeing tip: ${tip}`);
    } else {
      // Negative mood: Prompt for call support
      onMoodRecorded(mood);
      setShowNegativeResponse(true);
    }
  };

  const handleClose = () => {
    setSelectedMood(null);
    setShowPositiveResponse(false);
    setShowNegativeResponse(false);
    setWellbeingTip("");
    onClose();
  };

  const handleCallSupport = () => {
    // In real app, this would initiate a call or redirect to support
    window.location.href = "tel:+1234567890"; // Replace with actual support number
  };

  const handleSkipCall = () => {
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative border border-gray-200/50">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!showPositiveResponse && !showNegativeResponse ? (
          <>
            {/* Mood Selection */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How are you feeling today?</h2>
            <p className="text-gray-600 mb-6">Select the mood that best describes how you're feeling right now.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {moodOptions.map((mood) => (
                <button
                  key={mood.type}
                  onClick={() => handleMoodSelect(mood.type)}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedMood === mood.type
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300 bg-white"
                  }`}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium text-gray-700">{mood.label}</div>
                </button>
              ))}
            </div>
          </>
        ) : showPositiveResponse ? (
          <>
            {/* Positive Mood Response */}
            <div className="text-center">
              <div className="text-6xl mb-4">😊</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mood Recorded!</h2>
              <p className="text-gray-600 mb-4">
                We're glad you're feeling happy today! Your mood has been recorded.
              </p>
              
              {/* SMS Confirmation */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📱</div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-purple-900 mb-1">SMS Sent!</p>
                    <p className="text-sm text-purple-700">{wellbeingTip}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Done
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Negative Mood Response */}
            <div className="text-center">
              <div className="text-6xl mb-4">💙</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">We're here for you</h2>
              <p className="text-gray-600 mb-6">
                We noticed you're feeling {moodOptions.find((m) => m.type === selectedMood)?.label.toLowerCase()}. 
                Would you like to talk to someone right now? Our support team is available 24/7.
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleCallSupport}
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Support Now
                </button>
                <button
                  onClick={handleSkipCall}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Maybe Later
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Your mood has been recorded. You can always reach out when you're ready.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

