import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useFunnel } from "@daycan/hooks";
// import { prefillCareSheetData } from "@/utils/careSheetPrefill";
// import { getDefaultInfoData } from "@/utils/careSheetPrefill";
// import { getDefaultDiagnosisData } from "@/utils/careSheetPrefill";

export const usePhotoSelect = () => {
  const navigate = useNavigate();
  // const { funnelState } = useFunnel();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [shouldAutoConfirm, setShouldAutoConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // selectedImage가 설정되고 자동 확인이 필요한 경우 확인 함수 호출
  useEffect(() => {
    if (selectedImage && shouldAutoConfirm) {
      setShouldAutoConfirm(false); // 플래그 리셋
      handleImageConfirm();
    }
  }, [selectedImage, shouldAutoConfirm]);

  // 파일 선택
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 지원하는 이미지 형식 검증
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert(
          "지원하지 않는 이미지 형식입니다. PNG, JPEG, JPG 형식만 사용 가능합니다."
        );
        return;
      }

      setShouldAutoConfirm(true); // 자동 확인 플래그 설정
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 제거
  const removeImage = () => {
    setSelectedImage(null);
  };

  // API 호출 시뮬레이션 (실제로는 이미지 업로드 API 호출)
  const simulateImageUpload = async (imageData: string): Promise<string> => {
    setIsProcessing(true);
    console.log("simulateImageUpload", imageData);

    // // 실제 API 호출을 시뮬레이션 (1초 대기)
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // 성공 응답 시뮬레이션
    const mockResponse = {
      success: true,
      imageUrl: "https://example.com/uploaded-image.jpg",
      message: "이미지가 성공적으로 업로드되었습니다.",
    };

    setIsProcessing(false);
    return mockResponse.imageUrl;
  };

  // 사진 등록 방법 선택 후 처리
  const handlePhotoMethodSelect = async (photoMethod: "camera" | "album") => {
    console.log("handlePhotoMethodSelect", photoMethod);

    if (photoMethod === "camera") {
      // OCR 사진 촬영 페이지로 이동
      navigate("/care-sheet/new/ocr/photo");
    } else {
      // 파일 선택 다이얼로그 열기
      fileInputRef.current?.click();
    }
  };

  // 이미지 확인 및 다음 단계 진행
  const handleImageConfirm = async () => {
    if (!selectedImage) {
      alert("이미지를 선택해주세요.");
      return;
    }

    try {
      // 이미지 업로드 API 호출 시뮬레이션
      const uploadedImageUrl = await simulateImageUpload(selectedImage);
      console.log("업로드된 이미지 URL:", uploadedImageUrl);

      // OCR 데이터를 기반으로 care-sheet 폼에 기본값 설정
      // prefillCareSheetData();

      // diagnosis 페이지로 이동 (모든 데이터가 설정된 상태)
      navigate("/care-sheet/new/diagnosis");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return {
    // 상태
    isProcessing,
    selectedImage,
    shouldAutoConfirm,

    // refs
    fileInputRef,

    // 함수들
    handleFileSelect,
    removeImage,
    handlePhotoMethodSelect,
    handleImageConfirm,
  };
};
