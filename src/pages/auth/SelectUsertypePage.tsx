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
      icons: ['Car', 'Buildings'],
      title: 'Transport Company',
      text: 'Company with trucks',
      type: 'transportCompany',
    },
    {
      icons: ['UserSquare'],
      title: 'Shipper',
      text: 'Clients / individuals with jobs',
      type: 'shipper',
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
    font-size:16px;
  }
  h1 {
    font-weight: 600;
    font-size:32px;
    letter-spacing:-0.32px;
    line-height:36px;
    color: var(--color-neutralBlack);
    margin-top:26px;
    margin-bottom:32px;
  }
  .info-text {
    font-weight: 400;
    margin-bottom:24px;
  }
  button {
    margin-bottom:30px;
  }
  .bottom-container {
    padding-bottom:20px;
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
      font-size:42px;
      line-height:52px;
      margin-bottom:28px;
      width: 90%;
    }

    .info-text {
      font-size:20px;
      line-height:28px;
      width: 80%;
      margin-bottom:32px;
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
    gap:16px;
    background-color: var(--color-primary-10);
    height:30px;
    padding:4px 12px;
    border-radius:18px;
    p {
      font-size:14px;
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
  gap:12px;
  margin-bottom:60px;
  .user-card-container {
    padding:1px;
    height: fit-content;
    border-radius:8px;
    .user-card {
      border: 1px solid var(--color-gray);
      border-radius:8px;
      padding:12px;
      cursor: pointer;

      .icons-container {
        display: flex;
        gap:5px;
        margin-bottom:12px;
        svg {
          fill: var(--color-neutralBlack);
        }
      }

      h2 {
        color: var(--color-neutralBlack);
        font-size:16px;
        font-family: 'thiccboi-regular';
        font-weight: 600;
        margin-bottom:8px;
      }
      p {
        color: var(--color-gray-80);
        font-size:14px;
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
    gap: 16px;
    .user-card {
      padding:16px;
      h2 {
        font-size:18px;
        margin-bottom:12px;
      }
    }
  }
  @media (min-width: 950px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  @media (min-width: 1330px) {
    margin-bottom:48px;
    .user-card {
      h2 {
        font-size:18px;
      }
      p {
        font-size:14px;
      }
    }
  }
`;
