import axios from 'axios';
import {
  CLOUDINARY_IMAGE_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_VIDEO_UPLOAD_URL,
} from 'utils/privateKeys';
import { Toast } from 'utils/toast';

function uploadItem(file: File, isImage = true): Promise<string> {
  return new Promise((resolve) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    return axios
      .post(
        isImage ? CLOUDINARY_IMAGE_UPLOAD_URL : CLOUDINARY_VIDEO_UPLOAD_URL,
        formData,
      )
      .then((response) => {
        const fileUrl = response.data.secure_url;
        return resolve(fileUrl);
      })
      .catch((err) => {
        Toast.error({ msg: err.response.data.error.message });
      });
  });
}

export { uploadItem };
