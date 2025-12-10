import { BellIcon, SearchIcon, MenuIcon } from "../icons";
import { getTimeBasedGreeting } from "../../utils/greeting";

interface HeaderProps {
  userName: string;
  onMobileMenuToggle?: () => void;
}

export function Header({ userName, onMobileMenuToggle }: HeaderProps) {
  const { greeting, icon } = getTimeBasedGreeting();

  return (
    <div className="px-4 sm:px-6 py-3 sm:py-4">
      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between gap-4">
        {/* Desktop: Greeting on left */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            {greeting}, {userName}!
          </h2>
          {icon}
        </div>

        {/* Desktop: Search, Notification, and Profile */}
        <div className="flex items-center gap-4">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="relative">
            <BellIcon className="w-6 h-6 text-gray-700" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-semibold">M</span>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex sm:hidden flex-col gap-3">
        {/* First row: Menu on left, Search Icon, Notification, Profile on right */}
        <div className="flex items-center justify-between">
          <button
            onClick={onMobileMenuToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Open menu"
          >
            <MenuIcon className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5 text-gray-700" />
            </button>
            <div className="relative flex-shrink-0">
              <BellIcon className="w-5 h-5 text-gray-700" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-semibold text-sm">M</span>
            </div>
          </div>
        </div>
        {/* Second row: Greeting */}
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">
            {greeting}, {userName}!
          </h2>
          {icon}
        </div>
      </div>
    </div>
  );
}

