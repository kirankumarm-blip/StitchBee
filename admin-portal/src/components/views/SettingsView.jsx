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
import StatusBadge from '../common/StatusBadge';

export const SettingsView = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('platform');
  const [settings, setSettings] = useState(PLATFORM_SETTINGS || {});
  const [adminUsers, setAdminUsers] = useState(MOCK_ADMIN_USERS || []);
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--sb-text-title)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <Settings style={{ width: '22px', height: '22px', color: 'var(--sb-primary)' }} />
          Settings & Access Control
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', margin: '4px 0 0 0' }}>
          Configure marketplace fees, payment gateway connections, admin team permissions, and operational limits.
        </p>
      </div>

      {/* Tabs */}
      <div className="sb-tabs-nav">
        <button
          type="button"
          onClick={() => setActiveTab('platform')}
          className={`sb-tab-item ${activeTab === 'platform' ? 'active' : ''}`}
        >
          <Sliders style={{ width: '16px', height: '16px' }} />
          Platform Configuration
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('team')}
          className={`sb-tab-item ${activeTab === 'team' ? 'active' : ''}`}
        >
          <Users style={{ width: '16px', height: '16px' }} />
          Admin Users & Roles ({adminUsers.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('permissions')}
          className={`sb-tab-item ${activeTab === 'permissions' ? 'active' : ''}`}
        >
          <ShieldCheck style={{ width: '16px', height: '16px' }} />
          Role Permission Matrix
        </button>
      </div>

      {/* Tab 1: Platform Configuration */}
      {activeTab === 'platform' && (
        <form onSubmit={handleSavePlatformSettings} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Commercial & Fees */}
            <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--sb-border-default)', paddingBottom: '10px', margin: 0 }}>
                <Percent style={{ width: '18px', height: '18px', color: 'var(--sb-primary)' }} />
                Commission & Pricing Rules
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.78rem' }}>
                <div>
                  <label style={{ fontWeight: 600, color: 'var(--sb-text-title)', display: 'block', marginBottom: '6px' }}>
                    Platform Commission Rate (%)
                  </label>
                  <input
                    type="number"
                    value={settings.platformCommissionPercent || 15}
                    onChange={(e) =>
                      setSettings({ ...settings, platformCommissionPercent: Number(e.target.value) })
                    }
                    className="sb-input"
                  />
                  <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: '4px 0 0 0' }}>
                    Standard percentage deducted from tailoring and designer GMV per completed order.
                  </p>
                </div>

                <div>
                  <label style={{ fontWeight: 600, color: 'var(--sb-text-title)', display: 'block', marginBottom: '6px' }}>
                    Express 24-48h Delivery Surge (%)
                  </label>
                  <input
                    type="number"
                    value={settings.expressDeliverySurgePercent || 25}
                    onChange={(e) =>
                      setSettings({ ...settings, expressDeliverySurgePercent: Number(e.target.value) })
                    }
                    className="sb-input"
                  />
                  <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: '4px 0 0 0' }}>
                    Additional premium added for urgent doorstep tailoring jobs.
                  </p>
                </div>

                <div>
                  <label style={{ fontWeight: 600, color: 'var(--sb-text-title)', display: 'block', marginBottom: '6px' }}>
                    Free Alteration Window (Days)
                  </label>
                  <input
                    type="number"
                    value={settings.freeAlterationDays || 7}
                    onChange={(e) =>
                      setSettings({ ...settings, freeAlterationDays: Number(e.target.value) })
                    }
                    className="sb-input"
                  />
                  <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: '4px 0 0 0' }}>
                    Days after delivery during which a customer can request 100% free fit rework.
                  </p>
                </div>
              </div>
            </div>

            {/* Operational Radii & Automations */}
            <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--sb-border-default)', paddingBottom: '10px', margin: 0 }}>
                <Truck style={{ width: '18px', height: '18px', color: 'var(--sb-accent)' }} />
                Logistics & Automated Dispatch
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.78rem' }}>
                <div>
                  <label style={{ fontWeight: 600, color: 'var(--sb-text-title)', display: 'block', marginBottom: '6px' }}>
                    Max Home Visit Radius for Measurements (km)
                  </label>
                  <input
                    type="number"
                    value={settings.maxHomeVisitRadiusKm || 25}
                    onChange={(e) =>
                      setSettings({ ...settings, maxHomeVisitRadiusKm: Number(e.target.value) })
                    }
                    className="sb-input"
                  />
                  <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: '4px 0 0 0' }}>
                    Maximum serviceable radius from central cluster hub for fashion gig partners.
                  </p>
                </div>

                <div style={{ paddingTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: 'var(--sb-radius-md)', border: '1px solid var(--sb-border-default)', backgroundColor: 'var(--sb-bg-surface-hover)' }}>
                    <div>
                      <p style={{ fontWeight: 600, color: 'var(--sb-text-title)', margin: 0 }}>
                        Auto-Assign Delivery Partner
                      </p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>
                        Automatically dispatch the nearest available delivery hero based on GPS.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={!!settings.autoAssignDelivery}
                      onChange={(e) =>
                        setSettings({ ...settings, autoAssignDelivery: e.target.checked })
                      }
                      style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--sb-primary)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Gateway Toggles */}
              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--sb-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '8px 0 0 0' }}>
                Connected Payment Gateways
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                {[
                  { key: 'razorpayActive', name: 'Razorpay PG', desc: 'UPI, Credit/Debit Cards, NetBanking' },
                  { key: 'cashfreeActive', name: 'Cashfree Payments', desc: 'Instant UPI Intent & Payouts' },
                  { key: 'payuActive', name: 'PayU India', desc: 'Secondary Fallback Gateway' }
                ].map((gw) => (
                  <div
                    key={gw.key}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 'var(--sb-radius-md)', border: '1px solid var(--sb-border-default)' }}
                  >
                    <div>
                      <p style={{ fontWeight: 600, color: 'var(--sb-text-title)', margin: 0 }}>{gw.name}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>{gw.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={!!settings[gw.key]}
                      onChange={(e) => setSettings({ ...settings, [gw.key]: e.target.checked })}
                      style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--sb-primary)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="sb-btn sb-btn-primary"
              style={{ padding: '10px 24px', fontSize: '0.82rem' }}
            >
              <Save style={{ width: '16px', height: '16px' }} />
              Save Platform Configuration
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Admin Users & Team */}
      {activeTab === 'team' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', margin: 0 }}>
              Authorized operations staff and administrators with console login privileges.
            </p>
            <button
              type="button"
              onClick={() => setShowAddUserModal(true)}
              className="sb-btn sb-btn-primary"
            >
              <UserPlus style={{ width: '15px', height: '15px' }} />
              Invite Admin User
            </button>
          </div>

          <div className="sb-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--sb-bg-surface-hover)', borderBottom: '1px solid var(--sb-border-default)', color: 'var(--sb-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <th style={{ padding: '12px 16px' }}>User</th>
                    <th style={{ padding: '12px 16px' }}>Email</th>
                    <th style={{ padding: '12px 16px' }}>Role</th>
                    <th style={{ padding: '12px 16px' }}>Permissions Scope</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--sb-border-default)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--sb-radius-full)', backgroundColor: 'var(--sb-primary-light)', color: 'var(--sb-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                            {user.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span style={{ fontWeight: 700, color: 'var(--sb-text-title)' }}>{user.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: 'var(--sb-text-muted)' }}>
                        {user.email}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: 'var(--sb-radius-sm)', fontSize: '0.72rem', fontWeight: 600, backgroundColor: 'var(--sb-primary-light)', color: 'var(--sb-primary)' }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--sb-text-muted)' }}>{user.access}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <StatusBadge status={user.status} />
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        {user.role !== 'Super Admin' ? (
                          <button
                            type="button"
                            onClick={() => handleToggleUserStatus(user.id)}
                            style={{ fontSize: '0.75rem', fontWeight: 600, color: user.status === 'Active' ? 'var(--sb-status-failed)' : 'var(--sb-status-success)', cursor: 'pointer' }}
                          >
                            {user.status === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', fontStyle: 'italic' }}>
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
        <div className="sb-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--sb-border-default)' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
              RBAC Role Permissions Grid
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>
              Strict access levels enforced across endpoints and UI components
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--sb-bg-surface-hover)', borderBottom: '1px solid var(--sb-border-default)', color: 'var(--sb-text-muted)', fontWeight: 600 }}>
                  <th style={{ padding: '12px 16px' }}>Platform Module</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Super Admin</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Operations Admin</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Finance Admin</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Verification Admin</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Support Admin</th>
                </tr>
              </thead>
              <tbody>
                {(PERMISSION_MATRIX || []).map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--sb-border-default)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--sb-text-title)' }}>
                      {row.module}
                    </td>

                    {['SuperAdmin', 'OpsAdmin', 'FinanceAdmin', 'VerificationAdmin', 'SupportAdmin'].map(
                      (roleKey) => (
                        <td key={roleKey} style={{ padding: '12px 16px', textAlign: 'center' }}>
                          {row[roleKey] ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: 'var(--sb-radius-full)', backgroundColor: 'var(--sb-status-success-bg)', color: 'var(--sb-status-success)' }}>
                              <Check style={{ width: '14px', height: '14px' }} />
                            </span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: 'var(--sb-radius-full)', backgroundColor: 'var(--sb-bg-surface-hover)', color: 'var(--sb-border-strong)' }}>
                              <X style={{ width: '14px', height: '14px' }} />
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
        <div className="sb-modal-backdrop">
          <div className="sb-modal-box" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
                Invite StitchBee Admin User
              </h3>
              <button
                type="button"
                onClick={() => setShowAddUserModal(false)}
                style={{ color: 'var(--sb-text-muted)' }}
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.78rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--sb-text-body)', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="sb-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--sb-text-body)', fontWeight: 600, marginBottom: '6px' }}>
                  Corporate Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@stitchbee.in"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="sb-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--sb-text-body)', fontWeight: 600, marginBottom: '6px' }}>
                  Designated Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="sb-select-control"
                  style={{ width: '100%' }}
                >
                  <option value="Operations Admin">Operations Admin</option>
                  <option value="Verification Admin">Verification Admin</option>
                  <option value="Finance Admin">Finance Admin</option>
                  <option value="Support Admin">Support Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="sb-btn sb-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="sb-btn sb-btn-primary">
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
