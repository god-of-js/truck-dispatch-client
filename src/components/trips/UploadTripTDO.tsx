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
import UploadTDOSchema from 'utils/validations/UploadTDOSchema';

interface Props {
  onClose: () => void;
  isVisible: boolean;
  trip: Trip;
}
export default function UploadTripTDO({ onClose, isVisible, trip }: Props) {
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
    setLoading(true);
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
      <UiForm formData={formData} schema={UploadTDOSchema} onSubmit={submitTDO}>
        {({ errors }) => (
          <UploadTDOStyling>
            <p>
              Upload the Terminal Delivery Order of this trip to grant the
              responsible transporter access to the cargo or container.
            </p>
            <FileUploadWidget
              name={'TDO'}
              fileType="document"
              value={formData.TDO}
              error={errors.TDO}
              onChange={handleTDOUpload}
              styleType="with-drag-and-drop"
            />
            <div className="btn-container">
              <UiButton type="submit" loading={loading}>
                Upload TDO
              </UiButton>
            </div>
          </UploadTDOStyling>
        )}
      </UiForm>
    </UiModal>
  );
}

const UploadTDOStyling = styled.div`
  padding:26px 24px;
  display: grid;
  gap: 24px;
  p {
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
  }

  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    button {
      width: 40%;
    }
  }
`;
