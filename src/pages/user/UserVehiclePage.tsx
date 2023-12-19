import { useEffect, useState, lazy } from 'react';
import { getUserDetailsById } from 'modules/Account';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Vehicle from 'types/Vehicle';
import { toAnyAction } from 'utils/helpers';
import UserFullProfile from 'types/UserFullProfile';
import sizes from 'utils/sizes';

const DashboardTopNav = lazy(() => import('components/layout/DashboardTopNav'));
const UiBackButton = lazy(() => import('ui/UiBackButton'));
const Loader = lazy(() => import('components/layout/Loader'));
const VehicleItem = lazy(() => import('components/vehicles/VehicleItem'));

export default function UserVehiclePage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle[]>();

  function loadUser() {
    setLoading(true);
    if (userId) {
      dispatch(toAnyAction(getUserDetailsById(userId)))
        .then((data: UserFullProfile) => {
          setVehicle(data.vehicles);
        })
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <DashboardTopNav
        routeName="Transporter Profile/Vehicles"
        startNode={<UiBackButton text="Go back" />}
      />
      {loading && <Loader />}
      {vehicle && (
        <Vehicles>
          {vehicle.map((vehicle) => (
            <VehicleItem vehicle={vehicle} key={vehicle._id} />
          ))}
        </Vehicles>
      )}
    </>
  );
}

const Vehicles = styled.div`
  display: grid;
  gap: ${pxToRem(22)};
  padding: 0 ${pxToRem(24)};
  padding-top: ${pxToRem(32)};

  @media screen and (min-width: ${sizes.mobileSmall}) {
    display: flex;
    flex-wrap: wrap;
  }
`;
