import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaFolder } from "react-icons/fa";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/tasks/distinct-documents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocuments(res.data);
      } catch (err) {
        toast.error("Failed to load tasks");
      }
    };

    fetchDocs();
  }, []);
  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Documents</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc._id}
            className="flex items-start gap-4 bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition"
          >
            {/* Folder Icon */}
            <div className="text-blue-500 mt-1">
              <FaFolder size={32} />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <p className="font-medium text-gray-800">{doc.name}</p>
              <p className="text-sm text-gray-600 mt-1">
                Created On: {new Date(doc.createdAt).toLocaleString()}
                <br />
                Created By: {doc.created_by?.name || "Unknown"}
              </p>
            </div>
            <button
              className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate(`/admin/document/${doc._id}`)}
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
