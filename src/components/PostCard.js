import React from 'react';
 
  
import CardBody from './home/post_card/CardBody';
import CardFooter from './home/post_card/CardFooter';

import { useLocation } from 'react-router-dom';

import Cardeventossala from './home/post_card/Cardeventossala';
import Cardlocalizacionsala from './home/post_card/Cardlocalizacionsala';
 
import CardFooterdisplay from './home/post_card/CardFooterdisplay';
import Cardserviciosdesala from './home/post_card/Cardserviciosdesala';
import CardHeader from './home/post_card/CardHeader';
import CardHeaderpostpendientes from './home/post_card/CardHeaderpostpendientes';
 import Cardtitlesala from './home/post_card/Cardtitlesala';        
 
 const PostCard = ({ post }) => {
  const location = useLocation();
  const isPostDetailPage = location.pathname.startsWith(`/post/${post._id}`);

  const isHomePage = true; // Asegúrate de ajustar esto según tu lógica

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <div style={{ marginBottom: '10px' }}>
        {!isPostDetailPage && post.estado === 'pendiente' ? (
          <CardHeaderpostpendientes post={post} />
        ) : (
          !isPostDetailPage && <CardHeader post={post} />
        )}
      </div>
      <div style={{ alignSelf: 'flex-end' }}>
        <Cardtitlesala post={post} /> 
        <CardBody post={post} isHomePage={isHomePage} />
        {isPostDetailPage && <CardFooterdisplay post={post} />}
        {!isPostDetailPage && <CardFooter post={post} />}
        {isPostDetailPage && <Cardlocalizacionsala post={post} />}
        {isPostDetailPage && <Cardeventossala post={post} />}
        {isPostDetailPage && <Cardserviciosdesala post={post} />}
      </div>
    </div>
  );
};

export default PostCard;