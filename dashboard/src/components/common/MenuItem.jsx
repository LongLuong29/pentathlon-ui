import { Link } from "react-router-dom";

const MenuItem = ({ item, isSidebarOpen }) => {
  return (
    <Link to={item.path}>
      <li className={`
        ${!isSidebarOpen ? 'justify-center': ''} 
        flex items-center gap-3 
        text-gray-500 text-sm font-medium 
        py-2 px-3 rounded-lg 
        transition-all duration-500 
        hover:bg-gray-200 active:bg-gray-50 
        hover:text-gray-900
      `}>
        <span>{item.svgPath}</span>
        <span className={`max-md:hidden ${!isSidebarOpen ? 'lg:hidden': ''}`}>
          {item.name}
        </span>
      </li>
    </Link>
  );
};

export default MenuItem; 