import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminSidebar from "../../components/admin/AdminSidebar";

const stats = [
  { label: "Total Tasks Assigned", value: 25 },
  { label: "Tasks Completed", value: 20 },
  { label: "Pending Tasks", value: 3 },
  { label: "Overdue Tasks", value: 2 },
  { label: "Passed", value: 18 },
  { label: "Failed", value: 2 },
  { label: "Average Time Taken (Days)", value: 4 },
];

const chartData = [
  { name: "Tasks Completed", value: 40 },
  { name: "Pending Tasks", value: 30 },
  { name: "Overdue Tasks", value: 20 },
  { name: "Passed", value: 35 },
  { name: "Failed", value: 2 },
];

const COLORS = ["#34D399", "#FBBF24", "#06B6D4", "#6366F1", "#A78BFA"];

const Report = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Reusable Admin Sidebar */}
      <AdminSidebar activePage="Report" />

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-xl font-bold text-blue-600 mb-4">Report</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stats Cards */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Rahul Desai Task Report</h2>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-md p-4 shadow text-center"
                >
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
