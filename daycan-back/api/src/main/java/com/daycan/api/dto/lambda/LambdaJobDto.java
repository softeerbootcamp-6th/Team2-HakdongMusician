package com.daycan.api.dto.lambda;

import com.daycan.external.worker.job.enums.JobStatus;
import com.daycan.external.worker.job.enums.TaskType;
import java.time.Instant;

public record LambdaJobDto(
    String jobId,
    TaskType taskType,
    JobStatus status,
    Instant createdAt,
    Instant updatedAt,
    String lastError
) {}

