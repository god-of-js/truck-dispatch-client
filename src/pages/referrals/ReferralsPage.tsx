import DashboardTopNav from 'components/layout/DashboardTopNav';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiTable from 'ui/UiTable';
import UiPill, { PillType } from 'ui/UiPill';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';
import { convertToFullDate, toAnyAction } from 'utils/helpers';
import { getReferrals } from 'modules/Referrals';
import UserDetails from 'ui/UserDetails';
import User from 'types/User';
import Referral from 'types/Referral';

export default function ReferralsPage() {
  const user = useSelector((state: RootState) => state.account.user);
  const referrals = useSelector(
    (state: RootState) => state.referrals.referrals,
  );
  const dispatch = useDispatch();

  const headers = [
    {
      title: 'Name',
      query: 'name',
    },
    {
      title: 'Join date',
      query: 'createdAt',
    },
    {
      title: 'Verification Status',
      query: 'verificationStatus',
    },
    {
      title: 'Referral Commission',
      query: 'commission',
    },
    {
      title: 'Payment Status',
      query: 'paymentStatus',
    },
  ];

  function verificationPillDetails(status?: User['status']) {
    let variant: PillType = 'gray', text = 'Unverified';

    if (status === 'verified') {
      variant = 'success';
      text = 'Verified'
    }
    if (status === 'rejected') {
      variant = 'danger';
      text = 'Rejected Verification';
    }
    if (status === 'fraudulent') {
      variant = 'danger';
      text = 'Fraudulent';
    }
    if (status === 'pending_verification') {
      variant = 'warning';
      text = 'Pending Verification';
    }

    return {
      text: text,
      variant,
    };
  }

  function paymentPillDetails(status: Referral['status']) {
    let variant: PillType = 'gray', text = 'Awaiting Trip'

    if (status === 'completed') {
      variant = 'success'
      text = 'Payment Made'
    }

    return { variant, text }
  }

  const data = referrals.map((referral) => ({
    ...referral,
    name: (
      <UserDetails
        avatar={referral.referred.avatar}
        userName={`${referral.referred.firstName} ${referral.referred.lastName}`}
        profileSubtitle={referral.referred.userType}
      />
    ),
    verificationStatus: (
      <UiPill
        variant={verificationPillDetails(referral.referred.status).variant}
      >
        {verificationPillDetails(referral.referred.status).text}
      </UiPill>
    ),
    createdAt: convertToFullDate(referral.createdAt),
    commission: <span>NGN {referral.commission}</span>,
    paymentStatus: (
      <UiPill
        variant={paymentPillDetails(referral.status).variant}
      >
        {paymentPillDetails(referral.status).text}
      </UiPill>
    )
  }));

  const referralLink = useMemo(() => {
    return (
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '') +
      `/auth/join?code=${user?.referrerCode}`
    );
  }, [user]);

  function copyInviteLink() {
    navigator.clipboard.writeText(referralLink).then(() => {
      Toast.success({
        msg: 'Your referral link has been copied to clipboard',
      });
    });
  }

  useEffect(() => {
    dispatch(toAnyAction(getReferrals()));
  }, []);

  return (
    <div>
      <DashboardTopNav routeName="Referrals" />
      <ReferralsStyling>
        <header>
          <div>
            <h1>Refer your friends and be rewarded</h1>
            <p>
              We're always on the lookout for great people. if you think your
              friends are a good fit, send them our way and receive a cash
              reward.
            </p>
          </div>
          <div className="ref__input-container">
            <div className="ref__input-container__input">
              <UiInput
                name="ref-code"
                value={referralLink}
                size="md"
                onChange={() => {}}
              />
            </div>
            <UiButton onClick={copyInviteLink}>
              <UiIcon icon="Link" /> Share
            </UiButton>
          </div>
        </header>
        <div className=""></div>
        <UiTable
          tableTitle="Referees"
          data={data}
          headers={headers}
          emptyTableAction={copyInviteLink}
          emptyTableBtnContent="Copy referral link"
          emptyTableText="Invite your friends to earn cash rewards and bonuses."
          emptyTableIcon="Moneys"
        />
      </ReferralsStyling>
    </div>
  );
}

const ReferralsStyling = styled.div`
  padding: ${pxToRem(0)} ${pxToRem(24)};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: ${pxToRem(24)};
    }
    p {
      max-width: ${pxToRem(520)};
      color: var(--color-gray-70);
    }

    .ref__input-container {
      display: flex;
      gap: ${pxToRem(8)};
      &__input {
        min-width: ${pxToRem(350)};
      }
    }
  }
`;
