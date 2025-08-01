package com.daycan.application.admin.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Schema(description = "케어 기록 정보 응답")
public record CareSheetResponse(
    @Schema(description = "기록 ID", example = "1") Long id,
    @Schema(description = "도착시간", example = "2024-01-01T09:00:00") LocalDateTime arrivalTime,
    @Schema(description = "귀가시간", example = "2024-01-01T18:00:00") LocalDateTime endTime,
    @Schema(description = "차량제공여부", example = "true") Boolean vehicleProvided,
    @Schema(description = "OCR 사진 경로", example = "/images/care-record-001.jpg") String image,
    @Schema(description = "세면 케어", example = "true") Boolean washCare,
    @Schema(description = "이동 케어", example = "true") Boolean mobilityCare,
    @Schema(description = "목욕 케어", example = "true") Boolean bathingCare,
    @Schema(description = "목욕 소요시간", example = "30분") String bathingDuration,
    @Schema(description = "목욕 유형", example = "샤워") String bathingType,
    @Schema(description = "아침식사 제공여부", example = "true") Boolean breakfastProvided,
    @Schema(description = "아침식사 유형", example = "일반식") String breakfastType,
    @Schema(description = "아침식사 양", example = "보통") String breakfastAmount,
    @Schema(description = "점심식사", example = "일반식") String lunch,
    @Schema(description = "저녁식사", example = "일반식") String dinner,
    @Schema(description = "신체 관련 코멘트", example = "무릎 관절 통증 호소") String physicalComment,
    @Schema(description = "인지 지원", example = "true") Boolean cognitiveSupport,
    @Schema(description = "의사소통 지원", example = "true") Boolean communicationSupport,
    @Schema(description = "인지 관련 코멘트", example = "기억력 저하 관찰됨") String cognitiveComment,
    @Schema(description = "건강 케어", example = "true") Boolean healthCare,
    @Schema(description = "간병 케어", example = "true") Boolean nursingCare,
    @Schema(description = "응급 서비스", example = "false") Boolean emergencyService,
    @Schema(description = "수축기 혈압", example = "120") Integer bloodPressureSystolic,
    @Schema(description = "이완기 혈압", example = "80") Integer bloodPressureDiastolic,
    @Schema(description = "체온", example = "36.5") BigDecimal temperature,
    @Schema(description = "건강 관련 코멘트", example = "혈압 정상 범위") String healthComment,
    @Schema(description = "건강 교육", example = "true") Boolean healthTraining,
    @Schema(description = "인지 프로그램", example = "true") Boolean cognitiveProgram,
    @Schema(description = "인지 무한 프로그램", example = "false") Boolean cognitiveInfinitiveProgram,
    @Schema(description = "물리 치료", example = "true") Boolean physicalTherapy,
    @Schema(description = "프로그램 참여 정보", example = "{\"morning_exercise\": true, \"art_therapy\": false}") String programParticipation,
    @Schema(description = "기능 관련 코멘트", example = "일상생활 수행능력 양호") String functionalComment) {

}