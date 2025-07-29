import { COLORS } from "@daycan/ui";
import {
  Body,
  Button,
  CircularProgress,
  Display,
  Heading,
  Icon,
  Modal,
  BottomSheet,
  Toggle,
} from "@daycan/ui";
import { useState } from "react";
import { useToast } from "@daycan/ui";

export const TypoTest = () => {
  const [toggle, setToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { showToast } = useToast();
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

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Button size="large" variant="primary">
          <Body type="medium" weight={600} color={COLORS.gray[900]}>
            Button
          </Body>
          <Icon name="plus" color={COLORS.gray[900]} size={24} />
        </Button>
        <Button variant="unEmphasized" size="large">
          <Body type="medium" weight={600} color={COLORS.gray[900]}>
            Button
          </Body>
        </Button>
        <Button variant="error" size="large">
          <Body type="medium" weight={600} color={COLORS.gray[900]}>
            Button
          </Body>
          <Icon name="plus" color={COLORS.gray[900]} size={24} />
        </Button>
        <Button variant="disabled" size="large">
          <Body type="medium" weight={600} color={COLORS.gray[900]}>
            Button
          </Body>
        </Button>
        <Button size="small" variant="primary">
          <Body type="xsmall" weight={600} color={COLORS.gray[900]}>
            Button
          </Body>
        </Button>
        <Button size="small" variant="error">
          <Body type="xsmall" weight={600} color={COLORS.gray[900]}>
            Button
          </Body>
          <Icon name="warningFilled" color={COLORS.gray[900]} size={16} />
        </Button>
        <Button size="small" variant="disabled">
          <Body type="xsmall" weight={600} color={COLORS.gray[900]}>
            Button
          </Body>
        </Button>
        <Button size="small" variant="primary">
          <Body type="xsmall" weight={600} color={COLORS.gray[900]}>
            Button
          </Body>
        </Button>
        <Button size="small" variant="error">
          <Body type="xsmall" weight={600} color={COLORS.gray[900]}>
            Button
          </Body>
          <Icon name="warningFilled" color={COLORS.gray[900]} size={16} />
        </Button>
        <Button size="small" variant="error">
          <Body type="xsmall" weight={600} color={COLORS.gray[900]}>
            삭제
          </Body>
          <Icon name="warningFilled" color={COLORS.gray[900]} size={16} />
        </Button>
        <Button size="small" variant="unEmphasized">
          <Body type="xsmall" weight={600} color={COLORS.gray[900]}>
            날짜
          </Body>
          <Icon name="calendar" color={COLORS.black} size={16} />
        </Button>
        <Button size="fullWidth" variant="unEmphasized">
          <Body type="xsmall" weight={600} color={COLORS.gray[900]}>
            날짜
          </Body>
          <Icon name="calendar" color={COLORS.black} size={16} />
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <CircularProgress value={0} max={4} />
        <CircularProgress value={1} max={4} />
        <CircularProgress value={2} max={4} />
        <CircularProgress value={3} max={4} />
        <CircularProgress value={4} max={4} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <CircularProgress value={0} max={4} size="large" />
        <CircularProgress value={1} max={4} size="large" />
        <CircularProgress value={2} max={4} size="large" />
        <CircularProgress value={3} max={4} size="large" />
        <CircularProgress value={4} max={4} size="large" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Toggle checked={toggle} onChange={setToggle} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Button
          onClick={() =>
            showToast({
              data: {
                message: "안뇽 난 PC 토스트 조금 더 크지 ㅋ",
                variant: "pc",
                type: "success",
              },
            })
          }
        >
          Show Toast
        </Button>
        <Button
          onClick={() =>
            showToast({
              data: {
                message: "안뇽 난 모바일 토스트",
                variant: "mobile",
                type: "info",
              },
            })
          }
        >
          Show Toast Mobile
        </Button>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        <Modal
          title="Modal"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Body type="medium" weight={600} color={COLORS.gray[900]}>
            Modal
          </Body>
        </Modal>
        <Button onClick={() => setIsBottomSheetOpen(true)}>
          Open BottomSheet
        </Button>
      </div>
      <BottomSheet
        title="BottomSheet"
        size="large"
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      >
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          BottomSheet
        </Body>
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          BottomSheet
        </Body>
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          BottomSheet
        </Body>
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          BottomSheet
        </Body>
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          BottomSheet
        </Body>{" "}
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          BottomSheet
        </Body>
        <Body type="medium" weight={600} color={COLORS.gray[900]}>
          BottomSheet
        </Body>
      </BottomSheet>

    </div>
  );
};
