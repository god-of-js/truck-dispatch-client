import { lazy, useState } from 'react';
import styled from 'styled-components';

const UiAlert = lazy(() => import('ui/UiAlert'));
const UiForm = lazy(() => import('ui/UiForm'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const UiModal = lazy(() => import('ui/UiModal'));
const ATMCard = lazy(() => import('./ATMCard'));

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function DepositMoney({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({})

  function triggerPaystack() {}
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

        <UiForm formData={formData} onSubmit={triggerPaystack}>
            {({}) => <div className="form-body"></div>}
        </UiForm>
      </ModalBody>
    </UiModal>
  );
}

const ModalBody = styled.div`
  padding: ${pxToRem(20)} ${pxToRem(20)};

  .atm-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${pxToRem(24)};
    margin-bottom: ${pxToRem(16)};
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

  .form-body {
    border-top: ${pxToRem(1)} solid var(--color-gray-50);
    margin-top: ${pxToRem(24)};
    padding-top: ${pxToRem(36)};
  }
`;
