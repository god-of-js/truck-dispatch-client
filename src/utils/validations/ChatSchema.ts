import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  message: Yup.string()
    .required(isRequiredMessage)
    .matches(
      /^(?!.*(\+?\d{1,3}[- ]?)?\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d).*$/,
      'Message must not contain Phone numbers, account numbers, e.t.c.',
    ),
});
