import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import UiForm from 'ui/UiForm';
import UiInput from 'components/ui/UiInput';
import UiSelect, { Option } from 'components/ui/UiSelect';
import UiModal from 'components/ui/UiModal';
import UiButton from 'components/ui/UiButton';
import { loadAccountDetails, loadBanks } from '../../api/paystackIntegrations';
import Loader from 'components/layout/Loader';
import CreateAccountNumberSchema from 'utils/validations/CreateAccountNumberSchema';
import { useDispatch } from 'react-redux';
import { toAnyAction } from 'utils/helpers';
import { saveUserAccount } from 'modules/Account';
import { Toast } from 'utils/toast';
import BankAccount from 'types/BankAccount';

interface Props {
  onClose: () => void;
  bankAccountDetails: BankAccount | null;
}
export default function AddAccount({ bankAccountDetails, onClose }: Props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<{
    accountNumber: string;
    bankCode: string;
  }>({
    bankCode: bankAccountDetails?.bank_code || '',
    accountNumber: bankAccountDetails?.account_number || '',
  });

  const defaultAccountDetails = {
    account_name: '',
    account_number: '',
    bank_id: '',
  };
  const [accountDetails, setAccountDetails] = useState(defaultAccountDetails);
  const [banks, setBanks] = useState<Option[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [accountIsLoading, setAccountIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function createAccount() {
    const uid = localStorage.getItem('uid');

    if (!uid) throw new Error('400: User id not found');

    setLoading(true);
    const bank = banks.find(({ value }) => value === formData.bankCode);

    const data: BankAccount = {
      type: 'nuban',
      name: accountDetails.account_name,
      account_number: accountDetails.account_number,
      bank_code: formData.bankCode,
      bank_name: bank?.label!,
      currency: 'NGN',
      userId: uid,
      id: uid,
    };

    dispatch(toAnyAction(saveUserAccount(data)))
      .then(() => {
        onClose();
        Toast.success({ msg: 'Account Number has been changed' });
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadBanks().then((data) => {
      const formatedData: Option[] = data.map(({ name, code }) => ({
        label: name,
        value: code,
      }));
      setBanks(formatedData);
    });
  }, []);

  const details = useMemo(() => {
    return accountIsLoading ? (
      <Loader />
    ) : accountDetails.account_name ? (
      <div>
        <span className="account-name-title">Account Name:</span>{' '}
        <span className="account-name-value">
          {accountDetails.account_name}
        </span>
      </div>
    ) : (
      errorMessage && <div className="error-message">{errorMessage}</div>
    );
  }, [accountDetails.account_name, errorMessage]);

  useEffect(() => {
    if (formData.accountNumber.length > 9 && formData.bankCode) {
      setAccountIsLoading(true);
      setAccountDetails(defaultAccountDetails);
      setErrorMessage('');
      loadAccountDetails(formData.bankCode, formData.accountNumber)
        .then((data) => {
          setAccountDetails(data);
        })
        .catch((e) => {
          setErrorMessage('Invalid account details');
        })
        .finally(() => {
          setAccountIsLoading(false);
        });
    }
  }, [formData]);

  return (
    <UiModal size="sm" onClose={onClose}>
      <UiForm
        formData={{ ...formData, ...accountDetails }}
        schema={CreateAccountNumberSchema}
        onSubmit={createAccount}
      >
        {({ errors }) => (
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
              label="Bank"
              value={formData.bankCode}
              name="bankCode"
              error={errors.bankCode}
              onChange={handleChange}
            />
            <div>
              <UiInput
                label="Bank Account Number"
                name="accountNumber"
                disabled={!formData.bankCode}
                error={errors.accountNumber || errors.account_name}
                value={formData.accountNumber}
                onChange={handleChange}
              />
              {details}
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
              <UiButton
                isFullWidth
                disabled={!accountDetails.account_name}
                loading={loading}
              >
                Save Account
              </UiButton>
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

  .account-name-title,
  .account-name-value {
    font-size: ${pxToRem(12)};
    color: var(--color-gray-600);
  }
  .account-name-value {
    font-weight: bold;
  }

  .error-message {
    font-size: ${pxToRem(12)};
    color: var(--color-danger);
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${pxToRem(8)};
`;
