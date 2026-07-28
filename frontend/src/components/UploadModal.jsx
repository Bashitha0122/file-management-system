import { useState } from 'react';
import { UploadCloud, X, Folder } from 'lucide-react';

const UploadModal = ({ onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('IT');
  const [category, setCategory] = useState('Reports');

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0] || null;
    setFile(selected);
    if (selected && !title) {
      setTitle(selected.name);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const dropped = event.dataTransfer.files?.[0] || null;
    if (dropped) {
      setFile(dropped);
      if (!title) setTitle(dropped.name);
    }
  };

  const handleUpload = () => {
    onUpload({ file, title, department, category });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Upload Document</h3>
              <p className="text-sm text-slate-500">Drop a file or select one to upload to the repository.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 rounded-full p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div
            className="border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center cursor-pointer hover:border-blue-500 transition"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <label className="flex flex-col items-center justify-center gap-3 text-slate-500">
              <Folder className="w-10 h-10" />
              <span className="text-sm font-semibold">Drag & drop your file here</span>
              <span className="text-xs">or click to browse from your computer</span>
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
            {file ? <p className="mt-4 text-sm text-slate-600">Selected file: {file.name}</p> : null}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">File Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter title"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Department</span>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option>IT</option>
                <option>Management</option>
                <option>Examination</option>
                <option>Administration</option>
              </select>
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option>Reports</option>
                <option>Schedules</option>
                <option>Proposals</option>
                <option>Resources</option>
                <option>Finance</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || !title}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <UploadCloud className="w-4 h-4" />
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
