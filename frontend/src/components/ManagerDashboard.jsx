import { useMemo } from 'react';
import { FileText, CheckCircle, Clock } from 'lucide-react';

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

const pendingSample = [
  { id: 'p1', name: 'Course_Schedule.xlsx', uploader: 'Kamal Silva', dept: 'Management', date: '2026-07-22' },
  { id: 'p2', name: 'Project_Proposal.docx', uploader: 'M. Fernando', dept: 'Examination', date: '2026-07-24' },
  { id: 'p3', name: 'Assignment_3.zip', uploader: 'Dilani Kularathne', dept: 'IT', date: '2026-07-26' },
];

export default function ManagerDashboard() {
  const pending = useMemo(() => pendingSample, []);
  const approvedToday = 5;
  const totalDeptFiles = 342;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manager Review Portal</h2>
          <p className="text-slate-500 mt-1">Review and approve department submissions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Pending Reviews" value={pending.length} icon={Clock} />
        <StatCard title="Approved Today" value={approvedToday} icon={CheckCircle} />
        <StatCard title="Total Department Files" value={totalDeptFiles} icon={FileText} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Pending File Approvals</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-xs text-slate-500 uppercase">
                <th className="px-3 py-2">File Name</th>
                <th className="px-3 py-2">Uploaded By</th>
                <th className="px-3 py-2">Department</th>
                <th className="px-3 py-2">Submission Date</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {pending.map((p, i) => (
                <tr key={p.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <td className="px-3 py-3 font-medium text-slate-800">{p.name}</td>
                  <td className="px-3 py-3 text-slate-600">{p.uploader}</td>
                  <td className="px-3 py-3 text-slate-600">{p.dept}</td>
                  <td className="px-3 py-3 text-slate-600">{p.date}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Approved ${p.name} (simulated)`)}
                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-emerald-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => alert(`Rejected ${p.name} (simulated)`)}
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-700"
                      >
                        Reject
                      </button>
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
