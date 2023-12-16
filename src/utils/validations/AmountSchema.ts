import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  amount: Yup.number().required(isRequiredMessage),
});
