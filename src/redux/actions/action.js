import {GET_POSTS, RESET_POSTS, UPDATE_POSTS} from './type';
import {get} from '../../static/defaultPosts';

export function getPosts (type) {
	switch (type) {
		case GET_POSTS://Get fetch remain items
			return get()
				.then(data=>{
				return {
					type: GET_POSTS,
					payload: data
				};
			});
		default://RESET fetch all items deleted+remain
			return get()
				.then(data => {
					return {
						type: RESET_POSTS,
						payload: data
					}
				})
	}
};
export function updatePosts (id) {
	return get()
		.then(data => {
			return {
				type: UPDATE_POSTS,
				payload: {
					id: id,
					info: data
				}
			}
		});
};

export const getPostsAction = data => dispatch =>{
	return getPosts(data).then(action=>dispatch(action));
};
export const updatePostsAction = data => dispatch =>{
	return updatePosts(data).then(action=>dispatch(action));
};
