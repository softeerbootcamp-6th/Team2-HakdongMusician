package com.daycan.common.response.status.error;

import com.daycan.common.response.status.Status;
import org.springframework.http.HttpStatus;

public enum StatisticsErrorStatus  implements Status {
    // 400
    INVALID_PARAM(HttpStatus.BAD_REQUEST, 40060, "통계 파라미터가 잘못되었습니다."),
    INVALID_DATE_RANGE(HttpStatus.BAD_REQUEST, 40061, "유효하지 않은 날짜 범위입니다."),

    // 404
    NOT_FOUND(HttpStatus.NOT_FOUND, 40460, "존재하지 않는 통계입니다."),

    // 500
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 50060, "통계 처리 중 오류가 발생했습니다.");

    private final HttpStatus httpStatus;
    private final int code;
    private final String message;

    StatisticsErrorStatus(HttpStatus httpStatus, int code, String message) {
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = message;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    @Override
    public int getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
