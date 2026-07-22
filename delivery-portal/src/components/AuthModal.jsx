import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, MapPin, Sparkles, ShieldCheck, Truck } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialRole = 'customer', initialTab = 'login' }) {
  const [tab, setTab] = useState(initialTab); // 'login' | 'signup'
  const [role, setRole] = useState(initialRole); // 'customer' | 'tailor' | 'student' | 'delivery'
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  // Sync state when modal is opened with specific configurations
  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setRole(initialRole);
      setError('');
      setName('');
      setEmail('');
      setPassword('');
      setAddress('');
    }
  }, [isOpen, initialRole, initialTab]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (tab === 'signup' && !name) {
      setError('Please enter your full name.');
      return;
    }

    if (tab === 'signup' && role === 'customer' && !address) {
      setError('Please enter your delivery address.');
      return;
    }

    // Standard login/signup simulation
    let userRole = role;
    if (tab === 'login') {
      const lowerEmail = email.toLowerCase();
      if (lowerEmail === 'admin@stitchbee.com') {
        userRole = 'admin';
      } else if (lowerEmail === 'tailor@stitchbee.com') {
        userRole = 'tailor';
      } else if (lowerEmail === 'student@stitchbee.com') {
        userRole = 'student';
      } else if (lowerEmail === 'delivery@stitchbee.com') {
        userRole = 'delivery';
      } else if (lowerEmail === 'customer@stitchbee.com') {
        userRole = 'customer';
      } else {
        // Try to look up from registered users list
        try {
          const registeredUsers = JSON.parse(localStorage.getItem('stitchbee_users') || '[]');
          const found = registeredUsers.find(u => u.email === lowerEmail);
          if (found) {
            userRole = found.role;
          }
        } catch (err) {
          console.error("Error reading registered users:", err);
        }
      }
    }

    const displayName = tab === 'login' 
      ? (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)) 
      : name;

    const userData = {
      name: displayName,
      email: email.toLowerCase(),
      role: userRole,
      address: userRole === 'customer' ? address || '123 Green Glen Road, HSR Layout, Bengaluru' : ''
    };

    // Store current session in localStorage
    localStorage.setItem('stitchbee_user', JSON.stringify(userData));

    // Save to list of registered users if sign up
    if (tab === 'signup') {
      try {
        const registeredUsers = JSON.parse(localStorage.getItem('stitchbee_users') || '[]');
        if (!registeredUsers.some(u => u.email === userData.email)) {
          registeredUsers.push({ email: userData.email, role: userData.role });
          localStorage.setItem('stitchbee_users', JSON.stringify(registeredUsers));
        }
      } catch (err) {
        console.error("Error saving registered user:", err);
      }
    }

    onLoginSuccess(userData);
    onClose();
  };

  const handleQuickAdmin = () => {
    setEmail('admin@stitchbee.com');
    setPassword('admin123');
    setTab('login');
  };

  return (
    <div className="modal-overlay auth-modal-overlay">
      <div className="modal-content auth-modal-content animate-fade-in">
        
        {/* Header */}
        <div className="modal-header auth-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>
              {tab === 'login' ? 'Welcome Back' : 'Join StitchBee'}
            </h3>
          </div>
          <button className="auth-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button 
            type="button"
            className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setError(''); }}
          >
            Login
          </button>
          <button 
            type="button"
            className={`auth-tab-btn ${tab === 'signup' ? 'active' : ''}`}
            onClick={() => { setTab('signup'); setError(''); }}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="auth-error-box">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {tab === 'signup' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="auth-input-wrapper">
                <User size={16} className="auth-input-icon" />
                <input 
                  type="text" 
                  className="form-input auth-input" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={16} className="auth-input-icon" />
              <input 
                type="email" 
                className="form-input auth-input" 
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-input-icon" />
              <input 
                type="password" 
                className="form-input auth-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          {tab === 'signup' && (
            <>
              {/* Role Selection */}
              <div className="form-group">
                <label className="form-label">Register As</label>
                <div className="auth-role-select-grid">
                  <div 
                    className={`auth-role-card ${role === 'customer' ? 'active' : ''}`}
                    onClick={() => setRole('customer')}
                  >
                    <User size={20} />
                    <span>Customer</span>
                  </div>
                  <div 
                    className={`auth-role-card ${role === 'tailor' ? 'active' : ''}`}
                    onClick={() => setRole('tailor')}
                  >
                    <ShieldCheck size={20} />
                    <span>Tailor Partner</span>
                  </div>
                  <div 
                    className={`auth-role-card ${role === 'student' ? 'active' : ''}`}
                    onClick={() => setRole('student')}
                  >
                    <Sparkles size={20} />
                    <span>Student Partner</span>
                  </div>
                  <div 
                    className={`auth-role-card ${role === 'delivery' ? 'active' : ''}`}
                    onClick={() => setRole('delivery')}
                  >
                    <Truck size={20} />
                    <span>Delivery Partner</span>
                  </div>
                </div>
              </div>

              {/* Address (only for Customer role) */}
              {role === 'customer' && (
                <div className="form-group animate-fade-in">
                  <label className="form-label">Delivery & Sizing Address</label>
                  <div className="auth-input-wrapper">
                    <MapPin size={16} className="auth-input-icon" />
                    <input 
                      type="text" 
                      className="form-input auth-input" 
                      placeholder="123 Green Glen Road, HSR Layout, Bengaluru"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required 
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <button type="submit" className="btn btn-primary auth-submit-btn">
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Demo Helper */}
        {tab === 'login' && (
          <div className="auth-demo-helper">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Testing Super Admin?
            </span>
            <button 
              type="button" 
              className="btn btn-ghost" 
              style={{ padding: '4px 8px', fontSize: '0.8rem', textDecoration: 'underline', color: 'var(--primary)' }}
              onClick={handleQuickAdmin}
            >
              Use Admin Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
