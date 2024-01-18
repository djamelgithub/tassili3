import React from 'react';
import Card from '@mui/material/Card';

 

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import ListGroup from 'react-bootstrap/ListGroup';
const Cardpublicacionservice = ({servicio}) => {

    const { planificacionevnevenements, organisasionmariage, mobilierequipement, decorationallefetes, espaceenements, cateringbanquet, locationvoiture, audiovisueLumieres, musiciendirect, robescostumes, maquillagecoiffure,
        navetteinvites, photographievideographie, traiteurestauration, gateaumariage, fleurdecoration, enfants, nettoyage, securite, feuxartifice
    } = servicio;


    const optionDetails = [
        { label: 'Planification d\'événements:', input: planificacionevnevenements },
        { label: 'Organisation de mariages:', input: organisasionmariage },
        { label: 'Mobilier et équipement:', input: mobilierequipement },
        { label: 'Décoration d\'événements et de fêtes:', input: decorationallefetes },
        { label: 'Espace événementiel:', input: espaceenements },
        { label: 'Catering et banquet:', input: cateringbanquet },
        { label: 'Location de voiture:', input: locationvoiture },
        { label: 'Audiovisuel et Lumières:', input: audiovisueLumieres },
        { label: 'Musiciens en direct:', input: musiciendirect },
        { label: 'Robes et costumes:', input: robescostumes },
        { label: 'Maquillage et coiffure:', input: maquillagecoiffure },
        { label: 'Service de navette pour les invités:', input: navetteinvites },
        { label: 'Photographie et vidéographie:', input: photographievideographie },
        { label: 'Catering et restauration:', input: traiteurestauration },
        { label: 'Gâteau de mariage:', input: gateaumariage },
        { label: 'Décoration florale:', input: fleurdecoration },
        { label: 'Services pour enfants:', input: enfants },
        { label: 'Services de nettoyage:', input: nettoyage },
        { label: 'Services de sécurité:', input: securite },
        { label: 'Feux d\'artifice:', input: feuxartifice },
    ];
    

    return (
        <Card>
            <CardContent>

            <ListGroup>
                <Typography
                    level="title-md"
                    overlay="true"
                    underline="none"
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
           <ListGroup.Item>           Services: </ListGroup.Item> 
                </Typography>
                </ListGroup>

                {optionDetails.map((detalle, index) => (
    <div key={index}>
        {detalle.input && (
            <ListGroup>
                <Typography variant="body1" color="text.secondary">
                    <ListGroup.Item>
                        <span style={{ color: 'darkcyan' }}>{detalle.label}</span> {detalle.input}
                    </ListGroup.Item>
                </Typography>
            </ListGroup>
        )}
    </div>
))}

            </CardContent>
        </Card>
    );
};

export default Cardpublicacionservice



