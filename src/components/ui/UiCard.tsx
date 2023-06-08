import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  variant?: 'light' | 'primary-light';
}
export default function UiCard({ children, variant = 'light' }: Props) {
  return <Card className={'ui-card ' + variant}>{children}</Card>;
}

const Card = styled.div`
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};
  position: relative;

  &.light {
    background: #ffffff;
  }

  &.primary-light {
    background: var(--color-primary-10);
  }

  .double-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding-bottom: ${pxToRem(20)};
  }
`;
