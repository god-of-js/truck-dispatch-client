import React, { lazy } from 'react';
import styled from 'styled-components';
import sizes from 'utils/sizes';

const UiIcon = lazy(() => import('./UiIcon'));
export interface Step {
  title: string;
  detail?: string;
  isSkipped?: boolean;
}
interface Props {
  steps: Step[];
  currentStepTitle: string;
  noDetail?: boolean;
}
export default function UiSteps({ steps, currentStepTitle, noDetail }: Props) {
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
    <List noDetail={noDetail}>
      {steps.map((step, index) => (
        <ListItem
          key={index}
          isActive={isActive(step.title)}
          isCompleted={isCompleted(step.title)}
          isSkipped={step.isSkipped}
          hasNoDetail={noDetail}
        >
          <div className="indicator">
            <div className="indicator__circle">
              {isCompleted(step.title) && !step.isSkipped && (
                <UiIcon icon="Check" />
              )}
            </div>
            <div className="indicator__line" />
          </div>
          <div className="content">
            <div className="title">{step.title}</div>
            <p className="detail">{step.detail}</p>
          </div>
        </ListItem>
      ))}
    </List>
  );
}

interface ListItemProps {
  isActive: boolean;
  isCompleted: boolean;
  isSkipped?: boolean;
  hasNoDetail?: boolean;
}
function getStyling(props: ListItemProps) {
  if (props.isActive) {
    return {
      borderColor: 'var(--color-primary)',
      background: 'var(--color-primary-20)',
      titleColor: 'var(--color-neutralBlack)',
      textColor: 'var(--color-gray-80)',
      lineStyle: 'dashed',
    };
  }

  if (props.isCompleted && !props.isSkipped) {
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
    background: 'var(--color-primary-10)',
    lineStyle: 'dashed',
    titleColor: 'var(--color-gray-60)',
    textColor: 'var(--color-gray-60)',
  };
}

const List = styled.ul`
  display: flex;
  align-items: center;
  ${({ noDetail }: { noDetail?: boolean }) =>
    !noDetail
      ? `
  justify-content: space-between;

  @media (min-width: ${sizes.tablet}) {
    flex-direction: column;
  }
  `
      : `
    background: var(--color-primary-10);
    padding: ${pxToRem(10)};
    justify-content: center;
  `}
`;

const ListItem = styled.li`
  width: 100%;
  ${({ hasNoDetail }: ListItemProps) =>
    hasNoDetail && `max-width: ${pxToRem(150)};`}

  .indicator {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__circle {
      min-width: ${pxToRem(16)};
      min-height: ${pxToRem(16)};
      border-radius: 50%;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${(listItemProps: ListItemProps) =>
        getStyling(listItemProps).background};
      border: ${(listItemProps: ListItemProps) =>
        `2px solid ${getStyling(listItemProps).borderColor}`};

      svg {
        width: ${pxToRem(12)};
        height: ${pxToRem(12)};
        fill: white;
      }
    }

    &__line {
      width: ${pxToRem(90)};
      width: 100%;
      border: ${(listItemProps: ListItemProps) =>
        `${pxToRem(1)} ${getStyling(listItemProps).lineStyle} ${
          getStyling(listItemProps).borderColor
        }`};
    }
  }
  .content {
    display: none;
  }

  &:last-child {
    max-width: ${pxToRem(8)};
    .indicator {
      flex-direction: row-reverse;
      &__line {
        display: none;
      }
    }
  }
  ${({ hasNoDetail }: ListItemProps) =>
    !hasNoDetail &&
    `
  @media (min-width: ${sizes.tablet}) {
    display: flex;
    gap: ${pxToRem(20)};
    .indicator {
      flex-direction: column;
      &__line {
        height: ${pxToRem(90)};
        width: 0;
      }
    }

    .content {
      max-width: ${pxToRem(280)};
      display: block;
      .title {
        font-family: 'thiccboi-semibold';
        font-style: normal;
        font-weight: 600;
        font-size: ${pxToRem(18)};
        line-height: ${pxToRem(16)};
        margin-bottom: ${pxToRem(4)};
        color: ${(listItemProps: ListItemProps) =>
          getStyling(listItemProps).titleColor};
      }
      .detail {
        font-style: normal;
        font-family: 'thiccboi-regular';
        font-weight: 400;
        font-size: ${pxToRem(16)};
        line-height: ${pxToRem(24)};
        color: ${(listItemProps: ListItemProps) =>
          getStyling(listItemProps).textColor};
      }
    }
    &:last-child {
      min-width: 100%;
      .indicator {
        flex-direction: column;
        &__line {
          display: none;
        }
      }
    }
  }`}
`;
