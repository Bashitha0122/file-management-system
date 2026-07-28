import { useState } from 'react';
import { UserPlus, X } from 'lucide-react';

const AddUserModal = ({ onClose, onSave }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('IT');
  const [role, setRole] = useState('Admin');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    onSave({ fullName, email, department, role, password });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Add New User</h3>
              <p className="text-sm text-slate-500">Create a new system account and assign the correct role.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 rounded-full p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Full Name</span>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="e.g., Aisha Rajapakse"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="email@sliate.lk"
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

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Role</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option>Admin</option>
                <option>Officer</option>
                <option>Manager</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Initial Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Create a temporary password"
            />
          </label>
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
            onClick={handleSave}
            disabled={!fullName || !email || !password}
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            Save User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
