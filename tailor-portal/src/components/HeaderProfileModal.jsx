import React from 'react';
import { User, Palette, Scissors, LogOut, ShieldCheck, Star, Phone, Mail, MapPin, ChevronRight, Moon, Sun, X } from 'lucide-react';

export default function HeaderProfileModal({
  userRole, // 'tailor' | 'designer'
  userName,
  userSubText,
  userAvatar,
  theme,
  setTheme,
  onViewProfile,
  onSwitchPortal,
  onLogout,
  onClose
}) {
  const isDesigner = userRole === 'designer';
  const name = userName || (isDesigner ? 'Ananya Roy' : 'Master Rajesh');
  const roleTitle = isDesigner ? 'SENIOR FASHION DESIGNER' : 'MASTER TAILOR PARTNER';
  const avatar = userAvatar || (isDesigner 
    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' 
    : '/bridal 5.jpg');
  const businessName = isDesigner ? 'Ananya Roy Couture Studio' : 'Vogue Craft Tailors';
  const phone = isDesigner ? '+91 98765 43211' : '+91 98765 43210';
  const rating = isDesigner ? '4.9 ★ (42 Reviews)' : '4.8 ★ (142 Orders)';

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9998,
          background: 'transparent'
        }}
      />

      {/* Profile Card Component */}
      <div style={{
        position: 'absolute',
        top: '48px',
        right: 0,
        width: '280px',
        background: theme === 'dark' ? '#141126' : '#ffffff',
        border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
        padding: '16px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
      }}>
        
        {/* Header Profile Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={avatar} 
              alt={name} 
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${isDesigner ? '#F72585' : 'var(--primary, #f72585)'}` }} 
            />
            <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', border: '2px solid #ffffff' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <strong style={{ fontSize: '14px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {name}
              </strong>
              <ShieldCheck size={14} color="#10B981" />
            </div>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#F72585', letterSpacing: '0.02em' }}>
              {roleTitle}
            </span>
            <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 600 }}>
              {rating}
            </span>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', padding: 0 }}>
            <X size={16} />
          </button>
        </div>

        {/* Business Details Mini Box */}
        <div style={{
          background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F8FAFC',
          borderRadius: '10px',
          padding: '10px 12px',
          fontSize: '11px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467'
        }}>
          <div><strong>Store:</strong> {businessName}</div>
          <div><strong>Phone:</strong> {phone}</div>
          <div><strong>Status:</strong> <span style={{ color: '#10B981', fontWeight: 700 }}>Active Partner ✓</span></div>
        </div>

        {/* Component Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          
          {/* View Profile Option */}
          <button
            onClick={() => {
              if (onViewProfile) onViewProfile();
              onClose();
            }}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '8px',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
              background: 'transparent',
              color: theme === 'dark' ? '#ffffff' : '#172033',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={15} color="#F72585" /> View Profile & Settings
            </span>
            <ChevronRight size={14} color="#64748B" />
          </button>

          {/* Switch Portal Option */}
          <button
            onClick={() => {
              if (onSwitchPortal) onSwitchPortal();
              onClose();
            }}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '8px',
              border: '1px solid rgba(247,37,133,0.3)',
              background: theme === 'dark' ? 'rgba(247,37,133,0.08)' : '#FFF0F6',
              color: '#F72585',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isDesigner ? <Scissors size={15} /> : <Palette size={15} />} 
              {isDesigner ? 'Switch to Tailor Portal' : 'Switch to Designer Portal'}
            </span>
            <ChevronRight size={14} color="#F72585" />
          </button>

          {/* Theme Switcher Button */}
          {setTheme && (
            <button
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '8px',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
                background: 'transparent',
                color: theme === 'dark' ? '#ffffff' : '#172033',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {theme === 'dark' ? <Sun size={15} color="#F59E0B" /> : <Moon size={15} color="#8B12C9" />}
                Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Toggle</span>
            </button>
          )}

          {/* LOGOUT BUTTON */}
          <button
            onClick={() => {
              if (onLogout) onLogout();
              onClose();
            }}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '8px',
              border: 'none',
              background: '#EF4444',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '4px',
              boxShadow: '0 4px 12px rgba(239,68,68,0.25)'
            }}
          >
            <LogOut size={15} /> Logout
          </button>

        </div>

      </div>
    </>
  );
}
