import { lazy } from "react";
import styled from "styled-components";
import { GetHelpScenario } from "./GetHelp";
import { useSelector } from 'react-redux';
import { RootState } from "modules/index";
import { clientBasedUserTypes, serviceBasedUserTypes } from 'utils/constants';
import { GetHelpShipperScenarioData, GetHelpTransporterScenarioData } from "utils/constants";
import sizes from "utils/sizes";
const UiIcon = lazy(() => import('../ui/UiIcon'));


interface Props {
  selectScenario: (scenario: GetHelpScenario) => void;
  openOtherIssuesModal: () => void;
}

export default function GetHelpScenarioList ({ selectScenario, openOtherIssuesModal }: Props) {
    const user = useSelector((state: RootState) => state.account.user);
    
    const GetHelpData = clientBasedUserTypes.includes(user?.userType!) ? GetHelpShipperScenarioData : GetHelpTransporterScenarioData

  return (
    <ScenariosContainer>
      <header> 
      <h2>Trip Issues</h2>
      <p>Select common trip-related issues and get in touch with our support team</p>
      </header>
      <ScenarioList>
      {GetHelpData.map((scenario)=>(
        <li key={scenario.Title} onClick={()=> selectScenario(scenario)}><p>{scenario.Title}</p> <UiIcon icon='CaretRight'/></li>
      ))}
      <li onClick={openOtherIssuesModal}>
        <p>Other 😐</p>
        <UiIcon icon='CaretRight'/>
      </li>
    </ScenarioList>
  </ScenariosContainer>
  )
}

const ScenariosContainer = styled.div`
  header {
    margin-bottom: ${pxToRem(33)};
    h2 {
      color: var( --color-neutralBlack);
      font-size: ${pxToRem(24)};
      font-style: normal;
      font-weight: 700;
      line-height: ${pxToRem(33)};
      letter-spacing: -0.48px;
    }
  }

  @media (min-width: ${sizes.tabletLargeWidth}) {
    header {
        width: 50%;
    }
  }
`

const ScenarioList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(15)};

  li{
    cursor: pointer;
    padding: ${pxToRem(18)} ${pxToRem(16)};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-primary-10);
    border-radius: 8px;
  }
`

