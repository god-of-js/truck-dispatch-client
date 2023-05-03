import styled from 'styled-components';
export default function UiLogo() {
  return (
    <StyledLogo>
      <a href="https://gettruckdispatch.com">TruckDispatch</a>
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  a {
    color: var(--color-neutralBlack);
    font-size: ${pxToRem(20)};
    font-weight: 700;
  }
`;
