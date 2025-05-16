import { toast } from 'react-toastify';

type TNotificationsArgs = {
  message: string;
  options?: object;
};

const NotificationFacade = {
  toastSuccess: ({ message, options }: TNotificationsArgs) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      ...options,
    });
  },
  toastError: ({ message, options }: TNotificationsArgs) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      ...options,
    });
  },
  toastLoading: ({
    message,
    options,
    toastId,
  }: TNotificationsArgs & { toastId: React.MutableRefObject<string | number> }) => {
    toastId.current = toast.loading(message, {
      autoClose: false,
      ...options,
    });
  },
  toastSuccessPromise: ({
    message,
    options,
    toastId,
  }: TNotificationsArgs & { toastId: React.MutableRefObject<string | number> }) => {
    toast.update(toastId.current, {
      render: message,
      type: 'success',
      autoClose: 1000,
      closeButton: true,
      isLoading: false,
      ...options,
    });
  },
  toastErrorPromise: ({
    message,
    options,
    toastId,
  }: TNotificationsArgs & { toastId: React.MutableRefObject<string | number> }) => {
    toast.update(toastId.current, {
      render: message,
      type: 'error',
      autoClose: 1000,
      closeButton: true,
      isLoading: false,
      ...options,
    });
  },
};

export default NotificationFacade;
