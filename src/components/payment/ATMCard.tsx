import { RootState } from 'modules/index';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { abbreviateNumber } from 'utils/helpers';
interface Props {
  isActive?: boolean;
  title?: string;
  value?: number;
  variant?: CardVariant;
}
type CardVariant = 'primary' | 'info' | 'warning';
interface VariantComponents {
  bgColor: string;
  bigCircle: string;
  smCircle: string;
}
const variants: Record<CardVariant, VariantComponents> = {
  primary: {
    bgColor: '--color-primary',
    bigCircle:
      'linear-gradient(226deg, #9747FF 23.09%, rgba(151, 71, 255, 0.00) 89.87%)',
    smCircle: '--color-primary-50',
  },
  info: {
    bgColor: '--color-info',
    bigCircle:
      'linear-gradient(226deg, #4394CB 23.09%, rgba(67, 148, 203, 0.00) 89.87%)',
    smCircle: '--color-info-60',
  },
  warning: {
    bgColor: '--color-warning-60',
    bigCircle:
      'linear-gradient(226deg, #f9c437 23.09%, rgba(249, 196, 55, 0.00) 89.87%)',
    smCircle: '--color-warning-50',
  },
};
export default function ATMCard({
  title,
  value,
  variant = 'primary',
  isActive = true,
}: Props) {
  const user = useSelector((state: RootState) => state.account.user);
  return (
    <ATMCardStyling isActive={isActive} variant={variant}>
      <div>
        <div className="big-top-circle circle" />
        <div className="centered-circle" />
        <div className="bottom-circle circle" />
      </div>
      <div className="card-content">
        <span className="balance-title">{title || 'Balance'}</span>
        <span className="balance-value">
          &#8358; {abbreviateNumber(value || 0)}
        </span>
        <span className="user-name">{`${user?.firstName} ${user?.lastName}`}</span>
      </div>
    </ATMCardStyling>
  );
}

const ATMCardStyling = styled.div<{ isActive: boolean; variant: CardVariant }>`
  background-color: ${({ variant }) => `var(${variants[variant].bgColor})`};
  ${({ isActive }) => !isActive && 'opacity: 0.5;'}
  min-height: ${pxToRem(180)};
  overflow: hidden;
  position: relative;
  z-index: 1;
  height: ${pxToRem(100)};
  border-radius: ${pxToRem(10)};
  background-size: 100%;
  color: #fff;

  .big-top-circle {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: -5%;
    margin-top: -10%;
    background: ${({ variant }) => variants[variant].bigCircle};
    width: ${pxToRem(155)};
    height: ${pxToRem(155)};
    border-radius: 50%;
  }
  .bottom-circle {
    background: ${({ variant }) => `var(${variants[variant].smCircle})`};
    width: ${pxToRem(100)};
    height: ${pxToRem(100)};
    position: absolute;
    z-index: 0;
    border-radius: 50%;
    bottom: 0;
    left: 0;
    margin-bottom: -15%;
    left: -15%;
  }
  .centered-circle {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
    background: ${({ variant }) => `var(${variants[variant].smCircle})`};
    border-radius: 50%;
    position: absolute;
    top: 68%;
    left: 60%;
    transform: translate(-68%, -60%);
  }
  .card-content {
    padding: ${pxToRem(26)} ${pxToRem(13)};
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 5;
    position: absolute;

    .balance-value {
      font-style: normal;
      font-weight: 600;
      font-size: ${pxToRem(32)};
      color: var(--color-primary-10);
    }

    .balance-title {
      font-style: normal;
      font-weight: 600;
      font-size: ${pxToRem(16)};
      line-height: ${pxToRem(16)};
      color: var(--color-primary-10);
    }

    .user-name {
      font-style: normal;
      font-weight: 600;
      font-size: ${pxToRem(14)};
      line-height: ${pxToRem(26)};
      color: var(--color-primary-10);
      text-transform: capitalize;
    }
  }
`;
