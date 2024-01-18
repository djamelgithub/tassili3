
 
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { FormGroup } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';




const Statussearch = () => {
 

 


  return (
    <Card>
      <CardContent>
        <div className="status_modal">
          <form onSubmit={handleSubmit}>
            <div className="status_header">
              <h5 className="m-0">Create Post</h5>
              <span onClick={() => dispatch({
                type: GLOBALTYPES.STATUSSEARCH, payload: false
              })}>
                &times;
              </span>
            </div>

            <div className="status_body">

              <FormGroup>

                <TextField
                  id="outlined-basic"
                  className="form-control"

                  variant="standard"
                  color="warning"

         
                  label="Title"

                  inputProps={{ maxLength: 40 }}


                />
              </FormGroup>
              <hr></hr>


              

              <hr></hr>
              <hr></hr>

              <div className="status_footer">
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  type="submit"
                >
                  Envoyer
                </Button>
              </div>

            </div>
          </form>
        </div>
      </CardContent >

    </Card>

  )
}





export default Statussearch
