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
  Sparkles
} from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_SERVICES } from '../../data/adminMockData';
import { StatusBadge } from '../common/StatusBadge';

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

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
            <Layers className="w-6 h-6 text-[var(--color-primary)]" />
            Catalog: Categories & Services
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
            Configure tailor disciplines, consumer styling categories, and standardized base pricing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'categories' ? (
            <button
              onClick={() =>
                setCategoryModal({
                  isOpen: true,
                  isEdit: false,
                  data: { id: '', name: '', basePrice: '', subcategories: '' }
                })
              }
              className="sb-btn-primary text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add New Category
            </button>
          ) : (
            <button
              onClick={() =>
                setServiceModal({
                  isOpen: true,
                  isEdit: false,
                  data: { id: '', category: "Men's Tailoring", name: '', price: '', estDays: '' }
                })
              }
              className="sb-btn-primary text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Tailoring Service
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)]">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === 'categories'
              ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-light)]'
              : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
          }`}
        >
          Categories ({categories.length})
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === 'services'
              ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-light)]'
              : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
          }`}
        >
          Services & Pricing ({services.length})
        </button>
      </div>

      {/* Search Input */}
      <div className="sb-card p-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder={
              activeTab === 'categories'
                ? 'Search categories or subcategories...'
                : 'Search services...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* Categories Tab Content */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories
            .filter((c) =>
              c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.subcategories.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map((cat) => (
              <div
                key={cat.id}
                className="sb-card p-5 flex flex-col justify-between space-y-4 hover:border-[var(--color-primary)] transition-all"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2">
                        {cat.name}
                        {cat.status === 'Active' ? (
                          <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-gray-400" />
                        )}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        Base starting price: <strong className="text-[var(--color-primary)]">₹{cat.basePrice}</strong> • {cat.ordersCount.toLocaleString()} lifetime orders
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleCategory(cat.id)}
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                      title={cat.status === 'Active' ? 'Disable Category' : 'Enable Category'}
                    >
                      {cat.status === 'Active' ? (
                        <ToggleRight className="w-6 h-6 text-[var(--color-success)]" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Subcategories list */}
                  <div className="mt-3">
                    <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                      Subcategories / Garment Types
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-[11px] text-[var(--color-text-muted)]">
                    ID: {cat.id}
                  </span>
                  <button
                    onClick={() =>
                      setCategoryModal({
                        isOpen: true,
                        isEdit: true,
                        data: {
                          id: cat.id,
                          name: cat.name,
                          basePrice: cat.basePrice,
                          subcategories: cat.subcategories.join(', ')
                        }
                      })
                    }
                    className="sb-btn-secondary text-xs py-1 px-2.5 flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Services Tab Content */}
      {activeTab === 'services' && (
        <div className="sb-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[var(--color-surface-hover)] border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Service Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Standard Price</th>
                  <th className="py-3 px-4">Est. SLA Turnaround</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {services
                  .filter(
                    (s) =>
                      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      s.category.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((srv) => (
                    <tr key={srv.id} className="hover:bg-[var(--color-surface-hover)]">
                      <td className="py-3 px-4 font-bold text-[var(--color-text)]">
                        {srv.name}
                      </td>
                      <td className="py-3 px-4 text-[var(--color-text-secondary)]">
                        {srv.category}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[var(--color-primary)]">
                        ₹{srv.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-[var(--color-text-muted)]">
                        {srv.estDays} Working Days
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={srv.status} />
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleToggleService(srv.id)}
                          className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] inline-block align-middle"
                          title="Toggle Status"
                        >
                          {srv.status === 'Active' ? (
                            <ToggleRight className="w-5 h-5 text-[var(--color-success)]" />
                          ) : (
                            <ToggleLeft className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <button
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
                          className="sb-btn-secondary text-xs py-1 px-2 inline-block align-middle"
                        >
                          Edit
                        </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-[var(--color-text)]">
              {categoryModal.isEdit ? 'Edit Category' : 'Add New Tailoring Category'}
            </h3>
            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="block text-[var(--color-text-secondary)] font-semibold mb-1">
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
                  className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] font-semibold mb-1">
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
                  className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] font-semibold mb-1">
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
                  className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() =>
                    setCategoryModal({
                      isOpen: false,
                      isEdit: false,
                      data: { id: '', name: '', basePrice: '', subcategories: '' }
                    })
                  }
                  className="sb-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="sb-btn-primary text-xs">
                  {categoryModal.isEdit ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {serviceModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-[var(--color-text)]">
              {serviceModal.isEdit ? 'Edit Service' : 'Add Tailoring Service'}
            </h3>
            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="block text-[var(--color-text-secondary)] font-semibold mb-1">
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
                  className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[var(--color-text-secondary)] font-semibold mb-1">
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
                  className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--color-text-secondary)] font-semibold mb-1">
                    Base Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="1200"
                    value={serviceModal.data.price}
                    onChange={(e) =>
                      setServiceModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, price: e.target.value }
                      }))
                    }
                    className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[var(--color-text-secondary)] font-semibold mb-1">
                    Est. Days
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="5"
                    value={serviceModal.data.estDays}
                    onChange={(e) =>
                      setServiceModal((prev) => ({
                        ...prev,
                        data: { ...prev.data, estDays: e.target.value }
                      }))
                    }
                    className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() =>
                    setServiceModal({
                      isOpen: false,
                      isEdit: false,
                      data: { id: '', category: "Men's Tailoring", name: '', price: '', estDays: '' }
                    })
                  }
                  className="sb-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="sb-btn-primary text-xs">
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
