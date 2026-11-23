import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Scissors, Sparkles, 
  ShieldCheck, Award, ChevronRight
} from 'lucide-react';
import { BRIDAL_FABRICS } from '../../utils/bridalStore';
import './BridalFabricsPage.css';

export default function BridalFabricsPage({
  currentUser,
  theme = 'light',
  onBack,
  onSelectFabricForTailoring,
  showToast = () => {}
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Bridal Fabrics' },
    { id: 'silk', label: 'Pure Silk & Katan' },
    { id: 'brocade', label: 'Banarasi & Brocade' },
    { id: 'velvet', label: 'Micro Velvet' },
    { id: 'sheer', label: 'Net & Organza' },
    { id: 'flow', label: 'Georgette & Chiffon' }
  ];

  const filteredFabrics = BRIDAL_FABRICS.filter(fabric => {
    const matchesSearch = 
      fabric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.suitableFor.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'silk') return fabric.type.toLowerCase().includes('silk');
    if (selectedCategory === 'brocade') return fabric.name.toLowerCase().includes('banarasi') || fabric.name.toLowerCase().includes('brocade') || fabric.name.toLowerCase().includes('tissue');
    if (selectedCategory === 'velvet') return fabric.type.toLowerCase().includes('velvet');
    if (selectedCategory === 'sheer') return fabric.type.toLowerCase().includes('net') || fabric.type.toLowerCase().includes('organza');
    if (selectedCategory === 'flow') return fabric.type.toLowerCase().includes('georgette') || fabric.type.toLowerCase().includes('chiffon');
    return true;
  });

  return (
    <div className={`bridal-fabrics-page-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {/* Top Navigation & Breadcrumbs */}
      <div className="bridal-fabrics-header-strip">
        <div className="bridal-fabrics-header-container">
          <button 
            type="button" 
            onClick={onBack} 
            className="bridal-fabrics-back-btn"
          >
            <ArrowLeft size={18} />
            <span>Back to Bridal Hub</span>
          </button>

          <div className="bridal-fabrics-breadcrumbs">
            <span>Bridal Stitching</span>
            <ChevronRight size={14} />
            <span className="current">Luxury Bridal Fabric Studio</span>
          </div>
        </div>
      </div>

      {/* Hero Banner for Bridal Fabrics */}
      <div className="bridal-fabrics-hero">
        <div className="bridal-fabrics-hero-container">
          <span className="bridal-fabrics-pill-badge">
            <Sparkles size={14} /> CERTIFIED BRIDAL TEXTILE VAULT
          </span>
          <h1 className="bridal-fabrics-title">
            Exquisite Bridal Textiles, <br />
            <span className="pink-gradient">Woven for Your Big Day</span>
          </h1>
          <p className="bridal-fabrics-subtitle">
            Pure Mulberry silks, handwoven Banarasi zari, royal velvet, and featherlight organza sourced directly from master heritage weavers. Every fabric undergoes colorfast and pre-shrink quality certifications.
          </p>

          <div className="bridal-fabrics-stats-row">
            <div className="stat-pill">
              <ShieldCheck size={16} />
              <span>100% Pure Silk & Zari Authenticity Guaranteed</span>
            </div>
            <div className="stat-pill">
              <Scissors size={16} />
              <span>Free Doorstep Swatch Inspection Kit</span>
            </div>
            <div className="stat-pill">
              <Award size={16} />
              <span>Couture Heavy Embroidery Grade A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bridal-fabrics-controls-container">
        <div className="bridal-fabrics-search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by bridal fabric, weave, embroidery suitability..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button" 
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>

        {/* Categories Horizontal Tabs */}
        <div className="bridal-fabrics-tabs-row">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`bridal-fabric-category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fabrics Cards Grid */}
      <div className="bridal-fabrics-grid-container">
        <div className="bridal-fabrics-grid-header">
          <h3>
            Showing <strong>{filteredFabrics.length}</strong> Master Bridal Fabrics
          </h3>
          <span className="hint">Select any fabric to review texture or start custom stitching</span>
        </div>

        <div className="bridal-fabrics-cards-grid">
          {filteredFabrics.map(fabric => (
            <div key={fabric.id} className="bridal-luxury-fabric-card">
              <div className="fabric-card-image-box">
                <img src={fabric.image} alt={fabric.name} className="fabric-card-img" />
                <span className="fabric-type-tag">{fabric.type}</span>
              </div>

              <div className="fabric-card-content">
                <div className="fabric-card-header">
                  <h4 className="fabric-title">{fabric.name}</h4>
                  <div className="fabric-price-meter">
                    <strong>₹{fabric.pricePerMeter}</strong> / meter
                  </div>
                </div>

                <p className="fabric-desc">{fabric.description}</p>

                <div className="fabric-meta-pills">
                  <span className="meta-pill">Ideal for: {fabric.suitableFor}</span>
                  <span className="meta-pill">Theme: {fabric.season}</span>
                </div>

                <div className="fabric-actions-row">
                  <button 
                    type="button" 
                    className="fabric-btn-stitch"
                    onClick={() => {
                      if (onSelectFabricForTailoring) {
                        onSelectFabricForTailoring(fabric);
                      }
                      showToast(`Selected ${fabric.name} for bridal stitching!`);
                    }}
                  >
                    <Scissors size={15} />
                    <span>Stitch with this Fabric →</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer-provided fabric assurance */}
      <div className="bridal-fabrics-custom-assurance">
        <div className="assurance-card">
          <div className="assurance-left">
            <Award size={36} className="assurance-icon" />
            <div>
              <h3>Have your own bridal fabric or family heirloom?</h3>
              <p>We gladly tailor customer-provided fabrics! Simply choose "Provide My Own Fabric" during bridal checkout, and our insured white-glove courier will collect your fabric directly from your home.</p>
            </div>
          </div>
          <button 
            type="button" 
            className="assurance-cta-btn"
            onClick={() => {
              if (onSelectFabricForTailoring) {
                onSelectFabricForTailoring(null);
              }
            }}
          >
            Start Stitching with Own Fabric →
          </button>
        </div>
      </div>
    </div>
  );
}
