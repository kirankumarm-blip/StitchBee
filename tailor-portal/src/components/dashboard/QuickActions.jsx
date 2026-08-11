import React from 'react';
import { Plus, FileText, Upload, Users, Calendar } from 'lucide-react';

export default function QuickActions({ onNavigateAction }) {
  return (
    <div className="quick-actions-bar">
      <button 
        onClick={() => onNavigateAction && onNavigateAction('studio', 'create')}
        className="btn-action-primary"
      >
        <Plus size={15} /> Create Design
      </button>

      <button 
        onClick={() => onNavigateAction && onNavigateAction('studio', 'requests')}
        className="btn-action-secondary"
      >
        <FileText size={15} color="#8B12C8" /> New Design Request (6)
      </button>

      <button 
        onClick={() => onNavigateAction && onNavigateAction('studio')}
        className="btn-action-secondary"
      >
        <Upload size={15} /> Upload Sketch
      </button>

      <button 
        onClick={() => onNavigateAction && onNavigateAction('customers')}
        className="btn-action-secondary"
      >
        <Users size={15} /> Add Customer
      </button>

      <button 
        onClick={() => onNavigateAction && onNavigateAction('calendar')}
        className="btn-action-secondary"
      >
        <Calendar size={15} /> Schedule Appointment
      </button>
    </div>
  );
}
