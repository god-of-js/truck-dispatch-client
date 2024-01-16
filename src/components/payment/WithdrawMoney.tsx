import { Link } from 'react-router-dom';
import { RootState } from 'modules/index';
import { lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { OnChangeParams } from 'ui/UiInput';
import sizes from 'utils/sizes';
import PaystackImage from '../../assets/img/paystack.png';
import { Toast } from 'utils/toast';
import AmountSchema from 'utils/validations/AmountSchema';
import { toAnyAction } from 'utils/helpers';
import { withdrawFromBalance } from 'modules/Account';
import WithdrawalDetails from 'types/WithdrawalDetails';

const UiAlert = lazy(() => import('ui/UiAlert'));
const UiInput = lazy(() => import('ui/UiInput'));
const UiField = lazy(() => import('ui/UiField'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiForm = lazy(() => import('ui/UiForm'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const UiModal = lazy(() => import('ui/UiModal'));
const ATMCard = lazy(() => import('./ATMCard'));

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addAccount: () => void;
}
export default function WithdrawMoney({ isOpen, onClose, addAccount }: Props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    amount: NaN,
  });
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.account.user);

  function handleChange({ name, value }: OnChangeParams) {
    setFormData((data) => ({ ...data, [name]: value }));
  }

  function withdrawFunds() {
    if (!formData.amount) return;

    if (formData.amount > (user?.balance || 0)) {
      Toast.error({ msg: 'Insufficient Funds' });
      return;
    }
    if (!user?.bankDetails) {
      Toast.error({
        msg: 'Payout account is absent. Input a payout account to proceed.',
      });
      return;
    }
    setLoading(true);
    dispatch(toAnyAction(withdrawFromBalance(formData as WithdrawalDetails)))
      .then(() => {
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <UiModal isVisible={isOpen} title="Withdraw" onClose={onClose}>
      <ModalBody>
        <div className="atm-cards">
          <ATMCard
            title="Available Balance"
            value={user?.balance}
            variant="info"
          />
          <ATMCard
            title="Escrow Balance"
            value={user?.escrowBalance}
            isActive={false}
            variant="warning"
          />
        </div>

        <UiAlert variant="gray" icon={<UiIcon icon="Warning" size="28" />}>
          <div className="alert-warning">
            <div className="alert-header">Note</div>
            <div className="alert-message">
              Please take note that no deduction would be made on your
              withdrawal. Also, you can only withdraw to your current withdrawal
              account. To input or change your account, proceed to your{' '}
              <Link to="/profile/accounts">Accounts Page</Link>
            </div>
          </div>
        </UiAlert>

        <UiForm
          formData={formData}
          schema={AmountSchema}
          onSubmit={withdrawFunds}
        >
          {({ errors }) => (
            <div className="form-body">
              <div className="duo-grid">
                <UiInput
                  label="Amount To Withdraw (in naira)"
                  value={formData.amount}
                  name="amount"
                  type="number"
                  error={errors.amount}
                  onChange={handleChange}
                />
                <div>
                  <UiInput
                    disabled
                    label="Account Number"
                    name="acc-number"
                    value={user?.bankDetails?.account_number || ''}
                    onChange={() => {}}
                  />
                  <UiButton
                    variant="primary-text"
                    type="button"
                    size="text"
                    onClick={addAccount}
                  >
                    {user?.bankDetails?.account_number
                      ? 'Change Payout Account'
                      : 'Add Payout Account'}
                  </UiButton>
                </div>
                <UiInput
                  disabled
                  label="Bank Name"
                  name="acc-name"
                  value={user?.bankDetails?.bank_name || ''}
                  onChange={() => {}}
                />
                <UiInput
                  disabled
                  label="Account Name"
                  name="total"
                  value={user?.bankDetails?.name || ''}
                  onChange={() => {}}
                />
              </div>

              <UiField label="Powered By:">
                <PaystackStyling>
                  <img
                    src={PaystackImage}
                    alt="Truckdispatch uses Paystack"
                    width={40}
                  />
                  <span>Paystack</span>
                </PaystackStyling>
              </UiField>

              <div className="action-btns">
                <UiButton
                  size="large"
                  type="button"
                  variant="danger-secondary"
                  onClick={onClose}
                >
                  Cancel
                </UiButton>
                <UiButton size="large" loading={loading}>
                  Proceed
                </UiButton>
              </div>
            </div>
          )}
        </UiForm>
      </ModalBody>
    </UiModal>
  );
}

const ModalBody = styled.div`
  padding: ${pxToRem(20)} ${pxToRem(20)};
  max-height: 70vh;
  overflow-y: auto;

  .atm-cards {
    display: grid;
    gap: ${pxToRem(24)};
    margin-bottom: ${pxToRem(16)};

    @media screen and (min-width: ${sizes.laptopSmallWidth}) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .alert-warning {
    .alert-header {
      color: var(--color-primary);
      font-size: ${pxToRem(14)};
      font-style: normal;
      font-weight: 700;
      line-height: ${pxToRem(16)};
    }
    .alert-message {
      color: var(--color-gray-70);
      font-size: ${pxToRem(12)};
      font-style: normal;
      font-weight: 400;
      line-height: ${pxToRem(16)};
    }
  }

  .action-btns {
    display: flex;
    justify-content: center;
    gap: ${pxToRem(24)};
    margin-top: ${pxToRem(24)};

    button {
      width: ${pxToRem(134)};
    }
  }
  .form-body {
    border-top: ${pxToRem(1)} solid var(--color-gray-50);
    margin-top: ${pxToRem(24)};
    padding-top: ${pxToRem(36)};
    .duo-grid {
      display: grid;
      gap: ${pxToRem(24)};
      margin-bottom: ${pxToRem(24)};
      @media screen and (min-width: ${sizes.tablet}) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
`;

const PaystackStyling = styled.div`
  padding: ${pxToRem(8)} ${pxToRem(16)};
  background: var(--color-primary-10);
  border-radius: ${pxToRem(8)};
  display: flex;
  align-items: center;
  gap: ${pxToRem(12)};
  font-size: ${pxToRem(14)};
  font-style: normal;
  font-weight: 500;
  line-height: ${pxToRem(18)};
`;
