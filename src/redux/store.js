import { createStore} from 'redux';
import rootReducer from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
	key: 'post',
	storage: storage,
	stateReconciler: autoMergeLevel2
};

const rootReducer2 = persistReducer(persistConfig, rootReducer);

export const store = createStore(rootReducer2);
export const persistor = persistStore(store);
