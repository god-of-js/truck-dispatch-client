import { RootState } from 'modules/index';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { abbreviateNumber } from 'utils/helpers';
import CardSVG from '../../assets/img/card-balance.svg';

export default function ATMCard() {
  const user = useSelector((state: RootState) => state.account.user);
  return (
    <ATMCardStyling>
      <span>Balance</span>
      <span>&#8358; {abbreviateNumber(user?.balance || 0)}</span>
      <span>{`${user?.firstName} ${user?.lastName}`}</span>
    </ATMCardStyling>
  );
}

const ATMCardStyling = styled.div`
  min-height: ${pxToRem(180)};
  width: 100%;
  height: 100%;
  border-radius: ${pxToRem(10)};
  padding: ${pxToRem(26)} ${pxToRem(13)};
  background-size: 100%;
  background-image: url(${CardSVG});
  background-repeat: no-repeat;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
