import UiModal from 'ui/UiModal';
import styled from 'styled-components';

interface Props {
  onClose: () => void;
}

export default function NotifyUsersFromFirebase({ onClose }: Props) {
  return (
    <UiModal onClose={onClose}>
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
  font-size: ${pxToRem(20)};
  text-align: center;
`;
