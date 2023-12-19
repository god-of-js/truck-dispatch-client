import styled from 'styled-components';
import sizes from 'utils/sizes';
interface Props {
  /** The inverted prop means the form is on the left instead of on the right which is the normal flow. */
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
  height: 100%;
  padding-bottom: ${pxToRem(30)};
  header {
    ${({ inverted }: { inverted?: boolean }) =>
      !inverted && `text-align: center;`};
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
    height: 100%;
    margin: auto;
    position: relative;
    ${({ inverted }: { inverted?: boolean }) =>
      inverted ? '' : 'margin: 0 auto'};
    max-width: ${pxToRem(400)};
    button {
      margin-top: ${pxToRem(24)};
    }
    .no-btn-margin-top {
      button {
        margin-top: 0;
      }
    }
    .sm-btn-margin-top {
      button {
        margin-top: ${pxToRem(12)};
      }
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

    .duo-button-container {
      display: flex;
      flex-direction: column;
      margin-top: ${pxToRem(24)};
      gap: ${pxToRem(12)};
    }
    .bottom-actions {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: ${pxToRem(12)};
      width: 100%;
      bottom: 0;
      left: 0;

      p {
        height: ${pxToRem(46)};
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${pxToRem(4)};
      }
    }

    .hidden-in-mobile,
    #hidden-in-mobile {
      display: none;
    }

    .visible-in-mobile {
      display: block;
    }
  }

  @media screen and (max-height: ${pxToRem(690)}) {
    .form-container {
      .bottom-actions {
        position: relative;
      }
    }
  }

  @media screen and (min-width: ${sizes.mobile}) {
    .form-container {
      width: 90%;
      .hidden-in-mobile,
      #hidden-in-mobile {
        display: block;
      }
      .visible-in-mobile {
        display: none;
      }
      .duo-button-container {
        flex-direction: row;
      }
      .bottom-actions {
        p {
          justify-content: flex-start;
        }
      }
    }
  }

  .center-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  @media screen and (min-width: ${sizes.tablet}) {
    .form-container {
      margin: inherit;
    }
  }
  @media (min-width: ${sizes.mobileLargeWidth}) {
    .form-container {
      width: 80%;
    }
  }
  @media (min-width: ${sizes.tablet}) {
    width: ${({ inverted }: { inverted?: boolean }) =>
      inverted ? '100%' : '60%'};
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
      ${({ inverted }: { inverted?: boolean }) =>
        inverted ? '' : 'margin: 0 auto'};
    }
  }
  @media (min-width: ${sizes.tabletLargeWidth}) {
    padding-bottom: ${pxToRem(50)};
    .form-container {
      width: ${({ inverted }: { inverted?: boolean }) =>
        inverted ? '100%' : '50%'};
    }
  }
`;
