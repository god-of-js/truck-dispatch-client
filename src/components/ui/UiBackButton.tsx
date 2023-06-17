import React, { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UiButton = lazy(() => import('./UiButton'));
const UiIcon = lazy(() => import('./UiIcon'));
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
  gap: ${pxToRem(12)};
`;
