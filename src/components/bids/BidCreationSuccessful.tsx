import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiModal from 'ui/UiModal';

interface Props {
  onClose: () => void;
}
export default function BidCreationSuccessful({ onClose }: Props) {
  return (
    <UiModal onClose={onClose}>
      <Header>Bid has been sent successfully</Header>
      <TextContent>
        Your bid has been sent to the Agent successfully. If you are a good match for this dispatch, the agent would either accept your bid or negotiate with you over chat.
      </TextContent>
      <TextContent>
        If there is a price change or detail change after negotiation, you can always edit your bid on this page. Thanks for accepting this dispatch.
      </TextContent>
    </UiModal>
  );
}

const Header = styled.h1`
  font-size: ${pxToRem(20)};
`;

const TextContent = styled.p``;
