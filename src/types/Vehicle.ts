export default interface Vehicle {
  plateNumber: string;
  vehicleType: string;
  images: string[];
  driver: {
    name: string;
    phone: string;
    driverLicense: string;
    avatar: string;
  };
}
