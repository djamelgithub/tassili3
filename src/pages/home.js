import React, { useEffect,useState } from 'react'

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Posts from '../components/home/Posts'


import LoadIcon from '../images/loading.gif'
import { useSelector, useDispatch } from 'react-redux';



import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authAction';
import Servicioss from '../components/homeservicio/Servicioss';
 
 
//import Avatar from '../components/Avatar'         <Avatar src={auth.user.avatar} size="medium-avatar" />      </div>
let scroll = 0;
const Home = () => {
  const { auth, homePosts, homeServicios } = useSelector(state => state);

 
 
  const isAuthenticated = !!auth.token;
  const dispatch = useDispatch();

  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      scroll = window.pageYOffset
      return scroll;
    }
  })

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' })
    }, 100)
  }, [])



  useEffect(() => {
    const sidebarDropdownLinks = document.querySelectorAll('.sidebar-dropdown > a');
    const sidebarSubmenus = document.querySelectorAll('.sidebar-submenu');
    const pageWrapper = document.querySelector('.page-wrapper');
    const closeSidebarButton = document.getElementById('close-sidebar');
    const showSidebarButton = document.getElementById('show-sidebar');

    sidebarDropdownLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebarSubmenus.forEach(submenu => {
          submenu.style.display = 'none';
        });

        const parentListItem = link.parentElement;

        if (parentListItem.classList.contains('active')) {
          document.querySelectorAll('.sidebar-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
          });

          parentListItem.classList.remove('active');
        } else {
          document.querySelectorAll('.sidebar-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
          });

          link.nextElementSibling.style.display = 'block';
          parentListItem.classList.add('active');
        }
      });
    });

    closeSidebarButton.addEventListener('click', () => {
      pageWrapper.classList.remove('toggled');
    });

    showSidebarButton.addEventListener('click', () => {
      pageWrapper.classList.add('toggled');
    });
  }, []);


  const handleSidebarToggle = () => {
    // Lógica para mostrar/ocultar la barra lateral, si es necesario
  };

 

  return (

    <div>
      <div className="page-wrapper chiller-theme toggled">
        <button id="show-sidebar" className="btn btn-sm btn-dark" onClick={handleSidebarToggle}>
          <i className="fas fa-bars" />
        </button>
        <nav id="sidebar" className="sidebar-wrapper">
          <div className="sidebar-content">
            <div className="sidebar-brand">
              <Link className="dropdown-item" to='/pages/administracion/index'>
                <i className="fa fa-user" />
                <span>Administracion</span>
              </Link>
              <button id="close-sidebar" className="btn btn-sm btn-dark" onClick={handleSidebarToggle}>
                <i className="fas fa-bars" />
              </button>
            </div>

            <div className="sidebar-header">

              <div className="user-pic">
                <h5>avatar</h5>
                <div className="user-info">
                  <span className="user-name">
                    <strong>username</strong>
                  </span>
                  <span className="user-role">Role: role</span>
                  <span className="user-status">
                    <i className="fa fa-circle" />
                    <span>Online</span>
                  </span>
                </div>
              </div>
            </div>




            <div className="sidebar-menu">
              <ul className="list-group">

                {isAuthenticated ? (
                  <>
                    <li className="header-menu" style={{ color: 'red' }}>
                      <span>Mon comptennn</span>
                    </li>
                    <li>
                      <Link className="dropdown-item" to='/pages/panelcontrole/panel' >
                        <i className="fa fa-cogs" />
                        <span>Panel de Control</span>
                      </Link>
                    </li>


                    <li>
                      <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                        <i className="fa fa-plus-circle" />
                        <span>Ajouter Annonce</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                        <i className="fa fa-plus-circle" />
                        <span>Contacte l'administratio</span>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                        <i className="fa fa-user" />
                        <span>Profil</span>
                      </Link>
                    </li>


                    <li   >
                      <Link
                        className="dropdown-item"
                        to="/"
                        onClick={() => dispatch(logout())}
                      >
                        <i className="fa fa-sign-out-alt" />
                        Se déconnecter
                      </Link>
                    </li>
                    <li className="header-menu">
                      <span>Catégories</span>
                    </li>


                    <li>
                      <Link className="dropdown-item" to="/salasfiestas">
                        <i className="far fa-gem"></i>
                        <span>Salle des fete</span>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/cervicios">
                        <i className="far fa-gem"></i>
                        <span>Services</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        <i className="far fa-gem"></i>
                        <span>Téléphone</span>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="#">
                        <i className="far fa-gem"></i>
                        <span>Immobilier</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="header-menu">
                      <span>Usuario No Autenticado</span>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        <i className="fa fa-sign-in-alt" />
                        <span>Se connecter</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        <i className="fa fa-user-plus" />
                        <span>S'inscrire</span>
                      </Link>
                    </li>

                    <li className="header-menu">
                      <span>Catégories</span>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/salasfiestas">
                        <i className="far fa-gem"></i>
                        <span>Salle des fete</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/cervicios">
                        <i className="far fa-gem"></i>
                        <span>Services</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        <i className="far fa-gem"></i>
                        <span>Téléphone</span>
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="#">
                        <i className="far fa-gem"></i>
                        <span>Immobilier</span>
                      </Link>
                    </li>


                  </>
                )}

              </ul>

 
            </div>
          </div>
        </nav >
 
        <main  >



        <div>
      <div className="page-wrapper chiller-theme toggled">
        <button id="show-sidebar" className="btn btn-sm btn-dark" onClick={handleSidebarToggle}>
          <i className="fas fa-bars" />
        </button>
        
        <main>
 
            <div className="carousel-wrapper mt-2">
              <Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
       
                <div>
                  <img src="00.jpg" alt="Descripción 1" style={{ width: '100%', height: '400px' }} />
                </div>
                <div>
                  <img src="11.jpg" alt="Descripción 2" style={{ width: '100%', height: '400px' }} />
                </div>
                <div>
                  <img src="22.jpg" alt="Descripción 3" style={{ width: '100%', height: '400px' }} />
                </div>
              </Carousel>
            </div>
         
          
         
            <div className="card-body">
              {homePosts.loading ? (
                <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
              ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
                <h2 className="text-center my-4">Pas d'article Salle</h2>
              ) : (
                <Posts  />
              )}
            </div>
        

 
            <div>
              {homeServicios.loading ? (
                <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
              ) : homeServicios.result === 0 && homeServicios.servicios.length === 0 ? (
                <h2 className="text-center my-4">Pas d'article Cervices</h2>
              ) : (
                <Servicioss />
              )}
            </div>
     
        </main>
      </div>
    </div>

        </main>

      </div >

    </div >
  )
}

export default Home
