import { useMemo } from 'react';
import { UploadCloud, FileText, Clock, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
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

const sampleUploads = [
  { id: 's1', name: 'Semester_Report.pdf', category: 'Reports', date: '2026-07-20', status: 'Approved' },
  { id: 's2', name: 'Course_Schedule.xlsx', category: 'Schedules', date: '2026-07-22', status: 'Pending' },
  { id: 's3', name: 'Project_Proposal.docx', category: 'Proposals', date: '2026-07-24', status: 'Rejected' },
  { id: 's4', name: 'Lecture_Notes.zip', category: 'Resources', date: '2026-07-18', status: 'Approved' },
  { id: 's5', name: 'Assignment_3.zip', category: 'Assignments', date: '2026-07-26', status: 'Pending' },
];

const StatusBadge = ({ status }) => {
  const base = 'inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full';
  if (status === 'Approved') return <span className={`${base} bg-emerald-100 text-emerald-700`}>{status}</span>;
  if (status === 'Pending') return <span className={`${base} bg-amber-100 text-amber-700`}>{status}</span>;
  return <span className={`${base} bg-red-100 text-red-700`}>{status}</span>;
};

export default function OfficerDashboard({ onOpenUpload }) {
  const totalUploads = sampleUploads.length;
  const pendingCount = sampleUploads.filter((s) => s.status === 'Pending').length;
  const approvedCount = sampleUploads.filter((s) => s.status === 'Approved').length;

  const recent = useMemo(() => sampleUploads.slice(0, 5), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Officer Workspace</h2>
          <p className="text-slate-500 mt-1">Your uploads and their review status.</p>
        </div>

        <div>
          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            <UploadCloud className="w-4 h-4" />
            Upload New Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="My Total Uploads" value={totalUploads} icon={FileText} />
        <StatCard title="Pending Approvals" value={pendingCount} icon={Clock} />
        <StatCard title="Approved Files" value={approvedCount} icon={CheckCircle} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">My Recent Submissions</h3>
          <p className="text-sm text-slate-500">Latest files you've uploaded</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-xs text-slate-500 uppercase">
                <th className="px-3 py-2">File Name</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Upload Date</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {recent.map((r, i) => (
                <tr key={r.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <td className="px-3 py-3 font-medium text-slate-800">{r.name}</td>
                  <td className="px-3 py-3 text-slate-600">{r.category}</td>
                  <td className="px-3 py-3 text-slate-600">{r.date}</td>
                  <td className="px-3 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">Preview</button>
                      <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">Download</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
