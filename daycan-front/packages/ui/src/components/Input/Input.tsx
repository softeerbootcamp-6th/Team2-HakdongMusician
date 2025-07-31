import React, { PropsWithChildren, HTMLAttributes } from 'react';
import { classNames } from "@/utils";
import { input, type InputVariants } from "./Input.css"; 
import { CustomWidthHeightType } from "@/utils";

export type InputProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & 
  InputVariants & 
  CustomWidthHeightType 
>;

/* 
    Input 컴포넌트입니다.
    @param onClick - 클릭 이벤트 핸들러
    @param variant - Input 배경색 스타일 (white, grayLight)
    @param size - Input 크기 및 패딩
    @param flexRule - Flexbox 정렬 규칙
    @param children - Input 내부에 렌더링할 자식 요소
    @param className - 추가 클래스명
    @returns Input 컴포넌트
    @author 소보길
*/

export const Input = ({
    onClick,
    variant,
    size,
    flexRule,
    children,
    className,
    ...props
}: InputProps) => {

  return (
    <div
      className={classNames(
        input({ variant, size, flexRule }), 
        className
      )}
      style={{ width: props.customWidth, height: props.customHeight }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
