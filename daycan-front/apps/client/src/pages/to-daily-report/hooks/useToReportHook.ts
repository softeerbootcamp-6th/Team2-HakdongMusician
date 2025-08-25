import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useToReportHook = () => {
  const navigate = useNavigate();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAnimationComplete) {
      const timer = setTimeout(() => {
        navigate("/daily-report", { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
    return () => {
      setIsAnimationComplete(false);
    };
  }, [isAnimationComplete, navigate]);

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
    navigate("/daily-report", { replace: true });
  };

  return {
    isAnimationComplete,
    handleAnimationComplete,
  };
};
