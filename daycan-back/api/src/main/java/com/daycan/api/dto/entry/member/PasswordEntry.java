package com.daycan.api.dto.entry.member;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Objects;

public record PasswordEntry(
    @Schema(description = "보호자 비밀번호(설정/변경 시에만 전송)", example = "qwerasdf12!")
    @NotNull
    @Size(min = 8, max = 64, message = "비밀번호는 8~64자")
    String guardianPassword,

    @Schema(description = "보호자 비밀번호 확인", example = "qwerasdf12!")
    @NotNull
    String guardianPasswordConfirm
) {
  @AssertTrue(message = "guardianPassword와 guardianPasswordConfirm가 일치해야 합니다.")
  public boolean isPasswordConfirmed() {
    return Objects.equals(guardianPassword, guardianPasswordConfirm);
  }
}
