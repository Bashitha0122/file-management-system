import { useState, useMemo } from 'react';
import { Eye, Trash2, FileText } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const base = 'px-2 py-1 rounded-full text-xs font-medium inline-block';
  switch (status) {
    case 'Approved':
      return <span className={`${base} bg-green-100 text-green-800`}>Approved</span>;
    case 'Pending':
      return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
    case 'Rejected':
      return <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>;
    default:
      return <span className={`${base} bg-slate-100 text-slate-800`}>{status}</span>;
  }
};

const MyUploads = () => {
  // Mock data for the officer's uploads
  const initialFiles = [
    {
      id: 'f1',
      name: 'Semester_Report.pdf',
      type: 'pdf',
      category: 'Academic',
      uploadedAt: '2026-07-20 10:24',
      size: '1.2 MB',
      status: 'Approved',
    },
    {
      id: 'f2',
      name: 'Course_List.xlsx',
      type: 'xlsx',
      category: 'Administration',
      uploadedAt: '2026-07-18 09:02',
      size: '320 KB',
      status: 'Pending',
    },
    {
      id: 'f3',
      name: 'Officer_Notes.docx',
      type: 'docx',
      category: 'Reports',
      uploadedAt: '2026-07-15 14:12',
      size: '540 KB',
      status: 'Rejected',
    },
    {
      id: 'f4',
      name: 'Budget_Overview.pdf',
      type: 'pdf',
      category: 'Finance',
      uploadedAt: '2026-07-10 11:45',
      size: '2.9 MB',
      status: 'Approved',
    },
    {
      id: 'f5',
      name: 'Meeting_Minutes.docx',
      type: 'docx',
      category: 'Administration',
      uploadedAt: '2026-07-08 16:30',
      size: '220 KB',
      status: 'Pending',
    },
  ];

  const [files, setFiles] = useState(initialFiles);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = useMemo(() => {
    return files.filter((f) => {
      const matchesQuery = f.name.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [files, query, statusFilter]);

  const handlePreview = (file) => {
    // UI stub for preview
    alert(`Preview (UI stub): ${file.name}`);
  };

  const handleDelete = (file) => {
    if (!confirm(`Delete "${file.name}"? This action cannot be undone.`)) return;
    setFiles((prev) => prev.filter((p) => p.id !== file.id));
  };

  const FileIcon = () => {
    // Render a simple file icon; can be extended to show different icons per type
    return (
      <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-md">
        <FileText className="w-4 h-4 text-slate-700" />
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Uploads</h1>
          <p className="text-slate-500 mt-2">Files you've uploaded recently</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files by name"
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-xs text-slate-500 border-b">
              <th className="py-3">File Name</th>
              <th className="py-3">Category</th>
              <th className="py-3">Upload Date</th>
              <th className="py-3">File Size</th>
              <th className="py-3">Status</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((f) => (
              <tr key={f.id} className="border-b last:border-b-0 hover:bg-slate-50">
                <td className="py-3 align-middle">
                  <div className="flex items-center gap-3">
                    <FileIcon type={f.type} />
                    <div>
                      <div className="font-medium text-slate-800">{f.name}</div>
                      <div className="text-xs text-slate-500">{f.type.toUpperCase()}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3 align-middle">{f.category}</td>
                <td className="py-3 align-middle">{f.uploadedAt}</td>
                <td className="py-3 align-middle">{f.size}</td>

                <td className="py-3 align-middle">
                  <StatusBadge status={f.status} />
                </td>

                <td className="py-3 align-middle">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePreview(f)}
                      className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm"
                    >
                      <Eye className="w-4 h-4" /> Preview
                    </button>

                    <button
                      onClick={() => handleDelete(f)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm ${
                        f.status === 'Approved' ? 'bg-slate-100 text-slate-700 cursor-not-allowed opacity-60' : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                      disabled={f.status === 'Approved'}
                      title={f.status === 'Approved' ? 'Cannot delete approved file' : 'Delete file'}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No uploaded files found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyUploads;
