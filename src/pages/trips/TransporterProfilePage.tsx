import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import UiBackButton from 'ui/UiBackButton';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import TransporterProfile from 'components/bids/TransporterProfile';
import styled from 'styled-components';

export default function TransporterProfilePage() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.account.user);
  const bids = useSelector((state: RootState) => state.bid.bids);
  const { tripId, bidId } = useParams();
  // const trip = useSelector(selectTrip(tripId!!));
  const [searchQuery, setSearchQuery] = useState('');
  // const jobs = useSelector((state: RootState) => state.trips.jobs);

  const bid = useMemo(() => {
    return bids.find(({ _id }) => _id === bidId);
  }, [tripId, bids]);

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
      `/chat?transporterId=${chosenBid?.transporter._id}&clientId=${user?._id}`,
    );
  }

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
      {bid && (
        <TransporterProfilePageStyle>
          <TransporterProfile
            job={bid}
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
