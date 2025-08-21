import { useState, useRef, useEffect } from "react";

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );

  // 카메라 시작 함수
  const startCamera = async (
    facing: "user" | "environment" = "environment"
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      // 기존 스트림 정지
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCurrentStream(stream);
        setFacingMode(facing);
      }

      setIsLoading(false);
    } catch (err) {
      console.error("카메라 접근 실패:", err);
      setError("카메라에 접근할 수 없습니다. 권한을 확인해주세요.");
      setIsLoading(false);
    }
  };

  // 카메라 전환 함수
  const switchCamera = () => {
    const newFacingMode = facingMode === "environment" ? "user" : "environment";
    startCamera(newFacingMode);
  };

  // 사진 촬영 함수
  const capturePhoto = (): string | null => {
    if (!videoRef.current || !canvasRef.current) {
      return null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return null;

    // 캔버스 크기를 비디오 크기에 맞춤
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 전면 카메라인 경우 좌우 반전
    if (facingMode === "user") {
      context.scale(-1, 1);
      context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    } else {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    // 이미지 데이터 URL 생성
    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(imageDataUrl);
    return imageDataUrl;
  };

  // 사진 재촬영
  const retakePhoto = () => {
    setCapturedImage(null);
  };

  // 스트림 정리 함수
  const stopCamera = () => {
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
      setCurrentStream(null);
    }
  };

  // 컴포넌트 마운트 시 카메라 자동 시작
  useEffect(() => {
    startCamera();

    // 컴포넌트 언마운트 시 스트림 정지
    return () => {
      stopCamera();
    };
  }, []);

  // currentStream이 변경될 때마다 정리 함수 등록
  useEffect(() => {
    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [currentStream]);

  return {
    // Refs
    videoRef,
    canvasRef,

    // States
    isLoading,
    error,
    capturedImage,
    facingMode,

    // Functions
    startCamera,
    switchCamera,
    capturePhoto,
    retakePhoto,
    stopCamera,
  };
};
