import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  TDO: Yup.mixed().required(isRequiredMessage),
});
