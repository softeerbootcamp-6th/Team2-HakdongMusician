import { Body, Input, COLORS } from "@daycan/ui";
import {
  ErrorMessage,
  GenderSelector,
  CareLevelRoleDropDownSelector,
} from "@/components";
import {
  staffFormFieldsContainer,
  staffFormFieldRow,
  staffFormFieldLabel,
  staffFormFieldInput,
} from "./StaffFormFields.css";
import { STAFF_ROLE_OPTIONS } from "@/pages/staff-register/constants/staffMap";

interface StaffFormField {
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "password";
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

interface StaffFormFieldsProps {
  fields: StaffFormField[];
  onGenderSelect?: (gender: "MALE" | "FEMALE") => void;
  onStaffRoleSelect?: (role: string) => void;
  errorMessages: Record<string, string>;
  showErrorMessages: boolean;
}

export const StaffFormFields = ({
  fields,
  onGenderSelect,
  onStaffRoleSelect,
  errorMessages,
  showErrorMessages,
}: StaffFormFieldsProps) => {
  const handleGenderSelect = (gender: "MALE" | "FEMALE") => {
    if (onGenderSelect) {
      onGenderSelect(gender);
    }
  };

  const handleStaffRoleSelect = (role: string | number) => {
    if (onStaffRoleSelect && typeof role === "string") {
      onStaffRoleSelect(role);
    }
  };

  return (
    <div className={staffFormFieldsContainer}>
      {fields.map((field) => (
        <div key={field.name} className={staffFormFieldRow}>
          <div className={staffFormFieldLabel}>
            <Body weight={600} type="large" style={{ color: COLORS.gray[700] }}>
              {field.label}
            </Body>
          </div>
          <div className={staffFormFieldInput}>
            {field.name === "gender" ? (
              <GenderSelector
                selectedGender={field.value || ""}
                onGenderSelect={handleGenderSelect}
                hideLabel={true}
              />
            ) : field.name === "staffRole" ? (
              <CareLevelRoleDropDownSelector
                options={STAFF_ROLE_OPTIONS}
                value={field.value}
                onChange={handleStaffRoleSelect}
                placeholder="직무를 선택해 주세요"
                hideLabel={true}
              />
            ) : (
              <Input
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={field.value || ""}
                onChange={field.onChange}
                required={field.required}
                inputSize="full"
                style={{
                  height: "64px",
                }}
                fontSize="large"
                variant="grayLight"
                maxLength={field.maxLength}
              />
            )}
            <ErrorMessage
              message={errorMessages[field.name]}
              isVisible={showErrorMessages && !!errorMessages[field.name]}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
