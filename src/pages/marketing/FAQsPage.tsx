import FAQList from 'components/marketing/FAQList';
import React from 'react';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import sizes from 'utils/sizes';

export default function FAQsPage() {
  return (
    <FAQsStyling>
      <div className="inner">
        <h3>Frequently Asked Questions</h3>
        <FAQList />
      </div>
      <div className="contact-us">
        <h3>CAN'T FIND WHAT YOU'RE LOOKING FOR?</h3>
        <p>
          Contact our team and we would help resolve your questions or problems.
        </p>
        <UiButton isSquare variant='dark-outlined'>contact us</UiButton>
      </div>
    </FAQsStyling>
  );
}

const FAQsStyling = styled.div`
  .inner {
    min-height: 70vh;
    padding-top: ${pxToRem(160)};
    width: 90%;
    margin: auto;

    h3 {
      text-align: center;
      margin-bottom: ${pxToRem(80)};
      font-weight: 900;
      font-family: 'thiccboi-extrabold';
      font-size: ${pxToRem(24)};
    }

    @media only screen and (min-width: ${sizes.tabletMidWidth}) {
      width: 70%;
    }
  }
  .contact-us {
    padding: ${pxToRem(60)};
    background: var(--color-gray-100);
    display: flex;
    align-items: center;
    flex-direction: column;

    h3 {
      font-weight: 900;
      font-family: 'thiccboi-extrabold';
      font-size: ${pxToRem(32)};
      margin-bottom: ${pxToRem(12)};
    }

    p {
      color: var(--color-gray-600);
      margin-bottom: ${pxToRem(48)};
    }
  }
`;
