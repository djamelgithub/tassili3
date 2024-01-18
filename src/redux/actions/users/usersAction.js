 
import { patchDataAPI,   getDataAPI } from './../../../utils/fetchData'
import { GLOBALTYPES } from './../globalTypes'

// Definición de los tipos de acciones
export const USERS_TYPES = {
  LOADING: 'LOADING_USERS',
  GET_USERS: 'GET_USERS',
  EDIT_USER: 'EDIT_USER',
  DELETE_USER: 'DELETE_USER',
  BLOCK_USER: 'BLOCK_USER',
  UNBLOCK_USER: 'UNBLOCK_USER',
  GET_USER_POSTS: 'GET_USER_POSTS',
  GET_USER_COMMENTS: 'GET_USER_COMMENTS',
  GET_USER_LIKES: 'GET_USER_LIKES'
}

// Acción para obtener los usuarios
export const getUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: USERS_TYPES.LOADING, payload: true })

    const res = await getDataAPI('users', token) 
  console.log(res.data)
    dispatch({
      type: USERS_TYPES.GET_USERS,
      payload: { ...res.data, page: 2 }
    })

    dispatch({ type: USERS_TYPES.LOADING, payload: false })
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}

 
export const getUserPosts = (user, auth) => async (dispatch) => {
  try {
    const res = await getDataAPI(`user/${user._id}/posts`, auth.token);
    
    dispatch({
      type: USERS_TYPES.GET_USER_POSTS,
      payload: res.data.posts,
    });
  } catch (error) {
    // Manejar cualquier error aquí
  }
};

export const getUserComments = (user, auth) => async (dispatch) => { 
  
  try {
    const res = await getDataAPI(`user/${user._id}/comments`, auth.token);
   
    dispatch({
      type: USERS_TYPES.GET_USER_COMMENTS,
      payload: res.data.comments,
    });
  } catch (error) {
    // Manejar cualquier error aquí
  }
};

export const getUserLikes = (user, auth) => async (dispatch) => {
  try {
    const res = await getDataAPI(`user/${user._id}/likes`, auth.token);
   
    dispatch({
      type: USERS_TYPES.GET_USER_LIKES,
      payload: res.data.likes,
    });
  } catch (error) {
    // Manejar cualquier error aquí
  }
};

 
export const editUser = ({ userId, userData, token }) => async (dispatch) => {
  try {
    dispatch({ type: USERS_TYPES.LOADING, payload: true });

    // Hacer una solicitud a la API para actualizar la información del usuario
    const res = await patchDataAPI(`users/${userId}`, userData, token);

    dispatch({ type: USERS_TYPES.EDIT_USER, payload: res.data });

    dispatch({ type: USERS_TYPES.LOADING, payload: false });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};