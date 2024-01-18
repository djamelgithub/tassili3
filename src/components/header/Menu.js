import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'
import NotifyModal from '../NotifyModal'

  const dispatch = useDispatch();

 
const Menu = () => {
  
 
  


  // Configuración de enlaces de navegación
  const navLinks = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Message', icon: 'near_me', path: '/message' },
    { label: 'Search', icon: 'search'},   
  ];


  const { auth, theme, notify } = useSelector(state => state)


  const { pathname } = useLocation()

  const isActive = (pn) => {
    if (pn === pathname) return 'active'
  }



  return (

    <div className="menu">

      <ul className="navbar-nav flex-row">
      

        {auth.token ? (
          <>
            <li className="nav-item dropdown" style={{ opacity: 1 }}>
              <span
                className="nav-link position-relative"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span
                  className="material-icons"
                  style={{ color: notify.data.length > 0 ? 'crimson' : '' }}
                >
                  favorite
                </span>
                <span className="notify_length">{notify.data.length}</span>
              </span>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
                style={{ transform: 'translateX(75px)' }}
              >
                <NotifyModal />
              </div>
            </li>

            {auth.user.role === "admin" ? (
              <li className="nav-item dropdown  bg-primary " style={{
                opacity: 1,

              }}>
                <span
                  className="nav-link dropdown-toggle"
                  id="adminDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Avatar src={auth.user.avatar} size="medium-avatar" />
                </span>
                <div className="dropdown-menu" aria-labelledby="adminDropdown">

                  <Link className="dropdown-item" to='/pages/provacodigo'>
                    provacodigo
                  </Link>

                  <Link className="dropdown-item" to='/servicios'>
                    servicios
                  </Link>

                  <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                    Profil
                  </Link>
                  <Link className="dropdown-item" to='/categoriaslista/cervices'>
                    publicar anuncio
                  </Link>
                  <Link className="dropdown-item" to='/pages/mapa'>
                    mapa
                  </Link>
                  <Link className="dropdown-item" to='/pages/provacodigo'>
                    prova codigo
                  </Link>


                  <Link className="dropdown-item" to='/pages/filterss'>
                    filters
                  </Link>
                  <Link className="dropdown-item" to='/pages/administracion/index'>
                    administracion index
                  </Link>
                  <label
                    htmlFor="theme"
                    className="dropdown-item"
                    onClick={() =>
                      dispatch({
                        type: GLOBALTYPES.THEME,
                        payload: !theme,
                      })
                    }
                  >
                    {theme ? 'Light mode' : 'Dark mode'}
                  </label>
                  <div className="dropdown-divider"></div>
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={() => dispatch(logout())}
                  >
                    Se déconnecter
                  </Link>
                </div>
              </li>
            ) : (
              // Aquí puedes agregar lógica adicional para usuarios normales
              <li className="nav-item dropdown" style={{ opacity: 1 }}>
                <span
                  className="nav-link dropdown-toggle"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Avatar src={auth.user.avatar} size="medium-avatar" />
                </span>
                <div className="dropdown-menu" aria-labelledby="userDropdown">
                  <Link className="dropdown-item" to='/pages/provacodigo'>
                    provacodigo
                  </Link>


                  <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                    Profil
                  </Link>
                  <Link className="dropdown-item" to='/pages/categoriaslista/cervices'>
                    publicar anuncio
                  </Link>
                  <Link className="dropdown-item" to='/pages/mapa'>
                    mapa
                  </Link>

                  <Link className="dropdown-item" to='/pages/provacodigo'>
                    prova codigo
                  </Link>


                  <Link className="dropdown-item" to='/pages/filterss'>
                    filters
                  </Link>
                  <Link className="dropdown-item" to='/pages/cervicios'>
                    Cervicios
                  </Link>
                  <Link className="dropdown-item" to='/pages/administracion/index'>
                    administracion index
                  </Link>
                  <label
                    htmlFor="theme"
                    className="dropdown-item"
                    onClick={() =>
                      dispatch({
                        type: GLOBALTYPES.THEME,
                        payload: !theme,
                      })
                    }
                  >
                    {theme ? 'Light mode' : 'Dark mode'}
                  </label>
                  <div className="dropdown-divider"></div>
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={() => dispatch(logout())}
                  >
                    Se déconnecter
                  </Link>
                </div>
              </li>
            )}
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link " style={{ color: '#80DEEA' }} to="/login">
                <i className="fa fa-user" style={{ color: 'blue', marginRight: '5px' }}></i>
                {' '}    Connexion
              </Link>
            </li>




          </>
        )}
      </ul>





    </div>
  )
}

export default Menu
