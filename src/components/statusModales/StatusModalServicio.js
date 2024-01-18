import React, { useState, useRef, useEffect } from 'react'
import { FormGroup } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import communesjson from "../json/communes.json";
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { createServiciopendiente } from '../../redux/actions/servicioaproveAction';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import { updateServicio } from '../../redux/actions/servicioAction';
import { imageShow, videoShow } from '../../utils/mediaShow'
 



const StatusModalServicio = () => {

    const { auth, theme, statusservicio, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory();
    const initialState = {

        content: '',
        wilaya: '',
        commune: '',
        telefono: '',

        email: '',

        optionservicios: '',
        planificacionevnevenements: '',
        organisasionmariage: '',
        mobilierequipement: '',
        decorationallefetes: '',
        espaceenements: '',
        cateringbanquet: '',
        locationvoiture: '',
        audiovisueLumieres: '',
        musiciendirect: '',
        robescostumes: '',
        maquillagecoiffure: '',
        navetteinvites: '',
        photographievideographie: '',
        traiteurestauration: '',
        gateaumariage: '',
        fleurdecoration: '',
        enfants: '',
        nettoyage: '',
        securite: '',
        feuxartifice: '',




    };


    const [servicioData, setServiciodata] = useState(initialState);
    const [images, setImages] = useState([])

    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')
    const [selectedWilaya, setSelectedWilaya] = useState([]);
    const [selectedCommune, setSelectedCommune] = useState([]);



    const handleWilayaChange = (event) => {
        const selectedWilaya = event.target.value;
        setSelectedWilaya(selectedWilaya);

        const wilayaEncontrada = communesjson.find((wilaya) => wilaya.wilaya === selectedWilaya);
        const communes = wilayaEncontrada && wilayaEncontrada.commune ? wilayaEncontrada.commune : [];

        if (communes.length > 0) {
            setSelectedCommune(communes[0]);
        } else {
            setSelectedCommune('');
        }
    };

    const handleCommuneChange = (event) => {
        setSelectedCommune(event.target.value);
    };

    const wilayasOptions = communesjson.map((wilaya, index) => (
        <MenuItem key={index} value={wilaya.wilaya}>
            {wilaya.wilaya}
        </MenuItem>
    ));
    const communesOptions = communesjson.find((wilaya) => wilaya.wilaya === selectedWilaya)?.commune?.map((commune, index) => (
        <MenuItem key={index} value={commune}>
            {commune}
        </MenuItem>
    ));


    const handleChangeInputservicios = (e) => {
        const { name, value } = e.target;
        setServiciodata({ ...servicioData, [name]: value });
    }





    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleStream = () => {
        setStream(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()

                    const track = mediaStream.getTracks()
                    setTracks(track[0])
                }).catch(err => console.log(err))
        }
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, { camera: URL }])
    }

    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (images.length === 0) {
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Please add your photo.' },
            });
        }

        if (statusservicio.onEdit) {
            dispatch(updateServicio({ servicioData, wilaya: selectedWilaya, commune: selectedCommune, images, auth, statusservicio }));
        } else {
            dispatch(createServiciopendiente({ servicioData, wilaya: selectedWilaya, commune: selectedCommune, images, auth, socket }));
        }

        setServiciodata(initialState);

        setImages([]);
        setStream(false);

        dispatch({ type: GLOBALTYPES.STATUSSERVICIO, payload: false });
        history.push('/servicios');

    };

    useEffect(() => {
        if (statusservicio.onEdit) {
            setServiciodata({
                ...statusservicio,
            });
            setImages(statusservicio.images);
            setSelectedWilaya(statusservicio.wilaya)
            setSelectedCommune(statusservicio.commune)
        }
    }, [statusservicio]);



    return (

        <Card>
            <CardContent>
                <div className="status_modal">
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <div className="status_header">
                                <FormControl>
                                    <Typography
                                        level="title-md"
                                        overlay="true"
                                        underline="none"
                                        style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Services</Typography>
                                </FormControl>    <span onClick={() => dispatch({
                                    type: GLOBALTYPES.STATUSSERVICIO,
                                    payload: false
                                })}>
                                    &times;
                                </span>
                            </div>
                        </FormGroup>
                        <hr></hr>

                        <div className="status_body">

                            <FormGroup>
                                <TextField
                                    id="outlined-basic"
                                    className="form-control"
                                    value={servicioData.content}
                                    name="content"
                                    onChange={handleChangeInputservicios}
                                    label="Titre du service"
                                    variant="outlined"
                                />
                            </FormGroup>
                            <hr></hr>


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
                            {servicioData.optionservicios === 'planificacionevnevenements' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service planificacionevnevenements etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.planificacionevnevenements}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        planificacionevnevenements: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'organisasionmariage' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>

                                            <TextField
                                                label="Description du service organisasionmariage etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.organisasionmariage}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        organisasionmariage: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'mobilierequipement' && (
                                <div className="option-details">

                                    <FormGroup row>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service mobilierequipement etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.mobilierequipement}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        mobilierequipement: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'decorationallefetes' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service decorationallefetes etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.decorationallefetes}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        decorationallefetes: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'espaceenements' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>

                                            <TextField
                                                label="Description du service espaceenements etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.espaceenements}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        espaceenements: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'cateringbanquet' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>

                                            <TextField
                                                label="Description du service cateringbanquet etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.cateringbanquet}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        cateringbanquet: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'locationvoiture' && (
                                <div className="option-details">

                                    <FormGroup row>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service locationvoiture etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.locationvoiture}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        locationvoiture: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'audiovisueLumieres' && (
                                <div className="option-details">

                                    <FormGroup row>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service audiovisueLumieres etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.audiovisueLumieres}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        audiovisueLumieres: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'musiciendirect' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>

                                            <TextField
                                                label="Description du service musiciendirect etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.musiciendirect}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        musiciendirect: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'robescostumes' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>

                                            <TextField
                                                label="Description du service robescostumes etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.robescostumes}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        robescostumes: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}

                            {servicioData.optionservicios === 'maquillagecoiffure' && (
                                <div className="option-details">

                                    <FormGroup row>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service maquillagecoiffure etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.maquillagecoiffure}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        maquillagecoiffure: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'navetteinvites' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>

                                            <TextField
                                                label="Description du service navetteinvites etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.navetteinvites}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        navetteinvites: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'photographievideographie' && (
                                <div className="option-details">

                                    <FormGroup row>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service photographievideographie   etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.photographievideographie}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        photographievideographie: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}

                            {servicioData.optionservicios === 'traiteurestauration' && (
                                <div className="option-details">

                                    <FormGroup row>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service traiteurestauration  etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.traiteurestauration}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        traiteurestauration: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'gateaumariage' && (
                                <div className="option-details">

                                    <FormGroup row>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service gateaumariage  etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.gateaumariage}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        gateaumariage: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'fleurdecoration' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service fleurdecoration  etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.fleurdecoration}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        fleurdecoration: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'enfants' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service enfants  etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.enfants}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        enfants: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>

                                    </FormGroup>
                                </div>
                            )}

                            {servicioData.optionservicios === 'nettoyage' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service nettoyage etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.nettoyage}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        nettoyage: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'securite' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service securite etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.securite}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        securite: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            {servicioData.optionservicios === 'feuxartifice' && (
                                <div className="option-details">

                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du service feuxartifice etc..."
                                                multiline
                                                rows={1}
                                                value={servicioData.feuxartifice}
                                                onChange={(e) =>
                                                    setServiciodata({
                                                        ...servicioData,
                                                        feuxartifice: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>

                                    </FormGroup>
                                </div>
                            )}


                            <hr></hr>
                            <FormGroup>
                                <TextField
                                    id="outlined-basic"
                                    className="form-control"
                                    value={servicioData.telefono}
                                    name="telefono"
                                    onChange={handleChangeInputservicios}
                                    label="Télephone"
                                    variant="outlined"
                                />
                            </FormGroup>
                            <hr></hr>
                            <FormGroup>
                                <FormControl className="form-control">
                                    <InputLabel id="wilaya-label">Wilaya</InputLabel>
                                    <Select
                                        labelId="wilaya-label"
                                        id="wilaya-select"
                                        value={selectedWilaya}
                                        name="wilaya"
                                        label="Wilaya"
                                        onChange={handleWilayaChange}
                                    >
                                        <MenuItem value="">Wilaya</MenuItem>
                                        {wilayasOptions}
                                    </Select>
                                </FormControl>
                            </FormGroup>
                            <hr></hr>
                            <FormGroup>
                                <FormControl className="form-control">
                                    <InputLabel id="commune-label">Commune</InputLabel>
                                    <Select
                                        labelId="commune-label"
                                        id="commune-select"
                                        value={selectedCommune}
                                        name="commune"
                                        label="Comune"
                                        onChange={handleCommuneChange}
                                    >
                                        <MenuItem value="">Commune</MenuItem>
                                        {communesOptions}
                                    </Select>
                                </FormControl>
                            </FormGroup>
                            <hr></hr>




                            <FormGroup>
                                <TextField
                                    id="outlined-basic"
                                    className="form-control"
                                    value={servicioData.email}
                                    name="email"
                                    onChange={handleChangeInputservicios}
                                    label="E-mail"
                                    variant="outlined"
                                />
                            </FormGroup>


                            <hr></hr>

                            <hr></hr>
                            <div className="show_images">
                                {
                                    images.map((img, index) => (
                                        <div key={index} id="file_img">
                                            {
                                                img.camera ? imageShow(img.camera, theme)
                                                    : img.url
                                                        ? <>
                                                            {
                                                                img.url.match(/video/i)
                                                                    ? videoShow(img.url, theme)
                                                                    : imageShow(img.url, theme)
                                                            }
                                                        </>
                                                        : <>
                                                            {
                                                                img.type.match(/video/i)
                                                                    ? videoShow(URL.createObjectURL(img), theme)
                                                                    : imageShow(URL.createObjectURL(img), theme)
                                                            }
                                                        </>
                                            }
                                            <span onClick={() => deleteImages(index)}>&times;</span>
                                        </div>
                                    ))
                                }
                            </div>


                            {
                                stream &&
                                <div className="stream position-relative">
                                    <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                        style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

                                    <span onClick={handleStopStream}>&times;</span>
                                    <canvas ref={refCanvas} style={{ display: 'none' }} />
                                </div>
                            }

                            <div className="input_images">
                                {
                                    stream
                                        ? <i className="fas fa-camera" onClick={handleCapture} />
                                        : <>
                                            <i className="fas fa-camera" onClick={handleStream} />

                                            <div className="file_upload">
                                                <i className="fas fa-image" />
                                                <input type="file" name="file" id="file"
                                                    multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                            </div>
                                        </>
                                }

                            </div>

                        </div>


                        <div className="status_footer">
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                type="submit"
                            >
                                Envoyer
                            </Button>
                        </div>

                    </form>
                </div>

            </CardContent >
        </Card >


    )
}


export default StatusModalServicio
