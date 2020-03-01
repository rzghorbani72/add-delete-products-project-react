import { RESET_POSTS,UPDATE_POSTS } from './type';

export const getPosts =()=> {
		return({type:RESET_POSTS})
};
export const updatePosts = (id) => {
		return {type:UPDATE_POSTS,payload:{id:id}}
};

