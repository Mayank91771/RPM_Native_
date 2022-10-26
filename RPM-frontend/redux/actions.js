import { SIGNED_IN, SIGNED_OUT, LOGGED_IN_ACADEMY } from "./actiontype";

export const signin = () => ({
  type: SIGNED_IN,
  payload: true,
});

export const signout = () => ({
  type: SIGNED_OUT,
  payload: false,
});

export const loggedInAcademy = (data) => ({
  type: LOGGED_IN_ACADEMY,
  payload: data,
});
