import { lazy, useState } from 'react';
import styled from 'styled-components';

import GetHelpScenarioList from './GetHelpScenarioList';
import GetHelpScenarioContent from './GetHelpScenarioContent';
import UiOverlay from 'ui/UiOverlay';

const UiModal = lazy(() => import('../ui/UiModal'));
const OtherIssues = lazy(() => import('./OtherIssues'));

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
  const [selectedScenario, setSelectedScenario] = useState<null | HelpScenario>(
    null,
  );
  const [otherIssuesVisible, setOtherIssuesVisible] = useState(false);

  function closeScenariosModal() {
    onClose();
    setSelectedScenario(null);
  }

  function openOtherIssuesModal() {
    setOtherIssuesVisible(true);
  }

  function backToScenarios() {
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
          <GetHelpScenarioList
            selectScenario={selectScenario}
            openOtherIssuesModal={openOtherIssuesModal}
          />
        )}
        {selectedScenario && (
          <GetHelpScenarioContent
            selectedScenario={selectedScenario}
            closeModal={closeScenariosModal}
            backToScenarios={backToScenarios}
            openOtherIssuesModal={openOtherIssuesModal}
          />
        )}
        <OtherIssues
          key={`${otherIssuesVisible}-other-issues`}
          otherIssuesVisible={otherIssuesVisible}
          tripId={tripId}
          onClose={() => setOtherIssuesVisible(false)}
          onDone={onClose}
        />
      </GetHelpStyling>
    </UiModal>
  );
}

export const GetHelpStyling = styled.section`
  padding: ${pxToRem(26)} ${pxToRem(24)} ${pxToRem(50)} ${pxToRem(24)};
`;
