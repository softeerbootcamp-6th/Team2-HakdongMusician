package com.daycan.domain.entry;

public record ProgramComment(
    String programName,    // ex) “낮잠 스트레칭”
    String benefit,        // ex) “유연성 향상”
    String personalNote    // 개별 활동 메모
) {
}
