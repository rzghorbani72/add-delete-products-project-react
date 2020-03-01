import React, {PureComponent} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './redux/store';
import {Provider} from 'react-redux';
import Index from './pages';
import Post from './pages/post';
import About from './pages/about';
import './App.css';

class App extends PureComponent {
	
	render() {
		return (
			<div className="App">
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
					<Router>
						<Switch>
							<Route exact path="/" component={Index}/>
							<Route path="/post" component={Index}/>
							<Route path="/post/:id" component={Post}/>
							<Route path="/aboutUs" component={About}/>
						</Switch>
					</Router>
					</PersistGate>
				</Provider>
			</div>
		);
	}
}

export default App;
