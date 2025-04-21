import { FaTasks, FaFileAlt, FaUsers, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi"
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import React from "react";
import Swal from "sweetalert2";
const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from the admin panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb", // Blue
      cancelButtonColor: "#d33",     // Red
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire("Logged out!", "You have been logged out successfully.", "success");
        navigate("/admin/login");
      }
    });
  };
  
  
  
  return (
    <div className="w-full lg:w-64 bg-white shadow-md min-h-screen p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center mb-10">
          <img
            src="https://i.pravatar.cc/100?img=1"
            alt="User"
            className="w-24 h-24 rounded-full border"
          />
          <h2 className="text-lg font-semibold mt-4 border-black pb-2">User Name</h2>
          <hr className="border-black mt-2" />
        </div>

        <nav className="space-y-4">
          <a
            href="/admin/dashboard"
            className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium"
          >
            <FaTasks className="mr-2" /> My Tasks
          </a>
          <Link
            to="/admin/sop"
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
          >
            <HiOutlineDocumentText /> SOP Section
          </Link>
          <a
            href="/admin/student-list"
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            <FaUsers className="mr-2" /> Students List
          </a>
          <a
            href="/admin/report"
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            <FaClipboardList className="mr-2" /> Report
          </a>
        </nav>
      </div>

      {/* 🔓 Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center mt-10 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
      >
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
