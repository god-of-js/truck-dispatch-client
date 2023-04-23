import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';
import styled from 'styled-components';
import UiIcon from 'ui/UiIcon';
import UiButton from 'ui/UiButton';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import sizes from 'utils/sizes';

export default function SelectUsertypePage() {
  const [userTypeRoute, setUserTypeRoute] = useState('');

  const navigate = useNavigate();

  const userTypeData = [
    {
      icons: [<UiIcon icon="Car" size="17" />],
      title: 'Transporter',
      text: 'Individual truck owner or driver',
      type: 'transporter',
    },
    {
      icons: [<UiIcon icon="UserSquare" size="17" />],
      title: 'Agent',
      text: 'Clients / individuals with jobs',
      type: 'agent',
    },
    {
      icons: [
        <UiIcon icon="Car" size="17" />,
        <UiIcon icon="Buildings" size="17" />,
      ],
      title: 'Transport Company',
      text: 'Company with trucks',
      type: 'transport_company',
    },
    {
      icons: [
        <UiIcon icon="UserSquare" size="17" />,
        <UiIcon icon="Buildings" size="17" />,
      ],
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
      <SelectUserTypeStyled>
        <StyledTag>
          <p>Welcome to TruckDispatch</p>
          <UiIcon icon="MagicStar" />
        </StyledTag>
        <h1>Deliver and receive your cargo with ease</h1>
        <p className="info-text">
          To continue, choose a user type that best describes you, or what you
          do
        </p>

        <StyledUserTypeGrid>
          {userTypeData.map((data) => (
            <div
              key={data.title}
              className={`user-card ${
                data.type === userTypeRoute && 'active'
              } `}
              onClick={() => {
                selectUserType(data.type);
              }}
            >
              <div className="icons-container">
                {data.icons.map((icon) => icon)}
              </div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
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
        <p>
          Already have an account? <Link to="/auth/login">Sign In</Link>
        </p>
      </SelectUserTypeStyled>
    </AuthLayoutStyling>
  );
}

const SelectUserTypeStyled = styled.section`
  * {
    margin: 0;
  }
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
    margin-bottom: ${pxToRem(80)};
  }

  @media (min-width: 530px) {
    h1 {
      width: 80%;
    }
    .info-text {
      width: 85%;
    }
  }
  @media (min-width: 950px) {
    width: 70%;
    button {
      width: 45%;
    }
  }

  @media (min-width: 1330px) {
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

const StyledTag = styled.span`
  display: none;
  width: fit-content;
  @media (min-width: ${sizes.tablet}) {
    display: flex;
    align-items: center;
    gap: ${pxToRem(8)};
    background-color: var(--color-primary-10);
    height: ${pxToRem(30)};
    padding: ${pxToRem(4)} ${pxToRem(12)};
    border-radius: ${pxToRem(18)};
    font-size: ${pxToRem(14)};
    font-weight: 400;
    font-family: 'thiccboi-regular';
    color: var(--color-gray-90);
    span {
      fill: var(--color-primary);
    }
  }
`;

const cardActiveState = `
border: ${pxToRem(2)} solid var(--color-primary);
background-color: var(--color-primary-10);
.icons-container {
  span {
    fill: var(--color-primary);
  }
}`;

const StyledUserTypeGrid = styled.div`
  display: grid;
  gap: ${pxToRem(12)};
  margin-bottom: ${pxToRem(60)};
  .user-card {
    border: 1px solid var(--color-gray);
    border-radius: ${pxToRem(8)};
    padding: ${pxToRem(12)};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .icons-container {
      display: flex;
      gap: ${pxToRem(5)};
      margin-bottom: ${pxToRem(12)};
      span {
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

    &:hover {
      ${cardActiveState}
    }
    &.active {
      ${cardActiveState}
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
