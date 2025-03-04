import { useState } from "react";
import { useNavigate } from "react-router-dom";
import athleteList from "../data/athleteList";
import Header from "../components/Header";
import AthleteList from "../components/AthleteList";

const Athlete = () => {
  const [athletes, setAthletes] = useState(athleteList);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);
  const navigate = useNavigate();

  // Lọc vận động viên theo tên
  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatsClick = (athleteID) => {
    navigate("/analyst", { state: { athleteID } });
  };

  return (
    <div>
      {/* Header Component */}
      <Header onSearch={setSearchTerm} onAddAthlete={() => setShowAddAthleteModal(true)} />

      {/* Athlete List Component */}
      <AthleteList athletes={filteredAthletes} onStatsClick={handleStatsClick} />

      {/* Modal thêm vận động viên */}
      {showAddAthleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-medium">Add Athlete</h2>
            <button
              onClick={() => setShowAddAthleteModal(false)}
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Athlete;
