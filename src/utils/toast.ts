import { toast } from 'react-hot-toast';

export interface ToastProps {
  msg: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

const toastStyle = {
  style: {
    fontSize: '14px',
    borderRadius: '0px',
  },
};
export const Toast = {
  success: ({ msg, position = 'bottom-left' }: ToastProps) =>
    toast.success(msg, {
      position,
      ...toastStyle,
    }),

  error: ({ msg, position = 'bottom-left' }: ToastProps) =>
    toast.error(msg, { position, ...toastStyle }),
  warn: ({ msg, position = 'bottom-left' }: ToastProps) =>
    toast.custom(msg, {
      position,
      ...toastStyle,
    }),
};
