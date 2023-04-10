import { useState } from 'react';
import User from 'types/User';
import styled from "styled-components";
import { Link, useNavigate, useParams } from 'react-router-dom';

import UiButton from "ui/UiButton";
import UiIcon from "ui/UiIcon";

export default function  SelectUserType () {
  const [ userTypeRoute, setUserTypeRoute ]  = useState('');
  const [ isActive, setIsActive] = useState('');
  console.log(userTypeRoute);
  
  const navigate = useNavigate();
  
  const userTypeData = [
    {
      icons:[<UiIcon icon="Car"/>],
      title: 'Transporter',
      text: 'Individual truck owner or driver',
      type: 'transporter'
    },
    {
      icons:[<UiIcon icon="UserSquare"/>],
      title: 'Agent',
      text: 'Clients / individuals with jobs',
      type: 'agent'
    },
    {
      icons:[<UiIcon icon="Car"/>, <UiIcon icon="Buildings"/>],
      title: 'Transport Company',
      text: 'Company with trucks',
      type: 'transport_company'
    },
    {
      icons:[<UiIcon icon="UserSquare"/>, <UiIcon icon="Buildings"/>],
      title: 'Company',
      text: 'Company with jobs',
      type: 'company'
    },
  ]

  function selectUserType (type: string ) {
    setUserTypeRoute(type)
    setIsActive(type)
  }

  const UserTypeGrid = () => {
    return (
      <StyledUserTypeGrid>
      {
        userTypeData.map((data)=>(
          <div key={data.title}
            className={data.type === userTypeRoute ? `user-card active` : `user-card`}
            onClick={()=>{
              selectUserType(data.type)
            }}
            >
              <div className="icons-container">
                {data.icons.map((icon)=>(
                  icon
                ))}
              </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))
      }
      </StyledUserTypeGrid>
    )
  }

  return (
    <SelectUserTypeStyled> 
      <StyledTag>
        <p>Welcome to TruckDispatch</p>
        <UiIcon icon="MagicStar"/>
      </StyledTag>
      <h1 className="heading">
        Deliver and receive your cargo with ease
      </h1>
      <p className="info-text">To continue, choose a user type that best describes you, or what you do</p>
      <UserTypeGrid />
      <UiButton size="large" 
      isFullWidth 
      disabled={!userTypeRoute}
      onClick={()=> navigate(`/auth/join/${userTypeRoute}`)}>
        Get Started
      </UiButton >
      <p className="sign-in-container">
        Already have an account? <Link to="">Sign In</Link>
      </p>
    </SelectUserTypeStyled>
  )
};


const SelectUserTypeStyled = styled.section`
  * {
    margin: 0;
  }
  p {
    color: var(--color-gray-80);
    font-family:'thiccboi-regular';
  }
  .heading {
    font-weight: 600;
    font-size: ${pxToRem(32)};
    letter-spacing:${pxToRem(-0.32)};
    line-height: ${pxToRem(36)};
    margin-bottom:${pxToRem(48)};
    margin-top:${pxToRem(80)};
    color:var(--color-neutralBlack);
  }
  .info-text {
    font-weight: 400;
    margin-bottom:${pxToRem(24)};
  }
  button {
    margin-bottom:${pxToRem(26)};

  }

  @media(min-width: 530px) {
    .heading {
      width:80%;
    }
    .info-text {
      width: 85%;
    }
    button{
      margin-bottom: ${pxToRem(80)};
    }
  }
  @media(min-width: 950px) {
    button {
      width:45%;
    }
  }

  @media(min-width: 1330px) {
    .heading {
      font-size: ${pxToRem(48)};
      line-height: ${pxToRem(53.76)};
      margin-bottom:${pxToRem(48)};
      width:90%;
    }

    .info-text {
      font-size: ${pxToRem(20)};
      line-height: ${pxToRem(28)};
      width: 80%;
      margin-bottom:${pxToRem(32)};
    }
    button {
      width:35%;
      margin-bottom: ${pxToRem(134)};
    }
  }
`
const StyledTag = styled.span`
  display: none;
  @media(min-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${pxToRem(4)};
    background-color: var(--color-primary-10);
    height: ${pxToRem(30)};
    padding: ${pxToRem(4)} ${pxToRem(12)};
    margin-bottom:${pxToRem(26)};
    border-radius: ${pxToRem(16)};
    width: 50%;
    font-size: ${pxToRem(14)};
    font-weight: 400;
    font-family:'thiccboi-regular';
    letter-spacing:${pxToRem(-0.32)};
    color: var(--color-gray-90);
    span{
      fill:var(--color-primary);
    }
  }
  @media(min-width: 1000px) {
    width: 40%;
  }
  
  @media(min-width: 1330px) {
    gap: ${pxToRem(9)};
    font-size: ${pxToRem(16)};
  }
`
const StyledUserTypeGrid = styled.div`
  display: grid;
  gap: ${pxToRem(12)};
  margin-bottom: ${pxToRem(57)};
  .user-card{
    border: 1px solid var(--color-gray);
    border-radius: ${pxToRem(8)} ;
    padding: ${pxToRem(12)} ;
    cursor: pointer;
    transition: all 0.2s ease-in-out;


    .icons-container{
      display:flex;
      gap:${pxToRem(5)};
      margin-bottom:${pxToRem(12)};
      span {
        fill: var(--color-neutralBlack);
      }
    }

    h2 {
      color: var(--color-neutralBlack);
      font-size: ${pxToRem(16)};
      font-family:'thiccboi-regular';
      font-weight: 600;
      margin-bottom:${pxToRem(8)};
    }
    p {
      color: var(--color-gray-80);
      font-size: ${pxToRem(14)};
    }
    &:hover {
      border: 2px solid var(--color-primary);
      background-color:var(--color-primary-10);
      .icons-container {
        span {
          fill: var(--color-primary);
        }
      }
    }
  }
  .active {
      border: 2px solid var(--color-primary) ;
      background-color:var(--color-primary-10);
      .icons-container {
        span {
          fill: var(--color-primary);
        }
      }
  }
  @media(min-width: 800px) {
    gap: ${pxToRem(16)};
    .user-card {
      padding: ${pxToRem(16)};
      h2 {
        font-size: ${pxToRem(18)};
        margin-bottom: ${pxToRem(12)};
      }
    }
  }
  @media(min-width: 950px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  @media(min-width: 1330px) {
    margin-bottom: ${pxToRem(48)};
    .user-card{
      h2 {
        font-size: ${pxToRem(20)};
      }
      p {
        font-size: ${pxToRem(16)};
      }
    }
  }
`