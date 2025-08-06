import React, { InputHTMLAttributes } from "react";
import { classNames } from "@/utils";
import { input, type InputVariants, inputStyle } from "./Input.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  InputVariants & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

/* 
    Input 컴포넌트입니다.
    @param variant - Input 배경색 스타일 (white, grayLight)
    @param inputSize - Input 크기 스타일 
    @param flexRule - Input 내부 요소 정렬 스타일 (center, spaceBetween, none)
    @param type - Input 타입 (text, password 등)
    @param className - 추가적인 클래스 이름
    @param placeholder - Input 플레이스홀더 텍스트
    @param leftIcon - Input 왼쪽에 표시할 아이콘
    @param rightIcon - Input 오른쪽에 표시할 아이콘
    @author 소보길
*/

export const Input = ({
  variant,
  inputSize,
  flexRule,
  type,
  className,
  leftIcon,
  rightIcon,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <div
      className={classNames(input({ variant, inputSize, flexRule }), className)}
      {...props}
    >
      {leftIcon}
      <input type={type} placeholder={placeholder} className={inputStyle} />
      {rightIcon}
    </div>
  );
};
