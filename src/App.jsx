import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const App = () => {
  const [fromDate, setFromDate] = useState('2024-04-01');
  const [toDate, setToDate] = useState('2024-05-01');
  const [alertType, setAlertType] = useState('All');
  const [searchText, setSearchText] = useState('');

  const [dashboardData, setDashboardData] = useState({
    alertCount: 324,
    criticalAlerts: 85,
    openAlerts: 56,
    closedAlerts: 183,
    sslAlerts: 60,
    dataLeaks: 30,
    others: 10,
    turnaroundTime: '1h 45min'
  });

  const recentAlerts = [
    {
      date: '04/15/2024',
      time: '10:35 AM',
      type: 'Malware',
      severity: 'High',
      description: 'Malware detected',
      ip: '192.168.1.12',
      count: 120,
      critical: 45
    },
    {
      date: '04/15/2024',
      time: '09:21 AM',
      type: 'Unauthorized Access',
      severity: 'Medium',
      description: 'Suspicious login',
      ip: 'App Server 3',
      count: 95,
      critical: 33
    },
    {
      date: '04/15/2024',
      time: '08:25 AM',
      type: 'Expired SSL',
      severity: 'Medium',
      description: 'Expired SSL certificate',
      ip: 'Firewall A',
      count: 50,
      critical: 10
    }
  ];

  const trendData = {
    labels: ['Apr 1', 'Apr 7', 'Apr 13', 'Apr 19', 'Apr 25', 'May 1'],
    datasets: [
      {
        label: 'Alerts',
        data: [30, 25, 40, 55, 45, 60],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Critical',
        data: [20, 15, 25, 35, 30, 40],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      }
    ],
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 0,
          font: { size: 10 }
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          padding: 0,
          font: { size: 10 }
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const pieData = {
    labels: ['SSL Alerts', 'Data Leaks', 'Others'],
    datasets: [
      {
        data: [dashboardData.sslAlerts, dashboardData.dataLeaks, dashboardData.others],
        backgroundColor: ['#3b82f6', '#ef4444', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    const daysDiff = Math.ceil((toDateObj - fromDateObj) / (1000 * 60 * 60 * 24));
    
    const multiplier = Math.max(0.5, daysDiff / 30);
    setDashboardData({
      alertCount: Math.floor(324 * multiplier),
      criticalAlerts: Math.floor(85 * multiplier),
      openAlerts: Math.floor(56 * multiplier),
      closedAlerts: Math.floor(183 * multiplier),
      sslAlerts: 60,
      dataLeaks: 30,
      others: 10,
      turnaroundTime: '1h 45min'
    });
  }, [fromDate, toDate]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="w-48 bg-gradient-to-b from-blue-600 to-purple-700 text-white flex flex-col">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">⚠</span>
            </div>
            <span className="text-lg font-bold">AlertsTool</span>
          </div>
          
          <nav className="space-y-1">
            <div className="bg-white bg-opacity-20 rounded-lg p-2 flex items-center space-x-2">
              <span className="text-xs">📊</span>
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="p-2 flex items-center space-x-2 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer">
              <span className="text-xs">👁</span>
              <span className="text-sm">Monitoring</span>
            </div>
            <div className="p-2 flex items-center space-x-2 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer">
              <span className="text-xs">🔍</span>
              <span className="text-sm">API Scan</span>
            </div>
            <div className="p-2 flex items-center space-x-2 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer">
              <span className="text-xs">📋</span>
              <span className="text-sm">Reports</span>
            </div>
          </nav>
        </div>
        
        <div className="mt-auto p-4 space-y-1">
          <div className="p-2 flex items-center space-x-2 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer">
            <span className="text-xs">⚙️</span>
            <span className="text-sm">Settings</span>
          </div>
          <div className="p-2 flex items-center space-x-2 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer">
            <span className="text-xs">🚪</span>
            <span className="text-sm">Log Out</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img src="https://ui-avatars.com/api/?name=Harsh&background=8b5cf6&color=fff" alt="User" className="w-6 h-6 rounded-full" />
                <div className="text-xs">
                  <div className="font-medium">Harsh</div>
                  <div className="text-gray-500">Harsh@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-3 overflow-auto">
          <div className="flex items-center space-x-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">From:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">To:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200">
              <div className="text-xs font-medium text-gray-500 mb-1">Alert Count</div>
              <div className="text-xl font-bold text-gray-900">{dashboardData.alertCount}</div>
            </div>
            <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-medium text-gray-500">Critical</div>
                <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xs">⚠</span>
                </div>
              </div>
              <div className="text-xl font-bold text-red-600">{dashboardData.criticalAlerts}</div>
            </div>
            <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200">
              <div className="text-xs font-medium text-gray-500 mb-1">Open</div>
              <div className="text-xl font-bold text-gray-900">{dashboardData.openAlerts}</div>
            </div>
            <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200">
              <div className="text-xs font-medium text-gray-500 mb-1">Closed</div>
              <div className="text-xl font-bold text-gray-900">{dashboardData.closedAlerts}</div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 mb-3">
            <div className="col-span-6 bg-white rounded-md p-2 shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-800 mb-1">Alert Trends</h3>
              <div className="h-32 w-full">
                <Line data={trendData} options={trendOptions} />
              </div>
            </div>

            <div className="col-span-3 bg-white rounded-md p-2 shadow-sm border border-gray-200">
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Alert Type:</label>
                <select
                  value={alertType}
                  onChange={(e) => setAlertType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-1 py-1 text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All</option>
                  <option value="SSL Alerts">SSL Alerts</option>
                  <option value="Data Leaks">Data Leaks</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="h-24 mb-1">
                <Doughnut data={pieData} options={pieOptions} />
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-blue-600">{dashboardData.sslAlerts}%</span>
                <span className="text-red-600">{dashboardData.dataLeaks}%</span>
                <span className="text-yellow-600">{dashboardData.others}%</span>
              </div>
            </div>

            <div className="col-span-3 bg-white rounded-md p-2 shadow-sm border border-gray-200">
              <h4 className="text-xs font-semibold text-gray-900 mb-2">Turnaround Time</h4>
              <div className="text-2xl font-bold text-gray-900 mb-2">{dashboardData.turnaroundTime}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
              <div className="text-xs text-gray-500 text-center">75% Complete</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-md shadow-sm border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Recent Alerts</h3>
              </div>
              <div className="overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase">Date & Time</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentAlerts.map((alert, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-900">
                          <div>{alert.date}</div>
                          <div className="text-gray-500">{alert.time}</div>
                        </td>
                        <td className="px-3 py-2 text-gray-900">{alert.type}</td>
                        <td className="px-3 py-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            alert.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {alert.severity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Top Alerts</h3>
              </div>
              <div className="overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase">Source System/IP</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase">Count</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase">Critical</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentAlerts.map((alert, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-900">{alert.ip}</td>
                        <td className="px-3 py-2 text-gray-900">{alert.count}</td>
                        <td className="px-3 py-2 text-gray-900">{alert.critical}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;