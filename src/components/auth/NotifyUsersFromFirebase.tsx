import { lazy } from 'react';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiConfirmModal from 'ui/UiConfirmModal';

const UiModal = lazy(() => import('ui/UiModal'));

interface Props {
  onClose: () => void;
  isVisible: boolean;
}
export default function NotifyUsersFromFirebase({ onClose, isVisible }: Props) {
  return (
    <UiModal title={'Login Directions'} isVisible={isVisible} onClose={onClose}>
      <TextContent>
        We recently underwent a database migration. Due to security reasons, you
        need to provide new passwords to access the dashboard. An email has been
        sent to you for the next steps. Kindly reach out to support using the
        chat button below for any clarifications.
        <div className="bid-button-container">
          <UiButton size="large" onClick={onClose}>
            Ok
          </UiButton>
        </div>
      </TextContent>
    </UiModal>
  );
}

const TextContent = styled.p`
  text-align: center;
  padding: 0 ${pxToRem(24)};
  font-weight: 400;
  font-size: ${pxToRem(20)};
  line-height: ${pxToRem(28)};
  font-style: normal;
  color: var(--color-neutralBlack);

  .bid-button-container {
    width: 100%;
    margin-top: ${pxToRem(40)};

    button {
      margin: auto;
      width: 50%;
    }
  }
`;
