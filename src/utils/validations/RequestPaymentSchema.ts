import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  proofVideo: Yup.mixed().required(isRequiredMessage),
});
