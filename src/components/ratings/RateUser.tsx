import React, { lazy, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as AppLogo } from '../../assets/logo.svg';
import { selectTrip } from 'modules/Trips';
import { toAnyAction } from 'utils/helpers';

import Rating from 'types/Rating';
import { RootState } from 'modules/index';
import { clientBasedUserTypes } from 'utils/constants';
import { publishUserRating } from 'modules/Ratings';

const UiModal = lazy(() => import('ui/UiModal'));
const UiButton = lazy(() => import('ui/UiButton'));
const Ratings = lazy(() => import('./Ratings'));
const UiField = lazy(() => import('ui/UiField'));
const UserDetails = lazy(() => import('ui/UserDetails'));
const UiTextArea = lazy(() => import('ui/UiTextArea'));

interface Props {
  onClose: () => void;
  isVisible: boolean;
}
export default function RateTransporter({ onClose, isVisible }: Props) {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const trip = useSelector(selectTrip(tripId || ''));
  const user = useSelector((state: RootState) => state.account.user);

  const [data, setData] = useState({
    comment: '',
    userRated: '',
    userRating: user?._id,
    starRating: 0,
    tripId: tripId!,
  });
  const [loading, setLoading] = useState(false);

  const alternateUser = useMemo(() => {
    if (trip?.tripOwner._id === user?._id) {
      return trip?.transporter;
    }

    return trip?.tripOwner;
  }, [trip, user]);
  function fillForm({ name, value }: { name: string; value: string | number }) {
    setData((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }
  function publishRating() {
    setLoading(true);
    let userRated: string;
    if (clientBasedUserTypes.includes(user?.userType!)) {
      userRated = trip?.transporter?._id!;
    } else userRated = trip?.tripOwner?._id!;

    Promise.all([
      dispatch(
        toAnyAction(publishUserRating({ ...data, userRated } as Rating)),
      ),
    ]).finally(() => {
      onClose();
      setLoading(false);
    });
  }

  return (
    <UiModal
      isVisible={isVisible}
      position="center"
      title="Rate Trip"
      onClose={onClose}
      size="lg"
    >
      <ModalStyle>
        <RatingHeader>
          <div className="logo-container">
            <AppLogo />
            <span className="app-name hide-in-unexpanded-large-screen">
              TruckDispatch
            </span>
          </div>

          <p>
            Rate your trip to earn bonuses on your next trip and improve the
            user experience for yourself and other <br /> agents.
          </p>

          <UserRateComponent>
            <div className="user-details">
              <div className="field-title">DRIVER RESPONSIBLE</div>
              <UserDetails
                userName={`${alternateUser?.firstName} ${alternateUser?.lastName}`}
                avatar={alternateUser?.avatar}
                showViewProfile
              />
            </div>
            <div>
              <div className="field-title">RATINGS</div>
              <Ratings
                rating={data.starRating}
                isActive
                onRate={(i) => fillForm({ name: 'starRating', value: i })}
              />
            </div>
          </UserRateComponent>
        </RatingHeader>

        <br />
        <UiTextArea
          label="How was your experience? (Optional)"
          value={data.comment || ''}
          name="comment"
          onChange={fillForm}
          placeholder="Add notes about your trip experience."
        />
        <div className="rate-user-button">
          <UiButton
            type="button"
            size="large"
            loading={loading}
            onClick={publishRating}
          >
            Publish Rating
          </UiButton>
        </div>
      </ModalStyle>
    </UiModal>
  );
}

const ModalStyle = styled.div`
  padding: ${pxToRem(24)};

  .rate-user-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 26px;
  }
`;

const RatingHeader = styled.div`
  background-color: var(--color-primary-10);
  padding: ${pxToRem(24)} ${pxToRem(24)};
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(8)};
  border-radius: ${pxToRem(8)};

  .logo-container {
    display: flex;
    gap: ${pxToRem(8)};
    justify-content: start;
    align-items: center;
    font-style: normal;
    font-weight: 700;
    font-size: ${pxToRem(16)};
    letter-spacing: -0.02em;
    color: var(--color-black);
  }

  p {
    font-style: normal;
    font-weight: 700;
    font-size: ${pxToRem(24)};
    line-height: ${pxToRem(34)};
    letter-spacing: -0.02em;
    color: #15131b;
    width: ${pxToRem(598)};
    height: ${pxToRem(102)};
    padding: 0 ${pxToRem(13)};
  }

  .field-title {
    font-style: normal;
    color: var(--color-gray-70);
    font-size: ${pxToRem(12)};
    line-height: ${pxToRem(17)};
    letter-spacing: ${pxToRem(0.5)};
    margin-bottom: ${pxToRem(8)};
  }

  .user-details {
    display: grid;
    gap: ${pxToRem(4)};
  }
`;

const UserRateComponent = styled.div`
  background: #ffffff;
  padding: ${pxToRem(8)};
  display: grid;
  gap: ${pxToRem(16)};
  border-radius: ${pxToRem(8)};
  width: fit-content;
  min-width: ${pxToRem(340)};
`;
