import { useState } from "react";
import {
  sidebarContent,
  sidebarHeader,
  sidebarMenu,
  menuSectionTitle,
  menuItemWrapper,
  menuItem,
} from "./Sidebar.css";
import { Body, Button, Chip, COLORS, Heading, Icon } from "@daycan/ui";
import { MenuItemHeader } from "../MenuItemHeader/MenuItemHeader";

export const PAGE_KEYS = {
  RECORD_SHEET: '기록지 관리',
  REPORT_SENDING: '리포트 전송',
  RECIPIENT: '수급자 관리',
  STAFF: '종사자 관리',
} as const;

export type PageKey = typeof PAGE_KEYS[keyof typeof PAGE_KEYS];

export const Sidebar = () => {
  // 선택된 메뉴 상태 관리
  const [selectedMenu, setSelectedMenu] = useState<PageKey>(PAGE_KEYS.RECORD_SHEET);

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menuName: PageKey) => {
    setSelectedMenu(menuName);
  };

  return (
    /* Sidebar */
    <div className={sidebarContent}>
      {/* Header */}
      <div className={sidebarHeader}>
        <Icon name="smallLogo" width={29} height={32} color={COLORS.white} />
        <Heading type="xsmall" weight={600} color={COLORS.white}>
          데이케어센터과천점마공원점
        </Heading>
      </div>

      {/* Body */}
      <div className={sidebarMenu}>
        {/* 기록지 전송 */}
        <div className={menuSectionTitle}>
          <Body type="small" color="white">
            서류 관리
          </Body>
          <div className={menuItemWrapper}>
            <MenuItemHeader
              pageKey={PAGE_KEYS.RECORD_SHEET}
              iconName="record"
              label={PAGE_KEYS.RECORD_SHEET}
              isSelected={selectedMenu === PAGE_KEYS.RECORD_SHEET}
              onClick={handleMenuClick}
            />
            <div className={menuItem}>
              <Chip style={{ backgroundColor: COLORS.gray[600] }} round="s">
                <Body type="xsmall" color={COLORS.gray[300]}>
                  작성 필요
                </Body>
              </Chip>
              <Body type="xsmall" color={COLORS.white}>
                4건
              </Body>
            </div>
            <div className={menuItem}>
              <Chip style={{ backgroundColor: COLORS.gray[600] }} round="s">
                <Body type="xsmall" color={COLORS.gray[300]}>
                  날짜 지연
                </Body>
              </Chip>
              <Body type="xsmall" color={COLORS.white}>
                4건
              </Body>
            </div>
          </div>
          {/* 리포트 전송 */}
          <div className={menuSectionTitle}>
            <MenuItemHeader
              pageKey={PAGE_KEYS.REPORT_SENDING}
              iconName="report"
              label={PAGE_KEYS.REPORT_SENDING}
              isSelected={selectedMenu === PAGE_KEYS.REPORT_SENDING}
              onClick={handleMenuClick}
            />
            <div className={menuItem}>
              <Chip
                style={{
                  backgroundColor: COLORS.gray[600],
                  padding: "2px 6px",
                }}
                round="s"
              >
                <Body type="xsmall" color={COLORS.gray[300]}>
                  전송 필요
                </Body>
              </Chip>
              <Body type="xsmall" color={COLORS.white}>
                4건
              </Body>
            </div>
            <div className={menuItem}>
              <Chip style={{ backgroundColor: COLORS.gray[600] }} round="s">
                <Body type="xsmall" color={COLORS.gray[300]}>
                  날짜 지연
                </Body>
              </Chip>
              <Body type="xsmall" color={COLORS.white}>
                4건
              </Body>
            </div>
          </div>
        </div>

        {/*사람관리 */}
        <div className={menuSectionTitle}>
          <Body type="small" color={COLORS.gray[300]}>
            사람 관리
          </Body>
          <div className={menuItemWrapper}>
            <MenuItemHeader
              pageKey={PAGE_KEYS.RECIPIENT}
              iconName="elder"
              label={PAGE_KEYS.RECIPIENT}
              isSelected={selectedMenu === PAGE_KEYS.RECIPIENT}
              onClick={handleMenuClick}
            />
            <MenuItemHeader
              pageKey={PAGE_KEYS.STAFF}
              iconName="worker"
              label={PAGE_KEYS.STAFF}
              isSelected={selectedMenu === PAGE_KEYS.STAFF}
              onClick={handleMenuClick}
            />
          </div>
        </div>

        {/* 새 기록지 작성 버튼 */}
        <Button size="fullWidth" variant="primary">
          <Icon name="plus" width={24} height={24} />
          <Body type="xsmall">새 기록지 작성</Body>
        </Button>
      </div>
    </div>
  );
};
