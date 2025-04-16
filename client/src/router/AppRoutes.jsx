import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminLogin from '../pages/admin/Login';
import AdminDashboard from '../pages/admin/Dashboard';
import SOPSection from "../pages/admin/SopSection";
import AddDocument from "../pages/admin/AddDocument";
import StudentList from "../pages/admin/StudentList";
import Report from "../pages/admin/Report";

import StudentLogin from '../pages/student/StudentLogin';
import StudentDashboard from '../pages/student/Dashboard';
import StudentReport from '../pages/student/StudentReport';
import StudentSop from '../pages/student/SopSection';
import StudentFileView from '../pages/student/ViewFiles';
import DocumentViewer from '../pages/student/DocumentViewer';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/sop" element={<SOPSection />} />
      <Route path="/admin/upload-document" element={<AddDocument />} />
      <Route path="/admin/student-list" element={<StudentList />} />
      <Route path="/admin/report" element={<Report />} />
      {/* Student Routes */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/report" element={<StudentReport />} />
      <Route path="/student/sop" element={<StudentSop />} />
      <Route path="/student/viewfiles" element={<StudentFileView />} />
      <Route path="/student/documentview/:id" element={<DocumentViewer/>} />
    </Routes>
  );
};

export default AppRoutes;

