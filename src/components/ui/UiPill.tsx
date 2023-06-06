import React from 'react';
import styled from 'styled-components';
import UiIcon, { Icons } from './UiIcon';

const icons: { [key: string]: Icons } = {
  // modify the icons to fit the variants
  primary: 'Tick',
  warning: 'Tick',
  danger: 'Tick',
  info: 'Tick',
  success: 'Tick',
  gray: 'Tick',
};
interface Props {
  children: React.ReactNode;
  variant: 
  | 'primary'
  | 'warning'
  | 'danger'
  | 'info'
  | 'success'
  | 'gray'
  | 'orange';
  hasIcon?: boolean;
}
export default function ({ children, variant, hasIcon }: Props) {
  return (
    <Pill className={variant}>
      {hasIcon && <UiIcon icon={icons[variant]} />}
      {children}
    </Pill>
  );
}

const Pill = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(4)};
  width: fit-content;
  border-radius: ${pxToRem(20)};
  padding: ${pxToRem(10)};
  text-transform: capitalize;
  font-style: normal;
  font-weight: 700;
  font-size: ${pxToRem(14)};
  line-height: 140%;
  letter-spacing: -0.02em;

  .circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  &.warning {
    background: var(--color-warning-20);
    color: var(--color-warning);

    .circle {
      background: var(--color-warning);
    }
  }

  &.success {
    background: var(--color-success-10);
    color: var(--color-success);

    .circle {
      background: var(--color-success);
    }
  }
  &.info {
    background: var(--color-info-10);
    color: var(--color-info);

    .circle {
      background: var(--color-info);
    }
  }
  &.orange {
    background: var(--color-orange-10);
    color: var(--color-orange);

    .circle {
      background: var(--color-orange);
    }
  }

  &.gray {
    background: var(--color-gray-20);
  }
`;
