import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}
export default function UiCard({ children }: Props) {
  return <Card className="ui-card">{children}</Card>;
}

const Card = styled.div`
  background: #ffffff;
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};
`;
