import { toast as _toast } from "react-toastify";

import { Toast, ToastProps } from "./Toast";

export const useToast = () => {
  const showToast = (options: ToastProps) => {
    _toast(<Toast />, options);
  };

  return { showToast };
};
