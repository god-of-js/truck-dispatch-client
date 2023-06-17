import React, { lazy } from 'react';
import styled from 'styled-components';

const UiModal = lazy(() => import('ui/UiModal'));
const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  onClose: () => void;
  isVisible: boolean;
}
export default function EmailHasBeenVerifiedModal({
  onClose,
  isVisible,
}: Props) {
  return (
    <UiModal isVisible={isVisible} size="sm" onClose={onClose}>
      <Styling>
        <h2>Your email has been verified &#127881; &#127881;</h2>
        <p>
          Hurray &#127881;&#127881;!! your email has been verified. all features
          have now been unlocked
        </p>
        <div className="btn-container">
          <UiButton variant="neutral" isFullWidth onClick={() => onClose()}>
            Close
          </UiButton>
        </div>
      </Styling>
    </UiModal>
  );
}

const Styling = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h2 {
    margin: 0;
    font-size:16px;
  }
  p {
    width: 80%;
    font-size:15px;
  }

  .btn-container {
    display: flex;
    width: 80%;
    margin-top:12px;
    gap:12px;
  }
`;
