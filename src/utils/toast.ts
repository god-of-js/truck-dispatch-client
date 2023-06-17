import { toast } from 'react-hot-toast';

export interface ToastProps {
  msg: string;
  position?:
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right'
    | 'top-center';
}

const toastStyle = {
  style: {
    fontSize: '14px',
    borderRadius: '5px',
  },
};
export const Toast = {
  success: ({ msg, position = 'top-center' }: ToastProps) =>
    toast.success(msg, {
      position,
      ...toastStyle,
    }),

  error: ({ msg, position = 'top-center' }: ToastProps) =>
    toast.error(msg, { position, ...toastStyle }),
  warn: ({ msg, position = 'top-center' }: ToastProps) =>
    toast.custom(msg, {
      position,
      ...toastStyle,
    }),
};
