import React from 'react';
import { 
  Palette, Plus, FileText, FileEdit, CheckCircle, Archive, 
  Layers, Disc, Lightbulb, HardDrive, Sparkles 
} from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function DesignerSidebar({ theme, activeTab, onSelectNav, navCounts }) {
  const navItems = [
    { id: 'my-designs', label: 'My Designs', icon: <Palette size={16} />, count: navCounts?.myDesigns || 12 },
    { id: 'create', label: 'Create New Design', icon: <Plus size={16} /> },
    { id: 'requests', label: 'Design Requests', icon: <FileText size={16} />, count: navCounts?.requests || 6 },
    { id: 'drafts', label: 'Drafts', icon: <Layers size={16} />, count: navCounts?.drafts || 4 },
    { id: 'published', label: 'Published Designs', icon: <CheckCircle size={16} />, count: navCounts?.published || 8 },
    { id: 'archived', label: 'Archived Designs', icon: <Archive size={16} /> },
    { id: 'collections', label: 'Design Collections', icon: <Disc size={16} /> },
    { id: 'fabric-library', label: 'Fabric Library', icon: <Layers size={16} /> },
    { id: 'inspiration', label: 'Inspiration Board', icon: <Lightbulb size={16} /> }
  ];

  const cardBg = theme === 'dark' ? '#131022' : '#ffffff';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#E5E7EB';
  const textColor = theme === 'dark' ? '#F9FAFB' : '#111827';
  const secTextColor = theme === 'dark' ? '#98A2B3' : '#64748B';
  const lightBg = theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F6F7F9';

  return (
    <aside style={{
      background: cardBg,
      border: `1px solid ${borderColor}`,
      borderRadius: '16px',
      padding: '18px 14px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
      {/* Sidebar Header Title */}
      <div style={{ padding: '0 8px 8px 8px', borderBottom: `1px solid ${borderColor}` }}>
        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: textColor }}>Design Studio</h3>
      </div>

      {/* Navigation Options List */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
        {navItems.map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectNav && onSelectNav(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '9px',
                border: 'none',
                background: isSelected ? (theme === 'dark' ? 'rgba(236,22,140,0.14)' : '#FFF0F6') : 'transparent',
                color: isSelected ? '#EC168C' : textColor,
                fontSize: '13px',
                fontWeight: isSelected ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', color: isSelected ? '#EC168C' : secTextColor }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '10px',
                  background: isSelected ? 'rgba(236,22,140,0.15)' : lightBg,
                  color: isSelected ? '#EC168C' : secTextColor
                }}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Cloud Storage Usage Card */}
      <div style={{
        background: lightBg,
        border: `1px solid ${borderColor}`,
        borderRadius: '12px',
        padding: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <HardDrive size={16} color="#EC168C" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Storage</span>
        </div>
        <div style={{ fontSize: '11px', color: secTextColor, marginBottom: '6px', fontWeight: 500 }}>
          12.6 GB of 50 GB used
        </div>
        <ProgressBar value={25.2} color="#EC168C" height={5} />
        <button style={{
          width: '100%',
          marginTop: '10px',
          padding: '7px 12px',
          borderRadius: '8px',
          border: `1px solid ${borderColor}`,
          background: cardBg,
          color: '#EC168C',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}>
          Upgrade Storage
        </button>
      </div>

      {/* Quick Tips Card */}
      <div style={{
        background: 'rgba(124,58,237,0.06)',
        border: '1px solid rgba(124,58,237,0.18)',
        borderRadius: '12px',
        padding: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Sparkles size={14} color="#7C3AED" />
          <strong style={{ fontSize: '12px', color: '#7C3AED' }}>Quick Tip</strong>
        </div>
        <p style={{ margin: 0, fontSize: '11px', color: secTextColor, lineHeight: 1.4 }}>
          Use 3D fabric simulations to preview gown draping before cutting patterns.
        </p>
      </div>

    </aside>
  );
}
