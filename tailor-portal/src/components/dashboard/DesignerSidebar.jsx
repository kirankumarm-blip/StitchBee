import React from 'react';
import { 
  Palette, Plus, FileText, FileEdit, CheckCircle, Archive, 
  Layers, Disc, Lightbulb, HardDrive, Sparkles, ChevronRight 
} from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function DesignerSidebar({ activeTab, onSelectNav, navCounts }) {
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

  return (
    <aside className="designer-sidebar-container">
      
      {/* Sidebar Header Title */}
      <div className="sidebar-title-box">
        <h3 className="sidebar-heading">Design Studio</h3>
      </div>

      {/* Navigation Options List */}
      <nav className="sidebar-nav-list">
        {navItems.map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectNav && onSelectNav(item.id)}
              className={`sidebar-nav-btn ${isSelected ? 'selected' : ''}`}
            >
              <div className="sidebar-btn-left">
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className={`sidebar-count-badge ${isSelected ? 'selected' : ''}`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Cloud Storage Usage Card */}
      <div className="sidebar-storage-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <HardDrive size={16} color="#EC168C" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sb-navy)' }}>Storage</span>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--sb-text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
          12.6 GB of 50 GB used
        </div>
        <ProgressBar value={25.2} color="#EC168C" height={5} />
        <button className="sidebar-upgrade-btn">
          Upgrade Storage
        </button>
      </div>

      {/* Quick Tips Card */}
      <div className="sidebar-tips-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Sparkles size={14} color="#7C3AED" />
          <strong style={{ fontSize: '12px', color: '#7C3AED' }}>Quick Tip</strong>
        </div>
        <p style={{ margin: 0, fontSize: '11px', color: 'var(--sb-text-secondary)', lineHeight: 1.4 }}>
          Use 3D fabric simulations to preview gown draping before cutting patterns.
        </p>
      </div>

    </aside>
  );
}
