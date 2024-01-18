import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
 

export const POSTPENDIENTE_TYPES = {
    CREATE_POSTPENDIENTE: ' CREATE_POSTPENDIENTE',
    LOADING_POST: 'LOADING_POST',
  
    GET_POSTS_PENDIENTES: 'GET_POSTS_PENDIENTES',
    APROVE_POST_PENDIENTE: 'APROVE_POST_PENDIENTE',

    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
}

export const createPostpendiente = ({ postData, wilaya, commune, images, auth  }) => async (dispatch) => {

    try {

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        let media = [];
        if (images.length > 0) {

            media = await imageUpload(images);

        }


        const res = await postDataAPI('posts_pendientes', {
            ...postData,
            wilaya,
            commune,
            images: media
        }, auth.token);

        dispatch({
            type: POSTPENDIENTE_TYPES.CREATE_POSTPENDIENTE,
            payload: { ...res.data.newPost, user: auth.user }
        });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        });

    
    } catch (err) {


        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};

export const getPostsPendientesAction = (token) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        // Cambia esta línea para desestructurar la respuesta correctamente
        const { data } = await getDataAPI('postspendientes', token);
        console.log(data);

        dispatch({
            type: POSTPENDIENTE_TYPES.GET_POSTS_PENDIENTES,
            payload: { ...data, page: 2 }
        });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response ? err.response.data.msg : 'Error al obtener posts pendientes' }
        });
    }
};



/*
export const getPostsPendientesAction = (token) => async (dispatch) => {

    try {
        dispatch({ type: POSTPENDIENTE_TYPES.LOADING_POST, payload: true });

        const res = await getDataAPI('postspendientes', token);
       
        dispatch({
            type: POSTPENDIENTE_TYPES.GET_POSTS_PENDIENTES,
            payload: { ...res.data, page: 2 }
        });

        dispatch({ type: POSTPENDIENTE_TYPES.LOADING_POST, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};*/


export const aprovePostsPendientesAction = (post, estado, auth) => async (dispatch) => {

    try {
        dispatch({ type: POSTPENDIENTE_TYPES.LOADING_POST, payload: true });

        const res = await patchDataAPI(`posts_pendientes/${post._id}/aprobar`, { estado }, auth.token);

        dispatch({
            type: POSTPENDIENTE_TYPES.APROVE_POST_PENDIENTE,
            payload: res.data,
        });

        dispatch({ type: POSTPENDIENTE_TYPES.LOADING_POST, payload: false });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : 'Unexpected error occurred';
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: errorMsg },
        });
    }

};

export const deletePostpendiente = ({ post, auth  }) => async (dispatch) => {
    dispatch({ type: POSTPENDIENTE_TYPES.DELETE_POST, payload: post })

    try {
         await deleteDataAPI(`post/${post._id}`, auth.token)

   

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}