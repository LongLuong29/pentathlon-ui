import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {athleteList , updateAthleteList} from "../data/athleteList";
import Header from "../components/Header";
import AthleteList from "../components/AthleteList";

const Athlete = () => {
  const [athletes, setAthletes] = useState(athleteList);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);
  const navigate = useNavigate();

  // State lưu trữ form data
  const [athleteData, setAthleteData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
  });

  // Hàm xử lý nhập liệu
  const handleChange = (e) => {
    setAthleteData({ ...athleteData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý lưu dữ liệu
  const handleSave = () => {
    console.log(athleteData)
    updateAthleteList(athleteData)
  }

  // Lọc vận động viên theo tên
  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatsClick = (athleteID) => {
    navigate("/analyst", { state: { athleteID } });
  };

  return (
    <div className="">
      {/* Header Component */}
      <Header
        onSearch={setSearchTerm}
        onAddAthlete={() => setShowAddAthleteModal(true)}
      />

      {/* Athlete List Component */}
      <AthleteList
        athletes={filteredAthletes}
        onStatsClick={handleStatsClick}
      />

      {/* Modal thêm vận động viên */}
      {showAddAthleteModal && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50 z-[1000]"
          onClick={() => setShowAddAthleteModal(false)}
        >
          <div
            className="p-4 rounded-xl w-[400px] max-h-screen  border border-b-black overflow-auto text-black bg-white shadow-lg"
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
                    className="w-full border border-gray-300 rounded-lg p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884]">
                      <option>Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
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

              {/* Contact Information */}
              <div className="mb-4">
                <h3 className="text-md font-medium mb-2 text-[#00a884]">
                  Contact Information
                </h3>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-medium">
                      Email*
                    </label>
                    <input
                      type = "email"
                      name= "email"
                      className="w-full border border-gray-300 rounded-lg p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884]"
                      placeholder="Enter your email"
                      value={athleteData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
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
                 className="bg-[#00a884] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#03634f] transition">
                  Save
                </button>
                <button onClick={() => setShowAddAthleteModal(false)}
                 className="bg-gray-300 text-black py-2 rounded-lg text-sm font-medium hover:bg-gray-400 transition">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {showAddAthleteModal && (
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
      )} */}
    </div>
  );
};

export default Athlete;
