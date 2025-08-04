import React, { InputHTMLAttributes } from "react";
import { classNames } from "@/utils";
import { input, type InputVariants } from "./Input.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & InputVariants;

/* 
    Input 컴포넌트입니다.
    @param variant - Input 배경색 스타일 (white, grayLight)
    @param size - Input 크기 및 패딩
    @param flexRule - Flexbox 정렬 규칙 (사용하지 않음)
    @param className - 추가 클래스명
    @returns Input 컴포넌트
    @author 소보길
*/

export const Input = ({
  variant,
  inputSize,
  flexRule,
  type,
  className,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      className={classNames(input({ variant, inputSize, flexRule }), className)}
      placeholder={placeholder}
      {...props}
    />
  );
};
