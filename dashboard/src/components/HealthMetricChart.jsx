import { Line } from "react-chartjs-2";
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

// Register required chart components
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

const HealthMetricChart = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center p-4 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-[3px] border-[#00a884] border-t-transparent"></div>
          <p className="text-sm sm:text-base text-gray-500">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  const hasData = data?.datasets?.[0]?.data?.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Biểu đồ sức khỏe</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#00a884]"></div>
          <span>Chỉ số sức khỏe</span>
        </div>
      </div>

      {!hasData ? (
        <div className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center p-4 sm:p-8 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-gray-500 text-sm sm:text-base">Chưa có dữ liệu để hiển thị</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">Vui lòng chọn vận động viên và chỉ số sức khỏe</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-2 sm:p-4">
          <Line
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index',
                intersect: false,
              },
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
                  padding: window.innerWidth < 640 ? 8 : 12,
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
                    },
                    maxRotation: 45,
                    minRotation: 45
                  }
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    color: '#E5E7EB',
                    drawBorder: false
                  },
                  ticks: {
                    color: '#6B7280',
                    font: {
                      size: window.innerWidth < 640 ? 10 : 12
                    },
                    padding: 8
                  }
                }
              },
              elements: {
                line: {
                  tension: 0.4,
                  borderWidth: 2,
                  borderColor: '#00a884',
                  fill: 'start',
                  backgroundColor: 'rgba(0, 168, 132, 0.1)'
                },
                point: {
                  radius: window.innerWidth < 640 ? 3 : 4,
                  backgroundColor: '#00a884',
                  borderColor: 'white',
                  borderWidth: 2,
                  hoverRadius: window.innerWidth < 640 ? 5 : 6,
                  hoverBorderWidth: 2
                }
              }
            }}
            height={window.innerWidth < 640 ? 300 : 400}
          />
        </div>
      )}
    </div>
  );
};

export default HealthMetricChart; 