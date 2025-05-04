
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Book, FileText, MessageSquare, Search, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthStatus from '../auth/AuthStatus';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          <div className="relative">
            <input
              type="text"
              placeholder="Search for topics, formulas, or concepts..."
              className="w-full py-2 px-4 pl-10 bg-gray-100 border border-gray-200 rounded-full"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Bell size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Settings size={20} />
          </Button>
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
              {/* <li>
                <Link
                  to="/community"
                  className={cn(
                    "flex items-center py-3 px-4 rounded-md hover:bg-blue-50 hover:text-math-primary transition-colors",
                    location.pathname.startsWith("/community") ? "bg-blue-50 text-math-primary" : "text-gray-700"
                  )}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className={cn("ml-3 text-sm font-medium", !sidebarOpen && "md:hidden")}>Community</span>
                </Link>
              </li> */}
              {/* <li>
                <Link
                  to="/questions"
                  className={cn(
                    "flex items-center py-3 px-4 rounded-md hover:bg-blue-50 hover:text-math-primary transition-colors",
                    location.pathname.startsWith("/questions") ? "bg-blue-50 text-math-primary" : "text-gray-700"
                  )}
                >
                  <FileText className="w-5 h-5" />
                  <span className={cn("ml-3 text-sm font-medium", !sidebarOpen && "md:hidden")}>Question Papers</span>
                </Link>
              </li> */}
              {/* <li>
                <Link
                  to="/subscription"
                  className={cn(
                    "flex items-center py-3 px-4 rounded-md hover:bg-blue-50 hover:text-math-primary transition-colors",
                    location.pathname.startsWith("/subscription") ? "bg-blue-50 text-math-primary" : "text-gray-700"
                  )}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <span className={cn("ml-3 text-sm font-medium", !sidebarOpen && "md:hidden")}>Subscription</span>
                </Link>
              </li> */}
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
