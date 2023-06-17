import { useSelector } from 'react-redux';
import { selectBid } from 'modules/Bid';
import styled from 'styled-components';
import { convertToDdMmmYYYYDateFormat } from 'utils/helpers';
import sizes from 'utils/sizes';
import Trip from 'types/Trip';

import { lazy } from 'react';

const UiIcon = lazy(() => import('ui/UiIcon'));
const UiButton = lazy(() => import('ui/UiButton'));
const UiAvatar = lazy(() => import('ui/UiAvatar'));
const TripPickupAndDropOff = lazy(
  () => import('components/trips/TripPickupAndDropOff'),
);

interface Props {
  job: Trip;
  bidForJob: (jobId: string) => void;
  viewJobDetail: (jobId: string) => void;
}
export default function JobItem({ job, bidForJob, viewJobDetail }: Props) {
  const bid = useSelector(selectBid(job._id, 'trip'));

  return (
    <JobItemStyling>
      <header>
        {/* TODO: switch to UserDetails component */}
        <div className="user-profile">
          <UiAvatar avatar={job.tripOwner?.avatar} isHalfCurved />
          <div>
            <div className="user-name">{`${job.tripOwner?.lastName} ${job.tripOwner?.firstName}`}</div>
            <div className="field-name">{job.tripOwner?.userType}</div>
          </div>
        </div>
      </header>

      <div className="job-body">
        <div className="field-item">
          <div className="field-name">Type of Goods</div>
          <div className="type-of-goods-value">{job.typeOfGoods}</div>
        </div>

        <div className="field-item">
          <TripPickupAndDropOff
            pickup={job.pickUpAddress}
            dropOff={job.deliveryAddress}
          />
        </div>

        <div className="field-item date-container">
          <div>
            <div className="field-name">PickUp date</div>
            <div className="field-value">
              {convertToDdMmmYYYYDateFormat(job.pickUpDate)}
            </div>
          </div>
          <UiButton variant="icon-neutral" disabled>
            <UiIcon icon="ArrowRight" />
          </UiButton>

          <div>
            <div className="field-name">Delivery date</div>
            <div className="field-value">
              {convertToDdMmmYYYYDateFormat(job.deliveryDate)}
            </div>
          </div>
        </div>

        <SubmitButtonContainer className="submit-button-jobitemstyling">
          <UiButton onClick={() => bidForJob(job._id)}>
            {bid ? 'Update Bid' : 'bid now'}
          </UiButton>
          <UiButton variant="secondary" onClick={() => viewJobDetail(job._id)}>
            View full Details
          </UiButton>
        </SubmitButtonContainer>
      </div>
    </JobItemStyling>
  );
}

const JobItemStyling = styled.div`
  max-width:332px;
  border-radius:16px;
  overflow: hidden;
  background: #ffffff;
  width: 100%;
  font-weight: 600;
  font-size:16px;

  @media screen and (min-width: ${sizes.mobileSmall}) {
    min-width:320px;
  }

  header {
    background: var(--color-primary-10);
    padding:24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap:12px;

    .user-profile {
      display: flex;
      align-items: center;
      gap:8px;

      .user-name {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 140%;
        text-transform: capitalize;
        color: var(--color-gray-80);
        letter-spacing: -0.02em;
      }
    }
  }

  .field-name {
    text-transform: uppercase;
    font-style: normal;
    font-weight: 400;
    font-size:10px;
    color: var(--color-gray-70);
    line-height: 140%;
    letter-spacing: 0.05em;
  }

  .field-value {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
  }

  .type-of-goods-value {
    font-size:16px;
    text-transform: capitalize;
  }

  .field-item {
    border-bottom:1px solid var(--color-gray);
    padding:0px 0 16px 0;
  }

  .job-body {
    display: flex;
    flex-direction: column;
    gap:16px;
    padding:16px 24px 24px 24px;
  }

  .date-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap:16px;

  & button:last-child {
    flex-grow: 1;
  }
`;
