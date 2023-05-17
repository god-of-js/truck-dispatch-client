import { useState } from 'react';
import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiIcon from 'ui/UiIcon';
import UiInput from 'ui/UiInput';
import UiModal from 'ui/UiModal';
import UiSelect from 'ui/UiSelect';
import UiTextArea from 'ui/UiTextArea';
import sizes from 'utils/sizes';

interface Props {
  jobId: string;
  onClose: () => void;
  backToJobDetails: () => void;
}
export default function BidForJob({ jobId, onClose, backToJobDetails }: Props) {
  const [formData, setFormData] = useState({
    amount: '',
  });

  function fillForm({ name, value }: { name: string; value: string | null }) {}
  function bidOnJob() {}
  return (
    <UiModal position="right" title="Submit Bid" onClose={onClose}>
      <ComponentStyling>
        <UiButton variant="secondary" onClick={backToJobDetails}>
          <UiIcon icon="ArrowLeft" /> Back to job details
        </UiButton>

        <UiForm formData={formData} onSubmit={bidOnJob}>
          {() => (
            <>
              <div className="form-group">
                <div className="base-details">
                  <UiInput
                    value={formData.amount}
                    name="amount"
                    label="How much would you charge for the trip?"
                    onChange={fillForm}
                  />
                  <UiSelect
                    value={formData.amount}
                    name="amount"
                    label="Select Vehicle/Truck"
                    onChange={fillForm}
                    options={[]}
                  />
                  <UiInput
                    value={formData.amount}
                    name="amount"
                    label="Current Location Of Truck"
                    onChange={fillForm}
                  />
                </div>
                <div className="text-area-container">
                  <UiTextArea
                    value={formData.amount}
                    name="amount"
                    placeholder="Add extra notes here to improve your bid"
                    label="Extra Notes? (Optional)"
                    onChange={fillForm}
                  />
                </div>
              </div>
              <div className="action-btn">
                <UiButton size="large">Submit Bid</UiButton>
              </div>
            </>
          )}
        </UiForm>
      </ComponentStyling>
    </UiModal>
  );
}

const ComponentStyling = styled.div`
  padding: ${pxToRem(32)} ${pxToRem(24)};
  display: grid;
  gap: ${pxToRem(64)};
  height: 100%;
  position: relative;

  .form-group {
    display: grid;
    grid-template-columns: auto;
    gap: ${pxToRem(24)};

    .base-details {
      display: grid;
      gap: ${pxToRem(24)};
      height: 100%;
    }
    .text-area-container {
      .ui-field {
        height: 100%;
      }
      textarea {
        height: 100%;
        width: 100%;
      }
    }

    @media screen and (min-width: ${sizes.tablet}) {
      grid-template-columns: auto auto;
    }
  }
  .action-btn {
    width: calc(100% - 48px);
    /* position: absolute; */
    display: flex;
    justify-content: center;
    bottom: 0;
    margin-top: ${pxToRem(40)};
    button {
      width: 60%;
    }
  }
`;
