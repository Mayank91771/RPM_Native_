import { SIGNED_IN, SIGNED_OUT, LOGGED_IN_ACADEMY } from "./actiontype";

const initialState = {
  isSignedIn: false,
  loggedInAcademy: "",
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return { ...state, isSignedIn: action.payload };
    case SIGNED_OUT:
      return { ...state, isSignedIn: action.payload };
    case LOGGED_IN_ACADEMY:
      return { ...state, loggedInAcademy: action.payload };
    default:
      return state;
  }
};
