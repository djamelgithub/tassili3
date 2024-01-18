import React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
 
const Cardlocalizacionservicio = ({servicio }) => {
  const { telefono,wilaya,commune,email} = servicio;
  return (
    <Card>
       <CardContent>
        <Typography variant="body1" color="text.secondary">
         <span style={{ color: '#fff' }}> Téléphone: </span>{telefono}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <span style={{ color: '#fff' }}> Wilaya: </span>{wilaya}
        </Typography>
        <Typography variant="body1" color="text.secondary">
           <span style={{ color: '#fff' }}>Commune: </span>{commune}
        </Typography>
        <Typography variant="body1" color="text.secondary">
           <span style={{ color: '#fff' }}>E-mail: </span>{email}
        </Typography>
      </CardContent>
  </Card>
  );
};

export default Cardlocalizacionservicio;
