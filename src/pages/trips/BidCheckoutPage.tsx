import React from 'react';
import styled from 'styled-components';
import sizes from 'utils/sizes';

export default function BidCheckoutPage() {
  return (
    <CardContainer>
        
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background: #ffffff;
  width: 90%;
  margin: auto;
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 70%;
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 50%;
  }
`;