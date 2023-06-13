import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Trip from 'types/Trip';
import { deepRootedToFormData, toAnyAction } from 'utils/helpers';
import { uploadTDO } from 'modules/Trips';
import FileUploadWidget from 'ui/FileUploadWidget';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiModal from 'ui/UiModal';
import UploadTDO from 'utils/validations/UploadTDO';

interface Props {
  onClose: () => void;
  isVisible: boolean;
  trip: Trip;
}
export default function ViewPaymentDetails({
  onClose,
  isVisible,
  trip,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ TDO: File | null }>({
    TDO: null,
  });

  const dispatch = useDispatch();

  async function handleTDOUpload({ value }: { value: File | File[] | null }) {
    setFormData({
      TDO: value as File,
    });
  }

  async function submitTDO() {
    const formattedData = deepRootedToFormData(formData);
    dispatch(toAnyAction(uploadTDO(formattedData, trip._id)))
      .then(() => {
        closeModal();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function closeModal() {
    onClose();
  }

  return (
    <UiModal
      title="Terminal Delivery Order"
      isVisible={isVisible}
      onClose={closeModal}
    >
      <Description>
        Upload the Terminal Delivery Order of this trip to grant the responsible transporter access
        to the cargo or container.
      </Description>

      <UiForm formData={formData} schema={UploadTDO} onSubmit={submitTDO}>
        {({ errors }) => (
          <div>
            <FileUploadContainer>
              <FileUploadWidget
                name={'TDO'}
                fileType="document"
                value={formData.TDO}
                error={errors.TDO}
                onChange={handleTDOUpload}
                styleType="with-drag-and-drop"
              />
            </FileUploadContainer>
            <ActionsContainer>
              <UiButton type="submit" loading={loading}>
                Complete
              </UiButton>
              <UiButton variant="danger-secondary">Delete File</UiButton>
            </ActionsContainer>
          </div>
        )}
      </UiForm>
    </UiModal>
  );
}

const Description = styled.p`
  font-family: 'thiccboi-regular';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  justify-content: center;
  width: 70%;
  margin: auto;
  margin-top: 24px;
`;

const FileUploadContainer = styled.div`
  padding: 3%;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
