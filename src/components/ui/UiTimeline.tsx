import React from 'react';
import styled from 'styled-components';
import sizes from '../../utils/sizes';

export interface TimelineStep {
  name: string;
  value: string;

  invincible?: boolean;
}

interface Props {
  steps: TimelineStep[];
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
      {steps
        .filter(({ invincible }) => !invincible)
        .map((step, index) => (
          <TimeLineItem
            key={index}
            isActive={StepIsPresentOrPassed(step.value)}
          >
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
  gap: 4px;
  overflow: auto;
`;

const TimeLineItem = styled.li`
  padding: 0 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? 'var(--color-primary)' : 'var(--color-gray-400)'};

  .step-thread {
    width: 20px;
    height: 1px;
    background: ${({ isActive }: { isActive: boolean }) =>
      isActive ? 'var(--color-primary)' : 'var(--color-gray-400)'};
  }

  &:last-child {
    .step-thread {
      display: none;
    }
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    padding: 0 8px;
    gap: 8px;
    font-size: 14px;
    .step-thread {
      width: 32px;
    }
  }
`;
