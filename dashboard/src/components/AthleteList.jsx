import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from '../utils/index';

const AthleteList = ({ athletes = [], searchTerm, onSearchChange }) => {
  const [openRowId, setOpenRowId] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [selectedAthletes, setSelectedAthletes] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const navigate = useNavigate();

  // Đảm bảo athletes luôn là một mảng
  const safeAthletes = Array.isArray(athletes) ? athletes : [];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode('grid');
      } else {
        setViewMode('table');
      }
    };

    // Set initial view mode based on screen size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStatsClick = (athleteID) => {
    navigate("/analyst", { state: { athleteID } });
  };

  const toggleDropdown = (rowId) => {
    setOpenRowId(openRowId === rowId ? null : rowId);
  };

  const toggleSelectAthlete = (athleteId) => {
    setSelectedAthletes(prev => 
      prev.includes(athleteId) 
        ? prev.filter(id => id !== athleteId)
        : [...prev, athleteId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedAthletes(
      selectedAthletes.length === safeAthletes.length ? [] : safeAthletes.map(a => a.id)
    );
  };

  const toggleView = (mode) => {
    if (!isMobile) {
      setViewMode(mode);
    }
  };

  const filteredAthletes = safeAthletes.filter(athlete => 
    athlete.fullname?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    athlete.email?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    athlete.phone?.includes(searchTerm || '')
  );

  return (
    <div className="w-full px-2 py-6 h-[calc(100vh-0px)] overflow-y-auto">
      <div className="max-w-[2000px] mx-auto">
        <div className="rounded-xl border border-solid border-gray-200 overflow-hidden bg-white shadow-sm">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 border-b border-gray-200 gap-4">
            <h5 className="text-lg font-semibold text-gray-900">
              Athletes List
            </h5>
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  className="w-full min-w-[240px] pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search athletes..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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

              {/* View Toggle - Hide on mobile */}
              {!isMobile && (
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => toggleView('table')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'table'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => toggleView('grid')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'grid'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          {(viewMode === 'table' && !isMobile) ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="w-12">
                      <div className="flex items-center py-3.5 pl-4">
                        <input
                          type="checkbox"
                          checked={selectedAthletes.length === safeAthletes.length}
                          onChange={toggleSelectAll}
                          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                    </th>
                    <th className="py-3.5 pl-4 text-left text-xs font-medium text-gray-900">
                      Full Name & Email
                    </th>
                    <th className="py-3.5 pl-4 text-left text-xs font-medium text-gray-900 hidden md:table-cell">
                      Gender
                    </th>
                    <th className="py-3.5 pl-4 text-left text-xs font-medium text-gray-900 hidden lg:table-cell">
                      Date of Birth
                    </th>
                    <th className="py-3.5 pl-4 text-left text-xs font-medium text-gray-900 hidden sm:table-cell">
                      Mobile Number
                    </th>
                    <th className="py-3.5 pl-4 text-left text-xs font-medium text-gray-900 hidden xl:table-cell">
                      Address
                    </th>
                    <th className="py-3.5 pl-4 text-left text-xs font-medium text-gray-900">
                      Status
                    </th>
                    <th className="py-3.5 pl-4 w-20 text-left text-xs font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAthletes.map((athlete, index) => (
                    <tr
                      key={index}
                      className="group transition-colors hover:bg-gray-50/50"
                    >
                      <td className="w-12">
                        <div className="flex items-center py-3.5 pl-4">
                          <input
                            type="checkbox"
                            checked={selectedAthletes.includes(athlete.id)}
                            onChange={() => toggleSelectAthlete(athlete.id)}
                            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                      </td>
                      <td className="py-3.5 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={athlete.avatar || "../../public/default-user-avatar.png"}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                              alt={athlete.fullname}
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">
                              {athlete.fullname}
                            </p>
                            <p className="text-xs text-gray-500">
                              {athlete.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pl-4 text-sm text-gray-500 hidden md:table-cell">
                        {athlete.gender === 'male' ? 'Male' : athlete.gender === 'female' ? 'Female' : athlete.gender}
                      </td>
                      <td className="py-3.5 pl-4 text-sm text-gray-500 hidden lg:table-cell">
                        {formatDate(athlete.date_of_birth)}
                      </td>
                      <td className="py-3.5 pl-4 text-sm text-gray-500 hidden sm:table-cell">
                        {athlete.phone}
                      </td>
                      <td className="py-3.5 pl-4 text-sm text-gray-500 hidden xl:table-cell">
                        {athlete.address}
                      </td>
                      <td className="py-3.5 pl-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          athlete.status === 'Active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
                            athlete.status === 'Active' ? 'bg-green-400' : 'bg-gray-400'
                          }`}></span>
                          {athlete.status}
                        </span>
                      </td>
                      <td className="py-3.5 pl-4">
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(athlete.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>

                          {openRowId === athlete.id && (
                            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                              <div className="py-1">
                                <button
                                  onClick={() => {/* Edit action */}}
                                  className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                  </svg>
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleStatsClick(athlete.id)}
                                  className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                  </svg>
                                  Stats
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
              {filteredAthletes.map((athlete) => (
                <div key={athlete.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={athlete.avatar || "../../public/default-user-avatar.png"}
                          alt={athlete.fullname}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                        />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{athlete.fullname}</h3>
                          <p className="text-xs text-gray-500">{athlete.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleDropdown(athlete.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {athlete.gender === 'male' ? 'Male' : athlete.gender === 'female' ? 'Female' : athlete.gender}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(athlete.date_of_birth)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {athlete.phone}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        athlete.status === 'Active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
                          athlete.status === 'Active' ? 'bg-green-400' : 'bg-gray-400'
                        }`}></span>
                        {athlete.status}
                      </span>
                      <button
                        onClick={() => handleStatsClick(athlete.id)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Stats
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">{filteredAthletes.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    2
                  </button>
                  <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                    3
                  </button>
                  <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteList;
