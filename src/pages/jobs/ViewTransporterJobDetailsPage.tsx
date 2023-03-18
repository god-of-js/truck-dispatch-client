import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import Logo from '../../assets/img/truck-dispatch-logo-with-text.png';
import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';

import {
  getBidsWithTripId,
  getJobs,
  selectBid,
  selectJob,
} from 'modules/Trips';
import { RootState } from 'modules/index';
import UiBackButton from 'ui/UiBackButton';
import Loader from 'components/layout/Loader';
import ViewTripDetails from 'components/trips/ViewTripDetails';
import NotFoundError from 'components/errors/NotFoundError';

import UiOverlay from 'ui/UiOverlay';
import InformUserOfVerification from 'components/verification/InformUserOfVerification';

export default function ViewTransporterJobDetailsPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const job = tripId ? useSelector(selectJob(tripId)) : null;
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.account.user);
  const bid = useSelector(selectBid(user?.id || '', 'transporterId'));
  const dispatch = useDispatch();
  const [
    isInformUserOfVerificationModalVisible,
    setIsInformUserOfVerificationModalVisible,
  ] = useState(false);

  function bidForJob() {
    if (user?.status !== 'verified') {
      setIsInformUserOfVerificationModalVisible(true);
      return;
    }
    navigate(`/available-jobs/${tripId}/bid`);
  }

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    if (tripId) {
      Promise.all([
        (dispatch(toAnyAction(getJobs())),
        dispatch(toAnyAction(getBidsWithTripId(tripId)))),
      ]).finally(() => {
        setLoading(false);
      });
    }
  }, [bid]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Job details - TruckDispatch</title>
        <meta property="og:image" content={Logo} />
      </Helmet>
      <ViewTransporterJobPageStyle>
        <UiBackButton />
        {loading ? (
          <Loader />
        ) : (
          (job && (
            <CardContainer>
              <ViewTripDetails
                data={job}
                nextHandler={bidForJob}
                prevHandler={goBack}
                loading={loading}
                actionText={!!bid ? 'Edit Bid' : 'Bid For Job'}
              />
            </CardContainer>
          )) || <NotFoundError />
        )}
        <UiOverlay isVisible={isInformUserOfVerificationModalVisible}>
          <InformUserOfVerification
            onClose={() => setIsInformUserOfVerificationModalVisible(false)}
          />
        </UiOverlay>
      </ViewTransporterJobPageStyle>
    </>
  );
}

const ViewTransporterJobPageStyle = styled.div`
  padding: ${pxToRem(24)};
`;

const CardContainer = styled.div`
  background: #ffffff;
  width: 90%;
  margin: auto;
  margin-top: ${pxToRem(24)};
  border: 1px solid var(--color-gray-200);
  padding: ${pxToRem(20)};
  border-radius: ${pxToRem(8)};

  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 70%;
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 50%;
  }
`;
