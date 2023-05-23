import styled from 'styled-components';
import Trip from 'types/Trip';
import UiAvatar from 'ui/UiAvatar';
import UiButton from 'ui/UiButton';
import UiDataField from 'ui/UiDataField';
import UiModal from 'ui/UiModal';
import TripPickUpAndDeliverWithDates from 'components/trips/TripPickUpAndDeliverWithDates';
import { useSelector } from 'react-redux';
import { selectBid } from 'modules/Bid';

interface Props {
  job: Trip;
  bidOnJob: (jobId: string) => void;
  onClose: () => void;
}
export default function ViewJobDetail({ job, onClose, bidOnJob }: Props) {
  const bid = useSelector(selectBid(job._id, 'trip'));
  function startBid() {
    bidOnJob(job._id);
  }

  return (
    <UiModal title="Job Details" position="right" onClose={onClose}>
      <ComponentStyling>
        <div className="user-profile">
          <div className="user-profile__content">
            <UiAvatar avatar={job.tripOwner?.avatar} isHalfCurved />
            <div>
              <div className="user-name">{`${job.tripOwner?.firstName} ${job.tripOwner?.lastName}`}</div>
              <div className="user-type">{job.tripOwnerUserType}</div>
            </div>
          </div>
          <UiButton variant="secondary">View Profile</UiButton>
        </div>
        <div className="detail-grid">
          <UiDataField title="Job Type" value={job.jobType} />
          <UiDataField title="Type" value={job.typeOfGoods} />
          <UiDataField title="Shipping Line" value={job.shippingLine} />
          <UiDataField title="Size Of Shipment" value={job.sizeOfContainer} />
          <UiDataField
            title="Weight"
            value={!!job.weight ? job.weight + ' Tonnes' : ''}
          />
          <UiDataField title="Truck Type" value={job.jobType} />
        </div>
        <TripPickUpAndDeliverWithDates
          pickUpAddress={job.pickUpAddress}
          pickUpDate={job.pickUpDate}
          deliveryAddress={job.deliveryAddress}
          deliveryDate={job.deliveryDate}
        />
        <UiDataField
          title="Handling instructions"
          value={job.instructions}
          variant="text-area"
        />
        <div className="bid-button-container">
          <UiButton size="large" onClick={startBid}>
            {bid ? 'Update Bid' : 'Bid Now'}
          </UiButton>
        </div>
      </ComponentStyling>
    </UiModal>
  );
}

const ComponentStyling = styled.div`
  padding: ${pxToRem(32)} ${pxToRem(24)};
  display: grid;
  gap: ${pxToRem(40)};
  padding-bottom: ${pxToRem(80)};
  margin-bottom: ${pxToRem(40)};

  .user-profile {
    display: flex;
    align-items: center;
    gap: ${pxToRem(24)};

    &__content {
      display: flex;
      align-items: center;
      gap: ${pxToRem(8)};

      .user-name {
        font-style: normal;
        font-weight: 600;
        font-size: ${pxToRem(16)};
        line-height: 140%;
        letter-spacing: -0.02em;
        color: var(--color-gray-80);
      }

      .user-type {
        font-style: normal;
        font-weight: 400;
        font-size: ${pxToRem(10)};
        line-height: 140%;

        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--color-gray-80);
      }
    }
  }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${pxToRem(12)};
  }

  .bid-button-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: ${pxToRem(40)} 0;

    button {
      margin: auto;
      width: 45%;
    }
  }
`;
