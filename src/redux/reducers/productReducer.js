import { FETCH_PRODUCTS_SUCCESS } from "../actions/productActions";

const initState = {
  products: [],
};

const productReducer = (state = initState, action) => {
  console.log("🚀 ~ productReducer ~ state:", state);
  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products: action.payload,
    };
  }

  return state;
};

export default productReducer;
