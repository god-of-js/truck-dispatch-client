import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import sizes from 'utils/sizes';
import FAQList from '../FAQList';

export default function FAQs() {
  return (
    <FAQStyling>
      <div className="faqs-inner">
        <div className="go-to-faqs">
          <h3>DO YOU HAVE ANY QUESTIONS ABOUT TRUCKDISPATCH?</h3>
          <div className="action-btns">
            <UiButton isSquare>
              Go To FAQs <UiIcon icon="ArrowUpRight" />
            </UiButton>
            <UiButton isSquare variant="secondary">
              CONTACT US
            </UiButton>
          </div>
        </div>
        <div className="faq-list">
          <FAQList />
        </div>
      </div>
    </FAQStyling>
  );
}

const FAQStyling = styled.section`
  display: flex;
  justify-content: center;
  padding: ${pxToRem(80)} 0;

  .faqs-inner {
    width: 90%;

    .go-to-faqs {
      width: 100%;
      h3 {
        font-size: ${pxToRem(32)};
        font-weight: bold;
        font-family: 'thiccboi-extrabold';
      }

      .action-btns {
        display: flex;
        align-items: center;
        gap: ${pxToRem(16)};
        margin-top: ${pxToRem(60)};

        button {
          gap: ${pxToRem(16)};
        }
      }
    }

    .faq-list {
      width: 100%;
      margin-top: ${pxToRem(60)};
    }
    @media only screen and (min-width: ${sizes.tabletMidWidth}) {
      width: 80%;
      display: flex;
      justify-content: space-between;

      .go-to-faqs {
        width: 40%;
      }
      .faq-list {
        width: 50%;
      }
    }
  }
`;
