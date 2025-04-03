const Calendar = () => {
  return (
    <div className="px-4 py-6 text-xl font-bold h-screen bg-gray-300 flex items-center justify-center">
      <h1 className="text-4xl">Training Schedule</h1>
    </div>
  );
  // return (
  //   <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
  //     <h2 className="text-2xl font-bold mb-4 text-center">Nhap du lieu suc khoe</h2>
  //     <p className="text-center text-green-600 mb-2">Health Record</p>
  //     <form className="space-y-4">
  //     <div>
  //                 <label className="block font-medium">Loại Chỉ Số</label>
  //                 <select
  //                     className="w-full p-2 border rounded-md"
  //                 >
  //                     <option value="height">Chiều Cao (cm)</option>
  //                     <option value="weight">Cân Nặng (kg)</option>
  //                     <option value="heart_rate">Nhịp Tim (bpm)</option>
  //                 </select>
  //             </div>

  //             <div>
  //                 <label className="block font-medium">Giá Trị</label>
  //                 <input
  //                     type="number"
  //                     step="0.01"
  //                     className="w-full p-2 border rounded-md"
  //                     placeholder="Nhập giá trị"
  //                 />
  //             </div>

  //             <div>
  //                 <label className="block font-medium">Ngày Ghi Nhận</label>
  //                 <input
  //                     type="date"
  //                     className="w-full p-2 border rounded-md"
  //                 />
  //             </div>

  //             <button
  //                 type="submit"
  //                 className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
  //                 // disabled={loading}
  //             >
  //                 Save
  //                 {/* {loading ? "Đang ghi nhận..." : "Ghi nhận dữ liệu"} */}
  //             </button>
  //     </form>
  //   </div>
  // );
};

export default Calendar;
