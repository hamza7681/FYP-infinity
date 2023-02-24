const initialState = {
  token: null,
  user: {},
  followings: [],
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
        followings: [],
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "GET_FOLLOWINGS":
      return {
        ...state,
        followings: action.payload,
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
