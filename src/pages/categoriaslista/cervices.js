import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Categorieaccordion from '../../components/Categorieaccordion';


const Cervices = () => {

  return (
    <div>




      <Breadcrumb>
        <Breadcrumb.Item href="/">Tassili</Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          Cervices
        </Breadcrumb.Item>

      </Breadcrumb>


      <Card>
        <CardContent>
          <Typography

            level="title-md"
            overlay="true"
            underline="none"
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Créer une annonce
          </Typography>
        </CardContent>
        <Categorieaccordion />

      </Card>
    </div>
  )
}

export default Cervices

