import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  idType: Yup.string().required(isRequiredMessage),
  idDoc: Yup.mixed().required(isRequiredMessage),
  homeAddress: Yup.string().required(isRequiredMessage),
});
