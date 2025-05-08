import { Link, useLocation } from "react-router-dom";

const MenuItem = ({ item, isSidebarOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <li>
      <Link
        to={item.path}
        className={`group flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-indigo-50 text-indigo-600 font-medium shadow-sm' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
      >
        <div className={`${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'} transition-colors duration-200`}>
          {item.svgPath}
        </div>
        <span className={`whitespace-nowrap ${!isSidebarOpen ? 'lg:hidden' : ''} max-lg:block font-medium`}>
          {item.name}
        </span>
        {isActive && (
          <div className="absolute left-0 w-1 h-8 bg-indigo-600 rounded-r-full transform -translate-y-1/2 top-1/2" />
        )}
      </Link>
    </li>
  );
};

export default MenuItem; 