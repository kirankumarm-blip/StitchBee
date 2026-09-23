import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Customer Portal Uncaught Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#0f172a',
          color: '#f8fafc',
          fontFamily: 'Inter, system-ui, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '520px',
            background: 'rgba(30, 41, 59, 0.7)',
            padding: '36px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🐝</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>
              Oops! Something went wrong
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.5' }}>
              The application encountered an unexpected issue while rendering. You can reload the page or reset the local session cache.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #f72585, #7209b7)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Reload Page
              </button>
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem('stitchbee_user');
                  } catch (e) {}
                  window.location.reload();
                }}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Reset Session & Reload
              </button>
            </div>
            {this.state.error && (
              <details style={{ marginTop: '24px', textAlign: 'left', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', color: '#f87171' }}>
                <summary style={{ cursor: 'pointer', outline: 'none', color: '#cbd5e1' }}>Error Details</summary>
                <pre style={{ marginTop: '8px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>{this.state.error?.toString()}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
