import React from 'react';
import styled from 'styled-components';
import { icons } from '../components/ui/UiIcon';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  const logOutIcon = icons.SignOut;

  const logOutUser = () => {
    localStorage.removeItem('uid');
    navigate('auth/login');
    location.reload();
  };

  return <Container onClick={() => logOutUser()}>{logOutIcon}</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: var(--color-gray-500);
  font-size: ${pxToRem(25)};
  opacity: 0.6;
  font-weight: 600;
  border-left: ${pxToRem(4)} solid transparent;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;
