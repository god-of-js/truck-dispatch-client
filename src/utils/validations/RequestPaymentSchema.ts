import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  driverPhoneNumber: Yup.string().required(isRequiredMessage),
  driverName: Yup.string().required(isRequiredMessage),
  containerVideo: Yup.mixed().required(isRequiredMessage),
});
