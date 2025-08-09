/**
 * Daycan API 전역에서 사용하는 응답 상태 코드 규격입니다.
 *
 * <p>카테고리별 앞 두 자리(prefix):</p>
 * <ul>
 *   <li><b>00</b> – 공통 / 미정의</li>
 *   <li><b>10</b> – 인증(Auth)</li>
 *   <li><b>20</b> – 센터(Center)</li>
 *   <li><b>30</b> – 수급자(Member)</li>
 *   <li><b>40</b> – 종사자(Staff)</li>
 *   <li><b>50</b> – 문서(Document)</li>
 * </ul>
 *
 * <p>정의 규칙: <code>{CATEGORY}{NNN}</code> 형식으로 작성하며,
 * <code>{NNN}</code> 은 해당 카테고리 내에서 유일한 세 자리 숫자입니다.
 * 예) <code>AUTH_INVALID_TOKEN(10001)</code></p>
 */

package com.daycan.common.response.status;
