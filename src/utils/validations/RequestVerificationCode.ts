import * as Yup from 'yup';
import { isRequiredMessage, isNumberMessage } from './validationVariables';

export default Yup.object({
  phone: Yup.number().required(isRequiredMessage).typeError(isNumberMessage),
});
