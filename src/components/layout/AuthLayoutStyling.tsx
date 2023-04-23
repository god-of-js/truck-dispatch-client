import styled from 'styled-components';
import SignUpImage from '../../assets/img/sign-up-image.png';
import UiLogo from 'ui/UiLogo';
import sizes from 'utils/sizes';

interface Props {
  children: React.ReactNode;
  infoContent?: React.ReactNode;
  invert?: boolean;
  img?: boolean;
}
export default function AuthLayoutStyling({
  children,
  infoContent,
  invert,
  img,
}: Props) {
  return (
    <LayoutStyling invert={invert!} hasImage={!!img}>
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
}
const LayoutStyling = styled.div`
  .logo {
    display: none;
  }
  .info-content {
    display: none;
  }
  .main-content-container {
    overflow-y: hidden;
    .main-content {
      margin: auto;
      width: 90%;
    }
  }

  @media screen and (min-width: ${sizes.tablet}) {
    display: flex;
    gap: ${pxToRem(40)};
    ${({ invert }: StyleProps) => invert && 'flex-direction: row-reverse;'}

    .logo {
      display: block;
      padding: ${pxToRem(32)} 0;
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
          invert ? '5%' : pxToRem(105)};
        position: relative;
        height: 100%;

        &__inner {
          /* width: 60%; */
          height: 100%;
          margin: initial;

          ${({ invert }: StyleProps) =>
            invert &&
            `display: flex;
          align-items: flex-end;
          justify-content: flex-end; 
          `}
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
      width: 40%;
      display: block;
      background-color: var(--color-primary-10);
      height: 100vh;
      position: fixed;
      ${({ hasImage }: StyleProps) =>
        !hasImage && `padding-top: ${pxToRem(160)};`}
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
