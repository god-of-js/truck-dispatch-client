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
  min-height: 180px;
  overflow: hidden;
  position: relative;
  height: 100px;
  border-radius: 10px;
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
    width: 155px;
    height: 155px;
    border-radius: 50%;
  }
  .bottom-circle {
    background: var(--color-primary-50);
    width: 100px;
    height: 100px;
    position: absolute;
    z-index: 0;
    border-radius: 50%;
    bottom: 0;
    left: 0;
    margin-bottom: -15%;
    left: -15%;
  }
  .centered-circle {
    width: 20px;
    height: 20px;
    background: var(--color-primary-50);
    border-radius: 50%;
    position: absolute;
    top: 68%;
    left: 60%;
    transform: translate(-68%, -60%);
  }
  .card-content {
    padding: 26px 13px;
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 5;
    position: absolute;

    .balance-value {
      font-style: normal;
      font-weight: 600;
      font-size: 32px;
      color: var(--color-primary-10);
    }

    .balance-title {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 16px;
      color: var(--color-primary-10);
    }

    .user-name {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 26px;
      color: var(--color-primary-10);
      text-transform: capitalize;
    }
  }
`;
