export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FINISHED = 'FINISHED';
export const INITIAL_LOGIN = 'INITIAL_LOGIN';

export const initialState = {
  isLogin: false,
  user: {},
  loading: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_LOGIN:
      return {
        ...state,
        isLogin: true,
        user: action.user,
        loading: false,
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
    case FINISHED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
