import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';
import styled from 'styled-components';
import UiIcon, { Icons } from 'ui/UiIcon';
import UiButton from 'ui/UiButton';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import sizes from 'utils/sizes';

export default function SelectUsertypePage() {
  const [userTypeRoute, setUserTypeRoute] = useState('');

  const navigate = useNavigate();
  interface UserType {
    icons: Icons[];
    title: string;
    text: string;
    type: string;
  }
  const userTypeData: UserType[] = [
    {
      icons: ['Car'],
      title: 'Transporter',
      text: 'Individual truck owner or driver',
      type: 'transporter',
    },
    {
      icons: ['UserSquare'],
      title: 'Shipper',
      text: 'Clients / individuals with jobs',
      type: 'shipper',
    },
    {
      icons: ['Car', 'Buildings'],
      title: 'Transport Company',
      text: 'Company with trucks',
      type: 'transportCompany',
    },
    {
      icons: ['UserSquare', 'Buildings'],
      title: 'Company',
      text: 'Company with jobs',
      type: 'company',
    },
  ];

  function selectUserType(type: string) {
    setUserTypeRoute(type);
  }

  return (
    <AuthLayoutStyling invert img>
      <SelectUserTypeStyling>
        <WelcomeMessageTag>
          <p>Welcome to TruckDispatch</p>
          <UiIcon icon="MagicStar" />
        </WelcomeMessageTag>
        <header>
          <h1>Deliver and receive your cargo with ease</h1>
          <p className="info-text">
            To continue, choose a user type that best describes you, or what you
            do
          </p>
        </header>

        <StyledUserTypeGrid>
          {userTypeData.map((userType) => (
            <div
              className={`user-card-container ${
                userType.type === userTypeRoute ? 'active' : ''
              }`}
              key={userType.title}
            >
              <div
                key={userType.title}
                className={`user-card ${
                  userType.type === userTypeRoute && 'active'
                } `}
                onClick={() => {
                  selectUserType(userType.type);
                }}
              >
                <div className="icons-container">
                  {userType.icons.map((icon) => (
                    <UiIcon key={icon} icon={icon} size="17" />
                  ))}
                </div>
                <h2>{userType.title}</h2>
                <p>{userType.text}</p>
              </div>
            </div>
          ))}
        </StyledUserTypeGrid>

        <UiButton
          size="large"
          isFullWidth
          disabled={!userTypeRoute}
          onClick={() => navigate(`/auth/join/${userTypeRoute}`)}
        >
          Get Started
        </UiButton>
        <p className="bottom-container">
          Already have an account? <Link to="/auth/login">Sign In</Link>
        </p>
      </SelectUserTypeStyling>
    </AuthLayoutStyling>
  );
}

const SelectUserTypeStyling = styled.div`
  * {
    margin: 0;
  }
  height: 100%;
  position: relative;
  width: 100%;
  p {
    color: var(--color-gray-80);
    font-family: 'thiccboi-regular';
    font-size: ${pxToRem(16)};
  }
  h1 {
    font-weight: 600;
    font-size: ${pxToRem(32)};
    letter-spacing: ${pxToRem(-0.32)};
    line-height: ${pxToRem(36)};
    color: var(--color-neutralBlack);
    margin-top: ${pxToRem(26)};
    margin-bottom: ${pxToRem(32)};
  }
  .info-text {
    font-weight: 400;
    margin-bottom: ${pxToRem(24)};
  }
  button {
    margin-bottom: ${pxToRem(30)};
  }
  .bottom-container {
    padding-bottom:${pxToRem(20)} ;
  }

  @media (min-width: ${sizes.mobile}) {
    h1 {
      width: 80%;
    }
    .info-text {
      width: 85%;
    }
  }
  @media (min-width: ${sizes.tablet}) {
    width: 70%;
    button {
      width: 45%;
    }
  }

  @media (min-width: ${sizes.laptopWidth}) {
    width: 65%;
    h1 {
      font-size: ${pxToRem(42)};
      line-height: ${pxToRem(52)};
      margin-bottom: ${pxToRem(28)};
      width: 90%;
    }

    .info-text {
      font-size: ${pxToRem(20)};
      line-height: ${pxToRem(28)};
      width: 80%;
      margin-bottom: ${pxToRem(32)};
    }
    button {
      width: 35%;
    }
  }
`;

const WelcomeMessageTag = styled.span`
  display: none;
  width: fit-content;

  svg {
    fill: var(--color-primary);
  }
  @media (min-width: ${sizes.tablet}) {
    display: flex;
    align-items: center;
    gap: ${pxToRem(16)};
    background-color: var(--color-primary-10);
    height: ${pxToRem(30)};
    padding: ${pxToRem(4)} ${pxToRem(12)};
    border-radius: ${pxToRem(18)};
    p {
      font-size: ${pxToRem(14)};
      font-weight: 400;
      font-family: 'thiccboi-regular';
      color: var(--color-gray-90);
    }
    span {
      fill: var(--color-primary);
    }
  }
`;

const cardActiveState = `
  border-color: var(--color-primary);
  background-color: var(--color-primary-10);
  .icons-container {
    svg {
      fill: var(--color-primary);
    }
  }
`;

const StyledUserTypeGrid = styled.div`
  display: grid;
  gap: ${pxToRem(12)};
  margin-bottom: ${pxToRem(60)};
  .user-card-container {
    padding: ${pxToRem(1)};
    height: fit-content;
    border-radius: ${pxToRem(8)};
    .user-card {
      border: 1px solid var(--color-gray);
      border-radius: ${pxToRem(8)};
      padding: ${pxToRem(12)};
      cursor: pointer;

      .icons-container {
        display: flex;
        gap: ${pxToRem(5)};
        margin-bottom: ${pxToRem(12)};
        svg {
          fill: var(--color-neutralBlack);
        }
      }

      h2 {
        color: var(--color-neutralBlack);
        font-size: ${pxToRem(16)};
        font-family: 'thiccboi-regular';
        font-weight: 600;
        margin-bottom: ${pxToRem(8)};
      }
      p {
        color: var(--color-gray-80);
        font-size: ${pxToRem(14)};
      }
    }
    &:hover {
      background: var(--color-primary);
      .user-card {
        ${cardActiveState}
      }
    }
    &.active {
      background: var(--color-primary);
      .user-card {
        ${cardActiveState}
      }
    }
  }

  @media (min-width: 800px) {
    gap: ${pxToRem(16)};
    .user-card {
      padding: ${pxToRem(16)};
      h2 {
        font-size: ${pxToRem(18)};
        margin-bottom: ${pxToRem(12)};
      }
    }
  }
  @media (min-width: 950px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  @media (min-width: 1330px) {
    margin-bottom: ${pxToRem(48)};
    .user-card {
      h2 {
        font-size: ${pxToRem(18)};
      }
      p {
        font-size: ${pxToRem(14)};
      }
    }
  }
`;
