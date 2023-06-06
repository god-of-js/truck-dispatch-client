import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { abbreviateNumber, priceWithTDPercent } from 'utils/helpers';

import UiTable from 'ui/UiTable';
import { RootState } from 'modules/index';
import Bid from 'types/Bid';
import UiAvatar from 'ui/UiAvatar';
import Ratings from 'components/ratings/Ratings';
import DashboardTopNav from 'components/layout/DashboardTopNav';
import UiBackButton from 'ui/UiBackButton';
import TripBidItem from 'components/bids/TripBidItem';

export default function TripBidsPage() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const bids = useSelector((state: RootState) => state.bid.bids);
  useEffect(() => {
    console.log(bids);
  }, [bids]);
  function viewBid(bidId: string) {
    // navigate(`/my-trips/${tripId}/bids/${bidId}`);
  }

  return (
    <>
      <DashboardTopNav
        routeName="Transporter Bids"
        startNode={<UiBackButton />}
      />

      <PageStyling>
        {bids.map((bid) => (
          <TripBidItem bid={bid} key={bid._id} />
        ))}
      </PageStyling>
    </>
  );
}

const PageStyling = styled.div`
  margin: ${pxToRem(32)} 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToRem(20)};
`;
