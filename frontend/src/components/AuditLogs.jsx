import { useMemo, useState } from 'react';
import { Search, Download, ChevronDown } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const base = 'inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full';
  if (status === 'Success') return <span className={`${base} bg-emerald-100 text-emerald-700`}>Success</span>;
  if (status === 'Failed') return <span className={`${base} bg-red-100 text-red-700`}>Failed</span>;
  return <span className={`${base} bg-slate-100 text-slate-700`}>{status}</span>;
};

const sampleLogs = [
  {
    id: 'l1',
    timestamp: '2026-07-28 10:42:13',
    user: 'Nimal Perera',
    role: 'Admin',
    actionType: 'File Upload',
    action: 'Uploaded File',
    target: 'Semester_Report.pdf',
    ip: '192.168.1.34',
    status: 'Success',
  },
  {
    id: 'l2',
    timestamp: '2026-07-28 09:58:04',
    user: 'Kamal Silva',
    role: 'Officer',
    actionType: 'Login',
    action: 'Logged In',
    target: '-',
    ip: '203.94.76.21',
    status: 'Success',
  },
  {
    id: 'l3',
    timestamp: '2026-07-27 16:22:11',
    user: 'Sanjaya Fernando',
    role: 'Officer',
    actionType: 'User Update',
    action: 'Updated User Profile',
    target: 'User #104 (Methsara J.)',
    ip: '10.0.0.8',
    status: 'Success',
  },  {
    id: 'l4',
    timestamp: '2026-07-27 14:10:57',
    user: 'Unknown',
    role: '–',
    actionType: 'File Delete',
    action: 'Deleted File',
    target: 'Old_Syllabus.docx',
    ip: '58.27.193.45',
    status: 'Failed',
  },
  {
    id: 'l5',
    timestamp: '2026-07-26 11:03:02',
    user: 'Dilani Kularathne',
    role: 'Manager',
    actionType: 'File Upload',
    action: 'Uploaded File',
    target: 'Assignment_3.zip',
    ip: '172.16.4.12',
    status: 'Success',
  },
  {
    id: 'l6',
    timestamp: '2026-07-25 08:45:20',
    user: 'System',
    role: 'System',
    actionType: 'User Update',
    action: 'Password Reset (Admin)',
    target: 'User #022 (Kamal S.)',
    ip: '127.0.0.1',
    status: 'Success',
  },
];

const AuditLogs = () => {
  const [query, setQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleLogs.filter((l) => {
      const matchesQuery = q
        ? l.user.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.target.toLowerCase().includes(q)
        : true;
      const matchesAction = actionFilter === 'All' ? true : l.actionType === actionFilter;
      return matchesQuery && matchesAction;
    });
  }, [query, actionFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Audit Logs</h2>
          <p className="text-slate-500 mt-1">Track recent system activity and security events.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-2/3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by user, action or target"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="relative">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none"
            >
              <option>All</option>
              <option>File Upload</option>
              <option>File Delete</option>
              <option>Login</option>
              <option>User Update</option>
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500">Showing <span className="font-semibold text-slate-700">{filtered.length}</span> records</div>
        </div>
      </div>

      {/* Logs table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-xs text-slate-500 uppercase">
              <th className="px-3 py-2">Timestamp</th>
              <th className="px-3 py-2">Performed By</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Target</th>
              <th className="px-3 py-2">IP Address</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {filtered.map((l, idx) => (
              <tr key={l.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <td className="px-3 py-3 text-slate-600">{l.timestamp}</td>
                <td className="px-3 py-3">
                  <div className="font-medium text-slate-800">{l.user}</div>
                  <div className="text-xs text-slate-500">{l.role}</div>
                </td>
                <td className="px-3 py-3 text-slate-600">{l.action}</td>
                <td className="px-3 py-3 text-slate-600">{l.target}</td>
                <td className="px-3 py-3 text-slate-600">{l.ip}</td>
                <td className="px-3 py-3"><StatusBadge status={l.status} /></td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="px-3 py-6 text-center text-slate-500">No log entries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
