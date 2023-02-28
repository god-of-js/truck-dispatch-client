import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiIcon from 'ui/UiIcon';
import sizes from 'utils/sizes';
import AgentWithTrailer from '../../../assets/img/agent-with-trailer.jpeg';

interface ListObj {
  title: string;
  subtitle: string;
}

export default function PersonalInteraction() {
  const list: ListObj[] = [
    {
      title: 'Market Expertise',
      subtitle:
        'Our organization comprises of seasoned transporters to take care of your business.',
    },
    {
      title: 'Personal Contact',
      subtitle:
        'Customer support and various means of communication available to take care of your professional needs.',
    },
    {
      title: 'Operational Excellence',
      subtitle: 'Long-term partnerships with vetted transporters.',
    },
  ];

  return (
    <PersonalInteractionStyling>
      <div className="text-content">
        <h3>Logistics is a people's business</h3>
        <p>We are convinced the best value is created by personal touch.</p>
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <div className="icon-container">
                <UiIcon icon="Checks" size="24" />
              </div>
              <div className="list-text-content">
                <div className="list-text-content__title">{item.title}</div>
                <div className="list-text-content__subtitle">
                  {item.subtitle}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/auth/join/agent">
          <UiButton isSquare variant="dark">
            Get Started <UiIcon icon="ArrowUpRight" />
          </UiButton>
        </Link>
      </div>
      <div className="img-container">
        <img src={AgentWithTrailer} alt="Truck dispatch agent" />
      </div>
    </PersonalInteractionStyling>
  );
}

const PersonalInteractionStyling = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: ${pxToRem(16)};
  padding: ${pxToRem(80)} 0 ${pxToRem(160)} 0;
  width: 90%;
  margin: auto;

  .text-content {
    width: 100%;

    h3 {
      font-size: ${pxToRem(36)};
      margin: 0;
      color: var(--color-gray-700);
    }
    p {
      font-size: ${pxToRem(20)};
      color: var(--color-gray-500);
    }
    ul {
      padding: 0;
      margin: 0 0 ${pxToRem(60)} 0;
      list-style-type: none;

      li {
        display: flex;
        align-items: center;
        gap: ${pxToRem(16)};
        margin: ${pxToRem(16)} 0;

        .icon-container {
          padding: ${pxToRem(16)};
          background: var(--color-gray-100);
          color: var(--color-gray-500);
          border-radius: 50%;
          width: ${pxToRem(16)};
          height: ${pxToRem(16)};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }
        .list-text-content {
          &__title {
            font-size: ${pxToRem(16)};
            font-weight: bold;
            padding: ${pxToRem(12)} 0;
          }
        }
      }
    }
    button {
      display: flex;
      gap: ${pxToRem(16)};
    }
  }

  .img-container {
    width: 100%;
    padding-top: ${pxToRem(42)};
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  @media only screen and (max-width: ${sizes.mobile}) {
    .text-content {
    }
  }

  @media only screen and (min-width: ${sizes.tabletMidWidth}) {
    flex-direction: row;
    width: 80%;

    .text-content {
      width: 35%;
      h3 {
        font-size: ${pxToRem(48)};
      }
    }
    .img-container {
      width: 55%;
    }
  }
`;
