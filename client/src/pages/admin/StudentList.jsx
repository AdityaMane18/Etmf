import React from "react";
import { FaSearch } from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSidebar";

const students = [
  { roll: 1, name: "Rahul Desai", class: "SY", percentage: 50, result: "Pass" },
  { roll: 2, name: "Priya Sharma", class: "SY", percentage: 80, result: "Pass" },
  { roll: 3, name: "Amit Verma", class: "SY", percentage: 90, result: "Pass" },
  { roll: 4, name: "Neha Patel", class: "SY", percentage: 70, result: "Pass" },
  { roll: 5, name: "Arjun Mehta", class: "SY", percentage: 40, result: "Fail" },
];

const StudentList = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ✅ Reuse AdminSidebar */}
      <AdminSidebar activePage="Students List" />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-xl font-bold text-blue-600 mb-4">Students List</h1>

        {/* Search */}
        <div className="mb-4">
          <div className="flex items-center border rounded px-3 py-2 bg-white w-full max-w-md">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-xl overflow-x-auto w-full max-w-7xl mx-auto">
          <table className="w-full text-sm text-center border border-gray-300">
            <thead className="bg-gray-50 text-gray-700">
              <tr className="h-18">
                <th className="px-4 border border-gray-300">Roll No.</th>
                <th className="px-4 border border-gray-300">Student Name</th>
                <th className="px-4 border border-gray-300">Class</th>
                <th className="px-4 border border-gray-300">Total Percentage</th>
                <th className="px-4 border border-gray-300">Result</th>
                <th className="px-4 border border-gray-300">Report</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.roll} className="h-24 hover:bg-gray-50">
                  <td className="px-4 border border-gray-300">{s.roll}</td>
                  <td className="px-4 border border-gray-300 font-medium text-gray-800">{s.name}</td>
                  <td className="px-4 border border-gray-300">{s.class}</td>
                  <td className="px-4 border border-gray-300">{s.percentage} %</td>
                  <td className={`px-4 border border-gray-300 font-semibold ${s.result === "Pass" ? "text-green-600" : "text-red-500"}`}>
                    {s.result}
                  </td>
                  <td className="px-4 border border-gray-300">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </main>
    </div>
  );
};

export default StudentList;
