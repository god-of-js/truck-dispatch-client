import React, { useState } from 'react';
import styled from 'styled-components';
import UiButton from 'components/ui/UiButton';
import UiOverlay from 'components/ui/UiOverlay';
import AddAccount from 'components/profile/AddAccount';

export default function AccountDetailsPage() {
  const [loading, setLoading] = useState(false);
  const [changeBankModal, setChangeBankModal] = useState(false);

  return (
    <>
      <AccountPageStyling>
        <TrasporterAccountCard>
          <div className="ngn">NGN</div>
          <div className="acct-name">
            Uzoma Chukwueke Martins
            <span className="acct-num">3078877637 .First Bank of Nigeria</span>
          </div>
          <UiButton variant="neutral" onClick={() => setChangeBankModal(true)}>
            Change
          </UiButton>
        </TrasporterAccountCard>
      </AccountPageStyling>
      <UiOverlay isVisible={changeBankModal}>
        <AddAccount onClose={() => setChangeBankModal(false)} />
      </UiOverlay>
    </>
  );
}

const AccountPageStyling = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${pxToRem(24)};
  justify-content: center;
`;

const TrasporterAccountCard = styled.div`
  background: #ffff;
  width: 50%;
  height: ${pxToRem(100)};
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};
  display: flex;
  align-items: center;
  justify-content: space-around;

  .ngn {
    font-weight: bold;
  }

  .acct-name {
    font-weight: bold;
  }

  .acct-num {
    display: block;
    padding-top: ${pxToRem(10)};
    font-size: ${pxToRem(12)};
    opacity: 0.6;
  }
`;
