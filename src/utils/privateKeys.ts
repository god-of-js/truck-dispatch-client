
const isDev = import.meta.env.MODE === 'development';
export const paystackPublickKey = isDev ? import.meta.env.VITE_PAYSTACK_PUBLIC_KEY : process.env;

export const paystackPrivateKey = isDev ? import.meta.env.VITE_PAYSTACK_PRIVATE_KEY : process.env.VITE_PAYSTACK_PRIVATE_KEY;

export const CLOUDINARY_IMAGE_UPLOAD_URL = isDev ? import.meta.env.VITE_CLOUDINARY_IMAGE_UPLOAD_URL : process.env.VITE_CLOUDINARY_IMAGE_UPLOAD_URL;
export const CLOUDINARY_VIDEO_UPLOAD_URL = isDev ? import.meta.env.VITE_CLOUDINARY_VIDEO_UPLOAD_URL : process.env.VITE_CLOUDINARY_VIDEO_UPLOAD_URL ;
