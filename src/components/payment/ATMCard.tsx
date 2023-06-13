import { RootState } from 'modules/index';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { abbreviateNumber } from 'utils/helpers';
interface Props {
  isActive: boolean;
}
export default function ATMCard({ isActive }: Props) {
  const user = useSelector((state: RootState) => state.account.user);
  return (
    <ATMCardStyling isActive={isActive}>
      <div>
        <div className="big-top-circle circle" />
        <div className="centered-circle" />
        <div className="bottom-circle circle" />
      </div>
      <div className="card-content">
        <span className="balance-title">Balance</span>
        <span className="balance-value">
          &#8358; {abbreviateNumber(user?.balance || 0)}
        </span>
        <span className="user-name">{`${user?.firstName} ${user?.lastName}`}</span>
      </div>
    </ATMCardStyling>
  );
}

const ATMCardStyling = styled.div<{ isActive: boolean }>`
  background-color: var(--color-primary);
  ${({ isActive }) => !isActive && 'opacity: 0.5;'}
  min-height: ${pxToRem(180)};
  overflow: hidden;
  position: relative;
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
    background: linear-gradient(
      225.55deg,
      #9747ff 23.09%,
      rgba(151, 71, 255, 0) 89.87%
    );
    width: ${pxToRem(155)};
    height: ${pxToRem(155)};
    border-radius: 50%;
  }
  .bottom-circle {
    background: var(--color-primary-50);
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
    background: var(--color-primary-50);
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
