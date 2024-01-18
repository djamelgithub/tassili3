import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
 
import RoomServiceIcon from '@mui/icons-material/RoomService';
import ListGroup from 'react-bootstrap/ListGroup';
const Cardserviciosdesala = ({ post }) => {
  const { capacidad,invitados,restaurante, decoracion, musica, disponibilidad, parking, autre } = post;

  const optionDetails = [
    { label: 'Capacité Totale, Hommes & Femmes:', input: capacidad },
    { label: 'Réception des invités:', input: invitados},
    { label: 'Décoration de la salle:', input: decoracion },
    { label: 'Restaurant, cuisine & Dépôt:', input: restaurante },
 
    { label: 'Sonorisation:', input: musica },
    { label: 'Disponibilité et Promotions de la salle:', input: disponibilidad },
    
    { label: 'Parking:', input: parking },
    { label: 'Description supplémentaire', input: autre },
     




  ];

  return (
    <Card>
      <CardContent>
        <Typography
          level="title-md"
          overlay="true"
          underline="none"
          style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
        >
          <RoomServiceIcon style={{ color: 'yellow', marginRight: '7px' }} /> Services disponibles et description:

        </Typography>

        {optionDetails.map((detalle, index) => (
          <div key={index}>
            {detalle.input && (
              <ListGroup>
                <Typography variant="body1" color="">
                  <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                    <li style={{ marginBottom: '8px' }}>
                      <span style={{ color: 'darkcyan', marginRight: '8px' }}>{detalle.label}</span>
                      {detalle.input}
                    </li>
                  </ul>
                </Typography>
              </ListGroup>
            )}
          </div>
        ))}

      </CardContent>
    </Card>
  );
};

export default Cardserviciosdesala;
