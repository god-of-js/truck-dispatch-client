import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  issueMessage: Yup.string().required(isRequiredMessage),
});
