import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  complaint: Yup.string().required(isRequiredMessage),
});
