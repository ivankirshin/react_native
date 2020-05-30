import actions from 'src/store/modal/actions';
import { InferActions } from 'src/store/types';

export type ModalState = {
  auth: {
    isShow: boolean;
    message?: string;
    onClose?(): void;
  };
};

export type ModalActions = InferActions<typeof actions>;
