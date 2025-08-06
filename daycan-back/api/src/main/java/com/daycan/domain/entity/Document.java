package com.daycan.domain.entity;

import com.daycan.domain.enums.DocumentStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
@Entity
@Table(name = "document")
public class Document {

  @Column(name = "date")
  LocalDate date;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "member_id")
  private String memberId;

  @Enumerated(EnumType.STRING)
  @Column(name = "status")
  private DocumentStatus status;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

}