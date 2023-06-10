import styled from 'styled-components';
import UiButton from 'ui/UiButton';
import UiModal from 'ui/UiModal';
import UiVideoPlayer from 'ui/UiVideoPlayer';

interface Props {
  isVisible: boolean;
  proofVideo: string;
  onClose: () => void;
  approvePayment: () => void;
  rejectPayment: () => void;
}
export default function CargoLoadingProof({
  isVisible,
  proofVideo,
  onClose,
  rejectPayment,
  approvePayment,
}: Props) {
  return (
    <UiModal
      title="Cargo Loading Proof"
      isVisible={isVisible}
      onClose={onClose}
    >
      <ModalBody>
        <p>
          Please carefully review the video before making any payments, as it
          serves as evidence of cargo being loaded onto the truck. It's
          important to note that once payment is made, it cannot be reversed.
        </p>
        <UiVideoPlayer video={proofVideo} />
        <div className="button-container">
          <UiButton variant="primary" size="large" onClick={approvePayment}>
            Approve Payment
          </UiButton>
          <UiButton
            variant="danger-secondary"
            size="large"
            onClick={rejectPayment}
          >
            Reject Payment
          </UiButton>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${pxToRem(24)};

  video {
    margin: auto;
  }
  .button-container {
    display: flex;
    gap: ${pxToRem(8)};
    justify-content: center;

    button {
      min-width: ${pxToRem(180)};
    }
  }
`;
