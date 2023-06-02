import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import sizes from 'utils/sizes';
import UiIcon from './UiIcon';
import UiButton from './UiButton';

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
    <Modal>
      <OutsideClickHandler onOutsideClick={onClose}>
        <ModalCard>
          <div className="modal-inner">
            <header className="modal-header">
              <h2>{title}</h2>
              <div className="close-btn">
                <UiButton variant="icon-neutral" onClick={onClose}>
                  <UiIcon icon="Close" size="20" />
                </UiButton>
              </div>
            </header>

            <div className="modal-content">{children}</div>

            <SubmitButtonContainer className="submit-button-jobitemstyling">
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
          </div>
        </ModalCard>
      </OutsideClickHandler>
    </Modal>
  );
}

const Modal = styled.div`
  width: 100%;
  height: fit-content;
`;

const ModalCard = styled.div`
  background: white;
  border-top-left-radius: ${pxToRem(8)};
  border-top-right-radius: ${pxToRem(8)};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 90%;
  text-align: center;
  padding: 0 ${pxToRem(24)};

  .modal-inner {
    display: grid;
    gap: ${pxToRem(44)};
    padding-bottom: ${pxToRem(28)};
    height: 87%;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${pxToRem(19)} 0;
      border-bottom: ${pxToRem(1)} solid var(--color-gray-20);
    }

    .modal-header h2 {
      color: var(--color-neutralBlack);
      font-size: ${pxToRem(24)};
      font-family: 'thiccboi-extrabold';
      font-weight: 700;
      margin: 0;
    }

    .modal-content {
      font-style: normal;
      font-weight: 400;
      font-size: ${pxToRem(20)};
      line-height: ${pxToRem(28)};
    }
  }
  @media only screen and (min-width: ${sizes.mobileLargeWidth}) {
    position: static;
    margin: auto;
    border-radius: ${pxToRem(16)};
    width: ${pxToRem(540)};

    .modal-header h2 {
      flex-grow: 1;
      margin-left: 40px !important;
    }

    .modal-content {
      padding: 0 ${pxToRem(116)};
    }
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${pxToRem(16)};
`;
