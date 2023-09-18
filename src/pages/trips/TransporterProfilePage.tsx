import React, { lazy, useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import styled from 'styled-components';
import { toAnyAction } from 'utils/helpers';
import { getUserDetails } from 'modules/Account';
import User from 'types/User';
import { getBidsWithTripId, selectBid } from 'modules/Bid';

import DashboardTopNav from 'components/layout/DashboardTopNav';
const UiBackButton = lazy(() => import('ui/UiBackButton'));
const TransporterProfile = lazy(
  () => import('components/bids/TransporterProfile'),
);

export default function TransporterProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bids = useSelector((state: RootState) => state.bid.bids);
  const { tripId, bidId } = useParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [fetchedUser, setFetchedUser] = useState<User>();
  const [loading, setisLoading] = useState(false);

  const userId = useMemo(() => {
    const chosenBid = bids?.find(({ _id }) => _id === bidId);
    return chosenBid?.transporter._id;
  }, [bids, bidId]);

  function handleQueryChange({
    value,
  }: {
    name: string;
    value: string | null;
  }) {
    setSearchQuery(value!);
  }

  function negotiateBid(bidId: string) {
    const chosenBid = bids.find(({ _id }) => _id === bidId);
    navigate(
      `/chat?clientId=${fetchedUser?._id}&transporterId=${chosenBid?.transporter._id}`,
    );
  }

  function loadBids() {
    if (tripId) {
      dispatch(toAnyAction(getBidsWithTripId(tripId))).finally(() =>
        setisLoading(false),
      );
    }
  }

  function loadUser() {
    setisLoading(true);
    if (userId) {
      dispatch(toAnyAction(getUserDetails(userId)))
        .then((data: User) => setFetchedUser(data))
        .finally(() => setisLoading(false));
    }
  }

  useEffect(() => {
    loadBids();
  }, []);

  useEffect(() => {
    loadUser();
  }, [bids]);

  console.log(fetchedUser?.reviews);

  return (
    <>
      <DashboardTopNav
        routeName="Transporter Profile"
        startNode={
          <UiBackButton text="Go back" route={`/my-trips/${tripId}/bids`} />
        }
        searchQuery={searchQuery}
        handleQueryChange={handleQueryChange}
      />
      {fetchedUser && (
        <TransporterProfilePageStyle>
          <TransporterProfile
            user={fetchedUser}
            userId={`${userId}`}
            jobId={`${bidId}`}
            negotiate={negotiateBid}
          />
        </TransporterProfilePageStyle>
      )}
    </>
  );
}

const TransporterProfilePageStyle = styled.div`
  margin: ${pxToRem(28)} 0;
  padding: 0 ${pxToRem(24)};
`;
