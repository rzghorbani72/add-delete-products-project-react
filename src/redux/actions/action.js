import {GET_POSTS, RESET_POSTS, UPDATE_POSTS} from './type';
import {get} from '../../static/defaultPosts';

export const getPosts = (type) => dispatch => {
	switch (type) {
		case GET_POSTS://Get fetch remain items
			return get()
				.then(data => {
					dispatch({
						type: GET_POSTS,
						payload: data
					});
				});
		default://RESET fetch all items deleted+remain
			return get()
				.then(data => {
					dispatch({
						type: RESET_POSTS,
						payload: data
					});
				})
	}
};
export const updatePosts = (id) => dispatch => {
	return get()
		.then(data => {
			dispatch({
				type: UPDATE_POSTS,
				payload: {
					id: id,
					info: data
				}
			});
		});
};

