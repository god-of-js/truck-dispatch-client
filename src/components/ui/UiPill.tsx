import React, { lazy } from 'react';
import styled from 'styled-components';
import { Icons } from './UiIcon';

const UiIcon = lazy(() => import('./UiIcon'));
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
  warning: 'Information',
  danger: 'CloseCircle',
  success: 'CheckCircle',
};

interface Props {
  children: React.ReactNode;
  variant: PillType;
  hasIcon?: boolean;
}

export default function Pill({ children, variant, hasIcon }: Props) {
  return (
    <StyledPill className={variant + ' ui-pill'} hasIcon={hasIcon}>
      {hasIcon ? <UiIcon icon={icons[variant]} /> : <div className="circle" />}
      <StyledChildren>{children}</StyledChildren>
    </StyledPill>
  );
}

const StyledPill = styled.div<{ hasIcon?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  border-radius: 20px;
  padding: 10px;
  text-transform: capitalize;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
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
    svg {
      fill: var(--color-warning);
    }
  }

  &.danger {
    background: var(--color-danger-10);
    color: var(--color-danger);

    .circle {
      background: var(--color-danger);
    }
    svg {
      fill: var(--color-danger);
    }
  }
  &.success {
    background: var(--color-success-10);
    color: var(--color-success);

    .circle {
      background: var(--color-success);
    }
    svg {
      fill: var(--color-success);
    }
  }

  &.info {
    background: var(--color-info-10);
    color: var(--color-info);

    .circle {
      background: var(--color-info);
    }
    svg {
      fill: var(--color-info);
    }
  }

  &.rose {
    background: var(--color-rose-10);
    color: var(--color-rose);

    .circle {
      background: var(--color-rose);
    }
    svg {
      fill: var(--color-rose);
    }
  }

  &.orange {
    background: var(--color-orange-10);
    color: var(--color-orange);

    .circle {
      background: var(--color-orange);
    }
    svg {
      fill: var(--color-orange);
    }
  }

  &.gray {
    background: var(--color-gray-20);
    color: var(--color-gray-70);

    .circle {
      background: var(--color-gray-70);
    }
  }
`;
const StyledChildren = styled.div`
  white-space: nowrap;
`;
