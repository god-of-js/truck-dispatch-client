import { RootState } from 'modules/index';
import { lazy, useMemo, useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Payment from 'types/Payment';
import { OnChangeParams } from 'ui/UiInput';
import {
  calculateVAT,
  nairaToKobo,
  priceWithTDPercent,
  tdPercentage,
} from 'utils/helpers';
import { paystackPublickKey } from 'utils/privateKeys';
import sizes from 'utils/sizes';
import { Toast } from 'utils/toast';
import DepositMoneySchema from 'utils/validations/DepositMoneySchema';
import PaystackImage from '../../assets/img/paystack.png';

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
  onCompleted: (param?: Payment) => void;
}
export default function DepositMoney({ isOpen, onClose, onCompleted }: Props) {
  const [formData, setFormData] = useState({
    amount: null,
  });
  const user = useSelector((state: RootState) => state.account.user);
  const paystackConfig = {
    email: user?.email || '',
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    amount: Math.round(nairaToKobo(priceWithTDPercent(formData.amount || 0))),
    publicKey: paystackPublickKey,
  };
  const initializePayment = usePaystackPayment(paystackConfig);

  const agencyFee = useMemo(
    () => tdPercentage(formData.amount || 0),
    [formData.amount],
  );
  const vat = useMemo(() => calculateVAT(agencyFee), [agencyFee]);
  const totalAmount = useMemo(
    () => priceWithTDPercent(formData.amount || 0),
    [formData.amount],
  );

  function handleChange({ name, value }: OnChangeParams) {
    setFormData((data) => ({ ...data, [name]: value }));
  }

  function handleCompletedTransaction(param?: Payment) {
    if (!param) {
      Toast.error({
        msg: 'Transaction information was not passed. Kindly reach out to support.',
      });
      return;
    }

    onCompleted({
      ...param,
      totalAmountPaid: totalAmount,
      amount: formData.amount ? Number(formData.amount) : 0,
    });
  }

  function triggerPaystack() {
    if (!formData.amount) return;

    initializePayment(handleCompletedTransaction);
  }
  return (
    <UiModal isVisible={isOpen} title="Deposit" onClose={onClose}>
      <ModalBody>
        <div className="atm-cards">
          <ATMCard title="Available Balance" value={0} variant="info" />
          <ATMCard title="Pending Balance" value={0} variant="warning" />
        </div>

        <UiAlert variant="gray" icon={<UiIcon icon="Warning" size="28" />}>
          <div className="alert-warning">
            <div className="alert-header">Note</div>
            <div className="alert-message">
              Please take note that a deduction of 7% and VAT charges will be
              applied to your deposit. However, when you make payments for your
              trips, no deductions will be made.
            </div>
          </div>
        </UiAlert>

        <UiForm
          formData={formData}
          schema={DepositMoneySchema}
          onSubmit={triggerPaystack}
        >
          {({ errors }) => (
            <div className="form-body">
              <div className="duo-grid">
                <UiInput
                  label="Deposit Amount (in naira)"
                  value={formData.amount}
                  name="amount"
                  type="number"
                  error={errors.amount}
                  onChange={handleChange}
                />
                <UiInput
                  disabled
                  label="Agency Fee (in naira)"
                  name="agency-fee"
                  value={agencyFee}
                  onChange={() => {}}
                />
                <UiInput
                  disabled
                  label="VAT (in naira)"
                  name="vat"
                  value={vat}
                  onChange={() => {}}
                />
                <UiInput
                  disabled
                  label="Total Amount (in naira)"
                  name="total"
                  value={totalAmount}
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
                  variant="danger-secondary"
                  onClick={onClose}
                >
                  Cancel
                </UiButton>
                <UiButton size="large">Proceed</UiButton>
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
  overflow: auto;

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
