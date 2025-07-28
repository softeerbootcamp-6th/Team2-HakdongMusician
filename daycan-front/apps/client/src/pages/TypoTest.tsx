import { COLORS } from "@daycan/ui";
import { Body, Display, Heading } from "@daycan/ui";
export const TypoTest = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Display type="large" style={{ background: COLORS.primary.gradient }}>
          Display-Gradient-Test
        </Display>
        <Display type="large" color={COLORS.gray[900]}>
          Display-large
        </Display>
        <Display type="medium" color={COLORS.gray[800]}>
          Display-medium
        </Display>
        <Display type="small" color={COLORS.gray[700]}>
          Display-small
        </Display>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Heading type="xlarge" color={COLORS.gray[900]}>
          Heading-xlarge
        </Heading>
        <Heading type="large" color={COLORS.gray[800]}>
          Heading-large
        </Heading>
        <Heading type="medium" color={COLORS.gray[700]}>
          Heading-medium
        </Heading>
        <Heading type="small" color={COLORS.gray[600]}>
          Heading-small
        </Heading>
        <Heading type="xsmall" color={COLORS.gray[500]}>
          Heading-xsmall
        </Heading>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Body type="large" weight={600} color={COLORS.gray[900]}>
          Body-large-600
        </Body>
        <Body type="large" weight={500} color={COLORS.gray[800]}>
          Body-large-500
        </Body>
        <Body type="large" weight={400} color={COLORS.gray[700]}>
          Body-large-400
        </Body>
        <Body type="large" weight={400} color={COLORS.gray[600]}>
          Body-large-400
        </Body>
        <Body type="large" weight={400} color={COLORS.gray[500]}>
          Body-large-400
        </Body>
        <Body type="medium" weight={600} color={COLORS.gray[400]}>
          Body-medium-600
        </Body>
        <Body type="medium" weight={500} color={COLORS.gray[300]}>
          Body-medium-500
        </Body>
        <Body type="medium" weight={400} color={COLORS.gray[200]}>
          Body-medium-400
        </Body>
        <Body type="small" weight={600} color={COLORS.gray[100]}>
          Body-small-600
        </Body>
        <Body type="small" weight={500} color={COLORS.gray[50]}>
          Body-small-500
        </Body>
        <Body type="small" weight={400} color={COLORS.gray[50]}>
          Body-small-400
        </Body>
      </div>
    </div>
  );
};
