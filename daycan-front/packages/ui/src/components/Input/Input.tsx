import React, { PropsWithChildren, HTMLAttributes } from 'react';
import { classNames } from "@/utils";
import { input, type InputVariants } from "./Input.css"; 

export type InputProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & 
  InputVariants & {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  }
>;

/* 
    Input 컴포넌트입니다.
    @param onClick - 클릭 이벤트 핸들러
    @param variant - Input 스타일 변형
    @param flexRule - Flexbox 정렬 규칙
    @param children - Input 내부에 렌더링할 자식 요소
    @param className - 추가 클래스명
    @returns Input 컴포넌트
    @author 소보길
*/

export const Input = ({
    onClick,
    variant,
    flexRule,
    children,
    className,
    ...props
}: InputProps) => {

  return (
    <div
      className={classNames(
        input({ variant, flexRule }), 
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
