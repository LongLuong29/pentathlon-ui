import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Select from "react-select";

const sampleData = [
  // Vận động viên 1
  {
    athleteId: 1,
    metric_type: "heart_rate",
    value: 70,
    recorded_at: "2025-02-10",
  },
  {
    athleteId: 1,
    metric_type: "heart_rate",
    value: 72,
    recorded_at: "2025-02-12",
  },
  {
    athleteId: 1,
    metric_type: "heart_rate",
    value: 74,
    recorded_at: "2025-02-14",
  },
  {
    athleteId: 1,
    metric_type: "heart_rate",
    value: 75,
    recorded_at: "2025-02-16",
  },
  {
    athleteId: 1,
    metric_type: "heart_rate",
    value: 77,
    recorded_at: "2025-02-18",
  },
  {
    athleteId: 1,
    metric_type: "heart_rate",
    value: 78,
    recorded_at: "2025-02-19",
  },
  {
    athleteId: 1,
    metric_type: "heart_rate",
    value: 80,
    recorded_at: "2025-02-20",
  },
  {
    athleteId: 1,
    metric_type: "heart_rate",
    value: 82,
    recorded_at: "2025-02-22",
  },
  {
    athleteId: 1,
    metric_type: "heart_rate",
    value: 83,
    recorded_at: "2025-02-24",
  },

  {
    athleteId: 1,
    metric_type: "height",
    value: 175,
    recorded_at: "2025-02-10",
  },
  {
    athleteId: 1,
    metric_type: "height",
    value: 175,
    recorded_at: "2025-02-14",
  },
  {
    athleteId: 1,
    metric_type: "height",
    value: 176,
    recorded_at: "2025-02-18",
  },
  {
    athleteId: 1,
    metric_type: "height",
    value: 177,
    recorded_at: "2025-02-22",
  },

  { athleteId: 1, metric_type: "weight", value: 65, recorded_at: "2025-02-10" },
  { athleteId: 1, metric_type: "weight", value: 66, recorded_at: "2025-02-12" },
  { athleteId: 1, metric_type: "weight", value: 67, recorded_at: "2025-02-14" },
  { athleteId: 1, metric_type: "weight", value: 67, recorded_at: "2025-02-16" },
  { athleteId: 1, metric_type: "weight", value: 68, recorded_at: "2025-02-20" },

  // Vận động viên 2
  {
    athleteId: 2,
    metric_type: "heart_rate",
    value: 74,
    recorded_at: "2025-02-10",
  },
  {
    athleteId: 2,
    metric_type: "heart_rate",
    value: 76,
    recorded_at: "2025-02-12",
  },
  {
    athleteId: 2,
    metric_type: "heart_rate",
    value: 78,
    recorded_at: "2025-02-14",
  },
  {
    athleteId: 2,
    metric_type: "heart_rate",
    value: 79,
    recorded_at: "2025-02-16",
  },
  {
    athleteId: 2,
    metric_type: "heart_rate",
    value: 80,
    recorded_at: "2025-02-18",
  },
  {
    athleteId: 2,
    metric_type: "heart_rate",
    value: 82,
    recorded_at: "2025-02-20",
  },
  {
    athleteId: 2,
    metric_type: "heart_rate",
    value: 84,
    recorded_at: "2025-02-22",
  },

  {
    athleteId: 2,
    metric_type: "height",
    value: 168,
    recorded_at: "2025-02-10",
  },
  {
    athleteId: 2,
    metric_type: "height",
    value: 169,
    recorded_at: "2025-02-16",
  },
  {
    athleteId: 2,
    metric_type: "height",
    value: 170,
    recorded_at: "2025-02-22",
  },

  { athleteId: 2, metric_type: "weight", value: 69, recorded_at: "2025-02-10" },
  { athleteId: 2, metric_type: "weight", value: 70, recorded_at: "2025-02-14" },
  { athleteId: 2, metric_type: "weight", value: 71, recorded_at: "2025-02-18" },
  { athleteId: 2, metric_type: "weight", value: 72, recorded_at: "2025-02-22" },

  // Vận động viên 3
  {
    athleteId: 3,
    metric_type: "heart_rate",
    value: 78,
    recorded_at: "2025-02-10",
  },
  {
    athleteId: 3,
    metric_type: "heart_rate",
    value: 80,
    recorded_at: "2025-02-12",
  },
  {
    athleteId: 3,
    metric_type: "heart_rate",
    value: 83,
    recorded_at: "2025-02-14",
  },
  {
    athleteId: 3,
    metric_type: "heart_rate",
    value: 85,
    recorded_at: "2025-02-16",
  },
  {
    athleteId: 3,
    metric_type: "heart_rate",
    value: 86,
    recorded_at: "2025-02-18",
  },
  {
    athleteId: 3,
    metric_type: "heart_rate",
    value: 87,
    recorded_at: "2025-02-20",
  },
  {
    athleteId: 3,
    metric_type: "heart_rate",
    value: 89,
    recorded_at: "2025-02-22",
  },

  {
    athleteId: 3,
    metric_type: "height",
    value: 180,
    recorded_at: "2025-02-10",
  },
  {
    athleteId: 3,
    metric_type: "height",
    value: 181,
    recorded_at: "2025-02-14",
  },
  {
    athleteId: 3,
    metric_type: "height",
    value: 182,
    recorded_at: "2025-02-18",
  },

  { athleteId: 3, metric_type: "weight", value: 74, recorded_at: "2025-02-10" },
  { athleteId: 3, metric_type: "weight", value: 75, recorded_at: "2025-02-12" },
  { athleteId: 3, metric_type: "weight", value: 76, recorded_at: "2025-02-16" },
  { athleteId: 3, metric_type: "weight", value: 77, recorded_at: "2025-02-20" },
];

