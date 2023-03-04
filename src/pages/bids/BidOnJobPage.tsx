import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { aValueHasBeenChanged, toAnyAction } from 'utils/helpers';
import styled from 'styled-components';

import sizes from 'utils/sizes';
import uuidv4 from 'utils/uuid';
import { Toast } from 'utils/toast';
import { selectDashboardUser } from 'modules/Account';
import { getBidsWithTripId, selectBid, createOrUpdateBid } from 'modules/Trips';
import Bid from 'types/Bid';
import NotFoundError from 'components/errors/NotFoundError';
import Loader from 'components/layout/Loader';
import UiBackButton from 'ui/UiBackButton';
import UiButton from 'ui/UiButton';
import UiForm from 'ui/UiForm';
import UiInput from 'ui/UiInput';
import UiLocationsInput from 'ui/UiLocationsInput';
import BidForJobSchema from 'utils/validations/BidForJobSchema';
import UiTextArea from 'ui/UiTextArea';
import BidCreationSuccessful from 'components/bids/BidCreationSuccessful';
import UiOverlay from 'ui/UiOverlay';

export default function BidOnJob() {
  const { tripId } = useParams();
  const user = useSelector(selectDashboardUser);
  const bid = useSelector(selectBid(user?.id || '', 'transporterId'));
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Bid>(
    bid || {
      price: NaN,
      presentLocation: '',
      extraNotes: '',
      id: uuidv4(),
      transporterId: user?.id || '',
      tripId: '',
      status: 'pending',
      driverName: '',
      truckPlateNumber: '',
    },
  );
  const [
    isBidCreationSuccessfulModalVisible,
    setIsBidCreationSuccessfulModalVisible,
  ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const disableButton = useMemo(() => {
    return aValueHasBeenChanged<Bid>(bid!, formData);
  }, [bid, formData]);

  function sendJobBid() {
    setLoading(true);
    dispatch(toAnyAction(createOrUpdateBid({ ...formData, tripId: tripId! })))
      .then(() => {
        if (!formData.tripId) {
          setIsBidCreationSuccessfulModalVisible(true);
        } else Toast.success({ msg: 'Bid has been updated successfully' });
        setFormData((state) => ({ ...state, tripId: tripId! }));
        dispatch(toAnyAction(getBidsWithTripId(tripId!)));
      })
      .catch((e: Error) => {
        Toast.error({
          msg:
            e.message ||
            'Something went wrong. The team has been notified and would get back to you shortly.',
        });
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
    if (!tripId) {
      setNotFound(true);
    }

    if (bid && !formData.tripId) setFormData(bid);
    if (tripId && !bid) {
      dispatch(toAnyAction(getBidsWithTripId(tripId))).finally(() =>
        setPageLoading(false),
      );
    } else setPageLoading(false);
  }, [bid]);

  return (
    <BidOnJobPageStyle>
      <UiBackButton />
      <CardContainer>
        {pageLoading ? (
          <Loader />
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
                      value={formData.presentLocation!}
                      error={errors.presentLocation}
                      onChange={setValues}
                    />
                  </GridContainer>
                  <GridContainer>
                    <UiInput
                      name="driverName"
                      value={formData.driverName}
                      label="Driver Name"
                      error={errors.driverName}
                      onChange={setValues}
                    />
                    <UiInput
                      label="Truck Plate Number"
                      name="truckPlateNumber"
                      value={formData.truckPlateNumber}
                      error={errors.truckPlateNumber}
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
                    <UiButton loading={loading} disabled={disableButton}>
                      {bid ? 'Update Bid' : 'Send Bid to Agent'}
                    </UiButton>
                  </div>
                </>
              )}
            </UiForm>
          </>
        )}
      </CardContainer>
      <UiOverlay isVisible={isBidCreationSuccessfulModalVisible}>
        <BidCreationSuccessful
          onClose={() => setIsBidCreationSuccessfulModalVisible(false)}
        />
      </UiOverlay>
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
