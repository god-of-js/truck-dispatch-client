import React from 'react';
import styled from 'styled-components';
import sizes from 'utils/sizes';
import UiIcon from './UiIcon';
import UiButton from './UiButton';
import UiOverlay from './UiOverlay';

type Size = 'lg' | 'md' | 'sm';
type Position = 'center' | 'right';
type BG = 'dark' | 'light';

interface Props {
  children: React.ReactNode;
  position?: Position;
  size?: Size;
  title?: string;
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
  onClose,
  goPrev,
  isVisible,
}: Props) {
  return (
    <UiOverlay onClick={onClose} isVisible={isVisible}>
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
              <UiButton variant="icon-neutral" onClick={onClose}>
                <UiIcon icon="Close" size="20" />
              </UiButton>
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
        border-bottom: ${pxToRem(1)} solid var(--color-gray-20);
        padding: ${pxToRem(26)} ${pxToRem(24)};
      }
     
      @media only screen and (min-width: ${sizes.tabletLargeWidth}) {
        width: 60%;
      }
      @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
        width: 45%;
      }
    `;
  }
  if (position === 'center') {
    return `
    position: static;
    margin: auto;
    border-radius: ${pxToRem(16)};
    
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
    border-radius: ${pxToRem(16)};
  `;
}

function getWidth(size?: Size) {
  if (size === 'sm') return `width: ${pxToRem(540)};`;

  if (size === 'md') return `width: ${pxToRem(724)};`;
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

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${pxToRem(18)} ${pxToRem(24)};
      border-bottom: ${pxToRem(1)} solid var(--color-gray-20);

      h2 {
        color: var(--color-neutralBlack);
        font-size: ${pxToRem(20)};
        font-family: 'thiccboi-extrabold';
        font-weight: 700;
        margin: 0;
      }
    }
  }

  @media only screen and (min-width: ${sizes.mobileLargeWidth}) {
    h2 {
      font-size: ${pxToRem(24)} !important;
    }
    ${({ size }) => getWidth(size)}
    ${(cardProps) => positionStyling(cardProps)}
  }
`;
