import { selectTrip, sendGetHelpComplaint } from 'modules/Trips';
import { RootState } from 'modules/index';
import { lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serviceBasedUserTypes } from 'utils/constants';
import { toAnyAction } from 'utils/helpers';
import GetHelpSchema from 'utils/validations/GetHelpSchema';
import { GetHelpStyling } from './GetHelp';
import styled from 'styled-components';

const UiModal = lazy(() => import('../ui/UiModal'));
const UiForm = lazy(() => import('../ui/UiForm'));
const UiButton = lazy(() => import('../ui/UiButton'));
const UiTextArea = lazy(() => import('../ui/UiTextArea'));

interface Props {
  tripId: string;
  onClose: () => void;
  otherIssuesVisible: boolean;
}

export default function OtherIssues({
  onClose,
  otherIssuesVisible,
  tripId,
}: Props) {
  const user = useSelector((state: RootState) => state.account.user);
  const trip = useSelector(selectTrip(tripId));

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    complaint: '',
  });
  const [loading, setLoading] = useState(false);

  const reportedUser = serviceBasedUserTypes.includes(user?.userType!)
    ? trip?.tripOwner
    : trip?.transporter;

  function handleChange(event: { name: string; value: string | null }) {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  }

  function onSubmit() {
    setLoading(true);
    const data = {
      ...formData,
      reportedTripId: tripId,
      reporterId: user?._id,
      reportedId: reportedUser?._id,
    };

    dispatch(toAnyAction(sendGetHelpComplaint(data))).then(() => {
      onClose();
      setLoading(false);
    });
  }
  return (
    <UiModal isVisible={otherIssuesVisible} onClose={onClose}>
      <GetHelpStyling>
        <h2>Other Issues 😐</h2>
        <UiForm formData={formData} onSubmit={onSubmit} schema={GetHelpSchema}>
          {({ errors }) => (
            <FormWrapper>
              <UiTextArea
                label="Please describe the issue you encountered"
                name="complaint"
                value={formData.complaint}
                placeholder="Add notes/reason and issues you encountered."
                onChange={handleChange}
                error={errors.complaint}
              />
              <UiButton loading={loading}>Send</UiButton>
            </FormWrapper>
          )}
        </UiForm>
      </GetHelpStyling>
    </UiModal>
  );
}

const FormWrapper = styled.div`
  button {
    width: 130px;
    margin: ${pxToRem(20)} auto 0;
  }
`;
