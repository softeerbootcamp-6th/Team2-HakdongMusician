package com.daycan.domain.entity.document;


import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.BaseTimeEntity;
import com.daycan.common.exceptions.ApplicationException;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
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
  private Long id;

  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @MapsId
  @JoinColumn(name = "id", nullable = false, updatable = false)
  private Document document;

  @Column(name = "health_score")
  private Integer healthScore;

  @Column(name = "blood_pressure_systolic", nullable = false)
  private Integer bloodPressureSystolic;

  @Column(name = "blood_pressure_diastolic", nullable = false)
  private Integer bloodPressureDiastolic;

  @Column(name = "temperature", precision = 3, scale = 1, nullable = false)
  private BigDecimal temperature;

  @Column(name = "number_of_stool", nullable = false)
  private Integer numberOfStool;

  @Column(name = "number_of_urine", nullable = false)
  private Integer numberOfUrine;

  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "aggCount", column = @Column(name = "agg_count", nullable = false)),
      @AttributeOverride(name = "sumSystolic", column = @Column(name = "sum_systolic", nullable = false)),
      @AttributeOverride(name = "sumDiastolic", column = @Column(name = "sum_diastolic", nullable = false)),
      @AttributeOverride(name = "sumTemperatureTenths", column = @Column(name = "sum_temperature_tenths", nullable = false)),
      @AttributeOverride(name = "sumStool", column = @Column(name = "sum_stool", nullable = false)),
      @AttributeOverride(name = "sumUrine", column = @Column(name = "sum_urine", nullable = false)),
      @AttributeOverride(name = "sumHealthScore", column = @Column(name = "sum_health_score", nullable = false))
  })
  private VitalAggregate aggregate;

  protected Vital() {
  }

  @Builder
  public Vital(
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
    this.document = document;
    this.bloodPressureSystolic = bloodPressureSystolic;
    this.bloodPressureDiastolic = bloodPressureDiastolic;
    this.temperature = BigDecimal.valueOf(temperature).setScale(1, RoundingMode.HALF_UP);
    this.numberOfStool = numberOfStool;
    this.numberOfUrine = numberOfUrine;

    this.aggregate = new VitalAggregate();

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
      this.temperature = BigDecimal.valueOf(temperature).setScale(1, RoundingMode.HALF_UP);
    }
    if (numberOfStool != null) {
      this.numberOfStool = numberOfStool;
    }
    if (numberOfUrine != null) {
      this.numberOfUrine = numberOfUrine;
    }
  }

  public void setHealthScore(Integer healthScore) {
    this.healthScore = healthScore;
  }

  public void linkDocument(Document doc) {
    this.document = doc;
  }
  public void applyAggregateFrom(VitalAggregate prev) {
    aggregate.applyFrom(prev,
        this.bloodPressureSystolic,
        this.bloodPressureDiastolic,
        this.temperature,
        this.numberOfStool,
        this.numberOfUrine,
        this.healthScore
    );
  }

  // 평균 헬퍼는 임베디드에 위임
  public double avgSystolic()    { return aggregate.avgSystolic(); }
  public double avgDiastolic()   { return aggregate.avgDiastolic(); }
  public double avgTemperature() { return aggregate.avgTemperature(); }
  public double avgStool()       { return aggregate.avgStool(); }
  public double avgUrine()       { return aggregate.avgUrine(); }
  public double avgHealthScore() { return aggregate.avgHealthScore(); }


}
