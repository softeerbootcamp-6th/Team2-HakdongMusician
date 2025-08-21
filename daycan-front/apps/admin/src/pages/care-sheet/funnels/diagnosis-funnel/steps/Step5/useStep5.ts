import { useFunnel } from "@daycan/hooks";
import { useCanvas } from "../../hooks/useCanvas";
import { useState } from "react";

export const useStep5 = () => {
  const [isSignatureUploaded, setIsSignatureUploaded] = useState(false);
  const { toPrev } = useFunnel();
  const {
    canvasRef,
    containerRef,
    points,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    clear,
  } = useCanvas();

  // 단순히 캔버스 이벤트만 처리 (funnel 상태 저장 제거)
  const handlePointerUp: React.PointerEventHandler<HTMLCanvasElement> = (e) => {
    onPointerUp(e);
  };

  const handleClear = () => {
    clear();
  };

  // 캔버스를 PNG로 추출하는 함수
  const exportToPNG = () => {
    if (!canvasRef.current) {
      console.error("캔버스를 찾을 수 없습니다.");
      return null;
    }

    // 캔버스를 PNG 데이터 URL로 변환
    const dataURL = canvasRef.current.toDataURL("image/png");
    return dataURL;
  };

  // PNG 파일로 다운로드하는 함수
  const downloadPNG = () => {
    const dataURL = exportToPNG();
    if (!dataURL) return;

    // 다운로드 링크 생성
    const link = document.createElement("a");
    link.download = `signature_${new Date().toISOString().split("T")[0]}.png`;
    link.href = dataURL;

    // 다운로드 실행
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // File 형태로 PNG 데이터를 반환하는 함수 (API 전송용)
  const getPNGFile = (): Promise<File | null> => {
    return new Promise((resolve) => {
      if (!canvasRef.current) {
        resolve(null);
        return;
      }

      canvasRef.current.toBlob(
        (blob) => {
          if (blob) {
            // Blob을 File 객체로 변환
            const file = new File(
              [blob],
              `signature_${new Date().toISOString().split("T")[0]}.png`,
              {
                type: "image/png",
                lastModified: Date.now(),
              }
            );
            resolve(file);
          } else {
            resolve(null);
          }
        },
        "image/png",
        1.0 // 최고 품질
      );
    });
  };

  return {
    canvasRef,
    containerRef,
    points,
    onPointerDown,
    onPointerMove,
    handlePointerUp,
    handleClear,
    toPrev,
    exportToPNG,
    downloadPNG,
    getPNGFile,
    isSignatureUploaded,
    setIsSignatureUploaded,
  };
};
