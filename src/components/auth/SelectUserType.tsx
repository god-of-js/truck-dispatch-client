import UiButton from "ui/UiButton";
import UiIcon from "ui/UiIcon";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function  SelectUserType () {

  const userTypeData = [
    {
      icons:[<UiIcon icon="Car"/>],
      title: 'Transporter',
      text: 'Individual truck owner or driver',
    },
    {
      icons:[<UiIcon icon="UserSquare"/>],
      title: 'Agent',
      text: 'Clients / individuals with jobs',
    },
    {
      icons:[<UiIcon icon="Car"/>, <UiIcon icon="Buildings"/>],
      title: 'Transport Company',
      text: 'Company with trucks',
    },
    {
      icons:[<UiIcon icon="UserSquare"/>, <UiIcon icon="Buildings"/>],
      title: 'Company',
      text: 'Company with jobs',
    },
  ]

  const UserTypeGrid = () => {
    return (
      <StyledUserTypeGrid>
      {
        userTypeData.map((data)=>(
          <div key={data.title} className="user-card">
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
      <UiButton size="large" isFullWidth disabled>
        Get Started
      </UiButton>
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
  }
  .heading {
    font-size: ${pxToRem(48)};
    color:var(--color-neutralBlack);
    font-weight: 600;
    letter-spacing:${pxToRem(-0.32)};
    line-height: ${pxToRem(53.76)};
    margin-bottom:${pxToRem(48)};
    width:90%;
  }

  .info-text {
    font-size: ${pxToRem(20)};
    font-weight: 400;
    line-height: ${pxToRem(28)};
    width: 80%;
    margin-bottom:${pxToRem(32)};
  }
  button {
    width:35%;
  }
`
const StyledTag = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${pxToRem(9.34)};
  background-color: var(--color-primary-10);
  height: ${pxToRem(30)};
  padding: ${pxToRem(4)} ${pxToRem(12)};
  margin-bottom:${pxToRem(26)};
  border-radius: ${pxToRem(16)};
  width: 45%;
  font-size: ${pxToRem(16)};
  font-weight: 400;
  letter-spacing:${pxToRem(-0.32)};
  color: var(--color-gray-90);

  span{
    fill:var(--color-primary);
  }
`
const StyledUserTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: ${pxToRem(16)};
  margin-bottom: ${pxToRem(48)};
  .user-card{
    border: 1px solid var(--color-gray);
    border-radius: ${pxToRem(8)} ;
    padding: ${pxToRem(16)} ;
    display:flex;
    flex-direction:column;
    gap:${pxToRem(12)};
    .icons-container{
      display:flex;
      gap:${pxToRem(5)};
    }
    span {
    fill: var(--color-neutralBlack);
    }
    h2 {
      color: var(--color-neutralBlack);
      font-size: ${pxToRem(20)};
      font-weight: 600;
    }
    p {
      color: var(--color-gray-80);
    }
    &:hover {
      border: 2px solid var(--color-primary);
      background-color:var(--color-primary-10);
      span {
        fill: var(--color-primary);
      }
    }
  }
`