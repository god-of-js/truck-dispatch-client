import React, { useState }  from "react"

import UiBackButton from "ui/UiBackButton"
import NewTripForm from "components/trips/NewTripForm";

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { RootState } from "modules/index";
import { selectTrip } from "modules/Trips";
import Trip from "types/Trip";
import { toAnyAction } from "utils/helpers";
import { createOrUpdateTrip } from "modules/Trips";

export default function EditTripPage () {
    const { tripId } = useParams();
    const dispatch = useDispatch()
    const trip = tripId && useSelector(selectTrip(tripId));
    const trips = useSelector((state: RootState) => state.trips.trips);

    const [formData] = useState<Trip>(trip as Trip);
    const [loading, setLoading] = useState(false);
    function  onEditTrip ()  {
        const uptrip = dispatch(toAnyAction(createOrUpdateTrip(formData))).then(()=>{
            console.log(uptrip);
            console.log(trip);
            
        })
        return uptrip
    }
    return(
        <div>
            <UiBackButton />
            <NewTripForm defaultFormData={formData} nextHandler={onEditTrip}/>
        </div>
    )
}