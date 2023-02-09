import * as Yup from 'yup';
import { isRequiredMessage, isNumberMessage } from './validationVariables';

export default Yup.object({
  price: Yup.number().required(isRequiredMessage).typeError(isNumberMessage),
  presentLocation: Yup.string().required(isRequiredMessage),
});
