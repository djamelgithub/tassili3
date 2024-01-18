import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'


export const SERVICIOPENDIENTE_TYPES = {
    CREATE_SERVICIOPENDIENTE: ' CREATE_SERVICIOPENDIENTE',
    LOADING_SERVICIO: 'LOADING_SERVICIO',

    GET_SERVICIOS_PENDIENTES: 'GET_SERVICIOS_PENDIENTES',
    APROVE_SERVICIO_PENDIENTE: 'APROVE_SERVICIO_PENDIENTE',

    UPDATE_SERVICIO: 'UPDATE_SERVICIO',
    GET_SERVICIO: 'GET_SERVICIO',
    DELETE_SERVICIO: 'DELETE_SERVICIO'
}

export const createServiciopendiente = ({ servicioData, wilaya, commune, images, auth }) => async (dispatch) => {

    try {

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        let media = [];
        if (images.length > 0) {

            media = await imageUpload(images);

        }


        const res = await postDataAPI('servicios_pendientes', {
            ...servicioData,
            wilaya,
            commune,
            images: media
        }, auth.token);

        dispatch({
            type: SERVICIOPENDIENTE_TYPES.CREATE_SERVICIOPENDIENTE,
            payload: { ...res.data.newServicio, user: auth.user }
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


export const getServicioPendientesAction = (token) => async (dispatch) => {

    try {
        dispatch({ type: SERVICIOPENDIENTE_TYPES.LOADING_SERVICIO, payload: true });

        const res = await getDataAPI('servicios_pendientes', token);
 

        dispatch({
            type: SERVICIOPENDIENTE_TYPES.GET_SERVICIOS_PENDIENTES,
            payload: res.data,
        });

        dispatch({ type: SERVICIOPENDIENTE_TYPES.LOADING_SERVICIO, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};


export const aproveServiciosPendientesAction = (servicio, estado, auth) => async (dispatch) => {

    try {
        dispatch({ type: SERVICIOPENDIENTE_TYPES.LOADING_SERVICIO, payload: true });

        const res = await patchDataAPI(`servicios_pendientes/${servicio._id}/aprobar`, { estado }, auth.token);

        dispatch({
            type: SERVICIOPENDIENTE_TYPES.APROVE_SERVICIO_PENDIENTE,
            payload: res.data,
        });

        dispatch({ type: SERVICIOPENDIENTE_TYPES.LOADING_SERVICIO, payload: false });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : 'Unexpected error occurred';
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: errorMsg },
        });
    }

};

export const deleteServiciopendiente = ({ servicio, auth }) => async (dispatch) => {
    dispatch({ type: SERVICIOPENDIENTE_TYPES.DELETE_SERVICIO, payload: servicio })

    try {
        await deleteDataAPI(`servicio/${servicio._id}`, auth.token)



    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}