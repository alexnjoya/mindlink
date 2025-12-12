import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { BellIcon, SearchIcon, MenuIcon } from "../icons";
import { getTimeBasedGreeting } from "../../utils/greeting";

interface HeaderProps {
  userName: string;
  onMobileMenuToggle?: () => void;
}

export function Header({ userName, onMobileMenuToggle }: HeaderProps) {
  const location = useLocation();
  const isDashboard = location.pathname === "/home";
  const isChat = location.pathname === "/chat";
  const { greeting, icon } = getTimeBasedGreeting();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideDesktop = desktopDropdownRef.current?.contains(target);
      const isInsideMobile = mobileDropdownRef.current?.contains(target);
      
      // Close if click is outside both dropdowns
      if (!isInsideDesktop && !isInsideMobile) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      // Use a small delay to allow click events on dropdown items to fire first
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside, true);
      }, 0);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isProfileDropdownOpen]);

  return (
    <div className="px-4 sm:px-6 py-3 sm:py-4">
      {/* Desktop Layout */}
      <div className={`hidden sm:flex items-center gap-4 ${isDashboard ? 'justify-between' : 'justify-end'}`}>
        {/* Desktop: Greeting on left - only on dashboard */}
        {isDashboard && (
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {greeting}, {userName}!
            </h2>
            {icon}
          </div>
        )}

        {/* Desktop: Search, Notification, and Profile */}
        <div className="flex items-center gap-4">
          {!isChat && (
            <>
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
            </>
          )}
          <div className="relative" ref={desktopDropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsProfileDropdownOpen(!isProfileDropdownOpen);
              }}
              className="hover:opacity-80 transition-opacity"
              aria-label="Profile menu"
            >
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">M</span>
              </div>
            </button>
            {isProfileDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100]"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Link
                  to="/profile"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileDropdownOpen(false);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileDropdownOpen(false);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Settings
                </Link>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle logout
                    setIsProfileDropdownOpen(false);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  Log Out
                </button>
              </div>
            )}
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
            {!isChat && (
              <>
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
              </>
            )}
            <div className="relative flex-shrink-0" ref={mobileDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                }}
                className="hover:opacity-80 transition-opacity"
                aria-label="Profile menu"
              >
                <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">M</span>
                </div>
              </button>
              {isProfileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100]"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <Link
                    to="/profile"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileDropdownOpen(false);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileDropdownOpen(false);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle logout
                      setIsProfileDropdownOpen(false);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Second row: Greeting - only on dashboard */}
        {isDashboard && (
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">
              {greeting}, {userName}!
            </h2>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

