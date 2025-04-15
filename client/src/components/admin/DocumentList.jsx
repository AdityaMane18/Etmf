import { FaFolder } from "react-icons/fa";

const DocumentList = () => {
  const documents = [
    {
      title: "Comprehensive Study Protocol for Clinical Trial: Phase III Oncology Research",
      createdOn: "2025-01-28, 10:30 AM",
      createdBy: "Dr. Anil Mehta",
    },
    {
      title: "Investigator Brochure Detailing Drug Safety and Efficacy for Trial Medication XYZ-2025",
      createdOn: "2025-01-27, 3:45 PM",
      createdBy: "Ms. Priya Sharma",
    },
    {
      title: "Participant Informed Consent Form for Multicenter Diabetes Management Study",
      createdOn: "2025-01-26, 9:00 AM",
      createdBy: "Mr. Ravi Kumar",
    },
    {
      title: "Detailed Site Monitoring Report for Clinical Site #125 – Interim Analysis",
      createdOn: "2025-01-25, 11:15 AM",
      createdBy: "Dr. Sneha Patel",
    },
    {
      title: "Final Study Closure Checklist and Regulatory Compliance Summary for Trial ABC-2025",
      createdOn: "2025-01-24, 4:30 PM",
      createdBy: "Ms. Aditi Singh",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Documents</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition"
          >
            {/* Folder Icon */}
            <div className="text-blue-500 mt-1">
              <FaFolder size={32} />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <p className="font-medium text-gray-800">{doc.title}</p>
              <p className="text-sm text-gray-600 mt-1">
                Created On: {doc.createdOn}
                <br />
                Created By: {doc.createdBy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
