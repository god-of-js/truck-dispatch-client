import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  error?: string;
  name: string;
  label?: string;
  children: React.ReactNode;
}
export default function UiField({ error, label, name, children }: Props) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      <Message>{error}</Message>
    </div>
  );
}

const Message = styled.div`
  color: var(--color-danger);
  font-size: ${pxToRem(12)};
`;

const Label = styled.label`
  font-size: ${pxToRem(14)};
  color: var(--color-gray-500);
  font-weight: bold;
`;
