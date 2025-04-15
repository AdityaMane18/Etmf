import AdminSidebar from "../../components/admin/AdminSidebar";
import StatCards from "../../components/admin/StatCards";
import DocumentList from "../../components/admin/DocumentList";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow">
        <AdminSidebar />
      </div>

      {/* Main Content */}

      <div className="flex-1 p-6 space-y-8">
        {/* Stat Cards */}
        

        <StatCards />

        {/* Document List */}
        <DocumentList />
      </div>
    </div>
  );
};

export default AdminDashboard;
