const isDev = import.meta.env.MODE === 'development'
export const paystackPublickKey = import.meta.env.VITE_PAYSTACK_PRIVATE_KEY;

export const paystackPrivateKey = isDev ? import.meta.env.VITE_PAYSTACK_PRIVATE_KEY : import.meta.env.VITE_VERCEL_CLOUDINARY_VIDEO_UPLOAD_URL;

export const CLOUDINARY_IMAGE_UPLOAD_URL = import.meta.env.VITE_VERCEL_ENV_CLOUDINARY_IMAGE_UPLOAD_URL;
export const CLOUDINARY_VIDEO_UPLOAD_URL = import.meta.env.REACT_APP_VERCEL_ENV_CLOUDINARY_VIDEO_UPLOAD_URL;
