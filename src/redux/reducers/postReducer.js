import {GET_POSTS,RESET_POSTS, UPDATE_POSTS} from '../actions/type';
import _ from 'lodash';
const initialState = {
	posts: [],
};
export default function (state = initialState, action) {
	switch (action.type) {
		case RESET_POSTS:
			setLocalData('deleted',{ids:[]});
			return {
				posts: action.payload
			};
		case GET_POSTS:
			return {
				posts: filteredPosts(action.payload,getLocalData('deleted').ids)
			};
		case UPDATE_POSTS:
			let deleted_ids=_.concat(getLocalData('deleted').ids,[action.payload.id]);
			setLocalData('deleted',{ids:deleted_ids});
			return {
				posts:filteredPosts(action.payload.info,deleted_ids),
			};
		default:
			return state;
	}
}

function filteredPosts(items,deletedIds) {
	_.remove(items,(item)=>{return _.includes(deletedIds,item.id)});
	return items;
}
function getLocalData(key) {
	return _.isEmpty(localStorage.getItem(key)) ? [] : JSON.parse(localStorage.getItem(key));
}
function setLocalData(key,value) {
	return localStorage.setItem(key,JSON.stringify(value));
}
