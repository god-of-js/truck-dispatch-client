import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UiModal = lazy(() => import('ui/UiModal'));
const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  onClose: () => void;
  isVisible: boolean;
}
export default function NotifyUserToAddAccount({ onClose, isVisible }: Props) {
  return (
    <UiModal isVisible={isVisible} onClose={onClose}>
      <Header>Add Payout Account</Header>
      <TextContent>
        In order to receive payment for a trip, you need to add your account to
        the platform.
      </TextContent>
      <TextContent>
        This account would be used whenever a payment is being tendered to you.
        Your account can be changed at anytime however, you can only have one
        account at a time.
      </TextContent>

      <ButtonContainer>
        <Link to="/profile/accounts">
          <UiButton size="s">Add Account</UiButton>
        </Link>
      </ButtonContainer>
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
