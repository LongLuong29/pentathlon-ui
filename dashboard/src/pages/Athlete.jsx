import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AthleteList from "../components/AthleteList";
import AddAthleteForm from "../components/AddAthleteForm";

const Athlete = ({showAddAthleteModal, setShowAddAthleteModal}) => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/athletes");
        setAthletes(response.data);
      } catch (err) {
        setError("Failed to fetch athletes");
      } finally {
        setLoading(false);
      }
    };
    fetchAthletes();
  }, []);

  const handleAddAthlete = async (athleteData) => {
    try {
      setLoading(true);
      // Tạo FormData để xử lý file upload
      const formData = new FormData();
      
      // Thêm avatar nếu có
      if (athleteData.avatar) {
        formData.append('avatar', athleteData.avatar);
      }
      
      // Thêm các trường dữ liệu khác
      Object.keys(athleteData).forEach(key => {
        if (key !== 'avatar') {
          if (Array.isArray(athleteData[key])) {
            formData.append(key, JSON.stringify(athleteData[key]));
          } else {
            formData.append(key, athleteData[key]);
          }
        }
      });

      const response = await axios.post(
        "http://localhost:5000/api/athletes",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Cập nhật danh sách athletes
      setAthletes(prev => [...prev, response.data]);
      
      // Đóng form
      setShowAddAthleteModal(false);
    } catch (error) {
      console.error("Failed to add athlete:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2 text-gray-500">
          <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading athletes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50/30">
      <div className="max-w-[2000px] mx-auto">
        {/* Athlete List Component */}
        <AthleteList
          athletes={athletes}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Add Athlete Form */}
        {showAddAthleteModal && (
          <AddAthleteForm
            onClose={() => setShowAddAthleteModal(false)}
            onSubmit={handleAddAthlete}
          />
        )}
      </div>
    </div>
  );
};

export default Athlete;
