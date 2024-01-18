import React, { useEffect } from 'react'



import LoadIcon from '../../images/loading.gif'
 
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/authAction';
import { Card, Container } from 'react-bootstrap';
import Serviciospendientes from '../../components/homeservicio/Serviciospendientes';
 

//import Avatar from '../components/Avatar'         <Avatar src={auth.user.avatar} size="medium-avatar" />      </div>
let scroll = 0;

const Postsservicios = () => {
  const { auth,servicioaproveReducer } = useSelector((state) => state);
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
              <Link className="dropdown-item" to='/'>

                <span>Tassili Web Site</span>
              </Link>
              <div id="close-sidebar">
                <i className="fas fa-times" />
              </div>
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
                     <span>Administrations</span>
                   </li>
                   <li>
                     <Link className="dropdown-item" to='/pages/administracion/index' >
                       <i className="fa fa-cogs" />
                       <span>Page princepal</span>
                     </Link>
                   </li>
 
 
                   <li>
                      <Link className="dropdown-item" to="/pages/administracion/saladefiestas">
                        <i className="fa fa-plus-circle" />
                        <span>Posts salle des fetes</span>
                      </Link>
                    </li>
 
 
                   <li>
                     <Link className="dropdown-item" to="/pages/administracion/postsservicios">
                       <i className="fa fa-plus-circle" />
                       <span>Posts services</span>
                     </Link>
                   </li>
                  
                   <li>
                     <Link className="dropdown-item" to="/pages/administracion/users">
                       <i className="fa fa-plus-circle" />
                       <span>Utilizateurs</span>
                     </Link>
                   </li>
                   <li>
                    <Link className="dropdown-item" to="/pages/administracion/userrole">
                      <i className="fa fa-plus-circle" />
                      <span>Role Utilizateurs</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/pages/administracion/blockuser">
                      <i className="fa fa-plus-circle" />
                      <span>block Utilizateurs</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/pages/administracion/blockpost">
                      <i className="fa fa-plus-circle" />
                      <span>Block post</span>
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
       </nav>
 
       <main  >
  
 
         <div >
 
 
         <Container>
      <Card>
        <Card.Body>
       
          <Card.Text>liste des posts cervices pour aprouve</Card.Text>
        </Card.Body>
      </Card>
    </Container>

    {
              servicioaproveReducer.loading
                ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                : (servicioaproveReducer.result === 0 && servicioaproveReducer.length === 0)
                  ? <h2 className="text-center my-4">Pas d'article pour approuvé</h2>
                  : <Serviciospendientes />
            }


         </div>
  
       </main>
 
     </div>
 
   </div>
  )
}



export default Postsservicios

        