import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";


const AddHealthRecordModal = ({ athletes, metricGroups, onClose, onSave, onSuccess, onResetFilters  }) => {
  const [selectedAthlete, setSelectedAthlete] = useState("");
  const [selectedMetricGroup, setSelectedMetricGroup] = useState("");
  const [healthMetrics, setHealthMetrics] = useState([]);
  const [selectedHealthMetric, setSelectedHealthMetric] = useState("");
  const [value, setValue] = useState("");
  const [recordDate, setRecordDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Ngày hiện tại

  useEffect(() => {
    setSelectedHealthMetric(""); // Reset chỉ số sức khỏe đã chọn
    if (selectedMetricGroup) {
      axios
        .get(
          `http://localhost:5000/api/health-metrics/filter/${selectedMetricGroup}`
        )
        .then((res) => {
          const metrics = Array.isArray(res.data) ? res.data : [];
          setHealthMetrics(metrics);
          if (metrics.length === 0) {
            setSelectedHealthMetric(""); // Reset nếu không có dữ liệu
          }
        })
        .catch(() => {
          setHealthMetrics([]);
          setSelectedHealthMetric("");
        });
    } else {
      setHealthMetrics([]);
      setSelectedHealthMetric(""); // Reset khi nhóm chỉ số rỗng
    }
  }, [selectedMetricGroup]);

  const handleSave = async () => {
    if (!selectedAthlete || !selectedHealthMetric || !value ) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    const formattedDate = format(new Date(recordDate), "yyyy-MM-dd HH:mm:ss");
    onSave({
        athleteId: selectedAthlete,
        metricId: selectedHealthMetric,
        value,
        formattedDate,
      });

    try {
      await axios.post("http://localhost:5000/api/health-records", {
        athlete_id: Number(selectedAthlete), // Ép kiểu về số nguyên (int)
        metric_id: Number(selectedHealthMetric), // Ép kiểu về số nguyên (int)
        metric_value: parseFloat(value), // Ép kiểu về số thực (float)
        recorded_at: formattedDate,
      });   

      alert("Lưu dữ liệu thành công!");
      
      onResetFilters();// Gọi callback để reset filter ở component cha
      onSuccess(); // Reload data
      onClose(); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi lưu health record:", error);
      alert("Có lỗi xảy ra khi lưu dữ liệu.");
    }
  };    

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50 z-[1000]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Thêm Hồ Sơ Sức Khỏe</h2>

        {/* Chọn Vận Động Viên */}
        <div>
          <label className="block mb-2 font-medium">Chọn vận động viên:</label>
          <select
            className="w-full p-2 border rounded mb-3"
            value={selectedAthlete}
            onChange={(e) => setSelectedAthlete(e.target.value)}
          >
            <option value="">-- Chọn vận động viên --</option>
            {athletes.map((athlete) => (
              <option key={athlete.id} value={athlete.id}>
                {athlete.fullname}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn Metric Group */}
        <div>
          <label className="block mb-2 font-medium">Chọn nhóm chỉ số:</label>
          <select
            className="w-full p-2 border rounded mb-3"
            value={selectedMetricGroup}
            onChange={(e) => setSelectedMetricGroup(e.target.value)}
          >
            <option value="">-- Chọn nhóm --</option>
            {metricGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn Health Metric */}
        <div className="Health-Metric">
          <label className="block mb-2 font-medium">
            Chọn chỉ số sức khỏe:
          </label>
          <select
            className="w-full p-2 border rounded mb-3"
            value={selectedHealthMetric}
            onChange={(e) => setSelectedHealthMetric(e.target.value)}
            disabled={!selectedMetricGroup}
          >
            <option value="">-- Chọn chỉ số --</option>
            {healthMetrics.map((metric) => (
              <option key={metric.id} value={metric.id}>
                {metric.name}
              </option>
            ))}
          </select>
        </div>

        {/* Nhập Giá Trị */}
        <div className="Metric-Value">
          <label className="block mb-2 font-medium">Nhập giá trị:</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-4"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* Chọn ngày nhập */}
        <label className="block text-sm font-medium">Ngày nhập:</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={recordDate}
          onChange={(e) => setRecordDate(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-[#00a884] text-white rounded transition-all duration-300 hover:cursor-pointer hover:bg-[#3b7264] hover:border-[#3b7264]"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHealthRecordModal;
