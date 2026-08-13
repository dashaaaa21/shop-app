import { InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth, className = '', ...props }, ref) => {
    const containerClasses = [
      'input-container',
      fullWidth && 'input-container--full-width',
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      'input',
      error && 'input--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label className="input-label">
            {label}
            {props.required && <span className="input-required">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && <span className="input-error">{error}</span>}
        {!error && helperText && (
          <span className="input-helper">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
