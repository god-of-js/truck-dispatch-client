import UiModal from 'ui/UiModal';
import UiButton from 'ui/UiButton';
import React from 'react';
import styled from 'styled-components';

interface Props {
  onClose: () => void;
  startTrip: () => void;
  transporterName?: string;
}

export default function GoodsInspectionConfirmation({
  onClose,
  startTrip,
  transporterName,
}: Props) {
  return (
    <UiModal onClose={onClose}>
      <Header>Attention!!</Header>
      <TextContent>
        By commencing this trip, I, {transporterName}, hereby acknowledge and
        certify that I have personally inspected the cargo I am to transport and
        have verified that it does not contain any illegal substances or
        contraband as defined by applicable local, state/provincial, and federal
        laws.
      </TextContent>
      <TextContent>
        Truckdispatch shall not be liable for any damages, losses, or
        liabilities arising from the nature of the goods being transported.
      </TextContent>
      <ButtonContainer className="btn-container" onClick={onClose}>
        <UiButton variant="neutral">Cancel</UiButton>
        <UiButton onClick={startTrip}>Start Trip</UiButton>
      </ButtonContainer>
    </UiModal>
  );
}
const ButtonContainer = styled.div`
  display: flex;
  gap: ${pxToRem(12)};
  justify-content: flex-end;
  margin-top: ${pxToRem(16)};
`;

const Header = styled.h1`
  font-size: ${pxToRem(20)};
  text-align: center;
`;

const TextContent = styled.p`
  text-align: center;
`;
