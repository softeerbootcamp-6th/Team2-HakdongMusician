package com.daycan.api.dto.lambda.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ReportResultDto(
    @NotNull String breakfast,
    @NotNull String lunch,
    @NotNull String dinner,
    @JsonProperty("physical_program_comments")
    Map<String, ProgramNoteDto> physicalProgramComments,
    @JsonProperty("cognitive_program_comments")
    Map<String, ProgramNoteDto> cognitiveProgramComments
) {}
