import { lazy, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Trip from 'types/Trip';
import { useDispatch, useSelector } from 'react-redux';
import { selectBid } from 'modules/Bid';
import { getJob, selectJob } from 'modules/Trips';
import { toAnyAction } from 'utils/helpers';
import Loader from 'components/layout/Loader';
import PageError from 'components/errors/PageError';

const UiButton = lazy(() => import('ui/UiButton'));
const UiModal = lazy(() => import('ui/UiModal'));
const TripDetails = lazy(() => import('components/trips/TripDetails'));

interface Props {
  jobId: string;
  bidOnJob: (jobId: string) => void;
  onClose: () => void;
  isVisible: boolean;
}
export default function ViewJobDetail({
  jobId,
  onClose,
  bidOnJob,
  isVisible,
}: Props) {
  const bid = useSelector(selectBid(jobId, 'trip'));
  const jobInState = useSelector(selectJob(jobId));
  const [fetchedJob, setFetchedJob] = useState<Trip>();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const job = useMemo<Trip | undefined>(() => {
    return jobInState || fetchedJob;
  }, [jobInState, fetchedJob]);

  function startBid() {
    bidOnJob(jobId);
  }

  useEffect(() => {
    if (!jobInState) {
      setLoading(true);
      dispatch(toAnyAction(getJob(jobId)))
        .then((job: Trip) => {
          setFetchedJob(job);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [jobId]);

  return (
    <UiModal
      isVisible={isVisible}
      title="Job Details"
      position="right"
      onClose={onClose}
    >
      <ComponentStyling>
        {loading && <Loader />}
        {job && (
          <>
            <TripDetails trip={job} />
            <div className="bid-button-container">
              <UiButton size="large" onClick={startBid}>
                {bid ? 'Update Bid' : 'Bid Now'}
              </UiButton>
            </div>
          </>
        )}
        {!loading && !job && (
          <PageError
            errorCode={404}
            subtitle="Job was not found. Kindly request another link or select another job from the list."
            goToRoute="/available-jobs"
            buttonText="View other jobs"
            onBtnClick={onClose}
          />
        )}
      </ComponentStyling>
    </UiModal>
  );
}

const ComponentStyling = styled.div`
  padding: ${pxToRem(32)} ${pxToRem(24)};
  .bid-button-container {
    width: 100%;
    margin-top: ${pxToRem(60)};

    button {
      margin: auto;
      width: 50%;
    }
  }
`;
