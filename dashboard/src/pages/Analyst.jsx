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
import QuickAddHealthRecord from "../components/QuickAddHealthRecord";
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
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);

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
        const athleteData = await athletesService.getAllWithoutPagination();
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
    <div className="pt-24 px-4 sm:px-6 pb-6 max-w-6xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Phân tích sức khỏe</h2>
          <p className="text-sm text-gray-500 mt-1">Theo dõi và phân tích các chỉ số sức khỏe của vận động viên</p>
        </div>
        {/** Add Health Record Buttons */}
        <div className="flex gap-2 sm:gap-3 sm:justify-end mt-2 sm:mt-0">
          <button
            onClick={() => setIsHealthRecordModalOpen(true)}
            className="flex-1 sm:flex-none group py-2 sm:py-2.5 px-3 sm:px-4 flex items-center justify-center whitespace-nowrap gap-2 font-medium text-sm text-white 
            border border-solid border-[#00a884] bg-[#00a884] rounded-lg transition-all duration-300 
            hover:cursor-pointer hover:bg-[#008c6a] hover:border-[#008c6a] hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Thêm Chỉ Số</span>
          </button>
          <button
            onClick={() => setIsQuickAddModalOpen(true)}
            className="flex-1 sm:flex-none group py-2 sm:py-2.5 px-3 sm:px-4 flex items-center justify-center whitespace-nowrap gap-2 font-medium text-sm 
            text-[#00a884] border border-solid border-[#00a884] bg-white rounded-lg transition-all duration-300 
            hover:cursor-pointer hover:bg-[#00a884] hover:text-white hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#00a884] group-hover:text-white"
            >
              <path d="M3 3h18v18H3z" />
              <path d="M7 7h10" />
              <path d="M7 12h10" />
              <path d="M7 17h10" />
            </svg>
            <span>Thêm Nhiều Chỉ Số</span>
          </button>
        </div>
      </div>

      {loading && athletes.length === 0 && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00a884]"></div>
        </div>
      )}

      {error && athletes.length === 0 && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          <strong className="font-medium">Lỗi! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Chọn vận động viên:</label>
            <input
              type="text"
              placeholder="Nhập tên VĐV..."
              value={searchAthlete}
              onChange={(e) => {
                setSearchAthlete(e.target.value);
                setDropdownOpen(true);
              }}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884] transition-colors"
            />
            {dropdownOpen && searchAthlete && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                {athletes
                  .filter((athlete) =>
                    athlete.fullname
                      .toLowerCase()
                      .includes(searchAthlete.toLowerCase())
                  )
                  .map((athlete) => (
                    <li
                      key={athlete.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedAthlete(athlete.id);
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn nhóm chỉ số sức khỏe:
            </label>
            <select
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884] transition-colors"
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Chọn chỉ số sức khỏe:</label>
            <select
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884] transition-colors"
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Từ ngày:</label>
              <input
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884] transition-colors"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Đến ngày:</label>
              <input
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00a884] focus:border-[#00a884] transition-colors"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/** Chart */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Biểu đồ sức khỏe</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#00a884]"></div>
            <span>Chỉ số sức khỏe</span>
          </div>
        </div>
        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#00a884]"></div>
          </div>
        )}
        {!loading && (
          <div className="bg-gray-50 rounded-lg p-2 sm:p-4">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#111827',
                    bodyColor: '#4B5563',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    padding: 8,
                    boxPadding: 4,
                    usePointStyle: true,
                    callbacks: {
                      label: function(context) {
                        return `Giá trị: ${context.parsed.y}`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      color: '#6B7280',
                      font: {
                        size: window.innerWidth < 640 ? 10 : 12
                      }
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#E5E7EB'
                    },
                    ticks: {
                      color: '#6B7280',
                      font: {
                        size: window.innerWidth < 640 ? 10 : 12
                      }
                    }
                  }
                },
                elements: {
                  line: {
                    tension: 0.4,
                    borderWidth: 2,
                    borderColor: '#00a884'
                  },
                  point: {
                    radius: window.innerWidth < 640 ? 3 : 4,
                    backgroundColor: '#00a884',
                    borderColor: 'white',
                    borderWidth: 2,
                    hoverRadius: window.innerWidth < 640 ? 5 : 6
                  }
                }
              }}
              height={300}
            />
          </div>
        )}
      </div>

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

      {isQuickAddModalOpen && (
        <QuickAddHealthRecord
          athletes={athletes}
          metricGroups={metricGroups}
          onClose={() => setIsQuickAddModalOpen(false)}
          onSuccess={fetchHealthRecords}
        />
      )}
    </div>
  );
};

export default Analyst;
