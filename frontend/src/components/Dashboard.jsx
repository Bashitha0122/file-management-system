import { UploadCloud, UserPlus, FileText, Users, Database } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, className }) => (
  <div className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase">{title}</p>
        <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
      </div>
      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

const filesMock = [
  { name: 'Semester_Report.pdf', category: 'Reports', uploader: 'A. Perera', date: '2026-07-20', status: 'Approved' },
  { name: 'Course_Schedule.xlsx', category: 'Schedules', uploader: 'K. Silva', date: '2026-07-22', status: 'Pending' },
  { name: 'Project_Proposal.docx', category: 'Proposals', uploader: 'M. Fernando', date: '2026-07-24', status: 'Rejected' },
  { name: 'Student_List.csv', category: 'Data', uploader: 'S. Jayasuriya', date: '2026-07-25', status: 'Approved' },
];

const StatusBadge = ({ status }) => {
  const base = 'inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full';
  if (status === 'Approved') return <span className={`${base} bg-emerald-100 text-emerald-700`}>{status}</span>;
  if (status === 'Pending') return <span className={`${base} bg-amber-100 text-amber-700`}>{status}</span>;
  if (status === 'Rejected') return <span className={`${base} bg-red-100 text-red-700`}>{status}</span>;
  return <span className={`${base} bg-slate-100 text-slate-700`}>{status}</span>;
};

const Dashboard = ({ onOpenUpload, onOpenAddUser, userRole }) => {
  const totalFiles = 1284;
  const pendingApprovals = 12;
  const activeUsers = 47;
  const storageUsedPercent = 63; // percentage

  // Role-specific dashboards
  if (userRole === 'Manager') {
    const pending = filesMock.filter((f) => f.status === 'Pending');

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Manager Dashboard</h2>
            <p className="text-slate-500 mt-1">Review pending approvals and department activity.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Pending Approvals" value={pending.length} icon={UploadCloud} />
          <StatCard title="Total Files" value={totalFiles} icon={FileText} />
          <StatCard title="Storage Used (%)" value={`${storageUsedPercent}%`} icon={Database} />
          <StatCard title="Active Users" value={activeUsers} icon={Users} />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Pending Approvals</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-xs text-slate-500 uppercase">
                  <th className="px-3 py-2">File</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Uploader</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {pending.map((f, idx) => (
                  <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                    <td className="px-3 py-3 font-medium text-slate-800">{f.name}</td>
                    <td className="px-3 py-3 text-slate-600">{f.category}</td>
                    <td className="px-3 py-3 text-slate-600">{f.uploader}</td>
                    <td className="px-3 py-3 text-slate-600">{f.date}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(`Approved ${f.name} (simulated)`)}
                          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => alert(`Rejected ${f.name} (simulated)`)}
                          className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pending.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-3 py-6 text-center text-slate-500">No pending approvals.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (userRole === 'Officer') {
    const uploadedCount = filesMock.length;
    const pendingCount = filesMock.filter((f) => f.status === 'Pending').length;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Officer Workspace</h2>
            <p className="text-slate-500 mt-1">Your recent uploads and status tracker.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenUpload}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
            >
              <UploadCloud className="w-4 h-4" />
              Upload New Document
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard title="Uploaded Files" value={uploadedCount} icon={FileText} />
          <StatCard title="Pending" value={pendingCount} icon={UploadCloud} />
          <StatCard title="Storage Used (%)" value={`${storageUsedPercent}%`} icon={Database} />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Recent Uploads</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-xs text-slate-500 uppercase">
                  <th className="px-3 py-2">File Name</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {filesMock.map((f, idx) => (
                  <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                    <td className="px-3 py-3 font-medium text-slate-800">{f.name}</td>
                    <td className="px-3 py-3 text-slate-600">{f.category}</td>
                    <td className="px-3 py-3 text-slate-600">{f.date}</td>
                    <td className="px-3 py-3"><StatusBadge status={f.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Default / Admin view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
          <p className="text-slate-500 mt-1">Overview of system statistics and recent activity.</p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <UploadCloud className="w-4 h-4" />
            Upload File
          </button>

          <button
            onClick={onOpenAddUser}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Files" value={totalFiles} icon={FileText} />
        <StatCard title="Pending Approvals" value={pendingApprovals} icon={UploadCloud} />
        <StatCard title="Active Users" value={activeUsers} icon={Users} />
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase">Storage Used</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-bold text-slate-800">{storageUsedPercent}%</p>
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <Database className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="h-2 rounded-full bg-blue-600" style={{ width: `${storageUsedPercent}%` }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">63 GB of 100 GB used</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Recent File Activity</h3>
          <p className="text-sm text-slate-500">Showing latest uploads and approval status</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-xs text-slate-500 uppercase">
                <th className="px-3 py-2">File Name</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Uploader</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {filesMock.map((f, idx) => (
                <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <td className="px-3 py-3 font-medium text-slate-800">{f.name}</td>
                  <td className="px-3 py-3 text-slate-600">{f.category}</td>
                  <td className="px-3 py-3 text-slate-600">{f.uploader}</td>
                  <td className="px-3 py-3 text-slate-600">{f.date}</td>
                  <td className="px-3 py-3">
                    <StatusBadge status={f.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
