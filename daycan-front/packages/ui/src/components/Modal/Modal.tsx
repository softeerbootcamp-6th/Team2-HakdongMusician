// packages/ui/src/components/Modal/Modal.tsx

import * as Dialog from "@radix-ui/react-dialog";
import { overlayStyle, contentStyle, titleStyle, hidden } from "./Modal.css";
import { ReactNode } from "react";

export type ModalProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  container?: HTMLElement; // 포탈할 컨테이너 요소
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  container = document.getElementById("modal-root") as HTMLElement,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className={overlayStyle} />
        <Dialog.DialogTitle className={hidden}>title</Dialog.DialogTitle>
        <Dialog.DialogDescription className={hidden}>
          hiddenDescription
        </Dialog.DialogDescription>
        <Dialog.Content className={contentStyle}>{children}</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
