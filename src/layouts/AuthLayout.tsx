import React from 'react';
import styled from 'styled-components';
import sizes from '../sizes';
import TransporterImage from '../assets/img/truck-image.jpeg';
import TruckDispatchLogo from '../assets/img/truck-dispatch-full-logo.svg';
interface Props {
  children: React.ReactNode;
  type?: 'transporter' | 'agent';
}

export default function AuthLayout({ children, type = 'transporter' }: Props) {
  const layoutTitle =
    type === 'transporter' ? 'Take the road to prosperity' : '';
  const layoutText =
    type === 'transporter'
      ? 'Get access to the most profitable orders, steepest discounts, and fastest payments in Nigeria.'
      : '';
  return (
    <Layout>
      <ImageContainer>
        <img src={TruckDispatchLogo} alt="" width="150" />
        <div>
          <h2>{layoutTitle}</h2>
          <p>{layoutText}</p>
        </div>
      </ImageContainer>
      <FormContainer>
        <img src={TruckDispatchLogo} alt="" width="150" />
        <div className="form-container-inner">{children}</div>
      </FormContainer>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  gap: 12px;
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
    background-image: url(${TransporterImage});
    background-size: cover;

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
        font-size: 44px;
        width: 70%;
        margin-bottom: 0px;
      }
      p {
        width: 70%;
        font-family: 'Audiowide';
        color: #fff;
        font-weight: 800;
        font-size: 20px;
      }
    }
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 60%;
    div {
      h2 {
        font-size: 44px;
        width: 50%;
      }
      p {
        width: 50%;
        font-weight: 800;
        font-size: 20px;
      }
    }
  }
`;

const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 24px;

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
