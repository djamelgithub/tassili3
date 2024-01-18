
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';

 

import moment from 'moment';
import 'moment/locale/fr';

 
const Cardtitleservicio = ({ servicio}) => {
 const {content} = servicio

  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardHeader
      avatar={<Avatar sx={{ bgcolor: 'red[500]' }}> </Avatar>}
      title={content}  // Utiliza title para el contenido del CardHeader
      subheader= {moment(servicio.createdAt).fromNow()} // Utiliza subheader para el tiempo de publicación
    />
  </Card>
     

  );
};

export default Cardtitleservicio;

