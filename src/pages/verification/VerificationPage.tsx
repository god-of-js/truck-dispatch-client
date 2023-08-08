import React, { lazy, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Step } from 'ui/UiSteps';
import styled from 'styled-components';
import sizes from 'utils/sizes';
import {
  getAuthSessionId,
  getPresentAuthStage,
  savePresentAuthStage,
} from 'utils/localStorageMethods';
import Verification from 'types/Verification';
import { useDispatch, useSelector } from 'react-redux';
import {
  deepRootedToFormData,
  removeUneditedFields,
  toAnyAction,
} from 'utils/helpers';
import {
  getUserVerification,
  startVerificationProcess,
  updateVerification,
} from 'modules/Verification';
import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';
import UiConfirmModal from 'ui/UiConfirmModal';

const ConfirmUserVerification = lazy(
  () => import('components/verification/ConfirmUserVerification'),
);

const GuarantorsDetailsForm = lazy(
  () => import('components/verification/GuarantorDetailsform'),
);

const IdentificationDetailsForm = lazy(
  () => import('components/verification/IdentificationDetailsForm'),
);

const AddressForm = lazy(() => import('components/verification/AddressForm'));

const UiSteps = lazy(() => import('ui/UiSteps'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiIcon = lazy(() => import('ui/UiIcon'));
const AuthLayoutStyling = lazy(
  () => import('components/layout/AuthLayoutStyling'),
);
const StyledAuthContent = lazy(
  () => import('components/auth/StyledAuthContent'),
);

export default function VerificationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [
    isConfirmUserVerificationVisible,
    setIsConfirmUserVerificationVisible,
  ] = useState(false);
  const [formData, setFormData] = useState<Verification>({
    _id: '',
    idType: '',
    idDoc: null,
    homeAddress: '',
    homeUtilityBill: null,
    garageAddress: '',
    officeAddress: '',
    guarantor: {
      name: '',
      email: '',
      phone: '',
      homeAddress: '',
      idType: '',
      idDoc: null,
    },
  });
  const [
    isAreYouSureYouWantToCancelVerificationVisible,
    setIsAreYouSureYouWantToCancelVerificationVisible,
  ] = useState(false);

  const verification = useSelector(
    (state: RootState) => state.verification.verification,
  );

  const currentYear = new Date().getFullYear();
  const steps: Step[] = [
    {
      title: 'Identification Details',
      detail: 'Please provide your ID documents and your recent photos',
    },
    {
      title: 'Address',
      detail: 'Enter your address and upload documents that confirms that',
    },
    {
      title: 'Guarantor Details',
      detail:
        'Provide the guarantor’s name, email address, phone andother details',
    },
  ];

  const [currentStepTitle, setCurrentStepTitle] = useState(steps[0].title);

  function goToNext(data: Partial<Verification>) {
    setFormData((formData) => ({
      ...formData,
      ...data,
    }));

    const indexOfCurrentStep = steps.findIndex(
      (step) => step.title === currentStepTitle,
    );
    const nextTitle = steps[indexOfCurrentStep + 1].title;
    setCurrentStepTitle(nextTitle);
  }
  function goToPrev() {
    const indexOfCurrentStep = steps.findIndex(
      (step) => step.title === currentStepTitle,
    );
    const nextTitle = steps[indexOfCurrentStep - 1].title;
    setCurrentStepTitle(nextTitle);
  }

  const infoContent = useMemo(
    () => (
      <InfoContentContainer>
        <UiSteps steps={steps} currentStepTitle={currentStepTitle} />
        <div className="copyright">© TruckDispatch{currentYear}.</div>
      </InfoContentContainer>
    ),
    [steps],
  );

  async function startUserVerificationProcess(completedForm: Verification) {
    const data = deepRootedToFormData(completedForm);

    dispatch(toAnyAction(startVerificationProcess(data)))
      .then(() => {
        setIsConfirmUserVerificationVisible(true);
      })
      .catch((err: Error) => {
        Toast.error({ msg: err.message });
      })
      .finally(() => {
        setLoading(false);
      });
  }
  async function updateUserVerification(completedForm: Verification) {
    if (!verification)
      throw new Error('verification is meant to be available at this point.');
    const changedData = removeUneditedFields<Verification>(
      verification,
      completedForm,
    );
    const data = deepRootedToFormData(changedData);

    dispatch(toAnyAction(updateVerification(data)))
      .then(() => {
        setIsConfirmUserVerificationVisible(true);
      })
      .catch((err: Error) => {
        Toast.error({ msg: err.message });
      })
      .finally(() => setLoading(false));
  }

  async function submitForm(completedForm: Verification) {
    setFormData(completedForm);
    setLoading(true);
    if (!verification) {
      startUserVerificationProcess(completedForm);
      return;
    }

    updateUserVerification(completedForm);
  }

  function closeModal() {
    navigate('/my-trips');
    setIsConfirmUserVerificationVisible(false);
  }

  function stopVerification() {
    navigate('/my-trips');
  }

  function initStopVerification() {
    if (currentStepTitle !== 'Identification Details') {
      setIsAreYouSureYouWantToCancelVerificationVisible(true);
      return;
    }

    stopVerification();
  }

  useEffect(() => {
    if (!formData._id && verification) setFormData(verification);
  }, [verification]);

  useEffect(() => {
    setLoading(true)
    dispatch(toAnyAction(getUserVerification())).then((data: Verification) => {
      setFormData(data)
    }).finally(() => setLoading(false));
  }, [])

  return (
    <AuthLayoutStyling infoContent={infoContent}>
      <StyledAuthContent key={formData._id || ''}>
        <div className="form-container">
          <header>
            <UiIcon icon="UserOctagon" size="45" />
            <h1>Account Verification</h1>
            <p>
              To verify your account, please enter accurate information in the
              provided input box.
            </p>
          </header>
          {currentStepTitle === 'Identification Details' && (
            <IdentificationDetailsForm
              verification={formData}
              loading={loading}
              goToNext={goToNext}
            />
          )}
          {currentStepTitle === 'Address' && (
            <AddressForm verification={formData} goToNext={goToNext} />
          )}
          {currentStepTitle === 'Guarantor Details' && (
            <GuarantorsDetailsForm
              isLoading={loading}
              finish={submitForm}
              verification={formData}
            />
          )}
          <div className="sm-btn-margin-top">
            {currentStepTitle !== 'Identification Details' && (
              <UiButton isFullWidth variant="secondary" onClick={goToPrev}>
                <UiIcon icon="CaretLeft" />
                Prev
              </UiButton>
            )}
            <UiButton isFullWidth variant="danger-secondary" onClick={initStopVerification}>
              Cancel
            </UiButton>
          </div>
        </div>
      </StyledAuthContent>
      <ConfirmUserVerification
        onClose={closeModal}
        isVisible={isConfirmUserVerificationVisible}
      />
      <UiConfirmModal
        title="Are you sure?"
        variant="danger"
        isVisible={isAreYouSureYouWantToCancelVerificationVisible}
        onClose={() => setIsAreYouSureYouWantToCancelVerificationVisible(false)}
        onProceed={stopVerification}
      >
        Are you sure you want to cancel this verification process? The present
        data would be lost. <br /> You can always start this process from
        beginning
      </UiConfirmModal>
    </AuthLayoutStyling>
  );
}

const InfoContentContainer = styled.div`
  height: 80%;
  position: relative;

  .copyright {
    position: absolute;
    bottom: 0;
    display: none;

    @media screen and (min-width: ${sizes.tablet}) {
      display: block;
    }
  }
`;
