import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  password: Yup.string().required(isRequiredMessage).min(8),
  cPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required(isRequiredMessage),
});
