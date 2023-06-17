import React, { lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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
const UiAvatar = lazy(() => import('ui/UiAvatar'));
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
    <UiModal isVisible={isVisible} onClose={onClose}>
      <RatingsHeader>Rate Trip</RatingsHeader>
      <Paragraph>
        Rate your trip to earn bonuses on your next trip and improve the user
        experience for yourself and other users
      </Paragraph>
      <User>
        <UiAvatar avatar={trip?.transporter?.avatar} />
        <div>
          {trip?.transporter?.firstName} {trip?.transporter?.lastName}
        </div>
      </User>
      <UiField label="Rate Transporter">
        <Ratings
          rating={data.starRating}
          isActive
          onRate={(i) => fillForm({ name: 'starRating', value: i })}
        />
      </UiField>
      <br />
      <UiTextArea
        label="How was your experience? (optional)"
        value={data.comment || ''}
        name="comment"
        onChange={fillForm}
      />
      <UiButton loading={loading} onClick={publishRating}>
        Publish Rating
      </UiButton>
    </UiModal>
  );
}

const RatingsHeader = styled.h2`
  font-size: 16px;
  color: var(--color-gray-700);
`;

const Paragraph = styled.p``;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  color: var(--color-grau-500);
`;
