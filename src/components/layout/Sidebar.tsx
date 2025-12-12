import { useNavigate } from "react-router-dom";
import {
  DashboardIcon,
  SessionIcon,
  PsychologistsIcon,
  CalendarIcon,
  JournalIcon,
  GamesIcon,
  ChatIcon,
  LogoutIcon,
  ChevronLeftIcon,
} from "../icons";
import { NavItem } from "../shared/NavItem";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggle, isMobileMenuOpen = false, onMobileMenuClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Add logout logic (clear tokens, etc.)
    navigate("/");
    if (onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 h-screen w-64 bg-white flex flex-col z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo with Close Button */}
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-purple-600">MindLink</h1>
          <button
            onClick={onMobileMenuClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          <NavItem
            icon={<DashboardIcon className="w-5 h-5" />}
            label="Home"
            to="/home"
            isCollapsed={false}
            onClick={onMobileMenuClose}
          />
          <NavItem
            icon={<GamesIcon className="w-5 h-5" />}
            label="Cognitive Games"
            to="/games"
            isCollapsed={false}
            onClick={onMobileMenuClose}
          />
          <NavItem
            icon={<ChatIcon className="w-5 h-5" />}
            label="Chat"
            to="/chat"
            isCollapsed={false}
            onClick={onMobileMenuClose}
          />
          <NavItem
            icon={<PsychologistsIcon className="w-5 h-5" />}
            label="Support Network"
            to="/psychologists"
            isCollapsed={false}
            onClick={onMobileMenuClose}
          />
          <NavItem
            icon={<SessionIcon className="w-5 h-5" />}
            label="My Session"
            to="/sessions"
            isCollapsed={false}
            onClick={onMobileMenuClose}
          />
          <NavItem
            icon={<CalendarIcon className="w-5 h-5" />}
            label="Calendar"
            to="/calendar"
            isCollapsed={false}
            onClick={onMobileMenuClose}
          />
          <NavItem
            icon={<JournalIcon className="w-5 h-5" />}
            label="Journal"
            to="/journal"
            isCollapsed={false}
            onClick={onMobileMenuClose}
          />
        </nav>

        {/* Mobile Log Out */}
        <div className="p-3">
          <button
            className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleLogout}
          >
            <LogoutIcon className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block fixed left-0 top-0 h-screen bg-white flex flex-col z-10 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo with Menu Button */}
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-2xl font-semibold text-purple-600">MindLink</h1>
          )}
          {isCollapsed && <div className="flex-1" />}
          <button
            onClick={onToggle}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeftIcon className={`w-5 h-5 text-gray-700 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-hidden">
          <NavItem
            icon={<DashboardIcon className="w-5 h-5" />}
            label="Home"
            to="/home"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<GamesIcon className="w-5 h-5" />}
            label="Cognitive Games"
            to="/games"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<ChatIcon className="w-5 h-5" />}
            label="Chat"
            to="/chat"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<PsychologistsIcon className="w-5 h-5" />}
            label="Support Network"
            to="/psychologists"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<SessionIcon className="w-5 h-5" />}
            label="My Session"
            to="/sessions"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<CalendarIcon className="w-5 h-5" />}
            label="Calendar"
            to="/calendar"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<JournalIcon className="w-5 h-5" />}
            label="Journal"
            to="/journal"
            isCollapsed={isCollapsed}
          />
        </nav>

        {/* Log Out */}
        <div className="p-3">
          <button
            onClick={handleLogout}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors`}
          >
            <LogoutIcon className="w-5 h-5" />
            {!isCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

