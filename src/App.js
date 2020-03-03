import React, {PureComponent} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from "./redux/store";
import Home from './pages/Home';
import Post from './pages/Post';
import About from './pages/About';
import './App.css';

class App extends PureComponent {

		render() {
		return (
			<div className="App">
				<Provider store={store}>
					<Router>
						<Switch>
							<Route exact path="/" component={Home}/>
							<Route path="/post/:id?" component={Post}/>
							<Route path="/about" component={About}/>
						</Switch>
					</Router>
				</Provider>
			</div>
		);
	}
}

export default App;
