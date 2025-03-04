import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AthleteList = ({ athletes, onStatsClick, extraColumns = [] }) => {
  const [openRowId, setOpenRowId] = useState(null); // Lưu ID của hàng đang mở dropdown
  const navigate = useNavigate();

  const handleStatsClick = (athleteID) => {
    navigate("/analyst", { state: { athleteID } }); // Điều hướng sang trang /analyst
  };

  // Toggle dropdown của hàng cụ thể
  const toggleDropdown = (rowId) => {
    setOpenRowId(openRowId === rowId ? null : rowId); // Nếu đang mở thì đóng, nếu đang đóng thì mở
  };

  return (
    <>
      <div className="w-full sm:px-4 px-4 py-6 pt-28 h-[calc(100vh-0px)] overflow-y-auto">
        <div className="grid grid-cols-12 gap-6 pt6">
          <div className="col-span-12 xl:col-span-12">
            <div className="flex flex-col gap-6 w-full">
              {/** Content */}
              <div className="rounded-xl pb-4 border border-solid border-gray-200 overflow-auto">
                {/** Label and search input */}
                <div className="flex items-center justify-between p-4">
                  <h5 className="text-base font-semibold text-gray-900">
                    Athletes List
                  </h5>
                  <form>
                    <div className="relative text-gray-500 focus-within:text-gray-900">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="stroke-current ml-1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M12.25 12.25L10.7917 10.7917M11.0833 6.41667C11.0833 3.83934 8.994 1.75 6.41667 1.75C3.83934 1.75 1.75 3.83934 1.75 6.41667C1.75 8.994 3.83934 11.0833 6.41667 11.0833C7.70036 11.0833 8.86299 10.565 9.7067 9.72627C10.557 8.88101 11.0833 7.71031 11.0833 6.41667Z"
                            stroke="#111827"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="default-search"
                        className="block w-full max-w-52 pr-2.5 pl-8 py-2 text-xs font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none"
                        placeholder="Search here"
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <table className="w-full rounded-xl">
                  <thead>
                    <tr className="bg-gray-50">
                      {/* <th className="">
                          <div className="flex items-center py-3.5 pl-4">
                            <input
                              id="checkbox-for-all"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 appearance-none border border-gray-300 rounded-sm mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                            />
                          </div>
                        </th> */}
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize"
                      >
                        Full Name &amp; Email
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize"
                      >
                        Gender
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize"
                      >
                        Date of birth
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize"
                      >
                        Mobile Number
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 w-20 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {athletes.map((athlete, index) => (
                      <tr
                        className="bg-white transition-all duration-500 hover:bg-gray-50"
                        key={index}
                      >
                        <td className="pxy-3.5 pl-4 py-3">
                          <div className="w-48 flex items-center gap-3">
                            <img
                              src={athlete.avatar || "../../public/karina.jpg"}
                              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                              alt={athlete.name}
                            />
                            <div className="data">
                              <p className="font-medium text-xs text-gray-800">
                                {athlete.name}
                              </p>
                              <p className="font-normal text-xs text-gray-400">
                                {athlete.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 pl-4 whitespace-nowrap text-xs font-normal text-gray-800">
                          {athlete.gender}
                        </td>
                        <td className="py-3.5 pl-4 whitespace-nowrap text-xs font-normal text-gray-800">
                          {athlete.date_of_birth}
                        </td>
                        <td className="py-3.5 pl-4 whitespace-nowrap text-xs font-normal text-gray-800">
                          {athlete.phone}
                        </td>
                        <td className="py-3.5 pl-4 whitespace-nowrap text-xs font-normal text-gray-800">
                          {athlete.address}
                        </td>
                        <td className="py-3.5 pl-4 whitespace-nowrap text-xs font-normal text-gray-800">
                          <span
                            className={`inline-flex items-center ${athlete.statusColor} text-xs font-medium mr-2 pl-2 pr-2.5 rounded-full py-0.5`}
                          >
                            <span
                              className={"w-1 h-1 mr-1 rounded-full  flex"}
                            ></span>
                            {athlete.status}
                          </span>
                        </td>
                        <td className="flex py-3.5 w-16 items-center gap-0.5">
                          <div className="dropdown relative inline-flex mx-auto">
                            <button
                              type="button"
                              onClick={() => toggleDropdown(athlete.id)}
                              data-target="dropdown-action"
                              className="dropdown-toggle inline-flex justify-center items-center gap-2 p-0.5 text-sm text-white rounded-md cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M12.0161 16.9896V17.0396M12.0161 11.976V12.026M12.0161 6.96228V7.01228"
                                  stroke="#6B7280"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                ></path>
                              </svg>
                            </button>

                            {/* Dropdown menu */}
                            <div
                              id={`dropdown-action-${athlete.id}`}
                              className={`dropdown-menu rounded-xl shadow-lg bg-white absolute z-10 -right-8 top-full w-44 mt-2 ${
                                openRowId === athlete.id ? "block" : "hidden"
                              }`}
                              aria-labelledby="dropdown-default"
                            >
                              <ul className="py-2 flex flex-col gap-2.5 px-3">
                                <li className="flex items-center justify-start gap-1.5">
                                  <button className="group py-2 px-2 flex items-center gap-1.5 font-medium text-sm text-gray-500 border border-solid border-gray-300 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">
                                    <svg
                                      className="fill-gray-500 transition-all duration-300 group-hover:fill-gray-900"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_2051_8844)">
                                        <path
                                          d="M8.01997 12.2708L7.4509 11.7085L8.01997 12.2708ZM15.7742 4.42279L16.3433 4.98506L15.7742 4.42279ZM18.6216 4.38623L18.0672 4.96293V4.96293L18.6216 4.38623ZM19.5573 5.28588L20.1118 4.70918V4.70918L19.5573 5.28588ZM19.5934 8.0947L20.1625 8.65697L19.5934 8.0947ZM11.8392 15.9427L11.2701 15.3804L11.8392 15.9427ZM10.7383 16.5141L10.6044 15.7254L10.7383 16.5141ZM9.6421 16.7002L9.77598 17.4889H9.77598L9.6421 16.7002ZM7.30876 14.4568L6.51735 14.3399H6.51735L7.30876 14.4568ZM7.46918 13.3711L8.26058 13.4881V13.4881L7.46918 13.3711ZM7.40218 16.6648L6.84773 17.2414L7.40218 16.6648ZM20.5821 6.67736L21.382 6.66709V6.66709L20.5821 6.67736ZM17.1851 3.41144L17.1749 2.61151H17.1749L17.1851 3.41144ZM21 21.8001C21.4418 21.8001 21.8 21.4419 21.8 21.0001C21.8 20.5583 21.4418 20.2001 21 20.2001V21.8001ZM3 20.2001C2.55817 20.2001 2.2 20.5583 2.2 21.0001C2.2 21.4419 2.55817 21.8001 3 21.8001V20.2001ZM8.58905 12.8331L16.3433 4.98506L15.2051 3.86052L7.4509 11.7085L8.58905 12.8331ZM18.0672 4.96293L19.0029 5.86258L20.1118 4.70918L19.1761 3.80953L18.0672 4.96293ZM19.0243 7.53243L11.2701 15.3804L12.4083 16.505L20.1625 8.65697L19.0243 7.53243ZM10.6044 15.7254L9.50822 15.9115L9.77598 17.4889L10.8721 17.3028L10.6044 15.7254ZM8.10016 14.5738L8.26058 13.4881L6.67777 13.2542L6.51735 14.3399L8.10016 14.5738ZM9.50822 15.9115C8.85898 16.0217 8.45869 16.0876 8.17213 16.0946C7.90314 16.1013 7.91532 16.0483 7.95663 16.0881L6.84773 17.2414C7.25649 17.6344 7.76448 17.7052 8.21151 17.6942C8.64096 17.6836 9.17691 17.5906 9.77598 17.4889L9.50822 15.9115ZM6.51735 14.3399C6.42983 14.9322 6.34885 15.4659 6.34917 15.8926C6.3495 16.3398 6.43631 16.8459 6.84773 17.2414L7.95663 16.0881C8.0006 16.1303 7.94936 16.1507 7.94917 15.8914C7.94896 15.6115 8.005 15.2179 8.10016 14.5738L6.51735 14.3399ZM19.0029 5.86258C19.3591 6.20504 19.5669 6.40717 19.6961 6.56993C19.8113 6.71488 19.7827 6.73057 19.7822 6.68763L21.382 6.66709C21.3762 6.21282 21.1751 5.85947 20.9491 5.57487C20.7372 5.30808 20.4352 5.02015 20.1118 4.70918L19.0029 5.86258ZM20.1625 8.65697C20.4778 8.3378 20.7723 8.04221 20.9773 7.77007C21.1959 7.47976 21.3879 7.12137 21.382 6.66709L19.7822 6.68763C19.7816 6.6447 19.8105 6.65965 19.6992 6.8075C19.5741 6.97353 19.3716 7.18093 19.0243 7.53243L20.1625 8.65697ZM16.3433 4.98506C16.6904 4.63372 16.8956 4.42847 17.061 4.30059C17.2078 4.18717 17.2288 4.21095 17.1954 4.21138L17.1749 2.61151C16.7245 2.61729 16.3714 2.81141 16.0825 3.03466C15.8124 3.24345 15.5206 3.5412 15.2051 3.86052L16.3433 4.98506ZM19.1761 3.80953C18.8525 3.49842 18.5531 3.20826 18.2777 3.00648C17.9832 2.79071 17.6253 2.60573 17.1749 2.61151L17.1954 4.21138C17.162 4.2118 17.1825 4.1875 17.332 4.29711C17.5007 4.4207 17.7111 4.62062 18.0672 4.96293L19.1761 3.80953ZM7.4509 11.7085C7.26027 11.9015 7.03517 12.1163 6.89452 12.3973L8.32527 13.1135C8.32013 13.1238 8.32046 13.1166 8.35908 13.0724C8.4046 13.0203 8.46927 12.9543 8.58905 12.8331L7.4509 11.7085ZM8.26058 13.4881C8.28535 13.3204 8.29904 13.2302 8.31321 13.1634C8.32514 13.1071 8.33051 13.103 8.32527 13.1135L6.89452 12.3973C6.75345 12.6791 6.71713 12.9878 6.67777 13.2542L8.26058 13.4881ZM11.2701 15.3804C11.1504 15.5016 11.0852 15.5671 11.0334 15.6134C10.9896 15.6526 10.9816 15.6539 10.9901 15.6495L11.7272 17.0696C12.0059 16.925 12.2169 16.6987 12.4083 16.505L11.2701 15.3804ZM10.8721 17.3028C11.1425 17.2569 11.4493 17.2138 11.7272 17.0696L10.9901 15.6495C10.9985 15.6451 10.9923 15.6512 10.9339 15.6648C10.8654 15.6807 10.7733 15.6967 10.6044 15.7254L10.8721 17.3028ZM18.8977 8.65659L15.3422 5.10104L14.2108 6.23241L17.7663 9.78796L18.8977 8.65659ZM21 20.2001H3V21.8001H21V20.2001Z"
                                          fill=""
                                        ></path>
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_2051_8844">
                                          <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                          ></rect>
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                  <span className="text-sm font-medium text-gray-700">
                                    Edit
                                  </span>
                                </li>
                                <li className="flex items-center justify-start gap-1.5">
                                  <button
                                    onClick={() => onStatsClick(athlete.id)}
                                    className="group py-2 px-2 flex items-center gap-1.5 font-medium text-sm text-gray-500 border border-solid border-gray-300 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900"
                                  >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
</svg>

                                  </button>
                                  <span className="text-sm font-medium text-gray-700">
                                    Stats
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

    // <div className="w-full px-4 py-6 pt-28">
    //   <div className="rounded-xl border border-gray-200 overflow-auto">
    //     <table className="w-full">
    //       <thead>
    //         <tr className="bg-gray-50">
    //           <th className="py-3 px-4 text-left">Full Name & Email</th>
    //           <th className="py-3 px-4 text-left">Gender</th>
    //           <th className="py-3 px-4 text-left">Date of Birth</th>
    //           <th className="py-3 px-4 text-left">Mobile Number</th>
    //           <th className="py-3 px-4 text-left">Address</th>
    //           {extraColumns.map((col, index) => (
    //             <th key={index} className="py-3 px-4 text-left">{col.header}</th>
    //           ))}
    //           <th className="py-3 px-4 text-left">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {athletes.map((athlete, index) => (
    //           <tr key={index} className="hover:bg-gray-50">
    //             <td className="py-3 px-4">
    //               <div className="flex items-center gap-3">
    //                 <img
    //                   src={athlete.avatar || "../../public/download.jpg"}
    //                   className="h-10 w-10 rounded-full"
    //                   alt={athlete.name}
    //                 />
    //                 <div>
    //                   <p className="font-medium">{athlete.name}</p>
    //                   <p className="text-gray-500">{athlete.email}</p>
    //                 </div>
    //               </div>
    //             </td>
    //             <td className="py-3 px-4">{athlete.gender}</td>
    //             <td className="py-3 px-4">{athlete.date_of_birth}</td>
    //             <td className="py-3 px-4">{athlete.phone}</td>
    //             <td className="py-3 px-4">{athlete.address}</td>
    //             {extraColumns.map((col, index) => (
    //               <td key={index} className="py-3 px-4">{col.render(athlete)}</td>
    //             ))}
    //             <td className="py-3 px-4">
    //               <button
    //                 onClick={() => onStatsClick(athlete.id)}
    //                 className="px-3 py-1 bg-blue-500 text-white rounded-md"
    //               >
    //                 Stats
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default AthleteList;
