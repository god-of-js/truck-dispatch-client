import { lazy } from 'react';
import styled from 'styled-components';
import { HelpScenario } from './GetHelp';
import UiIcon from 'ui/UiIcon';

const UiButton = lazy(() => import('../ui/UiButton'));

interface Props {
  selectedScenario: HelpScenario;
  closeModal: () => void;
  backToScenarios: () => void;
  openOtherIssuesModal: () => void;
}

export default function GetHelpScenarioContent ({selectedScenario, closeModal, backToScenarios, openOtherIssuesModal}: Props) {
  return (
    <ScenarioData>
        <UiButton onClick={backToScenarios}  variant='primary-secondary'>
          <UiIcon icon='ArrowLeft'/>
            back
        </UiButton>
        <h2>{selectedScenario.title}</h2>
        <h3>Reasons why this might happen.</h3>
        {selectedScenario.reasons.map((reason, index) => (
          <div>
            <h4>
              {index + 1}. {reason.title}
            </h4>
            <p>{reason.body}</p>
          </div>
        ))}
        <h3>Were you satisfied with the information you got?</h3>
        <div className="button-flex">
          <UiButton isFullWidth onClick={closeModal}>Yes</UiButton>
          <UiButton isFullWidth variant="danger-secondary" onClick={openOtherIssuesModal}>No</UiButton>
        </div>
      </ScenarioData>
  )
}

const ScenarioData = styled.section`
  * {
    margin: 0;
    padding: 0;
  }

  h2 {
    color: var(--color-neutralBlack);
    font-size: ${pxToRem(24)};
    font-style: normal;
    font-weight: 700;
    line-height: 33.6px;
    letter-spacing: -0.48px;
    margin-bottom: ${pxToRem(48)};
  }

  h3 {
    font-size: ${pxToRem(16)};
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: var(--color-neutralBlack);
    margin-bottom: ${pxToRem(24)};
    max-width: 343px;
  }

  div {
    margin-bottom: ${pxToRem(24)};
  }

  h4 {
    font-size: ${pxToRem(14)};
    font-style: normal;
    font-weight: 600;
    color: var(--color-gray-80);
    margin-bottom: ${pxToRem(8)};
  }
  p {
    color: #272727;
    font-size: ${pxToRem(12)};
    font-style: normal;
    font-weight: 400;
    line-height: 16.8px;
  }

  & >  button{
    width: 96px;
    margin-bottom: ${pxToRem(30)};
  }

  .button-flex {
    margin-top: ${pxToRem(24)};
    display: flex;
    gap: ${pxToRem(48)};
  }
`;
