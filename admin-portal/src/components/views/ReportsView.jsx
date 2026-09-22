import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  CheckSquare,
  Square,
  Printer,
  Table as TableIcon,
  Clock,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { MOCK_ORDERS } from '../../data/adminMockData';

export const ReportsView = ({ showToast }) => {
  const [reportType, setReportType] = useState('orders');
  const [dateRange, setDateRange] = useState('30D');
  const [fileFormat, setFileFormat] = useState('CSV');
  const [selectedFields, setSelectedFields] = useState([
    'id',
    'customer',
    'tailor',
    'category',
    'totalAmount',
    'orderStatus',
    'orderDate'
  ]);

  const fieldOptions = [
    { id: 'id', label: 'Order ID' },
    { id: 'customer', label: 'Customer Name' },
    { id: 'tailor', label: 'Assigned Tailor' },
    { id: 'designer', label: 'Designer Atelier' },
    { id: 'category', label: 'Category' },
    { id: 'totalAmount', label: 'Gross Amount (₹)' },
    { id: 'orderStatus', label: 'Current Stage' },
    { id: 'paymentStatus', label: 'Payment Gateway Status' },
    { id: 'orderDate', label: 'Order Date' },
    { id: 'estimatedDelivery', label: 'Estimated Delivery' }
  ];

  const archivedReports = [
    {
      name: 'August 2026 Executive Financial Report',
      type: 'Financial & GMV',
      size: '2.4 MB',
      date: '2026-09-01',
      records: '18,240 rows'
    },
    {
      name: 'Q2 2026 Partner Payouts & Commission Audit',
      type: 'Payout Audit',
      size: '4.8 MB',
      date: '2026-07-05',
      records: '42,100 rows'
    },
    {
      name: 'Stitching Quality & Failure Root Cause Q2',
      type: 'QC Report',
      size: '890 KB',
      date: '2026-07-02',
      records: '348 rows'
    },
    {
      name: 'Logistics SLA & Doorstep Delivery Transit',
      type: 'Operations SLA',
      size: '3.1 MB',
      date: '2026-08-15',
      records: '24,600 rows'
    }
  ];

  const toggleField = (fieldId) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((f) => f !== fieldId)
        : [...prev, fieldId]
    );
  };

  const formatCellValue = (row, field) => {
    if (!row) return '-';
    let val = row[field];

    if (field === 'customer') {
      return typeof row.customer === 'object' ? (row.customer?.name || '-') : (row.customer || '-');
    }
    if (field === 'totalAmount' || field === 'value') {
      const num = row.totalAmount ?? row.value;
      return num != null ? `₹${Number(num).toLocaleString('en-IN')}` : '-';
    }
    if (field === 'orderStatus' || field === 'status') {
      return row.orderStatus || row.status || '-';
    }
    if (field === 'estimatedDelivery' || field === 'expectedDate') {
      return row.estimatedDelivery || row.expectedDate || '-';
    }
    return val != null ? String(val) : '-';
  };

  const handleDownloadCsv = () => {
    const ordersList = Array.isArray(MOCK_ORDERS) ? MOCK_ORDERS : [];
    const headers = selectedFields
      .map((f) => fieldOptions.find((opt) => opt.id === f)?.label || f)
      .join(',');

    const rows = ordersList.map((order) =>
      selectedFields
        .map((field) => {
          let val = formatCellValue(order, field);
          if (typeof val === 'string' && val.includes(',')) {
            return `"${val}"`;
          }
          return val;
        })
        .join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `StitchBee_${reportType}_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast && showToast(`Report exported successfully as ${fileFormat}`, 'success');
  };

  const sampleOrders = Array.isArray(MOCK_ORDERS) ? MOCK_ORDERS.slice(0, 5) : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--sb-text-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText style={{ width: '22px', height: '22px', color: 'var(--sb-primary)' }} />
          Enterprise Reports & Data Export
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', margin: '4px 0 0 0' }}>
          Generate filtered analytical spreadsheets, financial summaries, and compliance audit exports.
        </p>
      </div>

      {/* Report Generator Control Card */}
      <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', borderBottom: '1px solid var(--sb-border-default)', paddingBottom: '12px', margin: 0 }}>
          Custom Export Builder
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {/* Step 1: Report Domain */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
            <label style={{ fontWeight: 700, color: 'var(--sb-text-title)' }}>
              1. Select Domain
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="sb-select-control"
              style={{ width: '100%' }}
            >
              <option value="orders">Orders & Production Pipeline</option>
              <option value="financial">Financial Gross Revenue & Net Take</option>
              <option value="tailors">Tailor Performance & Quality Scores</option>
              <option value="failures">Stitching Failure & Rework Audit</option>
              <option value="customers">Customer Cohorts & Spending</option>
            </select>
          </div>

          {/* Step 2: Date Range */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
            <label style={{ fontWeight: 700, color: 'var(--sb-text-title)' }}>
              2. Reporting Period
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="sb-select-control"
              style={{ width: '100%' }}
            >
              <option value="7D">Last 7 Days</option>
              <option value="30D">Last 30 Days</option>
              <option value="90D">Quarter to Date (Q3 2026)</option>
              <option value="1Y">Financial Year 2026-27</option>
            </select>
          </div>

          {/* Step 3: Export Format */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
            <label style={{ fontWeight: 700, color: 'var(--sb-text-title)' }}>
              3. Output Format
            </label>
            <div className="sb-pill-group" style={{ height: '36px' }}>
              {['CSV', 'Excel', 'PDF Print'].map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFileFormat(fmt)}
                  className={`sb-pill-btn ${fileFormat === fmt ? 'active' : ''}`}
                  style={{ flex: 1, height: '100%' }}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4: Checkbox Field Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '8px' }}>
          <label style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--sb-text-title)' }}>
            4. Choose Columns to Include ({selectedFields.length} selected)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
            {fieldOptions.map((opt) => {
              const isSelected = selectedFields.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleField(opt.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: 'var(--sb-radius-md)',
                    border: `1px solid ${isSelected ? 'var(--sb-primary)' : 'var(--sb-border-default)'}`,
                    backgroundColor: isSelected ? 'var(--sb-primary-light)' : 'var(--sb-bg-surface)',
                    color: isSelected ? 'var(--sb-primary)' : 'var(--sb-text-body)',
                    fontSize: '0.75rem',
                    fontWeight: isSelected ? 600 : 500,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all var(--sb-transition-fast)'
                  }}
                >
                  {isSelected ? (
                    <CheckSquare style={{ width: '16px', height: '16px', color: 'var(--sb-primary)', flexShrink: 0 }} />
                  ) : (
                    <Square style={{ width: '16px', height: '16px', color: 'var(--sb-text-muted)', flexShrink: 0 }} />
                  )}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--sb-border-default)', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>
            Estimated file size: ~450 KB • {selectedFields.length} columns selected
          </span>
          <button
            type="button"
            onClick={handleDownloadCsv}
            disabled={selectedFields.length === 0}
            className="sb-btn sb-btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.82rem' }}
          >
            <Download style={{ width: '16px', height: '16px' }} />
            Generate & Download {fileFormat}
          </button>
        </div>
      </div>

      {/* Live Sample Preview Table */}
      <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <TableIcon style={{ width: '18px', height: '18px', color: 'var(--sb-primary)' }} />
            Live Preview (First 5 Rows)
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>Live query response</span>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid var(--sb-border-default)', borderRadius: 'var(--sb-radius-md)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--sb-bg-surface-hover)', borderBottom: '1px solid var(--sb-border-default)', color: 'var(--sb-text-muted)', fontWeight: 600 }}>
                {selectedFields.map((f) => (
                  <th key={f} style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                    {fieldOptions.find((opt) => opt.id === f)?.label || f}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleOrders.length > 0 ? (
                sampleOrders.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--sb-border-default)', transition: 'background-color var(--sb-transition-fast)' }}>
                    {selectedFields.map((f) => (
                      <td key={f} style={{ padding: '10px 14px', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--sb-text-title)' }}>
                        {formatCellValue(row, f)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={selectedFields.length} style={{ padding: '24px', textAlign: 'center', color: 'var(--sb-text-muted)' }}>
                    No sample order records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pre-generated Monthly Reports Archive */}
      <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <FileSpreadsheet style={{ width: '18px', height: '18px', color: 'var(--sb-accent)' }} />
          Scheduled Monthly & Quarterly Archives
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {archivedReports.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--sb-radius-lg)',
                border: '1px solid var(--sb-border-default)',
                backgroundColor: 'var(--sb-bg-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                transition: 'border-color var(--sb-transition-fast)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <p style={{ fontWeight: 600, fontSize: '0.78rem', color: 'var(--sb-text-title)', margin: 0 }}>{item.name}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: 0 }}>
                  {item.records} • Generated {item.date} • {item.size}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  handleDownloadCsv();
                  showToast && showToast(`Downloaded ${item.name}`, 'success');
                }}
                className="sb-btn sb-btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', flexShrink: 0 }}
              >
                <Download style={{ width: '14px', height: '14px' }} />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
