import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { vi } from 'date-fns/locale';
import AddTrainingForm from './AddTrainingForm';

const TrainingSchedule = ({ athletes }) => {
  const [viewMode, setViewMode] = useState('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [trainingSessions, setTrainingSessions] = useState([
    {
      id: 1,
      title: 'Buổi tập sáng',
      date: '2024-03-20',
      startTime: '08:00',
      endTime: '10:00',
      location: 'Sân vận động Mỹ Đình',
      coach: 'Nguyễn Văn A',
      athletes: [
        { id: 1, name: 'Trần Văn B' },
        { id: 2, name: 'Lê Thị C' }
      ],
      status: 'scheduled'
    },
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const sessionsOnDate = trainingSessions.filter(
      session => isSameDay(new Date(session.date), date)
    );
    if (sessionsOnDate.length > 0) {
      setSelectedSession(sessionsOnDate[0]);
      setShowHealthModal(true);
    }
  };

  const handleAddTraining = (formData) => {
    const newTraining = {
      id: Date.now(),
      ...formData,
      status: 'scheduled'
    };
    setTrainingSessions(prev => [...prev, newTraining]);
    setShowAddModal(false);
  };

  const handleViewHealthMetrics = (session) => {
    setSelectedSession(session);
    setShowHealthModal(true);
  };

  const renderCalendarView = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Get day names in Vietnamese
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex items-center justify-between bg-gray-50 border-b">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentMonth, 'MMMM yyyy', { locale: vi })}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-start-${index}`} className="bg-white h-24 sm:h-32" />
          ))}

          {daysInMonth.map((day, dayIdx) => {
            const sessionsOnDay = trainingSessions.filter(session =>
              isSameDay(new Date(session.date), day)
            );
            
            return (
              <div
                key={day.toISOString()}
                className={`bg-white h-24 sm:h-32 p-2 hover:bg-gray-50 cursor-pointer ${
                  isSameDay(day, selectedDate) ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleDateSelect(day)}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      !isSameMonth(day, currentMonth)
                        ? 'text-gray-400'
                        : isSameDay(day, new Date())
                        ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                        : 'text-gray-700'
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                </div>

                <div className="mt-2 space-y-1">
                  {sessionsOnDay.map((session, idx) => (
                    <div
                      key={session.id}
                      className="text-xs bg-blue-100 text-blue-700 rounded px-1 py-0.5 truncate"
                      title={`${session.title} (${session.startTime}-${session.endTime})`}
                    >
                      {session.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {Array.from({
            length: 6 - endOfMonth(currentMonth).getDay()
          }).map((_, index) => (
            <div key={`empty-end-${index}`} className="bg-white h-24 sm:h-32" />
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiêu đề
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Địa điểm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                HLV
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trainingSessions.map((session) => (
              <tr key={session.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{session.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(session.date), 'dd/MM/yyyy')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {session.startTime} - {session.endTime}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{session.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{session.coach}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {session.status === 'scheduled' ? 'Đã lên lịch' : session.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'calendar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Lịch
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Danh sách
          </button>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Thêm buổi tập
        </button>
      </div>

      {viewMode === 'calendar' ? renderCalendarView() : renderListView()}

      {showAddModal && (
        <AddTrainingForm
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTraining}
          athletes={athletes}
        />
      )}

      {showHealthModal && selectedSession && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setShowHealthModal(false)}
                  >
                    <span className="sr-only">Đóng</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                      {selectedSession.title}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Thời gian:</span>
                        <span className="text-sm text-gray-500">
                          {format(new Date(selectedSession.date), 'dd/MM/yyyy')} {selectedSession.startTime} - {selectedSession.endTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Địa điểm:</span>
                        <span className="text-sm text-gray-500">{selectedSession.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">HLV:</span>
                        <span className="text-sm text-gray-500">{selectedSession.coach}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Vận động viên:</span>
                        <div className="mt-1">
                          {selectedSession.athletes.map((athlete, index) => (
                            <span
                              key={athlete.id}
                              className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-1 mb-1"
                            >
                              {athlete.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowHealthModal(false)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingSchedule; 