
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Book, FileText, MessageSquare, Search, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthStatus from '../auth/AuthStatus';
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your subscription is active", read: false, date: "5 mins ago" },
    { id: 2, text: "New content available in Linear Algebra", read: false, date: "3 hours ago" },
    { id: 3, text: "Welcome to MATHPATH!", read: true, date: "2 days ago" }
  ]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching for content",
        description: `Looking for "${searchQuery}"`,
      });
      navigate(`/content?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      read: true
    })));
    toast({
      title: "All notifications marked as read"
    });
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 p-1 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-math-primary">MATHPATH</span>
          </Link>
        </div>
        <div className="flex-1 mx-4 max-w-3xl relative hidden md:block">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for topics, formulas, or concepts..."
                className="w-full py-2 px-4 pl-10 bg-gray-100 border border-gray-200 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600 relative">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "p-4 hover:bg-gray-50 cursor-pointer",
                          !notification.read && "bg-blue-50"
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <p className="text-sm font-medium">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Settings size={20} />
            </Button>
          </Link>
          <AuthStatus />
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-white border-r border-gray-200 w-64 flex-shrink-0 transition-all duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
          )}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className={cn(
                    "flex items-center py-3 px-4 rounded-md hover:bg-blue-50 hover:text-math-primary transition-colors",
                    location.pathname === "/" ? "bg-blue-50 text-math-primary" : "text-gray-700"
                  )}
                >
                  <Book className="w-5 h-5" />
                  <span className={cn("ml-3 text-sm font-medium", !sidebarOpen && "md:hidden")}>Learning Content</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/subscription"
                  className={cn(
                    "flex items-center py-3 px-4 rounded-md hover:bg-blue-50 hover:text-math-primary transition-colors",
                    location.pathname === "/subscription" ? "bg-blue-50 text-math-primary" : "text-gray-700"
                  )}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <span className={cn("ml-3 text-sm font-medium", !sidebarOpen && "md:hidden")}>Subscription</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className={cn(
                    "flex items-center py-3 px-4 rounded-md hover:bg-blue-50 hover:text-math-primary transition-colors",
                    location.pathname === "/settings" ? "bg-blue-50 text-math-primary" : "text-gray-700"
                  )}
                >
                  <Settings className="w-5 h-5" />
                  <span className={cn("ml-3 text-sm font-medium", !sidebarOpen && "md:hidden")}>Settings</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={cn(
                    "flex items-center py-3 px-4 rounded-md hover:bg-blue-50 hover:text-math-primary transition-colors",
                    location.pathname === "/profile" ? "bg-blue-50 text-math-primary" : "text-gray-700"
                  )}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className={cn("ml-3 text-sm font-medium", !sidebarOpen && "md:hidden")}>Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
