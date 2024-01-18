import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EventIcon from '@mui/icons-material/Event';
import VisibilityIcon from '@mui/icons-material/Visibility';
 
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationVillageIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import ListGroup from 'react-bootstrap/ListGroup';
const Cardlocalizacionsala = ({ post }) => {
  const { direcion, wilaya, commune } = post;

  return (
    <Card>
      <CardContent>
        <ListGroup>
          <Typography
            level="title-md mb-2"
            overlay="true"
            underline="none"
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer',marginBottom:'7px' }}
          >
          <LocationOnIcon style={{ color: 'yellow' }} /> Contact & Coordonnés
          </Typography>

          <Typography variant="body1"  >
            <span style={{ color: 'darkcyan', marginRight: '0.6rem'  }}>
                <EventIcon /> Date: 
            </span>
              {new Date(post.createdAt).toLocaleDateString()} à {new Date(post.createdAt).toLocaleTimeString()}
          </Typography>

          <Typography variant="body1">
  <span style={{ color: 'darkcyan', marginRight: '0.6rem' }}>
    <VisibilityIcon /> Vues:
  </span>
  {post.views}
</Typography>

          <Typography variant="body1"  >
            <span style={{ color: 'darkcyan',marginRight: '0.6rem'  }}>
                <HomeIcon /> Likes: 
            </span>
            {post.likes.length}
          </Typography>

          <Typography variant="body1"  >
            <span style={{ color: 'darkcyan',marginRight: '0.6rem'  }}>
                  <HomeIcon /> Adresse: 
            </span>
            {direcion}
          </Typography>

          <Typography variant="body1"  >
            <span style={{ color: 'darkcyan',marginRight: '0.6rem'  }}>
                <LocationVillageIcon /> Commune: 
            </span>
            {commune}
          </Typography>

          <Typography variant="body1"  >
            <span style={{ color: 'darkcyan',marginRight: '0.6rem'  }}>
                 <LocationCityIcon /> Wilaya: 
            </span>
            {wilaya}
          </Typography>


          <Typography variant="body1"  >
            <span style={{ color: 'darkcyan',marginRight: '0.6rem'  }}>
                 <LocationCityIcon /> Prix 
            </span>
            {post.price} DA
          </Typography>


        </ListGroup>



      </CardContent>
    </Card>
  );
};

export default Cardlocalizacionsala;


