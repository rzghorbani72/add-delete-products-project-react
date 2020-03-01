import {RESET_POSTS, UPDATE_POSTS} from '../actions/type';
import {posts} from '../../static/samplePosts';
import _ from 'lodash';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { REHYDRATE } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistConfig = {
	key: 'post',
	storage: storage,
	stateReconciler: autoMergeLevel2
};

const initialState = {
	posts: [],
	deleted:[]
};

const postReducer =  (state = initialState, action) => {
	switch (action.type) {
		case REHYDRATE:
			return {
				deleted: state.deleted,
			};
		case RESET_POSTS:
			return {
				posts: _.difference(posts, state.deleted)
			};
		case UPDATE_POSTS:
			let deleting_posts = _.find(posts, {id: Number(action.payload.id)});
			let deleted_posts = _.isEmpty(state.deleted) ? [] : state.deleted;
			let all_filtered_posts=_.concat(deleted_posts,deleting_posts);

			return {
				deleted: all_filtered_posts,
				posts: _.difference(posts,all_filtered_posts),
			};
		default:
			return state;
	}
};

export default persistReducer(persistConfig, postReducer);
