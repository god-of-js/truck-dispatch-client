import userEvent from '@testing-library/user-event';
import NotFoundError from 'components/errors/NotFoundError';
import Loader from 'components/layout/Loader';
import { RootState } from 'modules/index';
import { getBidsWithTripId, selectBid, submitBid } from 'modules/Trips';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Bid from 'types/Bid';
import MessageWithImage from 'ui/MessageWithImage';
import UiBackButton from 'ui/UiBackButton';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import UiLocationsInput from 'ui/UiLocationsInput';
import UiTextArea from 'ui/UiTextArea';
import { toAnyAction } from 'utils/helpers';
import sizes from 'utils/sizes';
import uuidv4 from 'utils/uuid';
import BidForJobSchema from 'utils/validations/BidForJobSchema';

export default function BidOnJob() {
  const { tripId } = useParams();
  const user = useSelector((state: RootState) => state.account.user);
  const bid = useSelector(selectBid(user?.id || '', 'transporterId'));

  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Bid>({
    price: NaN,
    presentLocation: '',
    extraNotes: '',
    id: uuidv4(),
    transporterId: user?.id || '',
    tripId: tripId || '',
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [hasSentBid, setHasSentBid] = useState(false);
  const [notFound, setNotFound] = useState(false);

  function sendJobBid() {
    setLoading(true);
    dispatch(toAnyAction(submitBid(formData)))
      .then(() => {
        setHasSentBid(true);
      })
      .catch((e: Error) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  }

  function setValues(event: { name: string; value: string | null }) {
    setFormData((state) => ({
      ...state,
      [event.name]: event.value,
    }));
  }

  useEffect(() => {
    //   Handle 404.
    if (!tripId) {
      setNotFound(true);
    }
    if (tripId) {
      dispatch(toAnyAction(getBidsWithTripId(tripId))).finally(() =>
        setPageLoading(false),
      );
    }
  });

  return (
    <BidOnJobPageStyle>
      <UiBackButton />
      <CardContainer>
        {pageLoading ? (
          <Loader />
        ) : hasSentBid || !!bid ? (
          <MessageWithImage
            title="Bid has been sent"
            subtitle={`Your bid has been sent to the agent; The team would reach out to you via text or call if you are selected by the agent for this dispatch`}
          />
        ) : notFound ? (
          <NotFoundError />
        ) : (
          <>
            <h2>Bid on Job</h2>
            <UiForm
              formData={formData}
              schema={BidForJobSchema}
              onSubmit={sendJobBid}
            >
              {({ errors }) => (
                <>
                  <GridContainer>
                    <UiInput
                      name="price"
                      value={formData.price}
                      label="Price Of Trip(in Naira)"
                      type="number"
                      error={errors.price}
                      onChange={setValues}
                    />
                    <UiLocationsInput
                      label="Present Truck Location"
                      name="presentLocation"
                      error={errors.presentLocation}
                      onChange={setValues}
                    />
                  </GridContainer>
                  <UiTextArea
                    name="extraNotes"
                    value={formData.extraNotes || ''}
                    label="Extra Notes(optional)"
                    onChange={setValues}
                  />
                  <div className="button-container">
                    <UiButton loading={loading}>Send Bid to Agent</UiButton>
                  </div>
                </>
              )}
            </UiForm>
          </>
        )}
      </CardContainer>
    </BidOnJobPageStyle>
  );
}

const BidOnJobPageStyle = styled.div`
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

  .button-container {
    display: flex;
    justify-content: flex-end;
    padding-top: ${pxToRem(12)};
  }
  @media only screen and (min-width: ${sizes.tabletSmallWidth}) {
    width: 70%;
  }
  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    width: 50%;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: ${pxToRem(12)};
  margin-bottom: ${pxToRem(12)};

  @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
    grid-template-columns: auto auto;
  }
`;
