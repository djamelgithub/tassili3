
import * as React from 'react';
import Card from '@mui/material/Card';
 
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const CardFooter = ({servicio}) => {
  //const location = useLocation();
  //const isDetailPage = location.pathname.startsWith(`/post/${post._id}`);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizardhhh
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    
     
        <Button
          component={Link}
          to={`/servicio/${servicio._id}`}
          fullWidth
          variant="contained"
          color="primary"
        >
          Detallesgggg
        </Button>
    
    </Card>
  );
};

export default CardFooter;