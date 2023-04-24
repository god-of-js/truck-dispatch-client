import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UiSteps, { Step } from 'ui/UiSteps';
import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';
import CompanyDetailsForm from 'components/auth/CompanyDetailsForm';
import PersonalDetailsForm from 'components/auth/PersonalDetailsForm';
import VerifyPhoneForm from '../../components/auth/VerifyPhoneForm';
import ChoosePasswordForm from 'components/auth/ChoosePasswordForm';
import { userTypes } from 'utils/constants';

export default function RegistrationPage() {
  const { userType } = useParams();
  const navigate = useNavigate()
  const steps: Step[] = [
    {
      title: 'Company Details',
      detail: 'Provide the company name, address and registration details',
    },
    {
      title: 'Account handler details',
      detail: 'Please provide your full name, email and phone number',
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
      title: 'Choose password',
      detail: 'Please provide your full name, email and phone number',
    },
  ].filter(({ title }) => {
    if (userType?.includes('company') && title === 'Personal details') {
      return false;
    }

    if (!userType?.includes('company') && title === 'Company Details') {
      return false;
    }
    if (!userType?.includes('company') && title === 'Account handler details') {
      return false;
    }

    return true;
  });

  const [currentStepTitle, setCurrentStepTitle] = useState(
    steps[0].title,
  );

  function goToNext() {
    const indexOfCurrentStage = steps.findIndex(
      ({ title }) => title === currentStepTitle,
    );
    const newTitle = steps[indexOfCurrentStage + 1].title;
    setCurrentStepTitle(newTitle);
  }
  const infoContent = (
    <>
      <UiSteps steps={steps} currentStepTitle={currentStepTitle} />
    </>
  );

  useEffect(() => {
    if (!userTypes.includes(userType!)) {
      navigate('/auth/join')
    }
  }, [userType])

  return (
    <AuthLayoutStyling infoContent={infoContent}>
      {currentStepTitle === 'Company Details' && <CompanyDetailsForm goToNext={goToNext}/>}
      {(currentStepTitle === 'Account handler details' ||
        currentStepTitle === 'Personal details') && <PersonalDetailsForm goToNext={goToNext}/>}
      {currentStepTitle === 'Verify phone number' && <VerifyPhoneForm goToNext={goToNext}/>}
      {currentStepTitle === 'Choose password' && <ChoosePasswordForm goToNext={goToNext}/>}
    </AuthLayoutStyling>
  );
}
