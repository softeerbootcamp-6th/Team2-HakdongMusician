import { Body, Button, Chip, Icon } from "@daycan/ui";
import { COLORS } from "@daycan/ui";
import { Input, Segment } from "@daycan/ui";
import { useState } from "react";

export const ComponentTest = () => {
  const [selectedFood, setSelectedFood] = useState("일반식");
  const [selectedPeriod, setSelectedPeriod] = useState("1주");

  return (
    <div style={{ 
      backgroundColor: COLORS.gray[200],
      padding: "20px", 
      display: "flex", 
      flexDirection: "column", 
      gap: "24px",
      margin: "0 auto"
    }}>
      

      <h2>Chip 컴포넌트 테스트</h2>

      {/* Basic Chip Variants */}
    <div style={{ 
      backgroundColor: COLORS.gray[100],
      padding: "20px", 
      display: "flex", 
      flexDirection: "column", 
      gap: "24px",
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

    <div style={{ 
      backgroundColor: COLORS.gray[100],
    }}>
      <h2>Input 컴포넌트 테스트 (새로운 variant/size 구조)</h2>
      
      {/* PC Input File - White background */}
      <Input variant="white" size="pcInputFile">
        <Body type="large" weight={600} color={COLORS.gray[800]}>
          label
        </Body>
        <Button variant="primary" size="small">등록</Button>
      </Input>
      
      <Input variant="white" size="pcInputFile">
        <Body type="large" weight={600} color={COLORS.gray[800]}>
          label
        </Body>
        <Button variant="error" size="small">삭제</Button>
      </Input>
      
      {/* Mobile Text Field - Gray background */}
      <Input variant="grayLight" size="moTextField">
        <Body type="medium" weight={500} color={COLORS.gray[800]}>
          label
        </Body>
      </Input>
      
      {/* PC Text Field Large - Gray background */}
      <Input variant="grayLight" size="pcTextFieldLarge">
        <Body type="medium" weight={500} color={COLORS.gray[800]}>
          label
        </Body>
      </Input>
      
      {/* PC Text Field - White background */}
      <Input variant="white" size="pcTextField">
        <Body type="medium" weight={500} color={COLORS.gray[800]}>
          label
        </Body>
      </Input>
      
      {/* Text Search - White background */}
      <Input variant="white" size="textSearch" flexRule="none">
        <Icon name="search" size={16} color={COLORS.gray[500]} stroke={COLORS.gray[500]} />
        <Body type="medium" weight={500} color={COLORS.gray[800]}>
          label
        </Body>
      </Input>
      
      {/* Small Text Field - White background */}
      <Input variant="white" size="allTextFieldSmall" flexRule="center">
        <Body type="medium" weight={500} color={COLORS.gray[800]}>
          label
        </Body>
      </Input>
      
      {/* Full size with custom dimensions */}
      <Input variant="white" size="full" flexRule="center" style={{ width: '1100px', height: '56px' }}>
        <Body type="medium" weight={500} color={COLORS.gray[800]}>
          label
        </Body>
      </Input>
      
      {/* 같은 size, 다른 variant 비교 */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Input variant="white" size="pcTextField">
          <Body type="medium" weight={500} color={COLORS.gray[800]}>화이트</Body>
        </Input>
        <Input variant="grayLight" size="pcTextField">
          <Body type="medium" weight={500} color={COLORS.gray[800]}>그레이</Body>
        </Input>
      </div>
    </div>
    {/* Segment 컴포넌트 테스트 */}
      <div style={{ 
        padding: "20px",
        borderRadius: "12px",
        display: "flex", 
        flexDirection: "column", 
        gap: "24px",
      }}>
        <h2>Segment 컴포넌트 테스트</h2>
        
        {/* SegmentItem 사용 (기본) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "250px" }}>
          <h3>음식 타입 선택 (SegmentItem 사용)</h3>
          <Segment
            options={["일반식", "죽", "유동식"]}
            value={selectedFood}
            onChange={setSelectedFood}
            variant="default"
            useChip={true}
          />
        </div>

        {/* Chip 사용 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "250px" }}>
          <h3>기간 선택 (Chip 사용)</h3>
          <Segment
            options={["1주", "1개월", "6개월"]}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            variant="default"
            useChip={false}
          />
        </div>

      </div>

    </div>
  );
};