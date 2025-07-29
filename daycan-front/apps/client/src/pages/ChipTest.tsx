import { Body, Chip } from "@daycan/ui";
import { COLORS } from "@daycan/ui";

export const ChipTest = () => {
  return (
    <div style={{ 
      backgroundColor: COLORS.gray[100],
      padding: "20px", 
      display: "flex", 
      flexDirection: "column", 
      gap: "24px",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>
      <h2>Chip 컴포넌트 테스트</h2>

      {/* Basic Chip Variants */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"  
      }}>
        <Chip color="default" size="btn_default" padding="btn_de">
          <Body type="xsmall" weight={500} color={COLORS.gray[50]}>label</Body>
        </Chip>
        <Chip color="secondary" size="btn_default" padding="btn_de">
          <Body type="xsmall" weight={500} color={COLORS.gray[800]}>label</Body>
        </Chip>
        <Chip color="transparent" size="btn_default" padding="btn_de">
          <Body type="xsmall" weight={500} color={COLORS.gray[200]}>label</Body>
        </Chip>
      </div>

      {/* Small Chip Variants */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"  
      }}>
        <Chip color="selected" size="btn_xsmall" padding="btn_xs">
          <Body type="xsmall" weight={500} color={COLORS.gray[700]}>일반식</Body>
        </Chip>
        <Chip color="unselected" size="btn_xsmall" padding="btn_xs">
          <Body type="xsmall" weight={600} color={COLORS.gray[500]}>죽</Body>
        </Chip>
      </div>

      {/* Filter Chip Variants */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"
      }}>
        <Chip color="primary" size="filter_small" padding="btn_filter_s">
          <Body type="xsmall" weight={500} color={COLORS.gray[100]}>label</Body>
        </Chip>
        <Chip color="secondary" size="filter_small" padding="btn_filter_s">
          <Body type="xsmall" weight={500} color={COLORS.gray[800]}>label</Body>
        </Chip>
        <Chip color="primary" size="filter_small" padding="btn_filter_s">
          <Body type="xsmall" weight={500} color={COLORS.gray[100]}>label</Body>
        </Chip>
        <Chip color="secondary" size="filter_small" padding="btn_filter_s">
          <Body type="xsmall" weight={500} color={COLORS.gray[800]}>label</Body>
        </Chip>
      </div>

      {/* Medium Filter Chip */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"
      }}>
        <Chip color="selected" size="filter_medium" padding="btn_filter_m">
          <Body type="xsmall" color={COLORS.gray[500]}>참여도</Body>
        </Chip>
      </div>     
       {/* Large Filter Chips */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"
      }}>
        <Chip color="unselected" size="filter_large" padding="btn_filter_l">
          <Body color={COLORS.gray[800]}>label</Body>
        </Chip>
        <Chip color="unselected" size="filter_large" padding="btn_filter_l">
          <Body color={COLORS.gray[800]}>label</Body>
        </Chip>
      </div>

      {/* Small Size Colored Chips */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"
      }}>
        <Chip color="gray_200" size="small" padding="s">
          <Body type="xsmall" weight={500} color={COLORS.gray[500]}>label</Body>
        </Chip>
        <Chip color="yellow_200" size="small" padding="s">
          <Body type="xsmall" weight={500} color={COLORS.yellow[500]}>label</Body>
        </Chip>
        <Chip color="red_200" size="small" padding="s">
          <Body type="xsmall" weight={500} color={COLORS.red[500]}>label</Body>
        </Chip>
        <Chip color="blue_200" size="small" padding="s">
          <Body type="xsmall" weight={500} color={COLORS.blue[500]}>label</Body>
        </Chip>
        <Chip color="green_200" size="small" padding="s">
          <Body type="xsmall" weight={500} color={COLORS.green[500]}>label</Body>
        </Chip>
        <Chip color="gray_600" size="small" padding="s">
          <Body type="xsmall" weight={500} color={COLORS.gray[300]}>label</Body>
        </Chip>
      </div>

      {/* Medium Size Colored Chips */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"
      }}>
        <Chip color="gray_200" size="medium" padding="m">
          <Body type="small" weight={500} color={COLORS.gray[500]}>label</Body>
        </Chip>
        <Chip color="yellow_200" size="medium" padding="m">
          <Body type="small" weight={500} color={COLORS.yellow[500]}>label</Body>
        </Chip>
        <Chip color="red_200" size="medium" padding="m">
          <Body type="small" weight={500} color={COLORS.red[500]}>label</Body>
        </Chip>
        <Chip color="blue_200" size="medium" padding="m">
          <Body type="small" weight={500} color={COLORS.blue[500]}>label</Body>
        </Chip>
        <Chip color="green_200" size="medium" padding="m">
          <Body type="small" weight={500} color={COLORS.green[500]}>label</Body>
        </Chip>
        <Chip color="red_500" size="medium" padding="m">
          <Body type="small" weight={500} color={COLORS.white}>label</Body>
        </Chip>
      </div>

      {/* Medium Long Size Chips */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"
      }}>
        <Chip color="red_500" size="medium_long" padding="ml">
          <Body type="small" weight={500} color={COLORS.white}>삭제</Body>
        </Chip>
        <Chip color="green_500" size="medium_long" padding="ml">
          <Body type="small" weight={500} color={COLORS.white}>수정</Body>
        </Chip>
        <Chip color="blue_500" size="medium_long" padding="ml">
          <Body type="small" weight={500} color={COLORS.gray[200]}>수정사항 저장</Body>
        </Chip>
      </div>

      {/* Transparent Report Status Chips */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"
      }}>
        <Chip color="transparent" size="medium_long" padding="reportstatus">
          <Body type="small" color={COLORS.gray[800]}>검토 완료</Body>
        </Chip>
        <Chip color="transparent" size="medium_long" padding="reportstatus">
          <Body type="small" color={COLORS.gray[800]}>검토 대기</Body>
        </Chip>
        <Chip color="transparent" size="medium_long" padding="reportstatus">
          <Body type="small" color={COLORS.gray[800]}>생성 중</Body>
        </Chip>
        <Chip color="transparent" size="medium_long" padding="reportstatus">
          <Body type="small" color={COLORS.gray[400]}>해당 없음</Body>
        </Chip>
      </div>
    </div>
  );
};