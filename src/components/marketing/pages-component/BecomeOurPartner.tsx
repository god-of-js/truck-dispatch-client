import ListComponent from 'components/marketing/ListComponent';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import sizes from 'utils/sizes';

export default function BecomeOurPartner() {
  const list = [
    {
      title: 'The truck is always full',
      subtitle:
        'We provide you with loads that are based on your vehicle, location, and availability, free of charge: it is up to you to decide whether you want to claim them or not. We offer the flexibility that you need to improve the operating account of your trucks.',
      boldSubtitleStarter: 'We grow together.',
    },
    {
      title: 'Exclusive offers(coming soon)',
      subtitle:
        'We provide you with offers such as insurance to further reduce the cost of repairs and damages incurred on your vehicle. We also provide an additional method of gaining through referral systems.',
      boldSubtitleStarter: 'Get exclusive benefits.',
    },
    {
      title: 'Quick and assured payments',
      subtitle:
        'Payment would be completed immediately we verify your loading status before the trip starts.',
      boldSubtitleStarter: 'Say goodbye to late payments.',
    },
    {
      title: 'Always by your side',
      subtitle:
        'Our customer care is always available to answer all questions and assist in anyway possible.',
      boldSubtitleStarter: 'You are not alone',
    },
    {
      title: 'Planned journeys',
      subtitle:
        "TruckDispatch's mobile responsive website allows you to organize the routes in advance, centralize paperwork management, manage and visualize earnings, and have all the information within reach.",
      boldSubtitleStarter:
        'Keep everything under control with your mobile phone.',
    },
  ];
  return (
    <BecomeOurPartnerStyling>
      <div className="become-our-partner-inner">
        <div className="main-content">
          <h3>
            WE IMPROVE THE WORKING EXPERIENCE OF MORE THAN 200 TRANSPORTERS
            REGISTERED IN OUR NETWORK
          </h3>
          <p>
            The quality of our road freight service would not be possible
            without the professionalism of the transporters that collaborate
            with TruckDispatch.
          </p>
          <div className="actions-container">
            <UiButton isSquare>
              Join Now <UiIcon icon="ArrowUpRight" />
            </UiButton>
            <UiButton variant="secondary" isSquare>
              I am a transporter
            </UiButton>
          </div>
        </div>
        <div className="list-content">
          <ListComponent data={list} />
        </div>
      </div>
    </BecomeOurPartnerStyling>
  );
}

const BecomeOurPartnerStyling = styled.section`
  width: 100%;
  background: var(--color-gray-700);
  display: flex;
  justify-content: center;

  .become-our-partner-inner {
    width: 90%;
    display: flex;
    flex-direction: column;

    .main-content,
    .list-content {
      width: 100%;
    }

    .main-content {
      h3 {
        font-size: ${pxToRem(24)};
        color: white;
        margin-bottom: ${pxToRem(16)};
        font-weight: 900;
        font-family: 'thiccboi-extrabold';
      }
      p {
        font-size: ${pxToRem(16)};
        color: var(--color-gray-400);
      }
      .actions-container {
        display: flex;
        margin: ${pxToRem(36)} 0;
        align-items: center;
        gap: ${pxToRem(16)};

        button {
          gap: ${pxToRem(16)};
        }
      }
    }
    .list-content {
      border-left: 1px solid var(--color-gray-500);
      padding: 0 0;
    }

    @media screen and (min-width: ${sizes.tabletMidWidth}) {
      width: 80%;
      flex-direction: row;
      .main-content,
      .list-content {
        width: 50%;
        padding: ${pxToRem(80)} 0;
      }
      .main-content {
        padding-right: ${pxToRem(60)};
        h3 {
          font-size: ${pxToRem(36)};
        }
      }
    }
  }
`;
