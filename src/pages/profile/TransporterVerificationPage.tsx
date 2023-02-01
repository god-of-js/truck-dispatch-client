import VerificationForm from 'components/profile/VerificationForm';
import React from 'react';
import styled from 'styled-components';

import sizes from '../../sizes';

export default function TransporterVerificationPage() {
  return (
    <TransportVerificationCard>
      <VerificationForm />
    </TransportVerificationCard>
  );
}

const TransportVerificationCard = styled.div`
  background: #ffffff;
  width: 90%;
  margin: auto;
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 60%;
    border-top: none;
    position: static;
    border-right: ${pxToRem(1)} solid var(--color-gray-200);
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 40%;
  }
`;
