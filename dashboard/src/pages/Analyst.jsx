import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Select from "react-select";
import athleteList from "../data/athleteList";
import { metrics, metrics_type } from "../data/metric";

const sampleData = metrics;

// const metrics_type = ["heart_rate", "height", "weight"];
const athletes = athleteList;
const m_type = metrics_type;

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
    <div>
      {/** Header */}
      <div className="flex items-center justify-between gap-1 sm:gap-6 py-3.5 px-4 border-b border-solid border-gray-200 fixed z-20 top-0 max-lg:left-0 bg-white lg:fixed right-0 lg:w-[calc(100%-270px)]">
        <div className="relative flex">
          <div className="block max-lg:pl-6">
            <h6 className="text-sm sm:text-lg font-semibold text-gray-900 whitespace-nowrap mb-0.5">
              Welcome back,
              <span className="text-indigo-600 text-base sm:text-lg font-semibold">
                Ronald!
              </span>
            </h6>
            <p className="text-xs font-medium text-gray-900">Home</p>
          </div>
        </div>
        <div className="max-sm:hidden flex flex-row items-center gap-1 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="relative w-max">
              <svg
                className="absolute top-1.5 sm:top-3 right-3 z-0"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M17.5001 17.5L15.4167 15.4167M15.8334 9.16667C15.8334 5.48477 12.8486 2.5 9.16673 2.5C5.48483 2.5 2.50006 5.48477 2.50006 9.16667C2.50006 12.8486 5.48483 15.8333 9.16673 15.8333C11.0006 15.8333 12.6615 15.0929 13.8668 13.8947C15.0814 12.6872 15.8334 11.0147 15.8334 9.16667Z"
                  stroke="#6B7280"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                ></path>
              </svg>
              <input
                type="search"
                name=""
                id=""
                className="w-8 sm:w-11 h-8 sm:h-11 outline-0 cursor-pointer bg-transparent relative z-10 transition-all duration-300 focus-within:border focus-within:border-gray-200 focus-within:w-80 focus-within:rounded-md focus-within:pl-3"
              />
            </div>
            <p className="text-gray-200 font-normal">|</p>
          </div>
          <button className="group py-2 px-2 md:pr-5 md:pl-3.5 flex items-center gap-1.5 font-medium text-sm text-gray-500 border border-solid border-gray-300 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">
            <svg
              className="fill-gray-500 transition-all duration-300 group-hover:fill-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M12.75 3.375L12.75 4.025L12.75 3.375ZM5.24999 3.37502L5.24999 2.72502L5.24999 3.37502ZM6.03809 11.15C6.39707 11.15 6.68809 10.859 6.68809 10.5C6.68809 10.141 6.39707 9.85 6.03809 9.85V11.15ZM6.00059 9.85C5.6416 9.85 5.35059 10.141 5.35059 10.5C5.35059 10.859 5.6416 11.15 6.00059 11.15V9.85ZM6.03809 13.4C6.39707 13.4 6.68809 13.109 6.68809 12.75C6.68809 12.391 6.39707 12.1 6.03809 12.1V13.4ZM6.00059 12.1C5.6416 12.1 5.35059 12.391 5.35059 12.75C5.35059 13.109 5.6416 13.4 6.00059 13.4V12.1ZM9.03809 11.15C9.39707 11.15 9.68809 10.859 9.68809 10.5C9.68809 10.141 9.39707 9.85 9.03809 9.85V11.15ZM9.00059 9.85C8.6416 9.85 8.35059 10.141 8.35059 10.5C8.35059 10.859 8.6416 11.15 9.00059 11.15V9.85ZM9.03809 13.4C9.39707 13.4 9.68809 13.109 9.68809 12.75C9.68809 12.391 9.39707 12.1 9.03809 12.1V13.4ZM9.00059 12.1C8.6416 12.1 8.35059 12.391 8.35059 12.75C8.35059 13.109 8.6416 13.4 9.00059 13.4V12.1ZM12.0381 11.15C12.3971 11.15 12.6881 10.859 12.6881 10.5C12.6881 10.141 12.3971 9.85 12.0381 9.85V11.15ZM12.0006 9.85C11.6416 9.85 11.3506 10.141 11.3506 10.5C11.3506 10.859 11.6416 11.15 12.0006 11.15V9.85ZM12.0381 13.4C12.3971 13.4 12.6881 13.109 12.6881 12.75C12.6881 12.391 12.3971 12.1 12.0381 12.1V13.4ZM12.0006 12.1C11.6416 12.1 11.3506 12.391 11.3506 12.75C11.3506 13.109 11.6416 13.4 12.0006 13.4V12.1ZM6.65 2.25C6.65 1.89101 6.35898 1.6 6 1.6C5.64101 1.6 5.35 1.89101 5.35 2.25H6.65ZM5.35 4.5C5.35 4.85899 5.64101 5.15 6 5.15C6.35898 5.15 6.65 4.85899 6.65 4.5H5.35ZM12.65 2.25C12.65 1.89101 12.359 1.6 12 1.6C11.641 1.6 11.35 1.89101 11.35 2.25H12.65ZM11.35 4.5C11.35 4.85899 11.641 5.15 12 5.15C12.359 5.15 12.65 4.85899 12.65 4.5H11.35ZM5.25 4.02502L12.75 4.025L12.75 2.725L5.24999 2.72502L5.25 4.02502ZM15.1 6.375V12.75H16.4V6.375H15.1ZM12.75 15.1H5.25V16.4H12.75V15.1ZM2.9 12.75V6.37502H1.6V12.75H2.9ZM5.25 15.1C4.52452 15.1 4.0458 15.0986 3.6907 15.0509C3.35431 15.0057 3.22773 14.9298 3.14896 14.8511L2.22972 15.7703C2.59029 16.1309 3.03693 16.2747 3.51748 16.3393C3.97933 16.4014 4.56127 16.4 5.25 16.4V15.1ZM1.6 12.75C1.6 13.4388 1.59862 14.0207 1.66071 14.4825C1.72532 14.9631 1.86915 15.4097 2.22972 15.7703L3.14896 14.8511C3.07019 14.7723 2.99435 14.6457 2.94912 14.3093C2.90138 13.9542 2.9 13.4755 2.9 12.75H1.6ZM15.1 12.75C15.1 13.4755 15.0986 13.9542 15.0509 14.3093C15.0057 14.6457 14.9298 14.7723 14.851 14.8511L15.7703 15.7703C16.1308 15.4097 16.2747 14.9631 16.3393 14.4825C16.4014 14.0207 16.4 13.4388 16.4 12.75H15.1ZM12.75 16.4C13.4387 16.4 14.0207 16.4014 14.4825 16.3393C14.9631 16.2747 15.4097 16.1309 15.7703 15.7703L14.851 14.8511C14.7723 14.9298 14.6457 15.0057 14.3093 15.0509C13.9542 15.0986 13.4755 15.1 12.75 15.1V16.4ZM12.75 4.025C13.4755 4.025 13.9542 4.02638 14.3093 4.07412C14.6457 4.11935 14.7723 4.19519 14.851 4.27396L15.7703 3.35472C15.4097 2.99415 14.9631 2.85032 14.4825 2.78572C14.0207 2.72362 13.4387 2.725 12.75 2.725L12.75 4.025ZM16.4 6.375C16.4 5.68627 16.4014 5.10433 16.3393 4.64248C16.2747 4.16194 16.1308 3.71529 15.7703 3.35472L14.851 4.27396C14.9298 4.35273 15.0057 4.47931 15.0509 4.81571C15.0986 5.1708 15.1 5.64952 15.1 6.375H16.4ZM5.24999 2.72502C4.56126 2.72502 3.97933 2.72364 3.51748 2.78573C3.03693 2.85034 2.59029 2.99417 2.22972 3.35474L3.14896 4.27398C3.22773 4.19521 3.35431 4.11937 3.6907 4.07414C4.04579 4.0264 4.52451 4.02502 5.25 4.02502L5.24999 2.72502ZM2.9 6.37502C2.9 5.64954 2.90138 5.17081 2.94912 4.81572C2.99435 4.47933 3.07019 4.35275 3.14896 4.27398L2.22972 3.35474C1.86915 3.71531 1.72532 4.16195 1.66071 4.6425C1.59862 5.10435 1.6 5.68629 1.6 6.37502H2.9ZM2.25 8.15H15.75V6.85H2.25V8.15ZM6.03809 9.85H6.00059V11.15H6.03809V9.85ZM6.03809 12.1H6.00059V13.4H6.03809V12.1ZM9.03809 9.85H9.00059V11.15H9.03809V9.85ZM9.03809 12.1H9.00059V13.4H9.03809V12.1ZM12.0381 9.85H12.0006V11.15H12.0381V9.85ZM12.0381 12.1H12.0006V13.4H12.0381V12.1ZM5.35 2.25V4.5H6.65V2.25H5.35ZM11.35 2.25V4.5H12.65V2.25H11.35Z"
                fill=""
              ></path>
            </svg>
            <span className="max-md:hidden">Training Schedule</span>
          </button>
          <button
            onClick={() => setShowAddAthleteModal(true)}
            className="hover:cursor-pointer group py-2 px-2 md:pr-5 md:pl-3.5 flex items-center whitespace-nowrap gap-1.5 font-medium text-sm text-white border border-solid border-indigo-600 bg-indigo-600 rounded-lg transition-all duration-300 hover:bg-indigo-800 hover:border-indigo-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
            <span className="max-md:hidden">Add Athlete</span>
          </button>
        </div>

        {/* Hidden button for mobile */}
        <div className="flex items-center gap-2 sm:hidden">
          <div className="relative w-max">
            <svg
              className="absolute top-1.5 sm:top-3 right-3 z-0"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M17.5001 17.5L15.4167 15.4167M15.8334 9.16667C15.8334 5.48477 12.8486 2.5 9.16673 2.5C5.48483 2.5 2.50006 5.48477 2.50006 9.16667C2.50006 12.8486 5.48483 15.8333 9.16673 15.8333C11.0006 15.8333 12.6615 15.0929 13.8668 13.8947C15.0814 12.6872 15.8334 11.0147 15.8334 9.16667Z"
                stroke="#6B7280"
                strokeWidth="1.3"
                strokeLinecap="round"
              ></path>
            </svg>
            <input
              type="search"
              name=""
              id=""
              className="w-8 sm:w-11 h-8 sm:h-11 outline-0 cursor-pointer bg-transparent relative z-10 transition-all duration-300 focus-within:border focus-within:border-gray-200 focus-within:w-44 focus-within:rounded-md focus-within:pl-3"
            />
          </div>
          <div className="dropdown relative inline-flex">
            <button
              type="button"
              data-target="dropdown-default"
              className="dropdown-toggle inline-flex justify-center items-center gap-2 p-0.5 text-sm text-white rounded-md cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.0161 16.9896V17.0396M12.0161 11.976V12.026M12.0161 6.96228V7.01228"
                  stroke="#6B7280"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                ></path>
              </svg>
            </button>
            <div
              id="dropdown-default"
              className="dropdown-menu rounded-xl shadow-lg bg-white absolute right-2 top-full w-44 mt-2 open hidden"
              aria-labelledby="dropdown-default"
            >
              <ul className="py-2 flex flex-col gap-2.5 px-3">
                <li className="flex items-center justify-start gap-1.5">
                  <button className="group py-2 px-2 md:pr-5  md:pl-3.5 flex items-center gap-1.5 font-medium text-sm text-gray-500 border border-solid border-gray-300 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">
                    <svg
                      className="stroke-gray-500 transition-all duration-300 group-hover:stroke-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M11.3235 2.5H9.16667C6.02397 2.5 4.45262 2.5 3.47631 3.47631C2.5 4.45262 2.5 6.02397 2.5 9.16667V10.8333C2.5 13.976 2.5 15.5474 3.47631 16.5237C4.45262 17.5 6.02397 17.5 9.16667 17.5H10.8333C13.976 17.5 15.5474 17.5 16.5237 16.5237C17.5 15.5474 17.5 13.976 17.5 10.8333V9.55882M10 10H5.83333M12.5 13.3333H5.83333M17.5 4.58333C17.5 5.73393 16.5673 6.66667 15.4167 6.66667C14.2661 6.66667 13.3333 5.73393 13.3333 4.58333C13.3333 3.43274 14.2661 2.5 15.4167 2.5C16.5673 2.5 17.5 3.43274 17.5 4.58333Z"
                        stroke=""
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    Notification
                  </span>
                </li>
                <li className="flex items-center justify-start gap-1.5">
                  <button className="group py-2 px-2 md:pr-5 md:pl-3.5 flex items-center gap-1.5 font-medium text-sm text-gray-500 border border-solid border-gray-300 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">
                    <svg
                      className="fill-gray-500 transition-all duration-300 group-hover:fill-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M12.75 3.375L12.75 4.025L12.75 3.375ZM5.24999 3.37502L5.24999 2.72502L5.24999 3.37502ZM6.03809 11.15C6.39707 11.15 6.68809 10.859 6.68809 10.5C6.68809 10.141 6.39707 9.85 6.03809 9.85V11.15ZM6.00059 9.85C5.6416 9.85 5.35059 10.141 5.35059 10.5C5.35059 10.859 5.6416 11.15 6.00059 11.15V9.85ZM6.03809 13.4C6.39707 13.4 6.68809 13.109 6.68809 12.75C6.68809 12.391 6.39707 12.1 6.03809 12.1V13.4ZM6.00059 12.1C5.6416 12.1 5.35059 12.391 5.35059 12.75C5.35059 13.109 5.6416 13.4 6.00059 13.4V12.1ZM9.03809 11.15C9.39707 11.15 9.68809 10.859 9.68809 10.5C9.68809 10.141 9.39707 9.85 9.03809 9.85V11.15ZM9.00059 9.85C8.6416 9.85 8.35059 10.141 8.35059 10.5C8.35059 10.859 8.6416 11.15 9.00059 11.15V9.85ZM9.03809 13.4C9.39707 13.4 9.68809 13.109 9.68809 12.75C9.68809 12.391 9.39707 12.1 9.03809 12.1V13.4ZM9.00059 12.1C8.6416 12.1 8.35059 12.391 8.35059 12.75C8.35059 13.109 8.6416 13.4 9.00059 13.4V12.1ZM12.0381 11.15C12.3971 11.15 12.6881 10.859 12.6881 10.5C12.6881 10.141 12.3971 9.85 12.0381 9.85V11.15ZM12.0006 9.85C11.6416 9.85 11.3506 10.141 11.3506 10.5C11.3506 10.859 11.6416 11.15 12.0006 11.15V9.85ZM12.0381 13.4C12.3971 13.4 12.6881 13.109 12.6881 12.75C12.6881 12.391 12.3971 12.1 12.0381 12.1V13.4ZM12.0006 12.1C11.6416 12.1 11.3506 12.391 11.3506 12.75C11.3506 13.109 11.6416 13.4 12.0006 13.4V12.1ZM6.65 2.25C6.65 1.89101 6.35898 1.6 6 1.6C5.64101 1.6 5.35 1.89101 5.35 2.25H6.65ZM5.35 4.5C5.35 4.85899 5.64101 5.15 6 5.15C6.35898 5.15 6.65 4.85899 6.65 4.5H5.35ZM12.65 2.25C12.65 1.89101 12.359 1.6 12 1.6C11.641 1.6 11.35 1.89101 11.35 2.25H12.65ZM11.35 4.5C11.35 4.85899 11.641 5.15 12 5.15C12.359 5.15 12.65 4.85899 12.65 4.5H11.35ZM5.25 4.02502L12.75 4.025L12.75 2.725L5.24999 2.72502L5.25 4.02502ZM15.1 6.375V12.75H16.4V6.375H15.1ZM12.75 15.1H5.25V16.4H12.75V15.1ZM2.9 12.75V6.37502H1.6V12.75H2.9ZM5.25 15.1C4.52452 15.1 4.0458 15.0986 3.6907 15.0509C3.35431 15.0057 3.22773 14.9298 3.14896 14.8511L2.22972 15.7703C2.59029 16.1309 3.03693 16.2747 3.51748 16.3393C3.97933 16.4014 4.56127 16.4 5.25 16.4V15.1ZM1.6 12.75C1.6 13.4388 1.59862 14.0207 1.66071 14.4825C1.72532 14.9631 1.86915 15.4097 2.22972 15.7703L3.14896 14.8511C3.07019 14.7723 2.99435 14.6457 2.94912 14.3093C2.90138 13.9542 2.9 13.4755 2.9 12.75H1.6ZM15.1 12.75C15.1 13.4755 15.0986 13.9542 15.0509 14.3093C15.0057 14.6457 14.9298 14.7723 14.851 14.8511L15.7703 15.7703C16.1308 15.4097 16.2747 14.9631 16.3393 14.4825C16.4014 14.0207 16.4 13.4388 16.4 12.75H15.1ZM12.75 16.4C13.4387 16.4 14.0207 16.4014 14.4825 16.3393C14.9631 16.2747 15.4097 16.1309 15.7703 15.7703L14.851 14.8511C14.7723 14.9298 14.6457 15.0057 14.3093 15.0509C13.9542 15.0986 13.4755 15.1 12.75 15.1V16.4ZM12.75 4.025C13.4755 4.025 13.9542 4.02638 14.3093 4.07412C14.6457 4.11935 14.7723 4.19519 14.851 4.27396L15.7703 3.35472C15.4097 2.99415 14.9631 2.85032 14.4825 2.78572C14.0207 2.72362 13.4387 2.725 12.75 2.725L12.75 4.025ZM16.4 6.375C16.4 5.68627 16.4014 5.10433 16.3393 4.64248C16.2747 4.16194 16.1308 3.71529 15.7703 3.35472L14.851 4.27396C14.9298 4.35273 15.0057 4.47931 15.0509 4.81571C15.0986 5.1708 15.1 5.64952 15.1 6.375H16.4ZM5.24999 2.72502C4.56126 2.72502 3.97933 2.72364 3.51748 2.78573C3.03693 2.85034 2.59029 2.99417 2.22972 3.35474L3.14896 4.27398C3.22773 4.19521 3.35431 4.11937 3.6907 4.07414C4.04579 4.0264 4.52451 4.02502 5.25 4.02502L5.24999 2.72502ZM2.9 6.37502C2.9 5.64954 2.90138 5.17081 2.94912 4.81572C2.99435 4.47933 3.07019 4.35275 3.14896 4.27398L2.22972 3.35474C1.86915 3.71531 1.72532 4.16195 1.66071 4.6425C1.59862 5.10435 1.6 5.68629 1.6 6.37502H2.9ZM2.25 8.15H15.75V6.85H2.25V8.15ZM6.03809 9.85H6.00059V11.15H6.03809V9.85ZM6.03809 12.1H6.00059V13.4H6.03809V12.1ZM9.03809 9.85H9.00059V11.15H9.03809V9.85ZM9.03809 12.1H9.00059V13.4H9.03809V12.1ZM12.0381 9.85H12.0006V11.15H12.0381V9.85ZM12.0381 12.1H12.0006V13.4H12.0381V12.1ZM5.35 2.25V4.5H6.65V2.25H5.35ZM11.35 2.25V4.5H12.65V2.25H11.35Z"
                        fill=""
                      ></path>
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    Training Schedule
                  </span>
                </li>
                <li className="flex items-center justify-start gap-1.5">
                  <button className="group py-2 px-2 md:pr-5 md:pl-3.5 flex items-center whitespace-nowrap gap-1.5 font-medium text-sm text-white border border-solid border-indigo-600 bg-indigo-600 rounded-lg transition-all duration-300 hover:bg-indigo-700 hover:border-indigo-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
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
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    Add Athlete
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/** Main content */}
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
    </div>
  );
};

export default HealthChart;
