import React, { useState } from 'react';
import { TrendingUp, Users, ShoppingBag, ShieldAlert, Award, FileText, Check, X, Ban, DollarSign, Layers, Plus, Trash2, Edit, CheckCircle } from 'lucide-react';

export default function AdminView({ tailors, setTailors, orders, updateOrderStatus, ledger, setLedger, banners, setBanners, articles, setArticles }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'tailors' | 'orders' | 'finance' | 'cms'
  
  // Banner CMS Form State
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [newBannerSubtitle, setNewBannerSubtitle] = useState('');
  const [newBannerImage, setNewBannerImage] = useState('');
  const [newBannerCategory, setNewBannerCategory] = useState('Alterations');

  // Article CMS Form State
  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtCategory, setNewArtCategory] = useState('Ethnic Style');
  const [newArtAuthor, setNewArtAuthor] = useState('Malini Iyer');
  const [newArtContent, setNewArtContent] = useState('');
  const [newArtImage, setNewArtImage] = useState('');

  // 1. Math Statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => !['completed', 'closed'].includes(o.status)).length;
  const completedOrders = orders.filter(o => ['completed', 'closed'].includes(o.status)).length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;

  const totalTailors = tailors.length;
  const activeTailors = tailors.filter(t => t.status === 'approved').length;
  const pendingTailors = tailors.filter(t => t.status === 'pending').length;

  // Ledger stats
  const commissionEarned = ledger.platformCommission || 0;
  const fabricSales = ledger.fabricSales || 0;
  const sareeSales = ledger.sareeSales || 0;
  const designerSales = ledger.designerSales || 0;
  const regCredits = ledger.registrationCredits || 0;
  const totalRev = commissionEarned + fabricSales + sareeSales + designerSales + regCredits;

  // Order progression state
  const orderStatesList = [
    'placed',
    'tailor_assigned',
    'pickup_scheduled',
    'picked_up',
    'measurement_completed',
    'stitching_started',
    'stitching_completed',
    'quality_check',
    'delivering',
    'delivered',
    'trial_period',
    'closed'
  ];

  // 2. Action Handlers
  const handleVerifyTailor = (tailorId, action) => {
    // action: 'approve' | 'suspend' | 'reject'
    const newStatus = action === 'approve' ? 'approved' : action === 'suspend' ? 'suspended' : 'rejected';
    
    // If approved, verify documents and credit their registration fee
    const updated = tailors.map(t => {
      if (t.id === tailorId) {
        return {
          ...t,
          status: newStatus,
          // credit registration bonus if first time
          credits: action === 'approve' && t.credits === 0 ? 50 : t.credits
        };
      }
      return t;
    });

    setTailors(updated);

    // Update registration credits inside global ledger
    if (action === 'approve') {
      const currentCredits = ledger.registrationCredits || 0;
      setLedger({
        ...ledger,
        registrationCredits: currentCredits + 50,
        totalRevenue: ledger.totalRevenue + 50
      });
    }

    alert(`Tailor shop has been successfully marked as ${newStatus.toUpperCase()}!`);
  };

  const handleCMSAddBanner = (e) => {
    e.preventDefault();
    if (!newBannerTitle || !newBannerImage) return;

    const bannerObj = {
      id: 'b-' + Math.floor(Math.random() * 10000),
      title: newBannerTitle,
      subtitle: newBannerSubtitle,
      imageUrl: newBannerImage,
      category: newBannerCategory
    };

    const updated = [...banners, bannerObj];
    setBanners(updated);

    setNewBannerTitle('');
    setNewBannerSubtitle('');
    setNewBannerImage('');
    alert('Promo Banner Added successfully! It is now live on the Customer Hero slider.');
  };

  const handleCMSRemoveBanner = (id) => {
    setBanners(banners.filter(b => b.id !== id));
  };

  const handleCMSAddArticle = (e) => {
    e.preventDefault();
    if (!newArtTitle || !newArtContent) return;

    const artObj = {
      id: 'a-' + Math.floor(Math.random() * 10000),
      title: newArtTitle,
      category: newArtCategory,
      author: newArtAuthor,
      reads: '0',
      imageUrl: newArtImage || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80',
      content: newArtContent
    };

    setArticles([...articles, artObj]);
    setNewArtTitle('');
    setNewArtContent('');
    setNewArtImage('');
    alert('Fashion news article published to Customer Feed!');
  };

  const handleCMSRemoveArticle = (id) => {
    setArticles(articles.filter(a => a.id !== id));
  };

  return (
    <div className="view-container">
      
      {/* Admin Title Banner */}
      <div className="flex-row-between" style={{ flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>StichBee Control Hub</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Super Admin Web Console | Oversee tailors, verify credentials, monitor ledger collections, and manage CMS.
          </p>
        </div>
        <span className="badge badge-danger" style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Layers size={14} /> Administrator Mode
        </span>
      </div>

      {/* Tabs list */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <button className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveTab('dashboard')}>
          <TrendingUp size={16} /> Overview Analytics
        </button>
        <button className={`btn ${activeTab === 'tailors' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveTab('tailors')}>
          <Users size={16} /> Verify Tailors ({pendingTailors})
        </button>
        <button className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveTab('orders')}>
          <ShoppingBag size={16} /> Order Logistics ({pendingOrders})
        </button>
        <button className={`btn ${activeTab === 'finance' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveTab('finance')}>
          <DollarSign size={16} /> Finance Ledger
        </button>
        <button className={`btn ${activeTab === 'cms' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveTab('cms')}>
          <FileText size={16} /> Promo Banner CMS
        </button>
      </div>

      {/* Tab 1: Dashboard Analytics */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Key overview metric boxes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent)', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>Active Tailors</span>
                <Users size={18} />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff' }}>{activeTailors} / {totalTailors}</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{pendingTailors} awaiting review</p>
            </div>

            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>Active Orders</span>
                <ShoppingBag size={18} />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff' }}>{pendingOrders}</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{completedOrders} finished orders</p>
            </div>

            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>Total Revenue</span>
                <DollarSign size={18} />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff' }}>₹{totalRev}</div>
              <p style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px' }}>Commission + Registration</p>
            </div>

            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>Marketplace Sales</span>
                <Layers size={18} />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff' }}>₹{fabricSales + sareeSales}</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Fabric & Saree portals</p>
            </div>
          </div>

          {/* SVG Visual Performance Charts Grid */}
          <div className="grid-cols-2" style={{ marginBottom: '32px' }}>
            {/* Monthly Sales Revenue Chart */}
            <div className="glass-card-no-hover" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Platform Monthly Revenue Growth (₹)</h3>
              <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Jan */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '45px' }}>
                  <div style={{ width: '24px', height: '40px', background: 'var(--grad-accent)', borderRadius: '4px 4px 0 0' }}></div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Jan</span>
                </div>
                {/* Feb */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '45px' }}>
                  <div style={{ width: '24px', height: '65px', background: 'var(--grad-accent)', borderRadius: '4px 4px 0 0' }}></div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Feb</span>
                </div>
                {/* Mar */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '45px' }}>
                  <div style={{ width: '24px', height: '110px', background: 'var(--grad-accent)', borderRadius: '4px 4px 0 0' }}></div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Mar</span>
                </div>
                {/* Apr */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '45px' }}>
                  <div style={{ width: '24px', height: '90px', background: 'var(--grad-accent)', borderRadius: '4px 4px 0 0' }}></div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Apr</span>
                </div>
                {/* May */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '45px' }}>
                  <div style={{ width: '24px', height: '145px', background: 'var(--grad-primary)', borderRadius: '4px 4px 0 0', boxShadow: '0 0 10px var(--primary)' }}></div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-primary)', fontWeight: '600', marginTop: '8px' }}>May</span>
                </div>
                {/* Jun (Current Projection) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '45px' }}>
                  <div style={{ width: '24px', height: '175px', background: 'var(--grad-primary)', borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Jun</span>
                </div>
              </div>
            </div>

            {/* Category Revenue Breakdown */}
            <div className="glass-card-no-hover" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Streamed Channel breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div className="flex-row-between" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span>Tailoring Commission (15% base)</span>
                    <span style={{ fontWeight: '600' }}>₹{commissionEarned}</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(commissionEarned/totalRev)*100}%`, background: 'var(--primary)' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex-row-between" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span>Tailor Onboarding Credits</span>
                    <span style={{ fontWeight: '600' }}>₹{regCredits}</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(regCredits/totalRev)*100}%`, background: 'var(--accent)' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex-row-between" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span>Fabric Marketplace Checkout</span>
                    <span style={{ fontWeight: '600' }}>₹{fabricSales}</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(fabricSales/totalRev)*100 || 0}%`, background: '#10b981' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex-row-between" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span>Saree Sales & Design Studio</span>
                    <span style={{ fontWeight: '600' }}>₹{sareeSales + designerSales}</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${((sareeSales + designerSales)/totalRev)*100 || 0}%`, background: '#fbbf24' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Verify Tailor Credentials */}
      {activeTab === 'tailors' && (
        <div>
          <h3 className="section-title"><Users size={20} style={{ color: 'var(--primary)' }} /> Partner Credentials Verification</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {tailors.map(tailor => (
              <div key={tailor.id} className="glass-card-no-hover" style={{ padding: '24px' }}>
                <div className="flex-row-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '14px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img src={tailor.image} alt={tailor.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '1.2rem', color: '#fff' }}>{tailor.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Owner: {tailor.owner} | Address: {tailor.address}</p>
                    </div>
                  </div>

                  <div>
                    {tailor.status === 'approved' && <span className="badge badge-success">Approved Partner</span>}
                    {tailor.status === 'pending' && <span className="badge badge-warning">Awaiting Approval</span>}
                    {tailor.status === 'suspended' && <span className="badge badge-danger">Suspended</span>}
                  </div>
                </div>

                {/* Uploaded Documents details */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>1. Aadhaar UIDAI</span>
                    <p style={{ fontWeight: '600', fontSize: '0.85rem', color: '#fff', marginTop: '2px' }}>{tailor.documents.aadhaar}</p>
                    <span style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '6px' }}>
                      <CheckCircle size={10} /> Verified Doc
                    </span>
                  </div>

                  <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>2. PAN Card</span>
                    <p style={{ fontWeight: '600', fontSize: '0.85rem', color: '#fff', marginTop: '2px' }}>{tailor.documents.pan}</p>
                    <span style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '6px' }}>
                      <CheckCircle size={10} /> Verified Doc
                    </span>
                  </div>

                  <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>3. Shop License</span>
                    <p style={{ fontWeight: '600', fontSize: '0.85rem', color: '#fff', marginTop: '2px' }}>{tailor.documents.license}</p>
                    <span style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '6px' }}>
                      <CheckCircle size={10} /> Verified Doc
                    </span>
                  </div>

                  <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>4. GST Registration</span>
                    <p style={{ fontWeight: '600', fontSize: '0.85rem', color: '#fff', marginTop: '2px' }}>{tailor.documents.gst}</p>
                    {tailor.documents.gst === 'Pending Verification' ? (
                      <span style={{ fontSize: '0.7rem', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '6px' }}>
                        ⚠️ Review Required
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '6px' }}>
                        <CheckCircle size={10} /> Verified Doc
                      </span>
                    )}
                  </div>
                </div>

                {/* Operations Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  {tailor.status !== 'approved' && (
                    <button className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }} onClick={() => handleVerifyTailor(tailor.id, 'approve')}>
                      <Check size={14} /> Verify & Approve Partner
                    </button>
                  )}
                  {tailor.status === 'approved' && (
                    <button className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '0.8rem', color: 'var(--danger)' }} onClick={() => handleVerifyTailor(tailor.id, 'suspend')}>
                      <Ban size={14} /> Suspend Shop
                    </button>
                  )}
                  {tailor.status === 'suspended' && (
                    <button className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }} onClick={() => handleVerifyTailor(tailor.id, 'approve')}>
                      Activate Shop
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Order Logistics Tracking & Simulation Override */}
      {activeTab === 'orders' && (
        <div>
          <h3 className="section-title"><ShoppingBag size={20} style={{ color: 'var(--accent)' }} /> Logistics Order Control Center</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map(order => {
              const currentIdx = orderStatesList.indexOf(order.status);
              
              return (
                <div key={order.id} className="glass-card-no-hover" style={{ padding: '20px' }}>
                  <div className="flex-row-between" style={{ marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                    <div>
                      <span style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>Order #{order.id}</span>
                      <span className="badge badge-primary" style={{ marginLeft: '10px' }}>{order.serviceName}</span>
                    </div>
                    <span className="badge badge-secondary" style={{ textTransform: 'uppercase' }}>
                      Status: {order.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    <div>
                      <p><strong>Customer:</strong> {order.customerName}</p>
                      <p>📍 Address: {order.customerAddress}</p>
                    </div>
                    <div>
                      <p><strong>Tailor Assigned:</strong> {order.tailorName}</p>
                      <p>💳 Price: ₹{order.price} | Payments: {order.paymentStatus.toUpperCase()}</p>
                    </div>
                  </div>

                  {/* Manual State Progression Simulator */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '8px' }}>
                    <div className="flex-row-between" style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary)' }}>🛠️ Simulation Status Override Panel</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Step {currentIdx + 1} of 12</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {orderStatesList.map((st, sIdx) => {
                        const isPast = sIdx < currentIdx;
                        const isCurrent = sIdx === currentIdx;
                        return (
                          <button
                            key={st}
                            onClick={() => updateOrderStatus(order.id, st)}
                            style={{
                              padding: '4px 10px', fontSize: '0.7rem', cursor: 'pointer',
                              borderRadius: '4px',
                              background: isCurrent ? 'var(--primary)' : isPast ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.02)',
                              color: isCurrent ? '#fff' : isPast ? '#34d399' : 'var(--text-muted)',
                              border: isCurrent ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)'
                            }}
                          >
                            {st.replace('_', ' ')}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Finance Ledger */}
      {activeTab === 'finance' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px' }}>
          
          <div className="glass-card-no-hover" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Platform Ledger Collections</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="flex-row-between" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Stitching Commissions (15%)</span>
                <span style={{ fontWeight: '700', color: '#10b981' }}>+₹{commissionEarned}</span>
              </div>

              <div className="flex-row-between" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Tailor Onboarding Credits</span>
                <span style={{ fontWeight: '700', color: '#10b981' }}>+₹{regCredits}</span>
              </div>

              <div className="flex-row-between" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Fabric Marketplace Purchases</span>
                <span style={{ fontWeight: '700', color: '#10b981' }}>+₹{fabricSales}</span>
              </div>

              <div className="flex-row-between" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Saree & Design Studio Sales</span>
                <span style={{ fontWeight: '700', color: '#10b981' }}>+₹{sareeSales + designerSales}</span>
              </div>

              <hr style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', margin: '10px 0' }} />

              <div className="flex-row-between" style={{ padding: '12px', background: 'var(--grad-glow)', borderRadius: '6px', border: '1px dashed var(--primary)' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff' }}>Net Cash Reserve</span>
                <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1.2rem' }}>₹{totalRev}</span>
              </div>
            </div>
          </div>

          <div className="glass-card-no-hover" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Weekly Tailor Settlement Disbursements</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="flex-row-between" style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>Vogue Craft Tailors (#t1)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Settled via UPI Transfer</div>
                </div>
                <span style={{ color: 'var(--success)', fontWeight: '700' }}>₹3,825</span>
              </div>

              <div className="flex-row-between" style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>Ananya Bridal Boutique (#t2)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Settled via IMPS Bank Transfer</div>
                </div>
                <span style={{ color: 'var(--success)', fontWeight: '700' }}>₹1,020</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 5: Banner & News CMS Manager */}
      {activeTab === 'cms' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '32px' }}>
          
          {/* Banner Manager */}
          <div>
            <h3 className="section-title"><Layers size={18} style={{ color: 'var(--accent)' }} /> Promo Banner Manager</h3>
            
            <div className="glass-card-no-hover" style={{ padding: '20px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '14px' }}>Add Carousel Banner</h4>
              <form onSubmit={handleCMSAddBanner} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Banner Title</label>
                  <input type="text" placeholder="e.g. Wedding Couture Stitching" className="form-input" value={newBannerTitle} onChange={e => setNewBannerTitle(e.target.value)} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Subtitle Description</label>
                  <input type="text" placeholder="e.g. 10% off design consults" className="form-input" value={newBannerSubtitle} onChange={e => setNewBannerSubtitle(e.target.value)} />
                </div>

                <div className="grid-cols-2" style={{ gap: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Image URL</label>
                    <input type="text" placeholder="https://unsplash..." className="form-input" value={newBannerImage} onChange={e => setNewBannerImage(e.target.value)} required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Category Action</label>
                    <select className="form-select" value={newBannerCategory} onChange={e => setNewBannerCategory(e.target.value)}>
                      <option value="Men's Wear">Men's Wear</option>
                      <option value="Women's Wear">Women's Wear</option>
                      <option value="Bridal Wear">Bridal Wear</option>
                      <option value="Alterations">Alterations</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '6px' }}>
                  <Plus size={14} /> Publish Promo Banner
                </button>
              </form>
            </div>

            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Active Carousels</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {banners.map(b => (
                  <div key={b.id} className="flex-row-between" style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img src={b.imageUrl} alt={b.title} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff' }}>{b.title}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Action: {b.category}</div>
                      </div>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }} onClick={() => handleCMSRemoveBanner(b.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Article News Manager */}
          <div>
            <h3 className="section-title"><FileText size={18} style={{ color: 'var(--primary)' }} /> Fashion Feed CMS</h3>
            
            <div className="glass-card-no-hover" style={{ padding: '20px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '14px' }}>Write Fashion Article</h4>
              <form onSubmit={handleCMSAddArticle} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Article Title</label>
                  <input type="text" placeholder="e.g. Trend Alert: Pastel Lehengas" className="form-input" value={newArtTitle} onChange={e => setNewArtTitle(e.target.value)} required />
                </div>

                <div className="grid-cols-3" style={{ gap: '8px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Category</label>
                    <select className="form-select" value={newArtCategory} onChange={e => setNewArtCategory(e.target.value)}>
                      <option value="Ethnic Style">Ethnic Style</option>
                      <option value="Fabric Guide">Fabric Guide</option>
                      <option value="Kids Style">Kids Style</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Author</label>
                    <input type="text" className="form-input" value={newArtAuthor} onChange={e => setNewArtAuthor(e.target.value)} />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Image URL</label>
                    <input type="text" placeholder="https://unsplash..." className="form-input" value={newArtImage} onChange={e => setNewArtImage(e.target.value)} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Content Body</label>
                  <textarea className="form-textarea" placeholder="Write the style guide details here..." value={newArtContent} onChange={e => setNewArtContent(e.target.value)} required></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Publish Article
                </button>
              </form>
            </div>

            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Published Articles</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {articles.map(a => (
                  <div key={a.id} className="flex-row-between" style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff' }}>{a.title}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>By {a.author} • {a.category}</div>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }} onClick={() => handleCMSRemoveArticle(a.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
