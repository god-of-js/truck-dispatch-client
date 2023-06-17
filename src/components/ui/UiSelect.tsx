import React, { useState, useMemo, lazy } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';

const UiField = lazy(() => import('./UiField'));
const UiIcon = lazy(() => import('./UiIcon'));
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
          {isOpen && (
            <StyledOptions>
              {options.map((option) => (
                <StyledOption
                  key={option.value}
                  className={
                    selectedOption?.value === option.value ? 'is-active' : ''
                  }
                  onClick={() => handleOptionClick(option)}
                >
                  <div className="label">{option.label}</div>
                  <span
                    className={`activity-indicator ${
                      selectedOption?.value === option.value ? 'active' : ''
                    }`}
                  />
                </StyledOption>
              ))}
            </StyledOptions>
          )}
        </StyledSelect>
      </UiField>
    </OutsideClickHandler>
  );
}

const StyledSelect = styled.div`
  position: relative;
  .select {
    padding: 0 16px;
    height: var(--base-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    border:1px solid;
    border-color: ${({ hasError }: { hasError: boolean }) =>
      hasError ? 'var(--color-danger)' : 'var(--color-gray)'};
    outline: none;
    border-radius: 8px;
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
    .selected-option {
      font-size:14px;
      color: var(--color-gray-80);
      font-weight: 400;
      line-height:24px;
    }
  }
`;

const StyledOptions = styled.ul`
  position: absolute;
  list-style: none;
  margin-top: 8px;
  padding:16px 0;
  display: grid;
  gap:12px;
  background: #fff;
  border: 1px solid var(--color-gray-30);
  border-radius:8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
  z-index: 1;
  width: 100%;
  max-width: 100%;
  max-height: 250px;
  overflow-y: auto;
  transition: all 0.2s ease-in-out;
`;

const StyledOption = styled.li`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  margin: 0 16px !important;
  font-size: 14px;
  border-radius:4px;
  color: var(--color-gray-80);
  gap: 12px;
  cursor: pointer;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .label {
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover,
  &.is-active {
    background: var(--color-primary-10);
    color: var(--color-neutralBlack);
  }

  .activity-indicator {
    width:16px;
    height:16px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px var(--color-gray);
    position: absolute;
    right: 0;
    margin-right:12px;

    &.active {
      box-shadow: inset 0 0 0 6px var(--color-primary);
    }
  }
`;
