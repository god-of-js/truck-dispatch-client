const isDev = import.meta.env.MODE === 'development';
export const paystackPublickKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export const paystackPrivateKey = import.meta.env.VITE_PAYSTACK_PRIVATE_KEY;

export const CLOUDINARY_IMAGE_UPLOAD_URL = import.meta.env
  .VITE_CLOUDINARY_IMAGE_UPLOAD_URL;
export const CLOUDINARY_VIDEO_UPLOAD_URL = import.meta.env
  .VITE_CLOUDINARY_VIDEO_UPLOAD_URL;
