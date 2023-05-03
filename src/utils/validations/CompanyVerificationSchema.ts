import * as Yup from 'yup';
import { isRequiredMessage, isNumberMessage } from './validationVariables';

export default Yup.object({
  isCompanyRegistered: Yup.string().required(isRequiredMessage),
  companyName: Yup.string().required(isRequiredMessage),
  companyLocation: Yup.string().required(isRequiredMessage),
  cacReference: Yup.string().required(isRequiredMessage),
  cacDocument: Yup.mixed().required(isRequiredMessage),
});
