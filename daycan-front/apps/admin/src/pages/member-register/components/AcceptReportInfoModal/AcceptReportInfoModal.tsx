import { Heading, Modal, Body, COLORS } from "@daycan/ui";

interface AcceptReportInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcceptReportInfoModal = ({
  isOpen,
  onClose,
}: AcceptReportInfoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          padding: 24,
          minWidth: 600,
          maxWidth: 700,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {/* 제목 */}
        <Heading type="medium" weight={600} style={{ marginBottom: 24 }}>
          정보성 & 광고성 메시지 안내
        </Heading>

        {/* 개요 */}
        <Body style={{ marginBottom: 24, lineHeight: 1.6 }}>
          푸시 메시지는 다양한 목적으로 사용되며, <strong>정보성</strong>과{" "}
          <strong>광고성</strong> 2가지 유형으로 구분됩니다. 실제 메시지를
          작성하고 보낼 때 목적과 가이드에 맞게 명확히 구분하여 보내기는 쉽지
          않습니다. 이번 글을 통해 <strong>정보성 메시지</strong>와{" "}
          <strong>광고성 메시지</strong>의 차이점을 알아보고,
          <strong>광고성 메시지</strong>의 작성 가이드와 제약 사항을 파악하여
          고객에게 적절한 형태의 메시지를 제공할 수 있도록 합니다.
        </Body>

        {/* 정보성 메시지 섹션 */}
        <div style={{ marginBottom: 24 }}>
          <Heading
            type="small"
            weight={600}
            style={{ marginBottom: 12, color: COLORS.gray[800] }}
          >
            📋 정보성 메시지란?
          </Heading>
          <Body
            type="small"
            weight={500}
            color={COLORS.gray[600]}
            style={{ lineHeight: 1.6 }}
          >
            정보통신망법 안내서 기준{" "}
            <strong>영리목적 광고성 정보의 예외</strong>에 해당하는 메시지로,
            수신자가 광고성 메시지 수신을 거부하더라도 전송자와 수신자 간의
            계약이나 거래관계로 인하여 수신자에게 반드시 전달이 필요한 정보는
            영리목적 광고성 정보 예외에 해당합니다.
          </Body>
          <Body
            type="small"
            weight={500}
            color={COLORS.gray[600]}
            style={{ lineHeight: 1.6, marginTop: 8 }}
          >
            <strong>특징:</strong> 마케팅 수신 동의(야간 수신 동의) 여부와
            관계없이 상시 발송이 가능합니다.
            <br />
            <strong>주의:</strong> 채널별 전송 가능 시간에 따라 발송이 제한될 수
            있습니다.
          </Body>

          {/* 우리 서비스 안내 추가 */}
          <div
            style={{
              marginTop: 16,
              padding: 16,
              backgroundColor: COLORS.gray[50],
              border: `1px solid ${COLORS.gray[200]}`,
              borderRadius: 8,
            }}
          >
            <Body
              type="small"
              weight={600}
              color={COLORS.gray[800]}
              style={{ marginBottom: 8 }}
            >
              💡 우리 서비스는 정보성 메시지 기능을 제공합니다
            </Body>
            <Body
              type="small"
              weight={500}
              color={COLORS.gray[600]}
              style={{ lineHeight: 1.6 }}
            >
              저희 서비스는 <strong>정보성 메시지 기능</strong>을 제공하여 센터
              종사자와 보호자 간의 필수적인 정보 전달을 지원합니다. 따라서
              광고성 메시지와 관련된 제약사항이나 법적 책임에 대해 걱정하실
              필요가 없습니다.
            </Body>
            <Body
              type="small"
              weight={500}
              color={COLORS.gray[600]}
              style={{ lineHeight: 1.6, marginTop: 8 }}
            >
              또한{" "}
              <strong>
                개인정보보호법 제24조의2(개인정보의 안전성 확보조치)
              </strong>
              에 따라 개인정보 처리 시 안전성 확보조치를 이행하고 있으며,
              <strong>제30조(개인정보 처리방침)</strong>에 따른 개인정보
              처리방침을 수립하고 공개하여 개인정보 보호를 위한 모든 조치를
              준수하고 있습니다.
            </Body>
          </div>
        </div>

        {/* 광고성 메시지 섹션 */}
        <div style={{ marginBottom: 24 }}>
          <Heading
            type="small"
            weight={600}
            style={{ marginBottom: 12, color: COLORS.gray[800] }}
          >
            📢 광고성 메시지란?
          </Heading>
          <Body
            type="small"
            weight={500}
            color={COLORS.gray[600]}
            style={{ lineHeight: 1.6 }}
          >
            전송자가 고객(수신자)에게 단순 정보 전달을 목적으로 하는 경우를
            제외하고, 영리 목적으로 광고성 정보를 포함한 메시지입니다.
          </Body>

          <div style={{ marginTop: 12 }}>
            <Body
              type="small"
              weight={500}
              color={COLORS.gray[600]}
              style={{ lineHeight: 1.6 }}
            >
              <strong>주요 특징:</strong>
            </Body>
            <ul
              style={{
                margin: "8px 0",
                paddingLeft: 20,
                color: COLORS.gray[600],
              }}
            >
              <li style={{ marginBottom: 4 }}>
                광고성 메시지를 보낼 때 <strong>(광고)</strong>가 자동으로
                표기됩니다
              </li>
              <li style={{ marginBottom: 4 }}>
                채널(앱, 웹, 카카오톡)에 따라 표기 위치가 상이합니다
              </li>
              <li style={{ marginBottom: 4 }}>
                <strong>야간 전송이 제한</strong>됩니다 (한국 기준 08:00 ~ 21:00
                전송 가능)
              </li>
            </ul>
          </div>
        </div>

        {/* 광고성 메시지 판단 기준 */}
        <div style={{ marginBottom: 24 }}>
          <Heading
            type="small"
            weight={600}
            style={{ marginBottom: 12, color: COLORS.gray[800] }}
          >
            ⚠️ 광고성 메시지 판단 기준
          </Heading>
          <Body
            type="small"
            weight={500}
            color={COLORS.gray[600]}
            style={{ lineHeight: 1.6 }}
          >
            다음의 경우 광고성 메시지로 분류됩니다:
          </Body>
          <ul
            style={{
              margin: "8px 0",
              paddingLeft: 20,
              color: COLORS.gray[600],
            }}
          >
            <li style={{ marginBottom: 4 }}>특가/할인 상품안내</li>
            <li style={{ marginBottom: 4 }}>
              상품 및 서비스 홍보를 위한 프로모션 또는 이벤트
            </li>
            <li style={{ marginBottom: 4 }}>
              정보를 '주'로 나타내더라도 위 내용이 혼재된 경우
            </li>
          </ul>
        </div>

        {/* 주의사항 */}
        <div
          style={{
            padding: 16,
            backgroundColor: COLORS.gray[50],
            border: `1px solid ${COLORS.red[200]}`,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <Heading
            type="small"
            weight={600}
            style={{ marginBottom: 8, color: COLORS.red[500] }}
          >
            ⚠️ 중요 주의사항
          </Heading>
          <Body
            type="small"
            weight={500}
            color={COLORS.red[500]}
            style={{ lineHeight: 1.6 }}
          >
            정보성 메시지와 달리 광고성 메시지의 경우 '정보통신법'에 의거 제한된
            부분이 많으며, 규약을 지키지 않을 경우 형사처벌 및 과태료 부과의
            대상이 될 수 있습니다.
          </Body>
          <Body
            type="small"
            weight={500}
            color={COLORS.red[500]}
            style={{ lineHeight: 1.6, marginTop: 8 }}
          >
            <strong>
              저희 솔루션은 메시지 발송 시 일어날 수 있는 모든 법적 책임을 지지
              않으며, 특히 광고성 메시지를 발송하기 전 법적인 문제, 신뢰성, 수신
              동의 여부를 꼭 확인하시길 바랍니다.
            </strong>
          </Body>
        </div>

        {/* 감사 인사 */}
        <Body
          type="small"
          weight={500}
          color={COLORS.gray[600]}
          style={{ textAlign: "center", fontStyle: "italic" }}
        >
          감사합니다.
        </Body>
      </div>
    </Modal>
  );
};
