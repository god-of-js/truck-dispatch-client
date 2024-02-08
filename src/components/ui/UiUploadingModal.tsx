import React from 'react';
import UiConfirmModal from './UiConfirmModal';
import styled from 'styled-components';
import Loader from 'components/layout/Loader';

interface Props {
  title: string;
  paragraphs?: string[];
  onClose: () => void;
  isVisible: boolean;
}

const UiUploadingModal = ({
  isVisible,
  paragraphs = [
    'Please wait while we upload your files.',
    "Note: File Uploads Could Take 1 - 2 minutes depending on it's size",
  ],
  title,
  onClose,
}: Props) => {
  return (
    <UiConfirmModal
      hideModalClose
      hideActions
      hideNotYetButton
      isVisible={isVisible}
      variant="primary"
      title={title}
      onClose={onClose}
    >
      <LoadingContent>
        <Loader />
        <Message>
          {paragraphs.map((paragraph) => (
            <p>{paragraph}</p>
          ))}
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
