package com.daycan.domain.entity;

import static jakarta.persistence.FetchType.LAZY;

import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.helper.DocumentKey;
import com.daycan.domain.helper.ProgramComment;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
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

  @EmbeddedId
  private DocumentKey id; // document ID (복합키)

  @OneToOne(fetch = LAZY, optional = false)
  @MapsId                        // 공유 PK 핵심
  @JoinColumns({
      @JoinColumn(name = "member_id", referencedColumnName = "member_id"),
      @JoinColumn(name = "date", referencedColumnName = "date")
  })
  private Document document;

  /* ─── 식사 ─── */
  @Column(length = 300)
  private String breakfastComment;
  @Column(length = 300)
  private String lunchComment;
  @Column(length = 300)
  private String dinnerComment;

  @Column(nullable = false)
  private int mealScore;          // 기본 0
  @Column(length = 300)
  private String mealFooterComment;

  /* ─── Vital (매핑) ─── */
  @OneToOne(fetch = FetchType.LAZY,
      cascade = CascadeType.ALL,
      orphanRemoval = true)
  @JoinColumn(name = "vital_id", nullable = false, unique = true)
  private Vital vital;
  @Column(nullable = false)
  private int vitalScore;
  @Column(length = 300)
  private String healthFooterComment;

  /* ─── 인지 프로그램(JSON) ─── */
  @Type(JsonType.class)
  @Column(name = "cognitive_programs", columnDefinition = "json", nullable = false)
  private List<ProgramComment> cognitiveProgramComments = new ArrayList<>();
  @Column(nullable = false)
  private int cognitiveScore;
  @Column(length = 300)
  private String cognitiveFooterComment;

  /* ─── 신체 프로그램(JSON) ─── */
  @Type(JsonType.class)
  @Column(name = "physical_programs", columnDefinition = "json", nullable = false)
  private List<ProgramComment> physicalProgramComments = new ArrayList<>();

  @Column(nullable = false)
  private int physicalScore;
  @Column(length = 300)
  private String physicalFooterComment;
}

