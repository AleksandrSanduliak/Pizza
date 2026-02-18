// import { toast } from 'react-toastify';

import { toast } from 'sonner';

// type TNotificationsArgs = {
//   message: string;
//   options?: object;
// };

// const NotificationFacade = {
//   toastSuccess: ({ message, options }: TNotificationsArgs) => {
//     toast.success(message, {
//       position: 'top-right',
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'light',
//       ...options,
//     });
//   },
//   toastError: ({ message, options }: TNotificationsArgs) => {
//     toast.error(message, {
//       position: 'top-right',
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'light',
//       ...options,
//     });
//   },
//   toastLoading: ({
//     message,
//     options,
//     toastId,
//   }: TNotificationsArgs & { toastId: React.MutableRefObject<string | number> }) => {
//     toastId.current = toast.loading(message, {
//       autoClose: false,
//       ...options,
//     });
//   },
//   toastSuccessPromise: ({
//     message,
//     options,
//     toastId,
//   }: TNotificationsArgs & { toastId: React.MutableRefObject<string | number> }) => {
//     toast.update(toastId.current, {
//       render: message,
//       type: 'success',
//       autoClose: 1000,
//       closeButton: true,
//       isLoading: false,
//       ...options,
//     });
//   },
//   toastErrorPromise: ({
//     message,
//     options,
//     toastId,
//   }: TNotificationsArgs & { toastId: React.MutableRefObject<string | number> }) => {
//     toast.update(toastId.current, {
//       render: message,
//       type: 'error',
//       autoClose: 1000,
//       closeButton: true,
//       isLoading: false,
//       ...options,
//     });
//   },
// };

type TNotificationsArgs = {
  message: string;
  options?: Parameters<typeof toast>[1];
};

const NotificationFacade = {
  toastSuccess: ({ message, options }: TNotificationsArgs) => {
    toast.success(message, {
      position: 'top-right',
      duration: 3000,
      ...options,
    });
  },

  toastError: ({ message, options }: TNotificationsArgs) => {
    toast.error(message, {
      position: 'top-right',
      duration: 5000,
      // action: {
      //   label: '',
      //   // onClick: (e) => e.stopPropagation(),
      // },
      ...options,
    });
  },

  toastLoading: ({
    message,
    options,
    toastId,
  }: TNotificationsArgs & { toastId: React.MutableRefObject<string | number> }) => {
    toastId.current = toast.loading(message, {
      duration: Infinity,
      ...options,
    });
  },

  toastSuccessPromise: ({
    message,
    options,
    toastId,
  }: TNotificationsArgs & { toastId: React.MutableRefObject<string | number> }) => {
    toast.dismiss(toastId.current);
    toast.success(message, {
      duration: 1000,
      ...options,
    });
  },

  toastErrorPromise: ({
    message,
    options,
    toastId,
  }: TNotificationsArgs & { toastId: React.MutableRefObject<string | number> }) => {
    toast.dismiss(toastId.current);
    toast.error(message, {
      duration: 1000,
      // action: {
      //   label: '',
      //   // onClick: (e) => e.stopPropagation(),
      // },
      ...options,
    });
  },
};
export default NotificationFacade;
