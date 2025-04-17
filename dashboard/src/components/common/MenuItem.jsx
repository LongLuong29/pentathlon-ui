import { Link, useLocation } from "react-router-dom";

const MenuItem = ({ item, isSidebarOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <li>
      <Link
        to={item.path}
        className={`group flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-300
        ${isActive 
          ? 'bg-indigo-50 text-indigo-600' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
      >
        {item.svgPath}
        <span className={`whitespace-nowrap ${!isSidebarOpen ? 'lg:hidden' : ''} max-lg:block`}>
          {item.name}
        </span>
      </Link>
    </li>
  );
};

export default MenuItem; 