export default interface CreateVehicleData {
  plateNumber: string;
  vehicleType: string;
  images: {
    frontView: File | null | string;
    backView: File | null | string;
    leftSideView: File | null | string;
    rightSideView: File | null | string;
    driversCockPit: File | null | string;
    backInnerView: File | null | string;
  };
  driver: {
    name: string;
    phone: string;
    driverLicense: File | null | string;
    avatar: File | null | string;
  };
}
