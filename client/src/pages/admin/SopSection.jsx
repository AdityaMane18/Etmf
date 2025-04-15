import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FaSearch, FaUpload, FaEye } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";

const SOPSection = () => {
  const navigate = useNavigate();

  const documents = [
    {
      iconColor: 'text-purple-500',
      title: 'Comprehensive Study Protocol for Clinical Trial: Phase III Oncology Research',
      type: 'Study Protocol',
      created: '2025-01-28, 10:30 AM',
      by: 'Dr. Anil Mehta',
      views: '500',
    },
    {
      iconColor: 'text-red-500',
      title: 'Investigator Brochure Detailing Drug Safety and Efficacy for Trial Medication XYZ-2025',
      type: 'Investigator Brochure (IB)',
      created: '2025-01-27, 3:45 PM',
      by: 'Ms. Priya Sharma',
      views: '112',
    },
    {
      iconColor: 'text-blue-500',
      title: 'Participant Informed Consent Form for Multicenter Diabetes Management Study',
      type: 'Informed Consent Form (ICF)',
      created: '2025-01-26, 9:00 AM',
      by: 'Mr. Ravi Kumar',
      views: '5.2K',
    },
    {
      iconColor: 'text-yellow-500',
      title: 'Detailed Site Monitoring Report for Clinical Site #125 – Interim Analysis',
      type: 'Site Monitoring Report',
      created: '2025-01-25, 11:15 AM',
      by: 'Dr. Sneha Patel',
      views: '1K',
    },
    {
      iconColor: 'text-green-500',
      title: 'Final Study Closure Checklist and Regulatory Compliance Summary for Trial ABC-2025',
      type: 'Study Closure & Regulatory Compliance Document',
      created: '2025-01-24, 4:30 PM',
      by: 'Ms. Aditi Singh',
      views: '516',
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ✅ Reused sidebar */}
      <AdminSidebar />

      {/* 📄 Main content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">SOP Section</h1>
          <button
  onClick={() => navigate("/admin/upload-document")}
  className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded flex items-center gap-2 shadow"
>
  <FaUpload /> Upload Document
</button>

        </div>

        {/* 🔍 Search bar */}
        <div className="mb-4 max-w-md">
          <div className="flex items-center border rounded px-3 py-2 bg-white">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* 📋 Table */}
        <div className="bg-white shadow rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="text-left py-3 px-4">Document</th>
                <th className="text-left py-3 px-4">Document Type</th>
                <th className="text-left py-3 px-4">Date and Time</th>
                <th className="text-left py-3 px-4">No Of Views</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 flex gap-3 items-center">
                    <div className={`text-2xl ${doc.iconColor}`}>
                      <HiOutlineDocumentText />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{doc.title}</p>
                      <p className="text-gray-500 text-xs">Created By: {doc.by}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{doc.type}</td>
                  <td className="py-4 px-4 text-gray-700">Created On: {doc.created}</td>
                  <td className="py-4 px-4 text-gray-700 flex items-center gap-2">
                    <FaEye className="text-blue-400" /> {doc.views}
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

export default SOPSection;
