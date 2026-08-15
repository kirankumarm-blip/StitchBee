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

  // Exact Design System Color Tokens for Light & Dark Mode
  const isDark = theme === 'dark';
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E5E7EB';
  const textColor = isDark ? '#F9FAFB' : '#172033';
  const secTextColor = isDark ? '#A0AEC0' : '#64748B';
  const mutedTextColor = isDark ? '#718096' : '#94A3B8';
  const lightBg = isDark ? '#0D0A1A' : '#F7F8FA';
  const inputBg = isDark ? '#231D34' : '#FFFFFF';
  const itemHoverBg = isDark ? 'rgba(255, 255, 255, 0.05)' : '#F8FAFC';

  // Sample 8 Outfit Design Cards
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
      statusBg: isDark ? 'rgba(236,22,140,0.2)' : '#FFF0F7',
      image: '/images/designs/royal bridal lehenga.jpg',
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
      statusBg: isDark ? 'rgba(124,58,237,0.2)' : '#F3E8FF',
      image: '/images/designs/velvet shervani.jpg',
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
      statusBg: isDark ? 'rgba(5,150,105,0.2)' : '#ECFDF5',
      image: '/images/designs/zardoni silk anarkali.jpg',
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
      statusBg: isDark ? 'rgba(217,119,6,0.2)' : '#FFF7ED',
      image: '/images/designs/chanderi silk saree.jpg',
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
      statusBg: isDark ? 'rgba(236,22,140,0.2)' : '#FFF0F7',
      image: '/images/designs/reception gown.jpg',
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
      statusColor: isDark ? '#A0AEC0' : '#475569',
      statusBg: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
      image: '/images/designs/men kurta set.jpg',
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
      statusBg: isDark ? 'rgba(217,119,6,0.2)' : '#FFF7ED',
      image: '/images/designs/pastel lehenga.jpg',
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
      statusBg: isDark ? 'rgba(37,99,235,0.2)' : '#EFF6FF',
      image: '/images/designs/kids party wear.jpg',
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
    <div className="designer-studio-workspace-container" style={{
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: lightBg,
      color: textColor,
      width: '100%',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      minHeight: 'calc(100vh - 64px)'
    }}>

      {/* Embedded Responsive & Dark Mode Styles */}
      <style>{`
        .designer-studio-grid-layout {
          display: grid;
          grid-template-columns: 230px minmax(0, 1fr) 350px;
          gap: 20px;
          align-items: stretch;
          width: 100%;
          box-sizing: border-box;
        }

        .studio-outfit-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          width: 100%;
        }

        .bottom-three-cols-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          width: 100%;
        }

        .studio-left-sidebar-aside {
          width: 230px;
        }

        .studio-right-details-aside {
          width: 350px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1280px) {
          .designer-studio-grid-layout {
            grid-template-columns: 220px minmax(0, 1fr) 320px;
            gap: 16px;
          }
          .studio-left-sidebar-aside {
            width: 220px;
          }
          .studio-right-details-aside {
            width: 320px;
          }
          .studio-outfit-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .designer-studio-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 0 16px !important;
          }
          .studio-left-sidebar-aside {
            width: 100% !important;
            min-height: auto !important;
            border-right: none !important;
            border-bottom: 1px solid ${borderColor} !important;
            padding: 16px !important;
          }
          .studio-right-details-aside {
            width: 100% !important;
            padding-right: 0 !important;
            padding-top: 0 !important;
          }
          .studio-outfit-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bottom-three-cols-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .designer-studio-grid-layout {
            padding: 0 12px !important;
          }
          .studio-outfit-cards-grid {
            grid-template-columns: repeat(1, 1fr) !important;
          }
          .studio-search-bar-wrapper {
            width: 100% !important;
            flex: 1 1 100% !important;
          }
        }
      `}</style>
      
      <div className="designer-studio-grid-layout">
        
        {/* ==================================================================== */}
        {/* 1. LEFT SIDEBAR (FLUSH TO EXTREME LEFT SCREEN EDGE, FULL HEIGHT)    */}
        {/* ==================================================================== */}
        <aside className="studio-left-sidebar-aside" style={{
          background: cardBg,
          borderRight: `1px solid ${borderColor}`,
          borderRadius: '0',
          padding: '20px 16px',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          width: '230px',
          minHeight: 'calc(100vh - 64px)',
          boxSizing: 'border-box'
        }}>
            
            {/* Sidebar Section Title */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', marginBottom: '18px', borderBottom: `1px solid ${borderColor}` }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, lineHeight: '20px', color: textColor }}>Design Studio</h3>
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
                      height: '38px',
                      padding: '0 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isSelected ? (isDark ? 'rgba(236,22,140,0.18)' : '#FFF0F7') : 'transparent',
                      color: isSelected ? '#EC168C' : textColor,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', width: '16px', color: isSelected ? '#EC168C' : secTextColor }}>
                        {item.icon}
                      </span>
                      <span style={{ fontSize: '13px', lineHeight: '18px', color: isSelected ? '#EC168C' : textColor, fontWeight: 600 }}>
                        {item.label}
                      </span>
                    </div>
                    {item.count !== undefined && (
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '2px 7px',
                        borderRadius: '10px',
                        background: isDark ? 'rgba(236,22,140,0.2)' : '#FFF0F7',
                        color: '#EC168C'
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
              marginTop: '26px',
              background: itemHoverBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '10px',
              padding: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <HardDrive size={14} color="#EC168C" />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Storage Used</span>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#EC168C' }}>25%</span>
              </div>
              <div style={{ fontSize: '10px', fontWeight: 400, lineHeight: '15px', color: secTextColor, marginBottom: '8px' }}>
                12.6 GB of 50 GB used
              </div>
              <ProgressBar value={25.2} color="#EC168C" height={4} />
              <button style={{
                width: '100%',
                height: '34px',
                marginTop: '10px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #EC168C, #8B22D9)',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                boxShadow: '0 2px 8px rgba(236,22,140,0.22)'
              }}>
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>👑 Upgrade Storage</span>
              </button>
            </div>

            {/* Quick Tips Card */}
            <div style={{
              marginTop: '16px',
              background: isDark ? 'rgba(124, 43, 239, 0.12)' : 'rgba(124, 43, 239, 0.05)',
              border: '1px solid rgba(124, 43, 239, 0.25)',
              borderRadius: '10px',
              padding: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Sparkles size={14} color="#7C2BEF" />
                <strong style={{ fontSize: '12px', color: '#7C2BEF', fontWeight: 600 }}>Quick Tips</strong>
              </div>
              <p style={{ margin: '0 0 6px 0', fontSize: '10px', fontWeight: 400, lineHeight: '15px', color: secTextColor }}>
                Organize your designs into collections to manage them easily.
              </p>
              <a href="#learn" style={{ fontSize: '10px', color: '#EC168C', fontWeight: 600, textDecoration: 'none' }}>
                Learn More →
              </a>
            </div>

        </aside>

        {/* ==================================================================== */}
        {/* 2. CENTER CONTENT (MY DESIGNS WORKSPACE - SPANNING 100% WIDTH)       */}
        {/* ==================================================================== */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0, paddingTop: '20px', paddingBottom: '20px' }}>
          
          {/* Header Row: Title & Subtitle on left, Search/Filter/New Design on right */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '4px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: textColor, lineHeight: 1.2 }}>My Designs</h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: secTextColor }}>
                Manage all your design projects in one place.
              </p>
            </div>

            {/* Search Box, Filter Button & New Design Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              
              {/* Search Box */}
              <div 
                className="studio-search-bar-wrapper"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 14px',
                  height: '40px',
                  borderRadius: '9px',
                  border: isSearchFocused ? '1px solid #EC168C' : `1px solid ${borderColor}`,
                  boxShadow: isSearchFocused ? '0 0 0 3px rgba(236,22,140,0.12)' : 'none',
                  background: inputBg,
                  flex: '1 1 220px',
                  minWidth: '180px',
                  maxWidth: '100%',
                  transition: 'all 0.15s ease'
                }}
              >
                <Search size={15} color={mutedTextColor} />
                <input 
                  type="text" 
                  placeholder="Search designs by name, client, category..."
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', color: textColor, width: '100%' }}
                />
              </div>

              {/* Filter Button */}
              <button 
                onClick={() => setIsFilterActive(!isFilterActive)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  height: '40px',
                  padding: '0 16px',
                  borderRadius: '9px',
                  border: isFilterActive ? '1px solid #EC168C' : `1px solid ${borderColor}`,
                  background: isFilterActive ? (isDark ? 'rgba(236,22,140,0.18)' : '#FFF0F7') : inputBg,
                  color: isFilterActive ? '#EC168C' : textColor,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Filter size={14} color={isFilterActive ? '#EC168C' : textColor} /> Filter
              </button>

              {/* New Design Primary CTA Button (WHITE TEXT BY DEFAULT) */}
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
                  boxShadow: '0 4px 14px rgba(236,22,140,0.22)',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Plus size={16} color="#FFFFFF" /> <span style={{ color: '#FFFFFF', fontWeight: 600 }}>New Design</span>
              </button>

            </div>
          </div>

          {/* MAIN WORKSPACE CARD CONTAINER (FILLS 100% WIDTH - ZERO RIGHT SIDE GAP) */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
            boxSizing: 'border-box'
          }}>

            {/* Status Filter Tabs with Pink Underline Bar for Active Tab */}
            <div className="studio-subtabs-bar" style={{ display: 'flex', gap: '16px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '0px', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {[
                { id: 'All Designs', label: 'All Designs' },
                { id: 'In Progress', label: 'In Progress', count: 7 },
                { id: 'Pending Approval', label: 'Pending Approval', count: 3 },
                { id: 'Approved', label: 'Approved', count: 5 },
                { id: 'Completed', label: 'Completed', count: 12 },
                { id: 'On Hold', label: 'On Hold', count: 2 }
              ].map(cat => {
                const isActive = selectedCategoryTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryTab(cat.id)}
                    style={{
                      height: '38px',
                      padding: '0 4px 10px 4px',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 500,
                      border: 'none',
                      borderBottom: isActive ? '3px solid #EC168C' : '3px solid transparent',
                      background: 'transparent',
                      color: isActive ? '#EC168C' : secTextColor,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                  >
                    <span style={{ color: isActive ? '#EC168C' : (isDark ? '#CBD5E1' : '#475569'), fontWeight: isActive ? 700 : 500, whiteSpace: 'nowrap' }}>
                      {cat.label}
                    </span>
                    {cat.count !== undefined && (
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: isActive ? (isDark ? 'rgba(236,22,140,0.25)' : 'rgba(236,22,140,0.12)') : (isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9'),
                        color: isActive ? '#EC168C' : (isDark ? '#CBD5E1' : '#475569')
                      }}>
                        {cat.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* DESIGN CARDS GRID (EVENLY DISTRIBUTED 4-COLUMNS - FILLING 100% WIDTH) */}
            <div className="studio-outfit-cards-grid">
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
                        borderRadius: '14px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        boxShadow: isSelected ? '0 4px 14px rgba(236,22,140,0.18)' : '0 2px 8px rgba(15,23,42,0.04)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ position: 'relative', height: '340px', width: '100%', overflow: 'hidden' }}>
                        <img src={d.image} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                        
                        {/* Soft Pastel Status Badge */}
                        <span style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: d.statusBg,
                          color: d.statusColor,
                          fontSize: '11px',
                          fontWeight: 600,
                          height: '24px',
                          padding: '0 10px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                          {d.status}
                        </span>

                        <span style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: isDark ? 'rgba(19, 16, 34, 0.85)' : 'rgba(255,255,255,0.9)',
                          color: textColor,
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                          <MoreVertical size={13} color={textColor} />
                        </span>
                      </div>

                      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>{d.title}</h4>
                        <span style={{ fontSize: '13px', color: secTextColor }}>Client: {d.client}</span>
                        <span style={{ fontSize: '12px', color: mutedTextColor }}>{d.version} • {d.updated}</span>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', paddingTop: '8px', borderTop: `1px solid ${borderColor}` }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: secTextColor }}>
                            <span>👁 {d.views}</span>
                            <span>💬 {d.comments}</span>
                          </div>
                          <strong style={{ fontSize: '15px', color: '#EC168C', fontWeight: 700 }}>{d.price}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

          </div>

          {/* BOTTOM ROW (3 EQUAL COLUMNS - FILLING 100% WIDTH) */}
          <div className="bottom-three-cols-grid">
            
            {/* Col 1 — Recent Drafts */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>Recent Drafts</h4>
                <a href="#drafts" style={{ fontSize: '12px', color: textColor, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View All →</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px', borderRadius: '12px', background: itemHoverBg, border: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src="/images/designs/pastel lehenga.jpg" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ fontSize: '13px', fontWeight: 700, color: textColor, display: 'block' }}>Summer Cotton Kurti</strong>
                      <span style={{ fontSize: '11px', color: secTextColor }}>Version 0.2 • Updated 2 days ago</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', background: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9', color: isDark ? '#CBD5E1' : '#475569', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>Draft</span>
                </div>
                <div style={{ padding: '12px', borderRadius: '12px', background: itemHoverBg, border: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src="/images/designs/men kurta set.jpg" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ fontSize: '13px', fontWeight: 700, color: textColor, display: 'block' }}>Festive Jacket Design</strong>
                      <span style={{ fontSize: '11px', color: secTextColor }}>Version 0.1 • Updated 5 days ago</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', background: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9', color: isDark ? '#CBD5E1' : '#475569', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>Draft</span>
                </div>
              </div>
            </div>

            {/* Col 2 — Design Collections (LARGER IMAGE THUMBNAILS) */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>Design Collections</h4>
                <a href="#collections" style={{ fontSize: '12px', color: textColor, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View All →</a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div style={{ background: itemHoverBg, padding: '12px', borderRadius: '12px', border: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ fontSize: '13px', fontWeight: 700, display: 'block', color: textColor }}>Bridal Collection</strong>
                    <span style={{ fontSize: '11px', color: secTextColor }}>12 Designs</span>
                  </div>
                  <img src="/images/designs/royal bridal lehenga.jpg" style={{ width: '100%', height: '115px', borderRadius: '10px', objectFit: 'cover', marginTop: '10px' }} />
                </div>
                <div style={{ background: itemHoverBg, padding: '12px', borderRadius: '12px', border: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ fontSize: '13px', fontWeight: 700, display: 'block', color: textColor }}>Sherwani Collection</strong>
                    <span style={{ fontSize: '11px', color: secTextColor }}>8 Designs</span>
                  </div>
                  <img src="/images/designs/velvet shervani.jpg" style={{ width: '100%', height: '115px', borderRadius: '10px', objectFit: 'cover', marginTop: '10px' }} />
                </div>
                <div style={{ background: itemHoverBg, padding: '12px', borderRadius: '12px', border: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ fontSize: '13px', fontWeight: 700, display: 'block', color: textColor }}>Party Wear</strong>
                    <span style={{ fontSize: '11px', color: secTextColor }}>15 Designs</span>
                  </div>
                  <img src="/images/designs/reception gown.jpg" style={{ width: '100%', height: '115px', borderRadius: '10px', objectFit: 'cover', marginTop: '10px' }} />
                </div>
              </div>
            </div>

            {/* Col 3 — Popular Fabrics (INCREASED SWATCH SIZE TO 46px x 46px) */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>Popular Fabrics</h4>
                <a href="#fabrics" style={{ fontSize: '12px', color: textColor, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View All →</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src="/images/fabrics/silk.jpg" alt="Silk" style={{ width: '46px', height: '46px', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>Silk</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: secTextColor }}>18 Designs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src="/images/fabrics/velvet.jpg" alt="Velvet" style={{ width: '46px', height: '46px', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>Velvet</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: secTextColor }}>12 Designs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src="/images/fabrics/net.jpg" alt="Net" style={{ width: '46px', height: '46px', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>Net</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: secTextColor }}>9 Designs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src="/images/fabrics/chiffon.jpg" alt="Chiffon" style={{ width: '46px', height: '46px', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>Chiffon</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: secTextColor }}>7 Designs</span>
                </div>
              </div>
            </div>

          </div>

        </main>

        {/* ==================================================================== */}
        {/* 3. RIGHT DETAILS PANEL (350px WIDE)                                 */}
        {/* ==================================================================== */}
        <aside className="studio-right-details-aside" style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '350px', paddingTop: '20px', paddingRight: '24px', paddingBottom: '20px', boxSizing: 'border-box' }}>
          
          {/* Design Details Card */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: textColor }}>Design Details</h3>
              <Maximize2 size={14} color={secTextColor} style={{ cursor: 'pointer' }} />
            </div>

            {/* Top Row: Thumbnail Image on Left + Title & Metadata on Right */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <img src={activeDesign.image} alt={activeDesign.title} style={{ width: '105px', height: '135px', borderRadius: '10px', objectFit: 'cover', objectPosition: 'center top', flexShrink: 0 }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>{activeDesign.title}</h4>
                <div style={{ fontSize: '11px', color: secTextColor, marginBottom: '4px' }}>
                  {activeDesign.version} • <span style={{ color: activeDesign.statusColor, fontWeight: 700 }}>● {activeDesign.status}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '11px', color: secTextColor }}>
                  <div><strong>Client:</strong> {activeDesign.client}</div>
                  <div><strong>Category:</strong> {activeDesign.category}</div>
                  <div><strong>Created:</strong> {activeDesign.created}</div>
                  <div><strong>Updated:</strong> {activeDesign.updated}</div>
                </div>
              </div>
            </div>

            {/* Dynamic Design Progress Bar */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: textColor, marginBottom: '6px' }}>
                <span>Design Progress</span>
                <span style={{ color: '#EC168C' }}>{activeDesign.progress}%</span>
              </div>
              <div style={{ width: '100%', height: '7px', background: isDark ? 'rgba(255,255,255,0.1)' : '#E9EEF3', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${activeDesign.progress}%`, height: '100%', background: 'linear-gradient(90deg, #EC168C, #8B22D9)', borderRadius: '999px', transition: 'width 0.4s ease' }} />
              </div>

              {/* Milestone Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', fontSize: '12px' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isDark ? '#4A5568' : '#CBD5E1' }}>
                  <Circle size={12} /> Approved
                </div>
              </div>
            </div>

            {/* Next Step Box */}
            <div style={{ background: itemHoverBg, padding: '10px 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, marginBottom: '16px', fontSize: '11px' }}>
              <strong style={{ color: textColor, display: 'block', marginBottom: '3px' }}>Next Step</strong>
              <p style={{ margin: '0 0 4px 0', color: secTextColor }}>{activeDesign.nextStep}</p>
              <span style={{ color: secTextColor }}>Expected review date: <strong style={{ color: '#EC168C', fontWeight: 600 }}>{activeDesign.expectedDate}</strong></span>
            </div>

            {/* Action Buttons (WHITE TEXT BY DEFAULT ON GRADIENT/PRIMARY BUTTONS) */}
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
                gap: '6px',
                boxShadow: '0 4px 12px rgba(236,22,140,0.22)'
              }}>
                <Edit size={14} color="#FFFFFF" /> <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Edit Design</span>
              </button>
              <button style={{
                width: '100%',
                height: '38px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                background: isDark ? '#231D34' : '#FFFFFF',
                color: textColor,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <Upload size={14} color={textColor} /> <span>Upload New Version</span>
              </button>
              <button style={{
                width: '100%',
                height: '38px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                background: isDark ? '#231D34' : '#FFFFFF',
                color: textColor,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <Share2 size={14} color={textColor} /> <span>Share with Client</span>
              </button>
            </div>
          </div>

          {/* AI Design Assistant Card */}
          <div style={{
            background: isDark 
              ? 'linear-gradient(135deg, rgba(124, 43, 239, 0.15) 0%, rgba(236, 22, 140, 0.15) 100%)' 
              : 'linear-gradient(135deg, rgba(124, 43, 239, 0.05) 0%, rgba(236, 22, 140, 0.05) 100%)',
            border: isDark ? '1px solid rgba(124, 43, 239, 0.35)' : '1px solid rgba(124, 43, 239, 0.18)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(124, 43, 239, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={16} color="#7C2BEF" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: textColor }}>
                  AI Design Assistant
                </h4>
                <span style={{ fontSize: '10px', color: '#7C2BEF', fontWeight: 600 }}>StitchBee Studio AI</span>
              </div>
            </div>

            <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: secTextColor, lineHeight: 1.4, maxWidth: '220px' }}>
              Get AI suggestions, color palettes, fabric recommendations and more.
            </p>

            <button 
              onClick={() => onNavigateTab && onNavigateTab('support')} 
              style={{
                width: 'auto',
                padding: '0 16px',
                height: '34px',
                borderRadius: '8px',
                border: '1px solid rgba(124, 43, 239, 0.3)',
                background: isDark ? '#231D34' : cardBg,
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

            {/* Decorative Sparkles */}
            <div style={{ position: 'absolute', right: '12px', bottom: '12px', opacity: 0.8, color: '#7C2BEF', pointerEvents: 'none' }}>
              <Sparkles size={42} color="#7C2BEF" style={{ opacity: 0.4 }} />
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
