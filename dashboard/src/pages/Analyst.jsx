import { useEffect, useState } from "react";
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
import AddHealthRecordModal from "../components/AddHealthRecord";
import { athletesService, healthMetricsService, healthRecordsService } from "../api";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchAthlete, setSearchAthlete] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //set ngay thang
  const today = new Date().toISOString().split("T")[0];
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const defaultFromDate = sevenDaysAgo.toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(today);
  const [isHealthRecordModalOpen, setIsHealthRecordModalOpen] = useState(false);

  // Hàm load lại dữ liệu health records
  const fetchHealthRecords = async () => {
    try {
      setLoading(true);
      const data = await healthRecordsService.getAll();
      setHealthRecords(data);
      setError(null);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu health records:", error);
      setError("Failed to fetch health records");
      toast.error("Failed to fetch health records");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecord = async (data) => {
    try {
      setLoading(true);
      await healthRecordsService.create(data);
      toast.success("Health record added successfully!");
      // Refresh dữ liệu sau khi thêm
      await fetchHealthRecords();
      // Nếu đang ở cùng athlete và metric, refresh chart data
      if (selectedAthlete === data.athlete_id && selectedHealthMetric === data.metric_id) {
        await fetchFilteredHealthRecords();
      }
    } catch (error) {
      console.error("Error saving health record:", error);
      toast.error("Failed to save health record");
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchAthlete("");
    setSelectedMetricGroup("");
    setSelectedHealthMetric("");
    setChartData({ labels: [], datasets: [] });
  };

  //fetch athletes and metric groups
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch athletes
        const athleteData = await athletesService.getAll();
        setAthletes(athleteData);
        if (athleteData.length > 0) {
          setSelectedAthlete(athleteData[0].id);
        }

        // Fetch metric groups
        const metricGroupData = await healthMetricsService.getAllGroups();
        setMetricGroups(metricGroupData);
        
        setError(null);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError("Failed to fetch data");
        toast.error("Failed to fetch initial data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // fetch metric base on group
  useEffect(() => {
    const fetchMetricsByGroup = async () => {
      setSelectedHealthMetric(""); // Reset chỉ số sức khỏe đã chọn
      
      if (selectedMetricGroup) {
        setLoading(true);
        try {
          const metrics = await healthMetricsService.getByGroup(selectedMetricGroup);
          setHealthMetrics(metrics);
          setError(null);
        } catch (err) {
          console.error("Failed to fetch health metrics", err);
          setHealthMetrics([]);
          setError("Failed to fetch health metrics");
          toast.error("Failed to fetch health metrics");
        } finally {
          setLoading(false);
        }
      } else {
        setHealthMetrics([]);
      }
    };
    
    fetchMetricsByGroup();
  }, [selectedMetricGroup]);

  const fetchFilteredHealthRecords = async () => {
    if (selectedAthlete && selectedHealthMetric) {
      setLoading(true);
      try {
        const filteredRecords = await healthRecordsService.filter(
          selectedAthlete, 
          selectedHealthMetric, 
          fromDate, 
          toDate
        );
        
        setHealthRecords(filteredRecords);
        
        setChartData({
          labels: filteredRecords.map((record) => formatDate(record.recorded_at)),
          datasets: [
            {
              label: "Health Metric Data",
              data: filteredRecords.map((record) => record.metric_value),
              borderColor: "blue",
              fill: false,
            },
          ],
        });
        
        setError(null);
      } catch (err) {
        console.error("Failed to fetch health records", err);
        setError("Failed to fetch health records");
        toast.error("Failed to fetch health records");
        setChartData({ labels: [], datasets: [] });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFilteredHealthRecords();
  }, [selectedAthlete, selectedHealthMetric, fromDate, toDate]);

  return (
    <div className="pt-24 px-6 pb-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center mr-auto">
          Analyst Page
        </h2>
        {/** Add Health Record Button */}
        <div>
          <button
            onClick={() => setIsHealthRecordModalOpen(true)}
            className="group py-2 px-4 flex items-center whitespace-nowrap gap-1.5 font-medium text-sm ml-auto text-white border 
            border-solid border-[#00a884] bg-[#00a884] rounded-lg transition-all duration-300 hover:cursor-pointer hover:bg-[#008c6a] hover:border-[#008c6a] w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M9 4.5V13.5M13.5 9H4.5"
                stroke="white"
                strokeWidth="1.3"
                strokeLinecap="round"
              ></path>
            </svg>
            <span className="max-md:hidden">Add Health Record</span>
          </button>
          {isHealthRecordModalOpen && (
            <AddHealthRecordModal
              athletes={athletes}
              metricGroups={metricGroups}
              onClose={() => setIsHealthRecordModalOpen(false)}
              onSave={handleSaveRecord}
              onSuccess={fetchHealthRecords}
              onResetFilters={resetFilters}
            />
          )}
        </div>
      </div>

      {loading && athletes.length === 0 && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {error && athletes.length === 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="mb-4 relative">
            <label className="block font-semibold">Chọn vận động viên:</label>
            <input
              type="text"
              placeholder="Nhập tên VĐV..."
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

        {/** Metric Group */}
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

      {/** Health Metric */}
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

      {/** Choose Date */}
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

      {/** Chart */}
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2 text-center">Biểu đồ sức khỏe</h3>
        {loading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}
        {!loading && (
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
        )}
      </div>
    </div>
  );
};

export default Analyst;
