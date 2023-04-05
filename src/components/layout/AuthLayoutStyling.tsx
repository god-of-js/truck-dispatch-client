import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  infoContent?: React.ReactNode;
  invert?: boolean;
}
export default function AuthLayoutStyling({
  children,
  infoContent,
  invert,
}: Props) {
  return (
    <LayoutStyling invert={invert}>
      <div className="info-content">
        <div className="info-content__inner">
        {
          !invert || undefined  && <div className="logo">
            <a href="https://gettruckdispatch.com">
              TruckDispatch
            </a>
          </div>
        }
          {infoContent}
        </div>
      </div>
      <div className="main-content">
        <div className="main-content__inner">
        {
          invert && <div className="logo">
            <a href="https://gettruckdispatch.com">
              TruckDispatch
            </a>
          </div>
        }
          {children}
        </div>
      </div>
    </LayoutStyling>
  );
}

const LayoutStyling = styled.div`
  display: flex;
  ${({ invert }: { invert?: boolean }) =>
    invert && 'flex-direction: row-reverse;'}
  min-height: 100vh;
  .logo{
    margin-bottom:${pxToRem(114)};
    a {
      color: var(--color-neutralBlack);
      font-size:${pxToRem(20)};
      font-weight:700;
    }
    
  }
  .main-content {
    ${({ invert }: { invert?: boolean }) =>  
      !invert  && `
      display: flex; 
      justify-content: center; 
      align-items: center;
      `
    }
    width: 57%;
    padding:${pxToRem(34)} 0 ${pxToRem(80)} ${pxToRem(121)};
    /* display: flex;
    justify-content: center;
    align-items: center; */
    &__inner {
      width: 80%;
    }
  }
  .info-content {
    width: 43%;
    background: var(--color-primary-10);
    &__inner {
      width: 40%;
    }
  }
`;
