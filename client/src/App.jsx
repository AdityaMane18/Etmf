import React from 'react';
import AppRoutes from './router/AppRoutes';
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
    <Toaster position="top-center" />
    <div className="min-h-screen bg-gray-100">
      <AppRoutes />
       {/* Tailwind test */}
    </div>
    </>
  );
};

export default App;
