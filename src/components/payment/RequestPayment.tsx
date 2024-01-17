import Loader from 'components/layout/Loader';
import { RootState } from 'modules/index';
import {
  requestPaymentByTransporter,
  updatePaymentRequestByTransporter,
} from 'modules/Trips';
import { lazy, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PaymentRequest from 'types/PaymentRequest';
import UiConfirmModal from 'ui/UiConfirmModal';
import UiUploadingModal from 'ui/UiUploadingModal';
import { deepRootedToFormData, toAnyAction } from 'utils/helpers';
import RequestPaymentSchema from 'utils/validations/RequestPaymentSchema';

const UiModal = lazy(() => import('ui/UiModal'));
const UiButton = lazy(() => import('ui/UiButton'));
const FileUploadWidget = lazy(() => import('ui/FileUploadWidget'));
const UiVideoPlayer = lazy(() => import('ui/UiVideoPlayer'));
const UiForm = lazy(() => import('ui/UiForm'));

interface Props {
  isVisible: boolean;
  tripId: string;
  paymentRequest?: PaymentRequest;
  addAccountDetails: () => void;
  onClose: () => void;
}
export default function RequestPayment({
  isVisible,
  paymentRequest,
  tripId,
  onClose,
  addAccountDetails,
}: Props) {
  const user = useSelector((state: RootState) => state.account.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<{
    proofVideo: File | null | string;
  }>({
    proofVideo: paymentRequest?.proofVideo as string,
  });
  const [loading, setLoading] = useState(false);

  const requestBtnIsDisabled = useMemo(() => {
    if (!paymentRequest) return false;

    return typeof formData.proofVideo === 'string';
  }, [paymentRequest, formData]);
  function setValue({ value }: { value: File | File[]; name: string }) {
    setFormData({ proofVideo: value as File });
  }

  function requestTripPayment() {
    if (!user?.bankDetails) {
      addAccountDetails();
      return;
    }

    setLoading(true);
    const data = deepRootedToFormData(formData);
    const request = paymentRequest
      ? updatePaymentRequestByTransporter(data, tripId, paymentRequest?._id)
      : requestPaymentByTransporter(data, tripId);
    dispatch(toAnyAction(request))
      .then(() => {
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return !loading ? (
    <UiModal title="Request Payment" isVisible={isVisible} onClose={onClose}>
      <UiForm
        formData={formData}
        schema={RequestPaymentSchema}
        onSubmit={requestTripPayment}
      >
        {({ errors }) => (
          <ModalBody>
            <p>
              Upload a video that clearly shows the cargo being loaded into the
              truck,
              <br /> also ensure that the truck’s plate number is visible.
            </p>
            {!formData.proofVideo ? (
              <FileUploadWidget
                value={formData.proofVideo}
                name="proofVideo"
                styleType="with-drag-and-drop"
                fileType="video"
                error={errors.proofVideo}
                onChange={setValue}
              />
            ) : (
              <UiVideoPlayer video={formData.proofVideo} />
            )}
            <div className="btn-container">
              {!!formData.proofVideo && (
                <FileUploadWidget
                  value={formData.proofVideo}
                  name="proofVideo"
                  fileType="video"
                  onChange={setValue}
                >
                  <div className="w-100-button">
                    <UiButton
                      size="large"
                      isFullWidth
                      disabled={loading}
                      variant="secondary"
                      onClick={(event) => event?.preventDefault()}
                    >
                      Change Video
                    </UiButton>
                  </div>
                </FileUploadWidget>
              )}
              <UiButton
                size="large"
                loading={loading}
                disabled={requestBtnIsDisabled}
              >
                {paymentRequest ? 'Update Payment Request' : 'Request Payment'}
              </UiButton>
            </div>
          </ModalBody>
        )}
      </UiForm>
    </UiModal>
  ) : (
    <UiUploadingModal
      title="Uploading Proof Video ..."
      message1="Please wait while we update your record"
      message2=" Note: Video Uploads Could Take 1 - 2 minutes depending on it's size"
      onClose={onClose}
      loading={loading}
    />
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
