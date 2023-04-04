import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import UiButton from 'components/ui/UiButton';
import UiOverlay from 'components/ui/UiOverlay';
import AddAccount from 'components/profile/AddAccount';
import { useSelector } from 'react-redux';
import sizes from 'utils/sizes';
import UiCard from 'ui/UiCard';
import { RootState } from 'modules/index';

export default function AccountDetailsPage() {
  const accountDetails = useSelector(
    (state: RootState) => state.account.user?.bankDetails,
  );
  const [changeBankModal, setChangeBankModal] = useState(false);

  const bankDetails = useMemo(() => {
    if (accountDetails) {
      return (
        <div className="bank-details">
          <div className="currency">NGN</div>
          <div>
            <div className="name">{accountDetails?.name}</div>
            <div className="account-details">
              <div className="acct-number">
                {accountDetails?.account_number}
              </div>
              <div className="detail-divider" />
              <div>{accountDetails?.bank_name}</div>
            </div>
          </div>
          <UiButton
            variant="neutral"
            size="s"
            onClick={() => setChangeBankModal(true)}
          >
            Change
          </UiButton>
        </div>
      );
    }

    return (
      <div className="add-account">
        <div className="currency"></div>
        <UiButton
          size="s"
          variant="neutral"
          onClick={() => setChangeBankModal(true)}
        >
          Add Account
        </UiButton>
      </div>
    );
  }, [accountDetails]);

  return (
    <>
      <AccountPageStyling>
        <UiCard>
          <header>
            <h2>Payout Account</h2>
            <p>
              Payout account is the account where all payments from
              TruckDispatch would be tendered to. You can only have one payment
              account at a time. However, you can change your payout account
              whenever you want. It is required that you have a payout account
              before you can get paid for a trip.
            </p>
          </header>
          {bankDetails}
        </UiCard>
      </AccountPageStyling>
      <UiOverlay isVisible={changeBankModal}>
        <AddAccount
          bankAccountDetails={accountDetails || null}
          onClose={() => setChangeBankModal(false)}
        />
      </UiOverlay>
    </>
  );
}

const AccountPageStyling = styled.div`
  margin: auto;
  width: 90%;

  header {
    margin-bottom: ${pxToRem(40)};
    h2 {
      font-size: ${pxToRem(16)};
      color: var(--color-gray-500);
      margin-top: 0;
    }
    p {
      font-size: ${pxToRem(16)};
      color: var(--color-gray-400);
    }
  }

  .currency {
    font-weight: bold;
    font-size: ${pxToRem(14)};
    color: var(--color-gray-400);
  }
  .bank-details {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    gap: ${pxToRem(20)};

    .name {
      text-transform: uppercase;
      font-size: ${pxToRem(16)};
      color: var(--color-gray-500);
      font-weight: bold;
    }

    .account-details {
      display: flex;
      align-items: center;
      gap: ${pxToRem(12)};
      margin-top: ${pxToRem(12)};
      font-size: ${pxToRem(14)};
      color: var(--color-gray-400);

      .detail-divider {
        width: ${pxToRem(2)};
        height: ${pxToRem(2)};
        background: var(--color-gray-400);
      }
    }

    @media only screen and (min-width: ${sizes.mobileLargeWidth}) {
      flex-direction: row;
      gap: ${pxToRem(8)};
    }
  }
  @media only screen and (min-width: ${sizes.tabletMidWidth}) {
    width: 70%;
  }
  @media only screen and (min-width: ${sizes.laptopWidth}) {
    width: 40%;
  }
`;
