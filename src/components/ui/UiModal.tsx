import React, { lazy } from 'react';
import styled from 'styled-components';
import sizes from 'utils/sizes';

const UiIcon = lazy(() => import('./UiIcon'));
const UiButton = lazy(() => import('./UiButton'));
const UiOverlay = lazy(() => import('./UiOverlay'));
type Size = 'lg' | 'md' | 'sm';
type Position = 'center' | 'right';
type BG = 'dark' | 'light';

interface Props {
  children: React.ReactNode;
  position?: Position;
  size?: Size;
  title?: string;
  hideModalClose?: boolean;
  bgVariant?: BG;
  onClose: () => void;
  goPrev?: () => void;
  isVisible: boolean;
}
export default function UiModal({
  children,
  title,
  position = 'center',
  size = 'lg',
  bgVariant = 'light',
  hideModalClose,
  onClose,
  goPrev,
  isVisible,
}: Props) {
  function closeModal() {
    if (hideModalClose) return;

    onClose();
  }
  return (
    <UiOverlay onClick={closeModal} isVisible={isVisible}>
      <Modal>
        <ModalCard
          onClick={(event) => {
            event.stopPropagation();
          }}
          position={position}
          size={size}
          bgVariant={bgVariant}
        >
          <div className="modal-inner">
            <header className="modal-header">
              {goPrev && (
                <UiButton variant="icon-neutral" onClick={goPrev}>
                  <UiIcon icon="CaretLeft" size="16" />
                </UiButton>
              )}
              <h2>{title}</h2>
              {!hideModalClose && (
                <UiButton variant="icon-neutral" onClick={closeModal}>
                  <UiIcon icon="Close" size="20" />
                </UiButton>
              )}
            </header>
            {children}
          </div>
        </ModalCard>
      </Modal>
    </UiOverlay>
  );
}

function positionStyling({ position, size }: CardProps) {
  if (position === 'right') {
    return `
      position: fixed;
      bottom: 0;
      top: 0;
      right: 0;
      left: initial;
      border-radius: 0;
      max-height: 100%;
      width: 80%;

      .modal-header {
        border-bottom:1px solid var(--color-gray-20);
        padding:26px 24px;
      }
     
      @media only screen and (min-width: ${sizes.tabletLargeWidth}) {
        width: 60%;
      }
      @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
        width: 50%;
        max-width: 1000px;
      }
    `;
  }
  if (position === 'center') {
    return `
    position: static;
    margin: auto;
    border-radius:16px;
    
    .modal-header h2 {
      text-align: center;
      flex-grow: 1;
      margin-left: 40px !important;
    }
    `;
  }

  return `
    position: static;
    margin: auto;
    border-radius:16px;
  `;
}

function getWidth(size?: Size) {
  if (size === 'sm') return `width: 540px;`;

  if (size === 'md') return `width: 724px;`;
  return `width: 50%;`;
}
interface CardProps {
  size?: Size;
  position?: Position;
  bgVariant?: BG;
}
const Modal = styled.div`
  width: 100%;
  height: fit-content;
`;

const ModalCard = styled.div<CardProps>`
  background: ${({ bgVariant }) =>
    bgVariant === 'dark' ? 'var(--color-gray-20)' : '#ffffff'};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 90%;

  .modal-inner {
    padding-bottom:28px;
    height: 87%;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:18px 24px;
      border-bottom:1px solid var(--color-gray-20);

      h2 {
        color: var(--color-neutralBlack);
        font-size:20px;
        font-family: 'thiccboi-extrabold';
        font-weight: 700;
        margin: 0;
      }
    }
  }

  @media only screen and (min-width: ${sizes.mobileLargeWidth}) {
    h2 {
      font-size:24px !important;
    }
    ${({ size }) => getWidth(size)}
    ${(cardProps) => positionStyling(cardProps)}
  }
`;
