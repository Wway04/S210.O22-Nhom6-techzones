export const SET_CURRENCY = "SET_CURRENCY";

export const setCurrency = (currencyName) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENCY,
      payload: { currencyName, currencyRate: currencyName === "VND" ? 25000 : 1 },
    });
  };
};
