const initialState = {
  courses: [],
  cartItems: [],
  totalPrice: 0,
};
const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COURSES":
      return {
        ...state,
        courses: action.payload,
      };
    case "ADD_TO_CART":
      const item = action.payload;
      const newPrice = state.totalPrice + item.price;
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, item])
      );
      localStorage.setItem("totalPrice", newPrice);
      return {
        ...state,
        cartItems: [...state.cartItems, item],
        totalPrice: newPrice,
      };
    case "REMOVE_FROM_CART":
      const newItem = action.payload;
      const filterProducts = state.cartItems.filter(
        (item) => item._id !== newItem._id
      );
      const remPrice = state.totalPrice - newItem.price;
      localStorage.setItem("totalPrice", remPrice);
      localStorage.setItem("cartItems", JSON.stringify(filterProducts));
      return {
        ...state,
        cartItems: filterProducts,
        totalPrice: remPrice,
      };
    default:
      return {
        ...state,
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
        totalPrice: localStorage.getItem("totalPrice")
          ? localStorage.getItem("totalPrice")
          : 0,
      };
  }
};
export default CourseReducer;
