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
    padding: 10px;
    justify-content: center;
  `}
`;

const ListItem = styled.li`
  width: 100%;
  ${({ hasNoDetail }: ListItemProps) => hasNoDetail && 'max-width:150px;'}

  .indicator {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__circle {
      min-width: 16px;
      min-height: 16px;
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
        width: 12px;
        height: 12px;
        fill: white;
      }
    }

    &__line {
      width: 90px;
      width: 100%;
      border: ${(listItemProps: ListItemProps) =>
        `1px ${getStyling(listItemProps).lineStyle} ${
          getStyling(listItemProps).borderColor
        }`};
    }
  }
  .content {
    display: none;
  }

  &:last-child {
    max-width: 8px;
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
    gap:20px;
    .indicator {
      flex-direction: column;
      &__line {
        height:90px;
        width: 0;
      }
    }

    .content {
      max-width:280px;
      display: block;
      .title {
        font-family: 'thiccboi-semibold';
        font-style: normal;
        font-weight: 600;
        font-size:18px;
        line-height:16px;
        margin-bottom:4px;
        color: ${(listItemProps: ListItemProps) =>
          getStyling(listItemProps).titleColor};
      }
      .detail {
        font-style: normal;
        font-family: 'thiccboi-regular';
        font-weight: 400;
        font-size: 16px;
        line-height:24px;
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
