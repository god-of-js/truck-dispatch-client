import axios from 'axios';
import {
  CLOUDINARY_IMAGE_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_VIDEO_UPLOAD_URL,
} from 'utils/privateKeys';
import { Toast } from 'utils/toast';
import Asset from '../types/Asset';
import uuid from '../utils/uuid';
import Api from './index';

const urls: Asset[] = [];

function uploadItem(file: File, isImage = true): Promise<Asset> {
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
        const assetId = uuid();
        const fileUrl = response.data.secure_url;
        console.log(fileUrl);
        Api.saveAsset(assetId, fileUrl);
        return resolve({
          id: assetId,
          url: fileUrl,
        });
      })
      .catch((err) => {
        Toast.error({ msg: err.response.data.error.message });
      });
  });
}

async function upload(files: File[]): Promise<Asset[]> {
  const promises: Promise<Asset>[] = [];
  files.forEach((file) => promises.push(uploadItem(file)));
  await Promise.all(promises);

  return urls;
}

export { upload, uploadItem };
