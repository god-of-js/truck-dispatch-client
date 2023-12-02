import DashboardTopNav from 'components/layout/DashboardTopNav';
import { RootState } from 'modules/index';
import { lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import sizes from 'utils/sizes';

const DepositMoney = lazy(() => import('components/payment/DepositMoney'));
const ATMCard = lazy(() => import('components/payment/ATMCard'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiIcon = lazy(() => import('ui/UiIcon'));

export default function WalletPage() {
  const user = useSelector((state: RootState) => state.account.user);

  const [depositMoneyIsVisible, setDepositMoneyIsVisible] = useState(false);
  return (
    <>
      <DashboardTopNav routeName="Wallet" />
      <PageStyling>
        <Balances>
          <h2>Balances</h2>
          <div className="atm-cards">
            <ATMCard title="Total Balance" value={user?.balance} />
            <ATMCard title="Available Balance" value={0} variant="info" />
            <ATMCard title="Pending Balance" value={0} variant="warning" />
          </div>
        </Balances>

        <ActionButtons>
          <UiButton onClick={() => setDepositMoneyIsVisible(true)}>
            <UiIcon icon="CardPos" />
            DEPOSIT
          </UiButton>
          <UiButton variant="secondary">WITHDRAW</UiButton>
        </ActionButtons>
      </PageStyling>
      <DepositMoney
        isOpen={depositMoneyIsVisible}
        onClose={() => setDepositMoneyIsVisible(false)}
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
