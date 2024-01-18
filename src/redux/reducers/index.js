import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import theme from './themeReducer'
import profile from './profileReducer'
import status from './statusReducer'
import homePosts from './postReducer'
import statusservicio from './statusservicioReducer'
 
import servicioaproveReducer from './servicioaporveReducer'

 
import homepostaprove from './postaporveReducer'


import homeServicios from './servicioReducer'
 import detailServicio from './detailServicioReducer'



import modal from './modalReducer'
import detailPost from './detailPostReducer'
import discover from './discoverReducer'
import suggestions from './suggestionsReducer'
import socket from './socketReducer'
import notify from './notifyReducer'
import message from './messageReducer'
import online from './onlineReducer'
import call from './callReducer'
import peer from './peerReducer'
import usersReducer from './users/usersReducer';
  
import bloqueopostReducer from './bloqueoReducer/bloqueopostReducer'
import bloqueocommentReducer from './bloqueoReducer/bloqueocommentReducer'
import roleReducer from './rolee/roleeReducer'

export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    status,
    homePosts,
    
    statusservicio,
 
usersReducer,
  
    detailServicio,

homepostaprove,
homeServicios,
servicioaproveReducer,
 
  bloqueopostReducer  ,
  bloqueocommentReducer ,
  roleReducer,


    modal,
    detailPost,
    discover,
    suggestions,
    socket,
    notify,
    message,
    online,
    call,
    peer
})