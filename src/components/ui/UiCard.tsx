import React from 'react';
import styled from 'styled-components';
import sizes from 'utils/sizes';

interface Props {
  children: React.ReactNode;
  variant?: 'light' | 'primary-light';
}
export default function UiCard({ children, variant = 'light' }: Props) {
  return (
    <Card className={'ui-card ' + variant}>
      <div className="card-container">{children}</div>
    </Card>
  );
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

  .card-container {
    position: relative;
    min-height: ${pxToRem(180)};
  }

  @media screen and (max-width: ${sizes.mobileLargeWidth}) {
    .card-container {
      position: relative;
      min-height: ${pxToRem(200)};
    }
  }

  .bottom {
    position: absolute;
    bottom: 0;
    display: grid;
    gap: ${pxToRem(8)};
    padding-top: ${pxToRem(20)};
    width: 100%;
  }
`;
