import React from 'react';
import styled from 'styled-components';
import sizes from '../../utils/sizes';

interface Step {
  name: string;
  value: string;
}

interface Props {
  steps: Step[];
  currentStep: string;
}

export default function UiTimeline({ steps, currentStep }: Props) {
  function StepIsPresentOrPassed(step: string): boolean {
    if (step === currentStep) return true;
    const currentStepIndex = steps.findIndex(
      ({ value }) => value === currentStep,
    );
    const stepIndex = steps.findIndex(({ value }) => value === step);

    if (currentStepIndex > stepIndex) {
      return true;
    }
    return false;
  }
  return (
    <TimeLineContainer>
      {steps.map((step) => (
        <TimeLineItem isActive={StepIsPresentOrPassed(step.value)}>
          <span>{step.name}</span>
          <div className="step-thread" />
        </TimeLineItem>
      ))}
    </TimeLineContainer>
  );
}

const TimeLineContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
  gap: ${pxToRem(4)};
  overflow: auto;
`;

const TimeLineItem = styled.li`
  padding: 0 ${pxToRem(4)};
  display: flex;
  align-items: center;
  gap: ${pxToRem(4)};
  font-size: ${pxToRem(12)};
  color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? 'var(--color-primary)' : 'var(--color-gray-400)'};

  .step-thread {
    width: ${pxToRem(20)};
    height: ${pxToRem(1)};
    background: ${({ isActive }: { isActive: boolean }) =>
      isActive ? 'var(--color-primary)' : 'var(--color-gray-400)'};
  }

  &:last-child {
    .step-thread {
      display: none;
    }
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    padding: 0 ${pxToRem(8)};
    gap: ${pxToRem(8)};
    font-size: ${pxToRem(14)};
    .step-thread {
      width: ${pxToRem(32)};
    }
  }
`;
