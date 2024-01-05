import { lazy } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "modules/index";
import { selectTrip } from 'modules/Trips';
import GetHelpScenarioList from './GetHelpScenarioList';
import GetHelpScenarioContent from './GetHelpScenarioContent';
import GetHelpSchema from 'utils/validations/GetHelpSchema';
import { sendGetHelpComplaint } from 'modules/Trips';
import { serviceBasedUserTypes } from 'utils/constants';
import { toAnyAction } from 'utils/helpers';

const UiModal = lazy(() => import('../ui/UiModal'));
const UiTextArea = lazy(() => import('../ui/UiTextArea'));
const UiForm = lazy(() => import('../ui/UiForm'));
const UiButton = lazy(() => import('../ui/UiButton'));
const OtherIsses = lazy(() => import('./OtherIssues'))

interface Reason {
  title: string;
  body: string;
}

export interface HelpScenario {
  title: string;
  reasons: Reason[];  
}

interface Props {
  onClose: () => void;
  tripId: string;
  isVisible: boolean;
}

export default function GetHelp({ isVisible, onClose, tripId }: Props) {
  const [selectedScenario, setSelectedScenario] =
    useState<null | HelpScenario>(null);
  const [otherIssuesVisible, setOtherIssuesVisible] = useState(false)
  
  function closeScenariosModal() {
    onClose();
    setSelectedScenario(null);
  }

  function openOtherIssuesModal () {
    setOtherIssuesVisible(true)
  }
  
  function backToScenarios () {
    setSelectedScenario(null);
  }

  function selectScenario(scenario: HelpScenario) {
    setSelectedScenario(scenario);
  }

  return (
    <UiModal
      isVisible={isVisible}
      onClose={closeScenariosModal}
      position="right"
      title="Get Help?"
    >
      <GetHelpStyling>
        {!selectedScenario && (
          <GetHelpScenarioList selectScenario={selectScenario} openOtherIssuesModal={openOtherIssuesModal}/>
        )}
        {selectedScenario && (
          <GetHelpScenarioContent  selectedScenario={selectedScenario} closeModal={closeScenariosModal} backToScenarios={backToScenarios} openOtherIssuesModal={openOtherIssuesModal}/>
        )}
        <OtherIsses onClose={() => setOtherIssuesVisible(false)} otherIssuesVisible={otherIssuesVisible} tripId={tripId}/>
      </GetHelpStyling>
    </UiModal>
  );
}

export const GetHelpStyling = styled.section`
  padding: ${pxToRem(26)} ${pxToRem(24)} ${pxToRem(50)} ${pxToRem(24)};

  .form-wrapper {
    button{
      width: 130px;
      margin:${pxToRem(20)} auto 0;
    }
  }
`;

