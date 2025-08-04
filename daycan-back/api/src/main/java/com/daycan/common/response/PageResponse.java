package com.daycan.common.response;

public record PageResponse<T>(
    int page,
    T result,
    int totalElement,
    int totalPage
) {

}