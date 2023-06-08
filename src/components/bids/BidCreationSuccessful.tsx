import React from 'react';
import styled from 'styled-components';
import UiModal from 'ui/UiModal';

interface Props {
  onClose: () => void;
  isVisible: boolean
}
export default function BidCreationSuccessful({ onClose, isVisible }: Props) {
  return (
    <UiModal isVisible={isVisible} onClose={onClose}>
      <Header>Bid has been sent successfully</Header>
      <TextContent>
        Your bid has been sent to the trip owner successfully. If you are a good
        match for this dispatch, the trip owner would either accept your bid or
        negotiate with you over chat.
      </TextContent>
      <TextContent>
        If there is a price change or detail change after negotiation, you can
        always edit your bid on this page. Thanks for accepting this dispatch.
      </TextContent>
    </UiModal>
  );
}

const Header = styled.h1`
  font-size: ${pxToRem(20)};
  text-align: center;
`;

const TextContent = styled.p`
  text-align: center;
`;
