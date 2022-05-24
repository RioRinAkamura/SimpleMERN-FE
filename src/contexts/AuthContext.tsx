import { createContext, ReactNode, useEffect, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN } from "./constants";
import setAuthToken from "../utils/setAuthToken";
import { RegisterFormValues } from "../components/Auth/RegisterForm";
import { LoginFormValues } from "../components/Auth/LoginForm";

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN]);
    }
    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  //   Login
  const loginUser = async (userForm: LoginFormValues) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);

      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
      }
      await loadUser();
      return response.data;
    } catch (error: any) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  };

  // Register
  const registerUser = async (userForm: RegisterFormValues) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);

      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
      }
      await loadUser();
      return response.data;
    } catch (error: any) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  // Context data
  const authContextData = { loginUser, registerUser, logoutUser, authState };

  // Return Provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
