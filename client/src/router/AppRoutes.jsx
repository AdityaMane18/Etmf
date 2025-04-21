import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute'; // Assuming you have a PrivateRoute component for protected routes
import AdminLogin from '../pages/admin/Login';
import AdminDashboard from '../pages/admin/Dashboard';

import AdminDocumentViewer from '../pages/admin/AdminDocumentViewer';
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
<Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={["admin"]}><AdminDashboard /></PrivateRoute>} />
<Route path="/admin/document/:id" element={<PrivateRoute allowedRoles={["admin"]}><AdminDocumentViewer /></PrivateRoute>} />
<Route path="/admin/sop" element={<PrivateRoute allowedRoles={["admin"]}><SOPSection /></PrivateRoute>} />
<Route path="/admin/upload-document" element={<PrivateRoute allowedRoles={["admin"]}><AddDocument /></PrivateRoute>} />
<Route path="/admin/student-list" element={<PrivateRoute allowedRoles={["admin"]}><StudentList /></PrivateRoute>} />
<Route path="/admin/report" element={<PrivateRoute allowedRoles={["admin"]}><Report /></PrivateRoute>} />

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

