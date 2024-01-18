import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
 



const Categorieaccordion = () => {
  
  const dispatch = useDispatch();
  const isFormVisible = useSelector((state) => state.status); // Ajusta según tu estructura de estado
  const [selectedProperty, setSelectedProperty] = useState('');

  const handleClickToShowForm = (property) => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: true });
    setSelectedProperty(property);
  };
  const handleClickToShowFormservice = (property) => {
    dispatch({ type: GLOBALTYPES.STATUSSERVICIO, payload: true });
    setSelectedProperty(property);
  };
  const handleClickToShowFormsstusadmin = (property) => {
    dispatch({ type: GLOBALTYPES.STATUSSEARCH, payload: true });
    setSelectedProperty(property);
  };

  const renderForm = () => {

    switch (selectedProperty) {
      case 'Salle de fête':
        return (
          <div>
            <form>

            </form>
          </div>
        );

      default:
        return null;
    }
  };

  

  const accordionItemStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div>

      {isFormVisible && renderForm()}

      <Accordion>
      <AccordionSummary style={accordionItemStyles}>
      <i className="fas fa-cogs"   style={{ marginRight: '5px', fontSize: '1.2em' }}></i>
  
      <h3 style={{ color: '#F39C12' }}>Services</h3>
  
    </AccordionSummary>
        <AccordionDetails style={accordionItemStyles}>
     
          <span onClick={() => handleClickToShowForm('Salle de fête')}>Salle de fête</span>
        </AccordionDetails>
        <AccordionDetails style={accordionItemStyles}>
        
          <span onClick={() => handleClickToShowFormservice('Salle de fête')}> Service salle de fête</span>
        </AccordionDetails>
        <AccordionDetails style={accordionItemStyles}>
      
          <span onClick={() => handleClickToShowFormsstusadmin('Restauration')}>STATUS ADMIN</span>
        </AccordionDetails>
        <AccordionDetails style={accordionItemStyles}>
       
          <span onClick={() => handleClickToShowForm('Hôtellerie')}>Hôtellerie</span>
        </AccordionDetails>
      </Accordion>

      <AccordionSummary  >
    
        <h3 style={{ color: '#F39C12' }}>Imobilier</h3>
      </AccordionSummary>
      <AccordionSummary  >
   
        <h3 style={{ color: '#F39C12' }}>Téléphone</h3>
      </AccordionSummary>
    </div>
  );
};

export default Categorieaccordion
