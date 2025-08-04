package com.daycan.controller.admin;

import com.daycan.dto.admin.request.ReportQueryParameters;
import com.daycan.dto.admin.response.CareReportMetaResponse;
import com.daycan.common.response.PageResponse;
import com.daycan.domain.enums.CareReportStatus;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/care-report")
@Tag(name = "📋 리포트 관리", description = "관리자용 리포트 관련 API")
public class AdminCareReportController {

  /**
   * get: 리포트 리스트 조회 api
   * - 리포트 상태별로 조회(검토 완료, 검토 대기, 생성 중, 생성 불가) (중복선택 가능)
   * - sort by (날짜 오름, 내림 차순) 가능 (default: 내림차순) - 고령자 이름으로 검색 가능
   * <p>
   * get: 리포트 상세 조회 api
   * <p>
   * post: 생성 된 리포트 검토 api
   * <p>
   * post: 검토 된 리포트 전송 api (시간 파라미터로 추가하고 없으면 즉시 전송)
   */

  @GetMapping
  public PageResponse<List<CareReportMetaResponse>> getReportList(
      @ModelAttribute ReportQueryParameters query          // 스프링이 query-param <-> record 바인딩
//      Pageable pageable               // page, size, sort 파라미터 처리
  ) {

    /* mock 데이터 생성 (임시) */
    List<CareReportMetaResponse> mock = List.of(
        new CareReportMetaResponse(1L, "김순애", LocalDate.now(), CareReportStatus.REVIEWED, false),
        new CareReportMetaResponse(2L, "박철수", LocalDate.now().minusDays(1),
            CareReportStatus.PENDING, true)
    );

    return new PageResponse<>(
        0,
        mock,
0,1
//        pageable.getPageNumber(),
//        pageable.getPageSize()
    );
  }
}
