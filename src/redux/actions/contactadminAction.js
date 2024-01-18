import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import {postDataAPI,  getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from './notifyAction'

export const POSTCONTACT_TYPES = {
    CREATE_POSTCONTACT: 'CREATE_POSTCONTACT',
    LOADING_POSTCONTACT: 'LOADING_POSTCONTACT',
    GET_POSTSCONTACTS: 'GET_POSTSCONTACTS',
    UPDATE_POSTCONTACT: 'UPDATE_POSTCONTACT',
    GET_POSTSCONTACT: 'GET_POSTSCONTACT',
    DELETE_POSTCONTACT: 'DELETE_POSTCONTACT'
}

export const createPostcontact = ({content, images, auth, socket}) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(images.length > 0) media = await imageUpload(images)

        const res = await postDataAPI('posts', { content, images: media }, auth.token)

        dispatch({ 
            type: POSTCONTACT_TYPES.CREATE_POST, 
            payload: {...res.data.newPost, user: auth.user} 
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })

        // Notify
        const msg = {
            id: res.data.newPost._id,
            text: 'added a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${res.data.newPost._id}`,
            content, 
            image: media[0].url
        }

        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const getPostscontact = (token) => async (dispatch) => {
    try {
        dispatch({ type: POSTCONTACT_TYPES.LOADING_POST, payload: true })
        const res = await getDataAPI('posts', token)
        
        dispatch({
            type: POSTCONTACT_TYPES.GET_POSTS,
            payload: {...res.data, page: 2}
        })

        dispatch({ type: POSTCONTACT_TYPES.LOADING_POST, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const updatePostcontact = ({content, images, auth, status}) => async (dispatch) => {
    let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    if(status.content === content 
        && imgNewUrl.length === 0
        && imgOldUrl.length === status.images.length
    ) return;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)

        const res = await patchDataAPI(`post/${status._id}`, { 
            content, images: [...imgOldUrl, ...media] 
        }, auth.token)

        dispatch({ type: POSTCONTACT_TYPES.UPDATE_POST, payload: res.data.newPost })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

 
export const getPostcontact = ({detailPost, id, auth}) => async (dispatch) => {
    if(detailPost.every(post => post._id !== id)){
        try {
            const res = await getDataAPI(`post/${id}`, auth.token)
            dispatch({ type: POSTCONTACT_TYPES.GET_POST, payload: res.data.post })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg}
            })
        }
    }
}

export const deletePostcontact = ({post, auth, socket}) => async (dispatch) => {
    dispatch({ type: POSTCONTACT_TYPES.DELETE_POST, payload: post })

    try {
        const res = await deleteDataAPI(`post/${post._id}`, auth.token)

        // Notify
        const msg = {
            id: post._id,
            text: 'added a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

 