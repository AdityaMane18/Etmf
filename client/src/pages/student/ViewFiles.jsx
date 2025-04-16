import React, { useState } from 'react';
import { FaSearch, FaFileAlt } from 'react-icons/fa';

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

    const handleStatusChange = (id, newStatus) => {
        const updatedFiles = files.map(file =>
            file.id === id ? { ...file, status: newStatus } : file
        );
        setFiles(updatedFiles);
    };

    // Filter logic: search + status filter
    const filteredFiles = files.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'All' || file.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Assigned Files</h1>

            <div className="mb-4 flex justify-between items-center">

                {/* 🔍 Search Bar (centered looking, but actually flexible) */}
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

                {/* Status Filter Dropdown fixed to right side */}
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


            {/* File List */}
            <div className="space-y-4">
                {filteredFiles.length > 0 ? (
                    filteredFiles.map(file => (
                        <div
                            key={file.id}
                            className="flex justify-between items-center p-4 border rounded shadow-sm 
                   hover:bg-gray-200 hover:shadow-md transition duration-200 cursor-pointer"
                        >
                            {/* File Info: Icon + Name + Details */}
                            <div className="flex items-center gap-4">
                                <div className="text-blue-600 text-3xl">
                                    <FaFileAlt />
                                </div>
                                <div>
                                    <p className="font-semibold">{file.name}</p>
                                    <p className="text-sm text-gray-500">Added by {file.addedBy} on {file.date}</p>
                                </div>
                            </div>

                            {/* Status Dropdown for Each File */}
                            <select
                                value={file.status}
                                onChange={(e) => handleStatusChange(file.id, e.target.value)}
                                className="border rounded px-3 py-1"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No files found.</p>
                )}
            </div>

        </div>
    );
}


export default StudentFileView;
