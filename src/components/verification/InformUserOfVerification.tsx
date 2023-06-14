import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiModal from 'ui/UiModal';

interface Props {
  onClose: () => void;
  isVisible: boolean;
}
export default function InformUserOfVerification({
  isVisible,
  onClose,
}: Props) {
  return (
    <UiModal isVisible={isVisible} size="sm" title="Verification required" onClose={onClose}>
      <ModalContent>

      <TextContent>
        For security purposes, verification is required before you can gain
        access to the full suite of features we have in store.
      </TextContent>
      <TextContent>
        Kindly navigate to the{' '}
        <Link to="/profile/verification">Verification Page</Link> or click the
        button below to verify your profile and our team would get back to you
        shortly.
      </TextContent>
      <div className="btn-container">

      <Link to="/profile/verification">
        <UiButton>Verify Profile</UiButton>
      </Link>
      </div>
      </ModalContent>
    </UiModal>
  );
}

const ModalContent = styled.div`
  padding: ${pxToRem(12)} ${pxToRem(24)};

  .btn-container {
    display: flex;
    justify-content: center;

    button {
      min-width: ${pxToRem(180)}
    }
  }
`
const TextContent = styled.p`
  padding: 12px;
`;
