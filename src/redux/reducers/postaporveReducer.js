import { POSTPENDIENTE_TYPES } from '../actions/postaproveAction';
 
const initialState = {
 
  posts: [], // Nuevo estado para los posts pendientes
  loading: false,
  page: 2,
  result: 0,
};

const postaproveReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTPENDIENTE_TYPES.CREATE_POSTPENDIENTE:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case POSTPENDIENTE_TYPES.LOADING_POST:
      return {
        ...state,
        loading: action.payload
      };
    case POSTPENDIENTE_TYPES.GET_POSTS_PENDIENTES:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        page: action.payload.page
      };
   
   
      case POSTPENDIENTE_TYPES.APROVE_POST_PENDIENTE:
        const updatedpost = state.posts.map((post) =>
        post._id === action.payload._id
          ? { ...post, estado: 'aprobado' }
          : post
      );
      return {
        ...state,
        posts: updatedpost,
      };

    default:
      return state;
  }
};

export default postaproveReducer;
