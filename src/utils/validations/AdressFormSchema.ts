import * as Yup from 'yup';
import { isEmail, isRequiredMessage } from './validationVariables';

export default Yup.object({
  homeAddress: Yup.string().required(isRequiredMessage),
  garageAddress: Yup.string().required(isRequiredMessage),
  officeAddress: Yup.string().required(isRequiredMessage),
  homeUtilityBill: Yup.mixed().required(isRequiredMessage),
});
