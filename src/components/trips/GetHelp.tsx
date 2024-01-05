import { lazy } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules/index';
import { selectTrip } from 'modules/Trips';
import GetHelpScenarioList from './GetHelpScenarioList';
import GetHelpScenarioContent from './GetHelpScenarioContent';
import GetHelpSchema from 'utils/validations/GetHelpSchema';
import GetHelpData from 'types/GetHelpData';
import { sendGethelpMessage } from 'modules/Trips';
import User from 'types/User';
import { clientBasedUserTypes, serviceBasedUserTypes } from 'utils/constants';
import { toAnyAction } from 'utils/helpers';

const UiModal = lazy(() => import('../ui/UiModal'));
const UiTextArea = lazy(() => import('../ui/UiTextArea'));
const UiForm = lazy(() => import('../ui/UiForm'));
const UiButton = lazy(() => import('../ui/UiButton'));

interface Reason {
  reasonTitle: string;
  body: string;
}

export interface GetHelpScenario {
  Title: string;
  reasons: Reason[];
}

interface Props {
  onClose: () => void;
  tripId: string;
  isVisible: boolean;
}

export default function GetHelp({ isVisible, onClose, tripId }: Props) {
  const user = useSelector((state: RootState) => state.account.user);
  const trip = useSelector(selectTrip(tripId));
  const dispatch = useDispatch();

  const reportedUser = serviceBasedUserTypes.includes(user?.userType!)
    ? trip?.tripOwner
    : trip?.transporter;

  const [formData, setFormData] = useState({
    issueMessage: '',
  });
  const [selectedScenario, setSelectedScenario] =
    useState<null | GetHelpScenario>(null);
  const [otherIssuesVisible, setOtherIssuesVisible] = useState(false);

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function onSubmit() {
    const data = {
      ...formData,
      reportedTripId: tripId,
      reporterId: user?._id,
      reportedId: reportedUser?._id,
    };
    dispatch(toAnyAction(sendGethelpMessage(data))).then(
      (helpData: GetHelpData) => {
        console.log(helpData);
      },
    );
  }

  function closeScenariosModal() {
    onClose();
    setSelectedScenario(null);
  }

  function closeOtherIssuesModal() {
    setOtherIssuesVisible(false);
  }

  function openOtherIssuesModal() {
    setOtherIssuesVisible(true);
  }

  function backToScenarios() {
    setSelectedScenario(null);
  }

  function selectScenario(scenario: GetHelpScenario) {
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

        <UiModal isVisible={otherIssuesVisible} onClose={closeOtherIssuesModal}>
          <GetHelpStyling>
            <h2>Other Issues 😐</h2>
            <UiForm
              formData={formData}
              onSubmit={onSubmit}
              schema={GetHelpSchema}
            >
              {({ errors }) => (
                <div className="form-wrapper">
                  <UiTextArea
                    label="Please describe the issue you encountered"
                    name="issueMessage"
                    value={formData.issueMessage}
                    placeholder="Add notes/reason and issues you encountered."
                    onChange={handleChange}
                    error={errors.issueMessage}
                  />
                  <UiButton>Send</UiButton>
                </div>
              )}
            </UiForm>
          </GetHelpStyling>
        </UiModal>
      </GetHelpStyling>
    </UiModal>
  );
}

const GetHelpStyling = styled.section`
  padding: ${pxToRem(26)} ${pxToRem(24)} ${pxToRem(50)} ${pxToRem(24)};

  .form-wrapper {
    button {
      width: 130px;
      margin: ${pxToRem(20)} auto 0;
    }
  }
`;
