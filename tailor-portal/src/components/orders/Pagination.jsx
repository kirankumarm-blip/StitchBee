import React from 'react';

export default function Pagination({ currentPage, totalPages, totalRows, pageSize, onPageChange, onPageSizeChange, startIndex, theme }) {
  if (totalRows === 0) return null;

  const endIndex = Math.min(startIndex + pageSize, totalRows);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>
          Showing {startIndex + 1}–{endIndex} of {totalRows} orders
        </span>
        <select 
          value={pageSize}
          onChange={e => onPageSizeChange(Number(e.target.value))}
          style={{ padding: '2px 6px', fontSize: '11px', borderRadius: '4px', border: '1px solid var(--border-color)', background: theme === 'dark' ? '#141126' : '#fff', color: 'var(--text-primary)' }}
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '4px' }}>
        <button 
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="btn btn-secondary" 
          style={{ padding: '4px 10px', fontSize: '11px', fontWeight: 600, opacity: currentPage === 1 ? 0.5 : 1 }}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button 
            key={p}
            onClick={() => onPageChange(p)}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              borderRadius: '4px',
              border: p === currentPage ? 'none' : '1px solid var(--border-color)',
              background: p === currentPage ? '#F72585' : (theme === 'dark' ? '#141126' : '#ffffff'),
              color: p === currentPage ? '#ffffff' : 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            {p}
          </button>
        ))}

        <button 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="btn btn-secondary" 
          style={{ padding: '4px 10px', fontSize: '11px', fontWeight: 600, opacity: currentPage === totalPages ? 0.5 : 1 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
