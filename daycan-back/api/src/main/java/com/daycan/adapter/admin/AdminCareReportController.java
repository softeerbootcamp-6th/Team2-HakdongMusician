package com.daycan.adapter.admin;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/admin/care-report")
@Tag(name = "📋 리포트 관리", description = "관리자용 리포트 관련 API")
public class AdminCareReportController {


}
