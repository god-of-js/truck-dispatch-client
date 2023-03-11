import { useEffect, useState } from 'react';
import styled from 'styled-components';
import UiForm from 'ui/UiForm';
import UiInput from 'components/ui/UiInput';
import UiSelect, { Option } from 'components/ui/UiSelect';
import UiModal from 'components/ui/UiModal';
import UiButton from 'components/ui/UiButton';
import { loadAccountDetails, loadBanks } from '../../api/paystackIntegrations';

interface Props {
  onClose: () => void;
}
export default function AddAccount({ onClose }: Props) {
  const [formData, setFormData] = useState<{
    accountNumber: string;
    bankCode: string;
  }>({
    bankCode: '',
    accountNumber: '',
  });
  const [banks, setBanks] = useState<Option[]>([]);
  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function createAccount() {}

  useEffect(() => {
    loadBanks().then((data) => {
      const formatedData: Option[] = data.map(({ name, code }) => ({
        label: name,
        value: code,
      }));
      setBanks(formatedData);
    });
  }, []);

  useEffect(() => {
    if (formData.accountNumber.length > 9 && formData.bankCode) {
      loadAccountDetails(formData.bankCode, formData.accountNumber).then((data) => {
        console.log(data);
      })
    }
  }, [formData.accountNumber])

  return (
    <UiModal size="sm" onClose={onClose}>
      <UiForm formData={formData} onSubmit={createAccount}>
        {() => (
          <AddAcountStyling>
            <header>
              <h2>Add Account</h2>
              <p>
                Your account details are required to enable agents make payment
                to you without hassle or back and forth.
              </p>
            </header>
            <UiSelect
              options={banks}
              label="Bank Name"
              onChange={handleChange}
              value={formData.bankCode}
              name="bankCode"
            />
            <div>
              <UiInput
                label="Bank Account Number"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
              />
              <div>Account Name: CHUKWUEKE UZOMA MARTINS</div>
            </div>
            <ButtonContainer>
              <UiButton
                isFullWidth
                variant="neutral"
                type="button"
                onClick={onClose}
              >
                Cancel
              </UiButton>
              <UiButton isFullWidth>Save Account</UiButton>
            </ButtonContainer>
          </AddAcountStyling>
        )}
      </UiForm>
    </UiModal>
  );
}
const AddAcountStyling = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(20)};

  h2 {
    margin-top: 0;
    margin-bottom: ${pxToRem(8)};
    font-size: ${pxToRem(20)};
    color: var(--color-gray-500);
  }
  p {
    font-size: ${pxToRem(16)};
    color: var(--color-gray-600);
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${pxToRem(8)};
`;
