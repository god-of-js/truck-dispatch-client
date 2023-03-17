import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiIcon, { Icons } from 'ui/UiIcon';
import sizes from 'utils/sizes';
import TruckImage from '../../../assets/img/truck-image.jpeg';

export default function HeroSection() {
  return (
    <HeroSectionStyling>
      <div className="text-content">
        <div className="text-content-inner">
          <h2>
            The fastest, secure and most sustainable solution for road freight
            transport
          </h2>
          <p>
            Transport Management. Vetted and verified transporters. Goods
            Security. Goods Insurance. The best customer experience. Thanks to
            its powerful network of professional transporters, Truckdispatch
            makes road freight transport a swift, reliable, and sustainable
            experience.
          </p>
          <div className="btn-container">
            <Link to="/auth/join/agent">
              <UiButton isSquare variant="primary">
                Get Started <UiIcon icon="ArrowUpRight" />
              </UiButton>
            </Link>
            <Link to="/auth/join/transporter">
              <UiButton isSquare variant="secondary">
                I am a transporter
              </UiButton>
            </Link>
          </div>
        </div>
      </div>
      <div className="image-container">
        <img src={TruckImage} alt="Truckdispatch hero" loading="lazy" />
      </div>
    </HeroSectionStyling>
  );
}

const HeroSectionStyling = styled.section`
  color: var(--color-gray-900);
  padding-top: ${pxToRem(40)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pxToRem(40)};

  .text-content {
    height: 100%;
    display: flex;
    width: 100%;

    &-inner {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: ${pxToRem(40)};

      h2 {
        font-size: ${pxToRem(32)};
        font-family: 'thiccboi-extrabold';
        font-weight: normal;
        margin: 0;
      }
      p {
        color: var(--color-gray-500);
      }
      .btn-container {
        display: flex;
        gap: ${pxToRem(16)};
        margin-top: ${pxToRem(56)};
        width: 100%;

        button {
          gap: ${pxToRem(16)};
        }
      }
    }
  }

  .image-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    img {
      width: 90%;
      height: 100%;
    }
  }
  @media only screen and (min-width: ${sizes.tablet}) {
    height: 100vh;
    .text-content {
      width: 45%;
      padding-right: ${pxToRem(40)};
      display: flex;
      justify-content: flex-end;

      &-inner {
        width: 70%;
      }
    }
  }

  @media only screen and (min-width: ${sizes.tabletMidWidth}) {
    flex-direction: row;
    padding: 0;
    .text-content {
      width: 50%;
    }
    .image-container {
      width: 65%;
      padding: 0;
      img {
        width: 100%;
      }
    }
  }
`;
