import * as Yup from 'yup';
import {
  isRequiredMessage,
  isNumberMessage,
  isEmail,
} from './validationVariables';

export default Yup.object({
  email: Yup.string().email(isEmail).required(isRequiredMessage),
  firstName: Yup.string().required(isRequiredMessage),
  lastName: Yup.string().required(isRequiredMessage),
  phone: Yup.string().required(isRequiredMessage),
});
