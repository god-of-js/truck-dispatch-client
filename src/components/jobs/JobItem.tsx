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
        <div className="field-item header-container">
          <div>
            <div className="field-name">Type of Goods</div>
            <div className="type-of-goods-value">{job.typeOfGoods}</div>
          </div>
          <div>
            <div className="field-name bid">Proposed Price</div>
            <div className="type-of-goods-value">
              {job.proposedPrice
                ? `NGN ${job.proposedPrice?.toLocaleString()}`
                : 'N/A'}
            </div>
          </div>
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
  max-width: ${pxToRem(332)};
  border-radius: ${pxToRem(16)};
  overflow: hidden;
  background: #ffffff;
  width: 100%;
  font-weight: 600;
  font-size: ${pxToRem(16)};

  @media screen and (min-width: ${sizes.mobileSmall}) {
    min-width: ${pxToRem(320)};
  }

  header {
    background: var(--color-primary-10);
    padding: ${pxToRem(24)};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${pxToRem(12)};

    .user-profile {
      display: flex;
      align-items: center;
      gap: ${pxToRem(8)};

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
    font-size: ${pxToRem(10)};
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
    font-size: ${pxToRem(16)};
    text-transform: capitalize;
  }

  .field-item {
    border-bottom: ${pxToRem(1)} solid var(--color-gray);
    padding: ${pxToRem(0)} 0 ${pxToRem(16)} 0;
  }

  .job-body {
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(16)};
    padding: ${pxToRem(16)} ${pxToRem(24)} ${pxToRem(24)} ${pxToRem(24)};
  }

  .date-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${pxToRem(16)};

  & button:last-child {
    flex-grow: 1;
  }
`;
