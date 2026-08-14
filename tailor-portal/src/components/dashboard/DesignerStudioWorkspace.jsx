import React, { useState } from 'react';
import { 
  Palette, Plus, FileText, Layers, CheckCircle, Archive, Disc, Lightbulb, 
  HardDrive, Sparkles, Search, Filter, MoreVertical, Eye, MessageSquare, 
  Check, Circle, Clock, Edit, Upload, Share2, Maximize2, ExternalLink, ChevronRight 
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

  // Color Tokens based on Theme
  const isDark = theme === 'dark';
  const cardBg = isDark ? '#131022' : '#ffffff';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB';
  const textColor = isDark ? '#F9FAFB' : '#111827';
  const secTextColor = isDark ? '#98A2B3' : '#64748B';
  const lightBg = isDark ? '#0B0914' : '#F6F7F9';
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : '#ffffff';

  // Sample 8 Design Cards matching user screenshot exactly
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
      statusBg: '#FFF0F6',
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
      statusColor: '#10B981',
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
      statusColor: '#F59E0B',
      statusBg: '#FEF3C7',
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
      statusBg: '#FFF0F6',
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
      statusColor: '#64748B',
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
      statusColor: '#F59E0B',
      statusBg: '#FEF3C7',
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
      statusColor: '#3B82F6',
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
    { id: 'my-designs', label: 'My Designs', icon: <Palette size={16} /> },
    { id: 'create', label: 'Create New Design', icon: <Plus size={16} /> },
    { id: 'requests', label: 'Design Requests', icon: <FileText size={16} />, count: 6 },
    { id: 'drafts', label: 'Drafts', icon: <Layers size={16} />, count: 3 },
    { id: 'published', label: 'Published Designs', icon: <CheckCircle size={16} />, count: 12 },
    { id: 'archived', label: 'Archived Designs', icon: <Archive size={16} />, count: 18 },
    { id: 'collections', label: 'Design Collections', icon: <Disc size={16} /> },
    { id: 'fabric-library', label: 'Fabric Library', icon: <Layers size={16} /> },
    { id: 'inspiration', label: 'Inspiration Board', icon: <Lightbulb size={16} /> }
  ];

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      backgroundColor: lightBg,
      color: textColor,
      width: '100%',
      margin: 0,
      padding: '20px 24px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      
      {/* 3-COLUMN STUDIO LAYOUT: Left Sidebar (230px) -> Center Main Workspace -> Right Panel (320px) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '230px 1fr 320px',
        gap: '20px',
        width: '100%',
        boxSizing: 'border-box',
        alignItems: 'start'
      }}>

        {/* ==================================================================== */}
        {/* 1. LEFT SIDEBAR (EXACT MATCH TO USER SCREENSHOT)                    */}
        {/* ==================================================================== */}
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
          
          {/* Header Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 10px 8px', borderBottom: `1px solid ${borderColor}` }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: textColor }}>Design Studio</h3>
            <span style={{ fontSize: '12px', color: secTextColor, cursor: 'pointer' }}>⇅</span>
          </div>

          {/* Vertical Navigation Options */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
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
                    padding: '9px 12px',
                    borderRadius: '9px',
                    border: 'none',
                    background: isSelected ? (isDark ? 'rgba(236,22,140,0.14)' : '#FFF0F6') : 'transparent',
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
                      background: isSelected ? 'rgba(236,22,140,0.15)' : (isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'),
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
            background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
            border: `1px solid ${borderColor}`,
            borderRadius: '12px',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HardDrive size={15} color="#EC168C" />
                <span style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Storage Used</span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: secTextColor }}>25%</span>
            </div>
            <div style={{ fontSize: '11px', color: secTextColor, marginBottom: '8px', fontWeight: 500 }}>
              12.6 GB of 50 GB used
            </div>
            <ProgressBar value={25.2} color="#EC168C" height={5} />
            <button style={{
              width: '100%',
              marginTop: '10px',
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              background: '#FFF0F6',
              color: '#EC168C',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              👑 Upgrade Storage
            </button>
          </div>

          {/* Quick Tips Card */}
          <div style={{
            background: 'rgba(124, 58, 237, 0.05)',
            border: '1px solid rgba(124, 58, 237, 0.15)',
            borderRadius: '12px',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Sparkles size={14} color="#7C3AED" />
              <strong style={{ fontSize: '12px', color: '#7C3AED' }}>Quick Tips</strong>
            </div>
            <p style={{ margin: '0 0 6px 0', fontSize: '11px', color: secTextColor, lineHeight: 1.4 }}>
              Organize your designs into collections to manage them easily.
            </p>
            <a href="#learn" style={{ fontSize: '11px', color: '#EC168C', fontWeight: 600, textDecoration: 'none' }}>
              Learn More →
            </a>
          </div>

        </aside>

        {/* ==================================================================== */}
        {/* 2. CENTER MAIN WORKSPACE (EXACT MATCH TO USER SCREENSHOT)          */}
        {/* ==================================================================== */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
          
          {/* Header Title, Search, Filter & + New Design Button */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: textColor }}>My Designs</h1>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: secTextColor }}>
                  Manage all your design projects in one place.
                </p>
              </div>

              {/* Search Bar, Filter & + New Design Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  background: isDark ? 'rgba(255,255,255,0.05)' : '#F8FAFC',
                  width: '260px'
                }}>
                  <Search size={14} color={secTextColor} />
                  <input 
                    type="text" 
                    placeholder="Search designs by name, client, category..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', color: textColor, width: '100%' }}
                  />
                </div>

                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  background: cardBg,
                  color: textColor,
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  <Filter size={14} /> Filter
                </button>

                <button 
                  onClick={() => setStudioSubTab('create')}
                  style={{
                    background: 'linear-gradient(135deg, #EC168C 0%, #7C3AED 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '9px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(236, 22, 140, 0.25)'
                  }}
                >
                  <Plus size={16} /> New Design
                </button>
              </div>
            </div>

            {/* Category Underline Sub-Filter Pills */}
            <div style={{ display: 'flex', gap: '12px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px', overflowX: 'auto' }}>
              {[
                { id: 'All Designs', label: 'All Designs' },
                { id: 'In Progress', label: 'In Progress (7)' },
                { id: 'Pending Approval', label: 'Pending Approval (3)' },
                { id: 'Approved', label: 'Approved (5)' },
                { id: 'Completed', label: 'Completed (12)' },
                { id: 'On Hold', label: 'On Hold (2)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryTab(cat.id)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '13px',
                    fontWeight: selectedCategoryTab === cat.id ? 700 : 500,
                    borderRadius: '20px',
                    border: 'none',
                    background: selectedCategoryTab === cat.id ? (isDark ? 'rgba(236,22,140,0.2)' : '#FFF0F6') : 'transparent',
                    color: selectedCategoryTab === cat.id ? '#EC168C' : secTextColor,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 8 OUTFIT DESIGN CARDS (4 COLUMNS x 2 ROWS) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {studioDesignsList
              .filter(d => selectedCategoryTab === 'All Designs' || d.status === selectedCategoryTab)
              .map(d => (
                <div 
                  key={d.id}
                  onClick={() => setSelectedDesignId(d.id)}
                  style={{
                    background: cardBg,
                    border: selectedDesignId === d.id ? '2px solid #EC168C' : `1px solid ${borderColor}`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: selectedDesignId === d.id ? '0 4px 16px rgba(236,22,140,0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ position: 'relative', height: '180px' }}>
                    <img src={d.image} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: d.statusBg,
                      color: d.statusColor,
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {d.status}
                    </span>
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(255,255,255,0.9)',
                      color: '#111827',
                      fontSize: '11px',
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

                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: textColor }}>{d.title}</h4>
                    <span style={{ fontSize: '11px', color: secTextColor }}>Client: {d.client}</span>
                    <span style={{ fontSize: '11px', color: secTextColor }}>{d.version} • {d.updated}</span>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', paddingTop: '8px', borderTop: `1px solid ${borderColor}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: secTextColor }}>
                        <span>👁 {d.views}</span>
                        <span>💬 {d.comments}</span>
                      </div>
                      <strong style={{ fontSize: '13px', color: '#EC168C', fontWeight: 700 }}>{d.price}</strong>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* BOTTOM ROW (3 EQUAL COLUMNS: Recent Drafts, Design Collections, Popular Fabrics) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            
            {/* Col 1 — Recent Drafts */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: textColor }}>Recent Drafts</h4>
                <a href="#drafts" style={{ fontSize: '11px', color: '#EC168C', fontWeight: 600, textDecoration: 'none' }}>View All →</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '10px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '12px', color: textColor, display: 'block' }}>Summer Cotton Kurti</strong>
                    <span style={{ fontSize: '10px', color: secTextColor }}>Version 0.2 • Updated 2 days ago</span>
                  </div>
                  <span style={{ fontSize: '10px', background: '#F1F5F9', color: '#64748B', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Draft</span>
                </div>
                <div style={{ padding: '10px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '12px', color: textColor, display: 'block' }}>Festive Jacket Design</strong>
                    <span style={{ fontSize: '10px', color: secTextColor }}>Version 0.1 • Updated 5 days ago</span>
                  </div>
                  <span style={{ fontSize: '10px', background: '#F1F5F9', color: '#64748B', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Draft</span>
                </div>
              </div>
            </div>

            {/* Col 2 — Design Collections */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: textColor }}>Design Collections</h4>
                <a href="#collections" style={{ fontSize: '11px', color: '#EC168C', fontWeight: 600, textDecoration: 'none' }}>View All →</a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=150" style={{ width: '100%', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                  <strong style={{ fontSize: '10px', display: 'block', marginTop: '4px', color: textColor }}>Bridal Collection</strong>
                  <span style={{ fontSize: '9px', color: secTextColor }}>12 Designs</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=150" style={{ width: '100%', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                  <strong style={{ fontSize: '10px', display: 'block', marginTop: '4px', color: textColor }}>Sherwani Collection</strong>
                  <span style={{ fontSize: '9px', color: secTextColor }}>8 Designs</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=150" style={{ width: '100%', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                  <strong style={{ fontSize: '10px', display: 'block', marginTop: '4px', color: textColor }}>Party Wear</strong>
                  <span style={{ fontSize: '9px', color: secTextColor }}>15 Designs</span>
                </div>
              </div>
            </div>

            {/* Col 3 — Popular Fabrics */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: textColor }}>Popular Fabrics</h4>
                <a href="#fabrics" style={{ fontSize: '11px', color: '#EC168C', fontWeight: 600, textDecoration: 'none' }}>View All →</a>
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
        {/* 3. RIGHT PANEL (DESIGN DETAILS, PROGRESS, ACTIONS & AI ASSISTANT)   */}
        {/* ==================================================================== */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          
          {/* Design Details Card */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>Design Details</h3>
              <Maximize2 size={14} color={secTextColor} style={{ cursor: 'pointer' }} />
            </div>

            {/* Outfit Preview Image & Meta */}
            <img src={activeDesign.image} alt={activeDesign.title} style={{ width: '100%', height: '180px', borderRadius: '12px', objectFit: 'cover', marginBottom: '12px' }} />
            
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>{activeDesign.title}</h4>
            <div style={{ fontSize: '11px', color: secTextColor, marginBottom: '12px' }}>
              {activeDesign.version} • <span style={{ color: activeDesign.statusColor, fontWeight: 700 }}>● {activeDesign.status}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${borderColor}`, marginBottom: '16px' }}>
              <div><strong>Client:</strong> {activeDesign.client}</div>
              <div><strong>Category:</strong> {activeDesign.category}</div>
              <div><strong>Created:</strong> {activeDesign.created}</div>
              <div><strong>Updated:</strong> {activeDesign.updated}</div>
            </div>

            {/* Design Progress & Checklist */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: textColor, marginBottom: '6px' }}>
                <span>Design Progress</span>
                <span style={{ color: '#EC168C' }}>{activeDesign.progress}%</span>
              </div>
              <ProgressBar value={activeDesign.progress} color="#EC168C" height={6} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', fontSize: '11px' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EC168C', fontWeight: 700 }}>
                  <Circle size={14} fill="#EC168C" /> Client Review
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: secTextColor }}>
                  <Circle size={14} /> Approved
                </div>
              </div>
            </div>

            {/* Next Step Box */}
            <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${borderColor}`, marginBottom: '16px', fontSize: '11px' }}>
              <strong style={{ color: textColor, display: 'block', marginBottom: '2px' }}>Next Step</strong>
              <p style={{ margin: '0 0 4px 0', color: secTextColor }}>{activeDesign.nextStep}</p>
              <span style={{ color: secTextColor }}>Expected review date: <strong style={{ color: '#EC168C' }}>{activeDesign.expectedDate}</strong></span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button style={{
                width: '100%',
                padding: '9px 14px',
                borderRadius: '9px',
                border: 'none',
                background: 'linear-gradient(135deg, #EC168C 0%, #7C3AED 100%)',
                color: '#ffffff',
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
                padding: '8px 14px',
                borderRadius: '9px',
                border: `1px solid ${borderColor}`,
                background: cardBg,
                color: textColor,
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
                padding: '8px 14px',
                borderRadius: '9px',
                border: `1px solid ${borderColor}`,
                background: cardBg,
                color: textColor,
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
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(236, 22, 140, 0.08) 100%)',
            border: '1px solid rgba(124, 58, 237, 0.25)',
            borderRadius: '16px',
            padding: '18px',
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(124, 58, 237, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={16} color="#7C3AED" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: textColor }}>
                  AI Design Assistant
                </h4>
                <span style={{ fontSize: '10px', color: '#7C3AED', fontWeight: 600 }}>StitchBee Studio AI</span>
              </div>
            </div>

            <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: secTextColor, lineHeight: 1.5 }}>
              Get AI suggestions, color palettes, fabric recommendations and more.
            </p>

            <button 
              onClick={() => onNavigateTab && onNavigateTab('support')} 
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                background: cardBg,
                color: '#7C3AED',
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

    </div>
  );
}
