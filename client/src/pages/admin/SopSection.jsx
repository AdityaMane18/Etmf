import {React, useState, useEffect} from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaSearch, FaUpload, FaEye } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";

const SOPSection = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/documents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocuments(res.data);
      } catch (error) {
        toast.error("Failed to load documents");
        console.error(error);
      }
    };
  
    fetchDocuments();
  }, []);
   // Search Filter
   const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const paginatedDocs = filteredDocs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            className="bg-white-300 hover:bg-gray-300 text-bold px-10 py-2 rounded flex items-center gap-2 shadow"
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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page
              }}
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* 📋 Table */}
        <div className="bg-white shadow rounded-xl overflow-x-auto">
          <table className="w-full text-sm e">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="text-left py-3 px-4 border-r">Document</th>
                <th className="text-left py-3 px-4 border-r">Document Type</th>
                <th className="text-left py-3 px-4 border-r">Date and Time</th>
                <th className="text-left py-3 px-4 ">No Of Views</th>
              </tr>
            </thead>
            <tbody>
            {documents.map((doc) => (
  <tr key={doc._id} className="border-t hover:bg-gray-50 transition">
    <td className="py-4 px-4 border-r">
      <div className="flex gap-3 items-center">
        <div className="text-2xl text-blue-600">
          <HiOutlineDocumentText />
        </div>
        <div>
          <p className="font-medium text-gray-800">{doc.name}</p>
          <p className="text-gray-500 text-xs">
            Created By: {doc.created_by?.name || "Unknown"}
          </p>
        </div>
      </div>
    </td>
    <td className="py-4 px-4 text-gray-700 border-r">SOP</td>
    <td className="py-4 px-4 text-gray-700 border-r">
      {new Date(doc.createdAt).toLocaleString()}
    </td>
    <td className="py-6 px-6 text-gray-700 flex items-center gap-4">
      <FaEye className="text-blue-400" /> {doc.views || 0}
    </td>
  </tr>
))}

            </tbody>
          </table>
        </div>
        {/* 🔢 Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </main>
    </div>
  );
};

export default SOPSection;
