import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AddDocument = () => {
  const [formData, setFormData] = useState({
    documentName: "",
    description: "",
    file: null,
    effectiveDate: "",
    expirationDate: "",
    isActive: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., send to backend)
    console.log("Submitted Document:", formData);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h2 className="py-2 px-2 text-2xl font-bold text-blue-800 mb-6 bg-blue-200">Add Document</h2>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md">
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

              {/* Expiration Date */}
              <div>
                <label className="block font-medium text-sm text-gray-700">Expiration Date</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>

            </div>
          </div>

          {/* Centered Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => console.log("Save & Close clicked")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save & Close
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddDocument;