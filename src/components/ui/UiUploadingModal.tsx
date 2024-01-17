import React from 'react';
import UiConfirmModal from './UiConfirmModal';
import styled from 'styled-components';
import Loader from 'components/layout/Loader';

interface Props {
  title: string;
  message1: string;
  message2: string;
  onClose: () => void;
  loading: boolean;
}

const UiUploadingModal = ({
  title,
  message1,
  message2,
  onClose,
  loading,
}: Props) => {
  return (
    <UiConfirmModal
      hideModalClose
      hideActions
      hideNotYetButton
      isVisible={loading}
      variant="primary"
      title={title}
      onClose={onClose}
    >
      <LoadingContent>
        <Loader />
        <Message>
          <p>{message1}</p>
          <p>{message2}</p>
        </Message>
      </LoadingContent>
    </UiConfirmModal>
  );
};

const LoadingContent = styled.div`
  padding: 16px;
  display: flex;
  gap: 30px;
  flex-direction: column;

  p {
    font-weight: 600;
    font-size: ${pxToRem(16)};
    line-height: 20%;
    letter-spacing: -0.02em;
    text-transform: capitalize;
    color: var(--color-gray-80);
  }
`;

const Message = styled.div`
  text-transform: capitalize;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export default UiUploadingModal;
