import styled from 'styled-components';
import SignUpImage from '../../assets/img/sign up image.png';
import UiLogo from 'ui/UiLogo';
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
    <LayoutStyling invert={invert}>
      <div className="info-content">
        <div className="info-content__inner container">
          {!invert && (
            <div className="logo">
              <UiLogo />
            </div>
          )}
          {img && <img src={SignUpImage} alt="" />}
          {infoContent}
        </div>
      </div>
      <div className="main-content">
        <div className="main-content__inner container">
          {invert && (
            <div className="logo">
              <UiLogo />
            </div>
          )}
          {children}
        </div>
      </div>
    </LayoutStyling>
  );
}

const LayoutStyling = styled.div`
  .logo {
    display: none;
  }
  .info-content {
    display: none;
  }
  .main-content {
    padding: ${pxToRem(16)};
  }

  @media (min-width: 600px) {
    .main-content {
      padding: ${pxToRem(24)};
    }
  }
  @media (min-width: 900px) {
    display: flex;
    ${({ invert }: { invert?: boolean }) =>
      invert && 'flex-direction: row-reverse;'}
    min-height: 100vh;
    .logo {
      display: block;
      margin-bottom: ${pxToRem(70)};
    }
    .info-content {
      display: block;

      ${({ invert }: { invert?: boolean }) =>
        invert ? 'width: 43%;' : 'width: 30%;'};
      ${({ invert }: { invert?: boolean }) =>
        !invert &&
        `
          padding:${pxToRem(34)} 0 ${pxToRem(80)} ${pxToRem(40)};
        `}
      background: var(--color-primary-10);
      &__inner {
        height: 100%;
        img {
          max-width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .main-content {
      ${({ invert }: { invert?: boolean }) =>
        !invert &&
        `
        display: flex; 
        justify-content: center; 
        align-items: center;
        `}
      padding:${pxToRem(34)} 0 ${pxToRem(80)} ${pxToRem(80)};
      width: 57%;
      &__inner {
        ${({ invert }: { invert?: boolean }) =>
          invert ? `width: 90%;` : `width: 60%;`}
      }
    }
  }
  @media (min-width: 1330px) {
    .container {
      max-width: 700px;
    }
    .logo {
      display: block;
      margin-bottom: ${pxToRem(114)};
    }
    .main-content {
      padding: ${pxToRem(34)} 0 ${pxToRem(80)} ${pxToRem(121)};

      ${({ invert }: { invert?: boolean }) =>
        !invert &&
        ` padding-top:${pxToRem(100)};
          padding-bottom:${pxToRem(100)};
        `}
      /* display: flex;
    justify-content: center;
    align-items: center; */
    &__inner {
        ${({ invert }: { invert?: boolean }) =>
          invert ? `width: 80%;` : `width: 60%;`}
      }
    }
  }
  @media (min-width: 1650px) {
    justify-content: center;
    gap: ${pxToRem(50)};

    .info-content {
      width: 100%;
    }
    .main-content {
      width: 100%;
      display: flex;
      ${({ invert }: { invert?: boolean }) =>
        !invert ? `justify-content: flex-start;` : `justify-content: center;`}
      align-items: center;
      &__inner {
        ${({ invert }: { invert?: boolean }) =>
          invert &&
          `
        margin-left: auto
        `}
      }
    }
  }
`;
