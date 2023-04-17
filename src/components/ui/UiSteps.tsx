import React from 'react';
import styled from 'styled-components';

export interface Step {
  title: string;
  detail: string;
}
interface Props {
  steps: Step[];
  currentStepTitle: string;
}
export default function UiSteps({ steps, currentStepTitle }: Props) {
  function isActive(title: string) {
    return title === currentStepTitle;
  }
  function isCompleted(title: string) {
    const indexOfTitle = steps.findIndex((step) => step.title === title);
    const indexOfCurrentStepTitle = steps.findIndex(
      (step) => step.title === currentStepTitle,
    );

    return indexOfCurrentStepTitle > indexOfTitle;
  }

  return (
    <ul>
      {steps.map((step, index) => (
        <ListItem
          key={index}
          isActive={isActive(step.title)}
          isCompleted={isCompleted(step.title)}
        >
          <div className="indicator">
            <div className="indicator__circle"></div>
            <div className="indicator__line" />
          </div>
          <div className="content">
            <div className="title">{step.title}</div>
            <p className="detail">{step.detail}</p>
          </div>
        </ListItem>
      ))}
    </ul>
  );
}

interface StyledProps {
  isActive: boolean;
  isCompleted: boolean;
}
function getStyling(props: StyledProps) {
  if (props.isActive) {
    return {
      borderColor: 'var(--color-primary)',
      background: 'var(--color-primary-20)',
      titleColor: 'var(--color-neutralBlack)',
      textColor: 'var(--color-gray-80)',
      lineStyle: 'dashed',
    };
  }

  if (props.isCompleted) {
    return {
      borderColor: 'var(--color-primary-40);',
      background: 'var(--color-primary-40)',
      lineStyle: 'solid',
      titleColor: 'var(--color-gray-60)',
      textColor: 'var(--color-gray-60)',
    };
  }

  return {
    borderColor: 'var(--color-gray-60)',
    background: '',
    lineStyle: 'dashed',
    titleColor: 'var(--color-gray-60)',
    textColor: 'var(--color-gray-60)',
  };
}
const ListItem = styled.li`
  display: flex;
  gap: ${pxToRem(20)};
  .indicator {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__circle {
      width: ${pxToRem(18)};
      height: ${pxToRem(18)};
      border-radius: 50%;
      background: ${(styledProps: StyledProps) =>
        getStyling(styledProps).background};
      border: ${(styledProps: StyledProps) =>
        `2px solid ${getStyling(styledProps).borderColor}`};
    }

    &__line {
      height: ${pxToRem(86)};
      border: ${(styledProps: StyledProps) =>
        `${pxToRem(1)} ${getStyling(styledProps).lineStyle} ${
          getStyling(styledProps).borderColor
        }`};
    }
  }

  .content {
    max-width: ${pxToRem(280)};
    .title {
      font-family: 'thiccboi-semibold';
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: ${pxToRem(16)};
      margin-bottom: ${pxToRem(4)};
      color: ${(styledProps: StyledProps) =>
        getStyling(styledProps).titleColor};
    }
    .detail {
      font-style: normal;
      font-weight: 400;
      font-size: ${pxToRem(16)};
      line-height: ${pxToRem(24)};
      color: ${(styledProps: StyledProps) => getStyling(styledProps).textColor};
    }
  }

  &:last-child {
    .indicator {
      &__line {
        display: none;
      }
    }
  }
`;
