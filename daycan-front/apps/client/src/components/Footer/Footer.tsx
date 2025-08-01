import { Body, COLORS } from "@daycan/ui";
import {
  footerLinks,
  footerDivider,
  footer,
  footerContent,
  footerLogo,
  footerLink,
} from "./Footer.css";
import { Icon } from "@daycan/ui";

export const Footer = () => {
  return (
    <div className={footer}>
      <div className={footerContent}>
        <div className={footerLogo}>
          <Icon name="fullLogo40" width={96} height={24} />
        </div>

        <div className={footerLinks}>
          <a href="#" className={footerLink}>
            <Body type="xsmall" weight={600} color={COLORS.gray[600]}>
              개인정보처리방침
            </Body>
          </a>
          <a href="#" className={footerLink}>
            <Body type="xsmall" weight={600} color={COLORS.gray[600]}>
              이용약관
            </Body>
          </a>
        </div>

        <div>
          <div className={footerLinks}>
            <Body type="xsmall" weight={400} color={COLORS.gray[500]}>
              대표
            </Body>
            <div className={footerDivider} />
            <Body type="xsmall" weight={400} color={COLORS.gray[500]}>
              김수환
            </Body>
          </div>
          <div className={footerLinks}>
            <Body type="xsmall" weight={400} color={COLORS.gray[500]}>
              이메일
            </Body>
            <div className={footerDivider} />
            <Body type="xsmall" weight={400} color={COLORS.gray[500]}>
              daycan@dayday.com
            </Body>
          </div>
          <div className={footerLinks}>
            <Body type="xsmall" weight={400} color={COLORS.gray[500]}>
              전화번호
            </Body>
            <div className={footerDivider} />
            <Body type="xsmall" weight={400} color={COLORS.gray[500]}>
              1566-9988
            </Body>
          </div>
        </div>
      </div>
    </div>
  );
};
