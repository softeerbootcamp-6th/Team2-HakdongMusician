package com.daycan.domain.entity;

import com.daycan.domain.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * 활동 엔티티
 */
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "program")
public class Program extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String name;

  /** "어디에 좋은지" 같은 설명 */
  @Column(length = 255)
  private String attribute;
}