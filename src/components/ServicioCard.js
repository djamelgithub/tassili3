import React from 'react';
import { useLocation } from 'react-router-dom';
import CardBody from './homeservicio/servicio_card/CardBody';
import CardFooter from './homeservicio/servicio_card/CardFooter';
import CardHeader from './homeservicio/servicio_card/CardHeader';

import CardFooterdisplay from './homeservicio/servicio_card/CardFooterdisplay';



import CardHeaderpendienteservicio from './homeservicio/servicio_card/CardHeaderpendienteservicio';
import Cardlocalizacionservicio from './homeservicio/servicio_card/Cardlocalizacionservicio';
import Cardpublicacionservice from './homeservicio/servicio_card/Cardpublicacionservice';
import Cardtitleservicio from './homeservicio/servicio_card/Cardtitleservicio';
//import Cardtitleservicio from './homeservicio/servicio_card/Cardtitleservicio';<Cardtitleservicio servicio={servicio} />

const ServicioCard = ({ servicio }) => {
    const location = useLocation();
    const isServicioDetailPage = location.pathname.startsWith(`/servicio/${servicio._id}`);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ marginBottom: '10px' }}>
                {!isServicioDetailPage && servicio.estado === 'pendiente' ? (
                    <CardHeaderpendienteservicio servicio={servicio} />
                ) : (
                    !isServicioDetailPage && <CardHeader servicio={servicio} />
                )}
            </div>
            <div style={{ alignSelf: 'flex-end' }}>
              <Cardtitleservicio servicio={servicio} />  
                <CardBody servicio={servicio} />
                {isServicioDetailPage && <Cardlocalizacionservicio servicio={servicio} />}
                {isServicioDetailPage && <Cardpublicacionservice servicio={servicio} />}
                {isServicioDetailPage && <CardFooterdisplay servicio={servicio} />}
                {!isServicioDetailPage && <CardFooter servicio={servicio} />}


            </div>
        </div>
    );
};

export default ServicioCard;

