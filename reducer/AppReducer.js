export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const INIT = 'INIT';

export const initialState = {
  isLogin: false,
  scrollText: '',
  slider: [],
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        scrollText: action.scrollText,
        slider: action.slider,
      };
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        user: action.user,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        user: {},
      };
    default:
      return state;
  }
};
