import { useState } from "react";

const AddDocumentForm = () => {
  const [formData, setFormData] = useState({
    documentName: "",
    effectiveDate: "",
    expirationDate: "",
    isActive: false,
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Document Data:", formData);
    // 🔐 Add backend integration here
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add Document</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Document Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Document Name</label>
          <input
            type="text"
            name="documentName"
            value={formData.documentName}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter document title"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Select File</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full mt-1 border px-2 py-2 rounded-md bg-gray-50"
            required
          />
        </div>

        {/* Effective Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Effective From</label>
          <input
            type="date"
            name="effectiveDate"
            value={formData.effectiveDate}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-md"
            required
          />
        </div>

        {/* Expiration Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-md"
          />
        </div>

        {/* Is Active Checkbox */}
        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label className="text-sm font-medium text-gray-700">Is Active?</label>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full mt-1 border px-4 py-2 rounded-md"
            placeholder="Write a short description..."
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setFormData({
              documentName: "",
              effectiveDate: "",
              expirationDate: "",
              isActive: false,
              description: "",
              file: null,
            })}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDocumentForm;
