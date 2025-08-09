package com.daycan.domain.entity;


import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.entry.ProgramComment;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "care_report")
public class CareReport extends BaseTimeEntity {

  @Id
  @Column(name = "id")
  private Long id; // document_id와 동일(공유 PK)

  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @MapsId // id == document.id
  @JoinColumn(name = "id")
  private Document document;

  /* ─── 식사 ─── */
  @Column(length = 300)
  private String breakfastComment;
  @Column(length = 300)
  private String lunchComment;
  @Column(length = 300)
  private String dinnerComment;

  @Column(nullable = false)
  private int mealScore;
  @Column(length = 300)
  private String mealFooterComment;


  @Column(nullable = false)
  private int vitalScore;
  @Column(length = 300)
  private String healthFooterComment;

  /* ─── 인지 프로그램(JSON) ─── */
  @Builder.Default
  @Type(JsonType.class)
  @Column(name = "cognitive_programs", columnDefinition = "json", nullable = false)
  private List<ProgramComment> cognitiveProgramComments = new ArrayList<>();
  @Column(nullable = false)
  private int cognitiveScore;
  @Column(length = 300)
  private String cognitiveFooterComment;

  /* ─── 신체 프로그램(JSON) ─── */
  @Builder.Default
  @Type(JsonType.class)
  @Column(name = "physical_programs", columnDefinition = "json", nullable = false)
  private List<ProgramComment> physicalProgramComments = new ArrayList<>();
  @Column(nullable = false)
  private int physicalScore;
  @Column(length = 300)
  private String physicalFooterComment;
}
