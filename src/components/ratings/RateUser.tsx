import React, { lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as AppLogo } from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
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
    <UiModal
      isVisible={isVisible}
      position="center"
      title="Rate Trip"
      onClose={onClose}
      size="lg"
    >
      {/* <RatingsHeader>Rate Trip</RatingsHeader> */}
      <ModalStyle>
        <TopRating>
          <TopLogo>
            <span>
              <AppLogo />
            </span>
            <span className="app-name hide-in-unexpanded-large-screen">
              TruckDispatch
            </span>
          </TopLogo>

          <Paragraph>
            Rate your trip to earn bonuses on your next trip and improve the
            user experience for yourself and other <br /> agents.
          </Paragraph>

          <UserRateComponent>
            <UserDetailsTitle>DRIVER RESPONSIBLE</UserDetailsTitle>

            <User>
              <UiAvatar avatar={trip?.transporter?.avatar} />
              <div className="user-details">
                <span className="user-name">
                  {trip?.transporter?.firstName} {trip?.transporter?.lastName}
                </span>
                <span className="user-phone">{trip?.transporter?.phone}</span>
              </div>
              <div>
                <UiButton
                  size="s"
                  variant="secondary"
                  isFullWidth
                  loading={loading}
                >
                  VIEW PROFILE
                </UiButton>
              </div>
            </User>
            {/* style the rating label */}
            <UiField label="RATING">
              <Ratings
                rating={data.starRating}
                isActive
                onRate={(i) => fillForm({ name: 'starRating', value: i })}
              />
            </UiField>
          </UserRateComponent>
        </TopRating>

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
  border-radius: ${pxToRem(16)};
  display: flex;
  flex-direction: column;

  .rate-user-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 26px;
  }
`;

const TopRating = styled.div`
  background-color: var(--color-primary-10);
  padding: ${pxToRem(24)} ${pxToRem(24)};
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(8)};
`;

const TopLogo = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  justify-content: start;
  align-items: center;
  font-style: normal;
  font-weight: 700;
  font-size: ${pxToRem(16)};
  letter-spacing: -0.02em;
  color: var(--color-black);
`;

const Paragraph = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: ${pxToRem(24)};
  line-height: ${pxToRem(34)};
  letter-spacing: -0.02em;
  color: #15131b;
  width: ${pxToRem(598)};
  height: ${pxToRem(102)};
  padding: 0 ${pxToRem(13)};
`;

const UserRateComponent = styled.div`
  background: #ffffff;
  width: ${pxToRem(296)};
  height: ${pxToRem(143)};
  padding: ${pxToRem(8)};
  gap: ${pxToRem(16)};
  border-radius: ${pxToRem(8)};
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};
  color: var(--color-gray-500);

  .user-details {
    display: flex;
    flex-direction: column;

    .user-name {
      text-transform: uppercase;
      color: var(--color-black);
      font-size: ${pxToRem(14)};
      font-weight: 600;
      line-height: 140%;
      letter-spacing: ${pxToRem(-0.32)};
    }

    .user-phone {
      color: var(--color-gray-80);
      text-edge: cap;
      font-size: ${pxToRem(14)};
      line-height: 140%;
      letter-spacing: ${pxToRem(-0.28)};
    }
  }
`;

const UserDetailsTitle = styled.div`
  font-style: normal;
  color: var(--color-gray-70);
  font-size: ${pxToRem(12)};
  line-height: ${pxToRem(17)};
  leading-trim: both;
  text-edge: cap;
  letter-spacing: 0.05em;
`;
