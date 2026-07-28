import { useMemo, useState } from 'react';
import { Plus, Search, Edit, Trash2, ChevronDown } from 'lucide-react';

const RoleBadge = ({ role }) => {
  const base = 'inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full';
  if (role === 'Admin') return <span className={`${base} bg-red-100 text-red-700`}>Admin</span>;
  if (role === 'Officer') return <span className={`${base} bg-amber-100 text-amber-700`}>Officer</span>;
  return <span className={`${base} bg-emerald-100 text-emerald-700`}>Manager</span>;
};

const StatusBadge = ({ active }) => {
  const base = 'inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full';
  return active ? (
    <span className={`${base} bg-emerald-100 text-emerald-700`}>Active</span>
  ) : (
    <span className={`${base} bg-slate-100 text-slate-700`}>Inactive</span>
  );
};

const avatarInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const sampleUsers = [
  {
    id: 'u1',
    name: 'Nimal Perera',
    email: 'n.perera@sliate.lk',
    department: 'IT',
    role: 'Admin',
    active: true,
  },
  {
    id: 'u2',
    name: 'Kamal Silva',
    email: 'kamal.silva@sliate.lk',
    department: 'Management',
    role: 'Officer',
    active: true,
  },
  {
    id: 'u3',
    name: 'Sanjaya Fernando',
    email: 'sanjaya.fernando@sliate.lk',
    department: 'Examination',
    role: 'Officer',
    active: false,
  },
  {
    id: 'u4',
    name: 'Methsara Jayawardena',
    email: 'methsara.j@sliate.lk',
    department: 'Administration',
    role: 'Manager',
    active: true,
  },
  {
    id: 'u5',
    name: 'Dilani Kularathne',
    email: 'dilani.k@sliate.lk',
    department: 'IT',
    role: 'Manager',
    active: false,
  },
];

const UserManagement = ({ onOpenAddUser }) => {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleUsers.filter((u) => {
      const matchesQuery = q
        ? u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
        : true;
      const matchesRole = roleFilter === 'All' ? true : u.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [query, roleFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500 mt-1">Manage system users, roles and account status.</p>
        </div>

        <div>
          <button
            onClick={onOpenAddUser}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add User
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
              placeholder="Search by name or email"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none"
            >
              <option>All</option>
              <option>Admin</option>
              <option>Officer</option>
              <option>Manager</option>
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-500">Showing <span className="font-semibold text-slate-700">{filtered.length}</span> users</div>
        </div>
      </div>

      {/* Data table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-xs text-slate-500 uppercase">
              <th className="px-3 py-2">User</th>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {filtered.map((u, idx) => (
              <tr key={u.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <td className="px-3 py-3 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold`}>{avatarInitials(u.name)}</div>
                  <div>
                    <div className="font-medium text-slate-800">{u.name}</div>
                    <div className="text-xs text-slate-500">{u.email}</div>
                  </div>
                </td>

                <td className="px-3 py-3 text-slate-600">{u.department}</td>

                <td className="px-3 py-3"> <RoleBadge role={u.role} /> </td>

                <td className="px-3 py-3"> <StatusBadge active={u.active} /> </td>

                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>

                    <button className="p-2 rounded-lg text-red-600 hover:bg-red-50" title="Delete user">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="px-3 py-6 text-center text-slate-500">No users found matching the criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
