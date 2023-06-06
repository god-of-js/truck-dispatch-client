import React from 'react';
import styled from 'styled-components';
import Loader from 'components/layout/Loader';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger-secondary'
    | 'warning-secondary'
    | 'tertiary'
    | 'neutral'
    | 'icon-neutral'
    | 'primary-outlined'
    | 'secondary-outlined'
    | 'primary-text'
    | 'warning-text'
    | 'dark'
    | 'dark-outlined'
    | 'danger';
  size?: Sizes;
  type?: 'submit' | 'button';
  textCasing?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal';
  isSquare?: boolean;
  /** This prop decides if we want the button to fit the content or be full width */
  isFullWidth?: boolean;
  onClick?: () => void;
}

type Sizes = 'large' | 'md' | 's' | 'text';

export default function UiButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  isSquare = false,
  variant = 'primary',
  type = 'submit',
  textCasing = 'uppercase',
  size = 'md',
  isFullWidth = false,
}: Props) {
  return (
    <ButtonContainer
      className={`btn ${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      textCasing={textCasing}
      size={size}
      isFullWidth={isFullWidth}
      isSquare={isSquare}
    >
      {loading ? (
        <div className="loader-wrapper">
          <Loader size="s" />
        </div>
      ) : (
        children
      )}
    </ButtonContainer>
  );
}

function sizeVariant(size: Sizes) {
  if (size === 'text') return '';
  if (size === 's')
    return `
    padding: ${pxToRem(8)} 
    ${pxToRem(12)}; 
    height:${pxToRem(32)};
    font-size: ${pxToRem(12)};
    line-height: ${pxToRem(12)};
    `;

  if (size === 'md')
    return `
    padding: ${pxToRem(12)};
    height:${pxToRem(40)};
    font-size: ${pxToRem(12)};
    line-height: ${pxToRem(12)};
  `;

  if (size === 'large')
    return `
    padding:  ${pxToRem(16)}; 
    height: ${pxToRem(46)};
    font-size: ${pxToRem(14)};
    line-height: ${pxToRem(14)};
  `;
}

function getColor(condition: boolean, color: string) {
  if (condition) return `background: ${color};`;
  return '';
}

const ButtonContainer = styled.button<Props>`
  ${({ size }) => sizeVariant(size!)}
  border: none;
  cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${pxToRem(9.34)};
  letter-spacing: ${pxToRem(0.32)};
  text-align: center;
  border-radius: ${({ isSquare }) => (isSquare ? '' : pxToRem(8))};
  font-weight: 500;
  font-family: 'thiccboi-semibold';
  ${({ textCasing }) =>
    textCasing !== 'normal' && `text-transform: ${textCasing}`};
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'fit-content')};
  white-space: nowrap;
  transition: all 0.2s ease-in-out;

  .loader-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${pxToRem(32)};
    width: 100%;
    height: 100%;
  }

  &.primary {
    background-color: var(--color-primary);
    ${({ disabled }) => getColor(disabled!, 'var(--color-primary-20)')};
    color: white;

    ${({ disabled }) =>
      !disabled &&
      `
    &:hover {
      background-color: var(--color-primary-50);
      box-shadow: var(--box-shadow-primary);
    }`}

    svg {
      fill: white;
    }
  }
  &.danger {
    background-color: var(--color-danger-600);
    color: white;

    &:hover {
      background-color: var(--color-danger-700);
    }
  }

  &.primary-text {
    background: transparent;
    border-color: transparent;
    color: var(--color-primary);
  }
  &.warning-text {
    background: transparent;
    border-color: transparent;
    color: var(--color-warning-600);
  }

  &.icon-neutral {
    width: ${pxToRem(40)};
    height: ${pxToRem(36)};
    background: var(--color-gray-20);
    border-radius: ${pxToRem(8)};

    &:hover {
      background: var(--color-gray-30);
    }
  }

  &.neutral {
    background-color: var(--color-gray-100);
    border: 1px solid var(--color-gray-200);
    color: var(--color-gray-500);

    &:hover {
      background-color: var(--color-gray-200);
    }
  }

  &.primary-outlined {
    background: white;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }
  &.dark-outlined {
    color: var(--color-gray-900);
    background: transparent;
    border: 1px solid var(--color-gray-900);
    &:hover {
      background-color: var(--color-gray-100);
    }
  }

  &.secondary {
    background-color: var(--color-primary-10);
    color: var(--color-primary);
    svg {
      fill: ${({ disabled }) =>
        disabled ? 'var(--color-primary-30)' : 'var(--color-primary)'};
    }
    ${({ disabled }) => getColor(disabled!, `var(--color-primary-10)`)};
    ${({ disabled }) => disabled && `color: var(--color-primary-30);`}

    ${({ disabled }) =>
      !disabled &&
      `
    &:hover {
      background: var(--color-primary-20);
      box-shadow: var(--box-shadow-primary);
    }`}
  }

  &.tertiary {
    background-color: #ffff;
    color: var(--color-primary);

    ${({ disabled }) =>
      !disabled &&
      `
    &:hover {
      color: var(--color-primary-50);
    }`}
  }

  &.danger-secondary {
    background: var(--color-danger-10);
    color: var(--color-danger);

    svg {
      fill: var(--color-danger);
    }
    &:hover {
      background: var(--color-danger-20);
      box-shadow: var(--box-shadow-primary);
    }
  }
  &.warning-secondary {
    background: var(--color-warning-10);
    color: var(--color-warning);

    svg {
      fill: var(--color-warning);
    }

    ${({ disabled }) =>
      !disabled &&
      '&:hover {background: var(--color-warning-20); box-shadow: var(--box-shadow-primary); }'}
  }

  &.dark {
    background: var(--color-gray-900);
    color: white;

    &:hover {
      background: var(--color-gray-700);
    }
  }

  &.secondary-outlined {
    background-color: white;
    border: 1px solid var(--color-gray-400);
    color: var(--color-gray-400);
  }
`;
