type ShowModalAuthArgs = { message?: string; onClose?: () => void };
export const showModalAuth = ({ message, onClose }: ShowModalAuthArgs = {}) =>
  ({
    type: 'modal/SHOW_MODAL_AUTH',
    message,
    onClose,
  } as const);

export const closeModalAuth = () =>
  ({
    type: 'modal/CLOSE_MODAL_AUTH',
  } as const);

export default {
  showModalAuth,
  closeModalAuth,
};
