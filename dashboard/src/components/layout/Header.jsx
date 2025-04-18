import { useState } from "react";
import { useLocation } from "react-router-dom";

const Header = ({ toggleSidebar, isSidebarOpen, onAddAthlete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isAthletePage = location.pathname === "/athlete";
  const isCalendarPage = location.pathname === "/calendar";

  return (
    <div className={`flex items-center justify-between gap-4 py-2.5 px-4 bg-white 
    fixed z-20 top-0 max-lg:left-0 lg:fixed right-0 backdrop-blur-sm bg-white/80 
    ${isSidebarOpen ? 'lg:ml-64 lg:w-[calc(100%-256px)]' : 'lg:ml-20 lg:w-[calc(100%-80px)]'}`}>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100/80 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </button>

        <div className="welcome-username">
          <h6 className="text-sm sm:text-lg font-semibold text-gray-900">
            Welcome back, <span className="text-indigo-600 font-bold">Ronald!</span>
          </h6>
          <p className="text-[10px] sm:text-sm text-gray-500">Home</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="sm:hidden w-10 h-10 flex items-center justify-center hover:bg-gray-100/80 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          
          <div className={`${isSearchOpen ? 'flex' : 'hidden'} sm:flex absolute sm:relative right-0 top-12 sm:top-0 w-[280px] sm:w-[240px] bg-white sm:bg-transparent shadow-lg sm:shadow-none rounded-lg sm:rounded-none p-2 sm:p-0 border border-gray-100 sm:border-0`}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
            <svg
              className="absolute left-5 sm:left-3 top-4 sm:top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Add Training Button - Only show on Calendar page */}
        {isCalendarPage && (
          <button className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-indigo-100 hover:shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <span className="hidden sm:inline">Add Training</span>
          </button>
        )}

        {/* Add Athlete Button - Only show on Athlete page */}
        {isAthletePage && (
          <button 
            onClick={onAddAthlete}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-indigo-100 hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="hidden sm:inline">Add Athlete</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header; 