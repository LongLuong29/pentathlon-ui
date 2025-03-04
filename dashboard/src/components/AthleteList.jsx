import React from "react";

const AthleteList = ({ athletes, onStatsClick, extraColumns = [] }) => {
  return (
    <div className="w-full px-4 py-6 pt-28">
      <div className="rounded-xl border border-gray-200 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left">Full Name & Email</th>
              <th className="py-3 px-4 text-left">Gender</th>
              <th className="py-3 px-4 text-left">Date of Birth</th>
              <th className="py-3 px-4 text-left">Mobile Number</th>
              <th className="py-3 px-4 text-left">Address</th>
              {extraColumns.map((col, index) => (
                <th key={index} className="py-3 px-4 text-left">{col.header}</th>
              ))}
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={athlete.avatar || "../../public/download.jpg"}
                      className="h-10 w-10 rounded-full"
                      alt={athlete.name}
                    />
                    <div>
                      <p className="font-medium">{athlete.name}</p>
                      <p className="text-gray-500">{athlete.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">{athlete.gender}</td>
                <td className="py-3 px-4">{athlete.date_of_birth}</td>
                <td className="py-3 px-4">{athlete.phone}</td>
                <td className="py-3 px-4">{athlete.address}</td>
                {extraColumns.map((col, index) => (
                  <td key={index} className="py-3 px-4">{col.render(athlete)}</td>
                ))}
                <td className="py-3 px-4">
                  <button
                    onClick={() => onStatsClick(athlete.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    Stats
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AthleteList;
