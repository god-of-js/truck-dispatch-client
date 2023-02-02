import axios from 'axios';
import Api from './index';
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dh8mksait/image/upload';

const urls: string[] = [];

function uploadItem(file: File): Promise<string> {
  return new Promise((resolve) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mib8y8vc');

    return axios
      .post(CLOUDINARY_UPLOAD_URL, formData)
      .then((response) => {
        urls.push(response.data.url);
        Api.saveAsset(response.data.url);
        return resolve(response.data.url);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  });
}

async function upload(files: File[]): Promise<string[]> {
  const promises: Promise<string>[] = [];
  files.forEach((file) => promises.push(uploadItem(file)));
  await Promise.all(promises);

  return urls;
}

export { upload, uploadItem };
