import styled from 'styled-components';
import SignUpImage from '../../assets/img/sign-up-image.png';
import UiLogo from 'ui/UiLogo';
import sizes from 'utils/sizes';

interface Props {
  children: React.ReactNode;
  infoContent?: React.ReactNode;
  /** The invert prop takes the info content to the right and the main content which houses the forms to the left e.g LoginPage */
  invert?: boolean;
  /** The img prop says we want to set an image as background on the infoContent */
  img?: boolean;
  /** The isInvertedForm informs us that this is inverted but with a form instead of cards. This is used to add fixed widths as the current design does not
   * Make use of fixed widths e.g LoginPage */
  isInvertedForm?: boolean;
}
export default function AuthLayoutStyling({
  children,
  infoContent,
  invert,
  img,
  isInvertedForm,
}: Props) {
  return (
    <LayoutStyling
      invert={invert!}
      isInvertedForm={isInvertedForm}
      hasImage={!!img}
    >
      <div className="info-content">
        <div className="info-content__inner">
          {!invert && (
            <div className="logo">
              <UiLogo />
            </div>
          )}
          {img && <img src={SignUpImage} alt="truckdispatch authentication" />}
          {infoContent}
        </div>
      </div>
      <div className="main-content-container">
        <div className="main-content">
          {invert && (
            <div className="logo">
              <UiLogo />
            </div>
          )}
          <div className="main-content__inner">
            <div className="main-content__inner--not-inverted">{children}</div>
          </div>
        </div>
      </div>
    </LayoutStyling>
  );
}

interface StyleProps {
  invert?: boolean;
  hasImage?: boolean;
  isInvertedForm?: boolean;
}
const LayoutStyling = styled.div`
  display: flex;
  flex-direction: column;
  gap:40px;
  height: 100%;

  .logo {
    display: none;
  }
  .info-content {
    background-color: var(--color-primary-10);
    display: none;
    ${({ invert }: StyleProps) =>
      !invert &&
      `
      display:block;
      padding:16px;
      `}
  }
  .main-content-container {
    height: 100%;
    .main-content {
      margin: auto;
      width: 90%;
      height: 100%;
      &__inner {
        height: 95%;

        &--not-inverted {
          height: 100%;
        }

        /* For inverted forms where the form is on the left instead of right */
        ${({ isInvertedForm, invert }: StyleProps) =>
          invert &&
          `
            @media screen and (min-width: ${sizes.tabletLargeWidth}) {
              ${isInvertedForm && 'width: 100%;'}
              &--not-inverted {
                width: 100%;
                height: 75%;
                padding-bottom: 10%;
              }
            }
          `}
      }
    }
  }

  @media screen and (min-width: ${sizes.tablet}) {
    gap:40px;
    ${({ invert }: StyleProps) => invert && 'flex-direction: row-reverse;'}

    .logo {
      display: block;
      padding:32px 0;
      position: absolute;
      top: 0;
    }

    .main-content-container {
      width: 100%;
      .main-content {
        display: flex;
        width: ${({ invert }: StyleProps) => (invert ? '60%' : '100%')};
        justify-content: ${({ invert }: StyleProps) =>
          invert ? '' : 'flex-end'};
        padding-top: ${({ invert }: StyleProps) =>
          invert ? '5%' : '105px'};
        height: 100%;

        &__inner {
          height: 100%;
          margin: initial;
          &--not-inverted {
            position: relative;
            height: 75%;
          }

          ${({ invert }: StyleProps) =>
            invert &&
            `
              display: flex;
              align-items: center;
              justify-content: flex-end; 
          `}

          /* For forms on the right. */
          ${({ invert }: StyleProps) =>
            !invert &&
            `
            width: 100%;
          &--not-inverted {
              width: 100%;
              margin: auto;
            }
          `}
        }
      }
    }

    .info-content {
      padding: 0;
      width: 40%;
      display: block;
      height: 100vh;
      position: fixed;
      ${({ hasImage }: StyleProps) =>
        !hasImage && `padding-top: 160px;`}
      &__inner {
        height: 100%;
        ${({ hasImage }: StyleProps) =>
          !hasImage && 'width: 60%; margin: auto;'}
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  @media screen and (max-width: ${sizes.tabletLargeWidth}) and (min-width: ${sizes.mobileLargeWidth}) {
    .main-content-container {
      .main-content {
        width: 80%;
      }
    }
  }

  @media screen and (min-width: ${sizes.tabletLargeWidth}) {
    .main-content-container {
      .main-content {
        ${({ invert }: StyleProps) => invert && `padding-right: 15%;`}
      }
    }
  }
`;
