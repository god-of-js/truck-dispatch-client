import DashboardTopNav from 'components/layout/DashboardTopNav';
import styled from 'styled-components';

export default function ReferralsPage() {
  return (
    <div>
      <DashboardTopNav routeName="Referrals" />
      <ReferralsStyling>
        <header>
          <h1>Refer your friends and be rewarded</h1>
          <p>
            We're always on the lookout for great people. if you think your
            friends are a good fit, send them our way and receive a cash reward.
          </p>
        </header>
      </ReferralsStyling>
    </div>
  );
}

const ReferralsStyling = styled.div`
  padding: ${pxToRem(12)} ${pxToRem(24)};

  header {
    h1 {
      font-size: ${pxToRem(24)};
    }
    p {
      max-width: ${pxToRem(520)};
      color: var(--color-gray-70);
    }
  }
`;
