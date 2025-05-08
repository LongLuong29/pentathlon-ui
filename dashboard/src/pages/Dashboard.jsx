import React, { useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Card from '../components/common/Card';
import HealthMetricChart from '../components/HealthMetricChart';

const Dashboard = () => {
  // Mock data - sẽ được thay thế bằng dữ liệu thực từ API
  const stats = [
    {
      title: 'Tổng số VĐV',
      value: '24',
      trend: '+12%',
      trendUp: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Buổi tập tháng này',
      value: '128',
      trend: '+24%',
      trendUp: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Thành tích mới',
      value: '8',
      trend: '+4',
      trendUp: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: 'Hiệu suất TB',
      value: '92%',
      trend: '+2%',
      trendUp: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'training',
      title: 'Buổi tập sáng',
      time: '08:00 - 10:00',
      date: '2024-03-20',
      location: 'Sân vận động Mỹ Đình',
      status: 'completed',
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Kỷ lục mới - 100m',
      athlete: 'Nguyễn Văn A',
      date: '2024-03-19',
      value: '10.5s',
    },
    {
      id: 3,
      type: 'training',
      title: 'Buổi tập chiều',
      time: '14:00 - 16:00',
      date: '2024-03-19',
      location: 'Trung tâm TDTT',
      status: 'completed',
    },
  ];

  // Mock data cho biểu đồ
  const healthMetricsData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        label: 'Hiệu suất',
        data: [85, 88, 92, 90, 87, 94, 91],
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-indigo-100">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg p-2">
                  {stat.icon}
                </div>
              </div>
              <div className="pt-8">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-baseline mt-2">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <span className={`ml-2 text-sm font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts and Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Performance Chart */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Hiệu suất tuần qua</h3>
              <select className="text-sm border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                <option>7 ngày qua</option>
                <option>30 ngày qua</option>
                <option>3 tháng qua</option>
              </select>
            </div>
            <HealthMetricChart data={healthMetricsData} loading={false} />
          </Card>

          {/* Recent Activities */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Hoạt động gần đây</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-700">
                Xem tất cả
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'training' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {activity.type === 'training' ? (
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <span>{format(new Date(activity.date), 'dd/MM/yyyy', { locale: vi })}</span>
                      {activity.time && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{activity.time}</span>
                        </>
                      )}
                      {activity.location && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{activity.location}</span>
                        </>
                      )}
                      {activity.athlete && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{activity.athlete}</span>
                        </>
                      )}
                      {activity.value && (
                        <>
                          <span className="mx-1">•</span>
                          <span className="font-medium text-green-600">{activity.value}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
