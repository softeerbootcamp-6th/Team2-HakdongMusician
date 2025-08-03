// packages/ui/src/components/Modal/Modal.tsx

import * as Dialog from "@radix-ui/react-dialog";
import {
  overlayStyle,
  contentStyle,
  titleStyle,
  hidden,
  type ContentVariants,
} from "./Modal.css";
import { ReactNode } from "react";

export type ModalProps = ContentVariants & {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, position, children }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Overlay className={overlayStyle} />
      <Dialog.DialogTitle className={hidden}>title</Dialog.DialogTitle>
      <Dialog.DialogDescription className={hidden}>
        hiddenDescription
      </Dialog.DialogDescription>
      <Dialog.Content className={contentStyle({ position })}>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};
