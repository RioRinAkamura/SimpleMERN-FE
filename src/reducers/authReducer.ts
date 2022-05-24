export const authReducer = (state: any, action: any) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };
    default:
      return state;
  }
};
