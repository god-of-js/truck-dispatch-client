import { requestEmailVerification } from 'modules/Account';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';

import UiModal from 'ui/UiModal';
import { toAnyAction } from 'utils/helpers';

interface Props {
  onClose: () => void;
}
export default function EmailHasBeenSentModal({ onClose }: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function requestNewVerificationLink() {
    setLoading(true);
    dispatch(toAnyAction(requestEmailVerification())).finally(() => {
      setLoading(false);
    });
  }

  return (
    <UiModal size="sm" onClose={onClose}>
      <Styling>
        <h2>Email Verification has been sent</h2>
        <p>
          Your email verification has been sent. Kindly check your mailbox for a
          verification link.
          <br />
          Note: The verification link expires in 10 minutes
        </p>
        <div className="btn-container">
          <UiButton variant="neutral" isFullWidth onClick={() => onClose()}>
            Close
          </UiButton>
          <UiButton
            isFullWidth
            loading={loading}
            onClick={requestNewVerificationLink}
          >
            Request new verification
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
    font-size: ${pxToRem(16)};
  }
  p {
    width: 80%;
    font-size: ${pxToRem(15)};
  }

  .btn-container {
    display: flex;
    width: 80%;
    margin-top: ${pxToRem(12)};
    gap: ${pxToRem(12)};
  }
`;
