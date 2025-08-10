package com.daycan.domain.model;

import com.daycan.domain.entity.document.Document;
import com.daycan.domain.entity.Staff;
import io.micrometer.common.lang.Nullable;

public record CareSheetInitVO(Document doc, boolean isNew, @Nullable Staff staff) {

}

