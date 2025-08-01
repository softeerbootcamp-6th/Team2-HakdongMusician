import { type PropsWithChildren, type HTMLAttributes, useState } from 'react';
import { 
  sidebarContent,
  sidebarHeader,
  sidebarMenu,
  menuSectionTitle,
  menuItemWrapper,
  menuItem,
  menuItemHeader,
} from './Sidebar.css';
import { Body, Button, Chip, COLORS, Heading, Icon } from '@daycan/ui'; 

export interface SidebarProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
}

export const Sidebar = ({
  children,
  className,
  ...props
}: SidebarProps) => {
  // 선택된 메뉴 상태 관리
  const [selectedMenu, setSelectedMenu] = useState<string>('기록지 관리');

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  return (

    /* Sidebar */
      <div className={sidebarContent}
        {...props}
      >
        {/* Header */}
        <div className={sidebarHeader}>
          <Icon name="smallLogo" width={29} height={32}  color={COLORS.white}/>
          <Heading type="xsmall" weight={600} color={COLORS.white}>
            데이케어센터과천점마공원점
          </Heading>
        </div>

        
        {/* Body */}
        <div className={sidebarMenu}>
            {/* Menu wrapper for Document Management */}
          <div className={menuSectionTitle}>
            <Body type='small' color='white'>서류 관리</Body>
          <div className={menuItemWrapper}>
            <div 
              className={menuItemHeader}
              onClick={() => handleMenuClick('기록지 관리')}
            >
              <Icon 
                name="record" 
                width={36} 
                height={36} 
                color={selectedMenu === '기록지 관리' ? COLORS.primary[300] : COLORS.gray[500]}
              />
              <Body type='large' color={selectedMenu === '기록지 관리' ? COLORS.primary[300] : COLORS.gray[500]}>
                기록지 관리
              </Body>
              <Icon 
                name="arrowRight" 
                width={16} 
                height={16} 
                stroke={selectedMenu === '기록지 관리' ? COLORS.primary[300] : COLORS.gray[500]}
              />
            </div>
            <div className={menuItem}>
                <Chip style={{ backgroundColor: COLORS.gray[600] }} round='s'>
                    <Body type="xsmall" color={COLORS.gray[300]}>작성 필요</Body>
                </Chip>
                    <Body type="xsmall" color={COLORS.white}>4건</Body>
                    </div>
            <div className={menuItem}>
                <Chip style={{ backgroundColor: COLORS.gray[600] }} round='s'>
                    <Body type="xsmall" color={COLORS.gray[300]}>날짜 지연</Body>
                </Chip>
                    <Body type="xsmall" color={COLORS.white}>4건</Body>
            </div>
          </div>
          {/* Menu wrapper for Report Sending */}
            <div className={menuSectionTitle}>
            <div 
              className={menuItemHeader}
              onClick={() => handleMenuClick('리포트 전송')}
            >
              <Icon 
                name="report" 
                width={36} 
                height={36} 
                color={selectedMenu === '리포트 전송' ? COLORS.primary[300] : COLORS.gray[500]}
              />
              <Body type='large' color={selectedMenu === '리포트 전송' ? COLORS.primary[300] : COLORS.gray[500]}>
                리포트 전송
              </Body>
              <Icon 
                name="arrowRight" 
                width={16} 
                height={16} 
                stroke={selectedMenu === '리포트 전송' ? COLORS.primary[300] : COLORS.gray[500]}
              />
            </div>
            <div className={menuItem}>
              <Chip style={{ backgroundColor: COLORS.gray[600], padding: '2px 6px' }} round='s'>
                <Body type="xsmall" color={COLORS.gray[300]}>전송 필요</Body>
              </Chip>
              <Body type="xsmall" color={COLORS.white}>4건</Body>
            </div>
            <div className={menuItem}>
              <Chip style={{ backgroundColor: COLORS.gray[600] }} round='s'>
                <Body type="xsmall" color={COLORS.gray[300]}>날짜 지연</Body>
              </Chip>
              <Body type="xsmall" color={COLORS.white}>4건</Body>
            </div>
            </div>
        </div>



            {/* Menu wrapper for Person Management */}
          <div className={menuSectionTitle}>
            <Body type='small' color={COLORS.gray[300]}>사람 관리</Body>
          <div className={menuItemWrapper}>
            <div 
              className={menuItemHeader}
              onClick={() => handleMenuClick('수급자 관리')}
            >
                <Icon 
                  name="elder" 
                  width={36} 
                  height={36} 
                  color={selectedMenu === '수급자 관리' ? COLORS.primary[300] : COLORS.gray[500]}
                />
                <Body type='large' color={selectedMenu === '수급자 관리' ? COLORS.primary[300] : COLORS.gray[500]}>수급자 관리</Body>
                <Icon 
                  name="arrowRight" 
                  width={16} 
                  height={16} 
                  stroke={selectedMenu === '수급자 관리' ? COLORS.primary[300] : COLORS.gray[500]}
                />
            </div>
            <div 
              className={menuItemHeader}
              onClick={() => handleMenuClick('종사자 관리')}
            >
              <Icon 
                name="worker" 
                width={36} 
                height={36} 
                color={selectedMenu === '종사자 관리' ? COLORS.primary[300] : COLORS.gray[500]}
              />
              <Body type='large' color={selectedMenu === '종사자 관리' ? COLORS.primary[300] : COLORS.gray[500]}>종사자 관리</Body>
              <Icon 
                name="arrowRight" 
                width={16} 
                height={16} 
                stroke={selectedMenu === '종사자 관리' ? COLORS.primary[300] : COLORS.gray[500]}
              />
            </div>
          </div>
        </div>

        <Button size="fullWidth" variant="primary" >
            <Icon name="plus" width={24} height={24} />
            <Body type='xsmall'>
                새 기록지 작성
            </Body>
        </Button>
            
        </div>


        
      </div>
  );
};
