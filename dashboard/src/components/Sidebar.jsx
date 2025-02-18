import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const menuItems = [
    { name: "🏠 Dashboard", path: "/" },
    { name: "🏃 Athlete", path: "/athlete" },
    { name: "📊 Analyst", path: "/analyst" },
    { name: "📅 Calendar", path: "/calendar" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0 transition-transform duration-300`}
    >
      <div className="p-4 flex justify-between items-center md:hidden">
        <h2 className="text-xl font-bold">🏋️ 5PH Sport</h2>
        <button onClick={() => setSidebarOpen(false)}>
          <X className="text-white w-6 h-6" />
        </button>
      </div>
      <h2 className="text-2xl font-bold p-4 hidden md:block">🏋️ 5PH Sport</h2>
      <nav>
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block py-2 px-4 rounded transition ${
                  location.pathname === item.path ? "bg-blue-500" : "hover:bg-gray-700"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
