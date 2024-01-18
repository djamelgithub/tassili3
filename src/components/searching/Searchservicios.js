import React, { useState } from 'react';
import { FormGroup } from '@material-ui/core';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
 
 
const Searchservicios = ({ optionservicios, handleChangeInputservicios }) => {
    return (
        <div>
            <FormGroup>
                <FormControl>
                    <InputLabel id="option-label">Option Services de la salle de fête</InputLabel>

                    <Select
                       label="Choisissez un service"
                       value={optionservicios}
                       onChange={(e) => handleChangeInputservicios(e.target.value)}   
                       name="optionservicios"
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
    );
};

export default Searchservicios;
