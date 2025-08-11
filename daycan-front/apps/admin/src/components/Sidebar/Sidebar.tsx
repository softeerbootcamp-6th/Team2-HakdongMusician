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
import { useSidebar } from "./useSidebar";
import { PAGE_KEYS, SIDEBAR_TEXTS } from "@/constants/sidebar.ts";
import { ICON_NAMES } from "@/constants/iconNames";

export const Sidebar = () => {
  const { handleMenuClick, isMenuSelected, count, handleNewRecordClick } =
    useSidebar();

  return (
    /* Sidebar */
    <div className={sidebarContent}>
      {/* Header */}
      <div className={sidebarHeader}>
        <Icon name="smallLogo" width={29} height={32} color={COLORS.white} />
        <Heading type="xsmall" weight={600} color={COLORS.white}>
          {SIDEBAR_TEXTS.CENTER_NAME}
        </Heading>
      </div>

      {/* Body */}
      <div className={sidebarMenu}>
        {/* 기록지 전송 */}
        <div className={menuSectionTitle}>
          <Body type="small" color="white">
            {SIDEBAR_TEXTS.DOCUMENT_MANAGEMENT}
          </Body>
          <div className={menuItemWrapper}>
            <MenuItemHeader
              pageKey={PAGE_KEYS.CARE_SHEET}
              iconName={ICON_NAMES.RECORD}
              label={PAGE_KEYS.CARE_SHEET}
              isSelected={isMenuSelected(PAGE_KEYS.CARE_SHEET)}
              onClick={handleMenuClick}
            />
            <div className={menuItem}>
              <Chip style={{ backgroundColor: COLORS.gray[600] }} round="s">
                <Body type="xsmall" color={COLORS.gray[300]}>
                  {SIDEBAR_TEXTS.REQUIRED_WRITING}
                </Body>
              </Chip>
              <Body type="xsmall" color={COLORS.white}>
                {count}
                {SIDEBAR_TEXTS.CASE_COUNT}
              </Body>
            </div>
          </div>
          {/* 리포트 전송 */}
          <div className={menuSectionTitle}>
            <MenuItemHeader
              pageKey={PAGE_KEYS.REPORT_SENDING}
              iconName={ICON_NAMES.REPORT}
              label={PAGE_KEYS.REPORT_SENDING}
              isSelected={isMenuSelected(PAGE_KEYS.REPORT_SENDING)}
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
                  {SIDEBAR_TEXTS.SENDING_REQUIRED}
                </Body>
              </Chip>
              <Body type="xsmall" color={COLORS.white}>
                {count}
                {SIDEBAR_TEXTS.CASE_COUNT}
              </Body>
            </div>
            <div className={menuItem}>
              <Chip style={{ backgroundColor: COLORS.gray[600] }} round="s">
                <Body type="xsmall" color={COLORS.gray[300]}>
                  {SIDEBAR_TEXTS.DATE_DELAYED}
                </Body>
              </Chip>
              <Body type="xsmall" color={COLORS.white}>
                {count}
                {SIDEBAR_TEXTS.CASE_COUNT}
              </Body>
            </div>
          </div>
        </div>

        {/*사람관리 */}
        <div className={menuSectionTitle}>
          <Body type="small" color={COLORS.gray[300]}>
            {SIDEBAR_TEXTS.PERSON_MANAGEMENT}
          </Body>
          <div className={menuItemWrapper}>
            <MenuItemHeader
              pageKey={PAGE_KEYS.RECIPIENT}
              iconName={ICON_NAMES.ELDER}
              label={PAGE_KEYS.RECIPIENT}
              isSelected={isMenuSelected(PAGE_KEYS.RECIPIENT)}
              onClick={handleMenuClick}
            />
            <MenuItemHeader
              pageKey={PAGE_KEYS.STAFF}
              iconName={ICON_NAMES.WORKER}
              label={PAGE_KEYS.STAFF}
              isSelected={isMenuSelected(PAGE_KEYS.STAFF)}
              onClick={handleMenuClick}
            />
          </div>
        </div>

        {/* 새 기록지 작성 버튼 */}
        <Button
          size="fullWidth"
          variant="primary"
          onClick={handleNewRecordClick}
        >
          <Icon name="plus" width={24} height={24} />
          <Body type="xsmall">{SIDEBAR_TEXTS.NEW_RECORD_BUTTON}</Body>
        </Button>
      </div>
    </div>
  );
};
