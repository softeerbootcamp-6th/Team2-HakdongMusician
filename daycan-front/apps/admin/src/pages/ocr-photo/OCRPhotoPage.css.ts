import { style } from "@vanilla-extract/css";
import { COLORS } from "@daycan/ui";

export const pageContainer = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: COLORS.black,
  display: "flex",
  flexDirection: "column",
  zIndex: 9999,
});

export const header = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  zIndex: 10,
  background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
});

export const headerButton = style({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

export const cameraContainer = style({
  flex: 1,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

export const videoElement = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const canvas = style({
  display: "none",
});

export const controls = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "120px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px",
  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
  zIndex: 10,
});

export const captureButton = style({
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  backgroundColor: COLORS.white,
  border: `4px solid ${COLORS.gray[300]}`,
  cursor: "pointer",
  position: "relative",
  ":hover": {
    backgroundColor: COLORS.gray[50],
  },
  ":active": {
    transform: "scale(0.95)",
  },
});

export const captureButtonInner = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: COLORS.white,
});

export const switchCameraButton = style({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

export const loadingContainer = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
});

export const errorContainer = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  padding: "20px",
});

export const previewImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const previewControls = style({
  position: "absolute",
  width: "100%",
  padding: "0 20px",
  bottom: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "20px",
});
