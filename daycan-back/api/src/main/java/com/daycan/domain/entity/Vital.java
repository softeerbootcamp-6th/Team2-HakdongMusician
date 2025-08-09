package com.daycan.domain.entity;


import com.daycan.domain.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vital")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vital extends BaseTimeEntity {

  @Id
  @Column(name = "id")
  private Long id; // document_id와 동일(공유 PK)

  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @MapsId
  @JoinColumn(name = "id")
  private Document document;

  @Column(name = "blood_pressure_systolic")
  private Integer bloodPressureSystolic;

  @Column(name = "blood_pressure_diastolic")
  private Integer bloodPressureDiastolic;

  @Column(name = "temperature", precision = 3, scale = 1)
  private BigDecimal temperature;

  @Column(name = "number_of_stool")
  private Integer numberOfStool;

  @Column(name = "number_of_urine")
  private Integer numberOfUrine;
}
