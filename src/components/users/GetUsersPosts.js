import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadIcon from '../../images/loading.gif';
 import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { USERS_TYPES } from '../../redux/actions/users/usersAction';

import getTotalLikes from './getTotalLikes';
import getTotalComments from './getTotalComments';
 
import UserCard from '../UserCard';
import Searchuser from '../header/Searchuser';




const GetUsersPosts = () => {
  const { usersReducer, auth } = useSelector(state => state);
  
 
  const dispatch = useDispatch();
  const currentDateString = new Date().toISOString();
  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`users?limit=${usersReducer.page * 9}`, auth.token);


    dispatch({
      type: USERS_TYPES.GET_USERS,
      payload: { ...res.data, page: usersReducer.page + 1 }
    });
    setLoad(false);
  };

  return (
<div>
      <div className='card mt-4 mb-4'>
        <Searchuser />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registro</th>
              <th>Role</th>
              <th>Followers</th>
              <th>Following</th>
              <th>Post</th>
              <th>Likes</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {usersReducer.users.map((user) => (
            
            <tr key={user._id}>
            <td>
              <UserCard user={user} />
            </td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{currentDateString}</td>
            <td>{user.role}</td>
            <td>{user.following?.length || 0}</td>
            <td>{user.followers?.length || 0}</td>
            <td>{user.posts?.length || 0}</td> {/* Cambiado de user.post a user.posts */}
            <td>{getTotalLikes(user)}</td>
            <td>{getTotalComments(user)}</td>
          </tr>
              
            ))}
          </tbody>
        </table>
        <div className="mx-auto">
          {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}
          <LoadMoreBtn result={usersReducer.result} page={usersReducer.page} load={load} handleLoadMore={handleLoadMore} />
        </div>
      </div>
    </div>
  );
};

export default GetUsersPosts;
