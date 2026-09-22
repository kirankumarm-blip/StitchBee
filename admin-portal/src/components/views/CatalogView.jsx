import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  CheckCircle,
  XCircle,
  Clock,
  IndianRupee,
  Search,
  Tag,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  X
} from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_SERVICES } from '../../data/adminMockData';
import StatusBadge from '../common/StatusBadge';

export const CatalogView = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [searchQuery, setSearchQuery] = useState('');

  // Add/Edit Category Modal State
  const [categoryModal, setCategoryModal] = useState({
    isOpen: false,
    isEdit: false,
    data: { id: '', name: '', basePrice: '', subcategories: '' }
  });

  // Add/Edit Service Modal State
  const [serviceModal, setServiceModal] = useState({
    isOpen: false,
    isEdit: false,
    data: { id: '', category: "Men's Tailoring", name: '', price: '', estDays: '' }
  });

  // Toggle Category Active State
  const handleToggleCategory = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'Active' ? 'Disabled' : 'Active' }
          : c
      )
    );
    showToast && showToast(`Category status updated`, 'success');
  };

  // Toggle Service Active State
  const handleToggleService = (id) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' }
          : s
      )
    );
    showToast && showToast(`Service status updated`, 'success');
  };

  // Save Category
  const handleSaveCategory = (e) => {
    e.preventDefault();
    const { isEdit, data } = categoryModal;
    const subcatsArray = typeof data.subcategories === 'string'
      ? data.subcategories.split(',').map((s) => s.trim()).filter(Boolean)
      : data.subcategories;

    if (isEdit) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === data.id
            ? {
                ...c,
                name: data.name,
                basePrice: parseInt(data.basePrice, 10) || c.basePrice,
                subcategories: subcatsArray
              }
            : c
        )
      );
      showToast && showToast(`Category "${data.name}" updated`, 'success');
    } else {
      const newCat = {
        id: `cat-${Date.now()}`,
        name: data.name,
        status: 'Active',
        ordersCount: 0,
        basePrice: parseInt(data.basePrice, 10) || 499,
        subcategories: subcatsArray
      };
      setCategories((prev) => [newCat, ...prev]);
      showToast && showToast(`New category "${data.name}" added`, 'success');
    }
    setCategoryModal({ isOpen: false, isEdit: false, data: { id: '', name: '', basePrice: '', subcategories: '' } });
  };

  // Save Service
  const handleSaveService = (e) => {
    e.preventDefault();
    const { isEdit, data } = serviceModal;

    if (isEdit) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === data.id
            ? {
                ...s,
                category: data.category,
                name: data.name,
                price: parseInt(data.price, 10) || s.price,
                estDays: parseInt(data.estDays, 10) || s.estDays
              }
            : s
        )
      );
      showToast && showToast(`Service "${data.name}" updated`, 'success');
    } else {
      const newSrv = {
        id: `srv-${Date.now()}`,
        category: data.category,
        name: data.name,
        price: parseInt(data.price, 10) || 500,
        estDays: parseInt(data.estDays, 10) || 3,
        status: 'Active'
      };
      setServices((prev) => [newSrv, ...prev]);
      showToast && showToast(`New service "${data.name}" added`, 'success');
    }
    setServiceModal({
      isOpen: false,
      isEdit: false,
      data: { id: '', category: "Men's Tailoring", name: '', price: '', estDays: '' }
    });
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subcategories.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--sb-text-title)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Layers style={{ width: '22px', height: '22px', color: 'var(--sb-primary)' }} />
            Catalog: Categories & Services
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', margin: '4px 0 0 0' }}>
            Configure tailor disciplines, consumer styling categories, and standardized base pricing.
          </p>
        </div>

        <div>
          {activeTab === 'categories' ? (
            <button
              type="button"
              onClick={() =>
                setCategoryModal({
                  isOpen: true,
                  isEdit: false,
                  data: { id: '', name: '', basePrice: '', subcategories: '' }
                })
              }
              className="sb-btn sb-btn-primary"
            >
              <Plus style={{ width: '15px', height: '15px' }} />
              Add New Category
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                setServiceModal({
                  isOpen: true,
                  isEdit: false,
                  data: { id: '', category: "Men's Tailoring", name: '', price: '', estDays: '' }
                })
              }
              className="sb-btn sb-btn-primary"
            >
              <Plus style={{ width: '15px', height: '15px' }} />
              Add Tailoring Service
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="sb-tabs-nav">
        <button
          type="button"
          onClick={() => setActiveTab('categories')}
          className={`sb-tab-item ${activeTab === 'categories' ? 'active' : ''}`}
        >
          Categories ({categories.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`sb-tab-item ${activeTab === 'services' ? 'active' : ''}`}
        >
          Services & Pricing ({services.length})
        </button>
      </div>

      {/* Search Input */}
      <div className="sb-card" style={{ padding: '12px 16px' }}>
        <div className="sb-search-box" style={{ maxWidth: '420px' }}>
          <Search style={{ width: '16px', height: '16px' }} />
          <input
            type="text"
            placeholder={
              activeTab === 'categories'
                ? 'Search categories or subcategories...'
                : 'Search services...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Tab Content */}
      {activeTab === 'categories' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="sb-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                padding: '20px',
                transition: 'border-color var(--sb-transition-fast)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                      {cat.name}
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: cat.status === 'Active' ? 'var(--sb-status-success)' : 'var(--sb-text-muted)'
                        }}
                      />
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: '4px 0 0 0' }}>
                      Base starting price: <strong style={{ color: 'var(--sb-primary)' }}>₹{cat.basePrice}</strong> • {cat.ordersCount?.toLocaleString?.() || 0} orders
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleCategory(cat.id)}
                    style={{ color: 'var(--sb-text-muted)', cursor: 'pointer' }}
                    title={cat.status === 'Active' ? 'Disable Category' : 'Enable Category'}
                  >
                    {cat.status === 'Active' ? (
                      <ToggleRight style={{ width: '26px', height: '26px', color: 'var(--sb-status-success)' }} />
                    ) : (
                      <ToggleLeft style={{ width: '26px', height: '26px', color: 'var(--sb-text-muted)' }} />
                    )}
                  </button>
                </div>

                {/* Subcategories list */}
                <div style={{ marginTop: '12px' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--sb-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 6px 0' }}>
                    Subcategories / Garment Types
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(cat.subcategories || []).map((sub, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 'var(--sb-radius-sm)',
                          fontSize: '0.72rem',
                          backgroundColor: 'var(--sb-bg-surface-hover)',
                          border: '1px solid var(--sb-border-default)',
                          color: 'var(--sb-text-body)'
                        }}
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ paddingTop: '12px', borderTop: '1px solid var(--sb-border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)' }}>
                  ID: {cat.id}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCategoryModal({
                      isOpen: true,
                      isEdit: true,
                      data: {
                        id: cat.id,
                        name: cat.name,
                        basePrice: cat.basePrice,
                        subcategories: Array.isArray(cat.subcategories) ? cat.subcategories.join(', ') : ''
                      }
                    })
                  }
                  className="sb-btn sb-btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  <Edit2 style={{ width: '12px', height: '12px' }} />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Services Tab Content */}
      {activeTab === 'services' && (
        <div className="sb-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--sb-bg-surface-hover)', borderBottom: '1px solid var(--sb-border-default)', color: 'var(--sb-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '12px 16px' }}>Service Name</th>
                  <th style={{ padding: '12px 16px' }}>Category</th>
                  <th style={{ padding: '12px 16px' }}>Standard Price</th>
                  <th style={{ padding: '12px 16px' }}>Est. SLA Turnaround</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((srv) => (
                  <tr key={srv.id} style={{ borderBottom: '1px solid var(--sb-border-default)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--sb-text-title)' }}>
                      {srv.name}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--sb-text-body)' }}>
                      {srv.category}
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--sb-primary)' }}>
                      ₹{srv.price.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--sb-text-muted)' }}>
                      {srv.estDays} Working Days
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <StatusBadge status={srv.status} />
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleService(srv.id)}
                          style={{ color: 'var(--sb-text-muted)', cursor: 'pointer' }}
                          title="Toggle Status"
                        >
                          {srv.status === 'Active' ? (
                            <ToggleRight style={{ width: '22px', height: '22px', color: 'var(--sb-status-success)' }} />
                          ) : (
                            <ToggleLeft style={{ width: '22px', height: '22px', color: 'var(--sb-text-muted)' }} />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setServiceModal({
                              isOpen: true,
                              isEdit: true,
                              data: {
                                id: srv.id,
                                category: srv.category,
                                name: srv.name,
                                price: srv.price,
                                estDays: srv.estDays
                              }
                            })
                          }
                          className="sb-btn sb-btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {categoryModal.isOpen && (
        <div className="sb-modal-backdrop">
          <div className="sb-modal-box" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
                {categoryModal.isEdit ? 'Edit Category' : 'Add New Tailoring Category'}
              </h3>
              <button
                type="button"
                onClick={() => setCategoryModal({ isOpen: false, isEdit: false, data: { id: '', name: '', basePrice: '', subcategories: '' } })}
                style={{ color: 'var(--sb-text-muted)' }}
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.78rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--sb-text-body)', fontWeight: 600, marginBottom: '6px' }}>
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Traditional Sherwanis"
                  value={categoryModal.data.name}
                  onChange={(e) =>
                    setCategoryModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, name: e.target.value }
                    }))
                  }
                  className="sb-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--sb-text-body)', fontWeight: 600, marginBottom: '6px' }}>
                  Starting Base Price (₹)
                </label>
                <input
                  type="number"
                  required
                  placeholder="499"
                  value={categoryModal.data.basePrice}
                  onChange={(e) =>
                    setCategoryModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, basePrice: e.target.value }
                    }))
                  }
                  className="sb-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--sb-text-body)', fontWeight: 600, marginBottom: '6px' }}>
                  Subcategories (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Silk Kurtas, Nehru Jackets, Dhoti Pants"
                  value={categoryModal.data.subcategories}
                  onChange={(e) =>
                    setCategoryModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, subcategories: e.target.value }
                    }))
                  }
                  className="sb-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '10px' }}>
                <button
                  type="button"
                  onClick={() =>
                    setCategoryModal({
                      isOpen: false,
                      isEdit: false,
                      data: { id: '', name: '', basePrice: '', subcategories: '' }
                    })
                  }
                  className="sb-btn sb-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="sb-btn sb-btn-primary">
                  {categoryModal.isEdit ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {serviceModal.isOpen && (
        <div className="sb-modal-backdrop">
          <div className="sb-modal-box" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
                {serviceModal.isEdit ? 'Edit Service' : 'Add Tailoring Service'}
              </h3>
              <button
                type="button"
                onClick={() => setServiceModal({ isOpen: false, isEdit: false, data: { id: '', category: "Men's Tailoring", name: '', price: '', estDays: '' } })}
                style={{ color: 'var(--sb-text-muted)' }}
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <form onSubmit={handleSaveService} style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.78rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--sb-text-body)', fontWeight: 600, marginBottom: '6px' }}>
                  Parent Category
                </label>
                <select
                  value={serviceModal.data.category}
                  onChange={(e) =>
                    setServiceModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, category: e.target.value }
                    }))
                  }
                  className="sb-select-control"
                  style={{ width: '100%' }}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--sb-text-body)', fontWeight: 600, marginBottom: '6px' }}>
                  Service Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wedding Sherwani Hand Embroidery"
                  value={serviceModal.data.name}
                  onChange={(e) =>
                    setServiceModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, name: e.target.value }
                    }))
                  }
                  className="sb-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--sb-text-body)', fontWeight: 600, marginBottom: '6px' }}>
                    Standard Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="750"
                    value={serviceModal.data.price}
                    onChange={(e) =>
                      setServiceModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, price: e.target.value }
                      }))
                    }
                    className="sb-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--sb-text-body)', fontWeight: 600, marginBottom: '6px' }}>
                    Turnaround (Days)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="3"
                    value={serviceModal.data.estDays}
                    onChange={(e) =>
                      setServiceModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, estDays: e.target.value }
                      }))
                    }
                    className="sb-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '10px' }}>
                <button
                  type="button"
                  onClick={() =>
                    setServiceModal({
                      isOpen: false,
                      isEdit: false,
                      data: { id: '', category: "Men's Tailoring", name: '', price: '', estDays: '' }
                    })
                  }
                  className="sb-btn sb-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="sb-btn sb-btn-primary">
                  {serviceModal.isEdit ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogView;
