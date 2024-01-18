import React, { useState, useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import PostCard from '../PostCard';
import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { POSTPENDIENTE_TYPES } from '../../redux/actions/postaproveAction';
 
const Postssspendientes = ( ) => {
  const { homepostaprove, auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postspedientes = homepostaprove.posts.filter((p) => p.estado === 'pendiente');
    setPosts(postspedientes);
  }, [homepostaprove.posts]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`postspendientes?limit=${homepostaprove.page * 9}`, auth.token);

    dispatch({
      type: POSTPENDIENTE_TYPES.GET_POSTS_PENDIENTES,
      payload: { ...res.data, page: homepostaprove.page + 1 },
    });

    setLoad(false);
  };

  return (
    <div className="post_thumb">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      <LoadMoreBtn
        result={homepostaprove.result}
        page={homepostaprove.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};
export default Postssspendientes;
