
import LoadIcon from '../images/loading.gif'
import { Link } from 'react-router-dom'



import jQuery from 'jquery'

import Avatar from '../components/Avatar';
 



import Wilayacommune from '../components/searching/Wilayacommune';
import Marcamodelo from '../components/searching/Marcamodelo';



import { useTranslation } from 'react-i18next'
import Status from '../components/homePost/Status';

import Postsadmin from '../components/homeAdmin/Postsadmin';
import Posts from '../components/homePost/Posts.js';


import React, { useEffect, useState } from 'react';

import { getDataAPI } from '../utils/fetchData';

import Ventaanoautomobile from '../components/ranges/Ventaanoautomobile';
import Ventaprecioautomobile from '../components/ranges/Ventaprecioautomobile';
 
import Locacionprecioautomobile from '../components/ranges/Locacionprecioautomobile';
import { getPosts, POST_TYPES } from '../redux/actions/postAction';
 
import Kilometrajeautomobile from '../components/ranges/Kilometrajeautomobile';

 
  
import { setHeaderVisibility } from '../redux/actions/profileAction'; // Asegúrate de importar la acción adecuada

import { useSelector, useDispatch } from 'react-redux'
import {  useHistory } from 'react-router-dom'
const Home = () => {
  
  const { homePostsReducer, auth, homePostsadminReducer, languagee } = useSelector((state) => state);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch()
 
  const history = useHistory()
  useEffect(() => {
    if (user.role === "bloqueado") {
      dispatch(setHeaderVisibility(false));
      // Redirige al usuario bloqueado a la página 404
      history.push('/bloqueos'); // Asegúrate de que la ruta '/404' exista en tus rutas
    } else {
      dispatch(setHeaderVisibility(true));
    }
  }, [dispatch, user, history]);
  
 



  useEffect(() => {
    jQuery(function ($) {

      $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
      });

      $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
      });

    });
  }, [])

  const { t } = useTranslation();
  const [, setSearchResults] = useState([]);
  const [, setTotalResults] = useState(0);

  const [tipoTransaccion, setTipoTransaccion] = useState('');
  const [showSearchFields, setShowSearchFields] = useState(false);
  const [ ventaValue, setVentalocation] = useState('');
  const [wilayaValue, setWilayaValue] = useState('');
  const [communeValue, setCommuneValue] = useState('');
  const [marcaValue, setMarcaValue] = useState('');
  const [modeloValue, setModeloValue] = useState('');

  const [inergiaValue, setInergiaValue] = useState('');
  const [transmicionValue, setTransmicionValue] = useState('');
  const [papelesValue, setPapelesValue] = useState('');
  const [colorValue, setColorValue] = useState('');
  const [anoVente, setAnoVente] = useState([1990, 2023]);
  const [pricioVente, setPricioVente] = useState([100, 3000]);

  const [precioLocacion, setPrecioLocacion] = useState([2000, 50000]);
  const [kilometraje, setkilometraje] = useState([0, 500000]);

  const VentaAnoAutomobileeee = (value) => {
    setAnoVente(value);
  };
  const VentaPrecioAutomobileee = (value) => {
    setPricioVente(value);
  };


  const locacionPrecioAutomobileee = (value) => {
    setPrecioLocacion(value);
  };
  const kilometrajeeautomobiles = (value) => {
    setkilometraje(value);
  };

  const handleReset = () => {
    setVentalocation('');
    setTipoTransaccion('');
    setColorValue('');
    setWilayaValue('');
    setCommuneValue('');
    setMarcaValue('');
    setModeloValue('');
    setInergiaValue('');
    setTransmicionValue('');
    setPapelesValue('');
    setSearchResults([]);
    setAnoVente([1990, 2023]);
    setPricioVente([100, 3000]);

    setPrecioLocacion([3000, 50000]);
    setkilometraje([0, 500000]);
    dispatch(getPosts(auth.token));
  };

 

 


  const handleBuscar = async () => {

    try {

      let url = `/posts?limit=${homePostsReducer.page * 9}`;

      if (tipoTransaccion) {
        url += `&ventalocation=${tipoTransaccion}`;
      }


      if (anoVente[0] !== 1990 || anoVente[1] !== 2023) {
        url += `&minAnoVente=${anoVente[0]}&maxAnoVente=${anoVente[1]}`;
      }
      if (pricioVente[0] !== 100 || pricioVente[1] !== 3000) {
        url += `&minpricioVente=${pricioVente[0]}&maxpricioVente=${pricioVente[1]}`;
      }

      if (precioLocacion[0] !== 2000 || precioLocacion[1] !== 50000) {
        url += `&minprecioLocacion=${precioLocacion[0]}&maxprecioLocacion=${precioLocacion[1]}`;
      }
      if (kilometraje[0] !== 0 || kilometraje[1] !== 500000) {
        url += `&minkilometraje=${kilometraje[0]}&maxkilometrraje=${kilometraje[1]}`;
      }


      if (wilayaValue) {
        url += `&wilaya=${wilayaValue}`;
      }
      if (ventaValue) {
        url += `&venta=${ventaValue}`;
      }
      if (communeValue) {
        url += `&commune=${communeValue}`;
      }

      if (marcaValue) {
        url += `&marca=${marcaValue}`;
      }


      if (papelesValue) {
        url += `&papeles=${papelesValue}`;
      }

      if (inergiaValue) {
        url += `&inergia=${inergiaValue}`;
      }

      if (transmicionValue) {
        url += `&transmicion=${transmicionValue}`;
      }

      if (papelesValue) {
        url += `&papeles=${papelesValue}`;
      }


      if (colorValue) {
        url += `&color=${colorValue}`;
      }


      const response = await getDataAPI(url, auth.token);
      setSearchResults(response.data.automobiles); // Resetea los resultados de búsqueda
      setTotalResults(response.data.result);



      dispatch({
        type: POST_TYPES.GET_POSTS,
        payload: { ...response.data, page: homePostsReducer.page + 1 },
      });

    } catch (error) {
      console.error(error);
    }
  };


  const avatarSrc = auth?.user?.avatar;
  const username = auth?.user?.username;


  
  return (
    <div   >
           <div className="page-wrapper chiller-theme toggled">
        
        <nav id="sidebar" className="sidebar-wrapper">
          <div className="sidebar-content">


          <div className="sidebar-brand" style={{ marginBottom: '20px', paddingLeft: '15px', borderBottom: '1px solid #ccc' }}>
  {auth.user.role === 'admin' || auth.user.role === 'moderador' ? (
    <Link to="/pages/administracion/automobilesaprove" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
      <i className="fas fa-user-cog" style={{ fontSize: '24px', marginRight: '10px' }}></i>
      <span style={{ fontSize: '16px' }}>Administration</span>
    </Link>
  ) : (
    <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
      <i className="fas fa-chart-line" style={{ fontSize: '24px', marginRight: '10px' }}></i>
      <span style={{ fontSize: '20px' }}>Tassili</span>
    </Link>
  )}
  <div id="close-sidebar" style={{ marginLeft: 'auto', paddingRight: '15px', cursor: 'pointer' }}>
    <i className="fas fa-bars" style={{ color: 'red', fontSize: '1.5rem' }} />
  </div>
</div>












            <div className="sidebar-header" style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
              <div className="user-pic" style={{ marginRight: '10px' }}>
                {avatarSrc && <Avatar src={avatarSrc} className="img-responsive img-rounded" />}
              </div>
              <div className="user-info">
                <span className="user-name" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {username && <strong>{username}</strong>}
                </span>

                <i className="fas fa-redo" style={{ padding: '20px', borderBottom: '1px solid #ccc', cursor: 'pointer' }} onClick={() => window.location.reload()} />
              </div>
            </div>







            <div className="sidebar-menu">
              <div className="card" style={{ padding: '10px' }}>

               
                <Status />








                <form>
                  <div>

                    <button
                      type="button"
                      onClick={() => setShowSearchFields(!showSearchFields)}
                      style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}
                      className="btn btn-coral  form-control mt-2"
                    >
                      {t('Rechercheavance', { lng: languagee.language })}{' '}
                      <i className={`fas fa-search ${showSearchFields ? 'active' : ''}`} style={{ marginRight: '5px' }}></i>
                    </button>




                    {showSearchFields && (
                      <div>

                        <select
                          value={tipoTransaccion}
                          onChange={(e) => setTipoTransaccion(e.target.value)}
                          className="form-control mx-2 mb-2 mt-2"
                        >
                          <option value="">Type de tranzacction </option>
                          <option value="Vente">Vente </option>
                          <option value="Location"> Locacion </option>
                        </select>


                        {tipoTransaccion === 'Vente' && (

                          <div>
                            <div className="search-container   mb-2 mt-2">
                              <Wilayacommune
                                selectedWilaya={wilayaValue}
                                setSelectedWilaya={setWilayaValue}
                                selectedCommune={communeValue}
                                setSelectedCommune={setCommuneValue} />
                            </div>

                            <div className="search-container   mb-2 mt-2">
                              <Marcamodelo
                                selectedMarca={marcaValue}
                                setSelectedMarca={setMarcaValue}
                                selectedModelo={modeloValue}
                                setSelectedModelo={setModeloValue}
                              />
                            </div>
                            <div className='card-body mb-2'>
                              <div className="search-container  mb-2 mt-2">
                                <Ventaanoautomobile VentaAnoAutomobileeee={VentaAnoAutomobileeee} />
                              </div>
                              <div className="search-container   mb-2 mt-2">
                                <Kilometrajeautomobile kilometrajeeautomobiles={kilometrajeeautomobiles} />


                              </div>
                              <div className="search-container   mb-2 mt-2">
                                <Ventaprecioautomobile
                                  VentaPrecioAutomobileee={VentaPrecioAutomobileee}
                                />
                              </div>


                            </div>

                            <div className="search-container   mb-2 mt-2">
                              <select placeholder="Couleur" value={colorValue} onChange={(e) => setColorValue(e.target.value)} className="form-control"  >
                                <option value="">Couleur</option>
                                <option value="Blanc">Blanc</option>
                                <option value="Noir">Noir</option>
                                <option value="Gris">Gris</option>
                                <option value="Gris Argent">Gris Argent</option>
                                <option value="Gris Souris">Gris Souris</option>
                                <option value="Gris Manitoba">Gris Manitoba</option>
                                <option value="Gris Champagne">Gris Champagne</option>
                                <option value="Gris Alluminium">Gris Alluminium</option>
                                <option value="Bleu">Bleu</option>
                                <option value="Bleu Ciel">Bleu Ciel</option>
                                <option value="Bleu Nuit">Bleu Nuit</option>
                                <option value="Bleu Turquoise">Bleu Turquoise</option>
                                <option value="Bleu Gauloise">Bleu Gauloise</option>
                                <option value="Vert">Vert</option>
                                <option value="Vert Bouteille">Vert Bouteille</option>
                                <option value="Vert Militaire">Vert Militaire</option>
                                <option value="Vert Pistache">Vert Pistache</option>
                                <option value="Marron18">Marron</option>
                                <option value="Maron Chocolat">Maron Chocolat</option>
                                <option value="Rouge">Rouge</option>
                                <option value="Rouge Bordeaux">Rouge Bordeaux</option>
                                <option value="Grenat">Grenat</option>
                                <option value="Rose">Rose</option>
                                <option value="Jaun">Jaune</option>
                                <option value="Miel">Miel</option>
                                <option value="Beige">Beige</option>
                                <option value="Orange">Orange</option>
                                <option value="Violet">Violet</option>
                                <option value="Mauve">Mauve</option>
                                <option value="Aubergine">Aubergine</option>
                                <option value="Autre">Autre</option>
                              </select>
                            </div>

                            <div className="search-container  mb-2 mt-2">
                              <select value={inergiaValue} onChange={(e) => setInergiaValue(e.target.value)} className="form-control"  >
                                <option value="">Inergie</option>
                                <option value="Essence">Essence</option>
                                <option value="Diesel">Diesel</option>
                                <option value="GPL">GPL</option></select>
                            </div>

                            <div className="search-container   mb-2 mt-2">
                              <select value={transmicionValue} onChange={(e) => setTransmicionValue(e.target.value)} className="form-control" >
                                <option value="">Boite</option>
                                <option value="Manuelle">Manuelle</option>
                                <option value="Automatique">Automatique</option>
                                <option value="Semi Automatique">Semi Automatique</option>
                              </select>
                            </div>

                          </div>
                        )}





                        {tipoTransaccion === 'Location' && (

                          <div>
                            <div className="search-container  mb-2 mt-2">
                              <Wilayacommune
                                selectedWilaya={wilayaValue}
                                setSelectedWilaya={setWilayaValue}
                                selectedCommune={communeValue}
                                setSelectedCommune={setCommuneValue} />
                            </div>

                            <div className="search-container   mb-2 mt-2">
                              <Marcamodelo
                                selectedMarca={marcaValue}
                                setSelectedMarca={setMarcaValue}
                                selectedModelo={modeloValue}
                                setSelectedModelo={setModeloValue}
                              />
                            </div>
                            <div className='card-body mb-2'>


                              <div className="search-container   mb-2 mt-2">
                                <Locacionprecioautomobile
                                  locacionPrecioAutomobileee={locacionPrecioAutomobileee}
                                />
                              </div>
                            </div>


                          </div>
                        )}




                        <div className="search-container card-body   mb-2 mt-2" style={{  display: 'flex', justifyContent: 'space-between' }}>
                          <button type="button" onClick={handleBuscar} className="btn btn-primary" >
                            Filtre

                          </button>



                          <button type="button" onClick={handleReset} className="btn btn-secondary mr-2">
                            <i className="fas fa-redo" style={{ cursor: 'pointer' }} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>



                </form>
                <div className=' form-control '  >
                
                  <Link to="/message" style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }} className="btn btn-primary  ">
                  Contacter l'administrateur
                  </Link>
                </div>

                <div className='card mt-2'>
                  {auth.user.role === 'admin' && <Status />}

                  {auth.user.role === 'admin' && (
                    <Link to="/administracion/postspendientes" className="btn btn-primary ">
                      Administration  
                    </Link>
                  )}

                </div>




              </div>

            </div>

          </div>

        </nav>

        <main  >
          <div className="container-fluid">

            <div className="home">

              {homePostsadminReducer.loading ? (
                <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
              ) : (
                homePostsadminReducer.result === 0 && homePostsadminReducer.posts.length === 0 ? (
                  <h2 className="text-center">  </h2>
                ) : (
                  <Postsadmin />
                )
              )}
            </div>




            <span style={{ display: 'block', margin: '15px 0' }}>
              <div className="alert alert-info" role="alert" style={{ background: '#d1e7f7', borderRadius: '15px', padding: '7px', display: 'flex', alignItems: 'center' }}>

                <p style={{ fontSize: '16px', margin: '0', color: '#333' }}> </p>
              </div>
            </span>


            <div className="home">

              {homePostsReducer.loading ? (
                <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
              ) : (
                homePostsReducer.result === 0 && homePostsReducer.posts.length === 0 ? (
                  <h2 className="text-center">  </h2>
                ) : (
                  <Posts />
                )
              )}
            </div>





          </div>




        </main>

      </div>




    </div>
  )
}



export default Home
