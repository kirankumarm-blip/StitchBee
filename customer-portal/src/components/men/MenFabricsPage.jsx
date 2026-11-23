import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Filter, Scissors, Check, Sparkles, 
  Info, ShieldCheck, Award, RefreshCw, ChevronRight
} from 'lucide-react';
import { MEN_FABRICS } from '../../utils/menStore';
import './MenFabricsPage.css';

export default function MenFabricsPage({
  currentUser,
  theme = 'light',
  onBack,
  onSelectFabricForTailoring,
  showToast = () => {}
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFabricDetail, setSelectedFabricDetail] = useState(null);

  const categories = [
    { id: 'all', label: 'All Fabrics' },
    { id: 'cotton', label: 'Cotton & Oxford' },
    { id: 'linen', label: 'Linen & Blends' },
    { id: 'suiting', label: 'Wool & Suiting' },
    { id: 'silk', label: 'Silk & Brocade' },
    { id: 'textured', label: 'Tweed & Textured' }
  ];

  // Filter fabrics based on category and search query
  const filteredFabrics = MEN_FABRICS.filter(fabric => {
    const matchesSearch = 
      fabric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fabric.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'cotton') return fabric.name.toLowerCase().includes('cotton') || fabric.name.toLowerCase().includes('denim');
    if (selectedCategory === 'linen') return fabric.name.toLowerCase().includes('linen');
    if (selectedCategory === 'suiting') return fabric.name.toLowerCase().includes('raymond') || fabric.name.toLowerCase().includes('wool');
    if (selectedCategory === 'silk') return fabric.name.toLowerCase().includes('silk') || fabric.name.toLowerCase().includes('banarasi');
    if (selectedCategory === 'textured') return fabric.name.toLowerCase().includes('tweed') || fabric.name.toLowerCase().includes('corduroy') || fabric.name.toLowerCase().includes('jacquard');
    return true;
  });

  return (
    <div className={`men-fabrics-page-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {/* Top Navigation & Breadcrumbs */}
      <div className="men-fabrics-header-strip">
        <div className="men-fabrics-header-container">
          <button 
            type="button" 
            onClick={onBack} 
            className="men-fabrics-back-btn"
          >
            <ArrowLeft size={18} />
            <span>Back to Men's Hub</span>
          </button>

          <div className="men-fabrics-breadcrumbs">
            <span>Men's Tailoring</span>
            <ChevronRight size={14} />
            <span className="current">Luxury Fabric Studio</span>
          </div>
        </div>
      </div>

      {/* Hero Banner for Fabrics */}
      <div className="men-fabrics-hero">
        <div className="men-fabrics-hero-container">
          <span className="men-fabrics-pill-badge">
            <Sparkles size={14} /> BESPOKE MATERIAL ARCHIVE
          </span>
          <h1 className="men-fabrics-title">
            World-Class Fabrics, <br />
            <span className="pink-gradient">Tailored to Perfection</span>
          </h1>
          <p className="men-fabrics-subtitle">
            Explore 100% genuine cottons, pure Irish linens, fine Italian wools, raw silks and heritage weaves sourced directly from elite certified textile mills.
          </p>

          {/* Quick Stats */}
          <div className="men-fabrics-stats-row">
            <div className="stat-pill">
              <ShieldCheck size={16} />
              <span>100% Mill Authenticity Guaranteed</span>
            </div>
            <div className="stat-pill">
              <Scissors size={16} />
              <span>Free Fabric Swatch Inspection</span>
            </div>
            <div className="stat-pill">
              <Award size={16} />
              <span>Pre-Shrunk & Colorfast Grade A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="men-fabrics-controls-container">
        {/* Search */}
        <div className="men-fabrics-search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by fabric name, weave, or suitable outfit..."
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
        <div className="men-fabrics-tabs-row">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`men-fabric-category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fabrics Cards Grid */}
      <div className="men-fabrics-grid-container">
        <div className="men-fabrics-grid-header">
          <h3>
            Showing <strong>{filteredFabrics.length}</strong> Curated Men's Fabrics
          </h3>
          <span className="hint">Click any fabric to review details or begin tailoring</span>
        </div>

        <div className="men-fabrics-cards-grid">
          {filteredFabrics.map(fabric => (
            <div key={fabric.id} className="men-luxury-fabric-card">
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
                  <span className="meta-pill">Season: {fabric.season}</span>
                </div>

                <div className="fabric-actions-row">
                  <button 
                    type="button" 
                    className="fabric-btn-stitch"
                    onClick={() => {
                      if (onSelectFabricForTailoring) {
                        onSelectFabricForTailoring(fabric);
                      }
                      showToast(`Selected ${fabric.name} for tailoring!`);
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

      {/* Custom Fabric Assurance Callout */}
      <div className="men-fabrics-custom-assurance">
        <div className="assurance-card">
          <div className="assurance-left">
            <Award size={36} className="assurance-icon" />
            <div>
              <h3>Have your own special fabric?</h3>
              <p>We gladly accept customer-provided fabrics! Simply choose "Provide My Own Fabric" during tailor checkout and our courier will collect it from your doorstep.</p>
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
