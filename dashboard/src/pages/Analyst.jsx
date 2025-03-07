import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatDate } from "../utils/index";

// Đăng ký các thành phần cần thiết
Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController
);

const Analyst = () => {
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [metricGroups, setMetricGroups] = useState([]);
  const [selectedMetricGroup, setSelectedMetricGroup] = useState("");
  const [healthMetrics, setHealthMetrics] = useState([]);
  const [selectedHealthMetric, setSelectedHealthMetric] = useState("");
  const [healthRecords, setHealthRecords] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const [searchAthlete, setSearchAthlete] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const defaultFromDate = sevenDaysAgo.toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(today);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const athleteRes = await axios.get(
          "http://localhost:5000/api/athletes"
        );
        if (Array.isArray(athleteRes.data) && athleteRes.data.length > 0) {
          setAthletes(athleteRes.data);
          setSelectedAthlete(athleteRes.data[0].id);
        } else {
          setAthletes([]);
        }

        const metricGroupRes = await axios.get(
          "http://localhost:5000/api/metric-groups"
        );
        setMetricGroups(metricGroupRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMetricGroup) {
      axios
        .get(
          `http://localhost:5000/api/health-metrics/filter/${selectedMetricGroup}`
        )
        .then((res) =>
          setHealthMetrics(Array.isArray(res.data) ? res.data : [])
        )
        .catch((err) => console.error("Failed to fetch health metrics", err));
    } else {
      setHealthMetrics([]);
    }
  }, [selectedMetricGroup]);

  useEffect(() => {
    if (selectedAthlete && selectedHealthMetric) {
      axios
        .get(
          `http://localhost:5000/api/health-records/filter/${selectedAthlete}/${selectedHealthMetric}/${fromDate}/${toDate}`
        )
        .then((res) => {
          if (!Array.isArray(res.data)) {
            console.error("Invalid data format from API:", res.data);
            return;
          }

          setHealthRecords(res.data);
          setChartData({
            labels: res.data.map((record) => formatDate(record.recorded_at)),
            datasets: [
              {
                label: "Health Metric Data",
                data: res.data.map((record) => record.metric_value),
                borderColor: "blue",
                fill: false,
              },
            ],
          });
        })
        .catch((err) => console.error("Failed to fetch health records", err));
    }
  }, [selectedAthlete, selectedHealthMetric, fromDate, toDate]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Analyst Page</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
        <div className="mb-4 relative">
  <label className="block font-semibold">Chọn vận động viên:</label>
  <input
    type="text"
    placeholder="Tìm kiếm..."
    value={searchAthlete}
    onChange={(e) => {
      setSearchAthlete(e.target.value);
      setDropdownOpen(true); // Mở dropdown khi nhập
    }}
    className="w-full p-2 border rounded"
  />
  {dropdownOpen && searchAthlete && (
    <ul className="absolute z-10 w-full bg-white border rounded shadow-md mt-1 max-h-40 overflow-y-auto">
      {athletes
        .filter((athlete) => athlete.fullname.toLowerCase().includes(searchAthlete.toLowerCase()))
        .map((athlete) => (
          <li
            key={athlete.id}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              setSelectedAthlete(athlete.id);
              setSearchAthlete(athlete.fullname); // Điền vào input
              setDropdownOpen(false); // Ẩn dropdown sau khi chọn
            }}
          >
            {athlete.fullname}
          </li>
        ))}
    </ul>
  )}
</div>

        </div>
        <div>
          <label className="block font-semibold">
            Chọn nhóm chỉ số sức khỏe:
          </label>
          <select
            className="w-full p-2 border rounded"
            value={selectedMetricGroup}
            onChange={(e) => setSelectedMetricGroup(e.target.value)}
          >
            <option value="">-- Chọn --</option>
            {metricGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Chọn chỉ số sức khỏe:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedHealthMetric}
          onChange={(e) => setSelectedHealthMetric(e.target.value)}
        >
          <option value="">-- Chọn --</option>
          {healthMetrics.map((metric) => (
            <option key={metric.id} value={metric.id}>
              {metric.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold">Từ ngày:</label>
          <input
            className="w-full p-2 border rounded"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold">Đến ngày:</label>
          <input
            className="w-full p-2 border rounded"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2 text-center">Biểu đồ sức khỏe</h3>
        <Line
          className="bg-gray-100 p-4 rounded shadow"
          data={chartData}
          options={{
            scales: {
              x: {
                type: "category", // Đảm bảo thang đo x-axis sử dụng loại 'category'
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Analyst;
