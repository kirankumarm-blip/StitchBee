import React, { useState } from 'react';
import {
  Settings,
  Users,
  ShieldCheck,
  Save,
  Plus,
  Check,
  X,
  Lock,
  Percent,
  Sliders,
  CreditCard,
  Truck,
  UserPlus
} from 'lucide-react';
import {
  PLATFORM_SETTINGS,
  MOCK_ADMIN_USERS,
  PERMISSION_MATRIX
} from '../../data/adminMockData';
import { StatusBadge } from '../common/StatusBadge';

export const SettingsView = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('platform');
  const [settings, setSettings] = useState(PLATFORM_SETTINGS);
  const [adminUsers, setAdminUsers] = useState(MOCK_ADMIN_USERS);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Operations Admin' });

  const handleSavePlatformSettings = (e) => {
    e.preventDefault();
    showToast && showToast('Platform configuration saved successfully', 'success');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const userObj = {
      id: `u-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Active',
      access:
        newUser.role === 'Super Admin'
          ? 'All Modules'
          : newUser.role === 'Finance Admin'
          ? 'Payments, Refunds, Payouts'
          : newUser.role === 'Verification Admin'
          ? 'Tailors, Delivery, Designers'
          : 'Orders, Stitching, Deliveries'
    };

    setAdminUsers((prev) => [...prev, userObj]);
    setNewUser({ name: '', email: '', role: 'Operations Admin' });
    setShowAddUserModal(false);
    showToast && showToast(`Admin user "${userObj.name}" invited successfully`, 'success');
  };

  const handleToggleUserStatus = (id) => {
    setAdminUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
          : u
      )
    );
    showToast && showToast(`User status updated`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
          <Settings className="w-6 h-6 text-[var(--color-primary)]" />
          Settings & Access Control
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
          Configure marketplace fees, payment gateway connections, admin team permissions, and operational limits.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)]">
        <button
          onClick={() => setActiveTab('platform')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'platform'
              ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-light)]'
              : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Platform Configuration
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'team'
              ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-light)]'
              : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
          }`}
        >
          <Users className="w-4 h-4" />
          Admin Users & Roles ({adminUsers.length})
        </button>

        <button
          onClick={() => setActiveTab('permissions')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'permissions'
              ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-light)]'
              : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Role Permission Matrix
        </button>
      </div>

      {/* Tab 1: Platform Configuration */}
      {activeTab === 'platform' && (
        <form onSubmit={handleSavePlatformSettings} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Commercial & Fees */}
            <div className="sb-card p-5 space-y-4">
              <h3 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
                <Percent className="w-4 h-4 text-[var(--color-primary)]" />
                Commission & Pricing Rules
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[var(--color-text)] block mb-1">
                    Platform Commission Rate (%)
                  </label>
                  <input
                    type="number"
                    value={settings.platformCommissionPercent}
                    onChange={(e) =>
                      setSettings({ ...settings, platformCommissionPercent: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                    Standard percentage deducted from tailoring and designer GMV per completed order.
                  </p>
                </div>

                <div>
                  <label className="font-semibold text-[var(--color-text)] block mb-1">
                    Express 24-48h Delivery Surge (%)
                  </label>
                  <input
                    type="number"
                    value={settings.expressDeliverySurgePercent}
                    onChange={(e) =>
                      setSettings({ ...settings, expressDeliverySurgePercent: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                    Additional premium added for urgent doorstep tailoring jobs.
                  </p>
                </div>

                <div>
                  <label className="font-semibold text-[var(--color-text)] block mb-1">
                    Free Alteration Window (Days)
                  </label>
                  <input
                    type="number"
                    value={settings.freeAlterationDays}
                    onChange={(e) =>
                      setSettings({ ...settings, freeAlterationDays: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                    Days after delivery during which a customer can request 100% free fit rework.
                  </p>
                </div>
              </div>
            </div>

            {/* Operational Radii & Automations */}
            <div className="sb-card p-5 space-y-4">
              <h3 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
                <Truck className="w-4 h-4 text-[var(--color-accent)]" />
                Logistics & Automated Dispatch
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[var(--color-text)] block mb-1">
                    Max Home Visit Radius for Measurements (km)
                  </label>
                  <input
                    type="number"
                    value={settings.maxHomeVisitRadiusKm}
                    onChange={(e) =>
                      setSettings({ ...settings, maxHomeVisitRadiusKm: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                    Maximum serviceable radius from central cluster hub for fashion gig partners.
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-hover)]">
                    <div>
                      <p className="font-semibold text-[var(--color-text)]">
                        Auto-Assign Delivery Partner
                      </p>
                      <p className="text-[11px] text-[var(--color-text-muted)]">
                        Automatically dispatch the nearest available delivery hero based on GPS.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.autoAssignDelivery}
                      onChange={(e) =>
                        setSettings({ ...settings, autoAssignDelivery: e.target.checked })
                      }
                      className="w-4 h-4 accent-[var(--color-primary)] rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Gateway Toggles */}
              <h4 className="font-bold text-xs text-[var(--color-text)] uppercase tracking-wider pt-2">
                Connected Payment Gateways
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'razorpayActive', name: 'Razorpay PG', desc: 'UPI, Credit/Debit Cards, NetBanking' },
                  { key: 'cashfreeActive', name: 'Cashfree Payments', desc: 'Instant UPI Intent & Payouts' },
                  { key: 'payuActive', name: 'PayU India', desc: 'Secondary Fallback Gateway' }
                ].map((gw) => (
                  <div
                    key={gw.key}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--color-border)]"
                  >
                    <div>
                      <p className="font-semibold text-[var(--color-text)]">{gw.name}</p>
                      <p className="text-[11px] text-[var(--color-text-muted)]">{gw.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings[gw.key]}
                      onChange={(e) => setSettings({ ...settings, [gw.key]: e.target.checked })}
                      className="w-4 h-4 accent-[var(--color-primary)] rounded cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="sb-btn-primary text-xs py-2.5 px-6 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Save className="w-4 h-4" />
              Save Platform Configuration
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Admin Users & Team */}
      {activeTab === 'team' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-[var(--color-text-secondary)]">
              Authorized operations staff and administrators with console login privileges.
            </p>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="sb-btn-primary text-xs flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Invite Admin User
            </button>
          </div>

          <div className="sb-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--color-surface-hover)] border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Permissions Scope</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {adminUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[var(--color-surface-hover)]">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold flex items-center justify-center text-xs">
                            {user.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span className="font-bold text-[var(--color-text)]">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-[var(--color-text-secondary)]">
                        {user.email}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[var(--color-text-muted)]">{user.access}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        {user.role !== 'Super Admin' ? (
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={`text-xs font-semibold hover:underline ${
                              user.status === 'Active' ? 'text-red-600' : 'text-green-600'
                            }`}
                          >
                            {user.status === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                        ) : (
                          <span className="text-[11px] text-[var(--color-text-muted)] italic">
                            Protected
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Role Permission Matrix */}
      {activeTab === 'permissions' && (
        <div className="sb-card overflow-hidden">
          <div className="p-4 border-b border-[var(--color-border)]">
            <h3 className="font-bold text-sm text-[var(--color-text)]">
              RBAC Role Permissions Grid
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Strict access levels enforced across endpoints and UI components
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[var(--color-surface-hover)] border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold">
                <tr>
                  <th className="py-3 px-4">Platform Module</th>
                  <th className="py-3 px-4 text-center">Super Admin</th>
                  <th className="py-3 px-4 text-center">Operations Admin</th>
                  <th className="py-3 px-4 text-center">Finance Admin</th>
                  <th className="py-3 px-4 text-center">Verification Admin</th>
                  <th className="py-3 px-4 text-center">Support Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {PERMISSION_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--color-surface-hover)]">
                    <td className="py-3 px-4 font-semibold text-[var(--color-text)]">
                      {row.module}
                    </td>

                    {['SuperAdmin', 'OpsAdmin', 'FinanceAdmin', 'VerificationAdmin', 'SupportAdmin'].map(
                      (roleKey) => (
                        <td key={roleKey} className="py-3 px-4 text-center">
                          {row[roleKey] ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
                              <X className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-[var(--color-text)]">
              Invite StitchBee Admin User
            </h3>
            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-[var(--color-text-secondary)] font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] font-semibold mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@stitchbee.in"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] font-semibold mb-1">
                  Designated Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none"
                >
                  <option value="Operations Admin">Operations Admin</option>
                  <option value="Verification Admin">Verification Admin</option>
                  <option value="Finance Admin">Finance Admin</option>
                  <option value="Support Admin">Support Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="sb-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="sb-btn-primary text-xs">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
