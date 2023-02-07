const initialState = {
  token: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload,
      };
    case "LOGOUT":
      return {
        token: null,
      };
    default:
      return {
        ...state,
        token: localStorage.getItem("token")
          ? localStorage.getItem("token")
          : null,
      };
  }
};

export default AuthReducer;
