import DashboardTopNav from 'components/layout/DashboardTopNav';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiTable from 'ui/UiTable';
import UiPill from 'ui/UiPill';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';

export default function ReferralsPage() {
  const user = useSelector((state: RootState) => state.account.user)
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
      query: 'status',
    },
    {
      title: 'Referral Commission',
      query: 'referralCommission',
    },
    {
      title: 'Payment Status',
      query: 'paymentStatus',
    },
  ];

  const data = [
    {
      _id: '1ojnp0032',
      name: 'Henry Eze',
      createdAt: '2017-01-01',
      referralCode: '#PWrYZV',
      status: <UiPill variant="success">Verified</UiPill>,
      referralCommission: <span>NGN 5000</span>,
      paymentStatus: <UiPill variant="success">Completed</UiPill>,
    },
    {
      _id: '1ojnp0032',
      name: 'Henry Eze',
      createdAt: '2017-01-01',
      referralCode: '#PWrYZV',
      status: <UiPill variant="warning">Pending</UiPill>,
      referralCommission: '---',
      paymentStatus: <span>TBD</span>,
    },
  ];

  const referralLink = useMemo(() => {
    return (
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '') + `/auth/join?code=${user?.referrerCode}`
    );
  }, [user]);

  function copyInviteLink() {

    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        Toast.success({
          msg: 'Your referral link has been copied to clipboard',
        });
      });
  }
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
            <div className='ref__input-container__input'>
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
