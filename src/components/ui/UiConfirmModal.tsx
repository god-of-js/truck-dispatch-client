import styled from 'styled-components';
import sizes from 'utils/sizes';
import UiButton from './UiButton';
import UiModal from './UiModal';

interface Props {
  children: React.ReactNode;
  title: string;
  confirmText?: string;
  declineText?: string;
  variant?: 'primary' | 'danger';
  loading?: boolean;
  onClose: () => void;
  onProceed?: () => void;
  isVisible: boolean
}

export default function UiConfirmModal({
  children,
  title,
  confirmText = 'yes, proceed',
  declineText = 'not yet',
  variant = 'primary',
  loading,
  onClose,
  onProceed,
  isVisible
}: Props) {
  return (
    <UiModal isVisible={isVisible} title={title} onClose={onClose} size="sm" position="center">
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
            loading={loading}
            onClick={onProceed}
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
  gap: ${pxToRem(40)};
  padding: 0 ${pxToRem(24)};
  padding-top: ${pxToRem(44)};

  .modal-content {
    font-weight: 400;
    font-size: ${pxToRem(20)};
    line-height: ${pxToRem(28)};
    font-style: normal;
    text-align: center;
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
  justify-content: space-between;
  gap: ${pxToRem(16)};
  margin-top: 0;
`;
