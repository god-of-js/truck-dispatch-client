import React, { lazy, useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import styled from 'styled-components';
import { toAnyAction } from 'utils/helpers';
import { getUserDetailsById } from 'modules/Account';
import User from 'types/User';
import { getBidsWithTripId, selectBid } from 'modules/Bid';

import DashboardTopNav from 'components/layout/DashboardTopNav';
import UserFullProfile from 'types/UserFullProfile';
import Loader from 'components/layout/Loader';
const UiBackButton = lazy(() => import('ui/UiBackButton'));
const TransporterProfile = lazy(
  () => import('components/bids/TransporterProfile'),
);

export default function TransporterProfilePage() {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [fetchedUser, setFetchedUser] = useState<UserFullProfile>();
  const [loading, setLoading] = useState(false);

  function messageUser() {}

  function loadUser() {
    setLoading(true);
    if (userId) {
      dispatch(toAnyAction(getUserDetailsById(userId)))
        .then((data: UserFullProfile) => {
            setFetchedUser(data)
            console.log(data)
        })
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <DashboardTopNav
        routeName="Transporter Profile"
        startNode={<UiBackButton text="Go back" />}
      />
      {loading && <Loader />}
      {fetchedUser && (
        <TransporterProfilePageStyle>
          <TransporterProfile user={fetchedUser} messageUser={messageUser} />
        </TransporterProfilePageStyle>
      )}
    </>
  );
}

const TransporterProfilePageStyle = styled.div`
  margin: ${pxToRem(28)} 0;
  padding: 0 ${pxToRem(24)};
`;
