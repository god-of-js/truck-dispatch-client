import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { selectTrip } from 'modules/Trips';
import { toAnyAction } from 'utils/helpers';

import UiAvatar from 'ui/UiAvatar';
import UiModal from 'ui/UiModal';
import UiTextArea from 'ui/UiTextArea';
import Ratings from './Ratings';
import UiButton from 'ui/UiButton';
import UiField from 'ui/UiField';
import Rating from 'types/Rating';
import { RootState } from 'modules/index';
import { clientBasedUserTypes } from 'utils/constants';
import { publishUserRating } from 'modules/Ratings';

interface Props {
  onClose: () => void;
}
export default function RateTransporter({ onClose }: Props) {
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
      userRated = trip?.transporterId!;
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
    <UiModal onClose={onClose}>
      <RatingsHeader>Rate Trip</RatingsHeader>
      <Paragraph>
        Rate your trip to earn bonuses on your next trip and improve the user
        experience for yourself and other agents
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
  font-size: ${pxToRem(16)};
  color: var(--color-gray-700);
`;

const Paragraph = styled.p``;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};
  padding: ${pxToRem(12)} 0;
  color: var(--color-grau-500);
`;
