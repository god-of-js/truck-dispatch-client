import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  plateNumber: Yup.string().required(isRequiredMessage),
  driver: Yup.object({
    name: Yup.string().required(isRequiredMessage),
    phone: Yup.string().required(isRequiredMessage),
    driverLicense: Yup.string().required(isRequiredMessage),
    avatar: Yup.mixed().required(isRequiredMessage),
  }),
});
