import { RootState } from 'modules/index';
import { selectBid } from 'modules/Bid';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Trip from 'types/Trip';
import Ratings from 'components/ratings/Ratings';
import UiAvatar from 'ui/UiAvatar';
import UiButton from 'ui/UiButton';
import { abbreviateNumber, priceWithTDPercent } from 'utils/helpers';
import sizes from 'utils/sizes';

export default function ViewTripBidPage() {
  const { bidId, tripId } = useParams();
  const bid = useSelector(selectBid(bidId as string));
  const users = useSelector((state: RootState) => state.account.users);
  const user = useSelector((state: RootState) => state.account.user);

  function getUser(userId: string) {
    return users.find(({ _id }) => userId === _id) || null;
  }

  useEffect(() => {
    if (!bidId) {
      //   TODO: handle 400 if bidId is not sent.
    }
  }, []);

  return (
    <>
      <PageStyling>
        <CardContainer>
          <Heading>View Bid Details</Heading>
          <Section>
            <div className="title">Transporter</div>
            <div className="value">
              <TransporterDetails>
                <UiAvatar avatar={bid?.transporter.avatar} />
                <span>{`${bid?.transporter.firstName} ${bid?.transporter.lastName}`}</span>
              </TransporterDetails>
            </div>
          </Section>
          <Section>
            <div className="title">Transporter Ratings</div>
            <div className="value">
              <Ratings rating={bid?.transporter.rating || 0} />
            </div>
          </Section>
          {/* TODO: implement number of completed trips */}
          {/* <Section>
          <div className="title">Number of completed trips</div>
          <div className="value">
            {noOfTransporterTrips} completed trips
            <></>
          </div>
        </Section> */}
          <Section>
            <div className="title">Price of trip</div>
            <div className="value">
              &#8358;{abbreviateNumber(priceWithTDPercent(bid?.price!))}
            </div>
          </Section>
          <Section>
            <div className="title">Truck's present location</div>
            <div className="value">{bid?.presentLocation}</div>
          </Section>
          <Section>
            <div className="title">Extra Notes</div>
            <div className="value">{bid?.extraNotes || 'N/A'}</div>
          </Section>
          <SubmitButtonContainer className="submit-button-container">
            <Link to={`/chat/${user?._id}/${bid?.transporterId}`}>
              <UiButton variant="neutral">Negotiate Bid</UiButton>
            </Link>
            <Link to={`/my-trips/${tripId}/bids/${bidId}/checkout`}>
              <UiButton>Accept Bid</UiButton>
            </Link>
          </SubmitButtonContainer>
        </CardContainer>
      </PageStyling>
    </>
  );
}

const PageStyling = styled.div`
  padding: 0 ${pxToRem(20)};
`;
const CardContainer = styled.div`
  background: #ffffff;
  width: 90%;
  margin: auto;
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 70%;
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 50%;
  }
`;

const Heading = styled.h2`
  color: var(--color-gray-600);
  font-size: ${pxToRem(16)};
  margin: ${pxToRem(28)} 0;
`;
const Section = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: ${pxToRem(8)};
  font-size: ${pxToRem(16)};
  margin-bottom: ${pxToRem(24)};

  .title {
    color: var(--color-gray-400);
  }

  .value {
    color: var(--color-gray-600);
  }

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    flex-direction: row;
    .title {
      width: 35%;
    }

    .value {
      width: 65%;
    }
  }
`;
const TransporterDetails = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  justify-content: flex-end;
  padding-top: ${pxToRem(12)};
`;
