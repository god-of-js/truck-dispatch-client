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
  startVerificationProcess,
  updateVerification,
} from 'modules/Verification';
import { RootState } from 'modules/index';
import { Toast } from 'utils/toast';
import ConfirmUserVerification from 'components/verification/ConfirmUserVerification';

const GuarantorsDetailsForm = lazy(
  () => import('components/verification/GuarantorDetailsform'),
);

const IdentificationDetailsForm = lazy(
  () => import('components/verification/IdentificationDetailsForm'),
);

const AddressForm = lazy(() => import('components/verification/AddressForm'));

const UiSteps = lazy(() => import('ui/UiSteps'));
const AuthLayoutStyling = lazy(
  () => import('components/layout/AuthLayoutStyling'),
);
const StyledAuthContent = lazy(
  () => import('components/auth/StyledAuthContent'),
);

interface Props {
  parentLoading?: boolean;
  onVerified: () => void;
}

export default function VerificationPage({ onVerified }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isVerified, setisVerified] = useState(false);
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
    console.log(data);
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

  const infoContent = useMemo(
    () => (
      <InfoContentContainer>
        <UiSteps steps={steps} currentStepTitle={currentStepTitle} />
        <div className="copyright">© TruckDispatch{currentYear}.</div>
      </InfoContentContainer>
    ),
    [steps],
  );

  async function startUserVerificationProcess() {
    const data = deepRootedToFormData(formData);

    dispatch(toAnyAction(startVerificationProcess(data)))
      .then(() => {
        onVerified();
      })
      .catch((err: Error) => {
        Toast.error({ msg: err.message });
      })
      .finally(() => setLoading(false));
  }
  async function updateUserVerification() {
    if (!verification)
      throw new Error('verification is meant to be available at this point.');
    const changedData = removeUneditedFields<Verification>(
      verification,
      formData,
    );
    const data = deepRootedToFormData(changedData);

    dispatch(toAnyAction(updateVerification(data)))
      .then(() => {
        onVerified();
      })
      .catch((err: Error) => {
        Toast.error({ msg: err.message });
      })
      .finally(() => setLoading(false));
  }

  async function verifyUser() {
    setLoading(true);
    setisVerified(true);
    if (!verification) {
      startUserVerificationProcess();
      return;
    }

    updateUserVerification();
  }

  function closeModal() {
    setisVerified(false);
    navigate('/available-jobs');
  }

  useEffect(() => {
    const presentAuthStage = getPresentAuthStage();
    const token = getAuthSessionId();
    if (presentAuthStage && token && currentStepTitle === steps[0].title) {
      const authStageExists = steps.find(
        (step) => step.title === presentAuthStage,
      );
      if (authStageExists) setCurrentStepTitle(presentAuthStage);
    }
  }, []);

  useEffect(() => {
    if (!formData._id && verification) setFormData(verification);
  }, [verification]);

  return (
    <AuthLayoutStyling infoContent={infoContent}>
      <StyledAuthContent>
        {currentStepTitle === 'Identification Details' && (
          <IdentificationDetailsForm
            verification={formData}
            goToNext={goToNext}
          />
        )}
        {currentStepTitle === 'Address' && (
          <AddressForm verification={formData} goToNext={goToNext} />
        )}
        {currentStepTitle === 'Guarantor Details' && (
          <GuarantorsDetailsForm finish={verifyUser} verification={formData} />
        )}
      </StyledAuthContent>
      <ConfirmUserVerification onClose={closeModal} isVisible={isVerified} />
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
