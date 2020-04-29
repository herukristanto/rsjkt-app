export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const initialState = {
  isLogin: false,
  user: {},
  loading: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        user: action.user,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        user: {},
        loading: false,
      };
    default:
      return state;
  }
};
