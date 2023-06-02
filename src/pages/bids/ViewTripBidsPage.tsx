import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { abbreviateNumber, priceWithTDPercent } from 'utils/helpers';

import UiTable from 'ui/UiTable';
import { RootState } from 'modules/index';
import Bid from 'types/Bid';
import UiAvatar from 'ui/UiAvatar';
import Ratings from 'components/ratings/Ratings';

export default function ViewTripBidsPage() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const bids = useSelector((state: RootState) => state.bid.bids);
  const headers = [
    {
      title: 'Transporter',
      query: 'transporter',
    },
    {
      title: 'Price of trip',
      query: 'price',
    },
    {
      title: 'Transporter Ratings',
      query: 'rating',
    },
    {
      title: 'No. of Completed Trips',
      query: 'completedTrips',
    },
    {
      title: 'Truck Present Location',
      query: 'presentLocation',
    },
  ];

  function viewBid(bidId: string) {
    navigate(`/my-trips/${tripId}/bids/${bidId}`);
  }

  const bidsData = useMemo(() => {
    return bids.map((bid: Bid) => ({
      ...bid,
      price: <>&#8358; {abbreviateNumber(priceWithTDPercent(bid.price))}</>,
      transporter: (
        <TransporterDetails>
          <UiAvatar avatar={bid.transporter.avatar} />
          <span>{`${bid.transporter.firstName} ${bid.transporter.lastName}`}</span>
        </TransporterDetails>
      ),
      rating: <Ratings rating={bid.transporter.rating || 0} />,
      completedTrips: bid.transporter.completedTrips,
    }));
  }, [bids]);

  return (
    <>
      <PageStyling>
        <UiTable
          data={bidsData}
          headers={headers}
          tableTitle="Bids by transporters"
          onRowClick={viewBid}
        />
      </PageStyling>
    </>
  );
}

const PageStyling = styled.div`
  padding: 0 ${pxToRem(20)};
`;

const TransporterDetails = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};
`;
