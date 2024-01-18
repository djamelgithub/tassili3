import { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'

import Home from './pages/home'

import Login from './pages/login'
import Register from './pages/register'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/statusModales/StatusModal'
import StatusModalServicio from './components/statusModales/StatusModalServicio'
import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'

import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

import { getNotifies } from './redux/actions/notifyAction'



import Cervicios from './pages/cervicios';
import { getServicios } from './redux/actions/servicioAction'

import Mapa from './pages/mapa'

import Cervices from './pages/categoriaslista/cervices'

import Provacodigo from './pages/provacodigo'
import { getPostsPendientesAction } from './redux/actions/postaproveAction'
import Index from './pages/administracion/index'

import Postsservicios from './pages/administracion/postsservicios'
import Users from './pages/administracion/users'
import Blockuser from './pages/administracion/blockuser'
import Userrole from './pages/administracion/userrole'
import Blockpost from './pages/administracion/blockpost'
import Infoclient from './pages/administracion/infoclient'
import Salasfiestas from './pages/salasfiestas'


import CallModal from './components/message/CallModal'

import Profile from './pages/panelcontrole/profile/[id]'
import Mesanuncios from './pages/panelcontrole/mesanuncios'

import Panel from './pages/panelcontrole/panel'


//import Statusmodaladmin from './components/statusModales/Statusmodaladmin'

import { getServicioPendientesAction } from './redux/actions/servicioaproveAction'

import Saladefiestas from './pages/administracion/saladefiestas'
import { getUsers } from './redux/actions/users/usersAction'
import Search from './pages/search'
import Statussearch from './components/home/Statussearch'


function App() {
  const { auth, status, statusservicio,statussearchReducer, modal, call } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch])


  useEffect(() => {
    dispatch(getPosts())
    dispatch(getServicios())


  }, [])


  useEffect(() => {
  

    if (auth.token) {

      dispatch(getPostsPendientesAction(auth.token))
      dispatch(getServicioPendientesAction(auth.token))
      dispatch(getNotifies(auth.token))
      dispatch(getUsers(auth.token))
    }
  }, [dispatch, auth.token])



  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") { }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") { }
      });
    }
  }, [])

  /*
   useEffect(() => {
     const newPeer = new Peer(undefined, {
       path: '/', secure: true
     })
     
     dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
   },[dispatch])
 
 */
  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || statusservicio || statussearchReducer || modal) && 'mode'}`}>
        <div className="main">
          {<Header />}
          {status && <StatusModal />}
          {statusservicio && <StatusModalServicio />}
          {statussearchReducer && <Statussearch/>}

          {auth.token && <SocketClient />}
          {call && <CallModal />}

          <Route exact path="/" component={Home} />
          <Route exact path="/pages/cervicios" component={Cervicios} />
          <Route exact path="/pages/salasfiestas" component={Salasfiestas} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/pages/infoclient" component={Infoclient} />
          <Route exact path="/pages/search" component={Search} />
          <Route exact path="/pages/categoriaslista/cervices" component={Cervices} />

          <Route exact path="/pages/panelcontrole/panel" component={Panel} />
          <Route exact path="/pages/panelcontrole/profile" component={Profile} />
          <Route exact path="/pages/panelcontrole/mesanuncios" component={Mesanuncios} />


          <Route exact path="/pages/mapa" component={Mapa} />
          <Route exact path="/pages/provacodigo" component={Provacodigo} />
          <Route exact path="/pages/administracion/index" component={Index} />
          <Route exact path="/pages/administracion/saladefiestas" component={Saladefiestas} />

          <Route exact path="/pages/administracion/postsservicios" component={Postsservicios} />
          <Route exact path="/pages/administracion/users" component={Users} />
          <Route exact path="/administracion/userrole" component={Userrole} />
          <Route exact path="/pages/administracion/blockuser" component={Blockuser} />
          <Route exact path="/pages/administracion/blockpost" component={Blockpost} />

          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
