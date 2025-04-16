
import StatCards from "../../components/admin/StatCards";
import DocumentList from "../../components/admin/DocumentList";
import StudentSidebar from "../../components/student/StudentSidebar";

const StudentDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
     <div className="w-64 bg-white shadow">
        < StudentSidebar />
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
  
  export default StudentDashboard;
  