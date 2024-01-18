import React, { useState, useRef, useEffect } from 'react'
import { FormGroup } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import communesjson from "../json/communes.json";


import { useSelector, useDispatch } from 'react-redux';


import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
//import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';


import { imageShow, videoShow } from '../../utils/mediaShow'
import { createPostpendiente } from '../../redux/actions/postaproveAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { updatePost } from '../../redux/actions/postAction';



import FormControl, { useFormControl } from '@mui/material/FormControl';
//import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
/*function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
        if (focused) {
            return 'This field is being focused';
        }

        return 'Helper text';
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
}*/
// variant="standard"   variant="outlined"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Mariages (حفلات الزفاف)',
    'Fiançailles (خطبة)',
    '3akika (عقيقة)',
    'Circoncision-khtana (الختان)',
    'Baptêmes (التعميد)',
    'Anniversaires (الذكرى)',
    'Diplômes (التخرج)',
    'Fêtes d\'anniversaire (حفلات عيد الميلاد)',
    'Réunions familiales (اجتماعات عائلية)',
    'Événements d\'entreprise (أحداث الشركات)',
    'Conférences (المؤتمرات)',
    'Séminaires (الندوات)',
    'Réunion (الاجتماع)',
    'Expositions (المعارض)',
    'Salle (القاعة)',
    'Fêtes (الاحتفالات)',
    'Dîner (العشاء)',
    'Buffet (البوفيه)',
    'Cafétéria (المقهى)',

];

