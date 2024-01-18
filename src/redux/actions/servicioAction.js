// actions/servicioAction.js
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData';
import { createNotify, removeNotify } from './notifyAction';
import { imageUpload } from '../../utils/imageUpload';
import { GLOBALTYPES } from './globalTypes';
 
export const SERVICIO_TYPES = {
  CREATE_SERVICIO: 'CREATE_SERVICIO',
  LOADING_SERVICIO: 'LOADING_SERVICIO',
  GET_SERVICIOS: 'GET_SERVICIOS',
  UPDATE_SERVICIO: 'UPDATE_SERVICIO',
  GET_SERVICIO: 'GET_SERVICIO',
  DELETE_SERVICIO: 'DELETE_SERVICIO',
};
export const createServicio = ({ servicioData, wilaya, commune, images, auth, socket }) => async (dispatch) => {
 
  try {

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      let media = [];
      if (images.length > 0) {

          media = await imageUpload(images);

      }


      const res = await postDataAPI('servicios', {
          ...servicioData,
          wilaya,
          commune,
          images: media
      }, auth.token);

      dispatch({
          type: SERVICIO_TYPES.CREATE_SERVICIO,
          payload: { ...res.data.newServicio, user: auth.user }
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

      dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
              success: res.data.msg
          }
      });
      const msg = {
        id: res.data.newServicio._id,
        text: 'ajouter un service.',
        recipients: res.data.newServicio.user.followers,
        url: `/servicio/${res.data.newServicio._id}`,
       
        image: media[0].url
    }

    dispatch(createNotify({msg, auth, socket}))
    

   

  } catch (err) {


      dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg }
      });
  }
};
 

export const getServicios = (token) => async (dispatch) => {
  try {
      dispatch({ type: SERVICIO_TYPES.LOADING_SERVICIO, payload: true });
      const res = await getDataAPI('servicios', token)
    
      dispatch({
          type: SERVICIO_TYPES.GET_SERVICIOS,
          payload: { ...res.data, page: 2 }
      });

      dispatch({ type: SERVICIO_TYPES.LOADING_SERVICIO, payload: false });
  } catch (err) {
      dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response?.data?.msg || "Error inesperado" }

      });
  }
 
};



export const updateServicio = ({ servicioData, auth, images, statusservicio }) => async (dispatch) => {
  let media = [];
  const imgNewUrl = images.filter(img => !img.url);
  const imgOldUrl = images.filter(img => img.url);

  if (
    statusservicio.servicioData === servicioData &&
    imgNewUrl.length === 0 &&
    imgOldUrl.length === statusservicio.images.length
  ) return;


  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

    const updatedData = {
        content:servicioData.content,
      direcion: servicioData.direcion,
      wilaya: servicioData.wilaya,
      email: servicioData.email,
      telefono: servicioData.telefono,
      optionservicios: servicioData.optionservicios,
      
      planificacionevnevenements: servicioData.planificacionevnevenements,
      organisasionmariage: servicioData.organisasionmariage,
      mobilierequipement: servicioData.mobilierequipement,
      decorationallefetes: servicioData.decorationallefetes,
      espaceenements: servicioData.espaceenements,
      cateringbanquet: servicioData.cateringbanquet,
      locationvoiture: servicioData.locationvoiture,

      audiovisueLumieres: servicioData.audiovisueLumieres,
      musiciendirect: servicioData.musiciendirect,
      robescostumes: servicioData.robescostumes,
      maquillagecoiffure: servicioData.maquillagecoiffure,
      navetteinvites: servicioData.navetteinvites,
      photographievideographie: servicioData.photographievideographie,

      traiteurestauration: servicioData.traiteurestauration,
      gateaumariage: servicioData.gateaumariage,
      fleurdecoration: servicioData.fleurdecoration,
      enfants: servicioData.enfants,
      nettoyage: servicioData.nettoyage,
      securite: servicioData.securite,
      feuxartifice: servicioData.feuxartifice,



      images: [...imgOldUrl, ...media]
    };
    const res = await patchDataAPI(`servicio/${statusservicio._id}`, updatedData, auth.token);

    dispatch({ type: SERVICIO_TYPES.UPDATE_SERVICIO, payload: res.data.newServicio });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const getServicio = ({ detailServicio, id }) => async (dispatch) => {
  if (detailServicio.every(servicio => servicio._id !== id)) {
      try {
          // Elimina el uso de auth.token en la solicitud
          const res = await getDataAPI(`servicio/${id}`);
          dispatch({ type: SERVICIO_TYPES.GET_SERVICIO, payload: res.data.servicio });
      } catch (err) {
          dispatch({
              type: GLOBALTYPES.ALERT,
              payload: { error: err.response.data.msg }
          });
      }
  }
};

    export const deleteServicio = ({ servicio, auth, socket }) => async (dispatch) => {
      try {
        const res = await deleteDataAPI(`servicio/${servicio._id}`, auth.token);

        dispatch({ type: SERVICIO_TYPES.DELETE_SERVICIO, payload: servicio });

        // Notify
        const msg = {
          id: servicio._id,
          text: 'added a new servicio.',
          recipients: res.data.newServicio.user,
          url: `/servicio/${servicio._id}`,
        };
        dispatch(removeNotify({ msg, auth, socket }));
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    };

    export const likeServicio = ({ servicio, auth, socket }) => async (dispatch) => {
      const newServicio = { ...servicio, likes: [...servicio.likes, auth.user] }
      dispatch({ type: SERVICIO_TYPES.UPDATE_SERVICIO, payload: newServicio })
  
      socket.emit('likeServicio', newServicio)
  
      try {
          await patchDataAPI(`servicio/${servicio._id}/like`, null, auth.token)
  
          // Notify
          const msg = {
              id: auth.user._id,
              text: 'like your service.',
              recipients: [servicio.user._id],
              url: `/servicio/${servicio._id}`,
              content: servicio.content,
              image: servicio.images[0].url
          }
  
          dispatch(createNotify({ msg, auth, socket }))
  
      } catch (err) {
          dispatch({
              type: GLOBALTYPES.ALERT,
              payload: { error: err.response.data.msg }
          })
      }
  }
  
  export const unLikeServicio = ({ servicio, auth, socket }) => async (dispatch) => {
      const newServicio = { ...servicio, likes: servicio.likes.filter(like => like._id !== auth.user._id) }
      dispatch({ type: SERVICIO_TYPES.UPDATE_SERVICIO, payload: newServicio })
  
      socket.emit('unLikeServicio', newServicio)
  
      try {
          await patchDataAPI(`servicio/${servicio._id}/unlike`, null, auth.token)
  
          // Notify
          const msg = {
              id: auth.user._id,
              text: 'like your servicio.',
              recipients: [servicio.user._id],
              url: `/servicio/${servicio._id}`,
          }
          dispatch(removeNotify({ msg, auth, socket }))
  
      } catch (err) {
          dispatch({
              type: GLOBALTYPES.ALERT,
              payload: { error: err.response.data.msg }
          })
      }
  }
  export const saveServicio = ({ servicio, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, servicio._id] }
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })

    try {
        await patchDataAPI(`saveServicio/${servicio._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const unSaveServicio = ({ servicio, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: auth.user.saved.filter(id => id !== servicio._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })

    try {
        await patchDataAPI(`unSaveServicio/${servicio._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}