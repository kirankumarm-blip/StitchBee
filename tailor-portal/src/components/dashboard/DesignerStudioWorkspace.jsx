import React, { useState } from 'react';
import { 
  Palette, Plus, FileText, Layers, CheckCircle, Archive, Disc, Lightbulb, 
  HardDrive, Sparkles, Search, Filter, MoreVertical, Eye, MessageSquare, 
  Check, Circle, Edit, Upload, Share2, Maximize2 
} from 'lucide-react';
import ProgressBar from './ProgressBar';
import '../../styles/dashboard.css';

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
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All Designs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesignId, setSelectedDesignId] = useState('d-1');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Exact Design System Color Tokens
  const isDark = theme === 'dark';
  const cardBg = isDark ? '#131022' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB';
  const textColor = isDark ? '#F9FAFB' : '#172033';
  const secTextColor = isDark ? '#98A2B3' : '#64748B';
  const mutedTextColor = isDark ? '#64748B' : '#94A3B8';
  const lightBg = isDark ? '#0B0914' : '#F7F8FA';

  // Sample 8 Outfit Design Cards matching user specification
  const studioDesignsList = [
    {
      id: 'd-1',
      title: 'Royal Bridal Lehenga',
      client: 'Priya Sharma',
      version: 'Version 3.0',
      updated: 'Updated 1 day ago',
      views: 12,
      comments: 3,
      price: '₹18,500',
      status: 'In Progress',
      statusColor: '#EC168C',
      statusBg: '#FFF0F7',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400',
      category: 'Bridal Wear',
      created: '10 May 2026',
      progress: 80,
      nextStep: 'Waiting for client review and feedback.',
      expectedDate: '20 May 2026'
    },
    {
      id: 'd-2',
      title: 'Velvet Sherwani',
      client: 'Amit Verma',
      version: 'Version 2.1',
      updated: 'Updated 2 days ago',
      views: 15,
      comments: 2,
      price: '₹12,800',
      status: 'Pending Approval',
      statusColor: '#7C3AED',
      statusBg: '#F3E8FF',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400',
      category: 'Sherwani & Grooms',
      created: '12 May 2026',
      progress: 60,
      nextStep: 'Waiting for design approval.',
      expectedDate: '22 May 2026'
    },
    {
      id: 'd-3',
      title: 'Zardozi Silk Anarkali',
      client: 'Ananya Roy',
      version: 'Version 1.4',
      updated: 'Updated 3 days ago',
      views: 18,
      comments: 5,
      price: '₹14,200',
      status: 'Approved',
      statusColor: '#059669',
      statusBg: '#ECFDF5',
      image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=400',
      category: 'Anarkali Suits',
      created: '08 May 2026',
      progress: 100,
      nextStep: 'Ready for Atelier stitching.',
      expectedDate: '18 May 2026'
    },
    {
      id: 'd-4',
      title: 'Chanderi Silk Saree',
      client: 'Sneha Iyer',
      version: 'Version 1.2',
      updated: 'Updated 4 days ago',
      views: 9,
      comments: 1,
      price: '₹8,900',
      status: 'Stitching',
      statusColor: '#D97706',
      statusBg: '#FFF7ED',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=400',
      category: 'Ethnic Sarees',
      created: '05 May 2026',
      progress: 45,
      nextStep: 'Stitching in progress at atelier.',
      expectedDate: '25 May 2026'
    },
    {
      id: 'd-5',
      title: 'Reception Gown',
      client: 'Riya Kapoor',
      version: 'Version 1.1',
      updated: 'Updated 5 days ago',
      views: 11,
      comments: 2,
      price: '₹16,500',
      status: 'In Progress',
      statusColor: '#EC168C',
      statusBg: '#FFF0F7',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=400',
      category: 'Indo-Western',
      created: '01 May 2026',
      progress: 70,
      nextStep: 'Embroidered lace fitting.',
      expectedDate: '24 May 2026'
    },
    {
      id: 'd-6',
      title: 'Embroidered Kurta Set',
      client: 'Karan Malhotra',
      version: 'Version 0.3',
      updated: 'Updated 6 days ago',
      views: 6,
      comments: 0,
      price: '—',
      status: 'Draft',
      statusColor: '#475569',
      statusBg: '#F1F5F9',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      category: 'Menswear',
      created: '03 May 2026',
      progress: 20,
      nextStep: 'Drafting initial pattern.',
      expectedDate: '28 May 2026'
    },
    {
      id: 'd-7',
      title: 'Pastel Lehenga',
      client: 'Meera Joshi',
      version: 'Version 1.0',
      updated: 'Updated 1 week ago',
      views: 8,
      comments: 1,
      price: '₹13,900',
      status: 'On Hold',
      statusColor: '#D97706',
      statusBg: '#FFF7ED',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      category: 'Bridal Wear',
      created: '28 Apr 2026',
      progress: 35,
      nextStep: 'Waiting for client fabric choice.',
      expectedDate: '01 Jun 2026'
    },
    {
      id: 'd-8',
      title: 'Kids Party Dress',
      client: 'Pooja Singh',
      version: 'Version 1.0',
      updated: 'Completed',
      views: 7,
      comments: 0,
      price: '₹4,200',
      status: 'Completed',
      statusColor: '#2563EB',
      statusBg: '#EFF6FF',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
      category: 'Kids Wear',
      created: '20 Apr 2026',
      progress: 100,
      nextStep: 'Delivered to client.',
      expectedDate: '15 May 2026'
    }
  ];

  const activeDesign = studioDesignsList.find(d => d.id === selectedDesignId) || studioDesignsList[0];

  const sidebarNavItems = [
    { id: 'my-designs', label: 'My Designs', icon: <Palette size={15} /> },
    { id: 'create', label: 'Create New Design', icon: <Plus size={15} /> },
    { id: 'requests', label: 'Design Requests', icon: <FileText size={15} />, count: 6 },
    { id: 'drafts', label: 'Drafts', icon: <Layers size={15} />, count: 3 },
    { id: 'published', label: 'Published Designs', icon: <CheckCircle size={15} />, count: 12 },
    { id: 'archived', label: 'Archived Designs', icon: <Archive size={15} />, count: 18 },
    { id: 'collections', label: 'Design Collections', icon: <Disc size={15} /> },
    { id: 'fabric-library', label: 'Fabric Library', icon: <Layers size={15} /> },
    { id: 'inspiration', label: 'Inspiration Board', icon: <Lightbulb size={15} /> }
  ];

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: lightBg,
      color: textColor,
      width: '100%',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: '230px minmax(0, 1fr) 300px',
      gap: '20px',
      alignItems: 'stretch',
      minHeight: 'calc(100vh - 64px)'
    }}>
      
      {/* ==================================================================== */}
      {/* 1. LEFT SIDEBAR (FLUSH TO EXTREME LEFT SCREEN EDGE, FULL HEIGHT)    */}
      {/* ==================================================================== */}
      <aside style={{
        background: cardBg,
        borderRight: `1px solid ${borderColor}`,
        borderTop: 'none',
        borderLeft: 'none',
        borderBottom: 'none',
        borderRadius: '0',
        padding: '20px 14px',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '230px',
        minHeight: 'calc(100vh - 64px)',
        boxSizing: 'border-box'
      }}>
          
          {/* Sidebar Section Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px 8px 6px', borderBottom: `1px solid ${borderColor}` }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>Design Studio</h3>
            <span style={{ fontSize: '12px', color: secTextColor, cursor: 'pointer' }}>⇅</span>
          </div>

          {/* Navigation Options List */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '100%' }}>
            {sidebarNavItems.map(item => {
              const isSelected = studioSubTab === item.id || (studioSubTab === 'my-designs' && item.id === 'my-designs');
              return (
                <button
                  key={item.id}
                  onClick={() => setStudioSubTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isSelected ? '#FFF0F7' : 'transparent',
                    color: isSelected ? '#EC168C' : textColor,
                    fontSize: '13px',
                    fontWeight: isSelected ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', color: isSelected ? '#EC168C' : secTextColor }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(236,22,140,0.15)' : '#F1F5F9',
                      color: isSelected ? '#EC168C' : secTextColor
                    }}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Storage Card */}
          <div style={{
            background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HardDrive size={14} color="#EC168C" />
                <span style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Storage Used</span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#EC168C' }}>25%</span>
            </div>
            <div style={{ fontSize: '11px', color: secTextColor, marginBottom: '8px', fontWeight: 400 }}>
              12.6 GB of 50 GB used
            </div>
            <ProgressBar value={25.2} color="#EC168C" height={6} />
            <button style={{
              width: '100%',
              marginTop: '10px',
              padding: '7px 10px',
              borderRadius: '7px',
              border: 'none',
              background: '#FFF0F7',
              color: '#EC168C',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}>
              👑 Upgrade Storage
            </button>
          </div>

          {/* Quick Tips Card */}
          <div style={{
            background: 'rgba(124, 43, 239, 0.05)',
            border: '1px solid rgba(124, 43, 239, 0.15)',
            borderRadius: '10px',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Sparkles size={14} color="#7C2BEF" />
              <strong style={{ fontSize: '13px', color: '#7C2BEF', fontWeight: 650 }}>Quick Tips</strong>
            </div>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: secTextColor, lineHeight: 1.4 }}>
              Organize your designs into collections to manage them easily.
            </p>
            <a href="#learn" style={{ fontSize: '12px', color: '#EC168C', fontWeight: 600, textDecoration: 'none' }}>
              Learn More →
            </a>
          </div>

        </aside>

        {/* ==================================================================== */}
        {/* 2. CENTER CONTENT (60-65% FLEXIBLE WORKSPACE)                        */}
        {/* ==================================================================== */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '18px', minWidth: 0 }}>
          
          {/* Page Header Bar */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '12px',
            padding: '18px 20px',
            boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: '#172033', lineHeight: 1.2 }}>My Designs</h1>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: secTextColor }}>
                  Manage all your design projects in one place.
                </p>
              </div>

              {/* Search Box, Filter Button & New Design Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                
                {/* Search Box with Pink Focus Ring */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 12px',
                  height: '38px',
                  borderRadius: '9px',
                  border: isSearchFocused ? '1px solid #EC168C' : `1px solid ${borderColor}`,
                  boxShadow: isSearchFocused ? '0 0 0 3px rgba(236,22,140,0.08)' : 'none',
                  background: '#FFFFFF',
                  width: '250px',
                  transition: 'all 0.15s ease'
                }}>
                  <Search size={14} color={mutedTextColor} />
                  <input 
                    type="text" 
                    placeholder="Search designs by name, client, category..."
                    value={searchQuery}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', color: textColor, width: '100%' }}
                  />
                </div>

                {/* Filter Button */}
                <button 
                  onClick={() => setIsFilterActive(!isFilterActive)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    height: '38px',
                    padding: '0 14px',
                    borderRadius: '9px',
                    border: isFilterActive ? '1px solid #EC168C' : '1px solid #DDE2E8',
                    background: isFilterActive ? '#FFF0F7' : '#FFFFFF',
                    color: isFilterActive ? '#EC168C' : '#172033',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Filter size={14} /> Filter
                </button>

                {/* New Design Primary CTA Button */}
                <button 
                  onClick={() => setStudioSubTab('create')}
                  style={{
                    height: '40px',
                    padding: '0 18px',
                    background: 'linear-gradient(135deg, #EC168C, #8B22D9)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '9px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(236,22,140,0.20)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Plus size={16} /> New Design
                </button>

              </div>
            </div>

            {/* Status Filter Tabs */}
            <div style={{ display: 'flex', gap: '10px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '8px', overflowX: 'auto' }}>
              {[
                { id: 'All Designs', label: 'All Designs' },
                { id: 'In Progress', label: 'In Progress (7)' },
                { id: 'Pending Approval', label: 'Pending Approval (3)' },
                { id: 'Approved', label: 'Approved (5)' },
                { id: 'Completed', label: 'Completed (12)' },
                { id: 'On Hold', label: 'On Hold (2)' }
              ].map(cat => {
                const isActive = selectedCategoryTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryTab(cat.id)}
                    style={{
                      height: '36px',
                      padding: '0 14px',
                      fontSize: '12px',
                      fontWeight: isActive ? 600 : 500,
                      borderRadius: '8px',
                      border: 'none',
                      background: isActive ? '#FFF0F7' : 'transparent',
                      color: isActive ? '#EC168C' : '#475569',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DESIGN CARDS GRID (4 COLUMNS ON DESKTOP) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {studioDesignsList
              .filter(d => selectedCategoryTab === 'All Designs' || d.status === selectedCategoryTab)
              .map(d => {
                const isSelected = selectedDesignId === d.id;
                return (
                  <div 
                    key={d.id}
                    onClick={() => setSelectedDesignId(d.id)}
                    style={{
                      background: cardBg,
                      border: isSelected ? '1.5px solid #EC168C' : `1px solid ${borderColor}`,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: isSelected ? '0 4px 14px rgba(236,22,140,0.12)' : '0 2px 8px rgba(15,23,42,0.04)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ position: 'relative', height: '170px' }}>
                      <img src={d.image} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      
                      {/* Soft Pastel Status Badge */}
                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: d.statusBg,
                        color: d.statusColor,
                        fontSize: '11px',
                        fontWeight: 600,
                        height: '22px',
                        padding: '0 8px',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}>
                        {d.status}
                      </span>

                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255,255,255,0.9)',
                        color: '#172033',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <MoreVertical size={13} />
                      </span>
                    </div>

                    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 650, color: '#172033' }}>{d.title}</h4>
                      <span style={{ fontSize: '12px', color: secTextColor }}>Client: {d.client}</span>
                      <span style={{ fontSize: '11px', color: mutedTextColor }}>{d.version} • {d.updated}</span>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', paddingTop: '8px', borderTop: `1px solid ${borderColor}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: secTextColor }}>
                          <span>👁 {d.views}</span>
                          <span>💬 {d.comments}</span>
                        </div>
                        <strong style={{ fontSize: '14px', color: '#EC168C', fontWeight: 700 }}>{d.price}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* BOTTOM ROW (3 EQUAL COLUMNS) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            
            {/* Col 1 — Recent Drafts */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: textColor }}>Recent Drafts</h4>
                <a href="#drafts" style={{ fontSize: '12px', color: '#EC168C', fontWeight: 600, textDecoration: 'none' }}>View All →</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '10px', borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '12px', color: textColor, display: 'block' }}>Summer Cotton Kurti</strong>
                    <span style={{ fontSize: '11px', color: secTextColor }}>Version 0.2 • Updated 2 days ago</span>
                  </div>
                  <span style={{ fontSize: '11px', background: '#F1F5F9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Draft</span>
                </div>
                <div style={{ padding: '10px', borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '12px', color: textColor, display: 'block' }}>Festive Jacket Design</strong>
                    <span style={{ fontSize: '11px', color: secTextColor }}>Version 0.1 • Updated 5 days ago</span>
                  </div>
                  <span style={{ fontSize: '11px', background: '#F1F5F9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Draft</span>
                </div>
              </div>
            </div>

            {/* Col 2 — Design Collections */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: textColor }}>Design Collections</h4>
                <a href="#collections" style={{ fontSize: '12px', color: '#EC168C', fontWeight: 600, textDecoration: 'none' }}>View All →</a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=150" style={{ width: '100%', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                  <strong style={{ fontSize: '10px', display: 'block', marginTop: '4px', color: textColor }}>Bridal Collection</strong>
                  <span style={{ fontSize: '9px', color: secTextColor }}>12 Designs</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=150" style={{ width: '100%', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                  <strong style={{ fontSize: '10px', display: 'block', marginTop: '4px', color: textColor }}>Sherwani Collection</strong>
                  <span style={{ fontSize: '9px', color: secTextColor }}>8 Designs</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=150" style={{ width: '100%', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                  <strong style={{ fontSize: '10px', display: 'block', marginTop: '4px', color: textColor }}>Party Wear</strong>
                  <span style={{ fontSize: '9px', color: secTextColor }}>15 Designs</span>
                </div>
              </div>
            </div>

            {/* Col 3 — Popular Fabrics */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: textColor }}>Popular Fabrics</h4>
                <a href="#fabrics" style={{ fontSize: '12px', color: '#EC168C', fontWeight: 600, textDecoration: 'none' }}>View All →</a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#D97706' }} />
                  <span><strong>Silk</strong> <span style={{ color: secTextColor }}>(18)</span></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#991B1B' }} />
                  <span><strong>Velvet</strong> <span style={{ color: secTextColor }}>(12)</span></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#0284C7' }} />
                  <span><strong>Net</strong> <span style={{ color: secTextColor }}>(9)</span></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#EC4899' }} />
                  <span><strong>Chiffon</strong> <span style={{ color: secTextColor }}>(7)</span></span>
                </div>
              </div>
            </div>

          </div>

        </main>

        {/* ==================================================================== */}
        {/* 3. RIGHT DETAILS PANEL (280px–310px COMPACT)                        */}
        {/* ==================================================================== */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          
          {/* Design Details Card */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: textColor }}>Design Details</h3>
              <Maximize2 size={14} color={secTextColor} style={{ cursor: 'pointer' }} />
            </div>

            {/* Outfit Preview Image & Meta */}
            <img src={activeDesign.image} alt={activeDesign.title} style={{ width: '100%', height: '170px', borderRadius: '10px', objectFit: 'cover', marginBottom: '12px' }} />
            
            <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 700, color: textColor }}>{activeDesign.title}</h4>
            <div style={{ fontSize: '11px', color: secTextColor, marginBottom: '12px' }}>
              {activeDesign.version} • <span style={{ color: activeDesign.statusColor, fontWeight: 700 }}>● {activeDesign.status}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, marginBottom: '14px' }}>
              <div><strong>Client:</strong> {activeDesign.client}</div>
              <div><strong>Category:</strong> {activeDesign.category}</div>
              <div><strong>Created:</strong> {activeDesign.created}</div>
              <div><strong>Updated:</strong> {activeDesign.updated}</div>
            </div>

            {/* Dynamic Design Progress Bar */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: textColor, marginBottom: '6px' }}>
                <span>Design Progress</span>
                <span style={{ color: '#EC168C' }}>{activeDesign.progress}%</span>
              </div>
              <div style={{ width: '100%', height: '7px', background: '#E9EEF3', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${activeDesign.progress}%`, height: '100%', background: 'linear-gradient(90deg, #EC168C, #8B22D9)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
              </div>

              {/* Milestone Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 600 }}>
                  <Check size={14} /> Concept & Inspiration
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 600 }}>
                  <Check size={14} /> Sketch & Illustration
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 600 }}>
                  <Check size={14} /> Fabric & Color Selection
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 600 }}>
                  <Check size={14} /> Design Finalization
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EC168C', fontWeight: 600 }}>
                  <Circle size={12} fill="#EC168C" color="#EC168C" /> Client Review
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#CBD5E1' }}>
                  <Circle size={12} /> Approved
                </div>
              </div>
            </div>

            {/* Next Step Box */}
            <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, marginBottom: '14px', fontSize: '11px' }}>
              <strong style={{ color: textColor, display: 'block', marginBottom: '2px' }}>Next Step</strong>
              <p style={{ margin: '0 0 4px 0', color: secTextColor }}>{activeDesign.nextStep}</p>
              <span style={{ color: secTextColor }}>Expected review date: <strong style={{ color: '#EC168C' }}>{activeDesign.expectedDate}</strong></span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button style={{
                width: '100%',
                height: '38px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #EC168C, #8B22D9)',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <Edit size={14} /> Edit Design
              </button>
              <button style={{
                width: '100%',
                height: '38px',
                borderRadius: '8px',
                border: '1px solid #DDE2E8',
                background: cardBg,
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <Upload size={14} /> Upload New Version
              </button>
              <button style={{
                width: '100%',
                height: '38px',
                borderRadius: '8px',
                border: '1px solid #DDE2E8',
                background: cardBg,
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <Share2 size={14} /> Share with Client
              </button>
            </div>
          </div>

          {/* AI Design Assistant Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(124, 43, 239, 0.06) 0%, rgba(236, 22, 140, 0.06) 100%)',
            border: '1px solid rgba(124, 43, 239, 0.20)',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(15,23,42,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'rgba(124, 43, 239, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={15} color="#7C2BEF" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: textColor }}>
                  AI Design Assistant
                </h4>
                <span style={{ fontSize: '10px', color: '#7C2BEF', fontWeight: 600 }}>StitchBee Studio AI</span>
              </div>
            </div>

            <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: secTextColor, lineHeight: 1.4 }}>
              Get AI suggestions, color palettes, fabric recommendations and more.
            </p>

            <button 
              onClick={() => onNavigateTab && onNavigateTab('support')} 
              style={{
                width: '100%',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid rgba(124, 43, 239, 0.3)',
                background: cardBg,
                color: '#7C2BEF',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              Open Assistant →
            </button>
          </div>

        </aside>

    </div>
  );
}
