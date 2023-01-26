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
  font-size: 12px;
`;

const Label = styled.label`
  font-size: 12px;
  color: var(--color-gray-500);
  font-weight: bold;
`;
