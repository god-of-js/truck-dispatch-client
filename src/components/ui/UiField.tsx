import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  error?: string;
  label?: string;
  children: React.ReactNode;
}
export default function UiField({ error, label, children }: Props) {
  return (
    <div className="ui-field">
      <Label>{label}</Label>
      {children}
      <Message>{error}</Message>
    </div>
  );
}

const Message = styled.div`
  color: var(--color-danger);
  font-size: ${pxToRem(12)};
  text-align: left;
`;

const Label = styled.label`
  font-size: ${pxToRem(14)};
  color: var(--color-neutralBlack);
  font-weight: 700;
  line-height: ${pxToRem(32)};
`;
