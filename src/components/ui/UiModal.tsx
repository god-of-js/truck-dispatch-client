import React from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import sizes from 'utils/sizes';
import UiIcon from './UiIcon';
import UiButton from './UiButton';

type Size = 'lg' | 'sm';
interface Props {
  children: React.ReactNode;
  position?: 'center' | 'right';
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
    <ModalCard size={size}>
      <OutsideClickHandler onOutsideClick={onClose}>
        <div className="modal-inner">
          <header>
            <UiButton variant="icon-neutral" onClick={goPrev}>
              <UiIcon icon="ArrowLeft" size="16" />
            </UiButton>
            <h2>{title}</h2>
            <UiButton variant="icon-neutral" onClick={onClose}>
              <UiIcon icon="Close" size="20" />
            </UiButton>
          </header>
          {children}
        </div>
      </OutsideClickHandler>
    </ModalCard>
  );
}

const ModalCard = styled.div`
  background: white;
  border-top-left-radius: ${pxToRem(8)};
  border-top-right-radius: ${pxToRem(8)};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  max-height: 80%;

  .modal-inner {
    padding-bottom: ${pxToRem(28)};

    header {
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

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: ${({ size }: { size: Size }) =>
      size === 'lg' ? '50%' : pxToRem(480)};
    position: static;
    margin: auto;
    border-radius: ${pxToRem(16)};
  }
`;
