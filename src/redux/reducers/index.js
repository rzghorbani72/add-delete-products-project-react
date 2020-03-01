import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const postPersistConfig = {
	key: 'post',
	storage: storage,
	stateReconciler: autoMergeLevel2
};
const rootReducer = combineReducers({
	errors: errorReducer,
	postsInfo: postReducer
});
export default persistReducer(postPersistConfig, rootReducer);
