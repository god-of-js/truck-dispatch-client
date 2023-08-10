import * as Yup from 'yup';
import { isEmail, isRequiredMessage } from './validationVariables';

export default Yup.object({
  idType: Yup.string().required(isRequiredMessage),
  idPhoto: Yup.string().required(isRequiredMessage),
  idDoc: Yup.mixed().required(isRequiredMessage),
});
