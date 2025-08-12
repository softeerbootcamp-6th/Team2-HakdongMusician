package com.daycan.common.response;

import java.util.List;
import java.util.function.Function;
import org.springframework.data.domain.Page;

public record PageResponse<T>(
    int page,
    T result,
    int totalElement,
    int totalPage
) {
  /** 값 직접 넣는 버전 */
  public static <T> PageResponse<T> of(int page, T result, int totalElement, int totalPage) {
    return new PageResponse<>(page, result, totalElement, totalPage);
  }

  /** Page 그대로 담는 버전 */
  public static <E> PageResponse<List<E>> of(Page<E> page) {
    return new PageResponse<>(
        page.getNumber(),
        page.getContent(),
        Math.toIntExact(page.getTotalElements()),
        page.getTotalPages()
    );
  }

  public static <E, R> PageResponse<List<R>> of(Page<E> page, Function<E, R> mapper) {
    List<R> mapped = page.getContent().stream().map(mapper).toList();
    return new PageResponse<>(
        page.getNumber(),
        mapped,
        Math.toIntExact(page.getTotalElements()),
        page.getTotalPages()
    );
  }
}