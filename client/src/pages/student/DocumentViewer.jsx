import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DocumentViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const dummyFile = {
        name: "abc.pdf",
        pdfUrl: "/sample.pdf",  // your actual PDF file path here
        comments: [
            { user: "Teacher", text: "Please review section 2 carefully." },
            { user: "Mentor", text: "Looks good, submit it by tomorrow." },
            { user: "Manager", text: "Looks good, submit it by tomorrow." },
            { user: "admin", text: "Looks good, submit it by tomorrow." },
            { user: "admin", text: "Looks good, submit it by tomorrow." },
            { user: "admin", text: "Looks good, submit it by tomorrow." },
            { user: "admin", text: "Looks good, submit it by tomorrow." },
        ],
    };

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 2;  // Hardcoded for now, you can dynamically set this based on your PDF

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="p-6 h-screen flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">File: {dummyFile.name}</h1>
            </div>

            {/* Main Content: PDF + Comments */}
            <div className="flex flex-1 border rounded shadow overflow-hidden">

                {/* PDF Preview - iframe */}
                <div className="w-3/4 bg-gray-200 overflow-hidden relative">
                    <iframe
                        src={dummyFile.pdfUrl}
                        title="PDF Viewer"
                        className="w-full h-[calc(100%-50px)]"
                    />

                    {/* Back Button in Top Right of PDF Section */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-2 right-2 px-10 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Back
                    </button>


                    {/* Previous Button at bottom-left of PDF Section */}
                    <button
                        onClick={handlePreviousPage}
                        className="absolute bottom-2 left-2 px-6 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Previous
                    </button>

                    {/* Next Button below Back button (top-right corner) */}
                    <button
                        onClick={handleNextPage}
                        className="absolute bottom-2 right-2 px-10 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Next
                    </button>

                    {/* Pagination */}
                    <div className="flex justify-center items-center space-x-4 mt-4 absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <span className="text-lg">
                            Page {currentPage} of {totalPages}
                        </span>
                    </div>
                </div>



                {/* Comments Panel */}
                <div className="w-1/4 p-4 bg-white border-l max-h-[80vh] flex flex-col">
                    <h2 className="text-xl font-semibold mb-3">💬 Comments</h2>

                    {/* Comments list: scrollable area */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                        {dummyFile.comments.map((comment, index) => (
                            <div
                                key={index}
                                className="p-3 bg-gray-100 rounded-lg shadow-md border-l-4 border-blue-500 
                   transform transition-all duration-200 ease-in-out 
                   hover:-translate-y-1 hover:shadow-lg hover:bg-blue-50"
                            >
                                <p className="font-semibold">{comment.user}</p>
                                <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Fixed input area at bottom */}
                    <div className="mt-4">
                        <textarea
                            placeholder="Write your comment..."
                            className="w-full border rounded-lg p-2 text-sm shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                            rows="3"
                        />
                        <button
                            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            ➕ Add Comment
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default DocumentViewer;
