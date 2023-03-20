import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  variant: 'primary' | 'warning' | 'danger' | 'info' | 'success'| 'gray';
}
export default function ({ children, variant }: Props) {
  return <Pill variant={variant}>{children}</Pill>;
}

const Pill = styled.div`
  background: ${({ variant }: { variant: string }) =>
    `var(--color-${variant}-100)`};
  color: ${({ variant }: { variant: string }) => `var(--color-${variant}-600)`};
  width: fit-content;
  border-radius: ${pxToRem(20)};
  padding: ${pxToRem(4)} ${pxToRem(16)};
  font-size: ${pxToRem(12)};
  text-transform: capitalize;
`;
