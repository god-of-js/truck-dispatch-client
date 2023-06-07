import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  isVisible: boolean;
}
export default function UiOverlay({ children, isVisible }: Props) {
  return <>{isVisible && <Overlay>{children}</Overlay>}</>;
}

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(220, 218, 228, 0.6);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;
