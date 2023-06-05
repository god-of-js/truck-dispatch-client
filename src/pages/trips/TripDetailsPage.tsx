import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectTrip } from 'modules/Trips';

export default function TripDetailsPage() {
  const { tripId } = useParams();
  const trip = tripId ? useSelector(selectTrip(tripId)) : null;

  return (
    <>
    </>
  );
}
