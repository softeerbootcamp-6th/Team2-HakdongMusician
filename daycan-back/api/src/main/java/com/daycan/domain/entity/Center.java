package com.daycan.domain.entity;

import com.daycan.common.response.status.error.CenterErrorStatus;
import com.daycan.domain.Account;
import com.daycan.common.exceptions.ApplicationException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.util.List;
import lombok.Getter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@Entity
@Table(
    name = "center",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_center_code", columnNames = {"center_code"})
    }
)
public class Center extends Account {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  /** 비즈니스 식별자(로그인 ID로도 사용) */
  @Column(name = "center_code", length = 11, nullable = false, updatable = false)
  private String centerCode;

  @Column(name = "name", length = 128)
  private String name;

  @Column(name = "phone_number", length = 20)
  private String phoneNumber;

  @Column(name = "logo_url", length = 1024)
  private String logoUrl;

  /** MySQL JSON 컬럼 <-> List<String> 매핑 */
  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "car_numbers", columnDefinition = "json")
  private List<String> carNumbers;

  protected Center() {}

  /** 센터 신규 생성: username을 centerCode로 맞춰줌 */
  public static Center createNew(String centerCode, String hashedPassword) {
    if (isBlank(centerCode) || isBlank(hashedPassword)) {
      throw new ApplicationException(CenterErrorStatus.CENTER_INVALID_CONSTRUCT);
    }
    Center c = new Center();
    c.username = centerCode; // username은 centerCode로 설정
    c.centerCode = centerCode;
    c.changePassword(hashedPassword);
    c.active = Boolean.TRUE;        // Account.active
    return c;
  }

  /**
   * 센터 프로필 정보 부분 업데이트.
   * username/centerCode는 변경하지 않음(식별자 불변).
   * location 필드는 상위 Account에 존재한다는 가정 하에 갱신.
   */
  public void updateCenterInfo(String name, String phoneNumber,
      String logoUrl, List<String> carNumbers) {
    if (name != null) this.name = name;
    if (phoneNumber != null) this.phoneNumber = phoneNumber;
    if (logoUrl != null) this.logoUrl = logoUrl;
    if (carNumbers != null) this.carNumbers = carNumbers;
  }
}
