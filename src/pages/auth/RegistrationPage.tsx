import React, { useState } from 'react';

import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';
import CompanyDetailsForm from 'components/auth/CompanyDetailsForm';
import UiSteps, { Step } from 'ui/UiSteps';

export default function RegistrationPage() {
  const [currentStepTitle, setCurrentStepTitle] = useState(
    'Verify phone number',
  );
  const steps: Step[] = [
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
  ];

  const infoContent = (
    <>
      <UiSteps steps={steps} currentStepTitle={currentStepTitle} />
    </>
  );

  return (
    <AuthLayoutStyling infoContent={infoContent}>
      <CompanyDetailsForm />
    </AuthLayoutStyling>
  );
}
