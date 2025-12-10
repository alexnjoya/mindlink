import { ChatIcon } from "../icons";

export function AgentAIChat() {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
      aria-label="Open Agent AI Assistant"
    >
      <ChatIcon className="w-6 h-6" />
    </button>
  );
}

