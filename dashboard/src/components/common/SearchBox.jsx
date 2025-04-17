import { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <div className="relative w-max">
        <svg
          className="absolute top-1.5 sm:top-3 right-3 z-0"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M17.5001 17.5L15.4167 15.4167M15.8334 9.16667C15.8334 5.48477 12.8486 2.5 9.16673 2.5C5.48483 2.5 2.50006 5.48477 2.50006 9.16667C2.50006 12.8486 5.48483 15.8333 9.16673 15.8333C11.0006 15.8333 12.6615 15.0929 13.8668 13.8947C15.0814 12.6872 15.8334 11.0147 15.8334 9.16667Z"
            stroke="#6B7280"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-8 sm:w-11 h-8 sm:h-11 
            outline-0 cursor-pointer bg-transparent 
            relative z-10 transition-all duration-300 
            focus-within:border focus-within:border-gray-200 
            focus-within:w-80 focus-within:rounded-md focus-within:pl-3"
        />
      </div>
    </div>
  );
};

export default SearchBox; 