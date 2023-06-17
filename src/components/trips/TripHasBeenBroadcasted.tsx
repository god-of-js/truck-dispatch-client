import { lazy } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BroadCasted } from '../../assets/img/broadcast.svg';

const UiModal = lazy(() => import('ui/UiModal'));
const UiButton = lazy(() => import('ui/UiButton'));

interface Props {
  onClose: () => void;
  tripId: string;
  isVisible: boolean;
}
export default function TripHasBeenBroadcasted({
  tripId,
  onClose,
  isVisible,
}: Props) {
  return (
    <UiModal
      isVisible={isVisible}
      title="Broadcasted Trip"
      size="md"
      onClose={onClose}
    >
      <ComponentLayout>
        <BroadCasted />
        <h4>Your trip has been broadcasted</h4>
        <p>
          Your trip has been broadcasted to trusted transporters in our network.
          It usually takes a couple minutes to get matched with transporters.
          Expect several transporters to send bids on the trip you just created.
          You can view bids sent by transporters by clicking the button below.
          Thank you for trusting us with your dispatch.
        </p>
        <div className="btn-container">
          <Link to={`/my-trips/${tripId}/bids`}>
            <UiButton size="large">View Trip Bids</UiButton>
          </Link>
        </div>
      </ComponentLayout>
    </UiModal>
  );
}

const ComponentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding:32px 62px;

  h4 {
    font-family: 'thiccboi-bold';
    font-style: normal;
    font-weight: 700;
    font-size:24px;
    line-height: 140%;
    letter-spacing: -0.02em;
    color: var(--color-neutralBlack);
    margin-top:32px;
    margin-bottom:16px;
    padding: 0;
  }
  p {
    margin: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: var(--color-neutralBlack);
  }

  .btn-container {
    margin-top:40px;
  }
`;
