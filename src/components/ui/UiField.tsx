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
  font-size:12px;
  text-align: left;
`;

const Label = styled.label`
  font-size:14px;
  color: var(--color-neutralBlack);
  font-weight: 700;
  line-height:32px;
  text-align: left;
`;
