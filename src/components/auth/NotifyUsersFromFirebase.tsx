import { lazy } from 'react';
import styled from 'styled-components';

const UiModal = lazy(() => import('ui/UiModal'));

interface Props {
  onClose: () => void;
  isVisible: boolean;
}
export default function NotifyUsersFromFirebase({ onClose, isVisible }: Props) {
  return (
    <UiModal isVisible={isVisible} onClose={onClose}>
      <Header>Login Directions</Header>
      <TextContent>
        We recently underwent a database migration. Due to security reasons, you
        need to provide new passwords to access the dashboard. An email has been
        sent to you for the next steps. Kindly reach out to support using the
        chat button below for any clarifications.
      </TextContent>
    </UiModal>
  );
}

const TextContent = styled.p`
  text-align: center;
`;

const Header = styled.h1`
  font-size:20px;
  text-align: center;
`;
