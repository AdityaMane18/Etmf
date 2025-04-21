import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast } from "react-hot-toast";

const AdminDocumentViewer = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/documents/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocument(res.data);
      } catch (error) {
        toast.error("Failed to load document");
        console.error(error);
      }
    };

    fetchDocument();
  }, [id]);

  if (!document) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Document Details</h2>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{document.name}</h3>
          <p className="text-gray-600 mb-2">{document.description}</p>
          <p><strong>Due Date:</strong> {new Date(document.dueDate).toLocaleDateString()}</p>
          <p><strong>Created By:</strong> {document.created_by?.name || "Unknown"}</p>
          <p><strong>Created At:</strong> {new Date(document.createdAt).toLocaleString()}</p>

          {document.file_path && (
            <div className="mt-4">
              <a
                href={document.file_path}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDocumentViewer;
