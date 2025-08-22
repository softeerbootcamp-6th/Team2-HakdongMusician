import { useReducer } from "react";
import {
  useLoginMutation,
  useLoginWithoutCheckMutation,
} from "@/services/auth/useAuthMutation";
import { useNavigate } from "react-router-dom";

// 상태 타입 정의
interface LoginState {
  id: string;
  password: string;
  isFilled: boolean;
  errorMessage: string;
  isChecked: boolean;
  isModalOpen: boolean;
}

// 액션 타입 정의
type LoginAction =
  | { type: "SET_ID"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_ERROR_MESSAGE"; payload: string }
  | { type: "CLEAR_ERROR_MESSAGE" }
  | { type: "SET_IS_CHECKED"; payload: boolean }
  | { type: "SET_IS_MODAL_OPEN"; payload: boolean }
  | { type: "RESET_FORM" };

// 초기 상태
const initialState: LoginState = {
  id: "",
  password: "",
  isFilled: false,
  errorMessage: "",
  isChecked: false,
  isModalOpen: false,
};

// 리듀서 함수
const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case "SET_ID":
      return {
        ...state,
        id: action.payload,
        isFilled: action.payload.length > 0 && state.password.length > 0,
      };

    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
        isFilled: action.payload.length > 0 && state.id.length > 0,
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

export const useLoginHook = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const loginMutation = useLoginMutation();
  const loginWithoutCheckMutation = useLoginWithoutCheckMutation();
  const navigate = useNavigate();
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_ID", payload: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.isFilled) {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "아이디와 비밀번호를 입력해주세요.",
      });
      return;
    }

    // 에러 메시지 초기화
    dispatch({ type: "CLEAR_ERROR_MESSAGE" });

    // 로그인 API 호출
    if (state.isChecked) {
      await loginMutation.mutateAsync({
        username: state.id,
        password: state.password,
      });
    } else {
      await loginWithoutCheckMutation.mutateAsync({
        username: state.id,
        password: state.password,
      });
    }

    // 성공 시 폼 리셋
    resetForm();

    navigate("/");
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
    password: state.password,
    id: state.id,
    errorMessage: state.errorMessage,
    isChecked: state.isChecked,
    isModalOpen: state.isModalOpen,
    isLoading: loginMutation.isPending,

    // 액션 핸들러
    handleIdChange,
    handlePasswordChange,
    handleLogin,
    setIsChecked,
    setIsModalOpen,
    resetForm,
  };
};
