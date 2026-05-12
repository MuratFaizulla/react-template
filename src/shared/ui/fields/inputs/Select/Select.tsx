import React from 'react';

import inputStyles from '../input.module.css';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface Props extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'placeholder'> {
  label: string;
  options: SelectOption[];
  isError?: boolean;
  helperText?: string;
}

export const Select: React.FC<Props> = ({
  label,
  options,
  isError = false,
  helperText,
  value,
  onChange,
  ...props
}) => {
  const [hasValue, setHasValue] = React.useState(Boolean(value));
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    setHasValue(Boolean(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHasValue(Boolean(e.target.value));
    onChange?.(e);
  };

  const floated = hasValue || focused;

  return (
    <>
      <div
        aria-disabled={props.disabled}
        className={`${isError ? inputStyles.input_error : ''} ${inputStyles.input_container}`}
      >
        <select
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${inputStyles.input} ${styles.select}`}
          {...props}
        >
          <option value='' disabled hidden />
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <label className={`${inputStyles.input_label} ${floated ? styles.label_up : ''}`}>
          {label}
        </label>
      </div>
      {isError && helperText && <div className={inputStyles.helper_text}>{helperText}</div>}
    </>
  );
};
