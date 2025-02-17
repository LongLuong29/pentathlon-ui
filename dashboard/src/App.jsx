import { useState } from "react";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex overflow-y-hidden bg-white">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <div className="flex flex-col h-full ">
          {/* Logo & Toggle Button */}
          <div
            className="brand border-b w-full border-solid border-gray-200 flex items-center justify-between relative py-6 px-4"
          >
            <span className="text-2xl font-bold text-purple-600">Pagedone</span>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          {/* <hr class="mt-8 border-gray-300"/> */}

          {/* Menu */}
          <nav className="flex-1 overflow-hidden overflow-y-auto pt-6">
            <ul className="p-2 overflow-hidden flex flex-col gap-1">
              <li className="group flex items-center gap-3 text-gray-500 text-sm font-medium py-2 px-3 rounded-lg transition-all duration-500 hover:bg-gray-50 active:bg-gray-50 hover:text-gray-900">
                📊 Dashboard
              </li>
              <li className="group flex items-center gap-3 text-gray-500 text-sm font-medium py-2 px-3 rounded-lg transition-all duration-500 hover:bg-gray-50 active:bg-gray-50 hover:text-gray-900">
                👥 Employees
              </li>
              <li className="group flex items-center gap-3 text-gray-500 text-sm font-medium py-2 px-3 rounded-lg transition-all duration-500 hover:bg-gray-50 active:bg-gray-50 hover:text-gray-900">
                🗓 Calendar
              </li>
              {/* <li className="group flex items-center gap-3 text-gray-500 text-sm font-medium py-2 px-3 rounded-lg transition-all duration-500 hover:bg-gray-50 active:bg-gray-50 hover:text-gray-900">🏖 Leaves</li>
              <li className="group flex items-center gap-3 text-gray-500 text-sm font-medium py-2 px-3 rounded-lg transition-all duration-500 hover:bg-gray-50 active:bg-gray-50 hover:text-gray-900">💰 Payroll</li>
              <li className="group flex items-center gap-3 text-gray-500 text-sm font-medium py-2 px-3 rounded-lg transition-all duration-500 hover:bg-gray-50 active:bg-gray-50 hover:text-gray-900">📄 Documents</li> */}
            </ul>
          </nav>

          {/* User Info */}
          <div className="mt-auto flex items-center space-x-3 p-3 border-t border-solid border-gray-200">
            <img
              src="data:image/jpeg;base64,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"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-xs text-gray-900 mb-0.5">Karina</p>
              <p className="font-medium text-xs text-gray-500">@kariankarian</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 py-6 md:ml-64">
        {/* Navbar */}
        <div className="flex justify-between items-center py-3.5 px-4">
          <h2 className="text-xl font-semibold">
            Welcome back, <span className="text-purple-600">Karina</span>
          </h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Employee Status Table */}
        <div className="rounded-xl p-0.5 border border-solid border-gray-200 overflow-auto">
          <div className="flex flex-col min-[440px]:flex-row max-[440px]:gap-3 items-center justify-between p-4">
            <h2 className="text-base font-semibold text-gray-900">
              Employees Status
            </h2>
            <input
              type="text"
              placeholder="Search here"
              className="block w-full max-w-52 pr-2.5 pl-8 py-2 text-xs font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none"
            />
          </div>{" "}
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                <th className="py-3.5 pl-4 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize">
                  Full Name & Email
                </th>
                <th className="py-3.5 pl-4 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize">
                  Department
                </th>
                <th className="py-3.5 pl-4 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize">
                  Join Date
                </th>
                <th className="py-3.5 pl-4 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize">
                  Status
                </th>
                <th className="py-3.5 pl-4 text-left whitespace-nowrap text-xs font-medium text-gray-900 capitalize">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="p-2 flex items-center space-x-2">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className="text-sm text-gray-500">{emp.email}</p>
                    </div>
                  </td>
                  <td className="p-2">{emp.department}</td>
                  <td className="p-2">{emp.joinDate}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded-md ${emp.statusColor}`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-2 text-center">...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Dummy Data
const employees = [
  {
    name: "Karina",
    email: "floydmiles@pagedone.io",
    avatar:
      "data:image/jpeg;base64,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",
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

export default Dashboard;
