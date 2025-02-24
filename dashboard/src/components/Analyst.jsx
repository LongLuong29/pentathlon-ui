import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const HealthChart = () => {
  const sampleData = {
    heart_rate: [
        { athleteId: 1, value: 72, recorded_at: "2025-02-10" },
        { athleteId: 1, value: 75, recorded_at: "2025-02-11" },
        { athleteId: 1, value: 0, recorded_at: "2025-02-12" },
        { athleteId: 1, value: 78, recorded_at: "2025-02-13" },
        { athleteId: 1, value: 80, recorded_at: "2025-02-14" },
        { athleteId: 1, value: 82, recorded_at: "2025-02-15" },
        { athleteId: 1, value: 0, recorded_at: "2025-02-16" },
        { athleteId: 1, value: 85, recorded_at: "2025-02-17" },
        { athleteId: 1, value: 87, recorded_at: "2025-02-18" },
        { athleteId: 1, value: 88, recorded_at: "2025-02-19" },
        { athleteId: 1, value: 90, recorded_at: "2025-02-20" },

        { athleteId: 2, value: 76, recorded_at: "2025-02-10" },
        { athleteId: 2, value: 79, recorded_at: "2025-02-11" },
        { athleteId: 2, value: 0, recorded_at: "2025-02-12" },
        { athleteId: 2, value: 82, recorded_at: "2025-02-13" },
        { athleteId: 2, value: 0, recorded_at: "2025-02-14" },
        { athleteId: 2, value: 85, recorded_at: "2025-02-15" },
        { athleteId: 2, value: 86, recorded_at: "2025-02-16" },
        { athleteId: 2, value: 88, recorded_at: "2025-02-17" },
        { athleteId: 2, value: 90, recorded_at: "2025-02-18" },
        { athleteId: 2, value: 92, recorded_at: "2025-02-19" },
        { athleteId: 2, value: 94, recorded_at: "2025-02-20" },

        { athleteId: 3, value: 80, recorded_at: "2025-02-10" },
        { athleteId: 3, value: 82, recorded_at: "2025-02-11" },
        { athleteId: 3, value: 0, recorded_at: "2025-02-12" },
        { athleteId: 3, value: 85, recorded_at: "2025-02-13" },
        { athleteId: 3, value: 87, recorded_at: "2025-02-14" },
        { athleteId: 3, value: 89, recorded_at: "2025-02-15" },
        { athleteId: 3, value: 90, recorded_at: "2025-02-16" },
        { athleteId: 3, value: 92, recorded_at: "2025-02-17" },
        { athleteId: 3, value: 94, recorded_at: "2025-02-18" },
        { athleteId: 3, value: 96, recorded_at: "2025-02-19" },
        { athleteId: 3, value: 98, recorded_at: "2025-02-20" }
    ],
    height: [
        { athleteId: 1, value: 175, recorded_at: "2025-02-10" },
        { athleteId: 1, value: 175, recorded_at: "2025-02-11" },
        { athleteId: 1, value: 0, recorded_at: "2025-02-12" },
        { athleteId: 1, value: 176, recorded_at: "2025-02-13" },
        { athleteId: 1, value: 176, recorded_at: "2025-02-14" },
        { athleteId: 1, value: 177, recorded_at: "2025-02-15" },
        { athleteId: 1, value: 0, recorded_at: "2025-02-16" },
        { athleteId: 1, value: 178, recorded_at: "2025-02-17" },
        { athleteId: 1, value: 178, recorded_at: "2025-02-18" },
        { athleteId: 1, value: 179, recorded_at: "2025-02-19" },
        { athleteId: 1, value: 180, recorded_at: "2025-02-20" }
    ],
    weight: [
        { athleteId: 1, value: 65, recorded_at: "2025-02-10" },
        { athleteId: 1, value: 66, recorded_at: "2025-02-11" },
        { athleteId: 1, value: 0, recorded_at: "2025-02-12" },
        { athleteId: 1, value: 67, recorded_at: "2025-02-13" },
        { athleteId: 1, value: 67, recorded_at: "2025-02-14" },
        { athleteId: 1, value: 68, recorded_at: "2025-02-15" },
        { athleteId: 1, value: 0, recorded_at: "2025-02-16" },
        { athleteId: 1, value: 69, recorded_at: "2025-02-17" },
        { athleteId: 1, value: 70, recorded_at: "2025-02-18" },
        { athleteId: 1, value: 71, recorded_at: "2025-02-19" },
        { athleteId: 1, value: 72, recorded_at: "2025-02-20" }
    ]
};

const users = [
  { id: 1, name: "Athlete A" },
  { id: 2, name: "Athlete B" },
  { id: 3, name: "Athlete C" }
];

const today = new Date();
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate() - 7);
// Format YYYY-MM-DD để hiển thị đúng trong input date
const formatDate = (date) => date.toISOString().split("T")[0];

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


    const [metricType, setMetricType] = useState("heart_rate");
    const [fromDate, setFromDate] = useState(formatDate(sevenDaysAgo));
    const [toDate, setToDate] = useState(formatDate(today));
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [selectedUser, setSelectedUser] = useState(1); // Default là User 1


    // Hàm cập nhật dữ liệu biểu đồ
useEffect(() => {
    const filteredData = sampleData[metricType]
        .filter(entry => entry.recorded_at >= fromDate && entry.recorded_at <= toDate)
        .filter(entry => entry.athleteId === selectedUser) // Lọc theo user
        .filter(entry => entry.value !== 0); // Loại bỏ giá trị 0

    setChartData({
        labels: filteredData.map(entry => entry.recorded_at),
        datasets: [
            {
                label: `Chỉ số ${metricType} của ${users.find(u => u.id === selectedUser)?.name}`,
                data: filteredData.map(entry => entry.value),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
        ],
    });
}, [metricType, fromDate, toDate, selectedUser]);  // Cập nhật biểu đồ khi state thay đổi

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Biểu đồ {metricType}</h2>

            {/* Bộ lọc */}
            <div className="flex space-x-2 mb-4">
                <select
                    value={metricType}
                    onChange={(e) => setMetricType(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="heart_rate">Nhịp tim</option>
                    <option value="height">Chiều cao</option>
                    <option value="weight">Cân nặng</option>
                </select>
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
    max={new Date().toISOString().split("T")[0]} // Giới hạn max là ngày hiện tại
    className="p-2 border rounded"
/>
<select
    value={selectedUser}
    onChange={(e) => setSelectedUser(Number(e.target.value))}
    className="p-2 border rounded"
>
    {users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))}
</select>
            </div>

            <Line data={chartData} />
        </div>
    );
};

export default HealthChart;
