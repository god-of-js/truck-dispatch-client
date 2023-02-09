import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UiButton from './UiButton';
import UiIcon from './UiIcon';

export default function UiBackButton() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <UiButton variant="primary-text" onClick={goBack}>
      <ButtonStyling>
        <UiIcon icon="ArrowLeft" /> <span>Go Back </span>
      </ButtonStyling>
    </UiButton>
  );
}

const ButtonStyling = styled.div`
  display: flex;
  gap: ${pxToRem(12)};
`;
