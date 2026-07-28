import { useMemo, useState } from 'react';
import { Eye, CheckCircle, XCircle, FileText, ChevronDown, Search } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const base = 'inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full';
  if (status === 'Pending') return <span className={`${base} bg-amber-100 text-amber-700`}>{status}</span>;
  if (status === 'Approved') return <span className={`${base} bg-emerald-100 text-emerald-700`}>{status}</span>;
  return <span className={`${base} bg-red-100 text-red-700`}>{status}</span>;
};

const samplePending = [
  { id: 'p1', name: 'Course_Schedule.xlsx', uploader: 'Kamal Silva', department: 'Management', date: '2026-07-22', size: '320 KB', status: 'Pending' },
  { id: 'p2', name: 'Project_Proposal.docx', uploader: 'M. Fernando', department: 'Examination', date: '2026-07-24', size: '540 KB', status: 'Pending' },
  { id: 'p3', name: 'Assignment_3.zip', uploader: 'Dilani Kularathne', department: 'IT', date: '2026-07-26', size: '12.4 MB', status: 'Pending' },
  { id: 'p4', name: 'Budget_2026.pdf', uploader: 'Nimal Perera', department: 'Management', date: '2026-07-20', size: '2.1 MB', status: 'Pending' },
  { id: 'p5', name: 'Exam_Results.csv', uploader: 'S. Jayasuriya', department: 'Examination', date: '2026-07-25', size: '110 KB', status: 'Pending' },
  { id: 'p6', name: 'Lecture_Notes.zip', uploader: 'M. Fernando', department: 'IT', date: '2026-07-27', size: '8.2 MB', status: 'Pending' },
];

export default function PendingApprovals() {
  const [query, setQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return samplePending.filter((r) => {
      const matchesQuery = q ? (r.name.toLowerCase().includes(q) || r.uploader.toLowerCase().includes(q)) : true;
      const matchesDept = deptFilter === 'All Departments' ? true : r.department === deptFilter;
      return matchesQuery && matchesDept;
    });
  }, [query, deptFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Pending Approvals</h2>
          <p className="text-slate-500 mt-1">Review files submitted by officers and approve or reject them.</p>
        </div>
        <div>
          <button
            onClick={() => alert('Exporting pending approvals (simulated)')}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Export
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by file name or officer"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="relative">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none"
            >
              <option>All Departments</option>
              <option>IT</option>
              <option>Management</option>
              <option>Examination</option>
              <option>Administration</option>
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-xs text-slate-500 uppercase">
              <th className="px-3 py-2">File</th>
              <th className="px-3 py-2">Uploaded By</th>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2">Upload Date</th>
              <th className="px-3 py-2">Size</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {filtered.map((r, i) => (
              <tr key={r.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <td className="px-3 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{r.name}</div>
                    <div className="mt-1"> <StatusBadge status={r.status} /> </div>
                  </div>
                </td>

                <td className="px-3 py-3 text-slate-600">{r.uploader}</td>
                <td className="px-3 py-3 text-slate-600">{r.department}</td>
                <td className="px-3 py-3 text-slate-600">{r.date}</td>
                <td className="px-3 py-3 text-slate-600">{r.size}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => alert(`Preview ${r.name} (simulated)`)} className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>

                    <button onClick={() => alert(`Approved ${r.name} (simulated)`)} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-emerald-700">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>

                    <button onClick={() => alert(`Rejected ${r.name} (simulated)`)} className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-700">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="px-3 py-6 text-center text-slate-500">No pending files found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
