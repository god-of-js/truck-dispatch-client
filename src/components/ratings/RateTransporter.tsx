import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { publishUserRating, selectTransporter } from 'modules/Account';
import { selectTrip } from 'modules/Trips';

import UiAvatar from 'ui/UiAvatar';
import UiModal from 'ui/UiModal';
import UiTextArea from 'ui/UiTextArea';
import Ratings from './Ratings';
import UiButton from 'ui/UiButton';
import UiField from 'ui/UiField';
import uuidv4 from 'utils/uuid';
import { toAnyAction } from 'utils/helpers';
import Rating from 'types/Rating';
import { compileUserRating } from 'modules/Ratings';
import { Toast } from 'utils/toast';

interface Props {
  onClose: () => void;
}
export default function RateTransporter({ onClose }: Props) {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const trip = useSelector(selectTrip(tripId || ''));
  const transporter = useSelector(selectTransporter(trip?.transporterId || ''));
  const [data, setData] = useState<Rating>({
    comment: '',
    transporterId: trip?.transporterId || '',
    rating: 0,
    id: uuidv4(),
    tripId: trip?._id || '',
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
    Promise.all([
      dispatch(toAnyAction(publishUserRating(data))),
      dispatch(toAnyAction(compileUserRating(data.transporterId))),
    ])
      .then(() => {
        Toast.success({
          msg: 'Thank you for the rating. We would look into how we can improve through your reviews.',
        });
      })
      .finally(() => {
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
        <UiAvatar avatar={transporter?.avatar} />
        <div>
          {transporter?.firstName} {transporter?.lastName}
        </div>
      </User>
      <UiField label="Rate Transporter" name="rating">
        <Ratings
          rating={data.rating}
          isActive
          onRate={(i) => fillForm({ name: 'rating', value: i })}
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
