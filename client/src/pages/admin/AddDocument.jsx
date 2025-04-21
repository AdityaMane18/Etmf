import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
const AddDocument = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    documentName: "",
    description: "",
    file: null,
    effectiveDate: "",
    dueDate: "",
    isActive: true,
  });


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitDocument = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login required");
   // ✅ Client-side validation
   if (!formData.documentName || !formData.file || !formData.dueDate) {
    toast.error("Please fill all required fields");
    return; // ❌ Do NOT proceed or set loading
  }
  const today = new Date();
const effectiveDate = new Date(formData.effectiveDate);
const dueDate = new Date(formData.dueDate);

if (dueDate < today.setHours(0, 0, 0, 0)) {
  toast.error("Due date cannot be in the past");
  return;
}

if (dueDate < effectiveDate) {
  toast.error("Due date cannot be before the effective date");
  return;
}
    try {
      setLoading(true);  // Start Spin
      const form = new FormData();
      form.append("file", formData.file);
      form.append("name", formData.documentName);
      form.append("description", formData.description);
      form.append("effectiveDate", formData.effectiveDate);
      form.append("dueDate", formData.dueDate);
      form.append("isActive", formData.isActive);
  
      const res = await axios.post("http://localhost:5000/api/documents", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success("Document uploaded successfully!");
      navigate("/admin/sop");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };
  const handleSaveAndClose = async () => {
    const result = await Swal.fire({
      title: "Confirm Submission",
      text: "Are you sure you want to upload this document?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, upload it!",
    });
  
    if (result.isConfirmed) {
      submitDocument(); // Calls actual upload
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h2 className="py-2 px-2 text-2xl font-bold text-blue-800 mb-6 bg-blue-200">Add Document</h2>

        <form className="bg-white rounded-xl p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left Column */}
            <div className="flex flex-col gap-6">
              {/* Document Name */}
              <div>
                <label className="block font-medium text-sm text-gray-700">
                  Document Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="documentName"
                  value={formData.documentName}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Select File */}
              <div>
                <label className="block font-medium text-sm text-gray-700">
                  Select File<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="file"
                  required
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md"
                />
              </div>

              {/* Effective From Date */}
              <div>
                <label className="block font-medium text-sm text-gray-700">Effective From Date</label>
                <input
                  type="date"
                  name="effectiveDate"
                  value={formData.effectiveDate}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600"
                />
                <label className="text-sm font-medium text-gray-700">Is Active?</label>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {/* Document Description */}
              <div>
                <label className="block font-medium text-sm text-gray-700">Document Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                ></textarea>
              </div>
              <div>
            <label className="block font-medium text-sm text-gray-700">Due Date</label>
  <input
    type="date"
    name="dueDate"
    value={formData.dueDate}
    onChange={handleChange}
    className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
  />
</div>


            </div>
          </div>

          {/* Centered Buttons */}
          <div className="mt-8 flex justify-center gap-4">
          <button
  type="button"
  onClick={handleSaveAndClose}
  className={`px-6 py-2 rounded text-white flex items-center justify-center gap-2 
    ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
  disabled={loading}
>
  {loading && (
    <svg
      className="animate-spin h-5 w-5 text-white"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  )}
  {loading ? "Uploading..." : "Save & Close"}
</button>
<button
    type="button"
    onClick={() => navigate("/admin/sop")}
    className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
    disabled={loading}
  >
    Cancel
  </button>

          </div>
        </form>

      </div>
    </div>
  );
};

export default AddDocument;