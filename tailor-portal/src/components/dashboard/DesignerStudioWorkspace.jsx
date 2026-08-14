import React, { useState } from 'react';
import { Plus, Palette, FileText, Layers, CheckCircle, Archive, Disc, Lightbulb, HardDrive, Sparkles } from 'lucide-react';
import DesignerSidebar from './DesignerSidebar';
import DesignerRightPanel from './DesignerRightPanel';
import { initialDashboardData } from '../../data/dashboardData';

export default function DesignerStudioWorkspace({ 
  theme, 
  designs = [], 
  handleCreateDesign,
  newDesignName, setNewDesignName,
  newCategory, setNewCategory,
  newOutfitType, setNewOutfitType,
  newFabric, setNewFabric,
  newColor, setNewColor,
  newCustomer, setNewCustomer,
  newPrice, setNewPrice,
  newInstructions, setNewInstructions,
  studioSubTab, setStudioSubTab,
  onNavigateTab
}) {
  const [data] = useState(initialDashboardData);

  return (
    <div className={`designer-dashboard-fullwidth ${theme === 'dark' ? 'dark-mode' : ''}`}>
      
      {/* 3-Column Studio Layout: Left Sidebar (230px) -> Center Workspace -> Right Panel (320px) */}
      <div className="studio-three-column-layout">

        {/* 1. LEFT SIDEBAR (Design Studio Navigation, Storage Progress, Quick Tips) */}
        <DesignerSidebar 
          activeTab={studioSubTab} 
          onSelectNav={(tabId) => {
            setStudioSubTab(tabId);
          }}
          navCounts={{
            myDesigns: designs.length || 12,
            requests: 6,
            drafts: 4,
            published: 8
          }}
        />

        {/* 2. CENTER MAIN WORKSPACE */}
        <main className="center-workspace-stack">
          
          {/* Header & Title Bar */}
          <div className="sb-dashboard-card" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: 'var(--sb-navy)' }}>Design Studio Workspace</h1>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--sb-text-secondary)' }}>
                  Create, review, and manage custom outfit sketches, references, and stitching specifications.
                </p>
              </div>

              <button
                onClick={() => setStudioSubTab('create')}
                className="btn-action-primary"
              >
                <Plus size={16} /> Create New Design
              </button>
            </div>

            {/* Subsections Navigation Pills */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--sb-border)', paddingTop: '16px', paddingBottom: '10px', overflowX: 'auto' }}>
              {[
                { id: 'my-designs', label: `My Designs (${designs.length || 12})` },
                { id: 'create', label: 'Create New Design' },
                { id: 'requests', label: 'Design Requests (6)' },
                { id: 'drafts', label: 'Drafts (4)' },
                { id: 'published', label: 'Published Designs (8)' },
                { id: 'archived', label: 'Archived Designs (2)' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setStudioSubTab(sub.id)}
                  style={{
                    padding: '7px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '20px',
                    border: 'none',
                    background: studioSubTab === sub.id ? '#EC168C' : (theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'var(--sb-bg-light)'),
                    color: studioSubTab === sub.id ? '#ffffff' : 'var(--sb-text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>

          {/* CREATE NEW DESIGN FORM SUBSECTION */}
          {studioSubTab === 'create' && (
            <div className="sb-dashboard-card" style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 700, color: 'var(--sb-navy)' }}>
                Create New Outfit Design
              </h3>

              <form onSubmit={handleCreateDesign} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sb-navy)' }}>Design Name</label>
                  <input type="text" placeholder="e.g. Royal Zardozi Bridal Lehenga" value={newDesignName} onChange={e => setNewDesignName(e.target.value)} required style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--sb-border)', outline: 'none', background: 'var(--sb-bg-light)', color: 'var(--sb-navy)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sb-navy)' }}>Category</label>
                  <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--sb-border)', outline: 'none', background: 'var(--sb-bg-light)', color: 'var(--sb-navy)' }}>
                    <option value="Bridal Wear">Bridal Wear</option>
                    <option value="Lehenga Choli">Lehenga Choli</option>
                    <option value="Anarkali Suits">Anarkali Suits</option>
                    <option value="Sherwani & Grooms">Sherwani & Grooms</option>
                    <option value="Indo-Western">Indo-Western</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sb-navy)' }}>Outfit Type</label>
                  <input type="text" placeholder="e.g. Heavy Bridal Lehenga" value={newOutfitType} onChange={e => setNewOutfitType(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--sb-border)', outline: 'none', background: 'var(--sb-bg-light)', color: 'var(--sb-navy)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sb-navy)' }}>Fabric Specifications</label>
                  <input type="text" placeholder="e.g. Italian Silk & Velvet" value={newFabric} onChange={e => setNewFabric(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--sb-border)', outline: 'none', background: 'var(--sb-bg-light)', color: 'var(--sb-navy)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sb-navy)' }}>Color Palette</label>
                  <input type="text" placeholder="e.g. Ruby Red & Antique Gold" value={newColor} onChange={e => setNewColor(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--sb-border)', outline: 'none', background: 'var(--sb-bg-light)', color: 'var(--sb-navy)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sb-navy)' }}>Client Name</label>
                  <select value={newCustomer} onChange={e => setNewCustomer(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--sb-border)', outline: 'none', background: 'var(--sb-bg-light)', color: 'var(--sb-navy)' }}>
                    <option value="Priya Sharma">Priya Sharma</option>
                    <option value="Ananya Roy">Ananya Roy</option>
                    <option value="Amit Verma">Amit Verma</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sb-navy)' }}>Estimated Price (₹)</label>
                  <input type="number" placeholder="e.g. 18500" value={newPrice} onChange={e => setNewPrice(e.target.value)} required style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--sb-border)', outline: 'none', background: 'var(--sb-bg-light)', color: 'var(--sb-navy)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sb-navy)' }}>Stitching & Embroidery Notes</label>
                  <textarea rows={3} placeholder="Add detailed handwork, zari embroidery specs, and seam notes..." value={newInstructions} onChange={e => setNewInstructions(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--sb-border)', outline: 'none', background: 'var(--sb-bg-light)', color: 'var(--sb-navy)' }} />
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button type="submit" className="btn-action-primary">
                    Save & Publish Design
                  </button>
                  <button type="button" onClick={() => setStudioSubTab('my-designs')} className="btn-action-secondary">
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* MY DESIGNS CARDS GRID */}
          {studioSubTab !== 'create' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {designs.map(d => (
                <div key={d.id} className="sb-dashboard-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: '200px' }}>
                    <img src={d.image} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '12px' }}>
                      {d.version}
                    </span>
                    <span style={{ position: 'absolute', bottom: '12px', left: '12px', background: '#EC168C', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
                      {d.status}
                    </span>
                  </div>

                  <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--sb-navy)' }}>{d.name}</h3>
                        <strong style={{ fontSize: '16px', color: '#EC168C' }}>₹{d.estimatedPrice?.toLocaleString()}</strong>
                      </div>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--sb-text-secondary)' }}>
                        Category: {d.category} • {d.outfitType}
                      </p>
                    </div>

                    <div style={{ background: 'var(--sb-bg-light)', padding: '10px', borderRadius: '8px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', border: '1px solid var(--sb-border)' }}>
                      <div><strong>Client:</strong> {d.customer}</div>
                      <div><strong>Fabric:</strong> {d.fabric} ({d.color})</div>
                      <div><strong>Deadline:</strong> {d.deadline}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <button onClick={() => alert(`Opening details modal for ${d.name}...`)} className="btn-action-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                        Details & Notes
                      </button>
                      <button onClick={() => alert(`Sending ${d.name} to StitchBee Atelier`)} className="btn-action-primary" style={{ flex: 1, justifyContent: 'center' }}>
                        Send to Atelier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>

        {/* 3. RIGHT PANEL (AI Assistant, Upcoming Appointments, Recent Clients) */}
        <DesignerRightPanel 
          appointments={data.appointments}
          clients={data.recentClients}
          onViewCalendar={() => onNavigateTab && onNavigateTab('calendar')}
          onViewClients={() => onNavigateTab && onNavigateTab('customers')}
          onOpenAI={() => onNavigateTab && onNavigateTab('support')}
        />

      </div>

    </div>
  );
}
