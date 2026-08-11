import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Eye } from 'lucide-react';

export default function ActiveProjects({ projects, onViewAll }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter projects by search and status filter
  const filteredProjects = (projects || []).filter((p) => {
    const matchesSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.customer || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="sb-dashboard-card" style={{ height: '100%' }}>
      <div className="card-header-row">
        <div>
          <h3 className="card-heading">Active Design Projects</h3>
          <span className="card-subtext">Manage ongoing client outfits, progress & deadlines</span>
        </div>

        <button onClick={onViewAll} className="card-action-link">
          View All Projects →
        </button>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="table-filter-bar">
        <div className="search-input-box">
          <Search size={14} color="var(--sb-text-secondary)" />
          <input 
            type="text" 
            placeholder="Search project or client..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={13} color="var(--sb-text-secondary)" />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            style={{
              padding: '5px 10px',
              fontSize: '12px',
              borderRadius: '8px',
              border: '1px solid var(--sb-border)',
              background: 'var(--sb-bg-light)',
              color: 'var(--sb-navy)',
              fontWeight: 600,
              outline: 'none'
            }}
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Stitching">Stitching</option>
            <option value="Approved">Approved</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Projects List Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {paginatedProjects.map((p) => (
          <div key={p.id} className="project-card-row">
            
            {/* Thumbnail & Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '2', minWidth: '180px' }}>
              <img src={p.image} alt={p.name} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
              <div>
                <strong style={{ fontSize: '13px', fontWeight: 700, color: 'var(--sb-navy)', display: 'block' }}>
                  {p.name}
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--sb-text-secondary)' }}>
                  Client: {p.customer}
                </span>
              </div>
            </div>

            {/* Progress Bar Column */}
            <div style={{ flex: '1.2', minWidth: '130px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--sb-text-secondary)' }}>
                <span>Progress</span>
                <span style={{ color: p.statusColor, fontWeight: 700 }}>{p.progress}%</span>
              </div>
              <div className="real-bar-track" style={{ height: '5px' }}>
                <div className="real-bar-fill" style={{ width: `${p.progress}%`, background: p.statusColor }} />
              </div>
            </div>

            {/* Status & Deadline */}
            <div style={{ flex: '1', minWidth: '110px', textAlign: 'right' }}>
              <span 
                style={{ 
                  padding: '3px 8px', 
                  borderRadius: '10px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  background: p.statusBg, 
                  color: p.statusColor,
                  display: 'inline-block',
                  marginBottom: '2px'
                }}
              >
                {p.status}
              </span>
              <span style={{ display: 'block', fontSize: '10px', color: 'var(--sb-text-secondary)', fontWeight: 500 }}>
                Due: {p.deadline}
              </span>
            </div>

            {/* Amount & Action Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <strong style={{ fontSize: '14px', fontWeight: 700, color: '#F72585' }}>
                {p.amount}
              </strong>
              <button 
                onClick={onViewAll}
                title="View Details"
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--sb-border)', background: 'var(--sb-card-bg)', color: 'var(--sb-navy)', cursor: 'pointer' }}
              >
                <Eye size={13} />
              </button>
            </div>

          </div>
        ))}

        {paginatedProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px', fontSize: '13px', color: 'var(--sb-text-secondary)' }}>
            No matching projects found.
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      <div className="pagination-bar">
        <span>Showing {paginatedProjects.length} of {filteredProjects.length} projects</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(p => p - 1)}
            className="page-btn"
          >
            Prev
          </button>
          <span style={{ fontWeight: 600, fontSize: '12px' }}>Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(p => p + 1)}
            className="page-btn"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}
