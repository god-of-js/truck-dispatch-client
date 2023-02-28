import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import sizes from 'utils/sizes';
import TDLogo from '../../../assets/img/truck-dispatch-logo-with-text.svg';
export default function MarketingTopNav() {
  return (
    <TopNavStyle>
      <div className="top-nav-inner">
        <Link to="/">
          <img src={TDLogo} alt="Truckdispatch logo" width="250" />
        </Link>
        <div className="actions-container">
          <Link to="/auth/join/agent">
            <UiButton size="s" textCasing="capitalize" isSquare>
              Get Started
            </UiButton>
          </Link>
          <Link to="/auth/login">
            <UiButton
              size="s"
              textCasing="capitalize"
              isSquare
              variant="secondary"
            >
              Login
            </UiButton>
          </Link>
        </div>
      </div>
    </TopNavStyle>
  );
}

const TopNavStyle = styled.nav`
  width: 100%;
  height: ${pxToRem(60)};
  margin: auto;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: ${pxToRem(1)} solid var(--color-gray-100);
  background: white;
  z-index: 2;

  .top-nav-inner {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${pxToRem(40)};
    img {
      margin: ${pxToRem(-50)} ${pxToRem(-30)} ${pxToRem(-90)} ${pxToRem(-40)};
    }

    @media only screen and (min-width: ${sizes.tablet}) {
      width: 80%;
      padding: 0;

      .actions-container {
        display: flex;
        align-items: center;
        gap: ${pxToRem(12)};

        a {
          color: var(--color-gray-500);
          font-weight: normal;
          font-size: ${pxToRem(14)};
        }
      }
    }
  }
  .actions-container {
    display: none;
  }
`;