const metrics = ["heart_rate", "height", "weight"];

const athletes = [
  {
    id: 1,
    name: "Lionel Messi",
    email: "leomessi@pagedone.io",
    date_of_birth: "Jun. 26, 1987",
    gender: "Male",
    phone: "0389871888",
    adress: "Argentina",
    avatar: "../../public/messi.jpg",
    joinDate: "Feb. 23, 2023",
    status: "Inactive",
    statusColor: "bg-red-100 text-red-600",
  },
  {
    id: 2,
    name: "Karina",
    email: "karina@pagedone.io",
    date_of_birth: "Apr. 11, 2000",
    gender: "Female",
    phone: "0919030799",
    adress: "Korea",
    avatar: "../../public/karina.jpg",
    joinDate: "Jun. 24, 2023",
    status: "Active",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    name: "Lamine Yamal",
    email: "yamal@pagedone.io",
    date_of_birth: "Jul. 13, 2007",
    gender: "Male",
    phone: "0378856745",
    adress: "Spain",
    avatar: "../../public/yamal.jpg",
    joinDate: "Oct. 23, 2023",
    status: "Onboarding",
    statusColor: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 4,
    name: "Raphinha",
    email: "darrellstew@pagedone.io",
    date_of_birth: "Dec. 14, 1996",
    gender: "Male",
    phone: "0789876543",
    adress: "Brazil",
    avatar: "../../public/raphinha.jpg",
    joinDate: "Jul. 12, 2023",
    status: "Inactive",
    statusColor: "bg-red-100 text-red-600",
  },
  {
    id: 5,
    name: "Robert Lewandowski",
    email: "lewandowski@pagedone.io",
    date_of_birth: "Aug. 21, 1988",
    gender: "Male",
    phone: "0394857643",
    adress: "Poland",
    avatar: "../../public/lewandowski.jpg",
    joinDate: "Oct. 23, 2023",
    status: "Onboarding",
    statusColor: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 6,
    name: "Ferran Torres",
    email: "torres@pagedone.io",
    date_of_birth: "Apr. 11, 2000",
    gender: "Male",
    phone: "0712938465",
    adress: "Foios, Spain",
    avatar: "../../public/torres.jpg",
    joinDate: "Feb. 29, 200",
    status: "Active",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: 7,
    name: "Frenkie De Jong",
    email: "dejong@pagedone.io",
    date_of_birth: "May. 12, 1997",
    gender: "Male",
    phone: "0719971205",
    adress: "Arkel, Netherlands",
    avatar: "../../public/dejong.jpg",
    joinDate: "Jun. 24, 2023",
    status: "Active",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: 8,
    name: "Dani Olmo",
    email: "olmo@pagedone.io",
    date_of_birth: "May. 07, 1998",
    gender: "Male",
    phone: "0319980705",
    adress: "Terrassa, Spain",
    avatar: "../../public/olmo.jpg",
    joinDate: "Jun. 24, 2023",
    status: "Active",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: 9,
    name: "Marc Casadó",
    email: "casado@pagedone.io",
    date_of_birth: "Sep. 14, 2003",
    gender: "Male",
    phone: "0341903002",
    adress: "Spain",
    avatar: "../../public/casado.jpg",
    joinDate: "Feb. 23, 2023",
    status: "Inactive",
    statusColor: "bg-red-100 text-red-600",
  },
  {
    id: 10,
    name: "Pedri",
    email: "pedri@pagedone.io",
    date_of_birth: "Nov. 25, 2002",
    gender: "Male",
    phone: "0377252002",
    adress: "Tegueste, Spain",
    avatar: "../../public/pedri.jpg",
    joinDate: "Oct. 23, 2023",
    status: "Onboarding",
    statusColor: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 11,
    name: "Pablo Gavi",
    email: "gavi@pagedone.io",
    date_of_birth: "Aug. 05, 2004",
    gender: "Male",
    phone: "0788052004",
    adress: "Los Palacios y Villafranca, Spain",
    avatar: "../../public/gavi.jpg",
    joinDate: "Jul. 12, 2023",
    status: "Inactive",
    statusColor: "bg-red-100 text-red-600",
  },
  {
    id: 12,
    name: "Eric Garcia",
    email: "garcia@pagedone.io",
    date_of_birth: "Jan. 09, 2001",
    gender: "Male",
    phone: "0310200190",
    adress: "Martorell, Spain",
    avatar: "../../public/garcia.jpg",
    joinDate: "Oct. 23, 2023",
    status: "Onboarding",
    statusColor: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 13,
    name: "Pau Cubarsí",
    email: "cubarsi@pagedone.io",
    date_of_birth: "Jan. 22, 2007",
    gender: "Male",
    phone: "0722012072",
    adress: "Bescanó, Spain",
    avatar: "../../public/cubarsi.jpg",
    joinDate: "Feb. 29, 200",
    status: "Active",
    statusColor: "bg-green-100 text-green-600",
  },
];

const HealthChart = () => {
  const location = useLocation();
  const athleteID = location.state?.athleteID; // Nhận athleteID từ trang trước

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const formatDate = (date) => date.toISOString().split("T")[0];

  const [selectedAthlete, setSelectedAthlete] = useState(athleteID || null);
  const [selectedMetric, setSelectedMetric] = useState("heart_rate");
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
              options={metrics.map((m) => ({ value: m, label: m }))}
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
