import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AthleteList from "../components/AthleteList";

const Athlete = ({showAddAthleteModal,setShowAddAthleteModal}) => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const navigate = useNavigate();

  const sports = ["Bơi lội", "Chạy bộ", "Bắn súng", "Đấu kiếm", "Vượt chướng ngại vật", "3 môn phối hợp"];
  const ageGroups = ["Under 12", "Under 15", "Under 18", "Adult"];

  const handleToggle = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  // State lưu trữ form data
  const [athleteData, setAthleteData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
  });

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

  if (loading) return <p>Loading athletes...</p>;
  if (error) return <p>{error}</p>;

  // Hàm xử lý nhập liệu
  const handleChange = (e) => {
    setAthleteData({ ...athleteData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý lưu dữ liệu
  const handleSave = async () => {
    const fullData = {
      ...athleteData,
      sports: selectedSports,
      ageGroups: selectedAgeGroups,
    };
  
    try {
      // const response = await axios.post("http://localhost:5000/api/athletes", fullData);
      console.log("Saved athlete:", fullData);
  
      // Sau khi lưu xong:
      setShowAddAthleteModal(false); // đóng modal
      setAthleteData({               // reset form
        fullName: "",
        gender: "",
        dob: "",
        email: "",
        phone: "",
        address: "",
      });
      setSelectedSports([]);
      setSelectedAgeGroups([]);
  
      // // Gọi lại API hoặc thêm thủ công vào list nếu cần
      // const updated = await axios.get("http://localhost:5000/api/athletes");
      // setAthletes(updated.data);
    } catch (error) {
      console.error("Failed to save athlete:", error);
      alert("Đã có lỗi khi lưu vận động viên!");
    }
  };

  // Lọc vận động viên theo tên
  const filteredAthletes = athletes.filter((athlete) =>
    (athlete.fullName?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
  );

  const handleStatsClick = (athleteID) => {
    navigate("/analyst", { state: { athleteID } });
  };

  return (
    <div className="">
      {/* Athlete List Component */}
      <AthleteList
        athletes={filteredAthletes}
        onStatsClick={handleStatsClick}
      />

      {/* Modal thêm vận động viên */}
      {showAddAthleteModal && (
          <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50 z-[1000] "
            onClick={() => setShowAddAthleteModal(!showAddAthleteModal)}
          >
            <div
              className="p-4 rounded-xl w-full max-w-xl max-h-[90vh] border border-b-black overflow-auto text-black bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-md mx-auto p-4 rounded-lg">
                <h2 className="text-lg mb-3 text-[#00a884] font-bold ">
                  ADD ATHLETE
                </h2>

                {/* Personal Information */}
                <div className="mb-4 border-b pb-3">
                  {/* AVATAR */}
                  <div className="mt-3 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer border-2 border-[#00a884] hover:bg-gray-300 transition">
                      <span className="text-[#00a884] text-lg">+</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 font-medium">
                      Profile Picture
                    </span>
                  </div>

                  <h3 className="text-md font-medium mb-2 mt-4 text-[#00a884]">
                    Personal Information
                  </h3>
                  {/* FULLNAME */}
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-medium">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full border border-gray-300 rounded-lg p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884]"
                      placeholder="Enter full name"
                      value={athleteData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex gap-3">
                    {/* GENDER */}
                    <div className="w-1/2">
                      <label className="block text-gray-700 text-sm font-medium">
                        Gender*
                      </label>
                      <select
                        name="gender"
                        value={athleteData.gender}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884]"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    {/* DATE OF BIRTH */}
                    <div className="w-1/2">
                      <label className="block text-gray-700 text-sm font-medium">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={athleteData.dob}
                        onChange={handleChange}
                        placeholder="Select Date of Birth"
                        className="w-full border border-gray-300 rounded-lg p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884]"
                      />
                    </div>
                  </div>
                </div>

                {/* Sport Information */}
                <div className="mb-4 border-b pb-3">
                  <h3 className="text-md font-medium mb-2 text-[#00a884]">
                    Sport and Age Group
                  </h3>
                  <div className="flex gap-3">
                    {/* SPORT */}
                    <div className="w-1/2">
                      <label className="block text-gray-700 text-sm font-medium">
                        Sport
                      </label>
                      {sports.map((sport) => (
                        <label
                          key={sport}
                          className="flex items-center space-x-2 mb-1"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSports.includes(sport)}
                            onChange={() =>
                              handleToggle(
                                sport,
                                selectedSports,
                                setSelectedSports
                              )
                            }
                          />
                          <span>{sport}</span>
                        </label>
                      ))}
                    </div>

                    {/* AGE GROUP */}
                    <div className="w-1/2">
                      <label className="block text-gray-700 text-sm font-medium">
                        Age Group
                      </label>
                      {ageGroups.map((age) => (
                        <label
                          key={age}
                          className="flex items-center space-x-2 mb-1"
                        >
                          <input
                            type="checkbox"
                            checked={selectedAgeGroups.includes(age)}
                            onChange={() =>
                              handleToggle(
                                age,
                                selectedAgeGroups,
                                setSelectedAgeGroups
                              )
                            }
                          />
                          <span>{age}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-4">
                  <h3 className="text-md font-medium mb-2 text-[#00a884]">
                    Contact Information
                  </h3>
                  <div className="flex gap-3">
                    <div className="mb-2 w-1/2">
                      <label className="block text-gray-700 text-sm font-medium">
                        Email*
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full border border-gray-300 rounded-lg p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884]"
                        placeholder="Enter your email"
                        value={athleteData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2 w-1/2  ">
                      <label className="block text-gray-700 text-sm font-medium">
                        Phone*
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="w-full border border-gray-300 rounded-lg p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884]"
                        placeholder="Enter your phone"
                        value={athleteData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-medium">
                      Address
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-1.5 text-sm h-16 focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884]"
                      placeholder="Enter address"
                      name="address"
                      value={athleteData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                {/*Save-Close Button */}
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={handleSave}
                    className="bg-[#00a884] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#03634f] transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowAddAthleteModal(!showAddAthleteModal)}
                    className="bg-gray-300 text-black py-2 rounded-lg text-sm font-medium hover:bg-gray-400 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default Athlete;
