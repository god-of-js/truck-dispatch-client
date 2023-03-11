import React, { useState } from 'react';
import styled from 'styled-components';
import UiButton from '../../components/ui/UiButton';
import UiInput from '../../components/ui/UiInput';
import UiSelect from '../../components/ui/UiSelect';
import UiModal from '../../components/ui/UiModal';
import UiOverlay from '../../components/ui/UiOverlay';

export default function AccountDetailsPage() {
  const [formData, setFormData] = useState<{
    bankName: string;
    accountNumber: string;
  }>({
    bankName: '',
    accountNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [changeBankModal, setChangeBankModal] = useState(false);

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  const SelectData = [
    {
      label: 'First Bank',
      value: 'First Bank',
    },
    {
      label: 'UBA Bank',
      value: 'Uba Bank',
    },
  ];

  const closeChangeBankModal = () => {
    setChangeBankModal(false);
  };

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
      {/* modal */}
      <UiOverlay isVisible={changeBankModal}>
        <UiModal onClose={closeChangeBankModal}>
          <UiSelect
            options={SelectData}
            label="Bank Name"
            onChange={handleChange}
            value={formData.bankName}
            name="bankName"
          />
          <TopSpacer>
            <UiInput
              label="Corporate Bank Account Number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </TopSpacer>
          <TopSpacer>
            <div>Account Name: CHUKWUEKE UZOMA MARTINS</div>
          </TopSpacer>
          <ButtonContainer>
            <UiButton variant="neutral" onClick={closeChangeBankModal}>Cancel</UiButton>
            <UiButton>Save</UiButton>
          </ButtonContainer>
        </UiModal>
      </UiOverlay>
      {/* end modal */}
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

const TopSpacer = styled.div`
  margin-top: ${pxToRem(30)};
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${pxToRem(50)};
`;
