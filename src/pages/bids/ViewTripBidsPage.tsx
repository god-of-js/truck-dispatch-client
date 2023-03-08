import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { abbreviateNumber } from 'utils/helpers';

import UiTable from 'ui/UiTable';
import { RootState } from 'modules/index';
import Bid from 'types/Bid';
import UiAvatar from 'ui/UiAvatar';
import Ratings from 'components/ratings/Ratings';

export default function ViewTripBidsPage() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const bids = useSelector((state: RootState) => state.trips.bids);
  const users = useSelector((state: RootState) => state.account.users);

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
    // {
    //   title: 'No. of Completed Trips',
    //   query: 'price',
    // },
    {
      title: 'Truck Present Location',
      query: 'presentLocation',
    },
  ];

  function viewBid(bidId: string) {
    navigate(`/dashboard/my-trips/${tripId}/bids/${bidId}`);
  }

  function getUser(userId: string) {
    return users.find(({ id }) => userId === id) || null;
  }

  const bidsData = useMemo(() => {
    return bids.map((bid: Bid) => ({
      ...bid,
      price: <>&#8358; {abbreviateNumber(bid.price)}</>,
      transporter: (
        <TransporterDetails>
          <UiAvatar avatar={getUser(bid.transporterId)?.avatar}/>
          <span>{`${getUser(bid.transporterId)?.firstName} ${
            getUser(bid.transporterId)?.lastName
          }`}</span>
        </TransporterDetails>
      ),
      rating: <Ratings rating={getUser(bid.transporterId)?.rating || 0} />,
    }));
  }, [bids]);

  return (
    <PageStyling>
      <UiTable
        data={bidsData}
        headers={headers}
        tableTitle="Bids by transporters"
        onRowClick={viewBid}
      />
    </PageStyling>
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
