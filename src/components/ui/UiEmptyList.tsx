import { lazy } from 'react';
import styled from 'styled-components';
import { Icons } from './UiIcon';

const UiIcon = lazy(() => import('./UiIcon'));
const UiButton = lazy(() => import('./UiButton'));

interface Props {
  emptyIcon?: Icons;
  emptyText?: string;
  emptyBtnContent?: React.ReactNode;
  onActionButtonClick?: () => void; // Prop for triggering function from parent component
}

export default function UiEmptyList({
  emptyIcon,
  emptyBtnContent,
  emptyText,
  onActionButtonClick,
}: Props) {
  const handleActionButtonClick = () => {
    if (onActionButtonClick) {
      onActionButtonClick(); // Trigger the function from the parent component
    }
  };
  return (
    <EmptyField>
      <div className="empty-container">
        <div className="icon-container">
          <div className="icon-container__inner">
            <UiIcon icon={emptyIcon!} size="60" />
          </div>
        </div>
        <p>{emptyText}</p>
        {emptyBtnContent && (
          <UiButton size="large" onClick={handleActionButtonClick}>
            {emptyBtnContent}
          </UiButton>
        )}
      </div>
    </EmptyField>
  );
}

const EmptyField = styled.div`
  .empty-container {
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon-container {
      padding: ${pxToRem(32)};
      width: ${pxToRem(192)};
      height: ${pxToRem(192)};
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-gray-30);
      border-radius: 50%;

      &__inner {
        padding: ${pxToRem(32)};
        width: ${pxToRem(128)};
        height: ${pxToRem(128)};
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-gray-50);
        border-radius: 50%;
      }
    }
    p {
      font-style: normal;
      font-weight: 400;
      font-size: ${pxToRem(24)};
      line-height: 140%;
      text-align: center;
      letter-spacing: -0.02em;
      color: var(--color-gray-80);
      max-width: ${pxToRem(360)};
    }
  }
`;
