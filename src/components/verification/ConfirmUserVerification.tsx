import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppLogo from 'ui/AppLogo';

const UiModal = lazy(() => import('ui/UiModal'));
const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  isVisible: boolean;
  onClose: () => void;
}
export default function ConfirmUserVerification({ isVisible, onClose }: Props) {
  return (
    <UiModal
      isVisible={isVisible}
      size="sm"
      title="Account Verification Submitted"
      onClose={onClose}
    >
      <ModalContent>
        <TextContent>
          Thank you for submitting your request for account verification. We
          will review it and respond in a timely manner. Please ensure to
          regularly check your email inbox for any updates.
        </TextContent>
        <div className="btn-container">
          <Link to="/available-jobs">
            <UiButton>okay</UiButton>
          </Link>
        </div>
      </ModalContent>
    </UiModal>
  );
}

const ModalContent = styled.div`
  padding: ${pxToRem(10)} ${pxToRem(50)};

  .btn-container {
    display: flex;
    justify-content: center;

    button {
      min-width: ${pxToRem(180)};
    }
  }
`;
const TextContent = styled.p`
  text-align: center;
  font-size: ${pxToRem(20)};
  font-weight: 400;
  line-height: ${pxToRem(28)};
`;
