/**
 * Daycan API 전역에서 사용하는 예외 상태 코드 규격입니다.
 *
 * <p>카테고리별 뒷 두 자리(suffix):</p>
 * <ul>
 *   <li><b>0*</b> – 공통 / 미정의</li>
 *   <li><b>1*</b> – 인증(Auth)</li>
 *   <li><b>2*</b> – 센터(Center)</li>
 *   <li><b>3*</b> – 수급자(Member)</li>
 *   <li><b>4*</b> – 종사자(Staff)</li>
 *   <li><b>5*</b> – 문서(Document)</li>
 * </ul>
 *
 * <p>정의 규칙: <code>{http-staus}{suffix}</code> 형식
 * <code>{suffix}</code> 은 해당 카테고리 내에서 유일한 두 자리 숫자입니다.
 * 예) <code>INVALID_CREDENTIAL(40110)</code></p>
 */

package com.daycan.common.response.status.error;
