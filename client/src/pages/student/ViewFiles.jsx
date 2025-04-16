import React, { useState } from 'react';
import { FaSearch, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const initialFiles = [
    { id: 1, name: "abc.pdf", addedBy: "Admin", date: "2025-04-16", status: "Pending" },
    { id: 2, name: "project.docx", addedBy: "Teacher", date: "2025-04-15", status: "In Progress" },
    { id: 3, name: "report.xlsx", addedBy: "Mentor", date: "2025-04-14", status: "Completed" },
    { id: 4, name: "notes.pdf", addedBy: "Admin", date: "2025-04-13", status: "Pending" },
];

const StudentFileView = () => {
    const [files, setFiles] = useState(initialFiles);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const navigate = useNavigate();

    const handleStatusChange = (id, newStatus) => {
        const updatedFiles = files.map(file =>
            file.id === id ? { ...file, status: newStatus } : file
        );
        setFiles(updatedFiles);
    };

    const filteredFiles = files.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'All' || file.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Assigned Files</h1>

            <div className="mb-4 flex justify-between items-center">
                <div className="max-w-md w-full">
                    <div className="flex items-center border rounded px-3 py-2 bg-white">
                        <FaSearch className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full outline-none text-sm"
                        />
                    </div>
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded px-5 py-1 ml-4"
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className="space-y-4">
                {filteredFiles.length > 0 ? (
                    filteredFiles.map(file => (
                        <div key={file.id} className="relative flex justify-between items-center border rounded shadow-sm transition duration-200">

                            {/* Left side: Hoverable section (file name, info) */}
                            <div
                                onClick={() => navigate(`/student/documentview/${file.id}`)}
                                className="flex items-center gap-4 p-4 hover:bg-blue-100 hover:shadow-md rounded transition duration-200 cursor-pointer w-full"
                            >
                                <div className="text-blue-600 text-3xl">
                                    <FaFileAlt />
                                </div>
                                <div>
                                    <p className="font-semibold text-blue-800 hover:text-blue-500">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Added by {file.addedBy} on {file.date}
                                    </p>
                                </div>
                            </div>

                            {/* Right side: Dropdown (no background hover, overlay) */}
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4">
                                <select
                                    value={file.status}
                                    onChange={(e) => handleStatusChange(file.id, e.target.value)}
                                    className="border rounded px-3 py-1 bg-white"
                                    onClick={(e) => e.stopPropagation()} // prevents triggering parent hover
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No files found.</p>
                )}
            </div>


        </div>
    );
};

export default StudentFileView;
