import * as Yup from 'yup';
import { isRequiredMessage, isNumberMessage } from './validationVariables';

export default Yup.object({
  bankCode: Yup.string().required(isRequiredMessage),
  accountNumber: Yup.number()
    .required(isRequiredMessage)
    .typeError(isNumberMessage),
  account_name: Yup.string().required('Account name has not been fetched.'),
});
