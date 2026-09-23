import React, { useState } from 'react';
import { 
  Sparkles, Wrench, ShieldCheck, Star, ArrowRight, 
  Truck, Check, Layers, ChevronRight, Sliders, MapPin, Eye 
} from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import MaterialShowcase from './MaterialShowcase';
import SpecialistMapDiscovery from './SpecialistMapDiscovery';

export default function VehicleSeatExperience({
  tailors = [],
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout
}) {
  const [vehicleType, setVehicleType] = useState('bike'); // 'bike' | 'car'

  // Bike Configurator States
  const [bikeBrand, setBikeBrand] = useState('Royal Enfield');
  const [bikeModel, setBikeModel] = useState('Classic 350');
  const [bikeSeatType, setBikeSeatType] = useState('Split Rider + Pillion');
  const [bikeMaterial, setBikeMaterial] = useState('Waterproof Anti-Slip PU');
  const [bikePattern, setBikePattern] = useState('Diamond Quilted Padding');
  const [bikeGelAdded, setBikeGelAdded] = useState(true);

  // Car Configurator States
  const [carMake, setCarMake] = useState('Mahindra');
  const [carModel, setCarModel] = useState('Thar / Thar Roxx');
  const [carConfig, setCarConfig] = useState('4/5 Seater (2 Rows)');
  const [carMaterial, setCarMaterial] = useState('Automotive Nappa Grade Leatherette');
  const [carColor, setCarColor] = useState('Cognac Tan');
  const [carPerforation, setCarPerforation] = useState(true);
  const [installationPlace, setInstallationPlace] = useState('home'); // 'home' | 'garage'

  // Dynamic Models Map
  const bikeModelsMap = {
    'Royal Enfield': ['Classic 350', 'Hunter 350', 'Meteor 350', 'Himalayan 450', 'Continental GT 650'],
    'Honda': ['Activa 6G', 'Hness CB350', 'Hornet 2.0', 'Shine 125', 'CB300R'],
    'Yamaha': ['R15 V4', 'MT-15', 'FZ-S Fi', 'Aerox 155'],
    'TVS': ['Apache RTR 160/200', 'Ronin 225', 'Jupiter 125', 'Ntorq 125'],
    'Bajaj': ['Pulsar N250', 'Pulsar NS200', 'Dominar 400', 'Avenger Cruise'],
    'KTM': ['Duke 250', 'Duke 390', 'RC 390', 'Adventure 390'],
    'Suzuki': ['Access 125', 'Gixxer SF 250', 'Burgman Street'],
    'Hero': ['Splendor Plus', 'Xpulse 200 4V', 'Mavrick 440']
  };

  const carModelsMap = {
    'Mahindra': ['Thar / Thar Roxx', 'Scorpio-N', 'XUV700', 'XUV 3XO', 'Bolero Neo'],
    'Tata': ['Nexon', 'Harrier', 'Safari', 'Punch', 'Curvv'],
    'Hyundai': ['Creta', 'Venue', 'Verna', 'Tucson', 'Alcazar'],
    'Maruti Suzuki': ['Brezza', 'Grand Vitara', 'Fronx', 'Swift', 'Jimny'],
    'Toyota': ['Fortuner', 'Innova Hycross', 'Urban Cruiser Taisor'],
    'Kia': ['Seltos', 'Sonet', 'Carens', 'EV6']
  };

  // Pricing calculations
  const bikePrice = (bikeGelAdded ? 1800 : 1300);
  const carPrice = carConfig.includes('7') ? 13500 : (carConfig.includes('Bucket') ? 11000 : 8500) + (installationPlace === 'home' ? 499 : 0);

  const vehicleMaterials = [
    {
      id: 'mat-nappacar',
      name: 'Automotive Nappa Leatherette',
      type: '1.2mm High-Density Cast Layer',
      badge: 'UV RESISTANT TIER',
      image: './carf_f1.jpg',
      priceTier: 'Included (Base)',
      durability: '5 / 5',
      waterResistance: '100% Waterproof',
      bestFor: 'Luxury Sedans & SUVs',
      description: 'Micro-perforated breathable synthetic skin with automotive fire-retardant backing. Resists direct tropical summer heat up to 65°C without cracking.'
    },
    {
      id: 'mat-alcantara',
      name: 'Perforated Sport Suede (Alcantara Spec)',
      type: 'Ultrasuede Microfiber',
      badge: 'TRACK & OFF-ROAD',
      image: './carf_f3.jpg',
      priceTier: '+₹1,500 Upgrade',
      durability: '4.8 / 5',
      waterResistance: 'Hydrophobic Coated',
      bestFor: 'Center Seat Inserts & Side Bolsters',
      description: 'Ultra-high grip, velvety tactile suede used in high-performance sports cars. Non-slip comfort during aggressive cornering.'
    },
    {
      id: 'mat-hdfoam',
      name: 'Memory Gel-Foam Layering',
      type: 'Dual-Density Visco-Elastic',
      badge: 'ORTHOPEDIC TOURING',
      image: './carf_f5.jpg',
      priceTier: '+₹500 / Seat',
      durability: '5 / 5',
      waterResistance: 'Sealed Cell Core',
      bestFor: 'Motorcycle Saddles & Driver Seats',
      description: 'Reduces tailbone road shock and long-ride numbness. Tested across 1,000+ km interstate touring rides.'
    }
  ];

  const handleCheckoutBike = () => {
    const item = {
      id: `seat-bike-${Date.now()}`,
      name: `Custom ${bikeBrand} ${bikeModel} Seat Cover Set`,
      price: bikePrice,
      image: './car_c4.jpg',
      selectedColor: 'Black & Red Stitch',
      details: `${bikeSeatType} • ${bikeMaterial} • ${bikePattern} ${bikeGelAdded ? '• Includes Orthopedic Gel' : ''}`,
      quantity: 1,
      itemType: 'custom'
    };
    if (onDirectCheckout) onDirectCheckout(item);
    else if (onAddToCart) onAddToCart(item);
  };

  const handleCheckoutCar = () => {
    const item = {
      id: `seat-car-${Date.now()}`,
      name: `Bespoke ${carMake} ${carModel} Seat Covers`,
      price: carPrice,
      image: './car_c1.jpg',
      selectedColor: carColor,
      details: `${carConfig} • ${carMaterial} • ${installationPlace === 'home' ? 'Doorstep Fitting Included' : 'Fitted at Partner Garage'}`,
      quantity: 1,
      itemType: 'custom'
    };
    if (onDirectCheckout) onDirectCheckout(item);
    else if (onAddToCart) onAddToCart(item);
  };

  return (
    <div className="vehicle-experience animate-fade-in" style={{ paddingBottom: '6rem' }}>
      
      {/* 1. HERO */}
      <section className="specialty-hero specialty-hero-responsive">
        <div
          className="specialty-hero-bg"
          style={{ backgroundImage: 'url("./Vehicle Seat Covers.png")' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(247,37,133,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
          <div className="specialty-hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', marginBottom: '18px' }}>
            <Sparkles size={15} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              StitchBee Automotive & Motorcycle Interiors
            </span>
          </div>

          <h1>
            Your Vehicle.<br />
            <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Your Interior.
            </span><br />
            Your Style.
          </h1>

          <p className="specialty-hero-subtext">
            Transform uncomfortable factory seats into luxury bucket contours. Custom quilted car seat cover sets and orthopedic gel motorcycle saddles fitted at your doorstep.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              onClick={() => { setVehicleType('bike'); document.getElementById('configurator-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn btn-primary"
              style={{ padding: '12px 22px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              Configure Bike / Scooter Seat
            </button>
            <button
              onClick={() => { setVehicleType('car'); document.getElementById('configurator-section')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn btn-secondary"
              style={{ padding: '12px 20px', fontSize: '0.9rem' }}
            >
              Configure Car / SUV Interior
            </button>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div>
              <strong className="metric-value" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={18} style={{ color: '#fbbf24', fill: '#fbbf24' }} /> 4.9 ★
              </strong>
              <span className="metric-label" style={{ fontSize: '0.72rem' }}>Automotive Interior Rating</span>
            </div>
            <div style={{ width: '1px', height: '28px', background: 'var(--border-color)' }} />
            <div>
              <strong className="metric-value" style={{ fontSize: '1.25rem', color: '#10b981' }}>Doorstep</strong>
              <span className="metric-label" style={{ fontSize: '0.72rem', display: 'block' }}>Installation at Your Garage</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE BEFORE / AFTER SLIDER */}
      <BeforeAfterSlider
        beforeImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
        afterImage="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
        beforeLabel="Faded Factory Fabric Upholstery"
        afterLabel="Diamond-Quilted Cognac Leather Interior"
        title="Automotive Cabin Before & After Overhaul"
        subtitle="Compare standard factory seats against custom high-density padded Nappa leather covers with bespoke stitching."
        aspectRatio="21/9"
      />

      {/* 3. DYNAMIC VEHICLE CONFIGURATOR SECTION */}
      <section id="configurator-section" style={{ margin: '4.5rem 0' }}>
        <div
          className="glass-card-no-hover"
          style={{
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)'
          }}
        >
          {/* Vehicle Category Switcher */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'inline-flex', padding: '6px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)' }}>
              <button
                className="btn"
                onClick={() => setVehicleType('bike')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  background: vehicleType === 'bike' ? 'var(--grad-primary)' : 'transparent',
                  color: vehicleType === 'bike' ? '#fff' : 'var(--text-secondary)'
                }}
              >
                🏍️ Motorcycle & Scooter
              </button>
              <button
                className="btn"
                onClick={() => setVehicleType('car')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  background: vehicleType === 'car' ? 'var(--grad-primary)' : 'transparent',
                  color: vehicleType === 'car' ? '#fff' : 'var(--text-secondary)'
                }}
              >
                🚗 Car & SUV Interior
              </button>
            </div>
          </div>

          {/* BIKE CONFIGURATOR */}
          {vehicleType === 'bike' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }} className="specialist-grid-responsive">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Brand Selector */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    1. Select Motorcycle Brand
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {Object.keys(bikeModelsMap).map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          setBikeBrand(b);
                          setBikeModel(bikeModelsMap[b][0]);
                        }}
                        className="btn"
                        style={{
                          padding: '7px 12px',
                          fontSize: '0.78rem',
                          borderRadius: '8px',
                          border: bikeBrand === b ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                          background: bikeBrand === b ? 'var(--primary)' : 'var(--bg-card)',
                          color: bikeBrand === b ? '#fff' : 'var(--text-primary)'
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Selector */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    2. Select Model ({bikeBrand})
                  </label>
                  <select
                    value={bikeModel}
                    onChange={e => setBikeModel(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                  >
                    {(bikeModelsMap[bikeBrand] || []).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Stitch Pattern & Gel Inset */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                      Stitching Pattern
                    </label>
                    <select
                      value={bikePattern}
                      onChange={e => setBikePattern(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}
                    >
                      <option value="Diamond Quilted Padding">Diamond Quilted Padding</option>
                      <option value="Classic Tuck & Roll Ribs">Classic Tuck & Roll Ribs</option>
                      <option value="Stealth Minimalist Stitch">Stealth Minimalist Stitch</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                      Saddle Configuration
                    </label>
                    <select
                      value={bikeSeatType}
                      onChange={e => setBikeSeatType(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}
                    >
                      <option value="Split Rider + Pillion">Split Rider + Pillion</option>
                      <option value="Single Touring Bench">Single Touring Bench</option>
                      <option value="Low-Ride Solo Saddle">Low-Ride Solo Saddle</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <input
                    type="checkbox"
                    id="gelCheck"
                    checked={bikeGelAdded}
                    onChange={e => setBikeGelAdded(e.target.checked)}
                    style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                  <label htmlFor="gelCheck" style={{ fontSize: '0.82rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                    Add Integrated Orthopedic Gel-Pad for zero tailbone fatigue (+₹500)
                  </label>
                </div>
              </div>

              {/* Live Bike Seat Summary & Buy Card */}
              <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                <div style={{ height: '220px', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px' }}>
                  <img src="./car_c4.jpg" alt="Bike Seat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  {bikeBrand} {bikeModel}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
                  {bikeSeatType} • {bikePattern}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Configured Total:</span>
                  <strong style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>₹{bikePrice.toLocaleString()}</strong>
                </div>

                <button
                  onClick={handleCheckoutBike}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontWeight: 800 }}
                >
                  Order Custom Bike Seat (₹{bikePrice})
                </button>
              </div>
            </div>
          ) : (
            /* CAR CONFIGURATOR */
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }} className="specialist-grid-responsive">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    1. Select Car Make
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {Object.keys(carModelsMap).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setCarMake(c);
                          setCarModel(carModelsMap[c][0]);
                        }}
                        className="btn"
                        style={{
                          padding: '7px 14px',
                          fontSize: '0.78rem',
                          borderRadius: '8px',
                          border: carMake === c ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                          background: carMake === c ? 'var(--primary)' : 'var(--bg-card)',
                          color: carMake === c ? '#fff' : 'var(--text-primary)'
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    2. Select Model ({carMake})
                  </label>
                  <select
                    value={carModel}
                    onChange={e => setCarModel(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                  >
                    {(carModelsMap[carMake] || []).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                      Seating Configuration
                    </label>
                    <select
                      value={carConfig}
                      onChange={e => setCarConfig(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}
                    >
                      <option value="4/5 Seater (2 Rows)">4/5 Seater (2 Rows)</option>
                      <option value="7/8 Seater (3 Rows)">7/8 Seater (3 Rows)</option>
                      <option value="Sport Front Bucket Pair">Sport Front Bucket Pair</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                      Interior Leather Color
                    </label>
                    <select
                      value={carColor}
                      onChange={e => setCarColor(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}
                    >
                      <option value="Cognac Tan">Cognac Tan</option>
                      <option value="Charcoal Jet Black">Charcoal Jet Black</option>
                      <option value="Warm Coffee Brown">Warm Coffee Brown</option>
                      <option value="Oyster Ice White">Oyster Ice White</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Installation Preference
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setInstallationPlace('home')}
                      className="btn"
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: installationPlace === 'home' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: installationPlace === 'home' ? 'var(--primary)' : 'var(--bg-card)',
                        color: installationPlace === 'home' ? '#fff' : 'var(--text-primary)',
                        fontSize: '0.78rem'
                      }}
                    >
                      🏡 At My Home Garage (+₹499)
                    </button>
                    <button
                      type="button"
                      onClick={() => setInstallationPlace('garage')}
                      className="btn"
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: installationPlace === 'garage' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: installationPlace === 'garage' ? 'var(--primary)' : 'var(--bg-card)',
                        color: installationPlace === 'garage' ? '#fff' : 'var(--text-primary)',
                        fontSize: '0.78rem'
                      }}
                    >
                      🚗 At Partner Workshop (Free)
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Car Summary Card */}
              <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                <div style={{ height: '220px', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px' }}>
                  <img src="./car_c1.jpg" alt="Car Seat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  {carMake} {carModel}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
                  {carConfig} • {carColor}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Configured Total:</span>
                  <strong style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>₹{carPrice.toLocaleString()}</strong>
                </div>

                <button
                  onClick={handleCheckoutCar}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontWeight: 800 }}
                >
                  Book Seat Cover Installation (₹{carPrice.toLocaleString()})
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. TACTILE MATERIAL SHOWCASE */}
      <MaterialShowcase
        materials={vehicleMaterials}
        title="Automotive Upholstery Grade Anatomy"
        subtitle="Heat-reflective coatings, UV stabilization, and high-density memory foam."
      />

      {/* 5. SPECIALIST DISCOVERY */}
      <SpecialistMapDiscovery
        specialtyCategory="seats"
        categoryTitle="Vehicle Seat & Upholstery"
        tailors={tailors}
        currentUser={currentUser}
        onLoginRequired={onLoginRequired}
        onSelectTailorForBooking={(tailor) => {
          if (onAddToCart) {
            onAddToCart({
              id: `booking-${tailor.id}-${Date.now()}`,
              name: `Vehicle Seat Consultation with ${tailor.name}`,
              price: 499,
              image: tailor.image,
              itemType: 'alteration'
            });
          }
        }}
      />
    </div>
  );
}
