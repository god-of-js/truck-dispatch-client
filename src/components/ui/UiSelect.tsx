import React, { useState, useMemo, lazy } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import { Size } from 'types/Size';

const UiField = lazy(() => import('./UiField'));
const UiIcon = lazy(() => import('./UiIcon'));
const PaginationLoader = lazy(() => import('../layout/PaginationLoader'));
export interface Option {
  value: string;
  label: string;
}

interface Props {
  label?: string;
  options: Option[];
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
  size?: Size;
  value: string | null;
  name: string;
  error?: string;
  onChange: (event: { name: string; value: string }) => void;
  loadNextPage?: () => void;
}

export default function UiSelect({
  label,
  options,
  value,
  name,
  loading,
  error,
  currentPage,
  totalPages,
  loadNextPage,
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
                : 'Select an option'}
            </span>
            <span>
              <UiIcon icon={isOpen ? 'CaretUp' : 'CaretDown'} size="12" />
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
              {loadNextPage && (
                <PaginationLoader
                  removePadding
                  btnSize="s"
                  loaderSize="s"
                  loading={!!loading}
                  nextPage={() => loadNextPage()}
                  page={currentPage || 0}
                  totalPages={totalPages || 0}
                />
              )}
            </StyledOptions>
          )}
        </StyledSelect>
      </UiField>
    </OutsideClickHandler>
  );
}

const StyledSelect = styled.div<{ hasError: boolean, size?: Size }>`
  position: relative;
  .select {
    padding: 0 ${pxToRem(16)};
    height: ${({ size }) => size ? `var(--base-height-${size})` : `var(--base-height)`};
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${pxToRem(12)};
    border: ${pxToRem(1)} solid;
    border-color: ${({ hasError }) =>
      hasError ? 'var(--color-danger)' : 'var(--color-gray)'};
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
  position: absolute;
  list-style: none;
  margin-top: ${pxToRem(8)};
  padding: ${pxToRem(16)} 0;
  display: grid;
  gap: ${pxToRem(12)};
  background: #fff;
  border: 1px solid var(--color-gray-30);
  border-radius: ${pxToRem(8)};
  box-shadow: 0px ${pxToRem(8)} ${pxToRem(16)} rgba(0, 0, 0, 0.08);
  z-index: 1;
  width: 100%;
  max-width: 100%;
  max-height: ${pxToRem(250)};
  overflow-y: auto;
  transition: all 0.2s ease-in-out;
`;

const StyledOption = styled.li`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
  height: ${pxToRem(40)};
  padding: 0 ${pxToRem(12)};
  margin: 0 ${pxToRem(16)} !important;
  font-size: ${pxToRem(14)};
  border-radius: ${pxToRem(4)};
  color: var(--color-gray-80);
  gap: ${pxToRem(12)};
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
    width: ${pxToRem(16)};
    height: ${pxToRem(16)};
    border-radius: 50%;
    box-shadow: inset 0 0 0 ${pxToRem(1)} var(--color-gray);
    position: absolute;
    right: 0;
    margin-right: ${pxToRem(12)};

    &.active {
      box-shadow: inset 0 0 0 ${pxToRem(6)} var(--color-primary);
    }
  }
`;
