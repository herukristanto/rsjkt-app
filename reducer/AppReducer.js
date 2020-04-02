export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const initialState = {
  isLogin: false,
  user: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        user: action.user
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        user: null
      };
    default:
      return state;
  }
};
