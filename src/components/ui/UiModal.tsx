import React from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import sizes from 'utils/sizes';
import UiIcon from './UiIcon';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}
export default function UiModal({ children, onClose }: Props) {
  return (
    <ModalCard>
      <OutsideClickHandler onOutsideClick={onClose}>
        <div className="modal-inner">
          <div className="close-button-container">
            <button onClick={onClose}>
              <UiIcon icon="X" />
            </button>
          </div>
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
  .modal-inner {
    padding: ${pxToRem(16)};
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 40%;
    position: static;
    margin: auto;
    border-radius: ${pxToRem(8)};
  }
  .close-button-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${pxToRem(8)};
      width: ${pxToRem(24)};
      height: ${pxToRem(24)};
      background: transparent;
      border: transparent;
      border-radius: 50%;

      :hover {
        background: var(--color-gray-100);
      }
    }
  }
`;
