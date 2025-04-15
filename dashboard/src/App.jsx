import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analyst from "./pages/Analyst";
import Calendar from "./pages/Calendar";
import Athlete from "./pages/Athlete";
import Header from "../src/components/Header";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);
  console.log(isSidebarOpen);

  return (
    <Router>
      <div className=" flex overflow-y-hidden bg-white font-inter">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <div
          className={`body h-full overflow-hidden lg:ml-auto max-lg:w-full relative px-4
           ${
             isSidebarOpen
               ? "lg:ml-64 lg:w-[calc(100%-256px)]"
               : "lg:ml-20 lg:w-[calc(100%-80px)]"
           } `}
        >
          {/* Header Component */}
          <Header
            // onSearch={setSearchTerm}
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            onAddAthlete={() => setShowAddAthleteModal(true)}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyst" element={<Analyst />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route
              path="/athlete"
              element={
                <Athlete
                  showAddAthleteModal={showAddAthleteModal}
                  setShowAddAthleteModal={setShowAddAthleteModal}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
