import { lazy } from 'react';
import styled from 'styled-components';
import sizes from 'utils/sizes';
import { ButtonVariant } from './UiButton';

const UiButton = lazy(() => import('./UiButton'));
const UiModal = lazy(() => import('./UiModal'));
interface Props {
  children: React.ReactNode;
  title: string;
  isVisible: boolean;
  confirmText?: string;
  hideNotYetButton?: boolean;
  hideActions?: boolean;
  hideModalClose?: boolean;
  declineText?: string;
  variant?: ButtonVariant;
  notYetVariant?: ButtonVariant;
  loading?: boolean;
  showGif?: React.ReactNode;
  onClose: () => void;
  onProceed?: () => void;
}

export default function UiConfirmModal({
  children,
  title,
  confirmText = 'yes, proceed',
  declineText = 'not yet',
  variant = 'primary',
  notYetVariant = 'secondary',
  hideNotYetButton,
  hideActions,
  hideModalClose,
  isVisible,
  loading,
  onClose,
  onProceed,
  showGif,
}: Props) {
  return (
    <UiModal
      isVisible={isVisible}
      title={title}
      onClose={onClose}
      hideModalClose={hideModalClose}
      size="sm"
    >
      <Modal>
        <div className="modal-gif">{showGif}</div>
        <div className="modal-content">{children}</div>

        {!hideActions && (
          <SubmitButtonContainer>
            {!hideNotYetButton && (
              <UiButton size="large" variant={notYetVariant} onClick={onClose}>
                {declineText}
              </UiButton>
            )}
            <UiButton
              size="large"
              variant={variant}
              loading={loading}
              onClick={onProceed}
            >
              {confirmText}
            </UiButton>
          </SubmitButtonContainer>
        )}
      </Modal>
    </UiModal>
  );
}

const Modal = styled.div`
  display: grid;
  gap: ${pxToRem(36)};
  padding: 0 ${pxToRem(24)};
  padding-top: ${pxToRem(44)};

  .modal-gif{
    display; grid;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    font-weight: 400;
    font-size: ${pxToRem(20)};
    line-height: ${pxToRem(28)};
    font-style: normal;
    color: var(--color-neutralBlack);
    text-align: center;
    margin: auto;

    @media only screen and (min-width: ${sizes.mobileLargeWidth}) {
      width: 65%;
    }
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${pxToRem(16)};
  margin-top: 0;

  button {
    width: 50%;
  }
`;
