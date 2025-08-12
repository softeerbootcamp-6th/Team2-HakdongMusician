package com.daycan.domain.entity.document;


import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.BaseTimeEntity;
import com.daycan.common.exceptions.ApplicationException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.math.RoundingMode;
import lombok.Builder;
import lombok.Getter;

@Entity
@Table(name = "vital")
@Getter
public class Vital extends BaseTimeEntity {

  @Id
  @Column(name = "id")
  private Long id; // document_id와 동일(공유 PK)

  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @MapsId
  @JoinColumn(name = "id", nullable = false, updatable = false)
  private Document document;

  @Column(name = "blood_pressure_systolic", nullable = false, updatable = false)
  private Integer bloodPressureSystolic;

  @Column(name = "blood_pressure_diastolic", nullable = false, updatable = false)
  private Integer bloodPressureDiastolic;

  @Column(name = "temperature", precision = 3, scale = 1, nullable = false, updatable = false)
  private BigDecimal temperature;

  @Column(name = "number_of_stool", nullable = false, updatable = false)
  private Integer numberOfStool;

  @Column(name = "number_of_urine", nullable = false, updatable = false)
  private Integer numberOfUrine;
  protected Vital() {}

  @Builder
  public Vital(
      Long id,
      Document document,
      Integer bloodPressureSystolic,
      Integer bloodPressureDiastolic,
      Double temperature,
      Integer numberOfStool,
      Integer numberOfUrine
  ) {
    if (bloodPressureSystolic == null || bloodPressureDiastolic == null || temperature == null
        || numberOfStool == null || numberOfUrine == null) {
      throw new ApplicationException(DocumentErrorStatus.VITAL_NOT_NULL);
    }
    this.id = id;
    this.document = document;
    this.bloodPressureSystolic = bloodPressureSystolic;
    this.bloodPressureDiastolic = bloodPressureDiastolic;
    this.temperature = BigDecimal.valueOf(temperature).setScale(1, RoundingMode.HALF_UP);
    this.numberOfStool = numberOfStool;
    this.numberOfUrine = numberOfUrine;
  }

  public void update(
      Integer bloodPressureSystolic,
      Integer bloodPressureDiastolic,
      Double temperature,
      Integer numberOfStool,
      Integer numberOfUrine
  ) {
    if (bloodPressureSystolic != null) {
      this.bloodPressureSystolic = bloodPressureSystolic;
    }
    if (bloodPressureDiastolic != null) {
      this.bloodPressureDiastolic = bloodPressureDiastolic;
    }
    if (temperature != null) {
      this.temperature = BigDecimal
          .valueOf(temperature)
          .setScale(1, RoundingMode.HALF_UP);
    }
    if (numberOfStool != null) {
      this.numberOfStool = numberOfStool;
    }
    if (numberOfUrine != null) {
      this.numberOfUrine = numberOfUrine;
    }
  }

  public void linkDocument(Document doc) {
    this.document = doc;
  }

}
