import { LayoutDashboard, Users, ClipboardList, Settings, LogOut, ShieldCheck, Folder } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, userRole }) => {
  // Build menu items based on user role
  let menuItems;

  if (userRole === 'Admin') {
    menuItems = [
      { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
      { id: 'files', label: 'File Repository', icon: Folder },
      { id: 'users', label: 'User Management', icon: Users },
      { id: 'audit', label: 'System Audit Logs', icon: ClipboardList },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];
  } else if (userRole === 'Manager') {
    menuItems = [
      { id: 'dashboard', label: 'Manager Dashboard', icon: LayoutDashboard },
      { id: 'pending', label: 'Pending Approvals', icon: ClipboardList },
      { id: 'files', label: 'File Repository', icon: Folder },
    ];
  } else {
    // Officer or default
    menuItems = [
      { id: 'dashboard', label: 'Officer Dashboard', icon: LayoutDashboard },
      { id: 'my_uploads', label: 'My Uploads', icon: ClipboardList },
      { id: 'files', label: 'File Repository', icon: Folder },
    ];
  }

  return (
    <aside className="w-64 min-w-[256px] max-w-[256px] h-screen bg-slate-900 text-slate-300 flex flex-col justify-between p-4 border-r border-slate-800 select-none">
      {/* Header Logo */}
      <div>
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-wide leading-tight">SLIATE DFMS</h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">ADMIN PORTAL</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Navigation</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Profile */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">SYSTEM HEALTH</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-semibold">Optimal</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-slate-800 p-2.5 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                HD
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-semibold text-white truncate">H.W.B. Dilhara</h4>
              <p className="text-[10px] text-slate-400 truncate">Administrator</p>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;