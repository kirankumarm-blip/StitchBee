import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Download, Filter, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function DataTable({
  columns,
  data,
  searchPlaceholder = 'Search records...',
  searchField = 'name',
  onRowClick,
  onExportCsv,
  actions,
  filterOptions,
  filterField,
  title,
  subtitle,
  pageSize = 10
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Filtering
  const filteredData = useMemo(() => {
    let result = [...data];

    if (activeFilter !== 'All' && filterField) {
      result = result.filter(item => {
        const val = item[filterField];
        return String(val).toLowerCase() === String(activeFilter).toLowerCase();
      });
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(item => {
        // Search across all string/number fields of item
        return Object.values(item).some(val => {
          if (val === null || val === undefined) return false;
          if (typeof val === 'object') return false;
          return String(val).toLowerCase().includes(q);
        });
      });
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, activeFilter, filterField, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSort = (key) => {
    setSortConfig(current => {
      if (current.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = new Set(paginatedData.map((d, i) => d.id || i));
      setSelectedRows(allIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleExport = () => {
    if (onExportCsv) {
      onExportCsv(filteredData);
      return;
    }
    // Default CSV Export
    if (!filteredData.length) return;
    const headers = columns.map(c => c.header).join(',');
    const rows = filteredData.map(item => {
      return columns.map(c => {
        const val = c.accessor ? item[c.accessor] : '';
        return `"${String(val || '').replace(/"/g, '""')}"`;
      }).join(',');
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${title || 'export'}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="sb-card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Top Header & Search/Filter Bar */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--sb-border-default)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div>
          {title && <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>{title}</h3>}
          {subtitle && <p style={{ fontSize: '0.78rem', color: 'var(--sb-text-muted)', margin: 0 }}>{subtitle}</p>}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          {/* Search box */}
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--sb-text-muted)' }} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="sb-input"
              style={{ paddingLeft: '32px', height: '34px', fontSize: '0.82rem' }}
            />
          </div>

          {/* Filter Pill/Dropdown */}
          {filterOptions && filterOptions.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <select
                value={activeFilter}
                onChange={e => { setActiveFilter(e.target.value); setCurrentPage(1); }}
                className="sb-input sb-select"
                style={{ height: '34px', fontSize: '0.82rem', padding: '0 28px 0 10px', width: 'auto' }}
              >
                <option value="All">All Statuses</option>
                {filterOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}

          {/* Export CSV button */}
          <button
            onClick={handleExport}
            className="sb-btn sb-btn-secondary sb-btn-sm"
            style={{ height: '34px' }}
            title="Export CSV"
          >
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr style={{ background: 'var(--sb-bg-surface-subtle)', borderBottom: '1px solid var(--sb-border-default)' }}>
              <th style={{ padding: '10px 16px', width: '40px' }}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                  style={{ cursor: 'pointer', accentColor: 'var(--sb-primary)' }}
                />
              </th>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.sortable !== false && col.accessor && handleSort(col.accessor)}
                  style={{
                    padding: '11px 16px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--sb-text-muted)',
                    cursor: col.sortable !== false && col.accessor ? 'pointer' : 'default',
                    userSelect: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{col.header}</span>
                    {col.sortable !== false && col.accessor && sortConfig.key === col.accessor && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={13} color="var(--sb-primary)" /> : <ChevronDown size={13} color="var(--sb-primary)" />
                    )}
                  </div>
                </th>
              ))}
              {actions && <th style={{ padding: '11px 16px', textAlign: 'right', fontSize: '0.75rem', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 2 : 1)} style={{ padding: '48px 16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--sb-bg-surface-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sb-text-muted)' }}>
                      <Filter size={20} />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--sb-text-title)' }}>No matching records found</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)' }}>Try adjusting your search query or filters.</span>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rIdx) => {
                const rowId = row.id || rIdx;
                const isSelected = selectedRows.has(rowId);

                return (
                  <tr
                    key={rowId}
                    onClick={() => onRowClick && onRowClick(row)}
                    style={{
                      borderBottom: '1px solid var(--sb-border-subtle)',
                      background: isSelected ? 'var(--sb-primary-light)' : 'transparent',
                      cursor: onRowClick ? 'pointer' : 'default',
                      transition: 'background var(--sb-transition-fast)'
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) e.currentTarget.style.background = 'var(--sb-bg-surface-hover)';
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={e => handleSelectRow(rowId, e)}
                        onClick={e => e.stopPropagation()}
                        style={{ cursor: 'pointer', accentColor: 'var(--sb-primary)' }}
                      />
                    </td>
                    {columns.map((col, cIdx) => (
                      <td key={cIdx} style={{ padding: '12px 16px', fontSize: '0.84rem', color: 'var(--sb-text-body)', verticalAlign: 'middle' }}>
                        {col.render ? col.render(row) : (
                          col.isStatus ? <StatusBadge status={row[col.accessor]} /> : String(row[col.accessor] ?? '—')
                        )}
                      </td>
                    ))}
                    {actions && (
                      <td style={{ padding: '12px 16px', textAlign: 'right', whiteSpace: 'nowrap' }} onClick={e => e.stopPropagation()}>
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid var(--sb-border-default)',
        background: 'var(--sb-bg-surface)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        fontSize: '0.8rem',
        color: 'var(--sb-text-muted)'
      }}>
        <div>
          Showing <strong>{filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> to <strong>{Math.min(currentPage * pageSize, filteredData.length)}</strong> of <strong>{filteredData.length}</strong> entries
          {selectedRows.size > 0 && <span style={{ marginLeft: '8px', color: 'var(--sb-primary)', fontWeight: 600 }}>({selectedRows.size} selected)</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="sb-btn sb-btn-secondary sb-btn-sm"
            style={{ padding: '5px 8px' }}
          >
            <ChevronLeft size={14} />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="sb-btn sb-btn-secondary sb-btn-sm"
            style={{ padding: '5px 8px' }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
