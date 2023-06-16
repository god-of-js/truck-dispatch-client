import styled from 'styled-components';
import Trip from 'types/Trip';
import UiButton from 'ui/UiButton';
import UiModal from 'ui/UiModal';
import { useSelector } from 'react-redux';
import { selectBid } from 'modules/Bid';
import TripDetails from 'components/trips/TripDetails';

interface Props {
  job: Trip;
  bidOnJob: (jobId: string) => void;
  onClose: () => void;
  isVisible: boolean;
}
export default function ViewJobDetail({
  job,
  onClose,
  bidOnJob,
  isVisible,
}: Props) {
  const bid = useSelector(selectBid(job._id, 'trip'));
  function startBid() {
    bidOnJob(job._id);
  }

  return (
    <UiModal
      isVisible={isVisible}
      title="Job Details"
      position="right"
      onClose={onClose}
    >
      <ComponentStyling>
        <TripDetails trip={job} />

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
  padding:32px 24px;
  .bid-button-container {
    width: 100%;
    margin-top:60px;

    button {
      margin: auto;
      width: 50%;
    }
  }
`;
