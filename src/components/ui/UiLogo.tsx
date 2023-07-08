import styled from 'styled-components';
import AppLogo from './AppLogo';

export default function UiLogo() {
  return (
    <StyledLogo>
      <a href="https://gettruckdispatch.com">
        <AppLogo />
        <span>TruckDispatch</span>
      </a>
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: ${pxToRem(8)};
    color: var(--color-neutralBlack);
    font-size: ${pxToRem(20)};
    font-weight: 700;
  }
`;
