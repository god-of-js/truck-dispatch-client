import * as Yup from 'yup';
import { isNumberMessage, isRequiredMessage } from './validationVariables';

export default Yup.object({
  pickUpAddress: Yup.string().required(isRequiredMessage),
  deliveryAddress: Yup.string().required(isRequiredMessage),
  pickUpDate: Yup.string().required(isRequiredMessage),
  deliveryDate: Yup.string().required(isRequiredMessage),
  typeOfGoods: Yup.string().required(isRequiredMessage),

  sizeOfContainer: Yup.string().when('typeOfGoods', {
    is: 'container',
    then: Yup.string().required(isRequiredMessage),
  }),
  shippingLine: Yup.string().when('typeOfGoods', {
    is: 'container',
    then: Yup.string().required(isRequiredMessage),
  }),
  jobType: Yup.string().when('typeOfGoods', {
    is: 'container',
    then: Yup.string().required(isRequiredMessage),
  }),
  weight: Yup.number().required(isRequiredMessage).typeError(isNumberMessage),
});
