package com.daycan.domain.entity;

import static jakarta.persistence.FetchType.LAZY;

import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.helper.DocumentKey;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
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

  @EmbeddedId
  private DocumentKey id;  // Document의 복합키와 공유

  @OneToOne(fetch = LAZY, optional = false)
  @MapsId  // DocumentKey를 그대로 매핑
  @JoinColumns({
      @JoinColumn(name = "member_id", referencedColumnName = "member_id"),
      @JoinColumn(name = "date", referencedColumnName = "date")
  })
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
