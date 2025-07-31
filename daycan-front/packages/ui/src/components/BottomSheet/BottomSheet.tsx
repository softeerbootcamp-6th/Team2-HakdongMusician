import {
  overlay,
  bottomSheetBase,
  animateUp,
  animateDown,
  title as titleStyle,
  content,
  hidden,
} from "./BottomSheet.css";
import { ReactNode, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { classNames } from "../../utils";

export interface BottomSheetProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const BottomSheet = ({
  title,
  isOpen,
  onClose,
  children,
}: BottomSheetProps) => {
  const [visible, setVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  // keyFrame 을 통한 Animation 구현을 위하여 사용합니다.
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setAnimationClass(animateUp);
    } else {
      setAnimationClass(animateDown);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlay} />
        <Dialog.Content className={classNames(bottomSheetBase, animationClass)}>
          {title && <Dialog.Title className={titleStyle}>{title}</Dialog.Title>}
          <Dialog.DialogDescription className={hidden}>
            hiddenDescription
          </Dialog.DialogDescription>

          <div className={content}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
