import React, { Children, lazy } from 'react';
import styled from 'styled-components';
import { Icons } from './UiIcon';
import { ButtonVariant } from './UiButton';

const UiButton = lazy(() => import('./UiButton'));

const UiIcon = lazy(() => import('./UiIcon'));

type Variant = 'text-area' | 'field';
type Sizes = 's' | 'l';
interface Props {
  title: string;
  value?: React.ReactNode;

  editButton?: boolean;
  editText?: string;
  buttonVariant?: ButtonVariant;

  variant?: Variant;

  size?: Sizes;
  isBordered?: boolean;
  isCentered?: boolean;
  icon?: Icons;
}
export default function UiDataField({
  title,
  value,

  editButton,
  editText,
  buttonVariant = 'tertiary',

  isBordered,
  isCentered,
  variant = 'field',
  size = 'l',
  icon,
}: Props) {
  return (
    <FieldStyling
      variant={variant}
      className="ui-data-field"
      isBordered={isBordered}
      isCentered={isCentered}
      size={size}
    >
      {icon && <UiIcon icon={icon} />}
      <div className="ui-data-field__inner">
        <div className="field-title">{title}</div>
        <div className="field-main">
          <div className="field-value">{value ? value : 'N/A'}</div>
          {editButton && (
            <div className="field-button">
              <UiButton size="s" type="button" variant={buttonVariant}>
                {editText}
              </UiButton>
            </div>
          )}
        </div>
      </div>
    </FieldStyling>
  );
}

interface StylingProps {
  variant: Variant;
  size: Sizes;
  button?: boolean;
  isBordered?: boolean;
  isCentered?: boolean;
}
const FieldStyling = styled.div<StylingProps>`
  padding: ${({ size }) => pxToRem(size === 's' ? 12 : 16)} ${pxToRem(16)};
  background: var(--color-gray-20);
  border-radius: ${pxToRem(8)};
  display: flex;
  gap: ${pxToRem(12)};
  ${({ isBordered }) =>
    isBordered && `border: ${pxToRem(1)} solid var(--color-gray-30);`}
  ${({ variant }) => variant === 'text-area' && `min-height: ${pxToRem(100)}`};

  ${({ isCentered }) =>
    isCentered &&
    ` display: flex; flex-direction: column; justify-content: center; align-items: center;`}

  .ui-data-field__inner {
    ${({ isCentered }) =>
      isCentered &&
      ` display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;`}
  }
  .field-main {
    display: flex;
    flex-direction: row;
    gap: 100%;
    align-items: center;
  }

  .field-title {
    font-style: normal;
    font-weight: ${({ variant }) => (variant === 'text-area' ? 600 : 400)};
    font-size: ${pxToRem(10)};
    line-height: 140%;
    letter-spacing: 0.05em;
    color: ${({ variant }) =>
      variant === 'text-area'
        ? 'var(--color-neutralBlack)'
        : 'var(--color-gray-70)'};
    text-transform: uppercase;
  }

  .field-value {
    font-style: normal;
    font-weight: ${({ variant }) => (variant === 'text-area' ? 400 : 600)};
    font-size: ${({ size }) => pxToRem(size === 's' ? 14 : 16)};
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
    margin-top: ${pxToRem(4)};
  }

  button {
    padding: ${pxToRem(8)} ${pxToRem(10)};
  }
`;
