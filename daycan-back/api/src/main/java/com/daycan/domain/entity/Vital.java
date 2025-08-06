package com.daycan.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vital")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vital {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

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

  @Column(name = "document_id")
  private Long documentId;
}
