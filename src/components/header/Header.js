import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import Avatar from '../Avatar'

import Wilayacommune from '../searching/Wilayacommune';
import { getPosts, POST_TYPES } from '../../redux/actions/postAction';
import { getDataAPI } from '../../utils/fetchData';

import SearchPosts from '../SearchPosts';
import Preciosalaaa from '../ranges/Preciosalaaa';

import { SERVICIO_TYPES } from '../../redux/actions/servicioAction';

import { FormGroup } from '@material-ui/core';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';




const Header = ({ selectedCategory, setSelectedCategory }) => {

    const { auth, theme, homePosts, homeServicios } = useSelector(state => state)
    const expand = false;


    const [servicioData, setServiciodata] = useState('');

    const [currentCategoria, setCurrentCategoria] = useState('posts');

    const [showSalaForm, setShowSalaForm] = useState(false);
    const [showServiciosForm, setShowServiciosForm] = useState(false);
    const dispatch = useDispatch()

    const [tipoTransaccion, setTipoTransaccion] = useState('');


    const [contentValue, setContent] = useState('');

    const [wilayaValue, setWilayaValue] = useState('');
    const [communeValue, setCommuneValue] = useState('');

    const [prixsalle, setPrixsalle] = useState([100, 3000]);

    const [personNameValue, setPersonName] = useState([]);
    const [eventosValue, setEventos] = useState([]);



    const Preciosala = (value) => {
        setPrixsalle(value);
    };


    const handleReset = () => {
        setContent('');
        setWilayaValue('');
        setCommuneValue('');
        setPersonName('');

        setEventos('');

        setPrixsalle([10, 300]);

        dispatch(getPosts(auth.token));
    };







    const handleBuscar = async () => {
        try {
            let url = `/${currentCategoria}?limit=${currentCategoria === 'servicios' ? homeServicios.page * 9 : homePosts.page * 9}`;
    
            if (currentCategoria === 'servicios') {
                if (servicioData.optionservicios && servicioData.optionservicios.length > 0) {
                    url += `&optionservicios=${encodeURIComponent(servicioData.optionservicios.join(','))}`;
                }
            } else {
                url = `/posts?limit=${homePosts.page * 9}`;
                if (tipoTransaccion) url += `&ventalocation=${tipoTransaccion}`;
                if (prixsalle[0] !== 10 || prixsalle[1] !== 300) url += `&minprixsalle=${prixsalle[0]}&maxprixsalle=${prixsalle[1]}`;
                if (wilayaValue) url += `&wilaya=${wilayaValue}`;
                if (contentValue) url += `&content=${contentValue}`;
                if (communeValue) url += `&commune=${communeValue}`;
                if (personNameValue) url += `&personName=${personNameValue}`;
                if (eventosValue) url += `&eventos=${eventosValue}`;
            }
    
            setSelectedCategory(currentCategoria);
    
            const response = await getDataAPI(url, auth.token);
    
            dispatch({
                type: currentCategoria === 'servicios' ? SERVICIO_TYPES.GET_SERVICIOS : POST_TYPES.GET_POSTS,
                payload: { ...response.data, page: currentCategoria === 'servicios' ? homeServicios.page + 1 : homePosts.page + 1 },
            });
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleCategoryChange = (category) => {
        setShowSalaForm(category === 'posts');
        setShowServiciosForm(category === 'servicios');
        setCurrentCategoria(category);
    };



    return (
        <Navbar expand={expand} className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand href="/" style={{ fontSize: '24px', color: 'blue' }}>Tassili</Navbar.Brand>

                <SearchPosts />

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton />
                    <Offcanvas.Body style={{ maxWidth: 'auto' }}>

                        <Nav style={{ maxWidth: 'auto' }}  >

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


                                        </span>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="navbarDropdown"
                                            style={{ transform: 'translateX(75px)' }}
                                        >
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

                        </Nav>

                        <div className='card-title mt-4  '>
                            <h5>Recherche avancee:</h5>
                        </div>
                        <div>

                            <div className="card">
                                <form>
                                    <div>
                                        <select
                                            value={tipoTransaccion}
                                            onChange={(e) => setTipoTransaccion(e.target.value)}
                                            className="form-control mx-2 mb-2 mt-2"
                                        >
                                            <option value="">Type de tranzacction</option>
                                            <option value="Sala">Sala</option>
                                            <option value="Servicio">Servicios</option>
                                        </select>

                                        {tipoTransaccion === 'Sala' && (
                                            <div className='card-body form-group' style={{ width: '100%' }}>
                                                <div className="search-container mb-4 mt-4">
                                                    <Wilayacommune
                                                        selectedWilaya={wilayaValue}
                                                        setSelectedWilaya={setWilayaValue}
                                                        selectedCommune={communeValue}
                                                        setSelectedCommune={setCommuneValue}
                                                    />
                                                </div>

                                                <Form.Control
                                                    type="text"
                                                    name='contentValue'
                                                    value={contentValue}
                                                    placeholder="Titrbbbbe"
                                                    className="mb-4"
                                                    onChange={(e) => setContent(e.target.value)}
                                                />

                                                <Preciosalaaa Preciosala={Preciosala} />

                                                <div className='mt-4'>
                                                  
                                                   
                                                    {showServiciosForm && (
                                                        <Button
                                                            type="button"
                                                            onClick={() => handleBuscar()}
                                                            className="btn btn-primary btn-block"
                                                        >
                                                            Filtrar Servicios
                                                        </Button>
                                                    )}

                                                </div>
                                            </div>

                                        )}

                                        {tipoTransaccion === 'Servicio' && (



                                            <div className='card-body mb-2'>
                                                <FormGroup>
                                                    <FormControl>
                                                        <InputLabel id="option-label">Option Services de la salle de fête</InputLabel>

                                                        <Select
                                                            labelId="option-label"
                                                            value={servicioData.optionservicios}
                                                            onChange={(e) => setServiciodata({ ...servicioData, optionservicios: e.target.value })}
                                                        >
                                                            <MenuItem value="planificacionevnevenements">Services de Planification de événements</MenuItem>
                                                            <MenuItem value="organisasionmariage">Organisations de mariage</MenuItem>
                                                            <MenuItem value="mobilierequipement">Location de Mobilier et Équipement</MenuItem>
                                                            <MenuItem value="decorationallefetes">Décoration Des Salles Des Fêtes</MenuItem>
                                                            <MenuItem value="espaceenements">Espace pour les événements</MenuItem>
                                                            <MenuItem value="cateringbanquet">Catering et Banquet </MenuItem>
                                                            <MenuItem value="locationvoiture">Transport de Luxe / Location de voiture de mariage</MenuItem>
                                                            <MenuItem value="audiovisueLumieres">Location de matériel audiovisuel et Lumières</MenuItem>
                                                            <MenuItem value="musiciendirect">Musiciens et Groupes en Direct</MenuItem>
                                                            <MenuItem value="robescostumes">Location de robes de mariée et de costumes</MenuItem>
                                                            <MenuItem value="maquillagecoiffure">Service de maquillage et coiffure</MenuItem>
                                                            <MenuItem value="navetteinvites">Service de navette pour les invités</MenuItem>
                                                            <MenuItem value="photographievideographie">Photographie et Vidéographie</MenuItem>
                                                            <MenuItem value="traiteurestauration">Service de Traiteur et Restauration</MenuItem>
                                                            <MenuItem value="gateaumariage">Gâteau de mariage </MenuItem>
                                                            <MenuItem value="fleurdecoration">Services de Fleurs et Décoration</MenuItem>
                                                            <MenuItem value="enfants">Service de garde d\'enfants</MenuItem>
                                                            <MenuItem value="nettoyage">Services de Nettoyage</MenuItem>
                                                            <MenuItem value="securite">Service de sécurité</MenuItem>
                                                            <MenuItem value="feuxartifice">Feux d\'artifice</MenuItem>

                                                        </Select>
                                                    </FormControl>
                                                </FormGroup>



                                            </div>


                                        )}





                                        <div className="search-container card-body mb-2 mt-2">
                                            <button type="button"   onClick={() => handleBuscar()} className="btn btn-primary">
                                                Filtre
                                            </button>

                                            <button type="button" onClick={handleReset} className="btn btn-secondary mr-2">
                                                <i className="fas fa-redo" style={{ cursor: 'pointer' }} />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>


                        </div>


                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
