import React, { lazy, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';

export type OnChangeParams = { name: string; value: string | null };

const UiField = lazy(() => import('ui/UiField'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const UiModal = lazy(() => import('ui/UiModal'));

interface Props {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (event: OnChangeParams) => void;
}

export default function webCamUpload({
  label,
  onChange,
  name,
  value,
  error,
}: Props) {
  const [picture, setPicture] = useState(value);
  const webcamRef = useRef<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
  };

  function capture() {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    console.log(picture);
  }

  function sendValue(e: { target: { name: string; value: string | null } }) {
    onChange({ name: name, value: picture });
    setIsModalVisible(false);
  }

  function onClose() {
    setIsModalVisible(false);
  }

  return (
    <>
      <UiField label={label} error={error}>
        <PictureBox>
          {picture ? (
            <img src={picture} />
          ) : (
            <div className="button-container">
              <UiButton
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalVisible(true);
                }}
                textCasing="normal"
                variant="secondary"
              >
                Take a picture <UiIcon icon="Camera" size="20" />
              </UiButton>
            </div>
          )}
        </PictureBox>

        {picture ? (
          <ButtonContainer>
            <UiButton
              variant="primary-text"
              textCasing="normal"
              size="text"
              type="button"
              onClick={() => setIsModalVisible(true)}
            >
              Retake Photo?
            </UiButton>
          </ButtonContainer>
        ) : (
          ''
        )}
      </UiField>

      <UiModal
        title="Take a Photo"
        onClose={onClose}
        isVisible={isModalVisible}
      >
        <ModalBody>
          <p>Please carefully review the Picture</p>
          <div>
            {picture == '' ? (
              <Webcam
                audio={false}
                height={400}
                ref={webcamRef}
                width={400}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            ) : (
              <img src={picture} />
            )}
          </div>
          <div>
            {picture != '' ? (
              <div className="button-container">
                <UiButton
                  variant="secondary"
                  isFullWidth
                  onClick={(e) => {
                    e.preventDefault();
                    setPicture('');
                  }}
                >
                  Retake
                </UiButton>
                <UiButton isFullWidth onClick={sendValue}>
                  continue
                </UiButton>
              </div>
            ) : (
              <div className="button-container">
                <UiButton
                  isFullWidth
                  onClick={(e) => {
                    e.preventDefault();
                    capture();
                  }}
                >
                  Capture
                </UiButton>
              </div>
            )}
          </div>
        </ModalBody>
      </UiModal>
    </>
  );
}

const PictureBox = styled.div`
  height: ${pxToRem(110)};
  display: flex !important;
  border-radius: ${pxToRem(8)};
  border: 1px dashed var(--color-gray-80);
  background: var(--color-grey-20);

  img {
    margin: 0 auto;
  }

  button {
    margin: auto !important;
  }

  .button-container {
    margin: auto;
  }
`;

const ModalBody = styled.div`
  padding: 0 ${pxToRem(64)};
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: ${pxToRem(16)};
  line-height: ${pxToRem(24)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${pxToRem(24)};

  .button-container {
    display: flex;
    gap: ${pxToRem(8)};
    justify-content: center;
  }
`;

const ButtonContainer = styled.div`
  button {
    margin-top: 0 !important;
  }
`;
