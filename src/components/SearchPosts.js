import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataAPI } from '../utils/fetchData';
import { POST_TYPES } from './../redux/actions/postAction';

import Button from 'react-bootstrap/Button';
 
import Form from 'react-bootstrap/Form';

const SearchPosts = () => {
    const { homePosts } = useSelector((state) => state);
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [contentvalue, setContentvalue] = useState('');

    const handleBuscar = async (e) => {
        e.preventDefault();

        try {
            let url = `/posts?limit=${homePosts.page * 9}`;

            if (contentvalue) {
                url += `&content=${contentvalue}`;
            }

            const response = await getDataAPI(url, auth.token);

            setContentvalue(''); // Resetea el valor del campo de búsqueda

            dispatch({
                type: POST_TYPES.GET_POSTS,
                payload: { ...response.data, page: homePosts.page + 1 },
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
       
        <Form className="d-flex"onSubmit={handleBuscar}>
        <Form.Control
          type="search"
          value={contentvalue}
          onChange={(e) => setContentvalue(e.target.value)}
          placeholder="Titre"
          className="me-2"
          aria-label="Search"
        />
        <Button  type='submit' variant="outline-success"><i className="fa fa-search" aria-hidden="true"></i></Button>
      </Form>
    );
};

export default SearchPosts
