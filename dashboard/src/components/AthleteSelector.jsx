import { useState } from 'react';

const AthleteSelector = ({ athletes, selectedAthlete, onAthleteSelect }) => {
  const [searchAthlete, setSearchAthlete] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="mb-4 relative">
      <label className="block font-semibold">Chọn vận động viên:</label>
      <input
        type="text"
        placeholder="Nhập tên VĐV..."
        value={searchAthlete}
        onChange={(e) => {
          setSearchAthlete(e.target.value);
          setDropdownOpen(true);
        }}
        className="w-full p-2 border rounded"
      />
      {dropdownOpen && searchAthlete && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow-md mt-1 max-h-40 overflow-y-auto">
          {athletes
            .filter((athlete) =>
              athlete.fullname
                .toLowerCase()
                .includes(searchAthlete.toLowerCase())
            )
            .map((athlete) => (
              <li
                key={athlete.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  onAthleteSelect(athlete.id, athlete.fullname);
                  setSearchAthlete(athlete.fullname);
                  setDropdownOpen(false);
                }}
              >
                {athlete.fullname}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AthleteSelector; 