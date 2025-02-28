import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Select from "react-select";
import athleteList from "../data/athleteList";
import {metrics,metrics_type }from "../data/metric";

const sampleData = metrics

// const metrics_type = ["heart_rate", "height", "weight"];
const athletes = athleteList;
const m_type = metrics_type

const HealthChart = () => {
  const location = useLocation();
  const athleteID = location.state?.athleteID; // Nhận athleteID từ trang trước

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const formatDate = (date) => date.toISOString().split("T")[0];

  const [selectedAthlete, setSelectedAthlete] = useState(athleteID || null);
  const [selectedMetric, setSelectedMetric] = useState("Heart Rate");
  const [fromDate, setFromDate] = useState(formatDate(sevenDaysAgo));
  const [toDate, setToDate] = useState(formatDate(today));
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const handleFromDateChange = (e) => {
    const newFromDate = e.target.value;
    if (newFromDate > toDate) {
      alert("Ngày bắt đầu không thể lớn hơn ngày kết thúc!");
      return;
    }
    setFromDate(newFromDate);
  };

  const handleToDateChange = (e) => {
    const newToDate = e.target.value;
    if (newToDate < fromDate) {
      alert("Ngày kết thúc không thể nhỏ hơn ngày bắt đầu!");
      return;
    }
    setToDate(newToDate);
  };

  useEffect(() => {
    const filteredData = sampleData
      .filter((entry) => entry.athleteId === selectedAthlete)
      .filter((entry) => entry.metric_type === selectedMetric)
      .filter(
        (entry) => entry.recorded_at >= fromDate && entry.recorded_at <= toDate
      )
      .filter((entry) => entry.value !== 0); // Loại bỏ giá trị 0

    setChartData({
      labels: filteredData.map((entry) => entry.recorded_at),
      datasets: [
        {
          label: `Chỉ số ${selectedMetric} của ${
            athletes.find((u) => u.id === selectedAthlete)?.name
          }`,
          data: filteredData.map((entry) => entry.value),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    });
  }, [selectedAthlete, selectedMetric, fromDate, toDate]);

  return (
    <div className="w-full sm:px-4 px-4 py-6 pt-28 h-[calc(100vh-0px)] overflow-y-auto  bg-white p-6 rounded-xl shadow-md">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-4"></div>
        <div className="col-span-12 xl:col-span-8">
          <h2 className="text-xl font-bold mb-4">Biểu đồ {selectedMetric}</h2>

          <div className="flex space-x-2 mb-4">
            <Select
              options={m_type.map((m) => ({ value: m, label: m }))}
              value={{ value: selectedMetric, label: selectedMetric }}
              onChange={(selected) => setSelectedMetric(selected.value)}
              isSearchable
              placeholder="Chọn chỉ số..."
            />
            <input
              type="date"
              value={fromDate}
              onChange={handleFromDateChange}
              className="p-2 border rounded"
            />
            <input
              type="date"
              value={toDate}
              onChange={handleToDateChange}
              max={formatDate(today)}
              className="p-2 border rounded"
            />
          </div>

          <Line data={chartData} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 pt-6">
        <h3 className="text-lg font-semibold mt-6">Chọn vận động viên</h3>
        <table className="w-xl mt-2 border ">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Chọn</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete) => (
              <tr key={athlete.id} className="border">
                <td className="p-2 border text-center">{athlete.id}</td>
                <td className="p-2 border">{athlete.name}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => setSelectedAthlete(athlete.id)}
                    className={`px-4 py-1 rounded ${
                      selectedAthlete === athlete.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    Chọn
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

export default HealthChart;
