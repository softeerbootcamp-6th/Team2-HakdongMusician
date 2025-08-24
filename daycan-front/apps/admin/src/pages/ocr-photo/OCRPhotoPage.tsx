import { useCamera } from "./hooks/useCamera";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Body, COLORS } from "@daycan/ui";
import {
  pageContainer,
  header,
  headerButton,
  cameraContainer,
  videoElement,
  canvas,
  controls,
  captureButton,
  captureButtonInner,
  switchCameraButton,
  loadingContainer,
  errorContainer,
  previewImage,
  previewControls,
} from "./OCRPhotoPage.css";

export const OCRPhotoPage = () => {
  const navigate = useNavigate();
  const {
    videoRef,
    canvasRef,
    isLoading,
    error,
    capturedImage,
    startCamera,
    switchCamera,
    capturePhoto,
    retakePhoto,
    stopCamera,
  } = useCamera();

  // 사진 확인 및 처리
  const confirmPhoto = () => {
    if (capturedImage) {
      // 이전 페이지로 돌아가면서 이미지 데이터 전달
      // 실제로는 상위 컴포넌트의 상태나 context를 통해 전달
      console.log("확인된 이미지:", capturedImage);

      // OCR 처리를 위해 이미지를 전달하고 이전 페이지로 돌아가기
      // 여기서는 간단히 뒤로가기 처리
      navigate(-1);
    }
  };

  // 페이지 닫기
  const closePage = () => {
    stopCamera();
    navigate(-1);
  };

  return (
    <div className={pageContainer}>
      {/* 헤더 */}
      <div className={header}>
        <button className={headerButton} onClick={closePage}>
          <Icon
            name="chevronLeft"
            width={24}
            height={24}
            color={COLORS.gray[900]}
          />
        </button>
        <Body type="medium" weight={600} color={COLORS.white}>
          사진 촬영
        </Body>
        <div style={{ width: "40px" }} /> {/* 공간 확보용 */}
      </div>

      {/* 카메라 영역 */}
      <div className={cameraContainer}>
        {/* 로딩 상태 */}
        {isLoading && (
          <div className={loadingContainer}>
            <Body type="medium" color={COLORS.white}>
              카메라를 준비하는 중...
            </Body>
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className={errorContainer}>
            <Body
              type="medium"
              color={COLORS.white}
              style={{ marginBottom: "16px" }}
            >
              {error}
            </Body>
            <Button variant="primary" onClick={() => startCamera()}>
              다시 시도
            </Button>
          </div>
        )}

        {/* 촬영된 이미지 미리보기 */}
        {capturedImage ? (
          <>
            <img
              src={capturedImage}
              alt="촬영된 사진"
              className={previewImage}
            />
            <div className={previewControls}>
              <Button variant="unEmphasized" onClick={retakePhoto}>
                다시 찍기
              </Button>
              <Button variant="primary" onClick={confirmPhoto}>
                사용하기
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* 비디오 스트림 */}
            <video
              ref={videoRef}
              className={videoElement}
              autoPlay
              playsInline
              muted
            />

            {/* 숨겨진 캔버스 */}
            <canvas ref={canvasRef} className={canvas} />
          </>
        )}
      </div>

      {/* 촬영 컨트롤 (이미지 미리보기 중이 아닐 때만 표시) */}
      {!capturedImage && !isLoading && !error && (
        <div className={controls}>
          {/* 카메라 전환 버튼 */}
          <button className={switchCameraButton} onClick={switchCamera}>
            <Icon name="reset" width={24} height={24} color={COLORS.white} />
          </button>

          {/* 촬영 버튼 */}
          <button className={captureButton} onClick={capturePhoto}>
            <div className={captureButtonInner} />
          </button>

          {/* 빈 공간 (대칭성을 위해) */}
          <div style={{ width: "50px" }} />
        </div>
      )}
    </div>
  );
};
