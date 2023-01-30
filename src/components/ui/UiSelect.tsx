import React, { useState, useMemo } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import UiField from './UiField';
import UiIcon from './UiIcon';

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
  const [isOpen, setIsOpen] = useState(false);

  function toggleOptions() {
    setIsOpen(!isOpen);
  }

  const handleOptionClick = (option: Option) => {
    toggleOptions();
    onChange({ name, value: option.value });
  };

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value) || null;
  }, [value]);

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <UiField label={label} name={name} error={error}>
        <StyledSelect onClick={toggleOptions} hasError={!!error}>
          <div>
            <span>{selectedOption && selectedOption.label}</span>
            <span>
              <UiIcon name={isOpen ? 'CaretUp' : 'CaretDown'} />
            </span>
          </div>
          <StyledOptions isOpen={isOpen}>
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
    </OutsideClickHandler>
  );
}

const StyledSelect = styled.div`
  position: relative;
  div {
    padding: 16px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  display: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? 'block' : 'none')};
`;

const StyledOption = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    /* TODO: check if the color-primary makes sense for this attribute when it's merged */
    background: var(--color-primary-200);
  }
`;
