const initialState = {
  token: null,
  user: {},
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
        user: {},
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
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
