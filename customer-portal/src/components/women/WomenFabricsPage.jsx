import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Scissors, Sparkles, 
  ShieldCheck, Award, ChevronRight
} from 'lucide-react';
import { WOMEN_FABRICS } from '../../utils/womenStore';
import './WomenFabricsPage.css';

export default function WomenFabricsPage({
  currentUser,
  theme = 'light',
  onBack,
  onSelectFabricForTailoring,
  showToast = () => {}
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Fabrics' },
    { id: 'silk', label: 'Pure Silk & Banarasi' },
    { id: 'flow', label: 'Georgette & Chiffon' },
    { id: 'sheer', label: 'Organza & Net' },
    { id: 'comfort', label: 'Cotton & Linen' },
    { id: 'luxury', label: 'Velvet & Crepe' }
  ];

  const filteredFabrics = WOMEN_FABRICS.filter(fabric => {
    const matchesSearch = 
      fabric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.desc.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'silk') return fabric.name.toLowerCase().includes('silk') || fabric.name.toLowerCase().includes('banarasi');
    if (selectedCategory === 'flow') return fabric.name.toLowerCase().includes('georgette') || fabric.name.toLowerCase().includes('chiffon');
    if (selectedCategory === 'sheer') return fabric.name.toLowerCase().includes('organza') || fabric.name.toLowerCase().includes('net');
    if (selectedCategory === 'comfort') return fabric.name.toLowerCase().includes('cotton') || fabric.name.toLowerCase().includes('linen');
    if (selectedCategory === 'luxury') return fabric.name.toLowerCase().includes('velvet') || fabric.name.toLowerCase().includes('crepe');
    return true;
  });

  return (
    <div className={`women-fabrics-page-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {/* Header Strip */}
      <div className="women-fabrics-header-strip">
        <div className="women-fabrics-header-container">
          <button type="button" onClick={onBack} className="women-back-link-btn">
            <ArrowLeft size={16} /> Back to Women's Stitching
          </button>
          <div className="women-fabrics-title-block">
            <span className="fabrics-eyebrow">PREMIUM FABRICS CATALOG</span>
            <h1 className="fabrics-title">Luxurious Fabrics for Every Style</h1>
            <p className="fabrics-sub">
              Carefully curated, 100% genuine silks, georgettes, velvets, and handlooms inspected for custom tailoring.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="women-fabrics-controls-wrap">
        <div className="women-fabrics-controls-container">
          {/* Category Pills */}
          <div className="fabrics-pills-row">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`fabrics-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="fabrics-search-box">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search silk, organza, velvet, cotton..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Fabrics Grid */}
      <div className="women-fabrics-grid-wrap">
        <div className="women-fabrics-grid-container">
          {filteredFabrics.map(fabric => (
            <div key={fabric.id} className="women-fabric-detail-card">
              <div className="fabric-card-img-box">
                <img src={fabric.image} alt={fabric.name} className="fabric-card-img" />
                <span className="fabric-tag-badge">{fabric.tag}</span>
              </div>

              <div className="fabric-card-body">
                <div className="fabric-name-row">
                  <h3>{fabric.name}</h3>
                  <span className="fabric-price">₹{fabric.price}/m</span>
                </div>

                <div className="fabric-material">{fabric.material}</div>
                <p className="fabric-desc">{fabric.desc}</p>

                <div className="fabric-card-footer">
                  <button 
                    type="button"
                    className="women-btn-pink select-fab-btn"
                    onClick={() => {
                      if (onSelectFabricForTailoring) {
                        onSelectFabricForTailoring(fabric);
                      }
                      showToast(`Selected ${fabric.name} for custom tailoring!`);
                    }}
                  >
                    Stitch with This Fabric →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
