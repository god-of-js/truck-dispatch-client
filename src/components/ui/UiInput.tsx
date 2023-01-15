import React, { useState } from 'react';

interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ label, type, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`input-container ${isFocused ? 'focused' : ''}`}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default Input;
