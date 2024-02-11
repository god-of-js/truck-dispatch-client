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
  padding: ${pxToRem(10)};
  border-radius: ${pxToRem(8)};
  position: relative;
  flex-direction: column;

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
    min-height: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bottom {
    margin-top: ${pxToRem(15)};
  }

  @media screen and (max-width: ${sizes.mobileLargeWidth}) {
    .bottom {
      bottom: ${pxToRem(5)};
    }
  }
`;
