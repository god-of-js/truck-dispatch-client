import styled from 'styled-components';

const StyledAuthContent = styled.div`
  * {
    margin: 0;
  }
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
    max-width: ${pxToRem(450)};
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
  @media (min-width: 580px) {
    .form-container {
      width: 90%;
    }
  }
  @media (min-width: 700px) {
    .form-container {
      width: 80%;
      margin: 0 auto;
    }
  }
  @media (min-width: 900px) {
    .header-container {
      margin-bottom: ${pxToRem(48)};

      h1 {
        font-size: ${pxToRem(32)};
        margin-top: ${pxToRem(19)};
        margin-bottom: ${pxToRem(16)};
      }
      p {
        width: 80%;
        margin: 0 auto;
      }
    }
    .form-container {
      width: 100%;
      margin: 0 auto;
    }
  }
`;

export default StyledAuthContent;
