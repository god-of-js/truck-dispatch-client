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
    <UiButton variant="secondary" onClick={goBack}>
      <ButtonStyling>
        <div className="icon-container">
          <UiIcon icon="ArrowLeft" size="12" />
        </div>
        <span>Go Back </span>
      </ButtonStyling>
    </UiButton>
  );
}

const ButtonStyling = styled.div`
  display: flex;
  align-items: center;
  gap:12px;

  /* .icon-container {
    background: var(--color-primary);
    padding:2px 4px;
    border-radius:4px;

    svg {
      fill: #fff;
    }
  } */
`;
