import React, { Suspense } from 'react';
import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import sizes from '../utils/sizes';
import TransporterImage from '../assets/img/truck-image.jpeg';
import AgentImage from '../assets/img/agent-mono-effect.jpg';
import TruckDispatchLogo from '../assets/img/truck-dispatch-full-logo.svg';
import Loader from 'components/layout/Loader';

export default function AuthLayout() {
  const { userType } = useParams();
  const isTransporter = userType === 'transporter';
  const layoutTitle = isTransporter
    ? 'Take the road to prosperity'
    : "Customer's first Always";
  const layoutText = isTransporter
    ? 'Get access to the most profitable orders, steepest discounts, and fastest payments in Nigeria.'
    : 'We provide you with the most competitive rates, verified drivers, and best deals. Become part of our success story d profit from a wide range of advantages';

  return (
    <>
      <Header>
        <img
          src={TruckDispatchLogo}
          alt="truck-dispatch"
          width="100"
          height="100"
        />
        <ButtonContainer>
          <Link
            className={`route ${!isTransporter && 'isActive'}`}
            to="/auth/join/agent"
          >
            For Agent
          </Link>
          <Link
            className={`route ${isTransporter && 'isActive'}`}
            to="/auth/join/transporter"
          >
            For Transporter
          </Link>
        </ButtonContainer>
      </Header>
      <Layout>
        <ImageContainer isTransporter={isTransporter}>
          <div>
            <h2>{layoutTitle}</h2>
            <p>{layoutText}</p>
          </div>
        </ImageContainer>
        <FormContainer>
          <div className="form-container-inner">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </FormContainer>
      </Layout>
    </>
  );
}

const Header = styled.header`
  padding: 0 ${pxToRem(16)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
  left: 0;
  right: 0;
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    position: absolute;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(16)};
  .route {
    text-transform: uppercase;
    font-size: ${pxToRem(14)};
    color: var(--color-gray-500);
    padding: ${pxToRem(8)} ${pxToRem(4)};
    border-bottom: 1px solid transparent;

    &:hover {
      color: var(--color-gray-500);
    }
    &.isActive {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
`;

const Layout = styled.div`
  display: flex;
  gap: ${pxToRem(12)};
  overflow: auto;
  height: 100vh;
  width: 100%;
  position: relative;
`;

const ImageContainer = styled.div`
  display: none;
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    display: block;
    height: 100%;
    width: 65%;
    background-image: url(${({ isTransporter }: { isTransporter: boolean }) =>
    isTransporter ? TransporterImage : AgentImage});
    background-size: cover;
    background-position: center;

    div {
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      h2 {
        font-family: 'thiccboi-extrabold';
        text-transform: uppercase;
        color: #fff;
        font-size: ${pxToRem(44)};
        width: 70%;
        margin-bottom: 0;
      }
      p {
        width: 70%;
        font-family: 'Audiowide';
        color: #fff;
        font-weight: 800;
        font-size: ${pxToRem(20)};
      }
    }
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 60%;
    div {
      h2 {
        font-size: ${pxToRem(44)};
        width: 50%;
      }
      p {
        width: 50%;
        font-weight: 800;
        font-size: ${pxToRem(20)};
      }
    }
  }
`;

const FormContainer = styled.div`
  width: 100%;
  padding: ${pxToRem(24)};

  img {
    display: block;
  }

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 35%;

    img {
      display: none;
    }

    .form-container-inner {
      width: 80%;
      height: 100%;
      display: flex;
      align-items: center;
      margin: auto;
    }
  }

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 40%;
  }
`;
