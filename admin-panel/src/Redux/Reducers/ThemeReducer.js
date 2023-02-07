const initialState = {
  appBarColor: "#1a2035",
  appBackground: "#1a2035",
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "APP_BAR":
      console.log(action.payload);
      return {
        ...state,
        appBarColor: action.payload,
      };
    case "APP_BACK":
      return {
        ...state,
        appBackground: action.payload,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
