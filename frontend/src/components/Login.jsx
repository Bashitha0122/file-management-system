import { useState } from 'react';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">SLIATE DFMS</h1>
            <p className="text-sm text-slate-500">Sign in to access the administration portal.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <div className="mt-2 relative">
              <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sliate.lk"
                required
                className="w-full pl-10 pr-3 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Password</span>
            <div className="mt-2 relative">
              <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-3 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            >
              <option>Admin</option>
              <option>Officer</option>
              <option>Manager</option>
            </select>
          </label>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl px-4 py-3 text-sm shadow-sm transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