const StatusModal = () => {

    const { auth, theme, status, socket } = useSelector(state => state)
    const { user } = useSelector(state => state.auth);
    const { bloquepost } = user;
    const dispatch = useDispatch()

    const initialState = {

        content: '',
        direcion: '',
        wilaya: '',
        commune: '',
        personName: [],
        servicios: [],
        price: '00',
        eventos: [],
        nombreapellido: '',
        telefono: '',
        email: '',
        option: '',

        capacidad: '',
        invitados: '',
        restaurante: '',
        decoracion: '',
        musica: '',
        disponibilidad: '',
        parking: '',
        autre: ''




    };


    const [postData, setPostdata] = useState(initialState);
    const [images, setImages] = useState([])

    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')
    
    const [selectedCommune, setSelectedCommune] = useState([]);
    const [selectedWilaya, setSelectedWilaya] = useState([]);

    const handleChangepersonName = (event) => {//personeNames names eventos
        const {
            target: { value },
        } = event;
        setPostdata({ ...postData, personName: value });
    };


    const handleWilayaChange = (event) => {
        const selectedWilaya = event.target.value;
       setSelectedWilaya(selectedWilaya);
       
        //setSelectedWilaya(Array.isArray(selectedWilaya) ? selectedWilaya : [selectedWilaya]);
    
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




    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setPostdata({ ...postData, [name]: value });
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

        if (status.onEdit) {
            dispatch(updatePost({ postData, wilaya: selectedWilaya, commune: selectedCommune, images, auth, status }));
        } else {
            dispatch(createPostpendiente({ postData, wilaya: selectedWilaya, commune: selectedCommune, images, auth, socket }));
        }

        setPostdata(initialState);

        setImages([]);
        setStream(false);

        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    };

    useEffect(() => {
        if (status.onEdit) {
            setPostdata({
                ...status,
            });
            setImages(status.images);
            setSelectedWilaya(status.wilaya)
            setSelectedCommune(status.commune)
        }
    }, [status]);



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
                                        style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Salles des Fêtes</Typography>
                                </FormControl>    <span onClick={() => dispatch({
                                    type: GLOBALTYPES.STATUS,
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

                                    variant="standard"
                                    color="warning"

                                    value={postData.content}
                                    name="content"
                                    onChange={handleChangeInput}
                                    label="Nom de la salle des fêtes"

                                    inputProps={{ maxLength: 40 }}


                                />
                            </FormGroup>
                            <hr></hr>
                            <FormGroup>
                                <TextField
                                    id="outlined-basic"
                                    className="form-control"

                                    value={postData.direcion}
                                    name="direcion"
                                    onChange={handleChangeInput}
                                    label="Adresse"
                                    variant="outlined"
                                    inputProps={{ maxLength: 40 }}
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
                                <FormControl sx={{ m: 0, width: '100%' }}>
                                    <InputLabel id="demo-multiple-checkbox-label">Événements de la Salle</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={Array.isArray(postData.personName) ? postData.personName : []}
                                        onChange={handleChangepersonName}
                                        input={<Input label="Tag" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox
                                                    checked={
                                                        Array.isArray(postData.personName) &&
                                                        postData.personName.indexOf(name) > -1
                                                    }
                                                />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </FormGroup>
                            <hr></hr>

                            <FormGroup>
                                <FormControl>
                                    <InputLabel id="option-label">Services de la salle </InputLabel>
                                    <Select
                                        labelId="option-label"
                                        value={postData.option}
                                        onChange={(e) => setPostdata({ ...postData, option: e.target.value })}
                                    >
                                        <MenuItem value="capacidad">Autonomie de la salle, Hommes & Femmes</MenuItem>
                                        <MenuItem value="invitados">Chambre & Hébergement pour invités</MenuItem>
                                        <MenuItem value="restaurante">Restaurant & cuisine & Dépôt</MenuItem>
                                        <MenuItem value="decoracion">Décoration de la salle</MenuItem>
                                        <MenuItem value="musica">Sonorisation </MenuItem>
                                        <MenuItem value="disponibilidad">Disponibilité & Promotions</MenuItem>
                                        <MenuItem value="parking">Parkings</MenuItem>
                                        <MenuItem value="autre">Description supplémentaire</MenuItem>


                                    </Select>
                                </FormControl>
                            </FormGroup>
                            {postData.option === 'capacidad' && (
                                <div className="option-details">

                                    <FormGroup row>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description : capacité totale de la salle pour hommes et femmes etc..."
                                                multiline
                                                rows={1}
                                                value={postData.capacidad}
                                                onChange={(e) =>
                                                    setPostdata({
                                                        ...postData,
                                                        capacidad: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            <hr></hr>

                            {postData.option === 'invitados' && (
                                <div className="option-details">
                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description des chambres pour les mariés et invités, etc..."
                                                multiline
                                                rows={1}
                                                value={postData.invitados}
                                                onChange={(e) =>
                                                    setPostdata({
                                                        ...postData,
                                                        invitados: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 420 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            <hr></hr>
                            {postData.option === 'restaurante' && (
                                <div className="option-details">
                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du restaurant, de la cuisine et du personnel en charge, etc..."
                                                multiline
                                                rows={1}
                                                value={postData.restaurante}
                                                onChange={(e) =>
                                                    setPostdata({
                                                        ...postData,
                                                        restaurante: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 300 }} // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            <hr></hr>
                            {postData.option === 'decoracion' && (
                                <div className="option-details">
                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description de la décoration de la pièce lumières, fauteuils tables vues etc..."
                                                multiline
                                                rows={1}
                                                value={postData.decoracion}
                                                onChange={(e) =>
                                                    setPostdata({
                                                        ...postData,
                                                        decoracion: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 300 }}  // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            <hr></hr>

                            {postData.option === 'musica' && (
                                <div className="option-details">
                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description de la sonorisation de la salle, groupe musical, disk jockey etc..."
                                                multiline
                                                rows={1}
                                                value={postData.musica}
                                                onChange={(e) =>
                                                    setPostdata({
                                                        ...postData,
                                                        musica: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 300 }}  // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}

                            <hr></hr>

                            {postData.option === 'disponibilidad' && (
                                <div className="option-details">
                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description de la disponibilité de la salle dans l'année et des promotions qu'elle dispose etc..."
                                                multiline
                                                rows={1}
                                                value={postData.disponibilidad}
                                                onChange={(e) =>
                                                    setPostdata({
                                                        ...postData,
                                                        disponibilidad: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 300 }}  // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}
                            <hr></hr>

                            {postData.option === 'parking' && (
                                <div className="option-details">
                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description du parking et sécurité associée etc..."
                                                multiline
                                                rows={1}
                                                value={postData.parking}
                                                onChange={(e) =>
                                                    setPostdata({
                                                        ...postData,
                                                        parking: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 300 }}  // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}


                            <hr></hr>


                            {postData.option === 'autre' && (
                                <div className="option-details">
                                    <FormGroup row>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Description supplémentaire"
                                                multiline
                                                rows={1}
                                                value={postData.autre}
                                                onChange={(e) =>
                                                    setPostdata({
                                                        ...postData,
                                                        autre: e.target.value,
                                                    })
                                                }
                                                inputProps={{ maxLength: 300 }}  // Puedes ajustar el valor de maxLength según tus necesidades
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )}





                            <FormGroup>
                                <TextField
                                    id="outlined-basic"
                                    className="form-control"
                                    value={postData.price}
                                    name="price"
                                    onChange={handleChangeInput}
                                    label="Prix"
                                    variant="outlined"
                                />
                            </FormGroup>

                            <hr></hr>

                            <FormGroup>
                                <TextField
                                    id="outlined-basic"
                                    className="form-control"
                                    value={postData.nombreapellido}
                                    name="nombreapellido"
                                    onChange={handleChangeInput}
                                    label="Nom et prénom"
                                    variant="outlined"
                                />
                            </FormGroup>

                            <hr></hr>
                            <FormGroup>
                                <TextField
                                    id="outlined-basic"
                                    className="form-control"
                                    value={postData.telefono}
                                    name="telefono"

                                    onChange={handleChangeInput}
                                    label="Téléphone"
                                    variant="outlined"
                                />
                            </FormGroup>
                            <hr></hr>
                            <FormGroup>
                                <TextField
                                    id="outlined-basic"
                                    className="form-control"
                                    value={postData.email}
                                    name="email"
                                    onChange={handleChangeInput}
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
                                disabled={bloquepost === 'bloque-post'}
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

export default StatusModal