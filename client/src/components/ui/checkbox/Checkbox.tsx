import { InputHTMLAttributes, forwardRef } from 'react';
import './Checkbox.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className={`checkbox ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          className="checkbox__input"
          {...props}
        />
        <span className="checkbox__checkmark" />
        {label && <span className="checkbox__label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
