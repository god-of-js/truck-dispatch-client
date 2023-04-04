import * as Yup from 'yup';
import { isRequiredMessage, isNumberMessage } from './validationVariables';

export default Yup.object({
  pin: Yup.number()
    .required(isRequiredMessage)
    .test(
      'len',
      'Must be exactly 6 characters',
      (val) => `${val}`?.length === 6,
    )
    .typeError(isNumberMessage),
});
