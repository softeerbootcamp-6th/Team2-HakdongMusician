import { Body, Chip, Icon } from "@daycan/ui";
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
        <Chip backgroundColor={COLORS.gray[600]} size="btnDefault" padding="btnDefaultPadding" flexRule="center">
          <Body type="xsmall" weight={500} color={COLORS.gray[50]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.white} size="btnDefault" padding="btnDefaultPadding" flexRule="center">
          <Body type="xsmall" weight={500} color={COLORS.gray[800]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.gray[50]} size="btnDefault" padding="btnDefaultPadding" flexRule="center">
          <Body type="xsmall" weight={500} color={COLORS.gray[500]}>label</Body>
        </Chip>
      </div>

      {/* Small Chip Variants */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"  
      }}>
        <Chip backgroundColor={COLORS.gray[50]} size="btnXsmall" padding="btnXsmall" flexRule="center">
          <Body type="xsmall" weight={500} color={COLORS.gray[700]}>일반식</Body>
        </Chip>
        <Chip backgroundColor={COLORS.white} size="btnXsmall" padding="btnXsmall" flexRule="center">
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
        <Chip backgroundColor={COLORS.gray[500]} size="filterSmall" padding="btnFilterSmall" flexRule="center">
          <Body type="xsmall" weight={500} color={COLORS.gray[100]}>label</Body>
            <Icon name="arrowDown" size={16} color={COLORS.gray[100]} stroke={COLORS.gray[100]}/>
        </Chip>
        <Chip backgroundColor={COLORS.white} size="filterSmall" padding="btnFilterSmall" flexRule="center">
          <Body type="xsmall" weight={500} color={COLORS.gray[800]}>label</Body>
            <Icon name="arrowDown" size={16} color={COLORS.gray[800]} stroke={COLORS.gray[500]}/>
        </Chip>
        <Chip backgroundColor={COLORS.gray[500]} size="filterSmall" padding="btnFilterSmall" flexRule="center">
          <Body type="xsmall" weight={500} color={COLORS.gray[100]}>label</Body>
            <Icon name="arrowUp" size={16} color={COLORS.gray[100]} stroke={COLORS.gray[100]}/>
        </Chip>
        <Chip backgroundColor={COLORS.white} size="filterSmall" padding="btnFilterSmall" flexRule="center">
          <Body type="xsmall" weight={500} color={COLORS.gray[800]}>label</Body>
            <Icon name="arrowUp" size={16} color={COLORS.gray[800]} stroke={COLORS.gray[500]}/>
        </Chip>
        <Chip backgroundColor={COLORS.gray[50]} size="filterSmall" padding="btnFilterSmall" flexRule="center">
          <Body type="xsmall" weight={500} color={COLORS.gray[500]}>label</Body>
            <Icon name="arrowDown" size={16} color={COLORS.gray[500]} stroke={COLORS.gray[500]}/>
        </Chip>
      </div>

      {/* Medium Filter Chip */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"
      }}>
        <Chip backgroundColor={COLORS.gray[50]} size="filterMedium" padding="btnFilterMedium">
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
        <Chip backgroundColor={COLORS.white} size="filterLarge" padding="btnFilterLarge">
          <Body color={COLORS.gray[800]}>label</Body>
          <Icon name="arrowDown" size={16} color={COLORS.gray[800]} stroke={COLORS.gray[500]}/>
        </Chip>
        <Chip backgroundColor={COLORS.white} size="filterLarge" padding="btnFilterLarge">
          <Body color={COLORS.gray[800]}>label</Body>
          <Icon name="arrowUp" size={16} color={COLORS.gray[800]} stroke={COLORS.gray[500]}/>
        </Chip>
      </div>

      {/* Small Size Colored Chips */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center"
      }}>
        <Chip backgroundColor={COLORS.gray[200]} size="small" padding="small">
          <Body type="xsmall" weight={500} color={COLORS.gray[500]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.yellow[200]} size="small" padding="small">
          <Body type="xsmall" weight={500} color={COLORS.yellow[500]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.red[200]} size="small" padding="small">
          <Body type="xsmall" weight={500} color={COLORS.red[500]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.blue[200]} size="small" padding="small">
          <Body type="xsmall" weight={500} color={COLORS.blue[500]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.green[200]} size="small" padding="small">
          <Body type="xsmall" weight={500} color={COLORS.green[500]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.gray[600]} size="small" padding="small">
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
        <Chip backgroundColor={COLORS.gray[200]} size="medium" padding="medium">
          <Body type="small" weight={500} color={COLORS.gray[500]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.yellow[200]} size="medium" padding="medium">
          <Body type="small" weight={500} color={COLORS.yellow[500]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.red[200]} size="medium" padding="medium">
          <Body type="small" weight={500} color={COLORS.red[500]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.blue[200]} size="medium" padding="medium">
          <Body type="small" weight={500} color={COLORS.blue[500]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.green[200]} size="medium" padding="medium">
          <Body type="small" weight={500} color={COLORS.green[500]}>label</Body>
        </Chip>
        <Chip backgroundColor={COLORS.red[500]} size="medium" padding="medium">
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
        <Chip backgroundColor={COLORS.red[500]} size="mediumLong" padding="mediumLong">
          <Body type="small" weight={500} color={COLORS.white}>삭제</Body>
        </Chip>
        <Chip backgroundColor={COLORS.green[500]} size="mediumLong" padding="mediumLong">
          <Body type="small" weight={500} color={COLORS.white}>수정</Body>
        </Chip>
        <Chip backgroundColor={COLORS.blue[500]} size="mediumLong" padding="mediumLong">
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
        <Chip backgroundColor="transparent" size="mediumLong" padding="reportstatus">
          <Body type="small" color={COLORS.gray[800]}>검토 완료</Body>
          <Icon name="circleCheck" size={16} color={COLORS.blue[500]} stroke={COLORS.blue[500]}/>
        </Chip>
        <Chip backgroundColor="transparent" size="mediumLong" padding="reportstatus">
          <Body type="small" color={COLORS.gray[800]}>검토 대기</Body>
            <Icon name="warningFilled" size={16} color={COLORS.yellow[500]} stroke={COLORS.yellow[500]}/>
        </Chip>
        <Chip backgroundColor="transparent" size="mediumLong" padding="reportstatus">
          <Body type="small" color={COLORS.gray[800]}>생성 중</Body>
        </Chip>
        <Chip backgroundColor="transparent" size="mediumLong" padding="reportstatus">
          <Body type="small" color={COLORS.gray[400]}>해당 없음</Body>
        </Chip>
      </div>
    </div>
  );
};