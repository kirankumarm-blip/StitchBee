import React, { useState } from 'react';
import { Award, BookOpen, ChevronRight, DollarSign, MapPin, Ruler, CheckCircle, Truck, Wallet, Check, AlertCircle } from 'lucide-react';
import { TRAINING_SLIDES, TRAINING_QUIZ } from '../utils/mockDb';

export default function StudentView({ orders, updateOrderMeasurements, updateOrderStatus, studentState, setStudentState }) {
  // Local state for interactive training
  const [slideIndex, setSlideIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFailed, setQuizFailed] = useState(false);
  const [activeTab, setActiveTab] = useState('training'); // 'training' | 'gigs' | 'wallet'

  // Measurement input form state
  const [measuringOrderId, setMeasuringOrderId] = useState(null);
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [shoulder, setShoulder] = useState('');
  const [length, setLength] = useState('');
  const [collar, setCollar] = useState('');
  const [sleeves, setSleeves] = useState('');

  // 1. Identify Gigs based on Order States
  // A measurement gig is available if an order requires student measurement, is approved ('measurement_scheduled'),
  // and measurements are not yet taken.
  const availableMeasurementGigs = orders.filter(
    o => o.measurementType === 'student' && 
         o.status === 'measurement_scheduled' && 
         (!o.measurements || o.measurements.chest === 0) &&
         o.studentId !== 'stud-active'
  );

  // A delivery gig is available if the order requires student delivery, and status is 'ready'
  const availableDeliveryGigs = orders.filter(
    o => o.deliveryType === 'student' && 
         o.status === 'ready' && 
         o.studentId !== 'stud-active'
  );

  // Active gigs assigned to our logged-in student
  const activeGigs = orders.filter(
    o => o.studentId === 'stud-active' && ['measurement_scheduled', 'ready', 'delivering'].includes(o.status)
  );

  // Completed gigs for our logged-in student
  const completedGigs = orders.filter(
    o => o.studentId === 'stud-active' && o.status === 'completed'
  );

  // 2. Training Module Handlers
  const handleQuizAnswer = (questionId, optionIdx) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: optionIdx });
  };

  const submitQuiz = () => {
    if (Object.keys(quizAnswers).length < TRAINING_QUIZ.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    let allCorrect = true;
    TRAINING_QUIZ.forEach(q => {
      if (quizAnswers[q.id] !== q.answer) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      const updatedState = {
        ...studentState,
        certified: true,
        quizPassed: true
      };
      setStudentState(updatedState);
      setQuizSubmitted(true);
      setQuizFailed(false);
      setActiveTab('gigs');
      alert('Congratulations! You got 100% and are now a Certified StichBee Partner!');
    } else {
      setQuizFailed(true);
      alert('Incorrect answers found. Please review the slides and try again!');
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizFailed(false);
    setSlideIndex(0);
  };

  // 3. Gig Actions
  const acceptGig = (orderId, type) => {
    // Assign studentId to 'stud-active' in global orders
    // In our simplified props, we will invoke state updates through updateOrderStatus / updateOrderMeasurements
    // We add studentId to the order state
    updateOrderStatus(orderId, undefined, 'stud-active');
  };

  const submitMeasurements = (e) => {
    e.preventDefault();
    if (!chest || !waist || !shoulder || !length || !collar || !sleeves) {
      alert('Please fill out all measurements.');
      return;
    }

    const sizes = {
      chest: parseFloat(chest),
      waist: parseFloat(waist),
      shoulder: parseFloat(shoulder),
      length: parseFloat(length),
      collar: parseFloat(collar),
      sleeves: parseFloat(sleeves)
    };

    updateOrderMeasurements(measuringOrderId, sizes);
    
    // Automatically transition order to stitching status since measurements are uploaded
    updateOrderStatus(measuringOrderId, 'stitching');
    
    // Update student wallet payouts: add ₹100 for measurement gig
    const updatedState = {
      ...studentState,
      wallet: {
        earnings: studentState.wallet.earnings + 100,
        completedGigs: studentState.wallet.completedGigs + 1
      }
    };
    setStudentState(updatedState);
    
    // Reset form
    setMeasuringOrderId(null);
    setChest(''); setWaist(''); setShoulder(''); setLength(''); setCollar(''); setSleeves('');
    alert('Measurements submitted successfully! Payout of ₹100 added to your wallet.');
  };

  const handleDeliveryStep = (order) => {
    if (order.status === 'ready') {
      // Pick up order
      updateOrderStatus(order.id, 'delivering');
    } else if (order.status === 'delivering') {
      // Deliver order
      updateOrderStatus(order.id, 'completed');
      
      // Update student wallet payouts: add ₹50 for delivery gig
      const updatedState = {
        ...studentState,
        wallet: {
          earnings: studentState.wallet.earnings + 50,
          completedGigs: studentState.wallet.completedGigs + 1
        }
      };
      setStudentState(updatedState);
      alert('Order marked as DELIVERED. Payout of ₹50 added to your wallet!');
    }
  };

  return (
    <div className="view-container">
      
      {/* Student Hub Header */}
      <div className="flex-row-between" style={{ flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>StichBee Student Gig Hub</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Learn precise measurement tailoring skills and take local delivery jobs to fund your studies.
          </p>
        </div>

        {studentState.certified ? (
          <span className="badge badge-success" style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={16} /> Certified Partner
          </span>
        ) : (
          <span className="badge badge-warning" style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={16} /> Needs Certification
          </span>
        )}
      </div>

      {/* Navigation tabs */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '32px' }}>
        <button 
          className={`btn ${activeTab === 'training' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('training')}
        >
          <BookOpen size={16} /> Training & Quiz
        </button>
        
        <button 
          className={`btn ${activeTab === 'gigs' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => {
            if (!studentState.certified) {
              alert('Please complete the training & pass the quiz to unlock available gigs.');
              return;
            }
            setActiveTab('gigs');
          }}
          disabled={!studentState.certified && activeTab !== 'training'}
        >
          <Ruler size={16} /> Active & Available Gigs
        </button>

        <button 
          className={`btn ${activeTab === 'wallet' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('wallet')}
        >
          <Wallet size={16} /> Wallet & Earnings
        </button>
      </div>

      {/* Tab 1: Interactive Training Module */}
      {activeTab === 'training' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Lecture slides */}
          <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '340px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span className="badge badge-primary">Slide {slideIndex + 1} of {TRAINING_SLIDES.length}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tailoring Fundamentals</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{TRAINING_SLIDES[slideIndex].title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>{TRAINING_SLIDES[slideIndex].content}</p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setSlideIndex(prev => Math.max(0, prev - 1))}
                disabled={slideIndex === 0}
              >
                Previous
              </button>
              
              {slideIndex < TRAINING_SLIDES.length - 1 ? (
                <button 
                  className="btn btn-primary" 
                  onClick={() => setSlideIndex(prev => prev + 1)}
                >
                  Next Slide <ChevronRight size={14} />
                </button>
              ) : (
                <span style={{ color: 'var(--success)', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ✓ Study complete! Take quiz →
                </span>
              )}
            </div>
          </div>

          {/* Interactive Quiz */}
          <div className="glass-card-no-hover" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} style={{ color: 'var(--primary)' }} /> Certification Exam
            </h3>
            
            {studentState.quizPassed ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle size={56} style={{ color: 'var(--success)', marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>You are certified!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>You have passed the measurement certification. Gigs tab is now unlocked!</p>
                <button className="btn btn-accent" onClick={() => setActiveTab('gigs')}>
                  Browse Gig Board
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {TRAINING_QUIZ.map((q) => (
                  <div key={q.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '16px' }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '10px' }}>Q{q.id}. {q.question}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {q.options.map((opt, oIdx) => {
                        const isSelected = quizAnswers[q.id] === oIdx;
                        return (
                          <div 
                            key={oIdx} 
                            onClick={() => handleQuizAnswer(q.id, oIdx)}
                            style={{
                              padding: '10px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem',
                              border: `1px solid ${isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.06)'}`,
                              background: isSelected ? 'rgba(247,37,133,0.1)' : 'rgba(255,255,255,0.02)',
                              color: isSelected ? '#fff' : 'var(--text-secondary)'
                            }}
                          >
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {quizFailed && (
                  <div style={{ color: 'var(--danger)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertCircle size={14} /> You answered some questions incorrectly. Please re-read the slides and retry.
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button className="btn btn-secondary" onClick={resetQuiz}>Reset Quiz</button>
                  <button className="btn btn-primary" onClick={submitQuiz}>Submit & Certify</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Gigs (Measurement & Delivery Opportunities) */}
      {activeTab === 'gigs' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          
          {/* Available Jobs Board */}
          <div>
            <h3 className="section-title"><Ruler size={18} style={{ color: 'var(--accent)' }} /> Available Gig Board</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Measurement Gigs */}
              {availableMeasurementGigs.length === 0 && availableDeliveryGigs.length === 0 ? (
                <div className="glass-card-no-hover" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No available gigs in your neighborhood right now. Try booking an order in the <strong>Customer View</strong> first to generate jobs!
                </div>
              ) : (
                <>
                  {availableMeasurementGigs.map(order => (
                    <div key={order.id} className="glass-card-no-hover animate-fade-in" style={{ padding: '16px' }}>
                      <div className="flex-row-between" style={{ marginBottom: '8px' }}>
                        <span className="badge badge-primary"><Ruler size={10} /> Measurement Assistant Gig</span>
                        <span style={{ fontWeight: '700', color: 'var(--accent)' }}>₹100 Payout</span>
                      </div>
                      <h4 style={{ fontSize: '1rem', color: '#fff' }}>Fit measurements for {order.customerName}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        📍 Customer: {order.customerAddress}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        ✂️ Tailor Store: {order.tailorName}
                      </p>
                      <div className="flex-row-between" style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--warning)' }}>Slot: {order.date} @ {order.timeSlot}</span>
                        <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => acceptGig(order.id, 'measurement')}>
                          Accept Gig
                        </button>
                      </div>
                    </div>
                  ))}

                  {availableDeliveryGigs.map(order => (
                    <div key={order.id} className="glass-card-no-hover animate-fade-in" style={{ padding: '16px' }}>
                      <div className="flex-row-between" style={{ marginBottom: '8px' }}>
                        <span className="badge badge-success"><Truck size={10} /> Doorstep Delivery Gig</span>
                        <span style={{ fontWeight: '700', color: 'var(--accent)' }}>₹50 Payout</span>
                      </div>
                      <h4 style={{ fontSize: '1rem', color: '#fff' }}>Pickup & Deliver Finished Garment</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        🏢 Pick From: <strong>{order.tailorName}</strong> ({order.tailorId === 't1' ? 'Sector 4, HSR' : 'Indiranagar'})
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        📍 Drop To: {order.customerName} ({order.customerAddress})
                      </p>
                      <div className="flex-row-between" style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Weight: ~1.2kg (Lightweight)</span>
                        <button className="btn btn-accent" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => acceptGig(order.id, 'delivery')}>
                          Accept Gig
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Active Assigned Jobs */}
          <div>
            <h3 className="section-title"><CheckCircle size={18} style={{ color: 'var(--success)' }} /> Your Active Gigs ({activeGigs.length})</h3>
            
            {activeGigs.length === 0 ? (
              <div className="glass-card-no-hover" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                You have no accepted active gigs. Click "Accept Gig" on the left to start earning.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activeGigs.map(order => {
                  const isMeasurementTask = order.measurementType === 'student' && (!order.measurements || order.measurements.chest === 0);
                  
                  return (
                    <div key={order.id} className="glass-card-no-hover" style={{ padding: '16px', borderLeft: `4px solid ${isMeasurementTask ? 'var(--primary)' : 'var(--success)'}` }}>
                      <div className="flex-row-between" style={{ marginBottom: '8px' }}>
                        <span className="badge badge-secondary">
                          {isMeasurementTask ? 'Measurement Form Pending' : `Delivery Status: ${order.status}`}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>Order #{order.id}</span>
                      </div>

                      <div style={{ margin: '8px 0', fontSize: '0.85rem' }}>
                        <p><strong>Customer:</strong> {order.customerName}</p>
                        <p style={{ color: 'var(--text-secondary)' }}>📍 {order.customerAddress}</p>
                        <p style={{ marginTop: '4px' }}><strong>Tailor:</strong> {order.tailorName}</p>
                      </div>

                      {/* Display Action based on gig type */}
                      {isMeasurementTask ? (
                        <div style={{ marginTop: '12px' }}>
                          {measuringOrderId === order.id ? (
                            <form onSubmit={submitMeasurements} style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px' }}>
                              <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '600', marginBottom: '8px' }}>Record Body Sizes (Inches)</p>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                  <label className="form-label" style={{ fontSize: '0.65rem' }}>Chest</label>
                                  <input type="number" step="0.1" className="form-input" style={{ padding: '6px', fontSize: '0.8rem' }} value={chest} onChange={e => setChest(e.target.value)} required />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                  <label className="form-label" style={{ fontSize: '0.65rem' }}>Waist</label>
                                  <input type="number" step="0.1" className="form-input" style={{ padding: '6px', fontSize: '0.8rem' }} value={waist} onChange={e => setWaist(e.target.value)} required />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                  <label className="form-label" style={{ fontSize: '0.65rem' }}>Shoulder</label>
                                  <input type="number" step="0.1" className="form-input" style={{ padding: '6px', fontSize: '0.8rem' }} value={shoulder} onChange={e => setShoulder(e.target.value)} required />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                  <label className="form-label" style={{ fontSize: '0.65rem' }}>Length</label>
                                  <input type="number" step="0.1" className="form-input" style={{ padding: '6px', fontSize: '0.8rem' }} value={length} onChange={e => setLength(e.target.value)} required />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                  <label className="form-label" style={{ fontSize: '0.65rem' }}>Collar</label>
                                  <input type="number" step="0.1" className="form-input" style={{ padding: '6px', fontSize: '0.8rem' }} value={collar} onChange={e => setCollar(e.target.value)} required />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                  <label className="form-label" style={{ fontSize: '0.65rem' }}>Sleeves</label>
                                  <input type="number" step="0.1" className="form-input" style={{ padding: '6px', fontSize: '0.8rem' }} value={sleeves} onChange={e => setSleeves(e.target.value)} required />
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => setMeasuringOrderId(null)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Submit Sizes</button>
                              </div>
                            </form>
                          ) : (
                            <button className="btn btn-primary" style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }} onClick={() => setMeasuringOrderId(order.id)}>
                              Open Measurement Entry Form
                            </button>
                          )}
                        </div>
                      ) : (
                        // Delivery Task
                        <div style={{ marginTop: '12px' }}>
                          <button 
                            className="btn btn-accent" 
                            style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }}
                            onClick={() => handleDeliveryStep(order)}
                          >
                            {order.status === 'ready' && 'Confirm Pickup from Tailor shop'}
                            {order.status === 'delivering' && 'Mark as Successfully Delivered'}
                          </button>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 3: Wallet Tracker */}
      {activeTab === 'wallet' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          
          <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ padding: '16px', borderRadius: '50%', background: 'rgba(76,201,240,0.1)', color: 'var(--accent)', marginBottom: '16px' }}>
              <Wallet size={40} />
            </div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>StichBee Ledger</h3>
            <div style={{ fontSize: '2.4rem', fontWeight: '800', color: '#fff', margin: '8px 0' }}>₹{studentState.wallet.earnings}</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Completed Jobs: <strong>{studentState.wallet.completedGigs}</strong>
            </p>
            <button className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }} onClick={() => alert('Withdrawal request of ₹' + studentState.wallet.earnings + ' submitted! Funds will transfer to your registered UPI ID in 24 hours.')}>
              Withdraw Earnings
            </button>
          </div>

          <div className="glass-card-no-hover" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Payout Transactions History</h3>
            
            {completedGigs.length === 0 && studentState.wallet.completedGigs === 1 ? (
              // Seeded transaction
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="flex-row-between" style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>Measurement Payout - Order #ord-101</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed 2026-05-25</div>
                  </div>
                  <span style={{ color: 'var(--success)', fontWeight: '700' }}>+₹100</span>
                </div>
                <div className="flex-row-between" style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>Delivery Payout - Order #ord-101</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed 2026-05-25</div>
                  </div>
                  <span style={{ color: 'var(--success)', fontWeight: '700' }}>+₹50</span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No recent transactions recorded. Completed gigs show details here.</div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
