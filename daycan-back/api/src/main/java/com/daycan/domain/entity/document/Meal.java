package com.daycan.domain.entity.document;


import com.daycan.domain.enums.MealAmount;
import com.daycan.domain.enums.MealType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Meal{
  @Column(nullable = false)
  private boolean provided;

  @Enumerated(EnumType.STRING)
  private MealType type;

  @Enumerated(EnumType.STRING)
  private MealAmount amount;
}

