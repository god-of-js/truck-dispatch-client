import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import UiField from './UiField';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  options: Option[];
  value: string | null;
  name: string;
  error?: string;
  onChange: (event: { name: string; value: string }) => void;
}

export default function UiSelect({
  label,
  options,
  value,
  name,
  error,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const toggleOptions = () => {
    setOpen(!open);
  };

  const handleOptionClick = (option: Option) => {
    setOpen(false);
    onChange({ name, value: option.value });
  };

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value) || null;
  }, [value]);

  return (
    <UiField label={label} name={name} error={error}>
      <StyledSelect onClick={toggleOptions} hasError={!!error}>
        <div>
          <span>{selectedOption && selectedOption.label}</span>
        </div>
        <StyledOptions open={open}>
          {options.map((option) => (
            <StyledOption
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </StyledOption>
          ))}
        </StyledOptions>
      </StyledSelect>
    </UiField>
  );
}

const StyledSelect = styled.div`
  position: relative;
  div {
    padding: 16px 8px;
    display: flex;
    align-items: center;
    justify-content: stretch;
    height: 40px;
    font-size: 12px;
    border: 1px solid;
    border-color: ${({ hasError }: { hasError: boolean }) =>
      hasError ? 'var(--color-danger)' : 'var(--color-gray-200)'};
    background: #ffffff;
    outline: none;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const StyledOptions = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  background: #fff;
  border: 1px solid var(--color-gray-200);
  border-radius: 5px;
  z-index: 1;
  overflow: auto;
  max-height: 150px;
  display: ${({ open }: { open: boolean }) => (open ? 'block' : 'none')};
`;

const StyledOption = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;
