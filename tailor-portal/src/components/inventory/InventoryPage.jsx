import React, { useState } from 'react';
import { 
  Package, Layers, Scissors, Sparkles, AlertTriangle, Plus, 
  Search, Filter, MoreVertical, ChevronLeft, ChevronRight, 
  CircleDot, CheckCircle2, RefreshCw, ArrowUpRight, ArrowDownRight, Tag, ArrowRight
} from 'lucide-react';

export default function InventoryPage({ theme, onRequestMaterial }) {
  // State for inventory list & form inputs
  const [stockList, setStockList] = useState([
    {
      id: 'MAT-101',
      name: 'Peach Net Silk Fabric',
      category: 'Fabric Rolls',
      quantity: 45,
      unit: 'meters',
      addedOn: '11 Jun 2026',
      addedBy: 'Master Rajesh',
      status: 'Low Stock',
      avatar: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'MAT-102',
      name: 'Gold Zari Thread Spools',
      category: 'Thread Spools',
      quantity: 350,
      unit: 'spools',
      addedOn: '10 Jun 2026',
      addedBy: 'Kavitha (Staff)',
      status: 'In Stock',
      avatar: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'MAT-103',
      name: 'Antique Metal Zippers 12"',
      category: 'Accessories',
      quantity: 120,
      unit: 'pieces',
      addedOn: '09 Jun 2026',
      addedBy: 'Master Rajesh',
      status: 'In Stock',
      avatar: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'MAT-104',
      name: 'Royal Pearl Designer Buttons',
      category: 'Designer Buttons',
      quantity: 850,
      unit: 'pieces',
      addedOn: '08 Jun 2026',
      addedBy: 'Ramesh (Cutter)',
      status: 'In Stock',
      avatar: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'MAT-105',
      name: 'Embroidered Mirror Laces',
      category: 'Laces & Trims',
      quantity: 0,
      unit: 'yards',
      addedOn: '05 Jun 2026',
      addedBy: 'Master Rajesh',
      status: 'Out of Stock',
      avatar: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=200'
    }
  ]);

  // Form State
  const [newCategory, setNewCategory] = useState('Fabric Rolls');
  const [newName, setNewName] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newUnit, setNewUnit] = useState('meters');

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Add stock handler
  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newName || !newQty) return;

    const qtyNum = parseInt(newQty, 10);
    const newEntry = {
      id: `MAT-${100 + stockList.length + 1}`,
      name: newName,
      category: newCategory,
      quantity: qtyNum,
      unit: newUnit,
      addedOn: 'Today',
      addedBy: 'Master Rajesh',
      status: qtyNum === 0 ? 'Out of Stock' : (qtyNum < 50 ? 'Low Stock' : 'In Stock'),
      avatar: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=200'
    };

    setStockList([newEntry, ...stockList]);
    setNewName('');
    setNewQty('');
    alert(`Successfully added ${newEntry.name} (${qtyNum} ${newUnit}) to inventory!`);
  };

  // Quick Restock handler
  const handleQuickRestock = (id, addAmount = 20) => {
    setStockList(prev => prev.map(item => {
      if (item.id === id) {
        const updatedQty = item.quantity + addAmount;
        return {
          ...item,
          quantity: updatedQty,
          status: updatedQty < 50 ? 'Low Stock' : 'In Stock'
        };
      }
      return item;
    }));
  };

  // Filtered List
  const filteredStock = stockList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === 'All') return true;
    return item.status === statusFilter;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredStock.length / pageSize) || 1;
  const paginatedStock = filteredStock.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Status Badge Component
  const renderStatusBadge = (status) => {
    if (status === 'In Stock') {
      return (
        <span style={{ fontSize: '11px', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          ● In Stock
        </span>
      );
    }
    if (status === 'Low Stock') {
      return (
        <span style={{ fontSize: '11px', fontWeight: 600, background: 'rgba(245,158,11,0.1)', color: '#F59E0B', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          ▲ Low Stock
        </span>
      );
    }
    return (
      <span style={{ fontSize: '11px', fontWeight: 600, background: 'rgba(239,68,68,0.1)', color: '#EF4444', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        ✖ Out of Stock
      </span>
    );
  };

  // Category Color Resolver
  const getCategoryBadgeStyle = (category) => {
    if (category === 'Fabric Rolls') return { bg: 'rgba(247,37,133,0.08)', color: '#F72585' };
    if (category === 'Thread Spools') return { bg: 'rgba(139,18,201,0.08)', color: '#8B12C9' };
    if (category === 'Accessories') return { bg: 'rgba(16,185,129,0.08)', color: '#10B981' };
    if (category === 'Designer Buttons') return { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B' };
    return { bg: 'rgba(14,165,233,0.08)', color: '#0EA5E9' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      
      {/* 1. PAGE HEADER (BELOW TOP NAVIGATION BAR) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, lineHeight: '32px', color: theme === 'dark' ? '#ffffff' : '#172033' }}>
            Inventory Stock Manager
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#64748B' }}>
            Track, manage and update all your tailoring materials and stock levels.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setStatusFilter(statusFilter === 'Low Stock' ? 'All' : 'Low Stock')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '8px',
              border: statusFilter === 'Low Stock' ? '1px solid #F59E0B' : (theme === 'dark' ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E5E7EB'),
              background: statusFilter === 'Low Stock' ? 'rgba(245,158,11,0.1)' : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'),
              color: statusFilter === 'Low Stock' ? '#F59E0B' : (theme === 'dark' ? '#ffffff' : '#172033'),
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <AlertTriangle size={15} color="#F59E0B" /> Low Stock Alerts (1)
          </button>

          <button
            onClick={onRequestMaterial}
            className="btn-text-white-force"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #F72585 0%, #8B12C9 100%)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(247,37,133,0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            <Plus size={16} /> Request Material from Admin
          </button>
        </div>
      </div>

      {/* 2. INVENTORY SUMMARY CARDS (ROW OF 4 EQUAL-WIDTH CARDS) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* CARD 1: Thread Spools */}
        <div style={{
          background: theme === 'dark' ? '#141126' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          height: '160px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          boxSizing: 'border-box'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(247,37,133,0.1)', color: '#F72585', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scissors size={18} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '2px 8px', borderRadius: '4px' }}>
                Good
              </span>
            </div>

            <div style={{ marginTop: '12px' }}>
              <strong style={{ fontSize: '24px', fontWeight: 700, lineHeight: '30px', color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>
                350 spools
              </strong>
              <span style={{ fontSize: '14px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                Thread Spools
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748B' }}>
            <span>Embroidery & Threads</span>
            <span style={{ color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
              <ArrowUpRight size={12} /> 12%
            </span>
          </div>
        </div>

        {/* CARD 2: Fabric Rolls */}
        <div style={{
          background: theme === 'dark' ? '#141126' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          height: '160px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          boxSizing: 'border-box'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(139,18,201,0.1)', color: '#8B12C9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={18} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, background: 'rgba(245,158,11,0.1)', color: '#F59E0B', padding: '2px 8px', borderRadius: '4px' }}>
                Low Stock
              </span>
            </div>

            <div style={{ marginTop: '12px' }}>
              <strong style={{ fontSize: '24px', fontWeight: 700, lineHeight: '30px', color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>
                45 meters
              </strong>
              <span style={{ fontSize: '14px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                Fabric Rolls
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748B' }}>
            <span>Silk, Velvet Textiles</span>
            <span style={{ color: '#F59E0B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
              <ArrowDownRight size={12} /> 5%
            </span>
          </div>
        </div>

        {/* CARD 3: Accessories */}
        <div style={{
          background: theme === 'dark' ? '#141126' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          height: '160px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          boxSizing: 'border-box'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '2px 8px', borderRadius: '4px' }}>
                Good
              </span>
            </div>

            <div style={{ marginTop: '12px' }}>
              <strong style={{ fontSize: '24px', fontWeight: 700, lineHeight: '30px', color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>
                120 pieces
              </strong>
              <span style={{ fontSize: '14px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                Accessories
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748B' }}>
            <span>Zippers & Hooks</span>
            <span style={{ color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
              <ArrowUpRight size={12} /> 8%
            </span>
          </div>
        </div>

        {/* CARD 4: Designer Buttons */}
        <div style={{
          background: theme === 'dark' ? '#141126' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          height: '160px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          boxSizing: 'border-box'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(245,158,11,0.15)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircleDot size={18} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '2px 8px', borderRadius: '4px' }}>
                Good
              </span>
            </div>

            <div style={{ marginTop: '12px' }}>
              <strong style={{ fontSize: '24px', fontWeight: 700, lineHeight: '30px', color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>
                850 pieces
              </strong>
              <span style={{ fontSize: '14px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                Designer Buttons
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748B' }}>
            <span>Pearl & Zari Buttons</span>
            <span style={{ color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
              <ArrowUpRight size={12} /> 25%
            </span>
          </div>
        </div>

      </div>

      {/* 3. ADD STOCK ENTRY CARD */}
      <div style={{
        background: theme === 'dark' ? '#141126' : '#ffffff',
        border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.02)'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
          Add Stock Entry
        </h3>

        <form onSubmit={handleAddEntry} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px', alignItems: 'end' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467' }}>
              Category
            </label>
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              style={{
                padding: '8px 12px',
                fontSize: '13px',
                borderRadius: '8px',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F8FAFC',
                color: theme === 'dark' ? '#ffffff' : '#172033',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Fabric Rolls">Fabric Rolls</option>
              <option value="Thread Spools">Thread Spools</option>
              <option value="Accessories">Accessories</option>
              <option value="Designer Buttons">Designer Buttons</option>
              <option value="Laces & Trims">Laces & Trims</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467' }}>
              Material Name
            </label>
            <input
              type="text"
              placeholder="e.g. Red Silk Velvet"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              required
              style={{
                padding: '8px 12px',
                fontSize: '13px',
                borderRadius: '8px',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
                color: theme === 'dark' ? '#ffffff' : '#172033',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467' }}>
              Quantity
            </label>
            <input
              type="number"
              placeholder="e.g. 50"
              value={newQty}
              onChange={e => setNewQty(e.target.value)}
              required
              style={{
                padding: '8px 12px',
                fontSize: '13px',
                borderRadius: '8px',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
                color: theme === 'dark' ? '#ffffff' : '#172033',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467' }}>
              Unit
            </label>
            <select
              value={newUnit}
              onChange={e => setNewUnit(e.target.value)}
              style={{
                padding: '8px 12px',
                fontSize: '13px',
                borderRadius: '8px',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F8FAFC',
                color: theme === 'dark' ? '#ffffff' : '#172033',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="meters">meters</option>
              <option value="spools">spools</option>
              <option value="pieces">pieces</option>
              <option value="yards">yards</option>
              <option value="packs">packs</option>
              <option value="boxes">boxes</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-text-white-force"
            style={{
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #F72585 0%, #8B12C9 100%)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(247,37,133,0.25)',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Plus size={16} /> Add Entry
          </button>

        </form>
      </div>

      {/* 4. RECENT STOCK ENTRIES TABLE */}
      <div style={{
        background: theme === 'dark' ? '#141126' : '#ffffff',
        border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.02)'
      }}>
        
        {/* Table Top Controls Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
            Recent Stock Entries
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{
                  padding: '7px 12px 7px 30px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F8FAFC',
                  color: theme === 'dark' ? '#ffffff' : '#172033',
                  outline: 'none',
                  width: '180px'
                }}
              />
            </div>

            {/* Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              style={{
                padding: '7px 10px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '8px',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
                color: theme === 'dark' ? '#ffffff' : '#172033',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            <button
              onClick={() => alert("More inventory options sheet open...")}
              style={{
                background: 'transparent',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '6px 10px',
                color: '#64748B',
                cursor: 'pointer'
              }}
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{
                borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
                color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#64748B',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                <th style={{ padding: '10px 12px' }}>Material</th>
                <th style={{ padding: '10px 12px' }}>Category</th>
                <th style={{ padding: '10px 12px' }}>Quantity</th>
                <th style={{ padding: '10px 12px' }}>Unit</th>
                <th style={{ padding: '10px 12px' }}>Added On</th>
                <th style={{ padding: '10px 12px' }}>Added By</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedStock.length > 0 ? (
                paginatedStock.map((item) => {
                  const catStyle = getCategoryBadgeStyle(item.category);
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid #F1F5F9',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      {/* Material Info */}
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E5E7EB', flexShrink: 0 }}>
                            <img src={item.avatar} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div>
                            <strong style={{ fontSize: '13px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>
                              {item.name}
                            </strong>
                            <span style={{ fontSize: '11px', color: '#F72585', fontWeight: 500 }}>
                              {item.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          background: catStyle.bg,
                          color: catStyle.color,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          whiteSpace: 'nowrap'
                        }}>
                          {item.category}
                        </span>
                      </td>

                      {/* Quantity */}
                      <td style={{ padding: '12px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                        {item.quantity}
                      </td>

                      {/* Unit */}
                      <td style={{ padding: '12px', color: '#64748B' }}>
                        {item.unit}
                      </td>

                      {/* Added On */}
                      <td style={{ padding: '12px', color: '#64748B' }}>
                        {item.addedOn}
                      </td>

                      {/* Added By */}
                      <td style={{ padding: '12px', color: theme === 'dark' ? '#ffffff' : '#172033', fontWeight: 500 }}>
                        {item.addedBy}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px' }}>
                        {renderStatusBadge(item.status)}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => handleQuickRestock(item.id, 20)}
                            style={{
                              padding: '3px 8px',
                              fontSize: '10px',
                              fontWeight: 600,
                              borderRadius: '4px',
                              border: '1px solid #10B981',
                              color: '#10B981',
                              background: 'transparent',
                              cursor: 'pointer'
                            }}
                          >
                            +20 Restock
                          </button>

                          <button
                            onClick={() => alert(`Options for ${item.name} (${item.id})`)}
                            style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '24px', fontSize: '12px', color: '#64748B' }}>
                    No inventory stock entries found matching the filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. PAGINATION FOOTER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 500, color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#64748B' }}>
            Showing {filteredStock.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredStock.length)} of {filteredStock.length} entries
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
                color: currentPage === 1 ? '#94A3B8' : (theme === 'dark' ? '#ffffff' : '#344054'),
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={currentPage === idx + 1 ? 'btn-text-white-force' : ''}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: currentPage === idx + 1 ? '#F72585' : 'transparent',
                  color: currentPage === idx + 1 ? '#ffffff' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#64748B'),
                  cursor: 'pointer'
                }}
              >
                {idx + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
                color: currentPage === totalPages ? '#94A3B8' : (theme === 'dark' ? '#ffffff' : '#344054'),
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
