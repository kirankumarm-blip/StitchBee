import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export default function PremiumSelect({
  icon: Icon,
  value,
  options = [],
  onChange,
  ariaLabel,
  theme = 'light',
  className = '',
  compact = false,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const isLight = theme === 'light';

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0] || { value: '', label: '' };

  return (
    <div
      ref={rootRef}
      className={`ps-select ${isLight ? 'is-light' : 'is-dark'} ${
        open ? 'is-open' : ''
      } ${compact ? 'is-compact' : ''} ${className}`}
    >
      <button
        type="button"
        className="ps-trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <span className="ps-trigger-left">
          {Icon && <Icon size={14} className="ps-icon" />}
          <span className="ps-label">{selectedOption.label}</span>
        </span>
        <ChevronDown size={14} className={`ps-chevron ${open ? 'is-rotated' : ''}`} />
      </button>

      {open && options.length > 0 && (
        <div
          className="ps-menu"
          role="listbox"
          aria-label={ariaLabel}
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`ps-option ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange && onChange(opt.value);
                  setOpen(false);
                }}
              >
                <span className="ps-option-text">
                  <span className="ps-option-label">{opt.label}</span>
                  {opt.subLabel && (
                    <span className="ps-option-sub">{opt.subLabel}</span>
                  )}
                </span>
                {isSelected && <Check size={14} className="ps-check" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
