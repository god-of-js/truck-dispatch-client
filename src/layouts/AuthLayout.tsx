import React, { Suspense } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';

import UserType from '../types/UserType';

import sizes from '../utils/sizes';
import TransporterImage from '../assets/img/truck-image.jpeg';
import AgentImage from '../assets/img/agent-mono-effect.jpg';
import TruckDispatchLogo from '../assets/img/truck-dispatch-full-logo.svg';

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
    <Layout>
      <ImageContainer isTransporter={isTransporter}>
        <img src={TruckDispatchLogo} alt="" width="150" />
        <div>
          <h2>{layoutTitle}</h2>
          <p>{layoutText}</p>
        </div>
      </ImageContainer>
      <FormContainer>
        <img src={TruckDispatchLogo} alt="" width="150" />
        <div className="form-container-inner">
          <Suspense fallback={<span>Loading....</span>}>
            <Outlet />
          </Suspense>
        </div>
      </FormContainer>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  gap: ${pxToRem(12)};
  overflow: hidden;
  height: 100vh;
  width: 100%;
  position: absolute;
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
  height: 100%;
  width: 100%;
  padding: ${pxToRem(24)};
  overflow-y: auto;

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
