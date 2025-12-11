import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Mock AI responses - in production, this would call an API
const generateAIResponse = async (userMessage: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const lowerMessage = userMessage.toLowerCase();
  
  // Simple keyword-based responses (in production, use actual AI API)
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! I'm here to support your mental wellbeing. How are you feeling today?";
  }
  
  if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("worried")) {
    return "I understand that anxiety can be overwhelming. Here are some techniques that might help:\n\n1. **Deep Breathing**: Try the 4-7-8 technique - breathe in for 4 counts, hold for 7, exhale for 8.\n2. **Grounding**: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.\n3. **Progressive Muscle Relaxation**: Tense and release each muscle group from toes to head.\n\nWould you like to explore any of these techniques further, or would you prefer to talk about what's causing your anxiety?";
  }
  
  if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || lowerMessage.includes("down")) {
    return "I'm sorry you're feeling this way. It's important to acknowledge your feelings. Here are some things that might help:\n\n1. **Self-Compassion**: Be kind to yourself. It's okay to not be okay.\n2. **Small Steps**: Even tiny actions like getting out of bed or taking a shower are victories.\n3. **Connection**: Consider reaching out to someone you trust or scheduling a session with a professional.\n4. **Routine**: Try to maintain a basic daily routine, even if it's minimal.\n\nRemember, you don't have to go through this alone. Would you like help finding support resources?";
  }
  
  if (lowerMessage.includes("stress") || lowerMessage.includes("stressed")) {
    return "Stress is a natural response, but when it becomes overwhelming, it's important to manage it. Here are some strategies:\n\n1. **Time Management**: Break tasks into smaller, manageable pieces.\n2. **Mindfulness**: Practice being present in the moment without judgment.\n3. **Physical Activity**: Even a short walk can help reduce stress.\n4. **Boundaries**: Learn to say no when you're feeling overwhelmed.\n\nWhat's causing you the most stress right now?";
  }
  
  if (lowerMessage.includes("sleep") || lowerMessage.includes("insomnia") || lowerMessage.includes("tired")) {
    return "Sleep is crucial for mental health. Here are some tips for better sleep:\n\n1. **Sleep Hygiene**: Keep a consistent sleep schedule, even on weekends.\n2. **Bedroom Environment**: Make your bedroom cool, dark, and quiet.\n3. **Pre-Sleep Routine**: Avoid screens an hour before bed, try reading or gentle stretching.\n4. **Limit Stimulants**: Avoid caffeine and heavy meals close to bedtime.\n\nAre you having trouble falling asleep, staying asleep, or both?";
  }
  
  if (lowerMessage.includes("session") || lowerMessage.includes("appointment") || lowerMessage.includes("therapist")) {
    return "I can help you with scheduling a session! You can:\n\n1. Visit the **Support Network** page to browse available counselors, volunteers, and nurses.\n2. Use the **Calendar** page to view and manage your appointments.\n3. Check **My Sessions** to see your upcoming and past sessions.\n\nWould you like me to guide you through scheduling a session, or do you have questions about what to expect?";
  }
  
  if (lowerMessage.includes("mood") || lowerMessage.includes("feeling")) {
    return "Tracking your mood is a great way to understand your emotional patterns. You can:\n\n1. Use the **Journal** page to record your daily moods and see trends over time.\n2. Check in with yourself regularly - how are you feeling right now?\n3. Notice patterns - are there certain times of day or situations that affect your mood?\n\nHow would you describe your current mood?";
  }
  
  if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
    return "I'm here to help! MindLink offers several support options:\n\n1. **Professional Support**: Connect with counselors, volunteer listeners, or psychiatric nurses.\n2. **Community**: Join discussions and share experiences with others.\n3. **Resources**: Access breathing exercises, meditation guides, and wellness activities.\n4. **Cognitive Games**: Engage in activities designed to support mental wellbeing.\n\nWhat specific area would you like help with?";
  }
  
  // Default response
  return "Thank you for sharing. I'm here to support your mental wellbeing journey. I can help you with:\n\n• Managing anxiety and stress\n• Understanding your emotions\n• Finding support resources\n• Scheduling sessions\n• Wellness techniques and exercises\n\nWhat would you like to explore today?";
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const streamingTimeoutRef = useRef<number | null>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("chatHistory");
    if (stored) {
      const parsed = JSON.parse(stored) as Array<Omit<Message, 'timestamp'> & { timestamp: string }>;
      const messagesWithDates = parsed.map(m => ({
        ...m,
        timestamp: new Date(m.timestamp),
      }));
      setMessages(messagesWithDates);
    }
  }, []);

  // Auto-scroll to bottom only when messages are complete (not during streaming)
  useEffect(() => {
    if (!isLoading && !streamingMessage) {
      // Use requestAnimationFrame for smoother scroll
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      });
    }
  }, [messages, isLoading, streamingMessage]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  // Cleanup streaming timeout on unmount
  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    // Generate AI response with typewriter effect
    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      const messageId = (Date.now() + 1).toString();
      setStreamingMessage("");
      setIsLoading(false);
      
      // Typewriter effect - no scrolling during typing for ChatGPT-like feel
      let currentIndex = 0;
      const typeSpeed = 15; // milliseconds per character
      
      const typeNextChar = () => {
        if (currentIndex < aiResponse.length) {
          setStreamingMessage(aiResponse.slice(0, currentIndex + 1));
          currentIndex++;
          streamingTimeoutRef.current = setTimeout(typeNextChar, typeSpeed);
        } else {
          // Typing complete, add to messages
          const assistantMessage: Message = {
            id: messageId,
            role: "assistant",
            content: aiResponse,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, assistantMessage]);
          setStreamingMessage("");
        }
      };
      
      typeNextChar();
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
      setStreamingMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const quickPrompts = [
    "I'm feeling anxious",
    "Help me manage stress",
    "I need support",
    "How do I track my mood?",
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  return (
    <div 
      className="flex flex-col h-full bg-transparent w-full overflow-hidden" 
      style={{ 
        height: "100vh", 
        minHeight: "-webkit-fill-available",
        maxHeight: "100vh"
      }}
    >
      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-4 w-full"
        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
      >
        <div className="max-w-2xl mx-auto pt-3 sm:pt-6 pb-20 sm:pb-32 space-y-3 sm:space-y-6 w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 sm:gap-4 w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[85%] sm:max-w-[85%] min-w-0">
                <div
                  className={`rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 ${
                    message.role === "user"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-transparent text-gray-900"
                  }`}
                  style={{
                    boxShadow: message.role === "user" 
                      ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" 
                      : "none"
                  }}
                >
                  <div className="whitespace-pre-wrap break-words leading-relaxed text-[15px] sm:text-[15px] overflow-wrap-anywhere">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator - three dots while thinking */}
          {isLoading && !streamingMessage && (
            <div className="flex gap-2 sm:gap-4 justify-start w-full">
              <div className="max-w-[85%] sm:max-w-[85%] min-w-0">
                <div className="rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 bg-transparent text-gray-900">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Streaming message */}
          {streamingMessage && (
            <div className="flex gap-2 sm:gap-4 justify-start w-full">
              <div className="max-w-[85%] sm:max-w-[85%] min-w-0">
                <div className="rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 bg-transparent text-gray-900">
                  <div className="whitespace-pre-wrap break-words leading-relaxed text-[15px] sm:text-[15px] overflow-wrap-anywhere">
                    {streamingMessage}
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Quick prompts (show only when no messages) */}
          {messages.length === 0 && !isLoading && (
            <div className="space-y-3 pt-4 px-2">
              <p className="text-sm text-gray-500 text-center">Try asking:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="px-3 py-2 sm:px-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 rounded-full text-xs sm:text-sm transition-colors touch-manipulation"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="border-t border-gray-200 bg-transparent backdrop-blur-sm safe-area-inset-bottom w-full overflow-hidden">
        <div className="w-full sm:max-w-2xl mx-auto px-3 sm:px-4 py-2 sm:py-4">
          <div className="relative flex items-end gap-1.5 sm:gap-3 bg-white rounded-xl sm:rounded-2xl border border-gray-300 shadow-xl focus-within:border-purple-500 focus-within:shadow-2xl transition-all w-full max-w-full">
            <div className="flex-1 relative min-h-[36px] sm:min-h-[52px] flex items-center min-w-0">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Message AI..."
                className="w-full px-2.5 sm:px-4 py-1.5 sm:py-3 pr-8 sm:pr-12 bg-transparent border-0 focus:outline-none resize-none text-sm sm:text-[15px] text-gray-900 placeholder-gray-500 overflow-wrap-anywhere"
                rows={1}
                style={{
                  minHeight: "36px",
                  maxHeight: "200px",
                  lineHeight: "1.5",
                  width: "100%",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <button
              className="mb-1 sm:mb-2 p-1.5 sm:p-2 rounded-lg transition-colors flex-shrink-0 text-gray-500 hover:text-gray-700 active:bg-gray-200 touch-manipulation"
              aria-label="Voice input"
              style={{ minWidth: "32px", minHeight: "32px" }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={`mr-1 sm:mr-2 mb-1 sm:mb-2 p-1.5 sm:p-2 rounded-lg transition-colors flex-shrink-0 touch-manipulation ${
                inputValue.trim() && !isLoading
                  ? "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              style={{ minWidth: "32px", minHeight: "32px" }}
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 text-center px-2">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
