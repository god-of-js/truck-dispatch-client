import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import sizes from 'utils/sizes';
import UiIcon from './UiIcon';
import UiButton from './UiButton';

interface Props {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}

export default function UiConfirmModal({ children, title, onClose }: Props) {
  return (
    <Modal>
      <OutsideClickHandler onOutsideClick={onClose}>
        <ModalCard>
          <div className="modal-inner">
            <header className="modal-header">
              <h2>{title}</h2>
              <UiButton variant="icon-neutral" onClick={onClose}>
                <UiIcon icon="Close" size="20" />
              </UiButton>
            </header>
            {children}
            <UiButton variant="icon-neutral" onClick={onClose} />
            <UiButton variant="icon-neutral" onClick={onClose} />
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

  .modal-inner {
    padding-bottom: ${pxToRem(28)};
    height: 87%;
  }
`;
