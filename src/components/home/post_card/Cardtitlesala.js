
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';

 

import moment from 'moment';
import 'moment/locale/fr';

const Cardtitlesala = ({ post }) => {
  const { content } = post

  return (
 
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'red[500]' }}> </Avatar>}
        title={content}  // Utiliza title para el contenido del CardHeader
        subheader= {moment(post.createdAt).fromNow()} // Utiliza subheader para el tiempo de publicación
      />
    </Card>
  )}
        export default Cardtitlesala;

