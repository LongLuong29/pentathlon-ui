import { useState, useEffect } from "react";
import { format } from "date-fns";
import { User, Activity, Calendar, X, Save, Plus } from "lucide-react";
import Button from "./ui/Button";
import Select from "./ui/Select";
import Input from "./ui/Input";
import { toast } from "react-toastify";
import { healthRecordsService, healthMetricsService } from "../api/health-records";

const QuickAddHealthRecord = ({ athletes, metricGroups, onClose, onSuccess }) => {
  const [selectedAthlete, setSelectedAthlete] = useState("");
  const [selectedMetricGroup, setSelectedMetricGroup] = useState("");
  const [healthMetrics, setHealthMetrics] = useState([]);
  const [recordDate, setRecordDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [records, setRecords] = useState([]);

  // Fetch health metrics when metric group changes
  useEffect(() => {
    if (selectedMetricGroup) {
      setIsLoading(true);
      healthMetricsService
        .getByGroup(selectedMetricGroup)
        .then((metrics) => {
          setHealthMetrics(metrics);
          // Initialize records with empty values
          setRecords(metrics.map(metric => ({
            metric_id: metric.id,
            metric_name: metric.name,
            value: "",
            unit: metric.unit || ""
          })));
          setErrors(prev => ({ ...prev, metricGroup: null }));
        })
        .catch((error) => {
          console.error("Error fetching health metrics:", error);
          setHealthMetrics([]);
          setRecords([]);
          setErrors(prev => ({ ...prev, metricGroup: "Failed to load health metrics" }));
        })
        .finally(() => setIsLoading(false));
    } else {
      setHealthMetrics([]);
      setRecords([]);
    }
  }, [selectedMetricGroup]);

  const validateForm = () => {
    const newErrors = {};
    if (!selectedAthlete) newErrors.athlete = "Vui lòng chọn vận động viên";
    if (!selectedMetricGroup) newErrors.metricGroup = "Vui lòng chọn nhóm chỉ số";
    
    // Validate each record
    records.forEach((record, index) => {
      if (record.value === "") {
        newErrors[`record_${index}`] = "Vui lòng nhập giá trị";
      } else if (isNaN(record.value)) {
        newErrors[`record_${index}`] = "Giá trị phải là số";
      } else if (record.value < 0) {
        newErrors[`record_${index}`] = "Giá trị không được âm";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValueChange = (index, value) => {
    const newRecords = [...records];
    newRecords[index] = { ...newRecords[index], value };
    setRecords(newRecords);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const formattedDate = format(new Date(recordDate), "yyyy-MM-dd HH:mm:ss");
    
    try {
      // Create records in parallel
      const savePromises = records
        .filter(record => record.value !== "") // Only save records with values
        .map(record => 
          healthRecordsService.create({
            athlete_id: Number(selectedAthlete),
            metric_id: record.metric_id,
            metric_value: parseFloat(record.value),
            recorded_at: formattedDate,
          })
        );

      await Promise.all(savePromises);

      toast.success("Lưu dữ liệu thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving health records:", error);
      toast.error("Có lỗi xảy ra khi lưu dữ liệu", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Thêm Nhiều Chỉ Số Sức Khỏe</h2>
                <p className="text-sm text-gray-500 mt-1">Nhập giá trị cho nhiều chỉ số cùng lúc</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Select
              label="Vận động viên"
              value={selectedAthlete}
              onChange={(e) => setSelectedAthlete(e.target.value)}
              error={errors.athlete}
              leftIcon={<User className="w-4 h-4 text-gray-400" />}
              className="h-12"
            >
              <option value="">-- Chọn vận động viên --</option>
              {athletes.map((athlete) => (
                <option key={athlete.id} value={athlete.id}>
                  {athlete.fullname}
                </option>
              ))}
            </Select>

            <Select
              label="Nhóm chỉ số"
              value={selectedMetricGroup}
              onChange={(e) => setSelectedMetricGroup(e.target.value)}
              error={errors.metricGroup}
              leftIcon={<Activity className="w-4 h-4 text-gray-400" />}
              className="h-12"
            >
              <option value="">-- Chọn nhóm --</option>
              {metricGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </Select>
          </div>

          <Input
            type="date"
            label="Ngày nhập"
            value={recordDate}
            onChange={(e) => setRecordDate(e.target.value)}
            leftIcon={<Calendar className="w-4 h-4 text-gray-400" />}
            className="mb-6 sm:mb-8 h-12"
          />

          {healthMetrics.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
                <h3 className="text-lg font-medium text-gray-900">Nhập giá trị cho các chỉ số</h3>
                <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                  {records.filter(r => r.value !== "").length} / {records.length} chỉ số đã nhập
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {records.map((record, index) => (
                  <div 
                    key={record.metric_id} 
                    className={`grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-center sm:items-end 
                    bg-gray-50 p-4 rounded-lg transition-colors
                    ${record.value ? 'bg-green-50/50 border border-green-100' : ''}`}
                  >
                    <div className="sm:col-span-5">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        {record.metric_name}
                      </label>
                      <p className="text-sm text-gray-500">{record.unit}</p>
                    </div>
                    <div className="sm:col-span-5">
                      <Input
                        type="number"
                        value={record.value}
                        onChange={(e) => handleValueChange(index, e.target.value)}
                        error={errors[`record_${index}`]}
                        placeholder="Nhập giá trị..."
                        className="h-12"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-8 border-t bg-gray-50">
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              size="lg"
              className="w-full sm:w-auto"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSave}
              isLoading={isLoading}
              leftIcon={<Save className="w-4 h-4 text-white" />}
              size="lg"
              className="w-full sm:w-auto bg-[#00a884] hover:bg-[#008c6a] text-white"
            >
              Lưu Tất Cả
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAddHealthRecord; 