 
import Carousel from '../../Carousel'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
const CardBody = ({ servicio }) => {
  


    return (
         <Card>
         <CardContent>
            {
                servicio.images.length > 0 && <Carousel images={servicio.images} id={servicio._id} />
            }
      </CardContent></Card>
    )
}

export default CardBody
