import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuItem from "../common/MenuItem";
import UserProfile from "../common/UserProfile";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const { logout } = useAuth();

  // Đóng sidebar khi click ra ngoài (chỉ áp dụng cho mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.getElementById("sidebar");
      const toggleButton = document.getElementById("sidebar-toggle");
      if (
        window.innerWidth < 1024 &&
        sidebar &&
        !sidebar.contains(e.target) &&
        toggleButton &&
        !toggleButton.contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        document.body.style.overflow = '';
      } else if (isSidebarOpen) {
        document.body.style.overflow = 'hidden';
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener('resize', handleResize);

    // Set initial overflow
    if (window.innerWidth < 1024 && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [setIsSidebarOpen, isSidebarOpen]);

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
      name: "Athlete",
      path: "/athletes",
      svgPath: (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="stroke-gray-500 transition-all duration-500 group-hover:stroke-indigo-600"
          >
            <path
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
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
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="stroke-gray-500 transition-all duration-500 group-hover:stroke-indigo-600"
          >
            <path
              stroke=""
              strokeWidth="1.6"
              strokeLinecap="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
            />
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
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed inset-y-0 left-0 z-50 
          flex flex-col flex-shrink-0 
          w-64 max-h-screen overflow-hidden
          transition-all transform duration-300 ease-in-out
          bg-white border-r border-gray-200/80
          ${!isSidebarOpen ? "-translate-x-full lg:translate-x-0 lg:w-20" : "translate-x-0"} 
          lg:z-[1000] max-sm:w-[280px]
        `}
      >
        {/* Sidebar header */}
        <div className="flex-shrink-0 px-4">
          <div className="border-b w-full border-gray-200/80 py-4 flex items-center justify-between">
            <span
              className={`
                ${!isSidebarOpen ? "lg:hidden" : ""} 
                text-lg font-bold text-gray-800 
                transition-all duration-300
                whitespace-nowrap overflow-hidden
              `}
            >
              Pentathlon Sport
            </span>
            <button
              id="sidebar-toggle"
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100/80 transition-all duration-200"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-5 h-5 text-gray-500 transition-all duration-300 ${
                  !isSidebarOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar menu */}
        <nav className="flex-1 overflow-hidden hover:overflow-y-auto pt-4">
          <h5 
            className={`
              py-1.5 pl-4 text-xs font-medium text-gray-400 
              uppercase tracking-wider
              ${!isSidebarOpen ? "lg:hidden" : ""}
            `}
          >
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
          <div className="py-4 px-4 flex justify-between items-center border-t border-gray-200/80 bg-gray-50/50">
            <UserProfile
              isSidebarOpen={isSidebarOpen}
              user={{
                name: "Admin",
                username: "@admin",
                avatar: "../../../public/messi.jpg",
              }}
            />
            <button
              onClick={handleSignOut}
              className={`
                ${!isSidebarOpen ? "lg:hidden" : ""} 
                rounded-lg p-2 bg-white 
                transition-all duration-200 
                hover:bg-red-50 hover:text-red-600 
                text-gray-500
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
