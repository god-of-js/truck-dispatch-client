import axios from 'axios';
import {
  CLOUDINARY_IMAGE_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_VIDEO_UPLOAD_URL,
} from 'utils/privateKeys';
import { Toast } from 'utils/toast';
import uuidv4 from 'utils/uuid';

/**
 *
 * @param file This is the image, pdf or video being uploaded. it is of tile File
 * @param isImage this is used to cater for situations where we need to upload videos.
 * Cloudinary requires that we notify it of the type of file we are sending.
 * @returns url of image uploaded
 */
function uploadItem(file: File, isImage = true): Promise<string> {
  return new Promise((resolve) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const public_id = uuidv4();

    return axios
      .post(
        `${
          isImage ? CLOUDINARY_IMAGE_UPLOAD_URL : CLOUDINARY_VIDEO_UPLOAD_URL
        }?public_id=${public_id}`,
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
