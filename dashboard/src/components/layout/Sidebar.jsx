import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuItem from "../common/MenuItem";
import UserProfile from "../common/UserProfile";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const mobileSize = window.innerWidth <= 768;

  // Đóng sidebar khi click ra ngoài (chỉ áp dụng cho mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.getElementById("sidebar");
      if (window.innerWidth < 1024 && sidebar && !sidebar.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSidebarOpen]);

  const handleSignOut = () => {
    logout();
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      svgPath: (
        <span>
          <svg
            className="stroke-gray-500 transition-all duration-500 group-hover:stroke-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M12.5 14.0902L7.5 14.0902M2.5 9.09545V14.0902C2.5 15.6976 2.5 16.5013 2.98816 17.0006C3.47631 17.5 4.26198 17.5 5.83333 17.5H14.1667C15.738 17.5 16.5237 17.5 17.0118 17.0006C17.5 16.5013 17.5 15.6976 17.5 14.0902V10.9203C17.5 9.1337 17.5 8.24039 17.1056 7.48651C16.7112 6.73262 15.9846 6.2371 14.5313 5.24606L11.849 3.41681C10.9528 2.8056 10.5046 2.5 10 2.5C9.49537 2.5 9.04725 2.80561 8.151 3.41681L3.98433 6.25832C3.25772 6.75384 2.89442 7.0016 2.69721 7.37854C2.5 7.75548 2.5 8.20214 2.5 9.09545Z"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
      ),
    },
    {
      name: "Analyst",
      path: "/analyst",
      svgPath: (
        <span>
          <svg
            className="stroke-gray-500 transition-all duration-500 group-hover:stroke-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M17.5 5.83333V14.1667C17.5 15.738 17.5 16.5237 17.0118 17.0118C16.5237 17.5 15.738 17.5 14.1667 17.5H5.83333C4.26198 17.5 3.47631 17.5 2.98816 17.0118C2.5 16.5237 2.5 15.738 2.5 14.1667V5.83333C2.5 4.26198 2.5 3.47631 2.98816 2.98816C3.47631 2.5 4.26198 2.5 5.83333 2.5H14.1667C15.738 2.5 16.5237 2.5 17.0118 2.98816C17.5 3.47631 17.5 4.26198 17.5 5.83333Z"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
            <path
              d="M6.66699 10.0003L9.16699 12.5003L13.3337 7.50033"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
      ),
    },
    {
      name: "Calendar",
      path: "/calendar",
      svgPath: (
        <span>
          <svg
            className="stroke-gray-500 transition-all duration-500 group-hover:stroke-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M2.5 7.50033C2.5 5.92898 2.5 5.14331 2.98816 4.65516C3.47631 4.16699 4.26198 4.16699 5.83333 4.16699H14.1667C15.738 4.16699 16.5237 4.16699 17.0118 4.65516C17.5 5.14331 17.5 5.92898 17.5 7.50033V7.50033V14.167C17.5 15.7383 17.5 16.524 17.0118 17.0122C16.5237 17.5003 15.738 17.5003 14.1667 17.5003H5.83333C4.26198 17.5003 3.47631 17.5003 2.98816 17.0122C2.5 16.524 2.5 15.7383 2.5 14.167V14.167V7.50033Z"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
            <path
              d="M5.83301 2.5V5.83333"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
            <path
              d="M14.167 2.5V5.83333"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
            <path
              d="M2.5 8.33301H17.5"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
            <path
              d="M5.83301 11.667H6.66634"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
            <path
              d="M9.16699 11.667H10.0003"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
            <path
              d="M12.5 11.667H13.3333"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
            <path
              d="M5.83301 14.167H6.66634"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
            <path
              d="M9.16699 14.167H10.0003"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
            <path
              d="M12.5 14.167H13.3333"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
      ),
    },
    {
      name: "Athlete",
      path: "/athlete",
      svgPath: (
        <span>
          <svg
            className="stroke-gray-500 transition-all duration-500 group-hover:stroke-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M12.5 14.0902L7.5 14.0902M2.5 9.09545V14.0902C2.5 15.6976 2.5 16.5013 2.98816 17.0006C3.47631 17.5 4.26198 17.5 5.83333 17.5H14.1667C15.738 17.5 16.5237 17.5 17.0118 17.0006C17.5 16.5013 17.5 15.6976 17.5 14.0902V10.9203C17.5 9.1337 17.5 8.24039 17.1056 7.48651C16.7112 6.73262 15.9846 6.2371 14.5313 5.24606L11.849 3.41681C10.9528 2.8056 10.5046 2.5 10 2.5C9.49537 2.5 9.04725 2.80561 8.151 3.41681L3.98433 6.25832C3.25772 6.75384 2.89442 7.0016 2.69721 7.37854C2.5 7.75548 2.5 8.20214 2.5 9.09545Z"
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
      ),
    },
  ];

  return (
    <aside 
      id="sidebar"
      className={`border-r border-solid border-gray-200 
      fixed inset-y-0 z-50 flex flex-col flex-shrink-0 
      w-64 max-h-screen overflow-auto transition-all transform
      ${!isSidebarOpen ? '-translate-x-full lg:translate-x-0 lg:w-20' : ''} bg-white shadow-lg lg:z-[1000] max-sm:w-full lg:fixed lg:shadow-none`}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between flex-shrink-0 px-4">
        <div className={`border-b w-full border-solid border-gray-200 py-6 flex items-center justify-between relative`}>
          <span className={`${!isSidebarOpen ? 'lg:hidden': ''}`}>
            Pentathlon Sport
          </span>
          <button 
            className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className={`size-4 ${!isSidebarOpen ? 'rotate-180' : ''}`}
            >
              <path d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar menu */}
      <nav className="flex-1 overflow-hidden overflow-y-auto pt-6 text-gray-400">
        <h5 className="py-1.5 pl-3 text-xs font-medium text-gray-400 uppercase">
          MENU
        </h5>
        <ul className="p-2 overflow-hidden flex flex-col gap-1">
          {menuItems.map((item) => (
            <MenuItem 
              key={item.path} 
              item={item} 
              isSidebarOpen={isSidebarOpen} 
            />
          ))}
        </ul>
      </nav>

      {/* Sidebar footer */}
      <div className="flex-shrink-0">
        <div className="py-5 px-4 flex justify-between items-center border-t border-solid border-gray-200">
          <UserProfile 
            isSidebarOpen={isSidebarOpen}
            user={{
              name: "Admin",
              username: "@admin",
              avatar: "../../public/messi.jpg"
            }}
          />
          <button 
            onClick={handleSignOut}
            className={`${!isSidebarOpen ? 'lg:hidden': ''} rounded-full p-2 bg-white transition-all duration-500 hover:bg-red-50 hover:text-red-600 text-gray-500`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 