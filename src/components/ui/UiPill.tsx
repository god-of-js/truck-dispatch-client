import React from 'react';
import styled from 'styled-components';
import UiIcon, { Icons } from './UiIcon';

export type PillType =
  | 'primary'
  | 'warning'
  | 'danger'
  | 'info'
  | 'success'
  | 'gray'
  | 'rose'
  | 'orange';

const icons: { [key: string]: Icons } = {
  primary: 'Tick',
  warning: 'UiPillSuccess',
  danger: 'UiPillRejected',
  info: 'Tick',
  success: 'UiPillSuccess',
  gray: 'Tick',
  orange: 'UiPillPending',
};

interface Props {
  children: React.ReactNode;
  variant: PillType;
  hasIcon?: boolean;
}

export default function Pill({ children, variant, hasIcon = true }: Props) {
  return (
    <StyledPill className={variant + ' ui-pill'} hasIcon={hasIcon}>
      {hasIcon && <UiIcon icon={icons[variant]} />}
      <StyledChildren>{children}</StyledChildren>
    </StyledPill>
  );
}

const StyledPill = styled.div<{ hasIcon?: boolean }>`
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
    display: ${(props) => (props.hasIcon ? 'none' : 'block')};
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

  &.rose {
    background: var(--color-rose-10);
    color: var(--color-rose);

    .circle {
      background: var(--color-rose);
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
    color: var(--color-gray-70);

    .circle {
      background: var(--color-gray-70);
    }
  }
`
const StyledChildren = styled.div`
  white-space: nowrap;
`;
