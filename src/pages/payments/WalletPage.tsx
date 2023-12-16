import DashboardTopNav from 'components/layout/DashboardTopNav';
import AddAccount from 'components/profile/AddAccount';
import { topupBalance } from 'modules/Account';
import { RootState } from 'modules/index';
import { lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Payment from 'types/Payment';
import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';

const WithdrawMoney = lazy(() => import('components/payment/WithdrawMoney'));
const DepositMoney = lazy(() => import('components/payment/DepositMoney'));
const ATMCard = lazy(() => import('components/payment/ATMCard'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiIcon = lazy(() => import('ui/UiIcon'));

export default function WalletPage() {
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useDispatch();

  const [depositMoneyIsVisible, setDepositMoneyIsVisible] = useState(false);
  const [withdrawMoneyIsVisible, setWithdrawMoneyIsVisible] = useState(false);
  const [addAccountIsVisible, setAddAccountIsVisible] = useState(false);

  return (
    <>
      <DashboardTopNav routeName="Wallet" />
      <PageStyling>
        <Balances>
          <h2>Balances</h2>
          <div className="atm-cards">
            <ATMCard
              title="Total Balance"
              value={(user?.balance || 0) + (user?.escrowBalance || 0) || 0}
            />
            <ATMCard
              title="Available Balance"
              value={user?.balance || 0}
              variant="info"
            />
            <ATMCard
              title="Escrow Balance"
              value={user?.escrowBalance || 0}
              variant="warning"
            />
          </div>
        </Balances>

        <ActionButtons>
          <UiButton onClick={() => setDepositMoneyIsVisible(true)}>
            <UiIcon icon="CardPos" />
            DEPOSIT
          </UiButton>
          <UiButton
            variant="secondary"
            onClick={() => setWithdrawMoneyIsVisible(true)}
          >
            WITHDRAW
          </UiButton>
        </ActionButtons>
      </PageStyling>
      <DepositMoney
        isOpen={depositMoneyIsVisible}
        key={`depositMoneyIsVisible-${depositMoneyIsVisible}`}
        onClose={() => setDepositMoneyIsVisible(false)}
      />
      <WithdrawMoney
        isOpen={withdrawMoneyIsVisible}
        key={`withdrawMoneyIsVisible-${withdrawMoneyIsVisible}`}
        onClose={() => setWithdrawMoneyIsVisible(false)}
        addAccount={() => setAddAccountIsVisible(true)}
      />
      <AddAccount
        isVisible={addAccountIsVisible}
        onClose={() => {
          setAddAccountIsVisible(false);
        }}
        bankAccountDetails={user?.bankDetails!}
      />
    </>
  );
}

const PageStyling = styled.div`
  padding: ${pxToRem(12)} ${pxToRem(24)};
`;
const Balances = styled.div`
  background: white;
  padding: ${pxToRem(12)} ${pxToRem(15)};
  border-radius: ${pxToRem(8)};

  .atm-cards {
    display: grid;
    gap: ${pxToRem(24)};

    @media screen and (min-width: ${sizes.mobileLargeWidth}) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const ActionButtons = styled.div`
  padding: ${pxToRem(12)} ${pxToRem(15)};
  display: flex;
  gap: ${pxToRem(24)};

  button {
    max-width: ${pxToRem(303)};
    width: 100%;
  }
`;
