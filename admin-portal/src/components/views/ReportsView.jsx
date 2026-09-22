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
    'status',
    'orderDate'
  ]);

  const fieldOptions = [
    { id: 'id', label: 'Order ID' },
    { id: 'customer', label: 'Customer Name' },
    { id: 'tailor', label: 'Assigned Tailor' },
    { id: 'designer', label: 'Designer Atelier' },
    { id: 'category', label: 'Category' },
    { id: 'totalAmount', label: 'Gross Amount (₹)' },
    { id: 'status', label: 'Current Stage' },
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

  const handleDownloadCsv = () => {
    // Generate CSV string based on selectedFields
    const headers = selectedFields
      .map((f) => fieldOptions.find((opt) => opt.id === f)?.label || f)
      .join(',');

    const rows = MOCK_ORDERS.map((order) =>
      selectedFields
        .map((field) => {
          let val = order[field];
          if (field === 'customer') val = order.customer?.name || '-';
          if (typeof val === 'string' && val.includes(',')) {
            return `"${val}"`;
          }
          return val ?? '-';
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

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
          <FileText className="w-6 h-6 text-[var(--color-primary)]" />
          Enterprise Reports & Data Export
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
          Generate filtered analytical spreadsheets, financial summaries, and compliance audit exports.
        </p>
      </div>

      {/* Report Generator Control Card */}
      <div className="sb-card p-6 space-y-6">
        <h3 className="font-bold text-base text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">
          Custom Export Builder
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Report Domain */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-[var(--color-text)] block">
              1. Select Domain
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none"
            >
              <option value="orders">Orders & Production Pipeline</option>
              <option value="financial">Financial Gross Revenue & Net Take</option>
              <option value="tailors">Tailor Performance & Quality Scores</option>
              <option value="failures">Stitching Failure & Rework Audit</option>
              <option value="customers">Customer Cohorts & Spending</option>
            </select>
          </div>

          {/* Step 2: Date Range */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-[var(--color-text)] block">
              2. Reporting Period
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none"
            >
              <option value="7D">Last 7 Days</option>
              <option value="30D">Last 30 Days</option>
              <option value="90D">Quarter to Date (Q3 2026)</option>
              <option value="1Y">Financial Year 2026-27</option>
            </select>
          </div>

          {/* Step 3: Export Format */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-[var(--color-text)] block">
              3. Output Format
            </label>
            <div className="flex gap-2">
              {['CSV', 'Excel', 'PDF Print'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFileFormat(fmt)}
                  className={`flex-1 py-2 rounded-lg font-semibold border transition-all ${
                    fileFormat === fmt
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4: Checkbox Field Selector */}
        <div className="space-y-2 pt-2">
          <label className="font-bold text-xs text-[var(--color-text)] block">
            4. Choose Columns to Include
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {fieldOptions.map((opt) => {
              const isSelected = selectedFields.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleField(opt.id)}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-xs text-left transition-all ${
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
                  )}
                  <span className="truncate">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
          <span className="text-xs text-[var(--color-text-muted)]">
            Estimated file size: ~450 KB • {selectedFields.length} columns selected
          </span>
          <button
            onClick={handleDownloadCsv}
            disabled={selectedFields.length === 0}
            className="sb-btn-primary text-xs py-2 px-5 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Generate & Download {fileFormat}
          </button>
        </div>
      </div>

      {/* Live Sample Preview Table */}
      <div className="sb-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-[var(--color-primary)]" />
            Live Preview (First 5 Rows)
          </h3>
          <span className="text-xs text-[var(--color-text-muted)]">Live query response</span>
        </div>

        <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--color-surface-hover)] border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold">
              <tr>
                {selectedFields.map((f) => (
                  <th key={f} className="py-2.5 px-3">
                    {fieldOptions.find((opt) => opt.id === f)?.label || f}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {MOCK_ORDERS.slice(0, 5).map((row, idx) => (
                <tr key={idx} className="hover:bg-[var(--color-surface-hover)]">
                  {selectedFields.map((f) => {
                    let val = row[f];
                    if (f === 'customer') val = row.customer?.name || '-';
                    if (f === 'totalAmount') val = `₹${val.toLocaleString('en-IN')}`;
                    return (
                      <td key={f} className="py-2.5 px-3 truncate max-w-[200px]">
                        {val ?? '-'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pre-generated Monthly Reports Archive */}
      <div className="sb-card p-5 space-y-4">
        <h3 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-[var(--color-accent)]" />
          Scheduled Monthly & Quarterly Archives
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {archivedReports.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between hover:border-[var(--color-primary)] transition-all"
            >
              <div className="space-y-1">
                <p className="font-semibold text-xs text-[var(--color-text)]">{item.name}</p>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  {item.records} • Generated {item.date} • {item.size}
                </p>
              </div>

              <button
                onClick={() => {
                  handleDownloadCsv();
                  showToast && showToast(`Downloaded ${item.name}`, 'success');
                }}
                className="sb-btn-secondary text-xs py-1 px-2.5 flex items-center gap-1 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
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
