import React, { lazy, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toAnyAction } from 'utils/helpers';
import { getUserDetailsById } from 'modules/Account';

import DashboardTopNav from 'components/layout/DashboardTopNav';
import UserFullProfile from 'types/UserFullProfile';
import Loader from 'components/layout/Loader';

const UiBackButton = lazy(() => import('ui/UiBackButton'));
const UserProfile = lazy(() => import('components/user/UserProfile'));

export default function TransporterProfilePage() {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [fetchedUser, setFetchedUser] = useState<UserFullProfile>();
  const [loading, setLoading] = useState(false);

  function loadUser() {
    setLoading(true);
    if (userId) {
      dispatch(toAnyAction(getUserDetailsById(userId)))
        .then((data: UserFullProfile) => {
          setFetchedUser(data);
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
        routeName="User Profile"
        startNode={<UiBackButton text="Go back" />}
      />
      {loading && <Loader />}
      {fetchedUser && (
        <UserProfilePageStyle>
          <UserProfile user={fetchedUser} />
        </UserProfilePageStyle>
      )}
    </>
  );
}

const UserProfilePageStyle = styled.div`
  margin: ${pxToRem(28)} 0;
  padding: 0 ${pxToRem(24)};
`;
