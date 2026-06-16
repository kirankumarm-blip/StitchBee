import React, { useState } from 'react';
import { Scissors, ShoppingBag, TrendingUp, Check, Play, Award, Ruler, ArrowRight, Save, Plus, Trash2, Clock, Send, MessageSquare, ShieldAlert, Calendar, ShieldCheck, Database } from 'lucide-react';

export default function TailorView({ tailors, setTailors, orders, updateOrderStatus }) {
  // Simulating logged-in tailor: Vogue Craft Tailors (id: 't1') OR let user select store
  const [selectedStoreId, setSelectedStoreId] = useState('t1');
  const tailorProfile = tailors.find(t => t.id === selectedStoreId);

  // Registration form inputs (if pending/unregistered)
  const [regShopName, setRegShopName] = useState('');
  const [regOwner, setRegOwner] = useState('');
  const [regAadhaar, setRegAadhaar] = useState('');
  const [regPan, setRegPan] = useState('');
  const [regLicense, setRegLicense] = useState('');
  const [regGst, setRegGst] = useState('');
  const [regSpecialty, setRegSpecialty] = useState('Premium Suits & Blazers');
  const [regAddress, setRegAddress] = useState('');

  // Catalog edit state
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceDays, setNewServiceDays] = useState('');

  // Inventory adjustment state
  const [threadsCount, setThreadsCount] = useState(tailorProfile?.inventory?.threads || 120);
  const [fabricsCount, setFabricsCount] = useState(tailorProfile?.inventory?.fabrics || 30);
  const [materialsCount, setMaterialsCount] = useState(tailorProfile?.inventory?.materials || 50);

  // Vacation date scheduler state
  const [vacationDate, setVacationDate] = useState('');
  const [vacationList, setVacationList] = useState(['2026-06-12', '2026-06-15']);

  // Chat window state
  const [chatMode, setChatMode] = useState('customer'); // 'customer' | 'admin'
  const [typedMessage, setTypedMessage] = useState('');
  const [chatLogs, setChatLogs] = useState([
    { sender: 'customer', text: 'Hi, is my suit stitching ready?', time: '14:24' },
    { sender: 'tailor', text: 'Stitching is in progress, our student agent will deliver it soon.', time: '14:26' }
  ]);
  const [adminChats, setAdminChats] = useState([
    { sender: 'admin', text: 'Please verify your Aadhaar card details.', time: '10:00' },
    { sender: 'tailor', text: 'Documents uploaded, please approve shop.', time: '10:05' }
  ]);

  // Filter orders for this tailor
  const tailorOrders = orders.filter(o => o.tailorId === selectedStoreId);
  const activeOrders = tailorOrders.filter(o => o.status !== 'closed' && o.status !== 'cancelled');
  const completedOrders = tailorOrders.filter(o => ['completed', 'closed'].includes(o.status));

  // Stats
  const totalEarnings = completedOrders.reduce((acc, curr) => acc + curr.price, 0);
  const pendingCount = activeOrders.filter(o => o.status === 'placed').length;
  const stitchingCount = activeOrders.filter(o => ['stitching_started', 'measurement_completed'].includes(o.status)).length;

  // 1. Onboarding credits registration handler
  const handleOnboardSubmit = (e) => {
    e.preventDefault();
    if (!regShopName || !regOwner || !regAadhaar || !regPan) {
      alert('Please fill out Aadhaar, PAN, Shop Name, and Owner Name.');
      return;
    }

    const updated = tailors.map(t => {
      if (t.id === selectedStoreId) {
        return {
          ...t,
          name: regShopName,
          owner: regOwner,
          specialty: regSpecialty,
          address: regAddress || 'HSR Layout, Bengaluru',
          status: 'pending', // awaits admin verification
          credits: 50, // pay ₹50 registration fee
          documents: {
            aadhaar: regAadhaar,
            pan: regPan,
            license: regLicense || 'N/A',
            gst: regGst || 'Pending Verification'
          }
        };
      }
      return t;
    });

    setTailors(updated);
    alert('₹50 Onboarding credits processed. Documents submitted to Super Admin for verification!');
  };

  // 2. Catalog management
  const handleAddService = (e) => {
    e.preventDefault();
    if (!newServiceName || !newServicePrice || !newServiceDays) return;

    const newService = {
      id: 'ts-' + Math.floor(Math.random() * 10000),
      name: newServiceName,
      price: parseInt(newServicePrice),
      days: parseInt(newServiceDays)
    };

    const updated = tailors.map(t => {
      if (t.id === selectedStoreId) {
        return { ...t, services: [...t.services, newService] };
      }
      return t;
    });

    setTailors(updated);
    setNewServiceName('');
    setNewServicePrice('');
    setNewServiceDays('');
    alert('Service added successfully!');
  };

  const handleRemoveService = (serviceId) => {
    const updated = tailors.map(t => {
      if (t.id === selectedStoreId) {
        return { ...t, services: t.services.filter(s => s.id !== serviceId) };
      }
      return t;
    });
    setTailors(updated);
  };

  // 3. Inventory updates
  const handleSaveInventory = () => {
    const updated = tailors.map(t => {
      if (t.id === selectedStoreId) {
        return {
          ...t,
          inventory: {
            threads: parseInt(threadsCount),
            fabrics: parseInt(fabricsCount),
            materials: parseInt(materialsCount)
          }
        };
      }
      return t;
    });
    setTailors(updated);
    alert('Inventory Log updated successfully!');
  };

  // 4. Chat messaging
  const handleSendMessage = () => {
    if (!typedMessage) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newMsg = { sender: 'tailor', text: typedMessage, time: timeStr };

    if (chatMode === 'customer') {
      setChatLogs([...chatLogs, newMsg]);
    } else {
      setAdminChats([...adminChats, newMsg]);
    }
    setTypedMessage('');
  };

  return (
    <div className="view-container">
      
      {/* Selector to switch active store profile in the prototype */}
      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><strong>Prototype Sandbox:</strong> Switch Tailor Profile:</span>
        <select 
          className="form-select" 
          value={selectedStoreId} 
          onChange={e => {
            const id = e.target.value;
            setSelectedStoreId(id);
            const prof = tailors.find(t => t.id === id);
            setThreadsCount(prof?.inventory?.threads || 0);
            setFabricsCount(prof?.inventory?.fabrics || 0);
            setMaterialsCount(prof?.inventory?.materials || 0);
          }}
          style={{ width: '240px', padding: '6px' }}
        >
          {tailors.map(t => (
            <option key={t.id} value={t.id}>{t.name} (Status: {t.status})</option>
          ))}
        </select>
      </div>

      {/* RENDER ONBOARDING SCREEN IF UNAPPROVED */}
      {tailorProfile?.status === 'pending' && tailorProfile?.documents?.gst === 'Pending Verification' ? (
        <div className="glass-card-no-hover" style={{ padding: '40px', textAlign: 'center', margin: '20px 0' }}>
          <ShieldAlert size={56} style={{ color: 'var(--warning)', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>Store Registration Pending Approval</h3>
          <p style={{ color: 'var(--text-secondary)', maxDWidth: '500px', margin: '0 auto 24px auto', fontSize: '0.95rem' }}>
            We have received your document credentials. The StichBee Super Admin panel is verifying your Aadhaar, PAN, and License. You will be notified when verification succeeds.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.15)', padding: '14px', borderRadius: '8px', display: 'inline-block', fontSize: '0.85rem' }}>
            <strong>Credits Paid:</strong> ₹50 Onboarding Credits (Processed)
          </div>
        </div>
      ) : tailorProfile?.status === 'pending' || tailorProfile?.status === 'rejected' ? (
        /* Needs to fill credentials registration form */
        <div className="glass-card-no-hover" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
            <Award size={32} style={{ color: 'var(--primary)' }} />
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>StichBee Partner Onboarding</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pay ₹50 registration credits and submit legal identification for shop verification.</p>
            </div>
          </div>

          <form onSubmit={handleOnboardSubmit}>
            <div className="grid-cols-2">
              <div className="form-group">
                <label className="form-label">Shop Name</label>
                <input type="text" className="form-input" placeholder="e.g. Urban Stitch Studio" value={regShopName} onChange={e => setRegShopName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Master Tailor Owner Name</label>
                <input type="text" className="form-input" placeholder="e.g. David D'Souza" value={regOwner} onChange={e => setRegOwner(e.target.value)} required />
              </div>
            </div>

            <div className="grid-cols-2">
              <div className="form-group">
                <label className="form-label">Specialty Category</label>
                <input type="text" className="form-input" placeholder="e.g. Casual wear, Shirts & Alterations" value={regSpecialty} onChange={e => setRegSpecialty(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Shop Address</label>
                <input type="text" className="form-input" placeholder="Koramangala 5th Block, Bengaluru" value={regAddress} onChange={e => setRegAddress(e.target.value)} required />
              </div>
            </div>

            <div className="grid-cols-2">
              <div className="form-group">
                <label className="form-label">Aadhaar (UIDAI Number)</label>
                <input type="text" className="form-input" placeholder="e.g. 5544-3322-1100" value={regAadhaar} onChange={e => setRegAadhaar(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Permanent Account Number (PAN)</label>
                <input type="text" className="form-input" placeholder="e.g. JKLMN5544P" value={regPan} onChange={e => setRegPan(e.target.value)} required />
              </div>
            </div>

            <div className="grid-cols-2">
              <div className="form-group">
                <label className="form-label">Shop License No.</label>
                <input type="text" className="form-input" placeholder="e.g. LIC-KOR-9921" value={regLicense} onChange={e => setRegLicense(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">GSTIN (Optional)</label>
                <input type="text" className="form-input" placeholder="e.g. 29ABCDE1234F1Z5" value={regGst} onChange={e => setRegGst(e.target.value)} />
              </div>
            </div>

            <div style={{ background: 'rgba(247,37,133,0.06)', padding: '16px', borderRadius: '8px', border: '1px dashed var(--primary)', margin: '20px 0', fontSize: '0.85rem' }}>
              ⚠️ Onboarding requires a <strong>₹50 Registration fee</strong> (which generates ₹50 partner credits). Clicking submit will process this payment.
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Pay ₹50 & Submit Partner Documents
            </button>
          </form>
        </div>
      ) : (
        /* Approved tailors console dashboard */
        <div>
          
          {/* Headline details */}
          <div className="flex-row-between" style={{ flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Welcome back, Master {tailorProfile?.owner}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Storefront: <strong>{tailorProfile?.name}</strong> | credits Balance: <strong style={{ color: 'var(--accent)' }}>₹{tailorProfile?.credits}</strong>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} /> verified Store
              </span>
              <span className="badge badge-primary">
                <Scissors size={12} /> online
              </span>
            </div>
          </div>

          {/* Stats Analytics */}
          <div className="grid-cols-3" style={{ marginBottom: '40px' }}>
            <div className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(247,37,133,0.1)', color: 'var(--primary)' }}>
                <TrendingUp size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Shop Earnings</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#fff' }}>₹{totalEarnings}</div>
              </div>
            </div>

            <div className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(114,9,183,0.1)', color: '#a78bfa' }}>
                <ShoppingBag size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Placed Bookings</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#fff' }}>{pendingCount}</div>
              </div>
            </div>

            <div className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(76,201,240,0.1)', color: 'var(--accent)' }}>
                <Clock size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Stitching Now</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#fff' }}>{stitchingCount}</div>
              </div>
            </div>
          </div>

          {/* Main workspace layout grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            
            {/* Left Column: Orders & Messaging */}
            <div>
              {/* Order List */}
              <h3 className="section-title"><ShoppingBag size={20} style={{ color: 'var(--primary)' }} /> Store Order List</h3>
              {activeOrders.length === 0 ? (
                <div className="glass-card-no-hover" style={{ padding: '30px', color: 'var(--text-muted)', textAlignment: 'center', marginBottom: '40px' }}>
                  No active orders. Bookings from customer searches appear here.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                  {activeOrders.map(order => (
                    <div key={order.id} className="glass-card-no-hover" style={{ padding: '16px' }}>
                      <div className="flex-row-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px', marginBottom: '10px' }}>
                        <div>
                          <span style={{ fontWeight: '600', color: '#fff' }}>Order #{order.id}</span>
                          <span className="badge badge-primary" style={{ marginLeft: '10px' }}>{order.serviceName}</span>
                        </div>
                        <span className="badge badge-secondary" style={{ textTransform: 'uppercase' }}>{order.status.replace('_', ' ')}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <p><strong>Customer:</strong> {order.customerName}</p>
                        <p><strong>Sizes:</strong> Chest: {order.measurements.chest}", Waist: {order.measurements.waist}", Shoulder: {order.measurements.shoulder}"</p>
                      </div>

                      {/* Action buttons based on current state */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                        {order.status === 'placed' && (
                          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => updateOrderStatus(order.id, 'tailor_assigned')}>
                            Accept Order
                          </button>
                        )}
                        {order.status === 'tailor_assigned' && (
                          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => updateOrderStatus(order.id, 'pickup_scheduled')}>
                            Schedule Fabric Pickup
                          </button>
                        )}
                        {order.status === 'pickup_scheduled' && (
                          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => updateOrderStatus(order.id, 'picked_up')}>
                            Confirm fabric Received
                          </button>
                        )}
                        {order.status === 'picked_up' && (
                          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => updateOrderStatus(order.id, 'measurement_completed')}>
                            Confirm measurements Checked
                          </button>
                        )}
                        {order.status === 'measurement_completed' && (
                          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => updateOrderStatus(order.id, 'stitching_started')}>
                            Start Stitching
                          </button>
                        )}
                        {order.status === 'stitching_started' && (
                          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => updateOrderStatus(order.id, 'stitching_completed')}>
                            Finish Stitching
                          </button>
                        )}
                        {order.status === 'stitching_completed' && (
                          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => updateOrderStatus(order.id, 'quality_check')}>
                            quality verification Passed
                          </button>
                        )}
                        {order.status === 'quality_check' && (
                          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => updateOrderStatus(order.id, 'delivering')}>
                            Handover to Student delivery
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Chat Simulator Widget */}
              <h3 className="section-title"><MessageSquare size={20} style={{ color: 'var(--accent)' }} /> StitchBee Chat Center</h3>
              <div className="glass-card-no-hover" style={{ padding: '20px', display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', height: '340px' }}>
                {/* Chat list sidebar */}
                <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', paddingRight: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button 
                    className={`btn ${chatMode === 'customer' ? 'btn-primary' : 'btn-ghost'}`} 
                    style={{ padding: '8px', fontSize: '0.75rem', width: '100%', justifyContent: 'flex-start' }}
                    onClick={() => setChatMode('customer')}
                  >
                    Customer chat
                  </button>
                  <button 
                    className={`btn ${chatMode === 'admin' ? 'btn-primary' : 'btn-ghost'}`} 
                    style={{ padding: '8px', fontSize: '0.75rem', width: '100%', justifyContent: 'flex-start' }}
                    onClick={() => setChatMode('admin')}
                  >
                    Admin Support
                  </button>
                </div>

                {/* Active chat window */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '10px', background: 'rgba(0,0,0,0.15)', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                    {(chatMode === 'customer' ? chatLogs : adminChats).map((msg, idx) => (
                      <div key={idx} style={{ alignSelf: msg.sender === 'tailor' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                        <div 
                          style={{
                            padding: '8px 12px', borderRadius: '12px', fontSize: '0.8rem',
                            background: msg.sender === 'tailor' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            color: '#fff'
                          }}
                        >
                          {msg.text}
                        </div>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block', textAlign: msg.sender === 'tailor' ? 'right' : 'left' }}>
                          {msg.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="Type message..." 
                      className="form-input" 
                      value={typedMessage} 
                      onChange={e => setTypedMessage(e.target.value)} 
                      style={{ padding: '8px' }}
                    />
                    <button className="btn btn-primary" style={{ padding: '8px 16px' }} onClick={handleSendMessage}>
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inventory, Calendars */}
            <div>
              {/* Inventory Management */}
              <h3 className="section-title"><Database size={20} style={{ color: 'var(--accent)' }} /> Inventory Logs</h3>
              <div className="glass-card-no-hover" style={{ padding: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Thread Spools count</label>
                    <input type="number" className="form-input" value={threadsCount} onChange={e => setThreadsCount(e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">fabric meters in Stock</label>
                    <input type="number" className="form-input" value={fabricsCount} onChange={e => setFabricsCount(e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Sewing Materials count (needles, zippers)</label>
                    <input type="number" className="form-input" value={materialsCount} onChange={e => setMaterialsCount(e.target.value)} />
                  </div>
                  <button className="btn btn-primary" style={{ marginTop: '4px' }} onClick={handleSaveInventory}>
                    Save Logs
                  </button>
                </div>
              </div>

              {/* Vacation Calendar Planner */}
              <h3 className="section-title"><Calendar size={20} style={{ color: 'var(--primary)' }} /> Vacation scheduler</h3>
              <div className="glass-card-no-hover" style={{ padding: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                  <input type="date" className="form-input" style={{ padding: '6px' }} value={vacationDate} onChange={e => setVacationDate(e.target.value)} />
                  <button className="btn btn-primary" style={{ padding: '6px 12px' }} onClick={() => { if (vacationDate) { setVacationList([...vacationList, vacationDate]); setVacationDate(''); } }}>
                    Add
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {vacationList.map((dt, idx) => (
                    <div key={idx} className="flex-row-between" style={{ padding: '6px 10px', background: 'rgba(0,0,0,0.15)', borderRadius: '4px', fontSize: '0.8rem' }}>
                      <span>🌴 Shop Closed: {dt}</span>
                      <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }} onClick={() => setVacationList(vacationList.filter((_,i) => i !== idx))}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catalog Manager */}
              <h3 className="section-title"><Scissors size={20} /> catalog</h3>
              <div className="glass-card-no-hover" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Publish Stitching service</h4>
                <form onSubmit={handleAddService} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input type="text" placeholder="Title" className="form-input" value={newServiceName} onChange={e => setNewServiceName(e.target.value)} required style={{ padding: '6px' }} />
                  <div className="grid-cols-2" style={{ gap: '8px' }}>
                    <input type="number" placeholder="Price (₹)" className="form-input" value={newServicePrice} onChange={e => setNewServicePrice(e.target.value)} required style={{ padding: '6px' }} />
                    <input type="number" placeholder="Days" className="form-input" value={newServiceDays} onChange={e => setNewServiceDays(e.target.value)} required style={{ padding: '6px' }} />
                  </div>
                  <button type="submit" className="btn btn-secondary" style={{ padding: '8px' }}>Add Service</button>
                </form>

                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tailorProfile?.services.map(ser => (
                    <div key={ser.id} className="flex-row-between" style={{ padding: '8px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px', fontSize: '0.8rem' }}>
                      <div>
                        <strong>{ser.name}</strong>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>₹{ser.price} • {ser.days} Days</div>
                      </div>
                      <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }} onClick={() => handleRemoveService(ser.id)}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
