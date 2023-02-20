import * as Yup from 'yup';
import { isEmail, isRequiredMessage } from './validationVariables';

export default Yup.object({
  idType: Yup.string().required(isRequiredMessage),
  idDoc: Yup.mixed().required(isRequiredMessage),
  homeAddress: Yup.string().required(isRequiredMessage),
  garageAddress: Yup.string().required(isRequiredMessage),
  officeAddress: Yup.string().required(isRequiredMessage),
  homeUtilityBill: Yup.mixed().required(isRequiredMessage),
  guarantor: Yup.object({
    name: Yup.string().required(isRequiredMessage),
    email: Yup.string().email(isEmail).required(isRequiredMessage),
    phone: Yup.string().required(isRequiredMessage),
    homeAddress: Yup.string().required(isRequiredMessage),
    idType: Yup.string().required(isRequiredMessage),
    idDoc: Yup.mixed().required(isRequiredMessage),
  })
});
