import { useState } from 'react';
import styled from 'styled-components';
import FileUploadWidget from 'ui/FileUploadWidget';
import UiButton from 'ui/UiButton';
import UiModal from 'ui/UiModal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}
export default function RequestPayment({ isVisible, onClose }: Props) {
  const [formData, setFormData] = useState<{ proofVideo: File | null }>({
    proofVideo: null,
  });

  function setValue({ value }: { value: File | File[]; name: string }) {
    setFormData({ proofVideo: value as File });
  }
  return (
    <UiModal title="Request Payment" isVisible={isVisible} onClose={onClose}>
      <ModalBody>
        <p>
          Upload a video that clearly shows the cargo being loaded into the
          truck,
          <br /> also ensure that the truck’s plate number is visible.
        </p>
        {!formData.proofVideo &&<FileUploadWidget
          value={formData.proofVideo}
          name="proofVideo"
          styleType="with-drag-and-drop"
          fileType="video"
          onChange={setValue}
        />}
        <div className="btn-container">
          {!!formData.proofVideo && (
            <FileUploadWidget
              value={formData.proofVideo}
              name="proofVideo"
              fileType="video"
              onChange={setValue}
            >
              <div className="w-100-button">
                <UiButton size="large" isFullWidth variant="secondary">
                  Change Video
                </UiButton>
              </div>
            </FileUploadWidget>
          )}
          <UiButton size="large">Request Payment</UiButton>
        </div>
      </ModalBody>
    </UiModal>
  );
}

const ModalBody = styled.div`
  padding: ${pxToRem(24)} ${pxToRem(64)};
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: ${pxToRem(16)};
  line-height: ${pxToRem(24)};
  display: grid;
  justify-content: center;
  gap: ${pxToRem(24)};

  color: var(--color-neutralBlack);
  p {
    margin: auto;
  }
  .drag-and-drop-container {
    height: ${pxToRem(320)};
    width: 100%;
  }
  .btn-container {
    display: flex;
    justify-content: center;
    gap: ${pxToRem(24)};
    .ui-field {
      width: 50%;

      button {
        width: 100%;
      }
    }
    button {
      width: 50%;
    }
  }
`;
