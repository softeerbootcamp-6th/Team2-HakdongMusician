package com.daycan.domain.entity.document;

import jakarta.persistence.Embeddable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class VitalAggregate {

  private Integer aggCount = 0;

  private Long sumSystolic = 0L;
  private Long sumDiastolic = 0L;
  private Long sumTemperatureTenths = 0L; // 체온 * 10 누적
  private Long sumStool = 0L;
  private Long sumUrine = 0L;
  private Long sumHealthScore = 0L;

  public void applyFrom(VitalAggregate prev,
      Integer systolic, Integer diastolic,
      BigDecimal temperature,
      Integer stool, Integer urine,
      Integer healthScore) {

    long pCount = (prev == null || prev.aggCount == null) ? 0L : prev.aggCount.longValue();
    long pSys   = (prev == null || prev.sumSystolic == null) ? 0L : prev.sumSystolic;
    long pDia   = (prev == null || prev.sumDiastolic == null) ? 0L : prev.sumDiastolic;
    long pTempT = (prev == null || prev.sumTemperatureTenths == null) ? 0L : prev.sumTemperatureTenths;
    long pStool = (prev == null || prev.sumStool == null) ? 0L : prev.sumStool;
    long pUrine = (prev == null || prev.sumUrine == null) ? 0L : prev.sumUrine;
    long pHsum  = (prev == null || prev.sumHealthScore == null) ? 0L : prev.sumHealthScore;

    this.aggCount = Math.toIntExact(pCount + 1);
    this.sumSystolic = pSys + (systolic == null ? 0 : systolic);
    this.sumDiastolic = pDia + (diastolic == null ? 0 : diastolic);
    this.sumTemperatureTenths = pTempT + toTenths(temperature);
    this.sumStool = pStool + (stool == null ? 0 : stool);
    this.sumUrine = pUrine + (urine == null ? 0 : urine);
    this.sumHealthScore = pHsum + (healthScore == null ? 0 : healthScore);
  }

  public double avgSystolic()    { return zdiv(sumSystolic, aggCount); }
  public double avgDiastolic()   { return zdiv(sumDiastolic, aggCount); }
  public double avgTemperature() { return zdiv(sumTemperatureTenths, aggCount) / 10.0; }
  public double avgStool()       { return zdiv(sumStool, aggCount); }
  public double avgUrine()       { return zdiv(sumUrine, aggCount); }
  public double avgHealthScore() { return zdiv(sumHealthScore, aggCount); }

  private static long toTenths(BigDecimal t) {
    if (t == null) return 0L;
    return t.movePointRight(1).setScale(0, RoundingMode.HALF_UP).longValue();
  }
  private static double zdiv(Long sum, Integer cnt) {
    long s = (sum == null ? 0L : sum);
    int c  = (cnt == null ? 0 : cnt);
    return (c == 0) ? 0.0 : (s * 1.0 / c);
  }

  public static VitalAggregate of(Integer cnt, Long sSys, Long sDia, Long sTempT,
      Long sStool, Long sUrine, Long sHealth) {
    VitalAggregate v = new VitalAggregate();
    v.aggCount = (cnt == null ? 0 : cnt);
    v.sumSystolic = (sSys == null ? 0L : sSys);
    v.sumDiastolic = (sDia == null ? 0L : sDia);
    v.sumTemperatureTenths = (sTempT == null ? 0L : sTempT);
    v.sumStool = (sStool == null ? 0L : sStool);
    v.sumUrine = (sUrine == null ? 0L : sUrine);
    v.sumHealthScore = (sHealth == null ? 0L : sHealth);
    return v;
  }
}
