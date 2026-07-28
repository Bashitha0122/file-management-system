import { useState } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors ${
      checked ? 'bg-blue-600' : 'bg-slate-200'
    }`}
    aria-pressed={checked}
  >
    <span
      className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
  </button>
);

const Section = ({ title, description, children }) => (
  <section className="bg-white rounded-lg border border-slate-200 p-4">
    <div className="flex items-start gap-4">
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </div>
      <div className="w-full md:w-3/4">{children}</div>
    </div>
  </section>
);

const Settings = () => {
  const [systemTitle, setSystemTitle] = useState('SLIATE Digital File Management System');
  const [maxUploadSize, setMaxUploadSize] = useState('50 MB');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [require2FA, setRequire2FA] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    // For now just log the settings — replace with API call
    console.log('Saved settings', {
      systemTitle,
      maxUploadSize,
      maintenanceMode,
      require2FA,
      emailNotifications,
    });
    // Optionally show a toast or inline confirmation
    alert('Settings saved (stub)');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
            <p className="text-slate-500 mt-1">Application configuration and system preferences.</p>
          </div>
        </div>

        <div>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <Section title="General Settings" description="System title and limits visible across the application.">
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs text-slate-600">System Title</span>
              <input
                value={systemTitle}
                onChange={(e) => setSystemTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>

            <label className="block">
              <span className="text-xs text-slate-600">Default Max File Upload Size</span>
              <input
                value={maxUploadSize}
                onChange={(e) => setMaxUploadSize(e.target.value)}
                className="mt-1 w-44 rounded-md border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <p className="text-xs text-slate-400 mt-1">Specify units, e.g., 50 MB</p>
            </label>
          </div>
        </Section>

        <Section
          title="Security & Authentication"
          description="Manage authentication policies and emergency maintenance mode."
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-800">System Maintenance Mode</div>
                <div className="text-xs text-slate-500">Disable user uploads and show maintenance banner.</div>
              </div>
              <Toggle checked={maintenanceMode} onChange={setMaintenanceMode} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-800">Require Two-Factor Authentication</div>
                <div className="text-xs text-slate-500">Enforce 2FA for Admin and Officer accounts.</div>
              </div>
              <Toggle checked={require2FA} onChange={setRequire2FA} />
            </div>
          </div>
        </Section>

        <Section title="Storage Quotas" description="Monitor and set storage related defaults.">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-800">Default Quota per User</div>
                <div className="text-xs text-slate-500">Adjust the default storage quota allotted to new users.</div>
              </div>
              <div className="w-48">
                <input
                  value={maxUploadSize}
                  onChange={(e) => setMaxUploadSize(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div className="text-xs text-slate-500">Current usage: <span className="font-medium text-slate-700">63 GB of 100 GB</span></div>
          </div>
        </Section>

        <Section title="Notifications" description="Control email alerts and approvals notifications.">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-800">Email Notifications for Pending Approvals</div>
                <div className="text-xs text-slate-500">Send email alerts to approvers when new files require review.</div>
              </div>
              <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
            </div>
          </div>
        </Section>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
