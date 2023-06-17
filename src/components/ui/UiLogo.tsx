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
    font-size: 20px;
    font-weight: 700;
  }
`;
