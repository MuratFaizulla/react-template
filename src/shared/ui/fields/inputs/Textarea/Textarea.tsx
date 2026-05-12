import React from 'react';

import inputStyles from '../input.module.css';
import styles from './Textarea.module.css';

interface Props extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder'> {
  label: string;
  isError?: boolean;
  helperText?: string;
}

export const Textarea: React.FC<Props> = ({
  label,
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasValue(Boolean(e.target.value));
    onChange?.(e);
  };

  const floated = hasValue || focused;

  return (
    <>
      <div
        aria-disabled={props.disabled}
        className={`${isError ? inputStyles.input_error : ''} ${styles.textarea_container}`}
      >
        <textarea
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={styles.textarea}
          {...props}
        />
        <label className={`${inputStyles.input_label} ${floated ? styles.label_up : ''}`}>
          {label}
        </label>
      </div>
      {isError && helperText && <div className={inputStyles.helper_text}>{helperText}</div>}
    </>
  );
};
