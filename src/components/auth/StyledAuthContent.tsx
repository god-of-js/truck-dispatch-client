import styled from 'styled-components';
import sizes from 'utils/sizes';
interface Props {
  inverted?: boolean;
  children: React.ReactNode;
}

export default function StyledAuthContent({ children, inverted }: Props) {
  return <Styling inverted={inverted}>{children}</Styling>;
}

const Styling = styled.div`
  * {
    margin: 0;
  }
  padding-bottom: ${pxToRem(30)};
  header {
    text-align: center;
    margin-bottom: ${pxToRem(40)};
    span {
      fill: var(--color-neutralBlack);
    }
    h1 {
      color: var(--color-neutralBlack);
      font-size: ${pxToRem(24)};
      margin-top: ${pxToRem(20)};
      margin-bottom: ${pxToRem(12)};
    }
    p {
      font-weight: 400;
      color: var(--color-gray-80);
      font-family: 'thiccboi-regular';
      font-size: ${pxToRem(16)};
      line-height: ${pxToRem(24)};
    }
  }
  .form-container {
    width: 100%;
    margin: 0 auto;
    max-width: ${pxToRem(400)};
    button {
      margin-top: ${pxToRem(24)};
    }
    .select-with-optional-alert-container {
      display: flex;
      flex-direction: column;
      gap: ${pxToRem(8)};
    }
    &__inner {
      display: flex;
      flex-direction: column;
      gap: ${pxToRem(24)};
    }
  }
  @media (min-width: ${sizes.mobile}) {
    .form-container {
      width: 90%;
    }
  }
  @media (min-width: ${sizes.mobileLargeWidth}) {
    .form-container {
      width: 80%;
    }
  }
  @media (min-width: ${sizes.tablet}) {
    width: 60%;
    margin-left: ${({ inverted }: { inverted?: boolean }) =>
      inverted ? '' : 'auto'};
    header {
      margin-bottom: ${pxToRem(48)};

      h1 {
        font-size: ${pxToRem(32)};
        margin-top: ${pxToRem(19)};
        margin-bottom: ${pxToRem(16)};
      }
    }
    .form-container {
      width: 100%;
      margin: 0 auto;
    }
  }
  /* @media (min-width: ${sizes.tabletLargeWidth}) {
    padding-bottom: ${pxToRem(50)};
    .form-container {
      width: 50%;
    }
  } */
`;
