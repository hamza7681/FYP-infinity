const initialState = {
  users: [],
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
export default ChatReducer;
