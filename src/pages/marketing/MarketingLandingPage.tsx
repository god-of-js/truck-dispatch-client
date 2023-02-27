import React from 'react';
import styled from 'styled-components';
import HeroSection from 'components/marketing/pages-component/HeroSection';
import UiIcon, { Icons } from 'ui/UiIcon';
import sizes from 'utils/sizes';
import PersonalInteraction from 'components/marketing/pages-component/PersonalInteraction';
import BecomeOurPartner from 'components/marketing/pages-component/BecomeOurPartner';

interface BenefitObj {
  icon: Icons;
  title: string;
  subtitle: string;
}
export default function MarketingLandingPage() {
  const benefits: BenefitObj[] = [
    {
      icon: 'ShieldCheck',
      title: 'Access to Verified Transporters',
      subtitle:
        'Our transporters undergo rigorous identity and fraud verification before vetting to prevent fraud and protect you and your goods.',
    },
    {
      icon: 'Kanban',
      title: 'Transport Management',
      subtitle:
        'Benefit from transparency and cost savings while we manage all your transports and logistics service providers via the TruckDispatch platform.',
    },
    {
      icon: 'Truck',
      title: 'Freight Forwarding',
      subtitle:
        'Use our proven transport capacity on our Nigerian-wide tradelane network. With our partner network of highly qualified transporters, we offer you the right capacity at the right time.',
    },
  ];
  return (
    <>
      <HeroSection />

      <Benefits>
        <div className="benefits-inner">
          {benefits.map((benefit, index) => (
            <Benefit key={index}>
              <div className="icon">
                <UiIcon icon={benefit.icon} size="40" />
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.subtitle}</p>
            </Benefit>
          ))}
        </div>
      </Benefits>
      <PersonalInteraction />
      <BecomeOurPartner />
    </>
  );
}

const pageWidth = '70%';

const Benefits = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  margin: ${pxToRem(40)} 0;

  .benefits-inner {
    gap: ${pxToRem(16)};
    padding: ${pxToRem(48)} 0;
    width: 90%;
  }
  @media only screen and (min-width: ${sizes.tabletMidWidth}) {
    margin: 0;
    .benefits-inner {
      grid-template-columns: auto auto auto;
      display: grid;
      width: 80%;
    }
  }
`;

const Benefit = styled.div`
  padding: ${pxToRem(24)};
  margin: ${pxToRem(24)} 0;
  border: 1px solid var(--color-gray-100);
  .icon {
    color: var(--color-primary);
  }
  h2 {
    font-size: ${pxToRem(16)};
    color: var(--color-gray-900);
  }
`;
