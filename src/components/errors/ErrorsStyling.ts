import styled from 'styled-components';

export const ErrorStyling = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-weight: 900;
    font-size: ${pxToRem(32)};
    line-height: ${pxToRem(37)};
  }

  p {
    font-weight: 700;
    font-size: ${pxToRem(24)};
    line-height: ${pxToRem(28)};
  }

  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
