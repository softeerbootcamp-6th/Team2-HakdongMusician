import { Body } from "@daycan/ui";
import { COLORS } from "@daycan/ui";
import { errorMessageContainer } from "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
  isVisible: boolean;
}

export const ErrorMessage = ({ message, isVisible }: ErrorMessageProps) => {
  if (!isVisible) return null;

  return (
    <div className={errorMessageContainer}>
      <Body type="small" color={COLORS.red[500]}>
        {message}
      </Body>
    </div>
  );
};
