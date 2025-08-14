import { Body } from "@/components/Body";
import { COLORS } from "@/styles";
import { Icon } from "@/components/Icon";
import {
  ToastOptions,
  ToastContainer as _ToastContainer,
  Slide,
} from "react-toastify";

import { toast, toastIcon, toastContainer } from "./style.css";

interface ToastData {
  message: string;
  variant?: "pc" | "mobile";
  type?: "success" | "warning" | "error" | "info";
}

export interface ToastProps extends ToastOptions<ToastData> {}

export const Toast = ({ data }: ToastProps) => {
  const variant = data?.variant || "pc";
  const type = data?.type || "info";

  const getIconName = () => {
    switch (type) {
      case "success":
        return "circleCheck";
      case "info":
        return "warningOutline";
      default:
        return "warningOutline";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "pc":
        return COLORS.white;
      case "mobile":
        return COLORS.primary[300];
    }
  };

  return (
    <div className={toast({ variant })}>
      <div className={toastIcon}>
        <Icon
          name={getIconName()}
          width={24}
          height={24}
          color={COLORS.primary[300]}
        />
      </div>
      <Body type="medium" weight={600} color={getTextColor()}>
        {data?.message}
      </Body>
    </div>
  );
};

export const ToastContainer = () => {
  return (
    <_ToastContainer
      position="top-center"
      className={toastContainer}
      autoClose={3000}
      closeButton={false}
      hideProgressBar
      newestOnTop
      transition={Slide}
      toastStyle={{
        background: "transparent",
        boxShadow: "none",
        padding: 0,
        margin: 0,
      }}
    />
  );
};
