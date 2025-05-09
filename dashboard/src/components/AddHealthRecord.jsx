import { useState, useEffect } from "react";
import { format } from "date-fns";
import { User, Activity, Heart, Calendar, X, Save } from "lucide-react";
import Button from "./ui/Button";
import Select from "./ui/Select";
import Input from "./ui/Input";
import { toast } from "react-toastify";
import { healthRecordsService, healthMetricsService } from "../api/health-records";

const AddHealthRecordModal = ({ athletes, metricGroups, onClose, onSave, onSuccess, onResetFilters }) => {
  const [selectedAthlete, setSelectedAthlete] = useState("");
  const [selectedMetricGroup, setSelectedMetricGroup] = useState("");
  const [healthMetrics, setHealthMetrics] = useState([]);
  const [selectedHealthMetric, setSelectedHealthMetric] = useState("");
  const [value, setValue] = useState("");
  const [recordDate, setRecordDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setSelectedHealthMetric("");
    if (selectedMetricGroup) {
      setIsLoading(true);
      healthMetricsService
        .getByGroup(selectedMetricGroup)
        .then((metrics) => {
          setHealthMetrics(metrics);
          setErrors(prev => ({ ...prev, metricGroup: null }));
        })
        .catch((error) => {
          console.error("Error fetching health metrics:", error);
          setHealthMetrics([]);
          setErrors(prev => ({ ...prev, metricGroup: "Failed to load health metrics" }));
        })
        .finally(() => setIsLoading(false));
    } else {
      setHealthMetrics([]);
    }
  }, [selectedMetricGroup]);

  const validateForm = () => {
    const newErrors = {};
    if (!selectedAthlete) newErrors.athlete = "Vui lòng chọn vận động viên";
    if (!selectedMetricGroup) newErrors.metricGroup = "Vui lòng chọn nhóm chỉ số";
    if (!selectedHealthMetric) newErrors.healthMetric = "Vui lòng chọn chỉ số sức khỏe";
    if (!value) newErrors.value = "Vui lòng nhập giá trị";
    if (isNaN(value)) newErrors.value = "Giá trị phải là số";
    if (value < 0) newErrors.value = "Giá trị không được âm";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const formattedDate = format(new Date(recordDate), "yyyy-MM-dd HH:mm:ss");
    
    try {
      await healthRecordsService.create({
        athlete_id: Number(selectedAthlete),
        metric_id: Number(selectedHealthMetric),
        metric_value: parseFloat(value),
        recorded_at: formattedDate,
      });

      toast.success("Lưu dữ liệu thành công!");
      onResetFilters();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving health record:", error);
      toast.error("Có lỗi xảy ra khi lưu dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Thêm Chỉ Số Sức Khỏe</h2>
                <p className="text-sm text-gray-500 mt-1">Thêm một chỉ số sức khỏe mới</p>
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
          <div className="space-y-4 sm:space-y-6">
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

            <Select
              label="Chỉ số sức khỏe"
              value={selectedHealthMetric}
              onChange={(e) => setSelectedHealthMetric(e.target.value)}
              error={errors.healthMetric}
              disabled={!selectedMetricGroup || isLoading}
              leftIcon={<Heart className="w-4 h-4 text-gray-400" />}
              className="h-12"
            >
              <option value="">-- Chọn chỉ số --</option>
              {healthMetrics.map((metric) => (
                <option key={metric.id} value={metric.id}>
                  {metric.name} {metric.unit ? `(${metric.unit})` : ''}
                </option>
              ))}
            </Select>

            <div className="relative">
              <Input
                type="number"
                label="Giá trị"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                error={errors.value}
                placeholder="Nhập giá trị..."
                className="h-12"
              />
              {selectedHealthMetric && healthMetrics.find(m => m.id === Number(selectedHealthMetric))?.unit && (
                <div className="absolute right-3 top-[2.25rem] text-sm text-gray-500">
                  {healthMetrics.find(m => m.id === Number(selectedHealthMetric)).unit}
                </div>
              )}
            </div>

            <Input
              type="date"
              label="Ngày nhập"
              value={recordDate}
              onChange={(e) => setRecordDate(e.target.value)}
              leftIcon={<Calendar className="w-4 h-4 text-gray-400" />}
              className="h-12"
            />
          </div>
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
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHealthRecordModal;
