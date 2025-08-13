package com.daycan.domain.entity;

import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.enums.ProgramType;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
    name = "program",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_program_center_name", columnNames = {"center_id", "name"})
    },
    indexes = {
        @Index(name = "idx_program_center", columnList = "center_id")
    }
)
public class Program extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;


  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "center_id", nullable = false)
  private Center center;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ProgramType programType;

  @Column(nullable = false, length = 100)
  private String name;

  /** "어디에 좋은지" 같은 설명 */
  @Column(length = 255)
  private String attribute;
}
