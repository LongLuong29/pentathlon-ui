import { useState } from "react";
import SearchBox from "../common/SearchBox";

const Header = ({ onSearch, onAddAthlete, toggleSidebar, isSidebarOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={`flex items-center justify-between gap-1 sm:gap-6 py-3.5 px-4 border-b border-solid border-gray-200 
    fixed z-20 top-0 max-lg:left-0 bg-white lg:fixed right-0  ${isSidebarOpen ? 'lg:ml-64 lg:w-[calc(100%-256px)]' : 'lg:ml-20 lg:w-[calc(100%-80px)]'}`}>
      <div className="relative flex">
        <button
          onClick={toggleSidebar}
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 lg:hidden `}
        >
          {/* Nút toggle chỉ hiện trên mobile (<lg) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </button>
        <div className="block max-lg:pl-6 pl-4">
          <h6 className="text-sm sm:text-lg font-semibold text-gray-900 whitespace-nowrap mb-0.5">
            Welcome back,
            <span className="text-indigo-600 text-base sm:text-lg font-semibold">
              Ronald!
            </span>
          </h6>
          <p className="text-xs font-medium text-gray-900">Home</p>
        </div>
      </div>

      <div className="max-sm:hidden flex items-center gap-4">
        <SearchBox onSearch={onSearch} />
        <p className="text-gray-200 font-normal">|</p>
      </div>
    </div>
  );
};

export default Header; 