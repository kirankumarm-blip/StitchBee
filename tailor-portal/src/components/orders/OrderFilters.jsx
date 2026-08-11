import React from 'react';
import { Filter } from 'lucide-react';

export default function OrderFilters({ fabric, setFabric, minPrice, setMinPrice, onReset, theme }) {
  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <strong style={{ fontSize: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Filter size={14} color="#F72585" /> Advanced Filters:
      </strong>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Fabric:</span>
        <select 
          value={fabric}
          onChange={e => setFabric(e.target.value)}
          className="form-select"
          style={{ padding: '4px 8px', fontSize: '11px', borderRadius: '6px' }}
        >
          <option value="all">All Fabrics</option>
          <option value="silk">Silk</option>
          <option value="cotton">Cotton</option>
          <option value="georgette">Georgette</option>
          <option value="velvet">Velvet</option>
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Min Amount (₹):</span>
        <input 
          type="number"
          placeholder="e.g. 5000"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{ width: '90px', padding: '4px 8px', fontSize: '11px', borderRadius: '6px', border: '1px solid var(--border-color)', background: theme === 'dark' ? '#0b0914' : '#fff', color: 'var(--text-primary)' }}
        />
      </div>

      <button 
        onClick={onReset}
        style={{ background: 'none', border: 'none', color: '#F04438', fontSize: '11px', fontWeight: 600, cursor: 'pointer', marginLeft: 'auto' }}
      >
        Reset Filters
      </button>
    </div>
  );
}
