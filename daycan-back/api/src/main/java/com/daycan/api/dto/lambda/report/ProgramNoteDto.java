package com.daycan.api.dto.lambda.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ProgramNoteDto(
    @NotNull String benefit,
    @JsonProperty("personal_note") @NotNull String personalNote
) {}
