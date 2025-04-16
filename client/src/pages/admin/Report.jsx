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
    <div className="min-h-screen flex bg-white">
      {/* Reusable Admin Sidebar */}
      <AdminSidebar activePage="Report" />

      {/* Main content */}
      <main className="flex-1 p-6">
      <div className="w-full bg-blue-100 py-3 px-4 rounded mb-4">
         <h1 className="text-xl font-bold text-blue-400">Report</h1>
      </div>

        <div className="grid grid-cols-3 md:grid-cols-2">

  {/* Stats Cards */}
  <div className="px-6 bg-blue-50 p-4 rounded-md shadow w-150">
    <h2 className="text-base font-semibold text-gray-700 mb-3">
      Rahul Desai Task Report
    </h2>
    <div className="grid grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-md p-3 shadow text-center"
        >
          <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
          <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  </div>


          {/* Pie Chart */}
          <div className="flex items-center justify-center gap-5">
  {/* PieChart on the left side */}
  <div className="flex justify-center">
    <ResponsiveContainer width={300} height={300} >
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}  // <-- Show percentage inside slices
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Legends on the right side */}
  <div className="w-1/2 space-y-1">
    {chartData.map((entry, index) => (
      <div key={index} className="flex items-center space-x-1">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: COLORS[index] }}
        ></div>
        <span className="text-sm text-gray-700">{entry.name}</span>
      </div>
    ))}
  </div>
</div>

        </div>
      </main>
    </div>
  );
};

export default Report;
