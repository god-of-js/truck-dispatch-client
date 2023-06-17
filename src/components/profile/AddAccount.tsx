import { lazy, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { loadAccountDetails, loadBanks } from '../../api/paystackIntegrations';
import CreateAccountNumberSchema from 'utils/validations/CreateAccountNumberSchema';
import { useDispatch, useSelector } from 'react-redux';
import { containsOnlyNumbers, toAnyAction } from 'utils/helpers';
import { createUserBankAccount } from 'modules/Account';
import BankAccount from 'types/BankDetails';
import { RootState } from 'modules/index';
import { Option } from 'components/ui/UiSelect';

const UiForm = lazy(() => import('ui/UiForm'));
const UiInput = lazy(() => import('ui/UiInput'));
const UiSelect = lazy(() => import('ui/UiSelect'));
const Loader = lazy(() => import('components/layout/Loader'));
const UiModal = lazy(() => import('ui/UiModal'));
const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  onClose: () => void;
  bankAccountDetails: BankAccount | null;
  isVisible: boolean;
}
export default function AddAccount({
  bankAccountDetails,
  onClose,
  isVisible,
}: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.account.user);
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
    bank_id: NaN,
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

  async function saveBankAccount() {
    setLoading(true);
    const bank = banks.find(({ value }) => value === formData.bankCode);

    const data = {
      name: accountDetails.account_name,
      account_number: accountDetails.account_number,
      bank_code: formData.bankCode,
      bank_name: bank?.label!,
    };
    dispatch(toAnyAction(createUserBankAccount(data)))
      .then(() => {
        onClose();
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
    if (errorMessage)
      return <div className="error-message">{errorMessage}</div>;
    return accountIsLoading ? (
      <Loader />
    ) : (
      <div>
        <span className="account-name-title">Account Name:</span>{' '}
        <span className="account-name-value">
          {accountDetails.account_name}
        </span>
      </div>
    );
  }, [accountDetails.account_name, errorMessage]);

  useEffect(() => {
    if (!containsOnlyNumbers(formData.accountNumber)) {
      setErrorMessage('Invalid account details');
    } else if (formData.accountNumber.length > 9 && formData.bankCode) {
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
    <UiModal
      isVisible={isVisible}
      title="Add Payout Account"
      size="sm"
      onClose={onClose}
    >
      <UiForm
        formData={{ ...formData, ...accountDetails }}
        schema={CreateAccountNumberSchema}
        onSubmit={saveBankAccount}
      >
        {({ errors }) => (
          <AddAcountStyling>
            <header>
              <p>
                Your account details are required to enable clients make payment
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
  gap: 20px;
  padding: 12px 24px;

  h2 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 20px;
    color: var(--color-gray-500);
  }
  p {
    font-size: 16px;
    color: var(--color-gray-600);
  }

  .account-name-title,
  .account-name-value {
    font-size: 12px;
    color: var(--color-gray-600);
  }
  .account-name-value {
    font-weight: bold;
  }

  .error-message {
    font-size: 12px;
    color: var(--color-danger);
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
