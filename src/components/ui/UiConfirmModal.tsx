import styled from 'styled-components';
import sizes from 'utils/sizes';
import UiButton from './UiButton';
import UiModal from './UiModal';

interface Props {
  children: React.ReactNode;
  title?: string;
  confirmText?: string;
  declineText?: string;
  variant?: 'primary' | 'danger';
  onClose: () => void;
  onClick?: () => void;
}

export default function UiConfirmModal({
  children,
  title,
  confirmText = 'yes, proceed',
  declineText = 'not yet',
  variant = 'primary',
  onClose,
  onClick,
}: Props) {
  return (
    <UiModal title={title} onClose={onClose} size="sm" position="center">
      <Modal>
        <div className="modal-content">{children}</div>

        <SubmitButtonContainer>
          <UiButton
            isFullWidth
            size="large"
            variant="secondary"
            onClick={onClose}
          >
            {declineText}
          </UiButton>
          <UiButton
            isFullWidth
            size="large"
            variant={variant}
            onClick={onClick}
          >
            {confirmText}
          </UiButton>
        </SubmitButtonContainer>
      </Modal>
    </UiModal>
  );
}

const Modal = styled.div`
  display: grid;
  gap: ${pxToRem(44)};
  padding: 0 ${pxToRem(24)};

  .modal-content {
    font-weight: 400;
    font-size: ${pxToRem(20)};
    line-height: ${pxToRem(28)};
    text-align: center;
    margin-top: ${pxToRem(45)};

    @media only screen and (min-width: ${sizes.mobileLargeWidth}) {
      padding: 0 ${pxToRem(116)};
    }
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${pxToRem(16)};
`;
