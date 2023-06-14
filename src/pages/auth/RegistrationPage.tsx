import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UiSteps, { Step } from 'ui/UiSteps';
import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';
import CompanyDetailsForm from 'components/auth/CompanyDetailsForm';
import PersonalDetailsForm from 'components/auth/PersonalDetailsForm';
import VerifyPhoneForm from '../../components/auth/VerifyPhoneForm';
import ChoosePasswordForm from 'components/auth/ChoosePasswordForm';
import { userTypes } from 'utils/constants';
import styled from 'styled-components';
import sizes from 'utils/sizes';
import {
  getAuthSessionId,
  getPresentAuthStage,
  savePresentAuthStage,
} from 'utils/localStorageMethods';
import StyledAuthContent from 'components/auth/StyledAuthContent';

export default function RegistrationPage() {
  const { userType } = useParams();
  const formattedUserType = userType?.toLowerCase();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const steps: Step[] = [
    {
      title: 'Account handler details',
      detail:
        'Please provide full name, email and phone number of the account handler',
    },
    {
      title: 'Personal details',
      detail: 'Please provide your full name, email and phone number',
    },
    {
      title: 'Verify phone number',
      detail: 'Please provide your full name, email and phone number',
    },
    {
      title: 'Company Details',
      detail: 'Provide the company name, address and registration details',
    },
    {
      title: 'Choose password',
      detail: 'Please provide your full name, email and phone number',
    },
  ].filter(({ title }) => {
    if (
      formattedUserType?.includes('company') &&
      title === 'Personal details'
    ) {
      return false;
    }

    if (
      !formattedUserType?.includes('company') &&
      title === 'Company Details'
    ) {
      return false;
    }
    if (
      !formattedUserType?.includes('company') &&
      title === 'Account handler details'
    ) {
      return false;
    }

    return true;
  });

  // const [currentStepTitle, setCurrentStepTitle] = useState('Company Details');
  const [currentStepTitle, setCurrentStepTitle] = useState(steps[0].title);

  function goToNext() {
    const indexOfCurrentStage = steps.findIndex(
      ({ title }) => title === currentStepTitle,
    );
    const newTitle = steps[indexOfCurrentStage + 1].title;
    setCurrentStepTitle(newTitle);
    savePresentAuthStage(newTitle);
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

  useEffect(() => {
    if (!userTypes.includes(userType!)) {
      navigate('/auth/join');
    }
  }, [userType]);

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

  return (
    <AuthLayoutStyling infoContent={infoContent}>
      <StyledAuthContent>
        {(currentStepTitle === 'Account handler details' ||
          currentStepTitle === 'Personal details') && (
          <PersonalDetailsForm goToNext={goToNext} />
        )}
        {currentStepTitle === 'Verify phone number' && (
          <VerifyPhoneForm goToNext={goToNext} />
        )}
        {currentStepTitle === 'Company Details' && (
          <CompanyDetailsForm goToNext={goToNext} />
        )}
        {currentStepTitle === 'Choose password' && (
          <ChoosePasswordForm goToNext={goToNext} />
        )}
      </StyledAuthContent>
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
