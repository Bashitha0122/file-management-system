import { useMemo, useState } from 'react';
import { UploadCloud, Download, Eye, Trash2, Search, ChevronDown, FileText, File } from 'lucide-react';

const sampleDocs = [
  {
    id: 'f1',
    name: 'Semester_Report.pdf',
    type: 'PDF',
    category: 'Reports',
    department: 'IT',
    size: '1.2 MB',
    date: '2026-07-20',
    uploader: 'Nimal Perera',
  },
  {
    id: 'f2',
    name: 'Course_Schedule.xlsx',
    type: 'Excel',
    category: 'Schedules',
    department: 'Management',
    size: '320 KB',
    date: '2026-07-22',
    uploader: 'Kamal Silva',
  },
  {
    id: 'f3',
    name: 'Project_Proposal.docx',
    type: 'Word',
    category: 'Proposals',
    department: 'Examination',
    size: '540 KB',
    date: '2026-07-24',
    uploader: 'M. Fernando',
  },
  {
    id: 'f4',
    name: 'Student_List.csv',
    type: 'Excel',
    category: 'Data',
    department: 'Administration',
    size: '110 KB',
    date: '2026-07-25',
    uploader: 'S. Jayasuriya',
  },
  {
    id: 'f5',
    name: 'Lecture_Notes.zip',
    type: 'Archive',
    category: 'Resources',
    department: 'IT',
    size: '12.4 MB',
    date: '2026-07-18',
    uploader: 'Dilani Kularathne',
  },
  {
    id: 'f6',
    name: 'Financial_Statement.pdf',
    type: 'PDF',
    category: 'Finance',
    department: 'Management',
    size: '2.4 MB',
    date: '2026-07-15',
    uploader: 'Kamal Silva',
  },
  {
    id: 'f7',
    name: 'Archive_2025.tar.gz',
    type: 'Archive',
    category: 'Backup',
    department: 'IT',
    size: '124 MB',
    date: '2026-01-05',
    uploader: 'System',
  },
];

const typeIcon = (type) => {
  if (type === 'PDF') return File;
  if (type === 'Word') return FileText;
  if (type === 'Excel') return File;
  // Use generic file icon for archives
  return File;
};

const FileRepository = ({ onOpenUpload }) => {
  const [query, setQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleDocs.filter((d) => {
      const matchesQuery = q ? d.name.toLowerCase().includes(q) : true;
      const matchesDept = deptFilter === 'All Departments' ? true : d.department === deptFilter;
      const matchesType = typeFilter === 'All Types' ? true : d.type === typeFilter;
      return matchesQuery && matchesDept && matchesType;
    });
  }, [query, deptFilter, typeFilter]);

  const totalStorage = '100 GB';
  const usedStorage = '63 GB';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">File Repository</h2>
          <p className="text-slate-500 mt-1">Central repository for documents and resources.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500 text-right">
            <div className="font-semibold text-slate-800">{usedStorage}</div>
            <div className="text-xs">of {totalStorage} used</div>
          </div>

          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            <UploadCloud className="w-4 h-4" />
            Upload Document
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
              placeholder="Search by file name"
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

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none"
            >
              <option>All Types</option>
              <option>PDF</option>
              <option>Word</option>
              <option>Excel</option>
              <option>Archive</option>
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500">Showing <span className="font-semibold text-slate-700">{filtered.length}</span> files</div>
        </div>
      </div>

      {/* Files table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-xs text-slate-500 uppercase">
              <th className="px-3 py-2">File</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2">Size</th>
              <th className="px-3 py-2">Uploaded</th>
              <th className="px-3 py-2">Uploaded By</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {filtered.map((d, idx) => {
              const Icon = typeIcon(d.type);
              return (
                <tr key={d.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <td className="px-3 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{d.name}</div>
                      <div className="text-xs text-slate-500">{d.type}</div>
                    </div>
                  </td>

                  <td className="px-3 py-3 text-slate-600">{d.category}</td>
                  <td className="px-3 py-3 text-slate-600">{d.department}</td>
                  <td className="px-3 py-3 text-slate-600">{d.size}</td>
                  <td className="px-3 py-3 text-slate-600">{d.date}</td>
                  <td className="px-3 py-3 text-slate-600">{d.uploader}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">
                        <Download className="w-4 h-4" />
                        Download
                      </button>

                      <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>

                      <button className="p-2 rounded-lg text-red-600 hover:bg-red-50" title="Delete file">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="px-3 py-6 text-center text-slate-500">No files match your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileRepository;
