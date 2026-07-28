import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OfficerDashboard from './components/OfficerDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import PendingApprovals from './components/PendingApprovals';
import MyUploads from './components/MyUploads';
import FileRepository from './components/FileRepository';
import UserManagement from './components/UserManagement';
import AuditLogs from './components/AuditLogs';
import Settings from './components/Settings';
import Login from './components/Login';
import UploadModal from './components/UploadModal';
import AddUserModal from './components/AddUserModal';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const handleLogin = (role) => {
    setCurrentUserRole(role);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUserRole('');
    setActiveTab('dashboard');
    setShowUploadModal(false);
    setShowAddUserModal(false);
  };

  const handleUploadClick = () => setShowUploadModal(true);
  const handleAddUserClick = () => setShowAddUserModal(true);

  const handleUploadSubmit = (payload) => {
    console.log('Upload payload:', payload);
    setShowUploadModal(false);
    alert('Document upload simulated successfully');
  };

  const handleAddUserSave = (payload) => {
    console.log('Add user payload:', payload);
    setShowAddUserModal(false);
    alert('New user saved successfully (simulated)');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* 256px Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} userRole={currentUserRole} />

      {/* Main Workspace View */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Logged in as <span className="font-semibold text-slate-800">{currentUserRole}</span>
              </p>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <>
              {currentUserRole === 'Admin' && (
                <Dashboard onOpenUpload={handleUploadClick} onOpenAddUser={handleAddUserClick} />
              )}

              {currentUserRole === 'Officer' && (
                <OfficerDashboard onOpenUpload={handleUploadClick} />
              )}

              {currentUserRole === 'Manager' && (
                <ManagerDashboard />
              )}
            </>
          )}

          {activeTab === 'pending' && <PendingApprovals />}
          {activeTab === 'my_uploads' && <MyUploads />}

          {activeTab === 'files' && <FileRepository onOpenUpload={handleUploadClick} />}

          {activeTab === 'users' && <UserManagement onOpenAddUser={handleAddUserClick} />}

          {activeTab === 'audit' && <AuditLogs />}

          {activeTab === 'settings' && <Settings />}
        </div>
      </main>

      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} onUpload={handleUploadSubmit} />
      )}

      {showAddUserModal && (
        <AddUserModal onClose={() => setShowAddUserModal(false)} onSave={handleAddUserSave} />
      )}
    </div>
  );
}

export default App;