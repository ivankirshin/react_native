import { ModalActions, ModalState } from 'src/store/modal/types';

const initialState: ModalState = {
  auth: { isShow: false },
};

const modalReducer = (state = initialState, action: ModalActions): ModalState => {
  switch (action.type) {
    case 'modal/SHOW_MODAL_AUTH':
      return { ...state, auth: { isShow: true, message: action.message, onClose: action.onClose } };
    case 'modal/CLOSE_MODAL_AUTH':
      return { ...state, auth: { isShow: false } };

    default:
      return state;
  }
};

export default modalReducer;
