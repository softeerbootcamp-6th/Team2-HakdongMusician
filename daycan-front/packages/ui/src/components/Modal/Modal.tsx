// packages/ui/src/components/Modal/Modal.tsx

import * as Dialog from "@radix-ui/react-dialog";
import { overlayStyle, contentStyle, titleStyle } from "./Modal.css";
import { ReactNode } from "react";

export type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Overlay className={overlayStyle} />
      <Dialog.DialogTitle className={titleStyle}>{title}</Dialog.DialogTitle>
      <Dialog.Content className={contentStyle}>{children}</Dialog.Content>
    </Dialog.Root>
  );
};
