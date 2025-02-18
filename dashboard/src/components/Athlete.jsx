import { useState } from "react";
import { Menu, X, Plus } from "lucide-react";

const Athlete = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex overflow-hidden bg-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 py-6 md:ml-64">
        {/* Navbar */}
        <div className="flex justify-between items-center py-3.5 px-4 flex-wrap gap-2">
          <h2 className="text-xl font-semibold">
            Welcome back, <span className="text-purple-600">Karina</span>
          </h2>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition">
            <Plus className="w-5 h-5" /> Add Athlete
          </button>
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Employee Status Table */}
        <div className="rounded-xl p-0.5 border border-solid border-gray-200 overflow-hidden">
          {/* Search bar */}
          <div className="flex flex-col min-[440px]:flex-row max-[440px]:gap-3 items-center justify-between p-4">
            <h2 className="text-base font-semibold text-gray-900">
              Employees Status
            </h2>
            <input
              type="text"
              placeholder="Search here"
              className="block w-full sm:max-w-52 pr-2.5 pl-8 py-2 text-xs font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Table Container (Scroll on Mobile) */}
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse min-w-[600px] ">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-3 text-left">
                    <input type="checkbox" className="w-4 h-4" />
                  </th>
                  <th className="py-3.5 pl-4 text-left text-xs font-medium text-gray-900 capitalize">
                    Full Name & Email
                  </th>
                  <th className="py-3.5 pl-4 text-left text-xs font-medium text-gray-900 capitalize">
                    Department
                  </th>
                  <th className="py-3.5 pl-4 text-left text-xs font-medium text-gray-900 capitalize">
                    Join Date
                  </th>
                  <th className="py-3.5 pl-4 text-left text-xs font-medium text-gray-900 capitalize">
                    Status
                  </th>
                  <th className="py-3.5 pl-4 text-left text-xs font-medium text-gray-900 capitalize">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 border-gray-200 last:border-0">
                    <td className="p-3">
                      <input type="checkbox" className="w-4 h-4" />
                    </td>
                    <td className="flex items-center space-x-2 py-3 pl-4">
                      <img
                        src={emp.avatar || "../../public/download.jpg"}
                        alt={emp.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-xs text-gray-800">
                          {emp.name}
                        </p>
                        <p className="font-normal text-xs text-gray-400">
                          {emp.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-3.5 pl-4 text-xs font-normal text-gray-800">
                      {emp.department}
                    </td>
                    <td className="py-3.5 pl-4 text-xs font-normal text-gray-800">
                      {emp.joinDate}
                    </td>
                    <td className="py-3.5 pl-4 text-sm font-medium text-gray-900 ">
                      <span
                        className={`px-2 py-1 text-sm font-medium rounded-md ${emp.statusColor}`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3.5 pl-4 text-center w-16">
                      ...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Athlete;
// Dummy Data
const employees = [
  {
    name: "Karina",
    email: "floydmiles@pagedone.io",
    avatar: "",
    department: "Design",
    joinDate: "Jun. 24, 2023",
    status: "Active",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    name: "Savannah Nguyen",
    email: "savannahng@pagedone.io",
    avatar:
      "https://i.pinimg.com/736x/19/ff/f1/19fff10e9ee3e6eb48e3f5b4a747685b.jpg",
    department: "Research",
    joinDate: "Feb. 23, 2023",
    status: "Inactive",
    statusColor: "bg-red-100 text-red-600",
  },
  {
    name: "Cameron Williamson",
    email: "cameron@pagedone.io",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsmcp9Lux1yo5R6LkuR2CCXClQU6MVSdEoqQ&s",
    department: "Development",
    joinDate: "Oct. 23, 2023",
    status: "Onboarding",
    statusColor: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Darrell Steward",
    email: "darrellstew@pagedone.io",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlfDFyNGXhVuT-p-Q9uXWajJTqNf0c2-gj8A&s",
    department: "AI & ML",
    joinDate: "Jul. 12, 2023",
    status: "Inactive",
    statusColor: "bg-red-100 text-red-600",
  },
  {
    name: "Laura Bran",
    email: "laurabran@pagedone.io",
    avatar:
      "https://pagedone.io/storage/templates/HR-Management-Dashboard-Tailwind-CSS-Template-free-figma-file/HR-Management-Dashboard-Tailwind-CSS-Template-free-figma-file/assets/images/tbl-img-1.png  ",
    department: "Design",
    joinDate: "Sep. 29, 2023",
    status: "Active",
    statusColor: "bg-green-100 text-green-600",
  },
];
