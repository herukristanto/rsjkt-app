export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FINISHED = 'FINISHED';

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
