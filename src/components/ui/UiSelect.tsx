import React, { useState, useMemo } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import UiField from './UiField';
import UiIcon from './UiIcon';

export interface Option {
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
    if (!value) return null;
    return options.find((option) => option.value === value) || null;
  }, [value, options]);

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <UiField label={label} error={error}>
        <StyledSelect onClick={toggleOptions} hasError={!!error}>
          <div className="select">
            <span className="selected-option">
              {selectedOption?.label
                ? selectedOption.label
                : 'Choose an option from the dropdown'}
            </span>
            <span>
              <UiIcon icon={isOpen ? 'CaretUp' : 'CaretDown'} />
            </span>
          </div>
          <StyledOptions
            isOpen={isOpen}
            style={{
              marginTop: '8px',
            }}
          >
            {options.map((option) => (
              <StyledOption
                key={option.value}
                onClick={() => handleOptionClick(option)}
              >
                <span>{option.label}</span>
                <span
                  className={`activity-indicator ${
                    selectedOption?.value === option.value ? 'active' : ''
                  }`}
                />
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
  .select {
    padding: 0 ${pxToRem(16)};
    height: var(--base-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${pxToRem(12)};
    border: ${pxToRem(1)} solid;
    border-color: ${({ hasError }: { hasError: boolean }) =>
      hasError ? 'var(--color-danger)' : 'var(--color-gray)'};
    background: #ffffff;
    outline: none;
    border-radius: ${pxToRem(8)};
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
    .selected-option {
      font-size: ${pxToRem(14)};
      color: var(--color-gray-80);
      font-weight: 400;
      line-height: ${pxToRem(24)};
    }
  }
`;

const StyledOptions = styled.ul`
  list-style: none;
  /* margin-top: ${pxToRem(8)}; */
  padding: ${pxToRem(16)} ${pxToRem(8)};
  position: absolute;
  width: 100%;
  background: #fff;
  border: 1px solid var(--color-gray-30);
  border-radius: ${pxToRem(8)};
  box-shadow: 0px ${pxToRem(8)} ${pxToRem(16)} rgba(0, 0, 0, 0.08);
  z-index: 1;
  overflow: auto;
  max-width: 100%;
  /* max-height: ${pxToRem(100)}; */
  /* display: ${({ isOpen }: { isOpen: boolean }) =>
    isOpen ? 'block' : 'none'}; */
  visibility: ${({ isOpen }: { isOpen: boolean }) =>
    isOpen ? 'visible' : 'hidden'};
  opacity: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? '1' : '0')};
  transition: all 0.2s ease-in-out;
`;

const StyledOption = styled.li`
  height: ${pxToRem(40)};
  font-size: ${pxToRem(14)};
  border-radius: ${pxToRem(4)};
  align-items: center;
  padding: ${pxToRem(8)} ${pxToRem(12)} ${pxToRem(8)} ${pxToRem(12)};
  justify-content: space-between;
  display: flex;
  color: black;
  cursor: pointer;
  text-transform: capitalize;
  &:hover {
    svg {
      fill: var(--color-primary);
    }
    background: var(--color-primary-10);
  }

  .activity-indicator {
    width: ${pxToRem(16)};
    height: ${pxToRem(16)};
    border-radius: 50%;
    box-shadow: inset 0 0 0 ${pxToRem(1)} var(--color-gray);

    &.active {
      box-shadow: inset 0 0 0 ${pxToRem(6)} var(--color-primary);
    }
  }
`;
