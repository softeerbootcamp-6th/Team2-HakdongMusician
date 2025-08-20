import { Modal, Button, Body, Icon, COLORS } from "@daycan/ui";
import { ReportDataView } from "@/components/ReportDataView";
import { ReportEntryEditor } from "../ReportEntryEditor";
import { useReviewModal } from "./useReportReviewModal";
import {
  reviewModalHeader,
  reviewModalHeaderLeft,
  reviewModalContainer,
  reviewModalContentContainer,
  reviewModalContentLeft,
  reviewModalContentRight,
  reviewModalHeaderRight,
} from "./ReportReviewModal.css";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: number;
}

export const ReportReviewModal = ({
  isOpen,
  onClose,
  reportId,
}: ReviewModalProps) => {
  const {
    reportDetail,
    isLoading,
    editableData,
    handleEntryChange,
    handleMemoChange,
    handleSaveAndClose,
    getUpdatedReportData,
  } = useReviewModal({ reportId, isOpen });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={reviewModalContainer}>
        <div className={reviewModalHeader}>
          <div className={reviewModalHeaderLeft}>
            <Icon
              name="smallLogo"
              width={32}
              height={32}
              color={COLORS.white}
            />
            <Body type="large" weight={500} color={COLORS.white}>
              리포트 최종 검토
            </Body>
          </div>
          <div className={reviewModalHeaderRight}>
            <Button variant="primary" onClick={handleSaveAndClose} size="small">
              <Body type="xsmall" weight={500} color={COLORS.black}>
                검토 완료
              </Body>
            </Button>
          </div>
        </div>
        <div className={reviewModalContentContainer}>
          {/* ------------왼쪽 편집 폼 ------------ */}
          <div className={reviewModalContentLeft}>
            <Body type="large" weight={500}>
              📝 리포트 검토 및 수정
            </Body>

            {isLoading ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <Body type="medium" weight={600}>
                  리포트 데이터를 불러오는 중...
                </Body>
              </div>
            ) : reportDetail ? (
              <>
                {/* 식사 항목 수정 */}
                <ReportEntryEditor
                  title="식사"
                  entries={editableData.mealEntries}
                  memo={editableData.mealMemo}
                  onEntryChange={handleEntryChange}
                  onMemoChange={handleMemoChange}
                  category="mealEntries"
                  memoField="mealMemo"
                  isEntryEditable={true}
                />

                {/* 건강 항목 수정 */}
                <ReportEntryEditor
                  title="건강"
                  entries={editableData.healthEntries || []}
                  memo={editableData.healthMemo}
                  onEntryChange={handleEntryChange}
                  onMemoChange={handleMemoChange}
                  category="healthEntries"
                  memoField="healthMemo"
                  isEntryEditable={false}
                />
                {/* 신체 항목 수정 */}
                <ReportEntryEditor
                  title="신체"
                  entries={editableData.physicalEntries}
                  memo={editableData.physicalMemo}
                  onEntryChange={handleEntryChange}
                  onMemoChange={handleMemoChange}
                  category="physicalEntries"
                  memoField="physicalMemo"
                  isEntryEditable={true}
                />

                {/* 인지 항목 수정 */}
                <ReportEntryEditor
                  title="인지"
                  entries={editableData.cognitiveEntries}
                  memo={editableData.cognitiveMemo}
                  onEntryChange={handleEntryChange}
                  onMemoChange={handleMemoChange}
                  category="cognitiveEntries"
                  memoField="cognitiveMemo"
                  isEntryEditable={true}
                />
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <Body type="medium" weight={600}>
                  리포트 데이터를 찾을 수 없습니다.
                </Body>
              </div>
            )}
          </div>

          {/* ------------우측 미리보기 ------------ */}
          <div className={reviewModalContentRight}>
            {reportDetail ? (
              <ReportDataView reportData={getUpdatedReportData()!} />
            ) : (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <Body type="medium" weight={600}>
                  미리보기를 불러올 수 없습니다.
                </Body>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
