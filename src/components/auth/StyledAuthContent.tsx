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
  padding-bottom:30px;
  header {
    ${({ inverted }: { inverted?: boolean }) =>
      !inverted && `text-align: center;`};
    margin-bottom:40px;
    span {
      fill: var(--color-neutralBlack);
    }
    h1 {
      color: var(--color-neutralBlack);
      font-size:24px;
      margin-top:20px;
      margin-bottom:12px;
    }
    p {
      font-weight: 400;
      color: var(--color-gray-80);
      font-family: 'thiccboi-regular';
      font-size: 16px;
      line-height:24px;
    }
  }
  .form-container {
    width: 100%;
    height: 100%;
    margin: auto;
    position: relative;
    ${({ inverted }: { inverted?: boolean }) =>
      inverted ? '' : 'margin: 0 auto'};
    max-width:400px;
    button {
      margin-top:24px;
    }
    .no-btn-margin-top {
      button {
        margin-top: 0;
      }
    }
    .select-with-optional-alert-container {
      display: flex;
      flex-direction: column;
      gap:8px;
    }
    &__inner {
      display: flex;
      flex-direction: column;
      gap:24px;
    }

    .duo-button-container {
      display: flex;
      flex-direction: column;
      margin-top:24px;
      gap:12px;
    }
    .bottom-actions {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap:12px;

      width: 100%;
      bottom: 0;
      left: 0;

      p {
        height:46px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap:4px;
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
      margin-bottom: 48px;

      h1 {
        font-size:32px;
        margin-top: 19px;
        margin-bottom:16px;
      }
    }
    .form-container {
      width: 100%;
      ${({ inverted }: { inverted?: boolean }) =>
        inverted ? '' : 'margin: 0 auto'};
    }
  }
  @media (min-width: ${sizes.tabletLargeWidth}) {
    padding-bottom:50px;
    .form-container {
      width: ${({ inverted }: { inverted?: boolean }) =>
        inverted ? '100%' : '50%'};
    }
  }
`;
