import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  reasonForReject: Yup.string().required(isRequiredMessage),
});
