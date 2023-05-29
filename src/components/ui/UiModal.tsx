import React from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import sizes from 'utils/sizes';
import UiIcon from './UiIcon';
import UiButton from './UiButton';

type Size = 'lg' | 'sm';
type Position = 'center' | 'right';

interface Props {
  children: React.ReactNode;
  position?: Position;
  size?: Size;
  title?: string;
  onClose: () => void;
  goPrev?: () => void;
}
export default function UiModal({
  children,
  title,
  position = 'center',
  size = 'lg',
  onClose,
  goPrev,
}: Props) {
  return (
    <Modal>
      <OutsideClickHandler onOutsideClick={onClose}>
        <ModalCard position={position} size={size}>
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
      </OutsideClickHandler>
    </Modal>
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

        h2 {
          font-size: ${pxToRem(24)};
        }
      }
     
      @media only screen and (min-width: ${sizes.tabletLargeWidth}) {
        width: 60%;
      }
      @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
        width: 45%;
      }
    `;
  }

  return `
    position: static;
    margin: auto;
    border-radius: ${pxToRem(16)};
    ${size === 'lg' ? '50%' : pxToRem(540)}
  `;
}

interface CardProps {
  size?: Size;
  position?: Position;
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

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${pxToRem(18)} ${pxToRem(24)};

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
    width: ${({ size }: CardProps) => (size === 'lg' ? '50%' : pxToRem(540))};
    ${(cardProps: CardProps) => positionStyling(cardProps)}
  }
`;
