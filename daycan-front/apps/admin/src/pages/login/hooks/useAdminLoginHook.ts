import { useReducer } from "react";

// 상태 타입 정의
interface AdminLoginState {
  email: string;
  password: string;
  isFilled: boolean;
  errorMessage: string;
  isChecked: boolean;
  isModalOpen: boolean;
}

// 액션 타입 정의
type AdminLoginAction =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_ERROR_MESSAGE"; payload: string }
  | { type: "CLEAR_ERROR_MESSAGE" }
  | { type: "SET_IS_CHECKED"; payload: boolean }
  | { type: "SET_IS_MODAL_OPEN"; payload: boolean }
  | { type: "RESET_FORM" };

// 초기 상태
const initialState: AdminLoginState = {
  email: "",
  password: "",
  isFilled: false,
  errorMessage: "",
  isChecked: false,
  isModalOpen: false,
};

// 리듀서 함수
const adminLoginReducer = (
  state: AdminLoginState,
  action: AdminLoginAction
): AdminLoginState => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
        isFilled: action.payload.length > 0 && state.password.length > 0,
      };

    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
        isFilled: action.payload.length > 0 && state.email.length > 0,
      };

    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload,
      };

    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: "",
      };

    case "SET_IS_CHECKED":
      return {
        ...state,
        isChecked: action.payload,
      };

    case "SET_IS_MODAL_OPEN":
      return {
        ...state,
        isModalOpen: action.payload,
      };

    case "RESET_FORM":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export const useAdminLoginHook = () => {
  const [state, dispatch] = useReducer(adminLoginReducer, initialState);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_EMAIL", payload: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.isFilled) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "이메일과 비밀번호를 입력해주세요.",
      });
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "올바른 이메일 형식을 입력해주세요.",
      });
      return;
    }

    dispatch({ type: "CLEAR_ERROR_MESSAGE" });

    // 여기에 실제 로그인 API 호출 로직을 추가할 수 있습니다
    console.log("센터종사자 로그인 시도:", {
      email: state.email,
      password: state.password,
    });
  };

  const setIsChecked = (value: boolean) => {
    dispatch({ type: "SET_IS_CHECKED", payload: value });
  };

  const setIsModalOpen = (value: boolean) => {
    dispatch({ type: "SET_IS_MODAL_OPEN", payload: value });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return {
    // 상태
    isFilled: state.isFilled,
    email: state.email,
    password: state.password,
    errorMessage: state.errorMessage,
    isChecked: state.isChecked,
    isModalOpen: state.isModalOpen,

    // 액션 핸들러
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    setIsChecked,
    setIsModalOpen,
    resetForm,
  };
};
